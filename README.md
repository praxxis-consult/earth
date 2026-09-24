# Earth

Landing page for Earth — a global import/export and natural-resource trading business spanning agriculture, energy, minerals, metals, forestry and raw materials.

## Stack

- React 19 + TypeScript
- TanStack Start (SSR, file-based routing) + TanStack Query
- Vite 8 + Nitro
- Tailwind CSS v4 + shadcn/ui + Motion

## Development

```sh
bun install
bun run dev        # http://localhost:8080
```

## Scripts

| Command           | Description                    |
| ----------------- | ------------------------------ |
| `bun run dev`     | Start the dev server           |
| `bun run build`   | Production build (`dist/`)     |
| `bun run preview` | Preview the production build   |
| `bun run lint`    | ESLint                         |
| `bun run format`  | Prettier                       |
| `bun run test`    | Vitest (waitlist validation, API client, proxies) |
| `bun run geo`     | Regenerate the country and city lists from GeoNames |

## Waitlist

The form posts to `/api/waitlist`, which validates and forwards to the Earth API
(`WAITLIST_API_BASE`, set in `.env.local` and in Vercel). The API is plain HTTP with no CORS, so
the browser never talks to it directly; `/api/waitlist/claim`, `/api/waitlist/resend` and
`/api/waitlist/me` proxy the rest of the flow (six-digit code, place on the list, referral link).
Each proxy carries a honeypot check, a cross-site refusal and per-address / per-email limits.

Country and city lists under `public/geo/` and `src/lib/countries.json` are derived from
[GeoNames](https://www.geonames.org) (CC BY 4.0): every country, and towns over 15,000 people.
City is free text with those towns as suggestions, so nobody from a smaller place is turned away.

## Structure

```
src/
  routes/          file-based routes (__root.tsx is the app shell)
  components/landing landing-page sections (WaitlistCard, CityField, …)
  assets/          imagery
  lib/             utilities and SSR error handling
```
