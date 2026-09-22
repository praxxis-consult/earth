import { WaitlistCard } from "./WaitlistCard";

/**
 * Figma "hero opt 1" (213:1043): 1440×1544, layout none.
 * Image rect 1440×1800 at y −256 (cover). Gradient rect: 180deg rgba(12,11,9) .62 → .25 → .88,
 * stops at 10/48/100% over a handle that ends at 88% height → 8.8% / 42.2% / 88%.
 * Headline block at (350,160) 741 wide; card at (120,864) 1200×560.
 */
export function Hero() {
  return (
    <section className="relative h-[1544px] w-full overflow-hidden bg-white">
      <img
        src="/figma/hero.jpg"
        alt=""
        width={1440}
        height={1800}
        className="absolute left-0 top-[-256px] h-[1800px] w-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(12,11,9,0.62) 8.8%, rgba(12,11,9,0.25) 42.2%, rgba(12,11,9,0.88) 88%)",
        }}
      />
      <div className="absolute left-1/2 top-[160px] flex w-[741px] -translate-x-1/2 flex-col items-center gap-4">
        <h1 className="w-full text-center text-[80px] font-bold leading-[96px] tracking-[-2px] text-[#F8F6F1]">
          Be The First To Trade When Earth Opens
        </h1>
        <p className="w-[680px] text-center text-[20px] font-medium leading-8 text-[#CBCBCB]">
          Earth connects farms, food stores, and verified natural resource producers directly to
          buyers. No speculative middlemen, zero escrow holds, with direct split payment and
          doorstep courier delivery.
        </p>
      </div>
      <WaitlistCard />
    </section>
  );
}
