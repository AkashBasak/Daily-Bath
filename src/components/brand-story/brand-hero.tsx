import Image from "next/image";
import { RevealGroup } from "@/components/reveal-group";
import heroBath from "@/assets/images/brand-story/hero-bath.png";

export function BrandHero() {
  return (
    // Pulled up under the floating header so the lavender fills the top of the page.
    <section
      aria-labelledby="brand-hero-heading"
      className="-mt-10 overflow-x-clip bg-secondary-100 px-3 pt-[68px] pb-6 md:-mt-16 md:px-4 md:pt-24 md:pb-11 lg:-mt-20 lg:px-6 lg:pt-32 lg:pb-32"
    >
      <RevealGroup className="flex flex-col gap-5 md:flex-row md:items-center md:gap-6 lg:gap-[4.6%]">
        <div
          data-reveal="enter-left"
          className="group relative aspect-square w-full shrink-0 overflow-hidden md:w-[48.6%] lg:w-[50.2%]"
        >
          <Image
            src={heroBath}
            alt="Woman resting on the edge of a bubble bath beside two pump bottles"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, (min-width: 768px) 48vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </div>

        <div
          data-reveal="enter-right"
          style={{ transitionDelay: "150ms" }}
          className="flex flex-col gap-4 text-center text-white md:gap-5 md:text-left lg:max-w-[711px] lg:gap-8"
        >
          <div className="flex flex-col gap-2 md:gap-3 lg:gap-4">
            <p className="text-sm leading-5 font-semibold md:text-base md:leading-6 lg:font-display lg:text-xl lg:leading-7 2xl:text-2xl 2xl:leading-8">
              A BETTER WAY TO FEEL FRESH
            </p>
            <h1
              id="brand-hero-heading"
              className="font-display text-2xl leading-8 font-bold md:text-[32px] md:leading-10 lg:text-[40px] lg:leading-12 xl:text-5xl xl:leading-15 min-[1600px]:text-[64px] min-[1600px]:leading-20"
            >
              “WE WANT EVERY BATH TO LEAVE YOU FEELING BETTER MORE THAN JUST GET YOU CLEAN.”
            </h1>
          </div>
          <p className="text-xs leading-[18px] md:text-sm md:leading-5 lg:text-base lg:leading-6 2xl:text-lg 2xl:leading-7">
            Daily Bath is created around one simple idea. Your everyday bath should feel enjoyable, care for your body,
            and leave you feeling fresh long after you step out. That belief shapes every essential we bring into the
            bathroom.
          </p>
        </div>
      </RevealGroup>
    </section>
  );
}
