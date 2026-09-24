import { Logo } from "./Logo";
import { JoinButton } from "./JoinButton";

/**
 * Figma "nav bar". Desktop (213:1025): 96 tall, padding 24/80, space-between.
 * Mobile (259:1920): 72 tall, padding 24/16, 24px logo, 139×40 button.
 * Sticky at the top on scroll. Nav links and Sign in are hidden in both designs.
 */
export function NavBar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between px-4 md:h-24 md:px-10 xl:px-20">
        <Logo tone="dark" size="responsive" />
        <div className="flex shrink-0 items-center justify-end gap-4">
          <JoinButton href="#waitlist" compact className="w-[139px] md:w-[155px]" />
        </div>
      </div>
    </header>
  );
}
