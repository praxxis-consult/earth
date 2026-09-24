import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Route as JoinRoute } from "./waitlist";
import { Route as ClaimRoute } from "./waitlist/claim";
import { Route as ResendRoute } from "./waitlist/resend";
import { Route as MeRoute } from "./waitlist/me";

/** Calls a file route's POST handler the way the server does, with just the request. */
type Handler = (ctx: { request: Request }) => Promise<Response> | Response;
// The file routes are typed against the generated tree; here only the handler map matters.
const post = (route: unknown) =>
  (route as { options: { server: { handlers: Record<string, Handler> } } }).options.server.handlers[
    "POST"
  ]!;

const json = (path: string, body: unknown, headers: Record<string, string> = {}) =>
  new Request(`http://site.test${path}`, {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
const form = (path: string, body: Record<string, string>) =>
  new Request(`http://site.test${path}`, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(body).toString(),
  });

let upstream: { url: string; init: RequestInit }[] = [];
let reply: (url: string) => Response = () => Response.json({}, { status: 202 });
let ipSeq = 0;
/** A fresh address per test so the in-memory buckets never bleed between cases. */
const ip = () => `10.1.${Math.floor(ipSeq / 250)}.${(ipSeq++ % 250) + 1}`;

beforeEach(() => {
  upstream = [];
  process.env["WAITLIST_API_BASE"] = "http://api.test";
  vi.stubGlobal("fetch", (url: string, init: RequestInit) => {
    upstream.push({ url, init });
    return Promise.resolve(reply(url));
  });
});
afterEach(() => vi.unstubAllGlobals());

const good = { interest: "Buying", country: "NG", city: "Lagos", email: "ada@example.com" };

describe("POST /api/waitlist", () => {
  it("forwards a valid JSON sign-up and reports the pending status", async () => {
    reply = () => Response.json({ entryId: "e", status: "pending_verification" }, { status: 202 });
    const res = await post(JoinRoute)({
      request: json("/api/waitlist", good, { "x-forwarded-for": ip() }),
    });
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true, status: "pending_verification" });
    expect(upstream[0]!.url).toBe("http://api.test/v1/waitlist/entries");
  });
  it("answers a bot with success and forwards nothing (honeypot, cross-site)", async () => {
    let res = await post(JoinRoute)({
      request: json(
        "/api/waitlist",
        { ...good, contact_9f2: "filled" },
        { "x-forwarded-for": ip() },
      ),
    });
    expect(res.status).toBe(200);
    res = await post(JoinRoute)({
      request: json("/api/waitlist", good, {
        "sec-fetch-site": "cross-site",
        "x-forwarded-for": ip(),
      }),
    });
    expect(res.status).toBe(200);
    expect(upstream).toHaveLength(0);
  });
  it("returns field errors without calling upstream", async () => {
    const res = await post(JoinRoute)({
      request: json(
        "/api/waitlist",
        { ...good, email: "nope", country: "Nigeria" },
        { "x-forwarded-for": ip() },
      ),
    });
    expect(res.status).toBe(400);
    expect((await res.json()).errors).toMatchObject({
      email: expect.any(String),
      country: expect.any(String),
    });
    expect(upstream).toHaveLength(0);
  });
  it("redirects a plain HTML submit to the check flag, and invalid ones to invalid", async () => {
    let res = await post(JoinRoute)({ request: form("/api/waitlist", good) });
    expect(res.status).toBe(303);
    expect(res.headers.get("location")).toBe("http://site.test/?waitlist=check#waitlist");
    res = await post(JoinRoute)({ request: form("/api/waitlist", { ...good, email: "x" }) });
    expect(res.headers.get("location")).toBe("http://site.test/?waitlist=invalid#waitlist");
  });
  it("survives an empty upstream 202 body", async () => {
    reply = () => new Response(null, { status: 202 });
    const res = await post(JoinRoute)({
      request: json("/api/waitlist", good, { "x-forwarded-for": ip() }),
    });
    expect(await res.json()).toEqual({ ok: true, status: "pending_verification" });
  });
  it("limits sign-ups per address after validation and says so with Retry-After", async () => {
    const addr = ip();
    for (let i = 0; i < 120; i++)
      await post(JoinRoute)({ request: json("/api/waitlist", good, { "x-forwarded-for": addr }) });
    const res = await post(JoinRoute)({
      request: json("/api/waitlist", good, { "x-forwarded-for": addr }),
    });
    expect(res.status).toBe(429);
    expect(res.headers.get("retry-after")).toBeTruthy();
  });
});

