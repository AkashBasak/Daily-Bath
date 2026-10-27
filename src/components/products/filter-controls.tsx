"use client";

import { useId, useState } from "react";

export type FilterOption = { value: string; label: string; count?: number };

export function SearchIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-4 shrink-0 text-neutral-500">
      <circle cx="7.2" cy="7.2" r="5.2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronIcon({ open, className = "size-6" }: { open: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 text-neutral-900 transition-transform duration-300 ${open ? "rotate-180" : ""} ${className}`}
    >
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Checkbox({
  checked,
  onChange,
  label,
  count,
  compact = false,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  count?: number;
  compact?: boolean;
}) {
  return (
    <label className="group flex cursor-pointer items-center justify-between gap-2">
      <span className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="size-5 shrink-0 cursor-pointer rounded accent-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
        />
        <span
          className={`transition-colors group-hover:text-primary-800 ${compact ? "text-sm leading-5" : "text-sm leading-5 lg:text-base lg:leading-6"} ${
            checked && compact ? "text-primary-800" : "text-neutral-900"
          }`}
        >
          {label}
        </span>
      </span>
      {count !== undefined && (
        <span className={`text-xs leading-5 ${checked ? "text-primary-800" : "text-neutral-600"}`}>{count}</span>
      )}
    </label>
  );
}

// Collapsible filter group used in the desktop and tablet panel.
export function FilterGroup({
  title,
  options,
  selected,
  onToggle,
  searchPlaceholder,
  divider = true,
}: {
  title: string;
  options: FilterOption[];
  selected: string[];
  onToggle: (value: string) => void;
  searchPlaceholder?: string;
  divider?: boolean;
}) {
  const [open, setOpen] = useState(true);
  const [query, setQuery] = useState("");
  const panelId = useId();
  const searchId = useId();
  const visible = options.filter((option) => option.label.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <section className={`flex flex-col gap-4 ${divider ? "border-b border-neutral-200 pb-6" : "pb-4"}`}>
      <div className="flex flex-col gap-3">
        <h3>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((o) => !o)}
            className="flex w-full items-center justify-between rounded-sm text-left text-base leading-6 font-semibold text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 lg:text-lg lg:leading-7"
          >
            {title}
            <ChevronIcon open={open} className="size-5 lg:size-6" />
          </button>
        </h3>
        {open && searchPlaceholder && (
          <div className="flex h-10 items-center gap-2 rounded-lg border border-neutral-500 px-3 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/30">
            <SearchIcon />
            <label htmlFor={searchId} className="sr-only">
              {searchPlaceholder}
            </label>
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={searchPlaceholder}
              className="w-full min-w-0 bg-transparent text-sm leading-5 text-neutral-900 placeholder:text-neutral-500 focus:outline-none"
            />
          </div>
        )}
      </div>

      <div id={panelId} hidden={!open} className="flex flex-col gap-3">
        {visible.map((option) => (
          <Checkbox
            key={option.value}
            label={option.label}
            checked={selected.includes(option.value)}
            onChange={() => onToggle(option.value)}
          />
        ))}
        {visible.length === 0 && <p className="text-sm leading-5 text-neutral-600">No matches</p>}
      </div>
    </section>
  );
}
