import type { StaticImageData } from "next/image";
import softMoisture from "@/assets/images/brand-story/reel-1.png";
import footCare from "@/assets/images/categories/foot-care.webp";
import allDayFreshness from "@/assets/images/categories/all-day-freshness.png";
import freshCleanse from "@/assets/images/categories/fresh-cleanse.png";
import handCare from "@/assets/images/categories/hand-care.webp";
import smoothAndPolish from "@/assets/images/categories/smooth-and-polish.png";

export type Category = {
  slug: string;
  name: string;
  image: StaticImageData;
  imageAlt: string;
  // Closest Products-page category; undefined opens all products.
  productCategory?: string;
};

export const homeCategories: Category[] = [
  { slug: "fresh-cleanse", name: "Fresh Cleanse", image: freshCleanse, imageAlt: "Smiling woman massaging cleansing foam into her cheeks", productCategory: "shower-gel" },
  { slug: "soft-moisture", name: "Soft Moisture", image: softMoisture, imageAlt: "Woman holding a jar of moisturising cream" },
  { slug: "smooth-and-polish", name: "Smooth & Polish", image: smoothAndPolish, imageAlt: "Body scrub being massaged over a shoulder", productCategory: "body-scrub" },
  { slug: "all-day-freshness", name: "All Day Freshness", image: allDayFreshness, imageAlt: "Woman in a towel turban relaxing among lavender", productCategory: "body-mist" },
  { slug: "hand-care", name: "Hand Care", image: handCare, imageAlt: "Applying cream to the back of a hand", productCategory: "hand-care" },
  { slug: "foot-care", name: "Foot Care", image: footCare, imageAlt: "Applying cream to the heel of a foot", productCategory: "foot-care" },
];
