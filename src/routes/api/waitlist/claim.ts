import { createFileRoute } from "@tanstack/react-router";
import { claim } from "@/lib/waitlist";

const notAllowed = () =>
  new Response("Method not allowed", { status: 405, headers: { allow: "POST" } });

/** POST /api/waitlist/claim {email, code}: confirms the emailed code and returns the person's place. */
export const Route = createFileRoute("/api/waitlist/claim")({
  server: {
    handlers: {
      GET: notAllowed,
      PUT: notAllowed,
      DELETE: notAllowed,
      OPTIONS: notAllowed,
      POST: async ({ request }) => {
        const raw = (await request.json().catch(() => ({}))) as { email?: unknown; code?: unknown };
        const email = typeof raw.email === "string" ? raw.email.trim().toLowerCase() : "";
        const code = typeof raw.code === "string" ? raw.code.replace(/\D/g, "") : "";
        if (!email || !/^\d{6}$/.test(code))
          return Response.json(
            { ok: false, message: "Enter the six digits from the email." },
            { status: 400 },
          );
        const out = await claim(email, code);
        return out.ok
          ? Response.json({ ok: true, place: out.data })
          : Response.json({ ok: false, message: out.message }, { status: out.status });
      },
    },
  },
});
