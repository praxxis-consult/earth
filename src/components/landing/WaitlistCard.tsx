import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { JoinButton } from "./JoinButton";
import { CityField } from "./CityField";
import {
  COUNTRIES,
  HONEYPOT_FIELD,
  INTERESTS,
  PRIORITY_COUNTRIES,
  phoneExample,
  validate,
  type FieldErrors,
  type Place,
  type WaitlistEntry,
} from "@/lib/waitlist";

/**
 * Figma "Frame 1000011533" (213:1054 etc.): 48px tall, padding 12/16, gap 8, radius 30,
 * 0.5px stroke #E4DEDE (rendered as 1px at 60% so every screen density draws it), no fill.
 * Placeholder 16px Regular white 75%. Focus shows a 2px ring, which the design does not specify.
 */
const fieldClass =
  "h-12 w-full rounded-[30px] border border-[#E4DEDE]/60 bg-transparent px-4 py-3 text-[14px] font-normal leading-5 text-white outline-none placeholder:text-white/75 md:text-[16px] md:leading-6 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-0 aria-[invalid=true]:border-[#FFB4A8]";

const labelClass = "block text-[14px] font-medium leading-5 text-white md:text-[16px] md:leading-6";

const cardClass =
  "flex w-full max-w-[1200px] scroll-mt-[88px] flex-col rounded-[30px] md:scroll-mt-28 bg-white/10 px-4 py-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)] backdrop-blur-[12px] md:px-6 md:py-10 md:backdrop-blur-[20px] [@media(prefers-reduced-transparency:reduce)]:bg-[#13221A]/90 [@media(prefers-reduced-transparency:reduce)]:backdrop-blur-none";

const titleClass =
  "text-[20px] font-semibold leading-8 tracking-[-1px] text-white outline-none md:text-[24px]";
const subClass =
  "text-[14px] font-normal leading-[18px] text-[#E4DEDE] md:text-[15px] md:leading-6";
const linkClass =
  "rounded text-[14px] font-medium leading-5 text-white underline decoration-white/60 underline-offset-4 hover:decoration-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:no-underline disabled:opacity-60";
/** Outline pill for secondary actions on the confirmed panel; the filled pill stays the primary. */
const pillClass =
  "inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[30px] border border-[#E4DEDE]/60 px-5 text-[14px] font-medium leading-5 text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

type Status = "idle" | "sending" | "error";
/**
 * form → verify → done. The API emails a six-digit code on sign-up; the place on the list and the
 * share link only exist once that code is confirmed. The design has no frames for the last two
 * steps, so they reuse the card, field and button styles from the first.
 */
type Step = "form" | "verify" | "done";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const STORAGE_KEY = "earth.waitlist.place";
/** The place token is short-lived; the position and referral link it unlocked are kept regardless. */
const tokenLive = (s: Stored) => new Date(s.expiresAt).getTime() > Date.now();
/** Resend waits: right after sign-up a code is already on its way; after a resend, longer. */
const COOLDOWN_FIRST = 30;
const COOLDOWN_RESEND = 60;

const COUNTRY_GROUPS: readonly (readonly [string, readonly { value: string; label: string }[]])[] =
  [
    [
      "Suggested",
      PRIORITY_COUNTRIES.map((c) => ({
        value: c,
        label: COUNTRIES.find((x) => x.c === c)?.n ?? c,
      })),
    ],
    ["All countries", COUNTRIES.map((x) => ({ value: x.c, label: x.n }))],
  ];

const cityCache = new Map<string, Promise<readonly string[]>>();
function citiesFor(code: string): Promise<readonly string[]> {
  let p = cityCache.get(code);
  if (!p) {
    p = fetch(`/geo/cities/${code}.json`)
      .then((r) => (r.ok ? (r.json() as Promise<string[]>) : r.status === 404 ? [] : reject()))
      .catch(() => {
        // A failed fetch (offline for a moment) is not remembered, so the next focus tries again.
        cityCache.delete(code);
        return [];
      });
    cityCache.set(code, p);
  }
  return p;
}
const reject = (): never => {
  throw new Error("cities unavailable");
};

