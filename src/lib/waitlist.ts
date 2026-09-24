/**
 * Waitlist model and the client for the Earth API (v1). The browser never talks to the API
 * directly: it is plain HTTP with no CORS, so the routes under /api/waitlist proxy to it from
 * the server. Field names differ between the form and the API and are mapped here.
 */

export const INTERESTS = ["Buying", "Selling", "Both"] as const;
import countries from "./countries.json";

/** Every country, from GeoNames via scripts/geo.mjs: { c: ISO 3166-1 alpha-2, n: English name }. */
export const COUNTRIES: readonly { c: string; n: string }[] = countries;
/** Pinned at the top of the country list; the markets Earth is talking to first. */
export const PRIORITY_COUNTRIES = ["NG", "GH", "KE", "GB", "US"] as const;
const COUNTRY_NAMES = new Map(countries.map((x) => [x.c, x.n]));
export const countryName = (code: string) => COUNTRY_NAMES.get(code) ?? code;

export type WaitlistEntry = {
  interest: (typeof INTERESTS)[number];
  name: string;
  /** ISO code. In the mobile frame only (Figma 259:1955), shown everywhere because City depends on it. */
  country: string;
  /** Typed, with that country's towns from /geo/cities/<CC>.json offered as suggestions. */
  city: string;
  email: string;
  phone: string;
  /** The consent tick (Figma 287:2155, mobile only). Sent as marketingConsent. */
  consent: boolean;
  /** From the ?ref= parameter on a share link, never typed. */
  referralCode: string;
};

export type FieldErrors = Partial<Record<keyof WaitlistEntry, string>>;

export type Place = {
  /** Lets the browser come back to its place later (GET /me). Kept in localStorage, never in a URL. */
  placeToken: string;
  expiresAt: string;
  city: string;
  position: number;
  priorityPoints: number;
  referralCode: string;
  referralsCredited: number;
};

export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/**
 * Dial codes and national mobile shapes for the pinned markets; anywhere else the number has to
 * be written with its + code. Nigeria (NCC): 11 digits, 0 + 70/80/81/90/91 + 8 more.
 */
const DIAL: Record<string, { code: string; national: RegExp; example: string }> = {
  NG: { code: "234", national: /^[789][01]\d{8}$/, example: "0803 000 0000" },
  GH: { code: "233", national: /^[2-5]\d{8}$/, example: "024 000 0000" },
  KE: { code: "254", national: /^[17]\d{8}$/, example: "0712 000 000" },
  GB: { code: "44", national: /^7\d{9}$/, example: "07700 900 000" },
  US: { code: "1", national: /^[2-9]\d{9}$/, example: "(201) 555-0100" },
};

export const phoneExample = (country: string) => DIAL[country]?.example ?? "+234 803 000 0000";

/**
 * Turns whatever a person typed into E.164, or returns null. "0803 000 0000" in Nigeria becomes
 * "+2348030000000"; a number already carrying its country code is accepted anywhere.
 */
export function normalisePhone(raw: string, country: string): string | null {
  const plus = raw.trim().startsWith("+") || raw.trim().startsWith("00");
  const digits = raw.replace(/\D/g, "").replace(/^00/, "");
  if (!digits) return null;
  const d = DIAL[country];
  if (plus) return /^[1-9]\d{6,14}$/.test(digits) ? `+${digits}` : null;
  if (d) {
    // National form ("0803…"), or the international form typed without the plus ("234803…").
    const national = digits.startsWith("0")
      ? digits.slice(1)
      : digits.startsWith(d.code) && d.national.test(digits.slice(d.code.length))
        ? digits.slice(d.code.length)
        : digits;
    return d.national.test(national) ? `+${d.code}${national}` : null;
  }
  return /^[1-9]\d{6,14}$/.test(digits) ? `+${digits}` : null;
}
const REF = /^[A-Z0-9]{8}$/i;

/** Validates raw form values. Returns the clean entry, or field-level messages a person can act on. */
export function validate(
  raw: Record<string, unknown>,
): { entry: WaitlistEntry } | { errors: FieldErrors } {
  // Control and zero-width characters never belong in a name or city, and the upstream mailer
  // interpolates both into email; strip them before anything else looks at the value.
  const s = (k: string) =>
    typeof raw[k] === "string"
      ? (raw[k] as string)
          // eslint-disable-next-line no-control-regex -- stripping control characters is the point
          .replace(/[\u0000-\u001F\u007F\u200B-\u200F\u2028\u2029]/g, "")
          .trim()
      : "";
  const errors: FieldErrors = {};
  const interest = s("interest");
  const city = s("city").replace(/\s+/g, " ");
  const email = s("email").toLowerCase();
  const phone = s("phone");
  const name = s("name").slice(0, 120);
  const country = s("country");
  const referralCode = s("referralCode").toUpperCase();
  const consentRaw = raw["consent"];
  const consent = consentRaw === true || consentRaw === "on" || consentRaw === "true";

  if (!INTERESTS.includes(interest as WaitlistEntry["interest"]))
    errors.interest = "Choose what you're interested in.";
  if (!COUNTRY_NAMES.has(country)) errors.country = "Choose your country.";
  if (city.length < 2 || city.length > 80) errors.city = "Enter your city.";
  if (!EMAIL.test(email) || email.length > 254) errors.email = "Enter a valid email address.";
  const e164 = phone ? normalisePhone(phone, country) : "";
  if (phone && !e164)
    errors.phone = `Enter a valid phone number, for example ${phoneExample(country)}.`;

  if (Object.keys(errors).length) return { errors };
  return {
    entry: {
      interest: interest as WaitlistEntry["interest"],
      country,
      city,
      email,
      phone: e164 ?? "",
      name,
      consent,
      referralCode: REF.test(referralCode) ? referralCode : "",
    },
  };
}

