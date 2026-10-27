import type { StaticImageData } from "next/image";
import footCare from "@/assets/images/categories/foot-care.webp";
import handCare from "@/assets/images/categories/hand-care.webp";

export type Category = {
  slug: string;
  name: string;
  // TODO(owner): images still to be supplied render as a neutral placeholder.
  image: StaticImageData | null;
  imageAlt: string;
  // Closest Products-page category; undefined opens all products.
  productCategory?: string;
};

export const homeCategories: Category[] = [
  { slug: "fresh-cleanse", name: "Fresh Cleanse", image: null, imageAlt: "", productCategory: "shower-gel" },
  { slug: "soft-moisture", name: "Soft Moisture", image: null, imageAlt: "" },
  { slug: "smooth-and-polish", name: "Smooth & Polish", image: null, imageAlt: "", productCategory: "body-scrub" },
  { slug: "all-day-freshness", name: "All Day Freshness", image: null, imageAlt: "", productCategory: "body-mist" },
  { slug: "hand-care", name: "Hand Care", image: handCare, imageAlt: "Applying cream to the back of a hand", productCategory: "hand-care" },
  { slug: "foot-care", name: "Foot Care", image: footCare, imageAlt: "Applying cream to the heel of a foot", productCategory: "foot-care" },
];
