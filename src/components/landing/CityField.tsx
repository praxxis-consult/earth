import { useEffect, useId, useMemo, useRef, useState } from "react";

/** Diacritic-insensitive, case-insensitive key, so "aurang" finds "Aurangābād". */
const fold = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

const MAX_ROWS = 6;

/**
 * City entry: a text field with that country's towns offered underneath (ARIA 1.2 combobox).
 * Free text is always accepted, because the list holds towns over 15,000 people and nobody from a
 * smaller place should be turned away. The field itself is Figma "Frame 1000011533": same pill,
 * same arrow. The panel has no frame in the file; it is drawn in the card's own dark glass.
 *
 * Before hydration this is a plain required text input, so a no-JS submit still works.
 */
export function CityField({
  fieldClass,
  labelClass,
  cities,
  country,
  error,
  defaultValue = "",
}: {
  fieldClass: string;
  labelClass: string;
  cities: readonly string[];
  country: string;
  error?: string | undefined;
  defaultValue?: string;
}) {
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const listId = useId();
  const wrap = useRef<HTMLDivElement>(null);

  const matches = useMemo(() => {
    if (!cities.length) return [];
    const q = fold(value.trim());
    if (!q) return cities.slice(0, MAX_ROWS);
    const starts: string[] = [];
    const words: string[] = [];
    const within: string[] = [];
    for (const c of cities) {
      const f = fold(c);
      if (f.startsWith(q)) starts.push(c);
      else if (f.split(/[\s-]/).some((w) => w.startsWith(q))) words.push(c);
      else if (f.includes(q)) within.push(c);
      if (starts.length >= MAX_ROWS) break;
    }
    return [...starts, ...words, ...within].slice(0, MAX_ROWS);
  }, [cities, value]);

  // A new country means a new list; whatever was typed for the old one no longer applies.
  const prevCountry = useRef(country);
  useEffect(() => {
    if (prevCountry.current !== country) {
      prevCountry.current = country;
      setValue("");
      setActive(-1);
    }
  }, [country]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  const showing = open && matches.length > 0;
  const pick = (c: string) => {
    setValue(c);
    setOpen(false);
    setActive(-1);
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="city" className={labelClass}>
        City
      </label>
      <div ref={wrap} className="relative">
        <input
          id="city"
          name="city"
          type="text"
          required
          role="combobox"
          aria-expanded={showing}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={showing && active >= 0 ? `${listId}-${active}` : undefined}
          autoComplete="off"
          autoCapitalize="words"
          enterKeyHint="next"
          maxLength={80}
          value={value}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "city-error" : undefined}
          placeholder={country ? "Type your city" : "Select country, then your city"}
          className={`${fieldClass} pr-12`}
          onChange={(e) => {
            setValue(e.currentTarget.value);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
              setActive((a) => Math.min(a + 1, matches.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((a) => Math.max(a - 1, -1));
            } else if (e.key === "Enter" && showing && active >= 0) {
              e.preventDefault();
              pick(matches[active]!);
            } else if (e.key === "Escape" && open) {
              e.preventDefault();
              setOpen(false);
            } else if (e.key === "Tab") {
              setOpen(false);
            }
          }}
        />
        {/* The arrow opens the list; it is decorative for the keyboard, which has ArrowDown. */}
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          disabled={!cities.length}
          className="absolute right-0 top-0 flex h-12 w-12 items-center justify-center disabled:cursor-default"
          onClick={() => {
            setOpen((o) => !o);
            document.getElementById("city")?.focus();
          }}
        >
          <img src="/figma/arrow-down.svg" alt="" width={20} height={20} className="h-5 w-5" />
        </button>
        <ul
          id={listId}
          role="listbox"
          aria-label="Cities"
          hidden={!showing}
          className="absolute left-0 right-0 top-[calc(100%+6px)] z-20 overflow-hidden rounded-[16px] border border-[#E4DEDE]/20 bg-[#0C2310]/95 py-1 shadow-[0_12px_32px_rgba(0,0,0,0.35)] backdrop-blur-[12px]"
        >
          {matches.map((c, i) => (
            <li
              key={c}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === active}
              className={`cursor-pointer px-4 py-[11px] text-[14px] leading-[22px] text-white md:text-[16px] md:leading-6 ${
                i === active ? "bg-white/15" : "hover:bg-white/10"
              }`}
              onPointerDown={(e) => e.preventDefault()}
              onClick={() => pick(c)}
              onPointerMove={() => setActive(i)}
            >
              {c}
            </li>
          ))}
        </ul>
      </div>
      {error && (
        <p id="city-error" className="text-[14px] leading-5 text-[#FFB4A8]">
          {error}
        </p>
      )}
    </div>
  );
}
