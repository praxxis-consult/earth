import { useState, type FormEvent } from "react";
import { JoinButton } from "./JoinButton";

const INTERESTS = ["Buying", "Selling", "Both"];
const CITIES = ["Lagos", "Abuja", "Kano", "Kaduna", "Port Harcourt", "Ibadan", "Other"];

/**
 * Figma "Frame 1000011533" (213:1054 etc.): 48px tall, padding 12/16, gap 8, radius 30,
 * 0.5px stroke #E4DEDE, no fill. Placeholder 16px Regular white 75%.
 */
const fieldClass =
  "h-12 w-full rounded-[30px] border-[0.5px] border-[#E4DEDE] bg-transparent px-4 py-3 text-[16px] font-normal leading-6 text-white outline-none placeholder:text-white/75 focus:border-white";

function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) {
  return (
    <label htmlFor={htmlFor} className="block text-[16px] font-medium leading-6 text-white">
      {children}
    </label>
  );
}

function Select({
  id,
  placeholder,
  options,
  required,
}: {
  id: string;
  placeholder: string;
  options: string[];
  required?: boolean;
}) {
  const [value, setValue] = useState("");
  return (
    <div className="relative">
      <select
        id={id}
        name={id}
        required={required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`${fieldClass} appearance-none pr-12 ${value ? "text-white" : "text-white/75"}`}
      >
        <option value="" disabled className="text-black">
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="text-black">
            {o}
          </option>
        ))}
      </select>
      <img
        src="/figma/arrow-down.svg"
        alt=""
        width={20}
        height={20}
        className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2"
      />
    </div>
  );
}

/**
 * Figma "Frame 2147237483" (213:1050): 1200×560 at (120,864), fill white 10%, radius 30, GLASS effect.
 * Children in Figma are absolutely placed: title block (24,40), form (24,144) 1152 wide, button (273,472) 588×48.
 * Built as flow: 40 + 64 + 40 + 288 + 40 + 48 + 40 = 560 at desktop. The button is centred (x 306) rather than
 * at Figma's x 273, because a flow layout cannot reproduce an off-centre absolute offset responsively.
 * The GLASS effect exports no parameters; the blur strength and the 1px light rim are read from the render.
 * Below 768px the form is one column with 20px card padding; the file has no mobile frame.
 */
export function WaitlistCard() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <form
      id="waitlist"
      onSubmit={onSubmit}
      className="flex w-full max-w-[1200px] flex-col rounded-[30px] bg-white/10 px-5 py-8 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)] backdrop-blur-[20px] md:px-6 md:py-10"
    >
      <div className="flex w-full max-w-[564px] flex-col gap-2">
        <h2 className="text-[24px] font-semibold leading-8 tracking-[-1px] text-white">
          Join The Waitlist
        </h2>
        <p className="text-[15px] font-normal leading-6 text-[#E4DEDE]">
          Submit your details below to get notified when we launch.
        </p>
      </div>

      <div className="mt-8 flex w-full flex-col gap-6 md:mt-10">
        <div className="flex flex-col gap-2">
          <Label htmlFor="interest">I’m interested in...</Label>
          <Select id="interest" placeholder="Select an option" options={INTERESTS} required />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            {/* Figma: "Name" Regular 400, "(optional)" Medium 500 (characterStyleOverrides). */}
            <label htmlFor="name" className="block text-[16px] font-normal leading-6 text-white">
              Name <span className="font-medium">(optional)</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              className={fieldClass}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="city">City</Label>
            <Select id="city" placeholder="Select city" options={CITIES} required />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email Address</Label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Enter email address"
              className={fieldClass}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="phone">Phone</Label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter phone number"
              className={fieldClass}
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex w-full justify-center md:mt-10">
        <JoinButton type="submit" className="w-full md:w-[588px]" />
      </div>

      {submitted && (
        <p role="status" className="mt-4 text-center text-[14px] leading-5 text-white/75">
          Thanks. The waitlist opens soon and we will confirm your place by email.
        </p>
      )}
    </form>
  );
}
