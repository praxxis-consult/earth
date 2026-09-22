import { createFileRoute } from "@tanstack/react-router";
import { save, validate } from "@/lib/waitlist";

/**
 * POST /api/waitlist. Accepts JSON (from the hydrated form) or a urlencoded body (from a plain
 * HTML submit before hydration), so a sign-up is never lost or turned into a GET with the
 * person's details in the URL.
 */
export const Route = createFileRoute("/api/waitlist")({
  server: {
    handlers: {
      GET: () => new Response("Method not allowed", { status: 405, headers: { allow: "POST" } }),
      POST: async ({ request }) => {
        const type = request.headers.get("content-type") ?? "";
        let raw: Record<string, unknown> = {};
        if (type.includes("application/json")) {
          raw = (await request.json().catch(() => ({}))) as Record<string, unknown>;
        } else {
          const form = await request.formData().catch(() => null);
          if (form) raw = Object.fromEntries(form.entries());
        }
        const result = validate(raw);
        if ("errors" in result) {
          return type.includes("application/json")
            ? Response.json({ ok: false, errors: result.errors }, { status: 400 })
            : Response.redirect(new URL("/?waitlist=invalid#waitlist", request.url), 303);
        }
        try {
          await save(result.entry, { userAgent: request.headers.get("user-agent") });
        } catch (err) {
          console.error("waitlist save failed", err);
          return type.includes("application/json")
            ? Response.json(
                { ok: false, message: "We couldn't save your details. Please try again." },
                { status: 503 },
              )
            : Response.redirect(new URL("/?waitlist=error#waitlist", request.url), 303);
        }
        return type.includes("application/json")
          ? Response.json({ ok: true })
          : Response.redirect(new URL("/?waitlist=joined#waitlist", request.url), 303);
      },
    },
  },
});
