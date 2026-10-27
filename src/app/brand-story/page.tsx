import type { Metadata } from "next";
import { BrandHero } from "@/components/brand-story/brand-hero";
import { IngredientsShowcase } from "@/components/brand-story/ingredients-showcase";
import { InstagramSection } from "@/components/brand-story/instagram-section";
import { PhilosophySection } from "@/components/brand-story/philosophy-section";

export const metadata: Metadata = {
  title: "Brand Story",
  description: "Why Daily Bath exists: our philosophy, the ingredients we choose and the everyday rituals we care about.",
};

export default function BrandStoryPage() {
  return (
    <main id="main-content" className="pb-15 md:pb-10 lg:pb-8">
      <BrandHero />
      <PhilosophySection />
      <IngredientsShowcase />
      <InstagramSection />
    </main>
  );
}
