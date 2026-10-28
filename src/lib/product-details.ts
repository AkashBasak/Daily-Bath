import type { StaticImageData } from "next/image";
import reel1 from "@/assets/images/brand-story/reel-1.png";
import reel2 from "@/assets/images/brand-story/reel-2.png";
import reel3 from "@/assets/images/brand-story/reel-3.png";
import berrySerum from "@/assets/images/product-details/gallery-berry-serum.png";
import botanicalOil from "@/assets/images/product-details/gallery-botanical-oil.png";
import niacinamideSerum from "@/assets/images/product-details/gallery-niacinamide-serum.png";
import plumpingSerum from "@/assets/images/product-details/gallery-plumping-serum.png";
import shampooDuo from "@/assets/images/product-details/gallery-shampoo-duo.png";
import { getCategory, products, type Product } from "@/lib/products";

export type GalleryImage = { src: StaticImageData; alt: string; fit: "contain" | "cover" };

export type Marketplace = { name: string; logo: string; width: number; url: string };

// TODO(owner): replace with each product's own listing URL on every marketplace.
export const marketplaces: Marketplace[] = [
  { name: "Daraz", logo: "/marketplaces/daraz.png", width: 78, url: "https://www.daraz.com.bd/" },
  { name: "Arogga", logo: "/marketplaces/arogga.png", width: 56, url: "https://www.arogga.com/" },
  { name: "AKS Pharmacy", logo: "/marketplaces/aks-pharmacy.png", width: 78, url: "https://www.akspharmacy.com/" },
  { name: "Chardike", logo: "/marketplaces/chardike.png", width: 141, url: "https://www.chardike.com/" },
  { name: "Shajgoj", logo: "/marketplaces/shajgoj.png", width: 183, url: "https://shop.shajgoj.com/" },
  // TODO(owner): name and link for the sixth marketplace logo in the design.
  { name: "Marketplace partner", logo: "/marketplaces/sixth-store.png", width: 54, url: "https://www.chardike.com/" },
];

export type HowToVideo = { poster: StaticImageData; label: string; url?: string };

// TODO(owner): link each tutorial to its video or reel.
export const howToVideos: HowToVideo[] = [
  { poster: reel1, label: "How to apply a face cream" },
  { poster: reel2, label: "How to use a cleansing oil" },
  { poster: reel3, label: "Three-step regimen to promote skin longevity" },
  { poster: reel1, label: "Daily moisturising routine" },
];

const sharedGallery: GalleryImage[] = [
  { src: botanicalOil, alt: "Revitalising botanical oil bottle", fit: "cover" },
  { src: niacinamideSerum, alt: "Niacinamide serum on silk", fit: "cover" },
  { src: plumpingSerum, alt: "Plumping serum on moss", fit: "cover" },
  { src: shampooDuo, alt: "Two shampoo bottles among roses", fit: "cover" },
  { src: berrySerum, alt: "Serum bottle with berries", fit: "cover" },
];

export type ProductDetails = {
  product: Product;
  categoryName: string;
  description: string;
  price: number;
  reviewCount: number;
  gallery: GalleryImage[];
  ingredients: string[];
  benefits: string[];
  howToUse: string[];
};

// TODO(owner): every field below is placeholder copy from the Figma mock-up.
const placeholderDescription =
  "Daily Bath is currently at an early brand-development stage. The brand name has been established, while its product portfolio, brand positioning, visual direction, and communication strategy are still being explored.";

export function getProductDetails(slug: string): ProductDetails | undefined {
  const product = products.find((p) => p.slug === slug);
  if (!product) return undefined;

  const lead: GalleryImage = { src: product.image, alt: product.name, fit: product.imageFit };

  return {
    product,
    categoryName: getCategory(product.category)?.name ?? "Body Care",
    description: placeholderDescription,
    price: 812,
    reviewCount: 4794,
    gallery: [lead, ...sharedGallery],
    ingredients: product.ingredients.length ? product.ingredients : ["Aloe Vera"],
    benefits: [
      "Cleanses gently without stripping the skin's natural moisture",
      "Leaves skin soft, smooth and lightly scented",
      `Suited to ${product.skinTypes.join(", ").toLowerCase() || "all skin types"}`,
    ],
    howToUse: [
      "Light, absorbing leave-in formula moisturizes scalp to prevent dryness and itch† (†associated with dandruff)",
      "24-hour scalp protection* great for protective styles, twists and locs (when used as directed)",
      "Free of mineral oils, sulfates and dyes",
    ],
  };
}

// Same category first, then the most popular of the rest.
export function getRelatedProducts(product: Product, count = 4): Product[] {
  const others = products.filter((p) => p.slug !== product.slug);
  const same = others.filter((p) => p.category === product.category);
  const rest = others.filter((p) => p.category !== product.category).sort((a, b) => b.popularity - a.popularity);
  return [...same, ...rest].slice(0, count);
}
