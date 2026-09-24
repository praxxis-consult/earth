/**
 * Figma "Frame 1000011497" (213:1040 nav, 213:1078 form).
 * Top visible fill #007C53, radius 30, padding 16/24, gap 8, 14px Medium, letter-spacing -0.28,
 * label fill is a vertical gradient white → white 86% (raised to 92% so the label passes AA on the green). Arrow is the exported vuesax arrow-right node.
 */
export function JoinButton({
  href,
  type,
  className = "",
  disabled = false,
  compact = false,
}: {
  href?: string;
  type?: "submit";
  className?: string;
  disabled?: boolean;
  /** Nav use: drops the label below 360px so the wordmark is never covered. */
  compact?: boolean;
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-[30px] bg-earth-green transition-colors hover:bg-[#006946] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-earth-green disabled:cursor-wait disabled:opacity-70 ${
    compact ? "h-10 px-4 md:h-12 md:px-6" : "h-12 px-6"
  } ${className}`;
  const inner = (
    <>
      <span
        className={`bg-[linear-gradient(180deg,#FFFFFF_0%,rgba(255,255,255,0.92)_90%)] bg-clip-text text-[14px] font-medium leading-[1.26] tracking-[-0.28px] text-transparent ${
          compact ? "hidden min-[360px]:inline" : ""
        }`}
      >
        Join Waitlist
      </span>
      <img src="/figma/arrow-right.svg" alt="" width={24} height={24} className="h-6 w-6" />
    </>
  );
  if (type === "submit") {
    return (
      <button
        type="submit"
        className={classes}
        disabled={disabled}
        aria-busy={disabled || undefined}
      >
        {inner}
      </button>
    );
  }
  return (
    <a href={href} className={classes} aria-label={compact ? "Join waitlist" : undefined}>
      {inner}
    </a>
  );
}
