import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  claim,
  clientIp,
  normalisePhone,
  parseRetryAfter,
  place,
  COUNTRIES,
  join,
  looksAutomated,
  rateLimited,
  resend,
  validate,
} from "./waitlist";

const good = {
  interest: "Buying",
  country: "NG",
  city: "Lagos",
  email: "Ada@Example.com",
  phone: "",
  name: "Ada",
  consent: "on",
};

describe("validate", () => {
  it("accepts a clean entry and normalises it", () => {
    const r = validate(good);
    expect("entry" in r && r.entry).toMatchObject({
      interest: "Buying",
      country: "NG",
      city: "Lagos",
      email: "ada@example.com",
      consent: true,
      referralCode: "",
    });
  });
  it("requires a real country code, not a name", () => {
    const r = validate({ ...good, country: "Nigeria" });
    expect("errors" in r && r.errors.country).toBeTruthy();
  });
  it("keeps city free text but bounded and whitespace-collapsed", () => {
    const r = validate({ ...good, country: "GH", city: "  Cape   Coast " });
    expect("entry" in r && r.entry.city).toBe("Cape Coast");
    expect("errors" in validate({ ...good, city: "L" })).toBe(true);
    expect("errors" in validate({ ...good, city: "x".repeat(81) })).toBe(true);
  });
  it("only keeps a well-formed referral code", () => {
    expect(
      "entry" in validate({ ...good, referralCode: "abcd1234" }) &&
        validate({ ...good, referralCode: "abcd1234" }),
    ).toMatchObject({ entry: { referralCode: "ABCD1234" } });
    expect(validate({ ...good, referralCode: "<script>" })).toMatchObject({
      entry: { referralCode: "" },
    });
  });
  it("reports every bad field at once", () => {
    const r = validate({ interest: "Nope", country: "", city: "", email: "bad", phone: "x" });
    expect("errors" in r && Object.keys(r.errors).sort()).toEqual([
      "city",
      "country",
      "email",
      "interest",
      "phone",
    ]);
  });
  it("every country in the list validates", () => {
    for (const c of COUNTRIES) expect("entry" in validate({ ...good, country: c.c })).toBe(true);
  });
});

describe("normalisePhone", () => {
  it("turns Nigerian national numbers into E.164", () => {
    expect(normalisePhone("0803 000 0000", "NG")).toBe("+2348030000000");
    expect(normalisePhone("8030000000", "NG")).toBe("+2348030000000");
    expect(normalisePhone("2348030000000", "NG")).toBe("+2348030000000");
    expect(normalisePhone("+234 803 000 0000", "NG")).toBe("+2348030000000");
    expect(normalisePhone("0803000000", "NG")).toBeNull(); // 10 digits
    expect(normalisePhone("0603 000 0000", "NG")).toBeNull(); // no such prefix
  });
  it("accepts + numbers anywhere and demands them outside the pinned markets", () => {
    expect(normalisePhone("+44 7700 900123", "NG")).toBe("+447700900123");
    expect(normalisePhone("07700 900123", "GB")).toBe("+447700900123");
    expect(normalisePhone("(201) 555-0100", "US")).toBe("+12015550100");
    expect(normalisePhone("0612345678", "FR")).toBeNull();
    expect(normalisePhone("+33612345678", "FR")).toBe("+33612345678");
    expect(normalisePhone("abc", "NG")).toBeNull();
  });
  it("is applied by validate", () => {
    const r = validate({ ...good, phone: "0803 000 0000" });
    expect("entry" in r && r.entry.phone).toBe("+2348030000000");
    const bad = validate({ ...good, phone: "12345678" });
    expect("errors" in bad && bad.errors.phone).toMatch(/0803 000 0000/);
  });
});

describe("looksAutomated", () => {
  const req = (h: Record<string, string> = {}) =>
    new Request("http://x/api/waitlist", { headers: h });
  it("drops filled honeypots and cross-site posts", () => {
    expect(looksAutomated({ contact_9f2: "x" }, req())).toBe(true);
    expect(looksAutomated({}, req({ "sec-fetch-site": "cross-site" }))).toBe(true);
    expect(looksAutomated({}, req({ "sec-fetch-site": "same-origin" }))).toBe(false);
    expect(looksAutomated({}, req())).toBe(false);
  });
});

