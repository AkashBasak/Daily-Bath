import Image from "next/image";
import { SocialLinks } from "@/components/social-links";
import heroImage from "@/assets/images/hero-bath.png";

const headline = ["GLOW", "NATURALLY"];

export function HomeHero() {
  return (
    <section
      aria-labelledby="home-hero-heading"
      className="flex flex-col items-center gap-6 px-3 pt-6 md:gap-8 md:px-4 md:pt-8 lg:gap-20 lg:px-6 lg:pt-18"
    >
      <div className="flex w-full max-w-[1740px] flex-col items-center gap-8 md:px-[2.35%] lg:gap-16 lg:px-0">
        <h1
          id="home-hero-heading"
          className="w-full text-center font-display text-[calc((100vw-3.5rem)/9.5)] leading-[1.22] font-bold tracking-[0.04em] whitespace-nowrap text-neutral-900 md:text-[calc((100vw-6rem)/9.5)] lg:text-[min(calc((100vw-11.25rem)/9.5),calc(1740px/9.6))] lg:leading-[0.8125]"
        >
          <span className="sr-only">GLOW NATURALLY</span>
          {/* Each letter rises out of a mask. The set renders ~9.47em wide, so the
              font size divides the available width by 9.5 to stay on one line. */}
          <span aria-hidden="true">
            {headline.map((word, w) => (
              <span key={word}>
                {w > 0 && " "}
                <span className="-my-[0.12em] inline-block overflow-hidden py-[0.12em] align-bottom">
                  {word.split("").map((letter, i) => (
                    <span key={i} className="hero-letter" style={{ "--i": w * 4 + i } as React.CSSProperties}>
                      {letter}
                    </span>
                  ))}
                </span>
              </span>
            ))}
          </span>
        </h1>

        <div className="hero-rise flex w-full flex-col items-center gap-8 md:flex-row md:items-end md:justify-between md:gap-6">
          <p className="max-w-[350px] text-center text-xs leading-[18px] md:max-w-[427px] md:text-left md:text-sm md:leading-5 lg:max-w-[614px] lg:text-base lg:leading-6">
            Daily Bath is currently at an early brand-development stage. The brand name has been established,
            while its product portfolio, brand positioning, visual direction, and communication strategy are
            still being explored
          </p>

          <div className="flex shrink-0 flex-col items-center gap-1 md:items-end md:gap-1 lg:gap-3">
            <p className="text-base leading-6 md:text-sm md:leading-5 lg:text-base lg:leading-6">Follow us</p>
            <SocialLinks
              className="-mx-2 md:-mr-1.5 lg:mx-0 lg:gap-4"
              linkClassName="size-10 lg:size-12"
              iconClassName="size-6 md:size-[30px] lg:size-12"
            />
          </div>
        </div>
      </div>

      <div className="hero-unveil relative w-full overflow-hidden rounded md:rounded lg:rounded-lg">
        {/* Unveils on load, then drifts slightly as it scrolls away. */}
        <div className="parallax-out">
          <Image
            src={heroImage}
            alt="A woman relaxing in a foam-filled bathtub in a teal-tiled bathroom"
            priority
            placeholder="blur"
            sizes="(min-width: 1024px) calc(100vw - 48px), (min-width: 768px) calc(100vw - 32px), calc(100vw - 24px)"
            className="hero-unveil__image aspect-[1872/720] h-auto w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
