import type { StaticImageData } from "next/image";
import footCare from "@/assets/images/categories/foot-care.webp";
import handCare from "@/assets/images/categories/hand-care.webp";
import arganHairOil from "@/assets/images/products/argan-hair-oil.png";
import betaGlucanBodyScrub from "@/assets/images/products/beta-glucan-body-scrub.png";
import centellaCleansingOil from "@/assets/images/products/centella-cleansing-oil.png";
import cicadinFoamCleanser from "@/assets/images/products/cicadin-foam-cleanser.png";
import dailySerumAmpoule from "@/assets/images/products/daily-serum-ampoule.png";
import footCareCream from "@/assets/images/products/foot-care-cream.png";
import propolisShowerGel from "@/assets/images/products/propolis-shower-gel.png";
import teaTreeBathingBar from "@/assets/images/products/tea-tree-bathing-bar.png";
import vitaCToningCream from "@/assets/images/products/vita-c-toning-cream.png";

export type ProductCategory = {
  slug: string;
  name: string;
  // TODO(owner): categories without a photo render a neutral placeholder.
  image: StaticImageData | null;
};

// The category strip and the "Product Type" filter share this list, so picking a
// category always maps to exactly one filter option.
export const productCategories: ProductCategory[] = [
  { slug: "shower-gel", name: "Shower Gel", image: propolisShowerGel },
  { slug: "hair-oil", name: "Hair Oil", image: arganHairOil },
  { slug: "bathing-bar", name: "Bathing Bar", image: teaTreeBathingBar },
  { slug: "body-scrub", name: "Body Scrub", image: betaGlucanBodyScrub },
  { slug: "body-mist", name: "Body Mist", image: null },
  { slug: "hand-care", name: "Hand Care", image: handCare },
  { slug: "cleansing-oil", name: "Cleansing Oil", image: centellaCleansingOil },
  { slug: "foot-care", name: "Foot Care", image: footCare },
];

export const skinTypes = [
  "Dry Skin",
  "Oily Skin",
  "Combination Skin",
  "Sensitive Skin",
  "Acne-Prone Skin",
  "Dehydrated Skin",
] as const;

export const ingredients = [
  "Niacinamide",
  "Hyaluronic Acid",
  "Vitamin C",
  "Salicylic Acid",
  "Centella Asiatica",
  "Tea Tree",
  "Aloe Vera",
] as const;

export type Product = {
  slug: string;
  name: string;
  category: string;
  skinTypes: string[];
  ingredients: string[];
  rating: number;
  image: StaticImageData | null;
  // Cut-out packshots sit inset on the tinted tile; lifestyle photos fill it.
  imageFit: "contain" | "cover";
  addedAt: string;
  popularity: number;
};

