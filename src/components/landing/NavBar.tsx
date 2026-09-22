import { Logo } from "./Logo";
import { JoinButton } from "./JoinButton";

/** Figma "nav bar" (213:1025): 96px tall, padding 24/80, white, space-between. Nav links and Sign in are hidden in the design. */
export function NavBar() {
  return (
    <header className="w-full bg-white">
      <div className="mx-auto flex h-24 w-full max-w-[1440px] items-center justify-between px-20 py-6">
        <Logo tone="dark" />
        <div className="flex w-[293px] items-center justify-end gap-4">
          <JoinButton href="#waitlist" className="w-[155px]" />
        </div>
      </div>
    </header>
  );
}
