import { Helmet } from "react-helmet-async";
import { BRAND_CONFIG } from "@/config/brand";
import CinematicHero from "@/components/redesign/CinematicHero";
import Hero from "@/components/redesign/Hero";
import CinematicGallery from "@/components/redesign/CinematicGallery";
import RedesignFooter from "@/components/redesign/RedesignFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#0D0D0D]">
      <Helmet>
        <title>{BRAND_CONFIG.seo.title}</title>
        <meta name="description" content={BRAND_CONFIG.seo.description} />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg?v=3" />
      </Helmet>

      {/* Cinematic Scrolling Logo Hero (now transformed to Hims-style grid) */}
      <CinematicHero />

      {/* We don't do pretty. We do decisive. + Service List */}
      <Hero />

      {/* Footer */}
      <RedesignFooter />
    </div>
  );
};

export default Index;
