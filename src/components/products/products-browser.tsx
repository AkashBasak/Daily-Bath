"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { CategoryStrip } from "@/components/products/category-strip";
import { FilterGroup } from "@/components/products/filter-controls";
import { MobileFilterSheet } from "@/components/products/mobile-filter-sheet";
import { ProductCard } from "@/components/products/product-card";
import { SortMenu } from "@/components/products/sort-menu";
import {
  emptyFilters,
  filterAndSort,
  getCategory,
  ingredients,
  productCategories,
  products,
  skinTypes,
  type ProductFilters,
  type SortOption,
} from "@/lib/products";

const PAGE_SIZE = 8;

function Caret() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4 shrink-0 fill-current">
      <path d="M3 5.5h10L8 11z" />
    </svg>
  );
}

function LoadingIndicator() {
  return (
    <div role="status" className="flex flex-col items-center gap-1.5 md:gap-2">
      <svg viewBox="0 0 56 56" aria-hidden="true" className="size-8 animate-spin [animation-duration:1.4s] md:size-12 lg:size-14">
        {Array.from({ length: 8 }, (_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          return (
            <circle
              key={i}
              cx={28 + Math.cos(angle) * 20}
              cy={28 + Math.sin(angle) * 20}
              r={3 + (i % 4) * 0.8}
              className="fill-primary-800"
              opacity={0.25 + (i / 8) * 0.75}
            />
          );
        })}
      </svg>
      <span className="font-display text-sm leading-5 font-medium text-primary-900 md:text-base lg:text-xl lg:leading-7">
        Loading...
      </span>
    </div>
  );
}

function isDesktop() {
  return window.matchMedia("(min-width: 768px)").matches;
}

