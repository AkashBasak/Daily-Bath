"use client";

import Image from "next/image";
import { useRef } from "react";
import type { HowToVideo } from "@/lib/product-details";
import { socialLinks } from "@/lib/site-config";

const fallbackUrl = socialLinks.find((link) => link.label === "Instagram")?.href ?? "https://www.instagram.com/";

export function HowToUseVideos({ videos }: { videos: HowToVideo[] }) {
  const scrollerRef = useRef<HTMLUListElement>(null);

  return (
    <section aria-labelledby="how-to-use-heading" className="flex flex-col gap-4">
      <h2 id="how-to-use-heading" className="font-display text-lg leading-7 font-bold text-neutral-900 md:text-xl lg:text-2xl lg:leading-8">
        How to Use?
      </h2>
      <div className="relative">
        <ul
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 [scrollbar-width:none] lg:gap-6 [&::-webkit-scrollbar]:hidden"
        >
          {videos.map((video, index) => (
            <li key={index} className="w-[44%] shrink-0 snap-start md:w-[46%] lg:w-[225px]">
              <a
                href={video.url ?? fallbackUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Play video: ${video.label} (opens in a new tab)`}
                className="group relative block aspect-[3/4] overflow-hidden rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 lg:rounded-xl"
              >
                <Image
                  src={video.poster}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 225px, 45vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <span
                  aria-hidden="true"
                  className="absolute right-2 bottom-2 flex size-6 items-center justify-center rounded-full bg-primary-500 text-white shadow-md transition-transform duration-300 group-hover:scale-110 lg:right-3 lg:bottom-3 lg:size-8"
                >
                  <svg viewBox="0 0 24 24" className="ml-0.5 size-1/2 fill-current">
                    <path d="M7 4.5v15l12-7.5z" />
                  </svg>
                </span>
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          aria-label="More videos"
          onClick={() => scrollerRef.current?.scrollBy({ left: scrollerRef.current.clientWidth * 0.8, behavior: "smooth" })}
          className="absolute top-1/2 -right-5 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full bg-secondary-500 text-white shadow-md transition-colors hover:bg-primary-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 lg:flex"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-6">
            <path d="M4 12h16m-6-6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
          </svg>
        </button>
      </div>
    </section>
  );
}
