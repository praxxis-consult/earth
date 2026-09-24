/**
 * Figma "Link - Earth home". Desktop (213:1026): 32px globe + "EARTH" 24px Bold, letter-spacing 5.33, gap 13.33.
 * Mobile nav (259:1921): 24px globe + 18px Bold, letter-spacing 4, gap 10. The mobile footer logo stays at the desktop size.
 */
export function Logo({
  tone,
  size = "desktop",
  className = "",
}: {
  tone: "dark" | "white";
  /** "responsive" = mobile size below md, desktop size from md. "desktop" = always the 32px logo. */
  size?: "responsive" | "desktop";
  className?: string;
}) {
  const responsive = size === "responsive";
  return (
    <a
      href="/"
      aria-label="Earth home"
      className={`flex shrink-0 items-center whitespace-nowrap ${responsive ? "gap-[10px] md:gap-[13.33px]" : "gap-[13.33px]"} ${className}`}
    >
      <img
        src={tone === "dark" ? "/figma/logo-dark.svg" : "/figma/logo-white.svg"}
        alt=""
        width={32}
        height={32}
        className={responsive ? "h-6 w-6 md:h-8 md:w-8" : "h-8 w-8"}
      />
      <span
        /* -mr cancels the trailing letter-spacing CSS adds after the last glyph, which Figma does not draw. */
        className={`font-bold uppercase ${
          responsive
            ? "-mr-1 text-[18px] leading-6 tracking-[4px] md:-mr-[5.33px] md:text-[24px] md:leading-8 md:tracking-[5.33px]"
            : "-mr-[5.33px] text-[24px] leading-8 tracking-[5.33px]"
        } ${tone === "dark" ? "text-forest" : "text-white"}`}
      >
        Earth
      </span>
    </a>
  );
}
