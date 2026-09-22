import { head, put } from "@vercel/blob";
import { createHash } from "node:crypto";

export const INTERESTS = ["Buying", "Selling", "Both"] as const;
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
  city: (typeof CITIES)[number];
  email: string;
  phone: string;
};

export type FieldErrors = Partial<Record<keyof WaitlistEntry, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[0-9 ()-]{7,20}$/;

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

  if (!INTERESTS.includes(interest as WaitlistEntry["interest"]))
    errors.interest = "Choose what you're interested in.";
  if (!CITIES.includes(city as WaitlistEntry["city"])) errors.city = "Choose your city.";
  if (!EMAIL.test(email) || email.length > 254) errors.email = "Enter a valid email address.";
  if (phone && !PHONE.test(phone))
    errors.phone = "Enter a valid phone number, for example +234 803 000 0000.";

  if (Object.keys(errors).length) return { errors };
  return {
    entry: {
      interest: interest as WaitlistEntry["interest"],
      city: city as WaitlistEntry["city"],
      email,
      phone,
      name,
    },
  };
}

/** The honeypot field is invisible to people; bots that fill every input reveal themselves. */
export const HONEYPOT_FIELD = "website";

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
 * come and go, so this slows a flood rather than stopping it; a platform-level rule is still needed
 * for real abuse. 5 sign-ups per address per hour is far above any honest use.
 */
const buckets = new Map<string, { count: number; reset: number }>();
export function rateLimited(request: Request, limit = 5, windowMs = 60 * 60 * 1000): boolean {
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

/** One private JSON object per email. Keyed by a hash so no two addresses can share a key. */
function keyFor(email: string) {
  return `waitlist/${createHash("sha256").update(email).digest("hex")}.json`;
}

/**
 * Stores an entry. A repeat sign-up with the same email is accepted but changes nothing, so an
 * existing person's details and place in the list can never be overwritten from the outside.
 * Returns whether this was a new entry.
 */
export async function save(
  entry: WaitlistEntry,
  meta: { userAgent: string | null },
): Promise<boolean> {
  const key = keyFor(entry.email);
  const existing = await head(key).catch(() => null);
  if (existing) return false;
  await put(
    key,
    JSON.stringify({ ...entry, userAgent: meta.userAgent, createdAt: new Date().toISOString() }),
    {
      access: "private",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: false,
    },
  );
  return true;
}
