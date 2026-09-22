import { Logo } from "./Logo";
import { JoinButton } from "./JoinButton";

/**
 * Figma "nav bar" (213:1025): 96px tall, padding 24/80, white, space-between at 1440.
 * Sticky at the top on scroll. Nav links and Sign in are hidden in the design. Below 1280px the side padding steps down;
 * no mobile frame exists in the file, so those values are ours.
 */
export function NavBar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between px-5 md:h-24 md:px-10 xl:px-20">
        <Logo tone="dark" />
        <div className="flex shrink-0 items-center justify-end gap-4">
          <JoinButton href="#waitlist" compact className="min-[360px]:w-[155px]" />
        </div>
      </div>
    </header>
  );
}
