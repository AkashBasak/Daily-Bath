import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { HowToUseVideos } from "@/components/product-details/how-to-use-videos";
import { ProductAccordion } from "@/components/product-details/product-accordion";
import { ProductGallery } from "@/components/product-details/product-gallery";
import { ShareButton } from "@/components/product-details/share-button";
import { ProductCard } from "@/components/products/product-card";
import { getProductDetails, getRelatedProducts, howToVideos, marketplaces } from "@/lib/product-details";
import { products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata(props: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const details = getProductDetails(slug);
  if (!details) return { title: "Product not found" };
  return { title: details.product.name, description: details.description };
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-[3px]" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" className={`size-3 lg:size-4 ${i < Math.round(rating) ? "fill-[#facc15]" : "fill-neutral-300"}`}>
          <path d="M12 1.25l3.32 6.73 7.43 1.08-5.38 5.24 1.27 7.4L12 18.2l-6.64 3.5 1.27-7.4L1.25 9.06l7.43-1.08z" />
        </svg>
      ))}
    </span>
  );
}

export default async function ProductDetailsPage(props: PageProps<"/products/[slug]">) {
  const { slug } = await props.params;
  const details = getProductDetails(slug);
  if (!details) notFound();
  const { product } = details;
  const related = getRelatedProducts(product);

  return (
    <main id="main-content" className="px-3 pt-4 pb-16 md:px-4 md:pb-13 lg:px-6 lg:pt-8 lg:pb-24">
      <div className="mx-auto flex max-w-[1740px] flex-col gap-6 md:flex-row md:items-start md:gap-4 lg:gap-7">
        <div className="md:w-[48.6%] lg:w-[43.7%] md:shrink-0">
          <ProductGallery images={details.gallery} />
        </div>

        <div className="flex min-w-0 flex-col gap-8 rounded-xl bg-neutral-50 p-3 md:flex-1 md:p-3 lg:gap-14 lg:p-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between gap-4">
                <span className="flex h-8 items-center rounded bg-[#e8f8fc] px-2.5 text-sm leading-5 text-secondary-500 lg:text-base lg:leading-6">
                  {details.categoryName}
                </span>
                <div className="flex items-end gap-2 lg:gap-3">
                  <span className="font-display text-2xl leading-none font-medium text-primary-900 lg:text-[40px]">
                    {product.rating.toFixed(1)}
                  </span>
                  <span className="flex flex-col gap-1">
                    <Stars rating={product.rating} />
                    <span className="text-xs leading-4 font-medium text-[#10859e] lg:text-lg lg:leading-7">
                      {details.reviewCount.toLocaleString("en-US")} reviews
                    </span>
                  </span>
                  <span className="sr-only">
                    Rated {product.rating.toFixed(1)} out of 5 from {details.reviewCount} reviews
                  </span>
                </div>
              </div>
              <h1 className="font-display text-lg leading-7 font-semibold text-primary-900 md:text-xl lg:text-[40px] lg:leading-[52px] 2xl:text-5xl 2xl:leading-16">
                {product.name}
              </h1>
            </div>
            <p className="text-xs leading-[18px] text-neutral-600 md:text-sm md:leading-5 lg:text-lg lg:leading-7 lg:font-medium">
              {details.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs leading-[18px] text-neutral-600 md:text-sm lg:text-base lg:leading-6">Starting from</span>
                <span className="font-display text-xl leading-8 font-bold text-neutral-900 lg:text-[32px] lg:leading-10">
                  ৳{details.price.toLocaleString("en-US")}
                </span>
              </div>
              <ShareButton title={product.name} />
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:gap-8">
            <section aria-labelledby="where-to-buy-heading" className="rounded-xl bg-[linear-gradient(111.5deg,#e6e9ff_0%,#e7e8f3_99%)] p-3">
              <h2 id="where-to-buy-heading" className="pl-1 text-sm leading-5 font-semibold text-secondary-500 md:text-base lg:text-lg lg:leading-7">
                Where to Buy?
              </h2>
              <ul className="mt-2 flex items-center gap-5 overflow-x-auto rounded-lg bg-white px-4 py-5 [scrollbar-width:none] lg:py-6 [&::-webkit-scrollbar]:hidden">
                {marketplaces.map((store) => (
                  <li key={store.name} className="shrink-0">
                    <a
                      href={store.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Buy on ${store.name} (opens in a new tab)`}
                      className="block rounded-sm transition-[opacity,translate] duration-200 hover:-translate-y-0.5 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500"
                    >
                      <Image src={store.logo} alt="" width={store.width} height={28} className="h-6 w-auto lg:h-7" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <HowToUseVideos videos={howToVideos} />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-[920px] md:mt-7 lg:mt-24">
        <ProductAccordion
          defaultOpen={2}
          items={[
            { title: "Ingredients", points: details.ingredients },
            { title: "Benefits", points: details.benefits },
            { title: "How to use", points: details.howToUse },
          ]}
        />
      </div>

      <section aria-labelledby="related-heading" className="mx-auto mt-12 max-w-[1872px] md:mt-12 lg:mt-30">
        <h2
          id="related-heading"
          className="font-display text-lg leading-7 font-semibold text-neutral-900 md:text-[40px] md:leading-12 md:font-bold lg:text-center lg:text-7xl lg:leading-[88px]"
        >
          Related Products
        </h2>
        <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-6 md:mt-3 md:grid-cols-3 lg:mt-8 lg:grid-cols-4 lg:gap-8">
          {related.map((item, index) => (
            // The tablet design shows a single row of three.
            <li key={item.slug} className={index === 3 ? "md:hidden lg:block" : undefined}>
              <ProductCard product={item} headingLevel="h3" />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