/** The honeypot field is invisible to people; bots that fill every input reveal themselves. */
export const HONEYPOT_FIELD = "contact_9f2";

export function looksAutomated(raw: Record<string, unknown>, request: Request): boolean {
  if (typeof raw[HONEYPOT_FIELD] === "string" && (raw[HONEYPOT_FIELD] as string).length > 0)
    return true;
  // Browsers send Sec-Fetch-Site; a form on this site is "same-origin" (or "none" when typed/redirected).
  const site = request.headers.get("sec-fetch-site");
  if (site === "cross-site") return true;
  return false;
}

/**
 * Best-effort rate limit per client address, kept in the instance's memory. Serverless instances
 * come and go, so this slows a flood rather than stopping it; the API has its own limits behind it.
 * Nigerian mobile carriers put thousands of people behind one address, so the limit is deliberately
 * generous: 120 valid sign-ups per address per hour.
 */
const buckets = new Map<string, { count: number; reset: number }>();

/** The visitor's address as Vercel reports it (first hop of X-Forwarded-For). */
export function clientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export function rateLimited(
  request: Request,
  limit = 120,
  windowMs = 60 * 60 * 1000,
  scope = "join",
): boolean {
  return bucketExceeded(`${scope}:${clientIp(request)}`, limit, windowMs);
}

/** Same idea keyed by anything else, e.g. an email address for resends. */
export function bucketExceeded(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  if (buckets.size > 10_000) for (const [k, v] of buckets) if (v.reset < now) buckets.delete(k);
  const b = buckets.get(key);
  if (!b || b.reset < now) {
    buckets.set(key, { count: 1, reset: now + windowMs });
    return false;
  }
  b.count += 1;
  return b.count > limit;
}

/* ---------- Earth API client (server side only) ---------- */

type Problem = {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  correlationId?: string;
  errors?: { path?: string; code?: string }[];
};

/** What the routes hand back to the form. `message` is always something a person can read. */
export type ApiOutcome<T> =
  | { ok: true; data: T }
  | { ok: false; status: number; message: string; errors?: FieldErrors; retryAfter?: number };

function base(): string {
  const b = process.env["WAITLIST_API_BASE"];
  if (!b) throw new Error("WAITLIST_API_BASE is not set");
  return b.replace(/\/$/, "");
}

/** Codes the API returns on validation-failed, mapped to sentences per field. */
const FIELD_MESSAGES: Record<string, string> = {
  email: "Enter a valid email address.",
  phone: "Enter a valid phone number, for example +234 803 000 0000.",
  city: "Choose your city.",
  intent: "Choose what you're interested in.",
  name: "Enter your name, or leave it blank.",
};
const FIELD_MAP: Record<string, keyof WaitlistEntry> = {
  email: "email",
  phone: "phone",
  city: "city",
  intent: "interest",
  name: "name",
  referralCode: "referralCode",
};

/**
 * One upstream call. `ip` is the visitor's address, forwarded because every visitor otherwise reaches
 * the API from a few Vercel egress addresses, and the API limits requests per address: ~15 sign-ups in
 * a window would lock the whole site out for 45 minutes. The API has to trust the header for this to help.
 */
async function call<T>(
  path: string,
  init: RequestInit & { ok: number[]; ip?: string },
): Promise<ApiOutcome<T>> {
  let res: Response;
  try {
    res = await fetch(base() + path, {
      ...init,
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        ...(init.ip && init.ip !== "unknown" ? { "x-forwarded-for": init.ip } : {}),
        ...(init.headers ?? {}),
      },
      signal: AbortSignal.timeout(10_000),
    });
  } catch (err) {
    console.error("waitlist api unreachable", path, err);
    return {
      ok: false,
      status: 503,
      message: "We couldn't reach the waitlist right now. Please try again in a minute.",
    };
  }
  const text = await res.text();
  let body: unknown = null;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    // A gateway in front of the API answering with HTML; treated as an upstream failure below.
    console.error("waitlist api non-json", path, res.status, text.slice(0, 200));
    if (init.ok.includes(res.status))
      return { ok: false, status: 502, message: "Something went wrong. Please try again." };
  }
  if (init.ok.includes(res.status)) return { ok: true, data: body as T };

  const p = (body ?? {}) as Problem;
  console.warn("waitlist api problem", path, res.status, p.type, p.correlationId);
  if (res.status === 400 && p.errors?.length) {
    const errors: FieldErrors = {};
    for (const e of p.errors) {
      const field = FIELD_MAP[e.path ?? ""];
      if (field) errors[field] = FIELD_MESSAGES[e.path ?? ""] ?? "Check this field.";
    }
    if (Object.keys(errors).length)
      return {
        ok: false,
        status: 400,
        message: "Some of those details are not quite right.",
        errors,
      };
  }
  if (res.status === 429) {
    const retryAfter = parseRetryAfter(res.headers.get("retry-after"));
    return {
      ok: false,
      status: 429,
      message:
        retryAfter > 120
          ? "The waitlist is very busy right now. Please try again in a little while."
          : "Too many tries in a row. Please wait a minute and try again.",
      retryAfter,
    };
  }
  return {
    ok: false,
    status: res.status,
    message:
      res.status === 503
        ? "The waitlist is catching its breath. Please try again in a minute."
        : "Something went wrong. Please try again.",
  };
}

