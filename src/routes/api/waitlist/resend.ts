import { createFileRoute } from "@tanstack/react-router";
import {
  EMAIL,
  bucketExceeded,
  clientIp,
  looksAutomated,
  rateLimited,
  resend,
} from "@/lib/waitlist";

const notAllowed = () =>
  new Response("Method not allowed", { status: 405, headers: { allow: "POST" } });

/** JSON only: a plain-text form post from another site never reaches the API. */
const notJson = (request: Request) =>
  !(request.headers.get("content-type") ?? "").includes("application/json");

/**
 * POST /api/waitlist/resend {email}: asks the API for a fresh code. Every call here sends someone
 * an email, so it is held far tighter than sign-up: a few per address and per mailbox, and bots get
 * the same "sent" answer with nothing forwarded (the API itself always answers 202).
 */
export const Route = createFileRoute("/api/waitlist/resend")({
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
        if (!EMAIL.test(email) || email.length > 254)
          return Response.json(
            { ok: false, message: "Enter your email address." },
            { status: 400 },
          );
        if (looksAutomated(raw, request)) return Response.json({ ok: true });
        if (
          rateLimited(request, 6, 15 * 60_000, "resend") ||
          bucketExceeded(`resend:${email}`, 3, 60 * 60_000)
        )
          return Response.json(
            {
              ok: false,
              message: "We've sent a few codes already. Check spam, then try again later.",
              retryAfter: 900,
            },
            { status: 429, headers: { "retry-after": "900" } },
          );
        const out = await resend(email, clientIp(request));
        return out.ok
          ? Response.json({ ok: true })
          : Response.json(
              { ok: false, message: out.message, retryAfter: out.retryAfter },
              { status: out.status },
            );
      },
    },
  },
});
