import { WaitlistCard } from "./WaitlistCard";

/**
 * Figma "hero opt 1" (213:1043): 1440×1544, layout none.
 * Image rect 1440×1800 at y −256 (cover) → bottom-anchored cover. Gradient: 180deg rgba(12,11,9)
 * .62 → .25 → .88 at 8.8% / 42.2% / 88%. Headline block at y 160, 741 wide; card at y 864, 1200×560.
 * Flow layout: padding 160 + headline 304 + gap 400 + card 560 + padding 120 = 1544 at 1440.
 * The gap is clamp(120px, 50vw − 320px, 400px): 400 at ≥1440, 320 at 1280, 192 at 1024, 120 at ≤880.
 * Below 1280px the type scale and paddings are ours; the file has no mobile frame.
 * Phones get an art-directed portrait crop centred on the tractor; desktops get Figma's crop.
 */
export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      <picture>
        <source media="(max-width: 767px)" srcSet="/figma/hero-m.webp" type="image/webp" />
        <source media="(max-width: 767px)" srcSet="/figma/hero-m.jpg" />
        <source
          srcSet="/figma/hero-1440.webp 1440w, /figma/hero-2000.webp 2000w"
          sizes="100vw"
          type="image/webp"
        />
        <img
          src="/figma/hero.jpg"
          alt=""
          width={1440}
          height={1800}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-bottom"
        />
      </picture>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,11,9,0.62)_8.8%,rgba(12,11,9,0.25)_42.2%,rgba(12,11,9,0.88)_88%)]" />
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center gap-[clamp(120px,calc(50vw-320px),400px)] px-5 pb-10 pt-16 md:px-10 md:pb-20 md:pt-24 xl:px-[120px] xl:pb-[120px] xl:pt-[160px]">
        <div className="flex w-full max-w-[741px] flex-col items-center gap-4">
          <h1 className="w-full text-center text-[44px] font-bold leading-[1.05] tracking-[-1.1px] text-paper md:text-[56px] md:leading-[64px] md:tracking-[-1.4px] xl:text-[80px] xl:leading-[96px] xl:tracking-[-2px]">
            Be The First To Trade When Earth Opens
          </h1>
          {/* #CBCBCB is Figma's colour; the shadow lifts it past AA on the bright grass bands. */}
          <p className="w-full max-w-[680px] text-center text-[17px] font-medium leading-[26px] text-[#CBCBCB] [text-shadow:0_1px_2px_rgba(12,11,9,0.45)] md:text-[18px] md:leading-7 xl:text-[20px] xl:leading-8">
            Earth connects farms, food stores, and verified natural resource producers directly to
            buyers. No speculative middlemen, zero escrow holds, with direct split payment and
            doorstep courier delivery.
          </p>
        </div>
        <WaitlistCard />
      </div>
    </section>
  );
}
