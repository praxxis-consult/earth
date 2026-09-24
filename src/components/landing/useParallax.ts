import { useEffect, useRef } from "react";

/**
 * Scroll-linked motion for the hero: the photo slides down at a fraction of the scroll (it has
 * --slack px of hidden height above the section to draw from), the headline drifts up and fades,
 * and the card gets data-shown once it is 15% in view (its CSS does the rise). Everything is a
 * transform or opacity, batched into one frame per scroll event, and nothing runs when the person
 * asked for reduced motion.
 */
export function useParallax() {
  const section = useRef<HTMLElement>(null);
  const photo = useRef<HTMLElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const s = section.current;
    const p = photo.current;
    const c = copy.current;
    const k = card.current;
    if (!s || !p || !c || !k) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (still.matches) {
      k.dataset["shown"] = "";
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          k.dataset["shown"] = "";
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(k);

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = s.getBoundingClientRect();
      // 0 when the section top is at the viewport top, 1 when the section has scrolled away.
      const progress = Math.min(1, Math.max(0, -rect.top / rect.height));
      const slack = parseFloat(getComputedStyle(p).getPropertyValue("--slack")) || 0;
      p.style.transform = `translate3d(0, ${(progress * slack).toFixed(1)}px, 0)`;
      // The headline leaves a little faster than the page and is gone by a third of the way down.
      const gone = Math.min(1, progress * 3);
      c.style.transform = `translate3d(0, ${(-progress * rect.height * 0.12).toFixed(1)}px, 0)`;
      c.style.opacity = String(1 - gone);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      io.disconnect();
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      p.style.transform = "";
      c.style.transform = "";
      c.style.opacity = "";
    };
  }, []);

  return { section, photo, copy, card };
}
