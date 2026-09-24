import { createFileRoute } from "@tanstack/react-router";
import { resend } from "@/lib/waitlist";

const notAllowed = () =>
  new Response("Method not allowed", { status: 405, headers: { allow: "POST" } });

/** POST /api/waitlist/resend {email}: asks the API for a fresh code. Always reports success, as the API does. */
export const Route = createFileRoute("/api/waitlist/resend")({
  server: {
    handlers: {
      GET: notAllowed,
      PUT: notAllowed,
      DELETE: notAllowed,
      OPTIONS: notAllowed,
      POST: async ({ request }) => {
        const raw = (await request.json().catch(() => ({}))) as { email?: unknown };
        const email = typeof raw.email === "string" ? raw.email.trim().toLowerCase() : "";
        if (!email)
          return Response.json(
            { ok: false, message: "Enter your email address." },
            { status: 400 },
          );
        const out = await resend(email);
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
