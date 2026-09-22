/** Figma "Link - Earth home" (213:1026 / 213:1152): 32px globe + "EARTH", gap 13.33px. */
export function Logo({ tone, className = "" }: { tone: "dark" | "white"; className?: string }) {
  return (
    <a href="/" aria-label="Earth home" className={`flex items-center gap-[13.33px] ${className}`}>
      <img
        src={tone === "dark" ? "/figma/logo-dark.svg" : "/figma/logo-white.svg"}
        alt=""
        width={32}
        height={32}
        className="h-8 w-8"
      />
      <span
        className={`-mr-[5.33px] text-[24px] font-bold uppercase leading-8 tracking-[5.33px] ${
          tone === "dark" ? "text-[#0C2310]" : "text-white"
        }`}
      >
        Earth
      </span>
    </a>
  );
}
