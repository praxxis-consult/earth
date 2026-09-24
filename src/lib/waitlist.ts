/**
 * Waitlist model and the client for the Earth API (v1). The browser never talks to the API
 * directly: it is plain HTTP with no CORS, so the routes under /api/waitlist proxy to it from
 * the server. Field names differ between the form and the API and are mapped here.
 */

export const INTERESTS = ["Buying", "Selling", "Both"] as const;
export const COUNTRIES = [
  "Nigeria",
  "Ghana",
  "Kenya",
  "United Kingdom",
  "United States",
  "Other",
] as const;
export const CITIES = [
  "Lagos",
  "Abuja",
  "Kano",
  "Kaduna",
  "Port Harcourt",
  "Ibadan",
  "Other",
] as const;

export type WaitlistEntry = {
  interest: (typeof INTERESTS)[number];
  name: string;
  /** Asked on the mobile form only (Figma 259:1955). The API has no country field, so it is not sent. */
  country: (typeof COUNTRIES)[number] | "";
  city: (typeof CITIES)[number];
  email: string;
  phone: string;
  /** The consent tick (Figma 287:2155, mobile only). Sent as marketingConsent. */
  consent: boolean;
  /** From the ?ref= parameter on a share link, never typed. */
  referralCode: string;
};

export type FieldErrors = Partial<Record<keyof WaitlistEntry, string>>;

export type Place = {
  city: string;
  position: number;
  priorityPoints: number;
  referralCode: string;
  referralsCredited: number;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[0-9 ()-]{7,20}$/;
const REF = /^[A-Z0-9]{8}$/i;

/** Validates raw form values. Returns the clean entry, or field-level messages a person can act on. */
export function validate(
  raw: Record<string, unknown>,
): { entry: WaitlistEntry } | { errors: FieldErrors } {
  const s = (k: string) => (typeof raw[k] === "string" ? (raw[k] as string).trim() : "");
  const errors: FieldErrors = {};
  const interest = s("interest");
  const city = s("city");
  const email = s("email").toLowerCase();
  const phone = s("phone");
  const name = s("name").slice(0, 120);
  const country = s("country");
  const referralCode = s("referralCode").toUpperCase();
  const consentRaw = raw["consent"];
  const consent = consentRaw === true || consentRaw === "on" || consentRaw === "true";

  if (!INTERESTS.includes(interest as WaitlistEntry["interest"]))
    errors.interest = "Choose what you're interested in.";
  if (country && !COUNTRIES.includes(country as (typeof COUNTRIES)[number]))
    errors.country = "Choose your country.";
  if (!CITIES.includes(city as WaitlistEntry["city"])) errors.city = "Choose your city.";
  if (!EMAIL.test(email) || email.length > 254) errors.email = "Enter a valid email address.";
  if (phone && !PHONE.test(phone))
    errors.phone = "Enter a valid phone number, for example +234 803 000 0000.";

  if (Object.keys(errors).length) return { errors };
  return {
    entry: {
      interest: interest as WaitlistEntry["interest"],
      country: country as WaitlistEntry["country"],
      city: city as WaitlistEntry["city"],
      email,
      phone,
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
export function rateLimited(request: Request, limit = 120, windowMs = 60 * 60 * 1000): boolean {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  const now = Date.now();
  const b = buckets.get(ip);
  if (!b || b.reset < now) {
    buckets.set(ip, { count: 1, reset: now + windowMs });
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

async function call<T>(path: string, init: RequestInit & { ok: number[] }): Promise<ApiOutcome<T>> {
  let res: Response;
  try {
    res = await fetch(base() + path, {
      ...init,
      headers: {
        accept: "application/json",
        "content-type": "application/json",
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
  const body = text ? (JSON.parse(text) as unknown) : null;
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
        message: p.title ?? "Some of those details are not quite right.",
        errors,
      };
  }
  if (res.status === 429) {
    const retryAfter = Number(res.headers.get("retry-after") ?? 60);
    return {
      ok: false,
      status: 429,
      message: "Too many tries in a row. Please wait a minute and try again.",
      retryAfter,
    };
  }
  return {
    ok: false,
    status: res.status,
    message: p.title ?? "Something went wrong. Please try again.",
  };
}

/** POST /v1/waitlist/entries. 202 whether the email is new or not; a code is emailed. */
export function join(entry: WaitlistEntry) {
  const payload: Record<string, unknown> = {
    intent: entry.interest.toUpperCase(),
    city: entry.city,
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
  });
}

/** POST /v1/waitlist/verification. Always 202, so nobody can probe who is on the list. */
export function resend(email: string) {
  return call<null>("/v1/waitlist/verification", {
    method: "POST",
    body: JSON.stringify({ email }),
    ok: [202],
  });
}

/** POST /v1/waitlist/verification/claim, then GET /v1/waitlist/me with the returned token. */
export async function claim(email: string, code: string): Promise<ApiOutcome<Place>> {
  const c = await call<{ entryId: string; placeToken: string; expiresAt: string }>(
    "/v1/waitlist/verification/claim",
    { method: "POST", body: JSON.stringify({ email, code }), ok: [200] },
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
  const me = await call<Place & { status: string }>("/v1/waitlist/me", {
    method: "GET",
    headers: { "x-place-token": c.data.placeToken },
    ok: [200],
  });
  if (!me.ok)
    return {
      ok: false,
      status: me.status,
      message: "You're confirmed, but we couldn't load your place. Refresh to try again.",
    };
  const { city, position, priorityPoints, referralCode, referralsCredited } = me.data;
  return { ok: true, data: { city, position, priorityPoints, referralCode, referralsCredited } };
}
