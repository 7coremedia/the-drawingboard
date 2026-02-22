import { Helmet } from "react-helmet-async";
import { BRAND_CONFIG } from "@/config/brand";
import CinematicHero from "@/components/redesign/CinematicHero";
import Hero from "@/components/redesign/Hero";
import Services from "@/components/redesign/Services";
import CinematicGallery from "@/components/redesign/CinematicGallery";
import Exclusive from "@/components/redesign/Exclusive";
import RedesignFooter from "@/components/redesign/RedesignFooter";
import AnnouncementBanner from "@/components/redesign/AnnouncementBanner";

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Helmet>
        <title>{BRAND_CONFIG.seo.title}</title>
        <meta name="description" content={BRAND_CONFIG.seo.description} />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg?v=3" />
      </Helmet>

      {/* Cinematic Scrolling Logo Hero */}
      <CinematicHero />

      {/* Bento Grid Cards Section */}
      <Hero />

      {/* Services / Offers Section */}
      <Services />

      {/* Work Showcase */}
      <CinematicGallery />

      {/* Exclusive / Waitlist Block */}
      <Exclusive />

      {/* Massive Footer Area */}
      <RedesignFooter />
    </div>
  );
};

export default Index;