describe("rateLimited", () => {
  it("counts per first forwarded address", () => {
    const r = (ip: string) =>
      new Request("http://x", { headers: { "x-forwarded-for": `${ip}, 10.0.0.1` } });
    for (let i = 0; i < 3; i++) expect(rateLimited(r("1.2.3.4"), 3)).toBe(false);
    expect(rateLimited(r("1.2.3.4"), 3)).toBe(true);
    expect(rateLimited(r("5.6.7.8"), 3)).toBe(false);
    expect(clientIp(r("1.2.3.4"))).toBe("1.2.3.4");
  });
});

describe("api client", () => {
  const calls: { url: string; init: RequestInit }[] = [];
  let reply: (url: string, init: RequestInit) => Response;
  beforeEach(() => {
    calls.length = 0;
    process.env["WAITLIST_API_BASE"] = "http://api.test/";
    vi.stubGlobal("fetch", (url: string, init: RequestInit) => {
      calls.push({ url, init });
      return Promise.resolve(reply(url, init));
    });
  });
  afterEach(() => vi.unstubAllGlobals());
  const entry = (over: Partial<Parameters<typeof join>[0]> = {}) => ({
    interest: "Both" as const,
    name: "",
    country: "NG",
    city: "Lagos",
    email: "a@b.co",
    phone: "",
    consent: false,
    referralCode: "",
    ...over,
  });

  it("maps the form onto the API's fields and never sends country", async () => {
    reply = () => Response.json({ entryId: "e", status: "pending_verification" }, { status: 202 });
    const out = await join(
      entry({ name: "Ada", phone: "+2348030000000", referralCode: "ABCD1234", consent: true }),
      "9.9.9.9",
    );
    expect(out.ok).toBe(true);
    const sent = JSON.parse(calls[0]!.init.body as string);
    expect(sent).toEqual({
      intent: "BOTH",
      city: "Lagos",
      email: "a@b.co",
      marketingConsent: true,
      name: "Ada",
      phone: "+2348030000000",
      referralCode: "ABCD1234",
    });
    expect(calls[0]!.url).toBe("http://api.test/v1/waitlist/entries");
    expect((calls[0]!.init.headers as Record<string, string>)["x-forwarded-for"]).toBe("9.9.9.9");
  });
  it("folds the country into the city for non-Nigerian entries", async () => {
    reply = () => Response.json({}, { status: 202 });
    await join(entry({ country: "GH", city: "Accra" }), "unknown");
    const h = calls[0]!.init.headers as Record<string, string>;
    expect(JSON.parse(calls[0]!.init.body as string).city).toBe("Accra, Ghana");
    expect(h["x-forwarded-for"]).toBeUndefined();
  });
  it("turns validation problems into field errors", async () => {
    reply = () =>
      Response.json(
        {
          type: "https://earth.example/problems/validation-failed",
          title: "Bad",
          errors: [{ path: "phone", code: "invalid" }],
        },
        { status: 400 },
      );
    const out = await join(entry({ phone: "12345678" }), "1.1.1.1");
    expect(out).toMatchObject({
      ok: false,
      status: 400,
      errors: { phone: expect.stringContaining("phone") },
    });
  });
  it("survives a non-JSON upstream body and a network failure", async () => {
    reply = () => new Response("<html>bad gateway</html>", { status: 502 });
    expect(await resend("a@b.co", "1.1.1.1")).toMatchObject({ ok: false, status: 502 });
    reply = () => new Response("<html>", { status: 202 });
    expect(await resend("a@b.co", "1.1.1.1")).toMatchObject({ ok: false, status: 502 });
    vi.stubGlobal("fetch", () => Promise.reject(new TypeError("fetch failed")));
    expect(await resend("a@b.co", "1.1.1.1")).toMatchObject({ ok: false, status: 503 });
  });
  it("tells a busy site apart from a person retrying", async () => {
    reply = () => Response.json({}, { status: 429, headers: { "retry-after": "2740" } });
    const slow = await join(entry(), "1.1.1.1");
    expect(slow).toMatchObject({ ok: false, status: 429, retryAfter: 2740 });
    expect(!slow.ok && slow.message).toMatch(/busy/);
    reply = () => Response.json({}, { status: 429, headers: { "retry-after": "30" } });
    const quick = await join(entry(), "1.1.1.1");
    expect(!quick.ok && quick.message).toMatch(/minute/);
  });
  it("claims then reads the place with the token, and maps code problems", async () => {
    reply = (url) =>
      url.endsWith("/claim")
        ? Response.json({ entryId: "e", placeToken: "tok_0123456789abcdef", expiresAt: "" })
        : Response.json({
            entryId: "e",
            city: "Lagos",
            position: 12,
            priorityPoints: 1,
            referralCode: "REFCODE1",
            referralsCredited: 0,
            status: "confirmed",
          });
    const out = await claim("a@b.co", "123456", "1.1.1.1");
    expect(out).toMatchObject({
      ok: true,
      data: { position: 12, referralCode: "REFCODE1", city: "Lagos" },
    });
    expect((calls[1]!.init.headers as Record<string, string>)["x-place-token"]).toBe(
      "tok_0123456789abcdef",
    );
    reply = () =>
      Response.json(
        { type: "https://earth.example/problems/waitlist/code-invalid" },
        { status: 422 },
      );
    expect(await claim("a@b.co", "000000", "1.1.1.1")).toMatchObject({
      ok: false,
      status: 422,
      message: expect.stringMatching(/code isn't right/),
    });
    reply = () => Response.json({}, { status: 409 });
    expect(await claim("a@b.co", "000000", "1.1.1.1")).toMatchObject({
      ok: false,
      status: 409,
      message: expect.stringMatching(/already confirmed/),
    });
  });
});

describe("place", () => {
  beforeEach(() => {
    process.env["WAITLIST_API_BASE"] = "http://api.test";
  });
  afterEach(() => vi.unstubAllGlobals());
  it("rejects an unexpected /me shape instead of letting the page crash on it", async () => {
    vi.stubGlobal("fetch", () => Promise.resolve(Response.json({ placeToken: "T" })));
    const out = await place("tok_0123456789abcdef", "", "1.1.1.1");
    expect(out).toMatchObject({ ok: false, status: 502 });
    vi.stubGlobal("fetch", () =>
      Promise.resolve(Response.json({ city: "Lagos", position: "12", referralCode: "REFCODE1" })),
    );
    expect(await place("tok_0123456789abcdef", "", "1.1.1.1")).toMatchObject({
      ok: false,
      status: 502,
    });
  });
  it("refuses malformed tokens without calling the API", async () => {
    const f = vi.fn();
    vi.stubGlobal("fetch", f);
    expect(await place("short", "", "1.1.1.1")).toMatchObject({ ok: false, status: 401 });
    expect(await place("bad token with spaces and more", "", "1.1.1.1")).toMatchObject({
      ok: false,
      status: 401,
    });
    expect(f).not.toHaveBeenCalled();
  });
});

describe("parseRetryAfter", () => {
  it("reads seconds, HTTP dates, and shrugs at garbage", () => {
    expect(parseRetryAfter("2740")).toBe(2740);
    expect(parseRetryAfter(new Date(Date.now() + 90_000).toUTCString())).toBeGreaterThanOrEqual(89);
    expect(parseRetryAfter("soon")).toBe(60);
    expect(parseRetryAfter(null)).toBe(60);
  });
});

describe("validate strips what a mailer could misread", () => {
  it("drops control and zero-width characters from name and city", () => {
    const CR = String.fromCharCode(13);
    const LF = String.fromCharCode(10);
    const NUL = String.fromCharCode(0);
    const ZW = String.fromCharCode(0x200b);
    const r = validate({ ...good, name: `Bob${CR}${LF}X-Injected: 1`, city: `La${NUL}gos${ZW}` });
    expect("entry" in r && r.entry).toMatchObject({ name: "BobX-Injected: 1", city: "Lagos" });
  });
});
