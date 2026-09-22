import { createFileRoute } from "@tanstack/react-router";
import { looksAutomated, rateLimited, save, validate } from "@/lib/waitlist";

const notAllowed = () =>
  new Response("Method not allowed", { status: 405, headers: { allow: "POST" } });

/**
 * POST /api/waitlist. Accepts JSON (from the hydrated form) or a urlencoded body (from a plain
 * HTML submit before hydration), so a sign-up is never lost or turned into a GET with the
 * person's details in the URL. Every other method is refused.
 */
export const Route = createFileRoute("/api/waitlist")({
  server: {
    handlers: {
      GET: notAllowed,
      HEAD: notAllowed,
      PUT: notAllowed,
      PATCH: notAllowed,
      DELETE: notAllowed,
      OPTIONS: notAllowed,
      POST: async ({ request }) => {
        const type = request.headers.get("content-type") ?? "";
        const isJson = type.includes("application/json");
        const back = (flag: string) =>
          Response.redirect(new URL(`/?waitlist=${flag}#waitlist`, request.url), 303);
        const fail = (status: number, message: string, flag: string) =>
          isJson ? Response.json({ ok: false, message }, { status }) : back(flag);

        let raw: Record<string, unknown> = {};
        if (isJson) {
          raw = (await request.json().catch(() => ({}))) as Record<string, unknown>;
        } else {
          const form = await request.formData().catch(() => null);
          if (form) raw = Object.fromEntries(form.entries());
        }

        // A bot gets the same happy response as a person, and nothing is stored.
        if (looksAutomated(raw, request))
          return isJson ? Response.json({ ok: true }) : back("joined");
        if (rateLimited(request))
          return fail(
            429,
            "Too many sign-ups from this connection. Please try again later.",
            "error",
          );

        const result = validate(raw);
        if ("errors" in result) {
          return isJson
            ? Response.json({ ok: false, errors: result.errors }, { status: 400 })
            : back("invalid");
        }
        try {
          await save(result.entry, { userAgent: request.headers.get("user-agent") });
        } catch (err) {
          console.error("waitlist save failed", err);
          return fail(503, "We couldn't save your details. Please try again.", "error");
        }
        return isJson ? Response.json({ ok: true }) : back("joined");
      },
    },
  },
});
