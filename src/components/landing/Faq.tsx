import { useState } from "react";

/**
 * Copy: the four questions are the instance overrides in Figma (218:1425–1428). Only the component's
 * expanded state (214:1235) carries an answer, so the first answer is Figma's own; the other three
 * are taken from the product requirements (docs/PRD.md) because the design has no text for them.
 */
const ITEMS = [
  {
    q: "Do I need a registered business to sell?",
    a: "No. Verify with your ID and a selfie, add your own bank account, and you can be live in about fifteen minutes. Your selling limit grows as you complete good orders.",
  },
  {
    q: "Who delivers my order?",
    a: "You choose. At checkout you see live prices from the delivery companies that serve your area, pick the one that suits you, and follow the rider until the goods arrive.",
  },
  {
    q: "Does Earth hold my money?",
    a: "No. A licensed payment company divides each payment the moment it is made. The seller's share goes to the seller's own bank account, and Earth keeps only its percentage.",
  },
  {
    q: "What exactly can I trade?",
    a: "Anything that grows from the earth, is locked under it, or feeds from it: food and farm goods first, then verified exporters and mineral sellers as Earth opens up.",
  },
];

/**
 * Figma "faqs" component: default 846×72, expanded 846×136; radius 25, fill #F9F9F9, padding 24;
 * question 16px SemiBold −0.32 #141414; answer 14px Regular lh 24 −0.32 #807E7E at y 64, 758 wide;
 * icon 24px at x 798 (tabler:plus ↔ ic:round-minus). Answer colour raised from Figma's #807E7E to #6B6969 for AA (5.2:1). ON_CLICK → CHANGE_TO, smart animate, gentle, ~1s.
 * The answer sits at y 64, 8px above the 72px header row's bottom edge, hence the negative margin.
 */
function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const id = `faq-${index}`;
  return (
    <div className="w-full max-w-[846px] rounded-[25px] bg-[#F9F9F9]">
      <button
        type="button"
        id={`${id}-btn`}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-[64px] w-full items-center justify-between gap-4 rounded-[25px] px-5 py-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-earth-green md:h-[72px] md:px-6 md:py-0"
      >
        <span className="min-w-0 flex-1 text-[15px] font-semibold md:text-[16px] leading-6 tracking-[-0.32px] text-[#141414]">
          {q}
        </span>
        <img
          src={open ? "/figma/minus.svg" : "/figma/plus.svg"}
          alt=""
          width={24}
          height={24}
          className="h-6 w-6 shrink-0"
        />
      </button>
      <div
        id={id}
        role="region"
        aria-labelledby={`${id}-btn`}
        aria-hidden={!open}
        inert={!open}
        className="grid transition-[grid-template-rows] duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="-mt-2 w-full max-w-[758px] px-5 pb-5 text-[14px] md:px-6 md:pb-6 font-normal leading-6 tracking-[-0.28px] text-[#6B6969]">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Figma "what we deal" (218:1420): padding 80/297, gap 64, centred, white. Header 628 wide gap 8; list 846 wide gap 20.
 * The intro copy in Figma was real-estate template text ("property… leasing"); replaced with product copy at the same spec.
 */
export function Faq() {
  return (
    <section className="flex w-full flex-col items-center gap-10 bg-white px-5 py-14 md:gap-16 md:px-10 md:py-20">
      <div className="flex w-full max-w-[628px] flex-col items-center gap-2">
        <h2 className="w-full text-center text-[28px] font-bold leading-9 tracking-[-0.56px] text-[#141414] md:text-[40px] md:leading-[64px] md:tracking-[-0.8px]">
          Frequently Asked Questions
        </h2>
        <p className="w-full text-center text-[15px] font-normal leading-7 tracking-[-0.3px] text-[#666666] md:text-[16px] md:leading-8 md:tracking-[-0.32px]">
          Straight answers on how selling, delivery and payment work on Earth, so buyers and sellers
          know exactly what to expect, and what we will never do with their money, from the day we
          open in your city.
        </p>
      </div>
      <div className="flex w-full max-w-[846px] flex-col gap-4 md:gap-5">
        {ITEMS.map((item, i) => (
          <FaqItem key={item.q} q={item.q} a={item.a} index={i} />
        ))}
      </div>
    </section>
  );
}
