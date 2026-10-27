"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import avatar from "@/assets/images/brand-story/instagram-avatar.png";
import banner from "@/assets/images/brand-story/instagram-banner.png";
import reel1 from "@/assets/images/brand-story/reel-1.png";
import reel2 from "@/assets/images/brand-story/reel-2.png";
import reel3 from "@/assets/images/brand-story/reel-3.png";
import verifiedBadge from "@/assets/images/brand-story/verified-badge.png";
import { RevealGroup } from "@/components/reveal-group";
import { socialLinks } from "@/lib/site-config";

const instagramUrl = socialLinks.find((link) => link.label === "Instagram")?.href ?? "https://www.instagram.com/";

type Reel = {
  poster: StaticImageData;
  label: string;
  // TODO(owner): add each reel's video file (or its Instagram reel URL).
  videoSrc?: string;
  reelUrl?: string;
};

const reels: Reel[] = [
  { poster: reel1, label: "Reel: holding up a jar of face cream" },
  { poster: reel2, label: "Reel: cleansing oil close-up" },
  { poster: reel3, label: "Reel: three-step regimen to promote skin longevity" },
];

function InstagramIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
      />
    </svg>
  );
}

function PlayBadge() {
  return (
    <span
      aria-hidden="true"
      className="absolute right-2 bottom-2 flex size-[22px] items-center justify-center rounded-full bg-primary-500 text-white shadow-md transition-transform duration-300 group-hover:scale-110 md:right-3 md:bottom-3 md:size-8 2xl:size-10"
    >
      <svg viewBox="0 0 24 24" className="ml-0.5 size-1/2 fill-current">
        <path d="M7 4.5v15l12-7.5z" />
      </svg>
    </span>
  );
}

function ReelCard({ reel, playing, onPlay, onStop }: { reel: Reel; playing: boolean; onPlay: () => void; onStop: () => void }) {
  if (playing && reel.videoSrc) {
    return (
      <video
        src={reel.videoSrc}
        poster={reel.poster.src}
        className="size-full object-cover"
        autoPlay
        playsInline
        controls
        onEnded={onStop}
        aria-label={reel.label}
      />
    );
  }

  const content = (
    <>
      <Image
        src={reel.poster}
        alt=""
        fill
        sizes="(min-width: 1024px) 16vw, (min-width: 768px) 31vw, 150px"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <PlayBadge />
    </>
  );

  const className =
    "group relative block size-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500";

  // Without a video file the reel opens on Instagram.
  if (!reel.videoSrc) {
    return (
      <a
        href={reel.reelUrl ?? instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Play ${reel.label} on Instagram (opens in a new tab)`}
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onPlay} aria-label={`Play ${reel.label}`} className={className}>
      {content}
    </button>
  );
}

export function InstagramSection() {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  return (
    <section aria-labelledby="instagram-heading" className="mt-12 overflow-x-clip px-3 md:mt-18 md:px-4 lg:mt-[140px] lg:px-6">
      <RevealGroup className="flex flex-col gap-4 md:gap-6 lg:flex-row lg:gap-4">
        {/* Profile banner */}
        <div
          data-reveal="up"
          className="relative aspect-[369/161] w-full overflow-hidden rounded md:aspect-[736/321] md:rounded-lg lg:aspect-auto lg:w-[49%] lg:shrink-0"
        >
          <Image src={banner} alt="" fill sizes="(min-width: 1024px) 49vw, 100vw" className="object-cover" />
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-[55%] bg-[linear-gradient(-62.5deg,rgba(217,217,217,0)_17.65%,rgba(0,0,0,0.32)_100%)] lg:w-[52%]"
          />

          <div className="absolute inset-3 flex w-[205px] flex-col justify-between md:inset-8 md:w-[277px] 2xl:top-[37px] 2xl:left-[54px] 2xl:w-[345px]">
            <div className="flex items-center gap-2 md:gap-3 2xl:gap-4">
              <Image src={avatar} alt="" width={72} height={72} className="size-8 rounded-full md:size-[58px] 2xl:size-18" />
              <div className="flex flex-col md:gap-2 2xl:gap-2.5">
                <p className="flex items-center gap-0.5 md:gap-1.5 2xl:gap-2">
                  <span
                    id="instagram-heading"
                    className="text-xs leading-[18px] font-semibold whitespace-nowrap text-neutral-900 md:font-display md:text-base md:leading-[22px] 2xl:text-[32px] 2xl:leading-10 2xl:font-medium"
                  >
                    Daily Bath Official
                  </span>
                  <Image src={verifiedBadge} alt="Verified" width={24} height={24} className="size-3 md:size-[19px] 2xl:size-6" />
                </p>
                {/* TODO(owner): confirm the follower count or remove it. */}
                <p className="text-[10px] leading-4 font-medium text-neutral-900 md:text-[13px] md:leading-[19px] 2xl:text-lg 2xl:leading-7">
                  123k followers
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start gap-2 md:gap-5 2xl:gap-6">
              <p className="text-sm leading-5 font-medium text-white md:font-display md:text-[25px] md:leading-8 md:font-semibold 2xl:text-[32px] 2xl:leading-10">
                Fresh ideas for better everyday care
              </p>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-7 items-center gap-1 rounded-full bg-white px-3 text-xs leading-[18px] font-medium text-secondary-500 transition-[background-color,translate] duration-200 hover:-translate-y-0.5 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:h-8 md:gap-1.5 md:text-[13px] 2xl:h-12 2xl:gap-2 2xl:px-4 2xl:text-lg 2xl:leading-7"
              >
                <InstagramIcon className="size-4 2xl:size-6" />
                Visit Instagram
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Reels: a swipeable row on mobile, a three-up grid from tablet up. */}
        <ul className="-mx-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-3 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 lg:flex-1 lg:gap-[2%]">
          {reels.map((reel, index) => (
            <li
              key={reel.label}
              data-reveal="up"
              style={{ transitionDelay: `${120 + index * 100}ms` }}
              className="relative aspect-[3/4] w-[150px] shrink-0 snap-start overflow-hidden rounded-lg md:w-auto md:rounded-xl 2xl:rounded-2xl"
            >
              <ReelCard
                reel={reel}
                playing={playingIndex === index}
                onPlay={() => setPlayingIndex(index)}
                onStop={() => setPlayingIndex(null)}
              />
            </li>
          ))}
        </ul>
      </RevealGroup>
    </section>
  );
}