/** The browser's own guess, for people behind a VPN or when the platform header is missing. */
function localeCountry(): string {
  try {
    const region = new Intl.Locale(navigator.language).maximize().region ?? "";
    return COUNTRIES.some((c) => c.c === region) ? region : "";
  } catch {
    return "";
  }
}

type Stored = { placeToken: string; expiresAt: string; place: Place; email: string };
function readStored(): Stored | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw) as Stored;
    if (!s.placeToken || !s.place || typeof s.place.position !== "number") return null;
    return s;
  } catch {
    return null;
  }
}
function writeStored(s: Stored | null) {
  try {
    if (s) localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* private mode or blocked storage: the panel still shows this once */
  }
}

async function post<T>(path: string, body: unknown) {
  const res = await fetch(path, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await res.json().catch(() => ({}))) as {
    ok?: boolean;
    message?: string;
    errors?: FieldErrors;
    retryAfter?: number;
  } & T;
  return { status: res.status, ok: res.ok && data.ok === true, data };
}

function FieldError({ id, message }: { id: string; message?: string | undefined }) {
  if (!message) return null;
  return (
    <p id={id} className="text-[14px] leading-5 text-[#FFB4A8]">
      {message}
    </p>
  );
}

type Option = string | { value: string; label: string };
const opt = (o: Option) => (typeof o === "string" ? { value: o, label: o } : o);

