import type { StaticImageData } from "next/image";
import aminoAcidCleanser from "@/assets/images/products/amino-acid-cleanser.png";
import cryBodyWash from "@/assets/images/products/cry-body-wash.webp";
import lagoonaBodyLotion from "@/assets/images/products/lagoona-body-lotion.png";

export type FeaturedProduct = {
  slug: string;
  name: string;
  rating: number;
  image: StaticImageData;
  imageAlt: string;
};

// TODO(owner): placeholder catalogue. Names and ratings come from the Figma
// mock-up and the images are reference shots; replace with real Daily Bath
// products (later served from Supabase) before launch.
export const featuredProducts: FeaturedProduct[] = [
  {
    slug: "silk-moisture-body-lotion",
    name: "Silk Moisture Body Lotion",
    rating: 5,
    image: lagoonaBodyLotion,
    imageAlt: "Teal pump bottle of revitalizing body lotion",
  },
  {
    slug: "daily-bath-body-wash",
    name: "Daily Bath Body Wash",
    rating: 5,
    image: cryBodyWash,
    imageAlt: "Pink body wash bottle beside its box",
  },
  {
    slug: "aqua-fresh-cleanser",
    name: "Aqua Fresh Cleanser",
    rating: 5,
    image: aminoAcidCleanser,
    imageAlt: "Blue and white pump bottle of amino acid cleanser",
  },
];

// The product shown in focus on first load, matching the design.
export const initialFeaturedIndex = 1;
