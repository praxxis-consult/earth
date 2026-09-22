import { Logo } from "./Logo";

const SOCIAL = [
  { name: "X", href: "https://x.com", icon: "/figma/social-x.svg", size: 20, hit: "-mx-3 -my-3" },
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: "/figma/social-facebook.svg",
    size: 24,
    hit: "-mx-[10px] -my-[10px]",
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: "/figma/social-instagram.svg",
    size: 24,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: "/figma/social-linkedin.svg",
    size: 26,
    hit: "-mx-[9px] -my-[9px]",
  },
];

/**
 * Figma "nav" footer (213:1146): 1440×446. Gradient 0deg #0C2310 → #2F893F with handles at 99% and −53%,
 * so in CSS the stops sit at 1% and 153%. Content frame at (120,64) 1200 wide, gap 40.
 * Bottom bar at y 314: padding 24/0, 1px top border #9C9C9C 50%, space-between.
 * Social links get 44px hit areas; each icon's negative margin is (44 − size) / 2 so the icons stay at Figma's x.
 * Built as flow: 64 + 170 + 80 + 68 + 64 = 446 at desktop. Narrow widths stack the bottom bar; ours, no mobile frame.
 */
export function Footer() {
  return (
    <footer className="w-full bg-[linear-gradient(0deg,#0C2310_1%,#2F893F_153%)]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col px-5 pb-10 pt-12 md:px-10 md:pb-16 md:pt-16 xl:px-[120px]">
        <div className="flex w-full flex-col gap-10">
          <div className="flex flex-col gap-6">
            <Logo tone="white" className="self-start" />
            <p className="text-[15px] font-normal leading-6 text-white/75">
              Earth is a premier international natural resource &amp; trade infrastructure group.
              Connecting primary agricultural cooperatives, energy reservoirs, and mineral
              concessions directly to global industrial markets.
            </p>
          </div>
          <div className="flex h-[26px] items-center gap-4">
            {SOCIAL.map((s) => (
              <a
                key={s.name}
                href={s.href}
                aria-label={s.name}
                target="_blank"
                rel="noreferrer"
                className={`${s.hit} inline-flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-white`}
              >
                <img src={s.icon} alt="" width={s.size} height={s.size} loading="lazy" />
              </a>
            ))}
          </div>
        </div>
        <div className="mt-12 flex w-full flex-col gap-2 border-t border-[#9C9C9C]/50 py-6 md:mt-20 md:h-[68px] md:flex-row md:items-center md:justify-between md:py-0">
          <p className="text-[14px] font-normal leading-5 text-white">
            © Copyright 2026 Earth Trading Group, All Rights Reserved.
          </p>
          <p className="font-inter text-[14px] font-normal leading-5 text-white">
            Earth is the marketplace, never the escrow.
          </p>
        </div>
      </div>
    </footer>
  );
}
