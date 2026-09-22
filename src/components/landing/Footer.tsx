import { Logo } from "./Logo";

const SOCIAL = [
  { name: "X", href: "https://x.com", icon: "/figma/social-x.svg", size: 20 },
  { name: "Facebook", href: "https://facebook.com", icon: "/figma/social-facebook.svg", size: 24 },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: "/figma/social-instagram.svg",
    size: 24,
  },
  { name: "LinkedIn", href: "https://linkedin.com", icon: "/figma/social-linkedin.svg", size: 26 },
];

/**
 * Figma "nav" footer (213:1146): 1440×446. Gradient 0deg #0C2310 → #2F893F with handles at 99% and −53%,
 * so in CSS the stops sit at 1% and 153%. Content frame at (120,64) 1200 wide, gap 40.
 * Bottom bar at y 314: padding 24/0, 1px top border #9C9C9C 50%, space-between.
 */
export function Footer() {
  return (
    <footer
      className="w-full"
      style={{ background: "linear-gradient(0deg, #0C2310 1%, #2F893F 153%)" }}
    >
      <div className="relative mx-auto h-[446px] w-full max-w-[1440px]">
        <div className="absolute left-[120px] top-16 flex w-[1200px] flex-col gap-10">
          <div className="flex flex-col gap-6">
            <Logo tone="white" className="self-start" />
            <p className="text-[15px] font-normal leading-6 text-white/75">
              Earth is a premier international natural resource &amp; trade infrastructure group.
              Connecting primary agricultural cooperatives, energy reservoirs, and mineral
              concessions directly to global industrial markets.
            </p>
          </div>
          <div className="flex items-center gap-4">
            {SOCIAL.map((s) => (
              <a key={s.name} href={s.href} aria-label={s.name} target="_blank" rel="noreferrer">
                <img
                  src={s.icon}
                  alt=""
                  width={s.size}
                  height={s.size}
                  style={{ width: s.size, height: s.size }}
                />
              </a>
            ))}
          </div>
        </div>
        <div className="absolute left-[120px] top-[314px] flex h-[68px] w-[1200px] items-center justify-between border-t border-[#9C9C9C]/50">
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
