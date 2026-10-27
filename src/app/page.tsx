import { AboutSection } from "@/components/home/about-section";
import { CategoriesSection } from "@/components/home/categories-section";
import { FeaturedCollection } from "@/components/home/featured-collection";
import { HomeHero } from "@/components/home/home-hero";
import { WhyChooseUs } from "@/components/home/why-choose-us";

export default function HomePage() {
  return (
    <main id="main-content" className="pb-18 md:pb-22 lg:pb-44">
      <HomeHero />
      <FeaturedCollection />
      <AboutSection />
      <CategoriesSection />
      <WhyChooseUs />
    </main>
  );
}
