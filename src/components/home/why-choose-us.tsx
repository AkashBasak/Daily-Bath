import Image, { type StaticImageData } from "next/image";
import { RevealGroup } from "@/components/reveal-group";
import creamSwatch from "@/assets/images/why/cream-swatch.png";
import dermatest from "@/assets/images/why/dermatest-in-vitro.png";
import petaAnimalTestFree from "@/assets/images/why/peta-animal-test-free.png";

type Promise = {
  title: string;
  body: string;
  image: StaticImageData;
  imageAlt: string;
  imageClassName: string;
};

const promises: Promise[] = [
  {
    title: "Gentle for Everyday Use",
    body: "Designed with daily routines in mind to keep cleansing comfortable and refreshing.",
    image: creamSwatch,
    imageAlt: "",
    imageClassName: "w-[82%]",
  },
  {
    title: "Skin Loving Ingredients",
    body: "Every formula begins with carefully considered ingredients chosen for effective everyday body care.",
    image: petaAnimalTestFree,
    imageAlt: "PETA Animal Test-Free certification",
    imageClassName: "w-[81%]",
  },
  {
    title: "Quality You Can Trust",
    body: "Created with a consistent focus on product quality safety and a better everyday bathing experience.",
    image: dermatest,
    imageAlt: "Dermatest In Vitro Tested 01/2025 seal",
    imageClassName: "w-[96%]",
  },
];

export function WhyChooseUs() {
  return (
    <section aria-labelledby="why-heading" className="mt-12 px-3 md:mt-18 md:px-4 lg:mt-24 lg:px-6">
      <RevealGroup className="mx-auto flex max-w-[1496px] flex-col items-center">
        <div data-reveal="up" className="flex flex-col items-center gap-1 text-center md:gap-3">
          <p className="text-xs leading-[18px] font-semibold text-primary-800 md:text-base md:leading-6 lg:font-display lg:text-[32px] lg:leading-10 lg:font-medium">
            Why Choose Us?
          </p>
          <h2
            id="why-heading"
            className="font-display text-xl leading-7 font-bold text-neutral-900 md:text-[40px] md:leading-12 lg:text-5xl lg:leading-14 2xl:text-7xl 2xl:leading-[88px]"
          >
            Freshness is Our Promise
          </h2>
        </div>

        <ul className="mt-[150px] grid w-full max-w-[300px] grid-cols-1 gap-y-[120px] md:mt-24 md:max-w-none md:grid-cols-3 md:gap-8 lg:mt-[150px] 2xl:mt-[174px] 2xl:gap-[148px]">
          {promises.map((item, index) => (
            <li key={item.title} data-reveal="up" style={{ transitionDelay: `${150 + index * 120}ms` }}>
              <article className="relative flex h-full flex-col items-center rounded-xl bg-white px-4 pt-[107px] pb-8 text-center shadow-[0_6px_7px_rgba(209,209,209,0.1),0_25px_12.5px_rgba(209,209,209,0.09),0_56px_17px_rgba(209,209,209,0.05)] transition-[translate,box-shadow] duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_10px_14px_rgba(160,160,160,0.16),0_32px_28px_rgba(160,160,160,0.14),0_64px_40px_rgba(160,160,160,0.08)] md:rounded-[5px] md:px-4 md:pt-[76px] md:pb-6 lg:rounded-xl lg:pt-[140px] lg:pb-10 2xl:aspect-square 2xl:px-[9px] 2xl:pt-[184px]">
                <div className="absolute top-0 left-1/2 flex size-[150px] -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full bg-white shadow-[0_1px_2px_rgba(196,196,196,0.1),0_4px_4px_rgba(196,196,196,0.09),0_9px_5px_rgba(196,196,196,0.05)] md:size-[104px] lg:size-[200px] 2xl:size-[250px]">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    sizes="(min-width: 1536px) 325px, (min-width: 1024px) 260px, 200px"
                    className={`h-auto ${item.imageClassName}`}
                  />
                </div>

                <h3 className="text-base leading-6 font-semibold text-secondary-500 md:max-w-[168px] md:text-lg md:leading-7 lg:max-w-[213px] lg:font-display lg:text-[28px] lg:leading-9 lg:font-bold 2xl:text-[32px] 2xl:leading-10">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-[268px] text-xs leading-[18px] text-neutral-600 md:max-w-[168px] md:text-sm md:leading-5 lg:mt-6 lg:max-w-[381px] lg:text-base lg:leading-6">
                  {item.body}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </RevealGroup>
    </section>
  );
}
