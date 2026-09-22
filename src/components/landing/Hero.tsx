import { WaitlistCard } from "./WaitlistCard";

/**
 * Figma "hero opt 1" (213:1043): 1440×1544, layout none.
 * Image rect 1440×1800 at y −256 (cover) → bottom-anchored cover. Gradient: 180deg rgba(12,11,9)
 * .62 → .25 → .88 at 8.8% / 42.2% / 88%. Headline block at y 160, 741 wide; card at y 864, 1200×560.
 * Built as flow layout so it can reflow: 160 + 304 + 400 + 560 + 120 = 1544 at desktop.
 * Below 1280px the type scale and spacing are ours; the file has no mobile frame.
 */
export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      <img
        src="/figma/hero.jpg"
        alt=""
        width={1440}
        height={1800}
        className="absolute inset-0 h-full w-full object-cover object-bottom"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(12,11,9,0.62) 8.8%, rgba(12,11,9,0.25) 42.2%, rgba(12,11,9,0.88) 88%)",
        }}
      />
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center px-5 pb-10 pt-16 md:px-10 md:pb-20 md:pt-24 xl:px-[120px] xl:pb-[120px] xl:pt-[160px]">
        <div className="flex w-full max-w-[741px] flex-col items-center gap-4">
          <h1 className="w-full text-center text-[40px] font-bold leading-[48px] tracking-[-1px] text-[#F8F6F1] md:text-[56px] md:leading-[64px] md:tracking-[-1.4px] xl:text-[80px] xl:leading-[96px] xl:tracking-[-2px]">
            Be The First To Trade When Earth Opens
          </h1>
          <p className="w-full max-w-[680px] text-center text-[16px] font-medium leading-6 text-[#CBCBCB] md:text-[18px] md:leading-7 xl:text-[20px] xl:leading-8">
            Earth connects farms, food stores, and verified natural resource producers directly to
            buyers. No speculative middlemen, zero escrow holds, with direct split payment and
            doorstep courier delivery.
          </p>
        </div>
        <div className="h-[120px] w-full md:h-[240px] xl:h-[400px]" aria-hidden="true" />
        <WaitlistCard />
      </div>
    </section>
  );
}
