/**
 * Figma "Frame 1000011497" (213:1040 nav, 213:1078 form).
 * Top visible fill #007C53, radius 30, padding 16/24, gap 8, 14px Medium, letter-spacing -0.28,
 * label fill is a vertical gradient white → white 86%. Arrow is the exported vuesax arrow-right node.
 */
export function JoinButton({
  href,
  type,
  className = "",
}: {
  href?: string;
  type?: "submit";
  className?: string;
}) {
  const classes = `inline-flex h-12 items-center justify-center gap-2 rounded-[30px] bg-[#007C53] px-6 py-4 transition-colors hover:bg-[#006946] ${className}`;
  const inner = (
    <>
      <span
        className="text-[14px] font-medium leading-[17.64px] tracking-[-0.28px] text-transparent"
        style={{
          backgroundImage: "linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.86) 90%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
      >
        Join Waitlist
      </span>
      <img src="/figma/arrow-right.svg" alt="" width={24} height={24} className="h-6 w-6" />
    </>
  );
  if (type === "submit") {
    return (
      <button type="submit" className={classes}>
        {inner}
      </button>
    );
  }
  return (
    <a href={href} className={classes}>
      {inner}
    </a>
  );
}
