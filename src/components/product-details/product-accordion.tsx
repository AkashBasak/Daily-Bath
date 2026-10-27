"use client";

import { useId, useState } from "react";

type Item = { title: string; points: string[] };

export function ProductAccordion({ items, defaultOpen }: { items: Item[]; defaultOpen: number }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const baseId = useId();

  return (
    <div className="flex flex-col gap-3 md:gap-3 lg:gap-4">
      {items.map((item, index) => {
        const expanded = open === index;
        const buttonId = `${baseId}-b${index}`;
        const panelId = `${baseId}-p${index}`;
        return (
          <section key={item.title} className="rounded-lg bg-secondary-500 text-white">
            <h2>
              <button
                id={buttonId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : index)}
                className="flex h-16 w-full items-center justify-between rounded-lg px-3 text-left font-display text-base leading-6 font-semibold transition-colors hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 md:h-[72px] md:px-4 md:text-lg lg:h-20 lg:px-6 lg:text-xl lg:leading-7"
              >
                {item.title}
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-6 shrink-0">
                  <path d="M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path
                    d="M12 5v14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    className={`origin-center transition-transform duration-300 ${expanded ? "scale-y-0" : ""}`}
                  />
                </svg>
              </button>
            </h2>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!expanded}
              className={`grid transition-[grid-template-rows,opacity] duration-400 ease-out ${expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
              <div className="overflow-hidden">
                <ul className="mx-2 mb-2 list-disc rounded-lg bg-white py-3 pr-4 pl-8 text-sm leading-5 font-medium text-neutral-900 md:mx-3 md:mb-3 md:text-base md:leading-6 lg:pl-10 lg:text-lg lg:leading-7">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
