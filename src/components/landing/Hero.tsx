import { WaitlistCard } from "./WaitlistCard";

/**
 * Desktop, Figma "hero opt 1" (213:1043): 1440×1544, layout none. Image rect 1440×1800 at y −256 (cover)
 * → bottom-anchored cover. Gradient: 180deg rgba(12,11,9) .62 → .25 → .88 at 8.8% / 42.2% / 88%.
 * Headline block at y 160, 741 wide; card at y 864, 1200×560.
 * Flow layout: padding 160 + headline 304 + gap 400 + card 560 + padding 120 = 1544 at 1440.
 *
 * Mobile, Figma 259:1935: 390×1207. Image rect 965.6×1207 at x −358 → full-height cover, focal point
 * 62% from the left (the source is cut to exactly that band in hero-m). Headline block at (24,151) 342 wide;
 * card at (24,455) 342×784; 40px below the card. Flow: 151 + 192 + 112 + 784 + 40 = 1207.
 *
 * The gap is clamp(112px, 50vw − 320px, 400px): 112 up to 864px, 320 at 1280, 400 at ≥1440.
 * Between 768 and 1279 the type scale is ours; neither frame covers it.
 */
export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      <picture>
        <source media="(max-width: 767px)" srcSet="/figma/hero-m.webp" type="image/webp" />
        <source media="(max-width: 767px)" srcSet="/figma/hero-m.jpg" />
        <source
          srcSet="/figma/hero-1000.webp 1000w, /figma/hero-1440.webp 1440w, /figma/hero-2000.webp 2000w"
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
          className="absolute inset-0 h-full w-full object-cover object-top md:object-bottom min-[1800px]:object-[50%_80%]"
        />
      </picture>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,11,9,0.62)_8.8%,rgba(12,11,9,0.25)_42.2%,rgba(12,11,9,0.88)_88%)]" />
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center gap-[clamp(112px,calc(50vw-320px),400px)] px-6 pb-10 pt-[79px] md:px-10 md:pb-20 md:pt-24 xl:px-[120px] xl:pb-[120px] xl:pt-[160px]">
        <div className="flex w-full max-w-[741px] flex-col items-center gap-4">
          <h1 className="w-full text-center text-[32px] font-bold leading-10 tracking-[-2px] text-paper md:text-[56px] md:leading-[64px] md:tracking-[-1.4px] xl:text-[80px] xl:leading-[96px] xl:tracking-[-2px]">
            Be The First To Trade When Earth Opens
          </h1>
          {/* #CBCBCB is Figma's colour. The shadow helps on the bright grass bands; contrast over a photo cannot be guaranteed. */}
          <p className="w-full max-w-[680px] text-center text-[14px] font-medium leading-6 text-[#CBCBCB] [text-shadow:0_1px_2px_rgba(12,11,9,0.45)] md:text-[18px] md:leading-7 xl:text-[20px] xl:leading-8">
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