// TODO(owner): placeholder catalogue built from the Figma mock-up and the supplied
// photos. Replace with real products (later served from Supabase).
export const products: Product[] = [
  { slug: "pure-morning-shower-gel", name: "Pure Morning Shower Gel", category: "shower-gel", skinTypes: ["Dry Skin", "Sensitive Skin"], ingredients: ["Hyaluronic Acid", "Aloe Vera"], rating: 5, image: dailySerumAmpoule, imageFit: "contain", addedAt: "2026-09-02", popularity: 92 },
  { slug: "acorn-pore-peptide-pad", name: "Acorn Pore Peptide Pad", category: "body-scrub", skinTypes: ["Oily Skin", "Acne-Prone Skin"], ingredients: ["Salicylic Acid", "Niacinamide"], rating: 5, image: vitaCToningCream, imageFit: "contain", addedAt: "2026-08-14", popularity: 74 },
  { slug: "pure-morning-body-mist", name: "Pure Morning Body Mist", category: "body-mist", skinTypes: ["Combination Skin"], ingredients: ["Aloe Vera"], rating: 5, image: null, imageFit: "contain", addedAt: "2026-10-01", popularity: 61 },
  { slug: "soft-bloom-body-wash", name: "Soft Bloom Body Wash", category: "shower-gel", skinTypes: ["Dry Skin", "Dehydrated Skin"], ingredients: ["Hyaluronic Acid"], rating: 5, image: null, imageFit: "contain", addedAt: "2026-07-20", popularity: 55 },
  { slug: "aqua-fresh-body-wash", name: "Aqua Fresh Body Wash", category: "shower-gel", skinTypes: ["Oily Skin", "Combination Skin"], ingredients: ["Tea Tree", "Centella Asiatica"], rating: 5, image: cicadinFoamCleanser, imageFit: "contain", addedAt: "2026-06-11", popularity: 48 },
  { slug: "silk-moisture-body-cream", name: "Silk Moisture Body Cream", category: "hand-care", skinTypes: ["Dry Skin", "Sensitive Skin"], ingredients: ["Niacinamide", "Hyaluronic Acid"], rating: 5, image: null, imageFit: "contain", addedAt: "2026-09-25", popularity: 83 },
  { slug: "centella-green-fresh-cleansing-oil", name: "Centella Green Fresh Cleansing Oil", category: "cleansing-oil", skinTypes: ["Oily Skin", "Sensitive Skin"], ingredients: ["Centella Asiatica"], rating: 5, image: centellaCleansingOil, imageFit: "cover", addedAt: "2026-05-30", popularity: 39 },
  { slug: "propolis-vitamin-shower-gel", name: "Propolis Vitamin Shower Gel", category: "shower-gel", skinTypes: ["Dry Skin", "Combination Skin"], ingredients: ["Vitamin C"], rating: 5, image: propolisShowerGel, imageFit: "cover", addedAt: "2026-10-12", popularity: 88 },
  { slug: "argan-nourishing-hair-oil", name: "Argan Nourishing Hair Oil", category: "hair-oil", skinTypes: ["Dry Skin"], ingredients: ["Aloe Vera"], rating: 5, image: arganHairOil, imageFit: "cover", addedAt: "2026-10-05", popularity: 79 },
  { slug: "beta-glucan-renewing-body-scrub", name: "Beta Glucan Renewing Body Scrub", category: "body-scrub", skinTypes: ["Dry Skin", "Combination Skin"], ingredients: ["Hyaluronic Acid"], rating: 5, image: betaGlucanBodyScrub, imageFit: "cover", addedAt: "2026-10-20", popularity: 66 },
  { slug: "foot-care-cream", name: "Moisturizing Foot Care Cream", category: "foot-care", skinTypes: ["Dry Skin"], ingredients: ["Aloe Vera"], rating: 5, image: footCareCream, imageFit: "cover", addedAt: "2026-10-18", popularity: 58 },
  { slug: "tea-tree-relief-bathing-bar", name: "Tea Tree Relief Bathing Bar", category: "bathing-bar", skinTypes: ["Oily Skin", "Acne-Prone Skin"], ingredients: ["Tea Tree"], rating: 5, image: teaTreeBathingBar, imageFit: "cover", addedAt: "2026-09-18", popularity: 70 },
];

export type SortOption = "default" | "latest" | "popularity";

export const sortOptions: { value: SortOption; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "latest", label: "Latest First" },
  { value: "popularity", label: "Popularity" },
];

export type ProductFilters = {
  categories: string[];
  skinTypes: string[];
  ingredients: string[];
};

export const emptyFilters: ProductFilters = { categories: [], skinTypes: [], ingredients: [] };

// Options within a group widen the result (OR); groups narrow it (AND).
export function matchesFilters(product: Product, filters: ProductFilters): boolean {
  if (filters.categories.length && !filters.categories.includes(product.category)) return false;
  if (filters.skinTypes.length && !filters.skinTypes.some((s) => product.skinTypes.includes(s))) return false;
  if (filters.ingredients.length && !filters.ingredients.some((i) => product.ingredients.includes(i))) return false;
  return true;
}

export function filterAndSort(list: Product[], filters: ProductFilters, sort: SortOption): Product[] {
  const result = list.filter((product) => matchesFilters(product, filters));
  if (sort === "latest") result.sort((a, b) => b.addedAt.localeCompare(a.addedAt));
  if (sort === "popularity") result.sort((a, b) => b.popularity - a.popularity);
  return result;
}

export function getCategory(slug: string | null | undefined): ProductCategory | undefined {
  return productCategories.find((category) => category.slug === slug);
}
