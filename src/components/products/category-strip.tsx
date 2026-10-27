"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ProductCategory } from "@/lib/products";

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-6">
      <path
        d={direction === "left" ? "M20 12H4m6-6l-6 6 6 6" : "M4 12h16m-6-6l6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

type CategoryStripProps = {
  categories: ProductCategory[];
  activeSlug: string | null;
  onSelect: (slug: string) => void;
};

export function CategoryStrip({ categories, activeSlug, onSelect }: CategoryStripProps) {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [canScroll, setCanScroll] = useState({ left: false, right: false });

  const updateScrollState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScroll({
      left: el.scrollLeft > 1,
      right: el.scrollLeft + el.clientWidth < el.scrollWidth - 1,
    });
  }, []);

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [updateScrollState]);

  function scrollByPage(direction: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  }

  const arrowClass =
    "absolute top-1/2 z-10 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-900 bg-white/85 text-neutral-900 transition-[opacity,background-color,color] hover:bg-neutral-900 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 disabled:pointer-events-none disabled:opacity-30 lg:flex";

  return (
    <nav aria-label="Product categories" className="relative mx-auto max-w-[1684px]">
      <button type="button" aria-label="Scroll categories left" onClick={() => scrollByPage(-1)} disabled={!canScroll.left} className={`${arrowClass} -left-5`}>
        <Arrow direction="left" />
      </button>

      <ul
        ref={scrollerRef}
        onScroll={updateScrollState}
        className="-mx-3 flex snap-x scroll-px-3 gap-2 overflow-x-auto px-3 py-1 [scrollbar-width:none] md:-mx-4 md:scroll-px-4 md:px-4 lg:mx-0 lg:scroll-px-0 lg:gap-3 lg:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {categories.map((category) => {
          const active = category.slug === activeSlug;
          return (
            <li key={category.slug} className="shrink-0 snap-start">
              <button
                type="button"
                aria-pressed={active}
                onClick={() => onSelect(category.slug)}
                className={`group relative block size-16 overflow-hidden rounded-[4px] bg-neutral-300 transition-[box-shadow,translate] duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 md:size-30 md:rounded-[5px] lg:size-40 lg:rounded-lg 2xl:size-50 ${
                  active ? "ring-2 ring-primary-500 ring-offset-2" : ""
                }`}
              >
                {category.image && (
                  <Image
                    src={category.image}
                    alt=""
                    fill
                    sizes="(min-width: 1536px) 200px, (min-width: 1024px) 160px, (min-width: 768px) 120px, 64px"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                )}
                <span aria-hidden="true" className="absolute inset-0 bg-linear-to-b from-black/0 to-black/30" />
                <span className="absolute bottom-1 left-1.5 text-left text-[10px] leading-3 font-semibold text-white md:bottom-2 md:left-2 md:text-sm md:leading-5 2xl:bottom-4 2xl:left-4 2xl:text-lg 2xl:leading-7">
                  {category.name}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <button type="button" aria-label="Scroll categories right" onClick={() => scrollByPage(1)} disabled={!canScroll.right} className={`${arrowClass} -right-5`}>
        <Arrow direction="right" />
      </button>
    </nav>
  );
}