describe("POST /api/waitlist/resend", () => {
  it("refuses non-JSON bodies (no cross-site form CSRF)", async () => {
    const res = await post(ResendRoute)({
      request: form("/api/waitlist/resend", { email: "a@b.co" }),
    });
    expect(res.status).toBe(405);
    expect(upstream).toHaveLength(0);
  });
  it("validates the address before forwarding", async () => {
    const res = await post(ResendRoute)({
      request: json("/api/waitlist/resend", { email: "nope" }, { "x-forwarded-for": ip() }),
    });
    expect(res.status).toBe(400);
    expect(upstream).toHaveLength(0);
  });
  it("pretends to send for bots, and forwards nothing", async () => {
    const res = await post(ResendRoute)({
      request: json(
        "/api/waitlist/resend",
        { email: "a@b.co" },
        { "sec-fetch-site": "cross-site", "x-forwarded-for": ip() },
      ),
    });
    expect(await res.json()).toEqual({ ok: true });
    expect(upstream).toHaveLength(0);
  });
  it("caps codes per mailbox at 3 an hour even from different addresses", async () => {
    const email = `cap-${Date.now()}@example.com`;
    for (let i = 0; i < 3; i++) {
      const r = await post(ResendRoute)({
        request: json("/api/waitlist/resend", { email }, { "x-forwarded-for": ip() }),
      });
      expect(r.status).toBe(200);
    }
    const res = await post(ResendRoute)({
      request: json("/api/waitlist/resend", { email }, { "x-forwarded-for": ip() }),
    });
    expect(res.status).toBe(429);
    expect(res.headers.get("retry-after")).toBe("900");
    expect(upstream).toHaveLength(3);
  });
});

describe("POST /api/waitlist/claim", () => {
  it("needs a well-formed email and six digits", async () => {
    const res = await post(ClaimRoute)({
      request: json(
        "/api/waitlist/claim",
        { email: "a@b.co", code: "12" },
        { "x-forwarded-for": ip() },
      ),
    });
    expect(res.status).toBe(400);
    expect(upstream).toHaveLength(0);
  });
  it("caps guesses per mailbox at 10 in 15 minutes", async () => {
    reply = () => Response.json({}, { status: 422 });
    const email = `guess-${Date.now()}@example.com`;
    for (let i = 0; i < 10; i++)
      await post(ClaimRoute)({
        request: json(
          "/api/waitlist/claim",
          { email, code: "123456" },
          { "x-forwarded-for": ip() },
        ),
      });
    const res = await post(ClaimRoute)({
      request: json("/api/waitlist/claim", { email, code: "123456" }, { "x-forwarded-for": ip() }),
    });
    expect(res.status).toBe(429);
    expect(upstream).toHaveLength(10);
  });
  it("returns the place with no-store on success", async () => {
    reply = (url) =>
      url.endsWith("/claim")
        ? Response.json({
            entryId: "e",
            placeToken: "tok_0123456789abcdef",
            expiresAt: "2099-01-01T00:00:00Z",
          })
        : Response.json({
            entryId: "e",
            city: "Lagos",
            position: 5,
            priorityPoints: 0,
            referralCode: "ABCD1234",
            referralsCredited: 0,
            status: "confirmed",
          });
    const res = await post(ClaimRoute)({
      request: json(
        "/api/waitlist/claim",
        { email: "ok@example.com", code: "654321" },
        { "x-forwarded-for": ip() },
      ),
    });
    expect(res.status).toBe(200);
    expect(res.headers.get("cache-control")).toBe("no-store");
    expect((await res.json()).place).toMatchObject({
      position: 5,
      referralCode: "ABCD1234",
      placeToken: "tok_0123456789abcdef",
    });
  });
});

describe("POST /api/waitlist/me", () => {
  it("rejects a bad token locally and never forwards it", async () => {
    const res = await post(MeRoute)({
      request: json(
        "/api/waitlist/me",
        { placeToken: "x", expiresAt: "" },
        { "x-forwarded-for": ip() },
      ),
    });
    expect(res.status).toBe(401);
    expect(upstream).toHaveLength(0);
  });
  it("refuses non-JSON", async () => {
    const res = await post(MeRoute)({
      request: form("/api/waitlist/me", { placeToken: "tok_0123456789abcdef" }),
    });
    expect(res.status).toBe(405);
  });
});
