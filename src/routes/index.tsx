import { createFileRoute } from "@tanstack/react-router";
import { NavBar } from "@/components/landing/NavBar";
import { Hero } from "@/components/landing/Hero";
import { Faq } from "@/components/landing/Faq";
import { Footer } from "@/components/landing/Footer";

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
      { property: "og:image", content: "/figma/hero.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="w-full overflow-x-hidden bg-white text-[#141414]">
      <NavBar />
      <Hero />
      <Faq />
      <Footer />
    </main>
  );
}
