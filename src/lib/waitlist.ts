import { put } from "@vercel/blob";

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

/** Stores one entry as a private JSON object. One object per sign-up; the email is the key, so a repeat sign-up overwrites itself. */
export async function save(entry: WaitlistEntry, meta: { userAgent: string | null }) {
  const key = `waitlist/${entry.email.replace(/[^a-z0-9@._+-]/g, "_")}.json`;
  await put(
    key,
    JSON.stringify({ ...entry, userAgent: meta.userAgent, createdAt: new Date().toISOString() }),
    {
      access: "private",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
    },
  );
}
