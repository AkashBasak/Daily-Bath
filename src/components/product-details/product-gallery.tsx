"use client";

import Image from "next/image";
import { useState, ViewTransition } from "react";
import type { GalleryImage } from "@/lib/product-details";

export function ProductGallery({ images, morphName }: { images: GalleryImage[]; morphName: string }) {
  const [active, setActive] = useState(0);
  // The first image arrives via the card morph; only later swaps fade in.
  const [switched, setSwitched] = useState(false);
  const current = images[active];

  return (
    <div className="flex flex-col gap-4 md:gap-3 lg:gap-6">
      <ViewTransition name={morphName} share="morph" default="none">
        <div className="group relative aspect-square overflow-hidden rounded-xl bg-[rgba(232,248,252,0.5)]">
          {/* Keyed so each new image fades in. */}
          <Image
            key={active}
            src={current.src}
            alt={current.alt}
            fill
            priority={active === 0}
            placeholder="blur"
            sizes="(min-width: 1024px) 40vw, (min-width: 768px) 47vw, 100vw"
            className={`${switched ? "animate-fade-in" : ""} transition-transform duration-700 ease-out group-hover:scale-105 ${
              current.fit === "contain" ? "object-contain p-[10%]" : "object-cover"
            }`}
          />
        </div>
      </ViewTransition>

      <ul aria-label="Product images" className="grid grid-cols-6 gap-2 md:gap-2 lg:gap-[18px]">
        {images.map((image, index) => (
          <li key={index}>
            <button
              type="button"
              onClick={() => {
                setActive(index);
                setSwitched(true);
              }}
              aria-label={`Show image ${index + 1}: ${image.alt}`}
              aria-pressed={index === active}
              className={`relative block aspect-square w-full overflow-hidden rounded-md bg-[rgba(232,248,252,0.5)] transition-[opacity,box-shadow] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 lg:rounded-lg ${
                index === active ? "ring-2 ring-primary-500 ring-offset-2" : "opacity-80 hover:opacity-100"
              }`}
            >
              <Image
                src={image.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 8vw, 16vw"
                className={image.fit === "contain" ? "object-contain p-1.5" : "object-cover"}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
