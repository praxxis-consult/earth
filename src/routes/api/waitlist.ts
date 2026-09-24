import { createFileRoute } from "@tanstack/react-router";
import { clientIp, join, looksAutomated, rateLimited, validate } from "@/lib/waitlist";

const notAllowed = () =>
  new Response("Method not allowed", { status: 405, headers: { allow: "POST" } });

/**
 * POST /api/waitlist: validates and forwards a sign-up to the Earth API, which emails a six-digit
 * code. Accepts JSON (from the hydrated form) or a urlencoded body (a plain HTML submit before
 * hydration), so a sign-up is never lost or turned into a GET with the person's details in the URL.
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

        let raw: Record<string, unknown> = {};
        if (isJson) {
          raw = (await request.json().catch(() => ({}))) as Record<string, unknown>;
        } else {
          const form = await request.formData().catch(() => null);
          if (form) raw = Object.fromEntries(form.entries());
        }

        // A bot gets the same happy response as a person, and nothing is sent on.
        if (looksAutomated(raw, request))
          return isJson
            ? Response.json({ ok: true, status: "pending_verification" })
            : back("check");

        const result = validate(raw);
        if ("errors" in result) {
          return isJson
            ? Response.json({ ok: false, errors: result.errors }, { status: 400 })
            : back("invalid");
        }
        // Counted after validation, so typos never eat into a shared address's allowance.
        if (rateLimited(request))
          return isJson
            ? Response.json(
                {
                  ok: false,
                  message:
                    "A lot of people on your connection just signed up. Please try again in a few minutes.",
                },
                { status: 429, headers: { "retry-after": "600" } },
              )
            : back("busy");

        const out = await join(result.entry, clientIp(request));
        if (!out.ok) {
          return isJson
            ? Response.json(
                { ok: false, message: out.message, errors: out.errors },
                { status: out.status },
              )
            : back(out.status === 400 ? "invalid" : "error");
        }
        return isJson
          ? Response.json({ ok: true, status: out.data?.status ?? "pending_verification" })
          : back("check");
      },
    },
  },
});
