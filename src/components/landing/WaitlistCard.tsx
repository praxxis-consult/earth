import { useEffect, useId, useState, type FormEvent } from "react";
import { JoinButton } from "./JoinButton";
import {
  CITIES,
  COUNTRIES,
  HONEYPOT_FIELD,
  INTERESTS,
  validate,
  type FieldErrors,
} from "@/lib/waitlist";

/**
 * Figma "Frame 1000011533" (213:1054 etc.): 48px tall, padding 12/16, gap 8, radius 30,
 * 0.5px stroke #E4DEDE (rendered as 1px at 60% so every screen density draws it), no fill.
 * Placeholder 16px Regular white 75%. Focus shows a 2px ring, which the design does not specify.
 */
const fieldClass =
  "h-12 w-full rounded-[30px] border border-[#E4DEDE]/60 bg-transparent px-4 py-3 text-[14px] font-normal leading-5 text-white outline-none placeholder:text-white/75 md:text-[16px] md:leading-6 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-0 aria-[invalid=true]:border-[#FFB4A8]";

type Status = "idle" | "sending" | "joined" | "error";

function FieldError({ id, message }: { id: string; message?: string | undefined }) {
  if (!message) return null;
  return (
    <p id={id} className="text-[14px] leading-5 text-[#FFB4A8]">
      {message}
    </p>
  );
}

function Select({
  id,
  label,
  placeholder,
  options,
  error,
  optional = false,
}: {
  id: string;
  label: string;
  placeholder: string;
  options: readonly string[];
  error?: string | undefined;
  optional?: boolean;
}) {
  const errId = `${id}-error`;
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="block text-[14px] font-medium leading-5 text-white md:text-[16px] md:leading-6"
      >
        {label}
      </label>
      <div className="relative">
        {/* `required` + empty value makes the select :invalid, so the placeholder tint needs no JS. */}
        <select
          id={id}
          name={id}
          required={!optional}
          defaultValue=""
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errId : undefined}
          className={`${fieldClass} appearance-none pr-12 invalid:text-white/75 ${optional ? 'has-[option[value=""]:checked]:text-white/75' : ""}`}
        >
          <option value="" disabled className="text-black">
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o} value={o} className="text-black">
              {o}
            </option>
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
 * Below 768px the form is one column with 20px card padding; the file has no mobile frame.
 *
 * Submission: the hydrated form posts JSON to /api/waitlist. Before hydration the same form posts
 * urlencoded to the same URL (method/action) with native validation, so nothing is ever sent as a GET.
 * The card carries scroll-margin so the sticky header never covers its title when linked to.
 */
export function WaitlistCard() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const statusId = useId();
  const titleId = useId();

  // Outcome of a pre-hydration (plain HTML) submit comes back on the URL.
  useEffect(() => {
    setHydrated(true);
    const flag = new URLSearchParams(window.location.search).get("waitlist");
    if (flag)
      window.history.replaceState(null, "", window.location.pathname + window.location.hash);
    if (flag === "joined") setStatus("joined");
    else if (flag === "error") {
      setStatus("error");
      setMessage("We couldn't save your details. Please try again.");
    } else if (flag === "invalid") {
      setStatus("error");
      setMessage("Please check the details you entered and try again.");
    } else if (flag === "busy") {
      setStatus("error");
      setMessage(
        "A lot of people on your connection just signed up. Please try again in a few minutes.",
      );
    }
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries());
    const check = validate(raw);
    if ("errors" in check) {
      setErrors(check.errors);
      setStatus("idle");
      const first = Object.keys(check.errors)[0];
      form.querySelector<HTMLElement>(`#${first}`)?.focus();
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(check.entry),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        errors?: FieldErrors;
        message?: string;
      };
      if (res.ok && data.ok) {
        setStatus("joined");
        form.reset();
      } else if (data.errors) {
        setErrors(data.errors);
        setStatus("idle");
      } else {
        setStatus("error");
        setMessage(data.message ?? "We couldn't save your details. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("You seem to be offline. Check your connection and try again.");
    }
  }

  const statusText =
    status === "joined"
      ? "You're on the list. We'll email you when Earth opens."
      : status === "error"
        ? message
        : status === "sending"
          ? "Sending your details…"
          : "";

  return (
    <form
      id="waitlist"
      method="post"
      action="/api/waitlist"
      noValidate={hydrated}
      onSubmit={onSubmit}
      aria-labelledby={titleId}
      aria-describedby={statusId}
      className="flex w-full max-w-[1200px] scroll-mt-[88px] flex-col rounded-[30px] md:scroll-mt-28 bg-white/10 px-4 py-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)] backdrop-blur-[12px] md:px-6 md:py-10 md:backdrop-blur-[20px] [@media(prefers-reduced-transparency:reduce)]:bg-[#13221A]/90 [@media(prefers-reduced-transparency:reduce)]:backdrop-blur-none"
    >
      <div className="flex w-full max-w-[564px] flex-col gap-1 md:gap-2">
        <h2 className="text-[20px] font-semibold leading-8 tracking-[-1px] text-white md:text-[24px]">
          Join The Waitlist
        </h2>
        <p className="text-[14px] font-normal leading-[18px] text-[#E4DEDE] md:text-[15px] md:leading-6">
          Submit your details below to get notified when we launch.
        </p>
      </div>

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
        />

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6">
          <div className="flex flex-col gap-2">
            {/* Figma 213:1059 characterStyleOverrides: "Name " Medium white, "(optional)" Medium #E4DEDE. */}
            <label
              htmlFor="name"
              className="block text-[14px] font-medium leading-5 text-white md:text-[16px] md:leading-6"
            >
              Name <span className="text-[#E4DEDE]">(optional)</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              enterKeyHint="next"
              maxLength={120}
              placeholder="Enter your full name"
              className={fieldClass}
            />
          </div>
          {/* Figma mobile 259:1955 has a Country field; the desktop frame does not. */}
          <div className="md:hidden">
            <Select
              id="country"
              label="Country"
              placeholder="Select country"
              options={COUNTRIES}
              error={errors.country}
              optional
            />
          </div>
          <Select
            id="city"
            label="City"
            placeholder="Select city"
            options={CITIES}
            error={errors.city}
          />
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="block text-[14px] font-medium leading-5 text-white md:text-[16px] md:leading-6"
            >
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
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? "email-error" : undefined}
              placeholder="Enter email address"
              className={fieldClass}
            />
            <FieldError id="email-error" message={errors.email} />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="phone"
              className="block text-[14px] font-medium leading-5 text-white md:text-[16px] md:leading-6"
            >
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
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              placeholder="Enter phone number"
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
        <input id="consent" name="consent" type="checkbox" className="peer sr-only" />
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

      {/* Always mounted so screen readers announce changes. */}
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
    </form>
  );
}
