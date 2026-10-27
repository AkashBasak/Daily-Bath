import { FeaturedCollection } from "@/components/home/featured-collection";
import { HomeHero } from "@/components/home/home-hero";

export default function HomePage() {
  return (
    <main id="main-content">
      <HomeHero />
      <FeaturedCollection />
    </main>
  );
}
