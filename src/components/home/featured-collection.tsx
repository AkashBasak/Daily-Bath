import { FeaturedCarousel } from "@/components/home/featured-carousel";
import { featuredProducts, initialFeaturedIndex } from "@/lib/featured-products";

export function FeaturedCollection() {
  return (
    <section aria-labelledby="featured-collection-heading" className="mt-6 px-3 md:mt-8 md:px-4 lg:mt-14 lg:px-6">
      <div className="flex flex-col items-center gap-8 overflow-clip rounded-lg bg-linear-to-b from-[#dff9ff] to-white px-0 pt-4 pb-4 md:gap-9 md:pt-6 md:pb-8 lg:gap-22 lg:pt-16 lg:pb-24">
        <div className="flex flex-col items-center gap-1 px-3 text-center lg:gap-3">
          <p className="text-xs leading-[18px] font-semibold text-primary-800 md:text-base md:leading-6 lg:font-display lg:text-[32px] lg:leading-10 lg:font-medium">
            Discover
          </p>
          <h2
            id="featured-collection-heading"
            className="font-display text-xl leading-7 font-bold text-neutral-900 md:text-[40px] md:leading-12 lg:text-7xl lg:leading-[88px]"
          >
            Our Indulgent Collection
          </h2>
        </div>

        <div className="w-full">
          <FeaturedCarousel products={featuredProducts} initialIndex={initialFeaturedIndex} />
        </div>
      </div>
    </section>
  );
}
