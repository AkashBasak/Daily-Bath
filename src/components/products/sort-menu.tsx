"use client";

import { useEffect, useId, useRef, useState } from "react";
import { sortOptions, type SortOption } from "@/lib/products";

function SortIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-4 shrink-0">
      <path d="M3 7h18M6 12h12m-8 5h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function TickIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5 shrink-0 text-primary-500 lg:size-6">
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type SortMenuProps = {
  value: SortOption;
  onChange: (value: SortOption) => void;
  className?: string;
};

export function SortMenu({ value, onChange, className = "" }: SortMenuProps) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((o) => !o)}
        className="flex h-8 w-full items-center justify-between gap-2 rounded-lg border border-neutral-200 bg-neutral-50 pr-2 pl-3 text-sm leading-5 font-medium text-neutral-900 transition-colors hover:border-neutral-300 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 md:h-10 md:pr-3 md:pl-4 md:text-base md:leading-6 md:font-normal lg:h-12 lg:pr-4 lg:pl-6 lg:font-display lg:text-lg lg:leading-7 lg:font-medium 2xl:text-xl"
      >
        Sort By
        <SortIcon />
      </button>

      <ul
        id={menuId}
        hidden={!open}
        aria-label="Sort products"
        className="absolute top-full right-0 z-30 mt-2 flex w-[156px] flex-col gap-3 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-3 shadow-[0_3px_3px_rgba(161,161,161,0.1),0_10px_5px_rgba(161,161,161,0.09),0_23px_7px_rgba(161,161,161,0.05)] md:w-full md:min-w-[175px] md:py-4 lg:min-w-[212px] lg:gap-4 lg:px-4 lg:py-5"
      >
        {sortOptions.map((option, index) => {
          const selected = option.value === value;
          return (
            <li
              key={option.value}
              className={index < sortOptions.length - 1 ? "border-b border-neutral-200 pb-3 lg:pb-4" : ""}
            >
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                  buttonRef.current?.focus();
                }}
                className={`flex w-full items-center justify-between rounded-sm text-left text-sm leading-5 transition-colors hover:text-primary-800 focus-visible:outline-2 focus-visible:outline-primary-500 md:text-base md:leading-6 lg:font-display lg:text-lg lg:leading-7 lg:font-medium 2xl:text-xl ${
                  selected ? "font-medium text-neutral-900" : "text-neutral-900"
                }`}
              >
                {option.label}
                {selected && <TickIcon />}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
