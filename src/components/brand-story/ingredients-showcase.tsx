"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ingredientsBubbles from "@/assets/images/brand-story/ingredients-bubbles.png";
import { PartnerLogos } from "@/components/partner-logos";

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

// Extra scroll distance, in viewport heights, over which the media travels
// from full screen into its slot beside the card.
const SCROLL_LENGTH_VH = 110;

function Media({ sizes }: { sizes: string }) {
  // TODO(owner): swap for the final video (muted, looping, playsInline) when supplied.
  return (
    <Image
      src={ingredientsBubbles}
      alt="Close-up of iridescent soap bubbles"
      fill
      sizes={sizes}
      className="[transform:scale(var(--media-zoom,1))] object-cover"
    />
  );
}

export function IngredientsShowcase() {
  const trackRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const layoutRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  // Static on the server, without JS, with reduced motion, or when the layout is taller than the viewport.
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    function evaluate() {
      const layout = layoutRef.current;
      if (!layout) return;
      setAnimated(!motionQuery.matches && layout.offsetHeight < window.innerHeight - 48);
    }

    evaluate();
    window.addEventListener("resize", evaluate);
    motionQuery.addEventListener("change", evaluate);
    return () => {
      window.removeEventListener("resize", evaluate);
      motionQuery.removeEventListener("change", evaluate);
    };
  }, []);

  useEffect(() => {
    if (!animated) return;
    const track = trackRef.current;
    const stage = stageRef.current;
    const slot = slotRef.current;
    const media = mediaRef.current;
    const card = cardRef.current;
    if (!track || !stage || !slot || !media || !card) return;

    let frame = 0;

    function update() {
      frame = 0;
      const trackRect = track!.getBoundingClientRect();
      const scrollable = trackRect.height - window.innerHeight;
      const progress = scrollable > 0 ? clamp01(-trackRect.top / scrollable) : 1;

      const stageRect = stage!.getBoundingClientRect();
      const slotRect = slot!.getBoundingClientRect();
      const radius = parseFloat(getComputedStyle(slot!).borderTopLeftRadius) || 0;

      // The media settles over the first 75% of the scroll; the card slides in behind it.
      const m = easeInOutCubic(clamp01(progress / 0.75));
      const c = easeInOutCubic(clamp01((progress - 0.4) / 0.5));

      media!.style.left = `${lerp(0, slotRect.left - stageRect.left, m)}px`;
      media!.style.top = `${lerp(0, slotRect.top - stageRect.top, m)}px`;
      media!.style.width = `${lerp(stageRect.width, slotRect.width, m)}px`;
      media!.style.height = `${lerp(stageRect.height, slotRect.height, m)}px`;
      media!.style.borderRadius = `${lerp(0, radius, m)}px`;
      media!.style.setProperty("--media-zoom", `${lerp(1.12, 1, m)}`);

      card!.style.transform = `translateX(${lerp(40, 0, c)}%)`;
      card!.style.opacity = `${c}`;
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      card.style.removeProperty("transform");
      card.style.removeProperty("opacity");
    };
  }, [animated]);

  return (
    <section
      ref={trackRef}
      aria-labelledby="ingredients-heading"
      className={animated ? "relative mt-12 md:mt-18 lg:mt-22" : "relative mt-12 md:mt-18 lg:mt-[140px]"}
      style={animated ? { height: `${100 + SCROLL_LENGTH_VH}svh` } : undefined}
    >
      <div ref={stageRef} className={animated ? "sticky top-0 flex h-svh items-center overflow-hidden" : undefined}>
        <div
          ref={layoutRef}
          className="flex w-full flex-col gap-4 px-3 md:px-4 lg:flex-row lg:items-stretch lg:justify-between lg:gap-6 lg:px-6"
        >
          {/* Holds the media's resting size and position. */}
          <div
            ref={slotRef}
            className="relative aspect-[369/224] w-full shrink-0 overflow-hidden rounded-[5px] md:aspect-[736/447] md:rounded-[10px] lg:aspect-[1137/690] lg:w-[60.7%] lg:rounded-2xl"
          >
            {!animated && <Media sizes="(min-width: 1024px) 61vw, 100vw" />}
          </div>

          <div
            ref={cardRef}
            className="flex flex-col items-center justify-between gap-12 rounded-lg bg-primary-100 px-4 py-5 text-center shadow-[0_9px_10.5px_rgba(186,186,186,0.1),0_37px_18.5px_rgba(186,186,186,0.09),0_84px_25px_rgba(186,186,186,0.05)] md:rounded-2xl md:px-6 md:py-8 lg:flex-1 lg:px-[3%] lg:py-10 2xl:py-16"
          >
            <div className="flex flex-col items-center gap-5 md:gap-6 2xl:gap-8">
              <div className="flex max-w-[477px] flex-col gap-1 md:gap-2 2xl:gap-4">
                <p className="text-xs leading-[18px] font-semibold text-primary-800 md:text-base md:leading-6 2xl:font-display 2xl:text-2xl 2xl:leading-8">
                  Ingredients
                </p>
                <h2
                  id="ingredients-heading"
                  className="text-lg leading-7 font-semibold text-neutral-900 md:font-display md:text-[32px] md:leading-10 md:font-bold 2xl:text-5xl 2xl:leading-16"
                >
                  Thoughtful Ingredients for the Way Your Body Feels
                </h2>
              </div>
              <p className="text-xs leading-[18px] text-neutral-600 md:text-sm md:leading-5 2xl:font-display 2xl:text-xl 2xl:leading-7">
                Daily Bath is currently at an early brand-development stage. The brand name has been established, while
                its product portfolio, brand positioning, visual direction,
              </p>
            </div>

            <div className="flex flex-col items-center gap-5">
              <p className="text-sm leading-5 text-neutral-600 md:text-base md:leading-6 2xl:font-display 2xl:text-xl 2xl:leading-7">
                Clinically Tested &amp; Approved by
              </p>
              <PartnerLogos className="justify-center" />
            </div>
          </div>
        </div>

        {/* While animating, the media lives on the pinned stage and is driven by scroll. */}
        {animated && (
          <div ref={mediaRef} aria-hidden="true" className="pointer-events-none absolute top-0 left-0 z-10 h-full w-full overflow-hidden">
            <Media sizes="100vw" />
          </div>
        )}
      </div>
    </section>
  );
}
