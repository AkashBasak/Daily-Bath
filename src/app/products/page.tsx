import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductsBrowser } from "@/components/products/products-browser";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse Daily Bath body care by category, skin type and ingredient.",
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

async function CategoryAwareBrowser({ searchParams }: { searchParams: SearchParams }) {
  const { category } = await searchParams;
  const slug = typeof category === "string" ? category : null;
  return <ProductsBrowser key={slug ?? "all"} initialCategory={slug} />;
}

export default function ProductsPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <main id="main-content" className="pb-16 md:pb-13 lg:pb-40">
      {/* The static shell shows every product; the requested category streams in. */}
      <Suspense fallback={<ProductsBrowser initialCategory={null} />}>
        <CategoryAwareBrowser searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
