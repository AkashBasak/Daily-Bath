import Image from "next/image";
import Link from "next/link";
import { RevealGroup } from "@/components/reveal-group";
import { homeCategories, type Category } from "@/lib/categories";

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-4 shrink-0 md:size-5 2xl:size-6">
      <path d="M4 12h16m-6-6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/products?category=${category.slug}`}
      className="group relative block aspect-[602/350] overflow-hidden rounded-[10px] bg-neutral-300 transition-[translate,box-shadow,scale] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_7px_15px_rgba(115,115,115,0.1),0_27px_27px_rgba(115,115,115,0.09),0_61px_37px_rgba(115,115,115,0.05)] focus-visible:-translate-y-1.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500 active:translate-y-0 active:scale-[0.98] md:rounded-xl 2xl:rounded-[32px]"
    >
      {category.image && (
        <Image
          src={category.image}
          alt={category.imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 33vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-focus-visible:scale-110"
        />
      )}
      <span aria-hidden="true" className="absolute inset-0 bg-black/30" />

      <span className="absolute inset-3 flex flex-col items-start justify-between md:inset-4 lg:inset-6 min-[1800px]:inset-10">
        <span className="font-display text-base leading-[22px] font-bold text-white md:text-xl md:leading-7 lg:text-2xl lg:leading-8 2xl:text-4xl 2xl:leading-11 min-[1800px]:text-5xl min-[1800px]:leading-16">
          {category.name}
        </span>

        {/* Arrow circle that widens into a "See Products" pill on hover. */}
        <span className="flex h-7 items-center rounded-full border border-white px-[5px] text-white transition-[padding] duration-300 ease-out group-hover:px-3 group-focus-visible:px-3 md:h-8 md:px-[5px] lg:h-10 lg:px-[9px] lg:group-hover:px-4 2xl:h-12 2xl:px-[11px] 2xl:group-hover:px-4">
          <span className="max-w-0 overflow-hidden text-xs leading-[18px] font-semibold whitespace-nowrap opacity-0 transition-[max-width,opacity,margin] duration-300 ease-out group-hover:mr-2 group-hover:max-w-40 group-hover:opacity-100 group-focus-visible:mr-2 group-focus-visible:max-w-40 group-focus-visible:opacity-100 lg:text-base lg:leading-6 2xl:text-lg 2xl:leading-7">
            See Products
          </span>
          <ArrowRightIcon />
        </span>
      </span>
    </Link>
  );
}

export function CategoriesSection() {
  return (
    <section aria-labelledby="categories-heading" className="mt-12 bg-neutral-50 px-3 py-6 md:mt-18 md:px-4 md:py-12 lg:mt-22 lg:px-6 lg:py-22">
      <RevealGroup className="mx-auto flex max-w-[1872px] flex-col gap-4 md:gap-10">
        <div data-reveal="up" className="flex flex-col gap-1 md:gap-2">
          <p className="text-xs leading-[18px] font-semibold text-primary-800 md:text-base md:leading-6 2xl:font-display 2xl:text-2xl 2xl:leading-8">
            What does your routine need today?
          </p>
          <h2
            id="categories-heading"
            className="font-display text-xl leading-7 font-bold text-neutral-900 md:max-w-[472px] md:text-[40px] md:leading-12 lg:max-w-none lg:text-5xl lg:leading-14 2xl:text-7xl 2xl:leading-[88px]"
          >
            Care for Every Part of Your Daily Ritual
          </h2>
        </div>

        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {homeCategories.map((category, index) => (
            <li key={category.slug} data-reveal="up" style={{ transitionDelay: `${100 + index * 80}ms` }}>
              <CategoryCard category={category} />
            </li>
          ))}
        </ul>
      </RevealGroup>
    </section>
  );
}
