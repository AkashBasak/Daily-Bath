import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 md:gap-1.5 lg:gap-2">
      <span className="flex items-center gap-px md:gap-[1.5px] lg:gap-[3px]" aria-hidden="true">
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
      <span aria-hidden="true" className="text-[10px] leading-4 font-semibold text-neutral-900 md:text-xs lg:text-base 2xl:text-lg">
        {rating.toFixed(1)}/5
      </span>
    </div>
  );
}

export function ProductCard({ product, headingLevel: Heading = "h2" }: { product: Product; headingLevel?: "h2" | "h3" }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col gap-3 rounded-lg transition-transform duration-300 ease-out hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500 lg:gap-6"
    >
      <div className="flex flex-col gap-2 lg:gap-4">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-[rgba(232,248,252,0.5)] transition-[background-color,box-shadow] duration-300 group-hover:bg-primary-100/60 group-hover:shadow-[0_10px_24px_rgba(13,103,122,0.12)] md:rounded-xl">
          {product.image ? (
            <Image
              src={product.image}
              alt=""
              fill={product.imageFit === "cover"}
              sizes="(min-width: 1024px) 23vw, (min-width: 768px) 31vw, 47vw"
              className={
                product.imageFit === "cover"
                  ? "object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  : "absolute inset-[10.6%] size-[78.8%] object-contain transition-transform duration-500 ease-out group-hover:scale-108"
              }
            />
          ) : (
            // TODO(owner): product photo still to be supplied.
            <span aria-hidden="true" className="absolute inset-[10.6%] rounded-md bg-neutral-200" />
          )}
        </div>
        <span className="flex h-8 items-center justify-center rounded-full bg-neutral-50 text-xs leading-[18px] font-medium text-neutral-900 transition-colors duration-300 group-hover:bg-primary-500 group-hover:text-white lg:h-10 lg:text-base lg:leading-6">
          Learn More
        </span>
      </div>

      <div className="flex flex-col gap-1 md:gap-2 2xl:gap-4">
        <Heading className="text-sm leading-5 text-neutral-900 transition-colors duration-300 group-hover:text-primary-800 md:text-base md:leading-6 md:font-medium lg:font-display lg:text-lg lg:leading-7 2xl:text-2xl 2xl:leading-8">
          {product.name}
        </Heading>
        <Stars rating={product.rating} />
      </div>
    </Link>
  );
}
