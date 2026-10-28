"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronIcon, Checkbox } from "@/components/products/filter-controls";
import {
  emptyFilters,
  ingredients,
  matchesFilters,
  productCategories,
  products,
  skinTypes,
  type ProductFilters,
} from "@/lib/products";

type GroupKey = keyof ProductFilters;

const groups: { key: GroupKey; title: string; options: { value: string; label: string }[] }[] = [
  { key: "categories", title: "Select category", options: productCategories.map((c) => ({ value: c.slug, label: c.name })) },
  { key: "skinTypes", title: "Select skin type", options: skinTypes.map((s) => ({ value: s, label: s })) },
  { key: "ingredients", title: "Select ingredient", options: ingredients.map((i) => ({ value: i, label: i })) },
];

function countFor(key: GroupKey, value: string) {
  return products.filter((product) => matchesFilters(product, { ...emptyFilters, [key]: [value] })).length;
}

type MobileFilterSheetProps = {
  open: boolean;
  applied: ProductFilters;
  onApply: (filters: ProductFilters) => void;
  onClose: () => void;
};

// Changes are staged in the sheet and only applied with the Explore button.
export function MobileFilterSheet({ open, applied, onApply, onClose }: MobileFilterSheetProps) {
  const [draft, setDraft] = useState<ProductFilters>(applied);
  const [openGroup, setOpenGroup] = useState<GroupKey | null>("categories");
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  // Start each opening from the currently applied filters.
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setDraft(applied);
  }

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  const resultCount = products.filter((product) => matchesFilters(product, draft)).length;

  function toggle(key: GroupKey, value: string) {
    setDraft((current) => {
      const list = current[key];
      return { ...current, [key]: list.includes(value) ? list.filter((v) => v !== value) : [...list, value] };
    });
  }

  return (
    <div className={`fixed inset-0 z-50 md:hidden ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div
        className={`absolute inset-0 bg-neutral-900/40 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        inert={!open}
        className={`absolute inset-x-0 bottom-0 flex max-h-[88dvh] flex-col rounded-t-2xl bg-white transition-transform duration-300 ease-out ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <span aria-hidden="true" className="mx-auto mt-3 h-1 w-12 shrink-0 rounded bg-neutral-100" />
        <div className="flex items-center justify-between px-4 pt-4">
          <h2 id={titleId} className="text-base leading-6 font-semibold text-neutral-900">
            Filter Products
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="-m-2 flex size-10 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-primary-500"
          >
            <span className="flex size-6 items-center justify-center rounded-full bg-neutral-100">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-4">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
          </button>
        </div>

        <div className="mt-6 flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 pb-4">
          {groups.map((group) => {
            const expanded = openGroup === group.key;
            const panelId = `${titleId}-${group.key}`;
            return (
              <section
                key={group.key}
                className={expanded ? "rounded-lg border-b border-[#cfd4db] bg-neutral-100 px-2 pt-2 pb-4" : "border-b border-neutral-200 pb-4"}
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => setOpenGroup(expanded ? null : group.key)}
                    className="flex w-full items-center justify-between rounded-sm text-left text-sm leading-5 font-medium text-neutral-900 focus-visible:outline-2 focus-visible:outline-primary-500"
                  >
                    <span>
                      {group.title}
                      {draft[group.key].length > 0 && (
                        <span className="ml-2 inline-flex size-5 items-center justify-center rounded-full bg-primary-500 text-[11px] font-semibold text-white">
                          {draft[group.key].length}
                        </span>
                      )}
                    </span>
                    <ChevronIcon open={expanded} className="size-5" />
                  </button>
                </h3>
                <div id={panelId} hidden={!expanded} className="mt-3 flex flex-col gap-2">
                  {group.options.map((option) => (
                    <Checkbox
                      key={option.value}
                      compact
                      label={option.label}
                      count={countFor(group.key, option.value)}
                      checked={draft[group.key].includes(option.value)}
                      onChange={() => toggle(group.key, option.value)}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <div className="flex items-center justify-between border-t border-neutral-100 px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <button
            type="button"
            onClick={() => setDraft(emptyFilters)}
            className="rounded-sm text-sm leading-5 font-medium text-neutral-900 hover:text-primary-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
          >
            Clear All
          </button>
          <button
            type="button"
            onClick={() => onApply(draft)}
            className="btn-sheen group flex h-11 items-center gap-2 rounded-lg bg-primary-500 pr-3 pl-6 text-sm leading-5 font-medium text-white transition-colors hover:bg-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-800"
          >
            Explore {resultCount} {resultCount === 1 ? "Product" : "Products"}
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5 transition-transform duration-300 group-hover:translate-x-1">
              <path d="M4 12h16m-6-6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