/** Retry-After is seconds or an HTTP date; anything unreadable counts as a minute. */
export function parseRetryAfter(value: string | null): number {
  if (!value) return 60;
  if (/^\d+$/.test(value)) return Number(value);
  const at = Date.parse(value);
  return Number.isNaN(at) ? 60 : Math.max(0, Math.round((at - Date.now()) / 1000));
}

/** POST /v1/waitlist/entries. 202 whether the email is new or not; a code is emailed. */
export function join(entry: WaitlistEntry, ip: string) {
  const payload: Record<string, unknown> = {
    intent: entry.interest.toUpperCase(),
    // One free-text field on the API: Nigerian cities go bare (the default market, and what earlier
    // entries look like); anywhere else carries the country so "Other" and same-name cities stay distinct.
    city: entry.country === "NG" ? entry.city : `${entry.city}, ${countryName(entry.country)}`,
    email: entry.email,
    marketingConsent: entry.consent,
  };
  if (entry.name) payload["name"] = entry.name;
  if (entry.phone) payload["phone"] = entry.phone;
  if (entry.referralCode) payload["referralCode"] = entry.referralCode;
  return call<{ entryId: string; status: string }>("/v1/waitlist/entries", {
    method: "POST",
    body: JSON.stringify(payload),
    ok: [202],
    ip,
  });
}

/** POST /v1/waitlist/verification. Always 202, so nobody can probe who is on the list. */
export function resend(email: string, ip: string) {
  return call<null>("/v1/waitlist/verification", {
    method: "POST",
    body: JSON.stringify({ email }),
    ok: [202],
    ip,
  });
}

/** POST /v1/waitlist/verification/claim, then GET /v1/waitlist/me with the returned token. */
export async function claim(email: string, code: string, ip: string): Promise<ApiOutcome<Place>> {
  const c = await call<{ entryId: string; placeToken: string; expiresAt: string }>(
    "/v1/waitlist/verification/claim",
    { method: "POST", body: JSON.stringify({ email, code }), ok: [200], ip },
  );
  if (!c.ok) {
    if (c.status === 422)
      return {
        ...c,
        message: "That code isn't right. Check it and try again, or ask for a new one.",
      };
    if (c.status === 409)
      return {
        ...c,
        message: "This email is already confirmed. We'll email you when Earth opens.",
      };
    return c;
  }
  if (typeof c.data?.placeToken !== "string" || !c.data.placeToken)
    return { ok: false, status: 502, message: "Something went wrong. Please try again." };
  const me = await place(c.data.placeToken, String(c.data.expiresAt ?? ""), ip);
  if (!me.ok)
    return {
      ok: false,
      status: me.status,
      message: "You're confirmed, but we couldn't load your place. Refresh to try again.",
    };
  return me;
}

/** GET /v1/waitlist/me with a place token. 401 means the token is stale and the browser should forget it. */
export async function place(
  placeToken: string,
  expiresAt: string,
  ip: string,
): Promise<ApiOutcome<Place>> {
  if (!/^[\w.-]{16,512}$/.test(placeToken))
    return { ok: false, status: 401, message: "Please join again." };
  const me = await call<Omit<Place, "placeToken" | "expiresAt"> & { status: string }>(
    "/v1/waitlist/me",
    { method: "GET", headers: { "x-place-token": placeToken }, ok: [200], ip },
  );
  if (!me.ok) return me;
  const d = (me.data ?? {}) as Partial<Place>;
  // The panel renders these directly; a changed response shape must not take the page down.
  if (
    typeof d.position !== "number" ||
    !Number.isFinite(d.position) ||
    typeof d.referralCode !== "string" ||
    !REF.test(d.referralCode) ||
    typeof d.city !== "string"
  ) {
    console.error("waitlist api /me unexpected shape", Object.keys(d));
    return { ok: false, status: 502, message: "Something went wrong. Please try again." };
  }
  return {
    ok: true,
    data: {
      placeToken,
      expiresAt,
      city: d.city,
      position: d.position,
      priorityPoints: typeof d.priorityPoints === "number" ? d.priorityPoints : 0,
      referralCode: d.referralCode,
      referralsCredited: typeof d.referralsCredited === "number" ? d.referralsCredited : 0,
    },
  };
}
