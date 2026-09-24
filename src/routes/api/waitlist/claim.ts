import { createFileRoute } from "@tanstack/react-router";
import {
  EMAIL,
  bucketExceeded,
  claim,
  clientIp,
  looksAutomated,
  rateLimited,
} from "@/lib/waitlist";

const notAllowed = () =>
  new Response("Method not allowed", { status: 405, headers: { allow: "POST" } });

/** JSON only: a plain-text form post from another site never reaches the API. */
const notJson = (request: Request) =>
  !(request.headers.get("content-type") ?? "").includes("application/json");

/** POST /api/waitlist/claim {email, code}: confirms the emailed code and returns the person's place. */
export const Route = createFileRoute("/api/waitlist/claim")({
  server: {
    handlers: {
      GET: notAllowed,
      PUT: notAllowed,
      DELETE: notAllowed,
      OPTIONS: notAllowed,
      POST: async ({ request }) => {
        if (notJson(request)) return notAllowed();
        const raw = (await request.json().catch(() => ({}))) as Record<string, unknown>;
        const email = typeof raw["email"] === "string" ? raw["email"].trim().toLowerCase() : "";
        const code = typeof raw["code"] === "string" ? raw["code"].replace(/\D/g, "") : "";
        if (!EMAIL.test(email) || email.length > 254 || !/^\d{6}$/.test(code))
          return Response.json(
            { ok: false, message: "Enter the six digits from the email." },
            { status: 400 },
          );
        // A code has a million values; guessing is stopped here before the API ever sees it.
        if (looksAutomated(raw, request))
          return Response.json({ ok: false, message: "That code isn't right." }, { status: 422 });
        if (
          rateLimited(request, 20, 15 * 60_000, "claim") ||
          bucketExceeded(`claim:${email}`, 10, 15 * 60_000)
        )
          return Response.json(
            {
              ok: false,
              message: "Too many tries. Ask for a new code and try again in a few minutes.",
            },
            { status: 429, headers: { "retry-after": "300" } },
          );
        const out = await claim(email, code, clientIp(request));
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
