"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import type { FeaturedProduct } from "@/lib/featured-products";

// Slides rendered on each side of the focused one. The outer pair sits
// hidden so items fade in/out instead of jumping across the stage.
const WINDOW = 2;
const SWIPE_THRESHOLD_PX = 40;

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex items-center gap-[1.5px] md:gap-[2.25px] lg:gap-[3px]" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => (
          <svg
            key={i}
            viewBox="0 0 24 24"
            className={`size-2.5 md:size-3 lg:size-4 ${i < Math.round(rating) ? "fill-[#facc15]" : "fill-neutral-300"}`}
          >
            <path d="M12 1.25l3.32 6.73 7.43 1.08-5.38 5.24 1.27 7.4L12 18.2l-6.64 3.5 1.27-7.4L1.25 9.06l7.43-1.08z" />
          </svg>
        ))}
      </span>
      <span className="sr-only">Rated {rating.toFixed(1)} out of 5</span>
      <span aria-hidden="true" className="text-xs leading-4 font-semibold text-primary-800 md:text-sm md:leading-5 lg:text-lg lg:leading-7">
        {rating.toFixed(1)}/5
      </span>
    </div>
  );
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5 lg:size-6">
      <path
        d={direction === "left" ? "M20 12H4m6-6l-6 6 6 6" : "M4 12h16m-6-6l6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function FeaturedCarousel({ products, initialIndex = 0 }: { products: FeaturedProduct[]; initialIndex?: number }) {
  // A position that grows without wrapping; the product shown is position mod length.
  const [position, setPosition] = useState(initialIndex);
  const pointerStartX = useRef<number | null>(null);

  const count = products.length;
  const active = products[mod(position, count)];

  const go = useCallback((step: number) => setPosition((p) => p + step), []);

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    }
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") pointerStartX.current = event.clientX;
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    if (pointerStartX.current === null) return;
    const delta = event.clientX - pointerStartX.current;
    pointerStartX.current = null;
    if (Math.abs(delta) >= SWIPE_THRESHOLD_PX) go(delta < 0 ? 1 : -1);
  }

  if (count === 0) return null;

  const offsets = Array.from({ length: WINDOW * 2 + 1 }, (_, i) => i - WINDOW);

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Featured products"
      onKeyDown={onKeyDown}
      className="flex flex-col items-center gap-6 lg:gap-12"
    >
      <div className="flex w-full flex-col items-center gap-3 lg:gap-6">
        {/* Keyed on the product so the details fade in on every change. */}
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {`${active.name}, product ${mod(position, count) + 1} of ${count}`}
        </p>
        <div key={active.slug} className="flex animate-fade-in flex-col items-center gap-1 md:gap-2 lg:gap-4">
          <h3 className="text-center text-base leading-6 font-semibold text-primary-900 md:font-display md:text-xl md:leading-7 md:font-bold lg:text-[40px] lg:leading-12">
            {active.name}
          </h3>
          <StarRating rating={active.rating} />
        </div>

        <div
          className="relative h-[250px] w-full touch-pan-y [container-type:inline-size] [--blur:2px] [--scale:0.6] [--spread:55cqw] [--arrow:36cqw] md:h-[220px] md:[--scale:0.68] md:[--spread:35.6cqw] md:[--arrow:20cqw] lg:h-[450px] lg:[--blur:4px] lg:[--scale:0.667] lg:[--spread:29.6cqw] lg:[--arrow:15.5cqw]"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (pointerStartX.current = null)}
        >
          {offsets.map((offset) => {
            const slidePosition = position + offset;
            const product = products[mod(slidePosition, count)];
            const isActive = offset === 0;
            const isHidden = Math.abs(offset) > 1;
            const style: CSSProperties = isActive
              ? { transform: "translateX(-50%)" }
              : {
                  transform: `translateX(calc(-50% + ${offset} * var(--spread))) scale(var(--scale))`,
                  filter: "blur(var(--blur))",
                };

            return (
              <div
                key={slidePosition}
                style={style}
                aria-hidden={!isActive}
                onClick={isHidden || isActive ? undefined : () => go(offset)}
                className={`absolute top-0 left-1/2 h-full transition-[transform,filter,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
                  isActive ? "z-10" : "z-0 cursor-pointer"
                } ${isHidden ? "pointer-events-none opacity-0" : "opacity-100"}`}
              >
                <Image
                  src={product.image}
                  alt={isActive ? product.imageAlt : ""}
                  sizes="(min-width: 1024px) 540px, 300px"
                  className={`h-full w-auto max-w-none object-contain select-none ${isActive ? "animate-float" : ""}`}
                  draggable={false}
                />
              </div>
            );
          })}

          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous product"
            style={{ left: "calc(50% - var(--arrow))" }}
            className="absolute top-1/2 z-20 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-primary-500"
          >
            <span className="flex size-8 items-center justify-center rounded-full border border-neutral-900 bg-white/60 text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white lg:size-10">
              <ArrowIcon direction="left" />
            </span>
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next product"
            style={{ left: "calc(50% + var(--arrow))" }}
            className="absolute top-1/2 z-20 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-primary-500"
          >
            <span className="flex size-8 items-center justify-center rounded-full border border-neutral-900 bg-white/60 text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white lg:size-10">
              <ArrowIcon direction="right" />
            </span>
          </button>
        </div>
      </div>

      <Link
        href={`/products/${active.slug}`}
        aria-label={`Learn more about ${active.name}`}
        className="btn-sheen flex h-10 items-center justify-center rounded-lg bg-primary-500 px-8 text-sm leading-5 font-semibold text-white transition-colors hover:bg-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-800 md:h-12 md:text-base md:leading-6 lg:h-14 lg:text-lg lg:leading-7"
      >
        Learn More
      </Link>
    </div>
  );
}
