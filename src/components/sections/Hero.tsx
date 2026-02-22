import { useRef, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { BRAND_CONFIG } from "@/config/brand";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const GLOW_COLORS = ["#f9258b", "#0b00ff", "#FFFFFF"];

const HeroCard = ({ index }: { index: number }) => {
  const [glowColor, setGlowColor] = useState("");

  const handleMouseEnter = () => {
    const randomColor = GLOW_COLORS[Math.floor(Math.random() * GLOW_COLORS.length)];
    setGlowColor(randomColor);
  };

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setGlowColor("")}
      style={{
        boxShadow: glowColor ? `0 0 40px ${glowColor}66` : "none",
        border: glowColor ? `1px solid ${glowColor}88` : "1px solid rgba(255,255,255,0.1)",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className="w-[232px] h-[303px] shrink-0 bg-white rounded-[40px] shadow-xl relative overflow-hidden group select-none pointer-events-auto"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 transition-opacity group-hover:opacity-0" />
      <div className="absolute inset-0 flex items-center justify-center text-black/5 font-display text-6xl tracking-tighter select-none">
        {String(index + 1).padStart(2, '0')}
      </div>
    </motion.div>
  );
};

export default function Hero() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const baseCards = Array.from({ length: 6 });
  const allCards = [...baseCards, ...baseCards, ...baseCards, ...baseCards, ...baseCards, ...baseCards, ...baseCards];

  useEffect(() => {
    if (scrollRef.current) {
      const scrollWidth = scrollRef.current.scrollWidth;
      const clientWidth = scrollRef.current.clientWidth;
      scrollRef.current.scrollLeft = (scrollWidth - clientWidth) / 2;
    }
  }, []);

  return (
    <section className="relative min-h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden pt-40 pb-20">
      <Helmet>
        <title>{BRAND_CONFIG.seo.title}</title>
        <meta name="description" content={BRAND_CONFIG.seo.description} />
      </Helmet>

      {/* Hero Headline */}
      <div className="relative z-20 w-full max-w-7xl mx-auto text-left mb-24 px-6 sm:px-12 pointer-events-none">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-display text-[68px] leading-[1.0] text-white tracking-tighter normal-case"
        >
          <span className="italic block">architects</span>
          <span className="block">
            of the <span className="italic">future.</span>
          </span>
        </motion.h1>
      </div>

      {/* Native Horizontal Scroll - Truly Edge to Edge & Containerless */}
      <div
        ref={scrollRef}
        className="w-full relative overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing py-20 z-10"
      >
        <div className="flex gap-6 items-start px-[50vw] min-w-max">
          {allCards.map((_, i) => (
            <ScrollArchedCard key={i} index={i % baseCards.length} />
          ))}
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="mt-4 relative z-20 flex flex-col items-center gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="-mt-16"
        >
          <Button
            asChild
            className="btn-cyber-blue bg-grainy-blue h-auto px-10 py-5 text-xl rounded-full"
          >
            <NavLink to="/contact">Get Invite.</NavLink>
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-white/40 text-sm font-medium"
        >
          Only few spots are left
        </motion.p>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-brand-blue/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-brand-pink/5 blur-[120px] rounded-full pointer-events-none" />

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}

function ScrollArchedCard({ index }: { index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [yOffset, setYOffset] = useState(110);

  useEffect(() => {
    let animId: number;

    const updatePosition = () => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const centerX = window.innerWidth / 2;
      const cardCenter = rect.left + rect.width / 2;

      const distanceFromCenter = Math.abs(centerX - cardCenter);
      const maxDistance = window.innerWidth * 0.6;
      const normalizedDist = Math.min(distanceFromCenter / maxDistance, 1);

      // Arc logic: 0 at center, max 120 at edges
      const newY = Math.pow(normalizedDist, 1.5) * 120;
      setYOffset(newY);

      animId = window.requestAnimationFrame(updatePosition);
    };

    animId = window.requestAnimationFrame(updatePosition);
    return () => window.cancelAnimationFrame(animId);
  }, []);

  return (
    <div
      ref={cardRef}
      style={{ transform: `translateY(${yOffset}px)` }}
      className="transition-transform duration-100 ease-out will-change-transform"
    >
      <HeroCard index={index} />
    </div>
  );
}