function Select({
  id,
  label,
  placeholder,
  options,
  groups,
  error,
  optional = false,
  defaultValue = "",
  value,
  onChange,
}: {
  id: string;
  label: string;
  placeholder: string;
  options?: readonly Option[] | undefined;
  /** Grouped options (label → options), used for Country: suggested first, then every country. */
  groups?: readonly (readonly [string, readonly Option[]])[] | undefined;
  error?: string | undefined;
  optional?: boolean;
  defaultValue?: string;
  /** Controlled form (Country), so a keyboard change never remounts the focused element. */
  value?: string | undefined;
  onChange?: ((value: string) => void) | undefined;
}) {
  const errId = `${id}-error`;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <div className="relative">
        {/* `required` + empty value makes the select :invalid, so the placeholder tint needs no JS. */}
        <select
          id={id}
          name={id}
          required={!optional}
          {...(value === undefined ? { defaultValue } : { value })}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errId : undefined}
          onChange={onChange ? (e) => onChange(e.currentTarget.value) : undefined}
          className={`${fieldClass} appearance-none pr-12 invalid:text-white/75 ${optional ? 'has-[option[value=""]:checked]:text-white/75' : ""}`}
        >
          <option value="" disabled className="text-black">
            {placeholder}
          </option>
          {options?.map(opt).map((o) => (
            <option key={o.value} value={o.value} className="text-black">
              {o.label}
            </option>
          ))}
          {groups?.map(([g, os]) => (
            <optgroup key={g} label={g} className="text-black">
              {os.map(opt).map((o) => (
                <option key={o.value} value={o.value} className="text-black">
                  {o.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <img
          src="/figma/arrow-down.svg"
          alt=""
          width={20}
          height={20}
          className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2"
        />
      </div>
      <FieldError id={errId} message={error} />
    </div>
  );
}

/**
 * Figma "Frame 2147237483" (213:1050): 1200×560 at (120,864), fill white 10%, radius 30, GLASS effect.
 * Children in Figma are absolutely placed: title block (24,40), form (24,144) 1152 wide, button (273,472) 588×48.
 * Built as flow: 40 + 64 + 40 + 288 + 40 + 48 + 40 = 560 at desktop. The button is centred (x 306) rather than
 * at Figma's x 273, because a flow layout cannot reproduce an off-centre absolute offset responsively.
 * The GLASS effect exports no parameters; the blur strength and the 1px light rim are read from the render.
 * Below 768px the form is one column with 20px card padding (mobile frame 259:1919).
 *
 * Submission: the hydrated form posts JSON to /api/waitlist. Before hydration the same form posts
 * urlencoded to the same URL (method/action) with native validation, so nothing is ever sent as a GET.
 * The card carries scroll-margin so the sticky header never covers its title when linked to.
 */
const FLAG_MESSAGES: Record<string, string> = {
  error: "We couldn't save your details. Please try again.",
  invalid: "Please check the details you entered and try again.",
  busy: "A lot of people on your connection just signed up. Please try again in a few minutes.",
};

export function WaitlistCard({
  detectedCountry = "",
  initialFlag = "",
}: {
  detectedCountry?: string;
  /** The ?waitlist= outcome of a plain HTML submit, read on the server so it shows even without JS. */
  initialFlag?: string;
}) {
  const [step, setStep] = useState<Step>(initialFlag === "check" ? "verify" : "form");
  const [status, setStatus] = useState<Status>(FLAG_MESSAGES[initialFlag] ? "error" : "idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState(FLAG_MESSAGES[initialFlag] ?? "");
  const [hydrated, setHydrated] = useState(false);
  /** What was submitted, so "Use a different email" brings the form back filled in. */
  const [draft, setDraft] = useState<Partial<WaitlistEntry>>({});
  const [email, setEmail] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [country, setCountry] = useState(detectedCountry);
  const [cities, setCities] = useState<readonly string[]>([]);
  const [place, setPlace] = useState<Place | null>(null);
  /** True when the referral count could not be refreshed (token expired or the API said no). */
  const [stale, setStale] = useState(false);
  const [copied, setCopied] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [canShare, setCanShare] = useState(false);
  const statusId = useId();
  const titleId = useId();
  const codeRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formKey = useRef(0);
  /** Set once the API rejected the share code, so the retry leaves it out before React re-renders. */
  const refDropped = useRef(false);

  // Outcome of a pre-hydration (plain HTML) submit comes back on the URL, as does a friend's ?ref= code.
  useEffect(() => {
    setHydrated(true);
    setCanShare(typeof navigator.share === "function");
    if (!detectedCountry) setCountry(localeCountry());
    const params = new URLSearchParams(window.location.search);
    const ref = (params.get("ref") ?? "").trim().toUpperCase();
    if (/^[A-Z0-9]{8}$/.test(ref)) setReferralCode(ref);
    const flag = params.get("waitlist");
    if (flag)
      window.history.replaceState(null, "", window.location.pathname + window.location.hash);
    // "check": the no-JS submit went through, but this page never saw the email.
    if (flag === "check") {
      setStep("verify");
      setCooldown(COOLDOWN_FIRST);
    } else if (flag && FLAG_MESSAGES[flag]) {
      setStatus("error");
      setMessage(FLAG_MESSAGES[flag]);
    } else if (!flag) {
      // A confirmed visitor coming back sees their place again, with a fresh referral count.
      const stored = readStored();
      if (stored) {
        setPlace(stored.place);
        setEmail(stored.email);
        setStep("done");
        // The referral link never expires; only the live count does. A dead token keeps the cached
        // panel and says so, rather than throwing the person's link away.
        if (!tokenLive(stored)) setStale(true);
        else
          post<{ place?: Place }>("/api/waitlist/me", {
            placeToken: stored.placeToken,
            expiresAt: stored.expiresAt,
          })
            .then((r) => {
              if (r.ok && r.data.place) {
                setPlace(r.data.place);
                writeStored({ ...stored, place: r.data.place });
              } else setStale(true);
            })
            .catch(() => setStale(true));
      }
    }
  }, [detectedCountry]);

  // Suggestions for the chosen country, generated from GeoNames (public/geo). Small countries have no
  // file, and towns under 15k people are not listed, so the city stays free text either way.
  useEffect(() => {
    if (!country) return setCities([]);
    let live = true;
    citiesFor(country).then((list) => live && setCities(list));
    return () => {
      live = false;
    };
  }, [country]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  // Each step is a new panel; move focus to its heading so keyboard and screen-reader users follow.
  const stepShown = useRef<Step>("form");
  useEffect(() => {
    if (stepShown.current !== step) {
      stepShown.current = step;
      if (step === "verify" && email) codeRef.current?.focus();
      else titleRef.current?.focus();
    }
  }, [step, email]);

  function fail(text: string) {
    setStatus("error");
    setMessage(text);
  }
  function focusFirst(form: HTMLFormElement, errs: FieldErrors) {
    const first = Object.keys(errs)[0];
    if (first) form.querySelector<HTMLElement>(`#${first}`)?.focus();
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries());
    if (refDropped.current) delete raw["referralCode"];
    const check = validate(raw);
    if ("errors" in check) {
      setErrors(check.errors);
      setStatus("idle");
      focusFirst(form, check.errors);
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      // The honeypot rides along: a bot driving this very form still reveals itself server-side.
      const { ok, data } = await post("/api/waitlist", {
        ...check.entry,
        [HONEYPOT_FIELD]: raw[HONEYPOT_FIELD] ?? "",
      });
      if (ok) {
        setDraft({ ...check.entry, phone: String(raw["phone"] ?? "") });
        setEmail(check.entry.email);
        setStatus("idle");
        setMessage("");
        setCooldown(COOLDOWN_FIRST);
        setStep("verify");
      } else if (data.errors?.referralCode && !refDropped.current) {
        // A stale share code must not block the sign-up; join again without it.
        refDropped.current = true;
        setReferralCode("");
        setStatus("idle");
        setTimeout(() => form.requestSubmit(), 0);
        return;
      } else if (data.errors && Object.keys(data.errors).some((k) => form.querySelector(`#${k}`))) {
        setErrors(data.errors);
        setStatus("idle");
        focusFirst(form, data.errors);
      } else {
        fail(data.message ?? "We couldn't save your details. Please try again.");
      }
    } catch {
      fail("You seem to be offline. Check your connection and try again.");
    }
  }

  async function onClaim(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const raw = Object.fromEntries(new FormData(e.currentTarget).entries());
    const to = String(raw["email"] ?? email)
      .trim()
      .toLowerCase();
    const code = String(raw["code"] ?? "").replace(/\D/g, "");
    if (!EMAIL.test(to)) {
      fail("Enter the email address you signed up with.");
      (e.currentTarget.querySelector("#verify-email") as HTMLInputElement | null)?.focus();
      return;
    }
    if (code.length !== 6) {
      fail("Enter the six digits from the email.");
      codeRef.current?.focus();
      return;
    }
    setEmail(to);
    setStatus("sending");
    try {
      const {
        status: code_,
        ok,
        data,
      } = await post<{ place?: Place }>("/api/waitlist/claim", {
        email: to,
        code,
      });
      if (ok && data.place) {
        setPlace(data.place);
        writeStored({
          placeToken: data.place.placeToken,
          expiresAt: data.place.expiresAt,
          place: data.place,
          email: to,
        });
        setStale(false);
        setStatus("idle");
        setMessage("");
        setStep("done");
      } else {
        fail(
          data.message ??
            (code_ === 422
              ? "That code isn't right. Check it and try again."
              : "Something went wrong. Please try again."),
        );
        codeRef.current?.select();
      }
    } catch {
      fail("You seem to be offline. Check your connection and try again.");
    }
  }

  async function onResend() {
    if (status === "sending" || cooldown > 0) return;
    const to = (
      (document.getElementById("verify-email") as HTMLInputElement | null)?.value ?? email
    )
      .trim()
      .toLowerCase();
    if (!EMAIL.test(to)) return fail("Enter the email address you signed up with first.");
    setEmail(to);
    setStatus("sending");
    try {
      const { ok, data } = await post("/api/waitlist/resend", { email: to });
      setStatus(ok ? "idle" : "error");
      setMessage(
        ok
          ? `We sent a new code to ${to}. Check spam if it isn't there in a minute.`
          : (data.message ?? "We couldn't send a new code. Please try again."),
      );
      setCooldown(ok ? COOLDOWN_RESEND : Math.max(COOLDOWN_RESEND, data.retryAfter ?? 0));
      codeRef.current?.focus();
    } catch {
      fail("You seem to be offline. Check your connection and try again.");
    }
  }

  const origin = typeof window === "undefined" ? "" : window.location.origin;
  const shareUrl = place ? `${origin}/?ref=${place.referralCode}` : "";
  const shareText = place
    ? `I'm #${place.position.toLocaleString()} on the Earth waitlist, a marketplace for everything that is grown, mined and reared. Join with my link and we both move up:`
    : "";

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setStatus("idle");
      setMessage("Link copied.");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      fail("Copy didn't work here. Select the link and copy it yourself.");
    }
  }
  async function onNativeShare() {
    try {
      await navigator.share({ text: shareText, url: shareUrl });
    } catch {
      /* the person closed the sheet */
    }
  }

  const statusText =
    status === "error"
      ? message
      : status === "sending"
        ? step === "form"
          ? "Sending your details…"
          : "One moment…"
        : message;

  // Always mounted so screen readers announce changes.
  const statusEl = (
    <p
      id={statusId}
      role="status"
      aria-live="polite"
      className={`text-center text-[14px] leading-5 ${statusText ? "mt-4" : "sr-only"} ${
        status === "error" ? "text-[#FFB4A8]" : "text-white"
      }`}
    >
      {statusText}
    </p>
  );

  if (step === "verify") {
    return (
      <form
        id="waitlist"
        noValidate
        onSubmit={onClaim}
        aria-labelledby={titleId}
        aria-describedby={statusId}
        className={cardClass}
      >
        <div className="flex w-full max-w-[564px] flex-col gap-1 md:gap-2">
          <h2 id={titleId} ref={titleRef} tabIndex={-1} className={titleClass}>
            Check your email
          </h2>
          <p className={subClass}>
            {email
              ? "We sent a six-digit code to the address below. Enter it to confirm your place."
              : "We sent a six-digit code to your email. Enter both below to confirm your place."}
          </p>
        </div>
        <div className="mt-6 grid w-full grid-cols-1 gap-3 md:mt-10 md:grid-cols-2 md:gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="verify-email" className={labelClass}>
              Email Address
            </label>
            <input
              id="verify-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              inputMode="email"
              defaultValue={email}
              placeholder="Enter email address"
              className={fieldClass}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="code" className={labelClass}>
              Six-digit code
            </label>
            <input
              ref={codeRef}
              id="code"
              name="code"
              type="text"
              required
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="[0-9]{6}"
              placeholder="Enter code"
              className={`${fieldClass} tracking-[0.3em]`}
              onChange={(e) => {
                // "123 456" pasted from a mail client, or the iOS autofill: keep the digits, submit at six.
                const input = e.currentTarget;
                const digits = input.value.replace(/\D/g, "").slice(0, 6);
                if (digits !== input.value) input.value = digits;
                if (digits.length === 6 && status !== "sending")
                  setTimeout(() => input.form?.requestSubmit(), 150);
              }}
            />
          </div>
        </div>
        <div className="mt-6 flex w-full flex-col items-center gap-4 md:mt-10">
          <JoinButton
            type="submit"
            label="Confirm"
            className="w-full md:w-[588px]"
            disabled={status === "sending"}
          />
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <button
              type="button"
              onClick={onResend}
              aria-disabled={status === "sending" || cooldown > 0}
              className={`${linkClass} aria-disabled:no-underline aria-disabled:opacity-60`}
            >
              {cooldown > 0
                ? `Send a new code in ${Math.floor(cooldown / 60)}:${String(cooldown % 60).padStart(2, "0")}`
                : "Send a new code"}
            </button>
            <button
              type="button"
              onClick={() => {
                setMessage("");
                setStatus("idle");
                formKey.current += 1;
                if (draft.country) setCountry(draft.country);
                setStep("form");
              }}
              className={linkClass}
            >
              Change my details
            </button>
          </div>
        </div>
        {statusEl}
      </form>
    );
  }

  if (step === "done" && place) {
    return (
      <section id="waitlist" aria-labelledby={titleId} className={cardClass}>
        <div className="flex w-full max-w-[564px] flex-col gap-1 md:gap-2">
          <p className="text-[48px] font-semibold leading-[56px] tracking-[-2px] text-white md:text-[64px] md:leading-[72px]">
            #{place.position.toLocaleString()}
          </p>
          <h2 id={titleId} ref={titleRef} tabIndex={-1} className={titleClass}>
            You’re on the Earth waitlist
          </h2>
          <p className={subClass}>
            Your place is confirmed for {place.city}.{" "}
            {place.referralsCredited > 0
              ? `${place.referralsCredited} ${place.referralsCredited === 1 ? "friend has" : "friends have"} joined with your link so far.`
              : "Every friend who joins with your link and confirms moves you up."}{" "}
            We’ll email you the moment Earth opens.
            {stale && " (Your referral count may be out of date.)"}
          </p>
        </div>
        <div className="mt-6 flex w-full flex-col gap-2 md:mt-10">
          <label htmlFor="share-link" className={labelClass}>
            Your link
          </label>
          <input
            id="share-link"
            readOnly
            value={shareUrl}
            onFocus={(e) => e.currentTarget.select()}
            className={fieldClass}
          />
        </div>
        <div className="mt-6 flex w-full flex-col items-center gap-3 md:mt-10">
          <JoinButton
            href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`}
            label="Share on WhatsApp"
            icon="/icons/whatsapp.svg"
            external
            className="w-full md:w-[588px]"
          />
          <div className="flex w-full flex-wrap justify-center gap-3 md:w-[588px]">
            {canShare && (
              <button
                type="button"
                onClick={onNativeShare}
                className={`${pillClass} min-w-[150px] flex-1`}
              >
                Share…
                <img src="/icons/share.svg" alt="" width={24} height={24} className="h-6 w-6" />
              </button>
            )}
            <a
              href={`https://x.com/intent/post?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener"
              className={`${pillClass} min-w-[150px] flex-1`}
            >
              Post on X
              <img src="/icons/x.svg" alt="" width={24} height={24} className="h-6 w-6" />
            </a>
            <button type="button" onClick={onCopy} className={`${pillClass} min-w-[150px] flex-1`}>
              {copied ? "Copied" : "Copy link"}
              <img src="/icons/copy.svg" alt="" width={24} height={24} className="h-6 w-6" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => {
              writeStored(null);
              setPlace(null);
              setStale(false);
              setEmail("");
              setStep("form");
            }}
            className={`${linkClass} mt-1`}
          >
            Not you? Join with another email
          </button>
        </div>
        {statusEl}
      </section>
    );
  }

  return (
    <form
      key={formKey.current}
      id="waitlist"
      method="post"
      action="/api/waitlist"
      noValidate={hydrated}
      onSubmit={onSubmit}
      aria-labelledby={titleId}
      aria-describedby={statusId}
      className={cardClass}
    >
      <div className="flex w-full max-w-[564px] flex-col gap-1 md:gap-2">
        <h2 id={titleId} ref={titleRef} tabIndex={-1} className={titleClass}>
          Join The Waitlist
        </h2>
        <p className={subClass}>Submit your details below to get notified when we launch.</p>
      </div>

      {/* A share link (?ref=CODE) credits the friend who sent it; nobody types this. */}
      {referralCode && <input type="hidden" name="referralCode" value={referralCode} />}

      {/* Honeypot: hidden from people and assistive tech; bots that fill it are dropped server-side. */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor={HONEYPOT_FIELD}>Leave this empty</label>
        <input
          id={HONEYPOT_FIELD}
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="mt-6 flex w-full flex-col gap-3 md:mt-10 md:gap-6">
        <Select
          id="interest"
          label="I’m interested in..."
          placeholder="Select an option"
          options={INTERESTS}
          error={errors.interest}
          defaultValue={draft.interest ?? ""}
        />

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6">
          <div className="flex flex-col gap-2">
            {/* Figma 213:1059 characterStyleOverrides: "Name " Medium white, "(optional)" Medium #E4DEDE. */}
            <label htmlFor="name" className={labelClass}>
              Name <span className="text-[#E4DEDE]">(optional)</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              enterKeyHint="next"
              maxLength={120}
              defaultValue={draft.name ?? ""}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? "name-error" : undefined}
              placeholder="Enter your full name"
              className={fieldClass}
            />
            <FieldError id="name-error" message={errors.name} />
          </div>
          {/*
           * Country is in the mobile frame (259:1955) only, but City is chosen from it, so it is shown at
           * every width; the desktop frame should gain it. Preselected from the visitor's location.
           */}
          <Select
            id="country"
            label="Country"
            placeholder="Select country"
            groups={COUNTRY_GROUPS}
            error={errors.country}
            value={country}
            onChange={setCountry}
          />
          <CityField
            fieldClass={fieldClass}
            labelClass={labelClass}
            cities={cities}
            country={country}
            error={errors.city}
            defaultValue={draft.city ?? ""}
          />
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className={labelClass}>
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              inputMode="email"
              enterKeyHint="next"
              defaultValue={draft.email ?? ""}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? "email-error" : undefined}
              placeholder="Enter email address"
              className={fieldClass}
            />
            <FieldError id="email-error" message={errors.email} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className={labelClass}>
              {/* Figma says only "Phone"; "(optional)" is added so required fields are unambiguous. */}
              Phone <span className="text-[#E4DEDE]">(optional)</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              enterKeyHint="send"
              defaultValue={draft.phone ?? ""}
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              placeholder={country ? `e.g. ${phoneExample(country)}` : "Enter phone number"}
              className={fieldClass}
            />
            <FieldError id="phone-error" message={errors.phone} />
          </div>
        </div>
      </div>

      {/*
       * Figma mobile 287:2155: 20px checkbox, radius 5, 1.5px #E4DEDE stroke, gap 8, 12px/20 #E4DEDE text.
       * Checked variant 283:2124 is a solid #1A73E5 square with no tick, 300ms ease. The desktop frame has no
       * consent row, so it is shown below md only.
       */}
      <div className="mt-3 flex items-start gap-2 md:hidden">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          defaultChecked={draft.consent ?? false}
          className="peer sr-only"
        />
        <label
          htmlFor="consent"
          aria-hidden="true"
          className="h-5 w-5 shrink-0 cursor-pointer rounded-[5px] border-[1.5px] border-[#E4DEDE] transition-colors duration-300 ease-in-out peer-checked:border-[#1A73E5] peer-checked:bg-[#1A73E5] peer-focus-visible:ring-2 peer-focus-visible:ring-white"
        />
        <label
          htmlFor="consent"
          className="cursor-pointer text-[12px] font-normal leading-5 text-[#E4DEDE]"
        >
          I agree and consent to receiving waitlist updates from Earth.
        </label>
      </div>

      <div className="mt-6 flex w-full justify-center md:mt-10">
        <JoinButton type="submit" className="w-full md:w-[588px]" disabled={status === "sending"} />
      </div>

      {statusEl}
    </form>
  );
}