export function ProductsBrowser({ initialCategory }: { initialCategory: string | null }) {
  const [filters, setFilters] = useState<ProductFilters>(() =>
    getCategory(initialCategory) ? { ...emptyFilters, categories: [initialCategory as string] } : emptyFilters,
  );
  const [sort, setSort] = useState<SortOption>("default");
  const [panelOpen, setPanelOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const panelId = useId();
  const panelRef = useRef<HTMLElement>(null);
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => filterAndSort(products, filters, sort), [filters, sort]);
  const shown = results.slice(0, visibleCount);
  const hasMore = visibleCount < results.length;

  // Exactly one product type selected: the page is about that category.
  const activeCategory = filters.categories.length === 1 ? getCategory(filters.categories[0]) : undefined;
  const title = activeCategory?.name ?? "All Products";

  const updateFilters = useCallback((next: ProductFilters) => {
    setFilters(next);
    setVisibleCount(PAGE_SIZE);
    // Keep the address shareable without a navigation.
    const url = new URL(window.location.href);
    if (next.categories.length === 1) url.searchParams.set("category", next.categories[0]);
    else url.searchParams.delete("category");
    window.history.replaceState(null, "", url);
  }, []);

  function toggle(key: keyof ProductFilters, value: string) {
    const list = filters[key];
    updateFilters({ ...filters, [key]: list.includes(value) ? list.filter((v) => v !== value) : [...list, value] });
  }

  function selectCategory(slug: string) {
    const alreadyOnly = filters.categories.length === 1 && filters.categories[0] === slug;
    updateFilters({ ...filters, categories: alreadyOnly ? [] : [slug] });
  }

  function openFilters() {
    if (isDesktop()) setPanelOpen((o) => !o);
    else setSheetOpen(true);
  }

  // Infinite scroll: reveal the next page when the loader nears the viewport.
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisibleCount((count) => count + PAGE_SIZE);
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, visibleCount]);

  // Tablet overlay panel closes on Escape or a click outside it.
  useEffect(() => {
    if (!panelOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setPanelOpen(false);
        filterButtonRef.current?.focus();
      }
    }
    function onPointerDown(event: PointerEvent) {
      const overlay = window.matchMedia("(min-width: 768px) and (max-width: 1023.98px)").matches;
      const target = event.target as Node;
      if (overlay && !panelRef.current?.contains(target) && !filterButtonRef.current?.contains(target)) setPanelOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [panelOpen]);

  const activeFilterCount = filters.categories.length + filters.skinTypes.length + filters.ingredients.length;

  return (
    <>
      <div className="mt-6 px-3 md:mt-8 md:px-4 lg:mt-18 lg:px-6">
        <CategoryStrip categories={productCategories} activeSlug={activeCategory?.slug ?? null} onSelect={selectCategory} />
      </div>

      <h1
        key={title}
        className="mt-4 animate-fade-in px-3 text-center font-display text-xl leading-7 font-bold text-neutral-900 md:mt-10 md:text-[40px] md:leading-12 lg:mt-18 lg:text-[56px] lg:leading-[68px] 2xl:text-7xl 2xl:leading-[88px]"
      >
        {title}
      </h1>

      <div className="relative mt-4 flex items-start gap-8 px-3 md:mt-8 md:px-4 lg:px-6">
        {/* Desktop: takes the first column. Tablet: overlays it. */}
        {panelOpen && (
          <aside
            id={panelId}
            ref={panelRef}
            aria-label="Filters"
            className="absolute top-0 left-4 z-20 hidden w-60 animate-[panel-in_450ms_var(--ease-premium)_both] flex-col gap-6 rounded-lg border border-neutral-200 bg-neutral-50 pt-5 pr-3 pb-2 pl-4 shadow-[0_3px_3px_rgba(161,161,161,0.1),0_10px_5px_rgba(161,161,161,0.09),0_23px_7px_rgba(161,161,161,0.05)] md:flex lg:sticky lg:top-32 lg:left-auto lg:max-h-[calc(100dvh-9rem)] lg:w-[calc((100%-96px)/4)] lg:shrink-0 lg:overflow-y-auto lg:pt-6 lg:pr-4 lg:pl-6 lg:shadow-none"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg leading-7 font-semibold text-neutral-900 lg:font-display lg:text-2xl lg:leading-8">Filters</h2>
              <button
                type="button"
                onClick={() => {
                  setPanelOpen(false);
                  filterButtonRef.current?.focus();
                }}
                aria-label="Close filters"
                className="-m-2 flex size-10 items-center justify-center rounded-full hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-primary-500"
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-6">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col gap-6">
              <FilterGroup
                title="Product Type"
                options={productCategories.map((c) => ({ value: c.slug, label: c.name }))}
                selected={filters.categories}
                onToggle={(value) => toggle("categories", value)}
                searchPlaceholder="Search category"
              />
              <FilterGroup
                title="Skin Type"
                options={skinTypes.map((s) => ({ value: s, label: s }))}
                selected={filters.skinTypes}
                onToggle={(value) => toggle("skinTypes", value)}
              />
              <FilterGroup
                title="Ingredients"
                options={ingredients.map((i) => ({ value: i, label: i }))}
                selected={filters.ingredients}
                onToggle={(value) => toggle("ingredients", value)}
                searchPlaceholder="Search Ingredients"
                divider={false}
              />
            </div>
            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={() => updateFilters(emptyFilters)}
                className="mb-4 self-start rounded-sm text-sm leading-5 font-medium text-primary-800 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-primary-500"
              >
                Clear all filters
              </button>
            )}
          </aside>
        )}

        <div className="min-w-0 flex-1">
          {/* Controls */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 lg:gap-6">
              <button
                ref={filterButtonRef}
                type="button"
                aria-expanded={panelOpen || sheetOpen}
                aria-controls={panelId}
                onClick={openFilters}
                className={`order-2 flex h-8 w-[104px] items-center justify-between rounded-lg border border-neutral-200 bg-neutral-50 pr-2 pl-3 text-sm leading-5 font-medium text-neutral-900 transition-colors hover:border-neutral-300 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 md:order-none md:h-10 md:w-[180px] md:pr-3 md:pl-4 md:text-base md:leading-6 lg:h-12 lg:w-[calc((100vw-144px)/4)] lg:max-w-[445px] lg:pr-4 lg:pl-6 lg:font-display lg:text-lg lg:leading-7 2xl:text-xl ${
                  panelOpen ? "lg:hidden" : ""
                }`}
              >
                <span>
                  Filters
                  {activeFilterCount > 0 && <span className="ml-1.5 text-primary-800">({activeFilterCount})</span>}
                </span>
                <Caret />
              </button>
              <p aria-live="polite" className="order-1 text-sm leading-5 text-neutral-900 md:order-none lg:text-base lg:leading-6">
                {results.length} {results.length === 1 ? "Product" : "Products"}
              </p>
            </div>
            <SortMenu
              value={sort}
              onChange={(value) => {
                setSort(value);
                setVisibleCount(PAGE_SIZE);
              }}
              className={`w-[104px] md:w-[175px] ${panelOpen ? "lg:w-[212px]" : "lg:w-[calc((100vw-144px)/4)] lg:max-w-[445px]"}`}
            />
          </div>

          {/* Grid */}
          {shown.length > 0 ? (
            // Re-keyed when the layout changes so the cards cascade back in.
            <ul
              key={panelOpen ? "with-filters" : "full-width"}
              className={`mt-4 grid grid-cols-2 gap-x-4 gap-y-6 md:mt-3 md:grid-cols-3 lg:mt-8 lg:gap-x-8 lg:gap-y-12 ${panelOpen ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}
            >
              {shown.map((product, index) => (
                <li
                  key={product.slug}
                  className="animate-[rise-in_700ms_var(--ease-premium)_both]"
                  style={{ animationDelay: `${(index % PAGE_SIZE) * 60}ms` }}
                >
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-10 flex flex-col items-center gap-4 rounded-xl bg-neutral-50 px-6 py-14 text-center">
              <p className="font-display text-lg leading-7 font-semibold text-neutral-900">No products match these filters</p>
              <p className="max-w-sm text-sm leading-5 text-neutral-600">Try removing a filter or choosing another category.</p>
              <button
                type="button"
                onClick={() => updateFilters(emptyFilters)}
                className="h-10 rounded-full bg-primary-500 px-6 text-sm leading-5 font-semibold text-white hover:bg-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-800"
              >
                Clear filters
              </button>
            </div>
          )}

          {hasMore && (
            <div ref={sentinelRef} className="mt-6 flex justify-center md:mt-14 lg:mt-24">
              <LoadingIndicator />
            </div>
          )}
        </div>
      </div>

      <MobileFilterSheet
        open={sheetOpen}
        applied={filters}
        onApply={(next) => {
          updateFilters(next);
          setSheetOpen(false);
        }}
        onClose={() => setSheetOpen(false)}
      />
    </>
  );
}
