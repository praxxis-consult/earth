import { createFileRoute } from "@tanstack/react-router";
import { clientIp, looksAutomated, place, rateLimited } from "@/lib/waitlist";

const notAllowed = () =>
  new Response("Method not allowed", { status: 405, headers: { allow: "POST" } });

/** JSON only: a plain-text form post from another site never reaches the API. */
const notJson = (request: Request) =>
  !(request.headers.get("content-type") ?? "").includes("application/json");

/**
 * POST /api/waitlist/me {placeToken, expiresAt}: the confirmed panel on a return visit, with a fresh
 * referral count. POST rather than GET so the token never lands in a URL, log or cache.
 */
export const Route = createFileRoute("/api/waitlist/me")({
  server: {
    handlers: {
      GET: notAllowed,
      PUT: notAllowed,
      DELETE: notAllowed,
      OPTIONS: notAllowed,
      POST: async ({ request }) => {
        if (notJson(request)) return notAllowed();
        const raw = (await request.json().catch(() => ({}))) as Record<string, unknown>;
        const token = typeof raw["placeToken"] === "string" ? raw["placeToken"] : "";
        const expiresAt = typeof raw["expiresAt"] === "string" ? raw["expiresAt"] : "";
        if (looksAutomated(raw, request) || rateLimited(request, 30, 15 * 60_000, "me"))
          return Response.json(
            { ok: false, message: "Please try again later." },
            { status: 429, headers: { "retry-after": "300" } },
          );
        const out = await place(token, expiresAt, clientIp(request));
        return out.ok
          ? Response.json(
              { ok: true, place: out.data },
              { headers: { "cache-control": "no-store" } },
            )
          : Response.json({ ok: false, message: out.message }, { status: out.status });
      },
    },
  },
});
