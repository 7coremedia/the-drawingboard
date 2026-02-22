import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import RedesignFooter from "@/components/redesign/RedesignFooter";
import Cta from "@/components/sections/Cta";

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="bg-black min-h-screen text-white overflow-hidden selection:bg-[#0b00ff] selection:text-white pb-20">
      <Header />

      <main ref={containerRef} className="relative">

        {/* 1. CINEMATIC HERO SECTION */}
        <section className="relative h-[90vh] md:h-screen w-full flex items-center justify-center overflow-hidden">
          {/* Background Layer */}
          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="absolute inset-0 z-0"
          >
            {/* Dark gradient overlay for depth */}
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/40 to-black" />

            {/* Subtle glow orb in the background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-[#0b00ff]/20 rounded-full blur-[120px] pointer-events-none" />

            {/* Optional: We can drop an actual video here later, using an abstract dark placeholder for now */}
            <div className="w-full h-full bg-[#0a0a0a]" />
          </motion.div>

          {/* Hero Content */}
          <div className="relative z-20 container mx-auto px-4 md:px-6 flex flex-col items-center text-center mt-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter max-w-5xl leading-[1.1] text-white mix-blend-difference">
                A Boutique <br />
                <em className="font-serif italic font-light text-white/90">Branding Studio.</em>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-6 md:mt-8 text-white/60 text-lg md:text-xl max-w-2xl font-light"
            >
              We don't build websites for everyone. We forge high-retention,
              strategic brand identities for the boldest visionaries.
            </motion.p>
          </div>
        </section>

        {/* 2. THE PHILOSOPHY / APPROACH */}
        <section className="relative py-24 md:py-32 z-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto space-y-16">

              <div className="text-center space-y-4">
                <h2 className="text-sm md:text-base font-bold tracking-widest uppercase text-[#0b00ff]">Our Philosophy</h2>
                <p className="font-display text-3xl md:text-5xl font-semibold leading-tight">
                  High-Touch Strategy, <br className="hidden md:block" />
                  Not High-Volume Assembly.
                </p>
              </div>

              {/* Glassmorphism Exclusivity Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12"
              >
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold">The Boutique Model</h3>
                    <p className="text-white/70 leading-relaxed font-light">
                      We believe in deep trust and long-term partnerships.
                      By strictly limiting our roster to 3-5 high-quality brands per month,
                      we guarantee that every project receives the undivided attention of our Creative Director.
                    </p>
                    <p className="text-white/70 leading-relaxed font-light">
                      This isn't just about beautiful design; it's about positioning your business
                      for actual ROI, reputation building, and market leverage.
                    </p>
                  </div>

                  <div className="flex flex-col justify-center space-y-6 md:pl-8 md:border-l border-white/10">
                    <div className="space-y-2">
                      <h4 className="text-4xl font-display font-bold text-[#0b00ff]">95%</h4>
                      <p className="text-white/60 text-sm tracking-wider uppercase">Client Retention Rate</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-4xl font-display font-bold">3-5</h4>
                      <p className="text-white/60 text-sm tracking-wider uppercase">Brands Onboarded Monthly</p>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* 3. THE TEAM / CREATIVE DIRECTION */}
        <section className="relative py-24 bg-[#050505] z-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">

              {/* Portrait */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full aspect-[3/4] bg-zinc-900 rounded-2xl border border-white/5 overflow-hidden relative group"
              >
                <img
                  src="/kingedmund.jpg"
                  alt="King Edmund - Creative Director"
                  className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-x-0 bottom-0 p-8 pt-32 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent">
                  <p className="text-xs tracking-widest uppercase text-[#0b00ff] font-bold mb-1">Creative Director</p>
                  <h3 className="text-2xl font-bold">King Edmund</h3>
                </div>
              </motion.div>

              <div className="space-y-8">
                <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
                  Design lead with a <br /> Mind for Strategy.
                </h2>
                <div className="space-y-4 text-white/70 font-light leading-relaxed">
                  <p>
                    With years of experience navigating the digital landscape,
                    my approach strips away the bloated agency model. When you work with T-DB Studio,
                    you have direct access to the creative decision-maker.
                  </p>
                  <p>
                    We operate lean: a dedicated Creative Director, an in-house expert, and strategic administration.
                    No account managers playing telephone. No juniors learning on your dime.
                  </p>
                </div>

                <div className="pt-4">
                  <Button variant="premium" className="rounded-full px-8 py-6 text-sm bg-white text-black hover:bg-neutral-200 border-0">
                    Join the Waitlist
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* Footer CTA block */}
      <div className="relative z-20 bg-black pt-20">
        <Cta background="transparent" />
        <RedesignFooter />
      </div>
    </div>
  );
};

export default About;