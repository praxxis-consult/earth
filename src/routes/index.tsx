import { createFileRoute } from "@tanstack/react-router";
import { NavBar } from "@/components/landing/NavBar";
import { Hero } from "@/components/landing/Hero";
import { Faq } from "@/components/landing/Faq";
import { Footer } from "@/components/landing/Footer";

const SITE = "https://earth-gamma-ecru.vercel.app";
const title = "Earth — Be the first to trade when Earth opens";
const description =
  "Earth connects farms, food stores, and verified natural resource producers directly to buyers. No speculative middlemen, zero escrow holds, with direct split payment and doorstep courier delivery.";

export const Route = createFileRoute("/")({
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
  return (
    <>
      <NavBar />
      <main className="w-full bg-white text-[#141414]">
        <Hero />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
