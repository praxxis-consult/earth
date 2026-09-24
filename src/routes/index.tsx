import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader, getRequestUrl } from "@tanstack/react-start/server";
import { COUNTRIES } from "@/lib/waitlist";
import { NavBar } from "@/components/landing/NavBar";
import { Hero } from "@/components/landing/Hero";
import { Faq } from "@/components/landing/Faq";
import { Footer } from "@/components/landing/Footer";

const SITE = "https://earth-gamma-ecru.vercel.app";
const title = "Earth — Be the first to trade when Earth opens";
const description =
  "Earth connects farms, food stores, and verified natural resource producers directly to buyers. No speculative middlemen, zero escrow holds, with direct split payment and doorstep courier delivery.";

/**
 * Vercel stamps the visitor's country on every request; the form preselects it (empty when absent or
 * not a country the form offers). The ?waitlist= flag is the outcome of a plain HTML submit, read here
 * so the message renders even for a browser that never runs the script.
 */
const pageContext = createServerFn({ method: "GET" }).handler(() => {
  const c = (getRequestHeader("x-vercel-ip-country") ?? "").toUpperCase();
  const flag = getRequestUrl().searchParams.get("waitlist") ?? "";
  return {
    country: COUNTRIES.some((x) => x.c === c) ? c : "",
    flag: /^[a-z]{1,10}$/.test(flag) ? flag : "",
  };
});

export const Route = createFileRoute("/")({
  loader: () => pageContext(),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE },
      { property: "og:image", content: `${SITE}/og.jpg` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `${SITE}/og.jpg` },
    ],
  }),
  component: Index,
});

function Index() {
  const { country, flag } = Route.useLoaderData();
  return (
    <>
      <NavBar />
      <main className="w-full bg-white text-[#141414]">
        <Hero detectedCountry={country} initialFlag={flag} />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
