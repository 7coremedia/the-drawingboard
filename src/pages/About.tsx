import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import RedesignFooter from "@/components/redesign/RedesignFooter";
import Cta from "@/components/sections/Cta";
import Testimonials from "@/components/redesign/Testimonials";
import { ArrowUpRight, ShieldCheck, UserCheck } from "lucide-react";

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="bg-[#F5F0E8] min-h-screen text-[#0D0D0D] selection:bg-[#C94A2C] selection:text-[#F5F0E8] pt-24 md:pt-40">
      <main ref={containerRef} className="relative">

        {/* 1. CLINICAL HERO SECTION */}
        <section className="relative px-6 container mx-auto">
          <div className="max-w-5xl mb-24 md:mb-40">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#C94A2C]">KŌDĒ Genesis</span>
                <div className="h-px w-12 bg-black/5" />
              </div>
              <h1 className="font-display text-5xl md:text-8xl font-black tracking-tighter leading-[0.95]">
                Great Brands <br /> Engineered for <br /> <span className="text-[#C94A2C]">Authority.</span>
              </h1>
              <p className="max-w-2xl text-lg md:text-2xl font-medium text-[#0D0D0D]/50 leading-relaxed">
                We started KŌDĒ because the most influential brands shouldn’t only belong to the largest budgets. We built a system to change that.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 2. ARCHITECTURAL STORY SECTION */}
        <section className="relative pb-32 md:pb-56 z-20 px-2 md:px-6 overflow-hidden">
             {/* Decorative Background element */}
             <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[1200px] h-[1200px] border border-black/[0.03] rounded-full pointer-events-none -z-10 -translate-x-1/2" />
             
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white rounded-[3.5rem] px-5 py-12 md:p-24 shadow-[0_60px_100px_-20px_rgba(0,0,0,0.06)] border border-black/[0.03] relative"
              >
                {/* Protocol Tag */}
                <div className="absolute top-12 right-12 hidden md:block">
                    <div className="w-16 h-16 rounded-full border border-black/5 flex items-center justify-center p-2 text-center">
                        <span className="text-[7px] uppercase font-bold tracking-tight leading-tight text-[#0D0D0D]/40">
                             Strategic <br /> Standard
                        </span>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
                     <div className="lg:col-span-12 space-y-12">
                        <div className="space-y-8">
                             <h2 className="text-3xl md:text-5xl font-display font-black tracking-tighter leading-tight">Born in Pressure. <br /> Designed for Scale.</h2>
                             <div className="h-1 w-20 bg-[#C94A2C]" />
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-12 text-[#0D0D0D]/60 text-lg md:text-xl font-medium leading-[1.6]">
                             <div className="space-y-8">
                                <p>
                                    KŌDĒ was born in Lagos — one of the world’s most competitive, culturally rich business environments. We’ve built brands for startups and personal brands winning international rooms across fashion, fintech, music, and corporate.
                                </p>
                                <p>
                                    The brands that travel — across industries, borders, and rooms — are built on one thing: clarity. Clarity about who you are and what you stand for that nobody else can claim.
                                </p>
                             </div>
                             <div className="space-y-8">
                                <p>
                                    That’s what we build. Not just logos. Not just color palettes. Systems. We are the architects of the brands that will define the next decade of commerce, culture, and taste.
                                </p>
                                <div className="pt-8 flex flex-col gap-6">
                                     <p className="text-2xl md:text-3xl font-display font-black text-[#0D0D0D] tracking-tight leading-tight">If you’re building something serious — we should talk.</p>
                                     <a href="/onboarding" className="group w-fit flex items-center gap-4 bg-[#0D0D0D] text-white px-10 py-5 rounded-full font-display font-bold text-[10px] tracking-[0.3em] uppercase transition-all hover:scale-105 active:scale-95 shadow-xl">
                                         Start Application
                                         <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                     </a>
                                </div>
                             </div>
                        </div>
                     </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 3. LEADERSHIP BIOMETRICS SECTION */}
        <section className="relative pb-32 md:pb-64 z-20 px-6">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-20 items-center">

              {/* Portrait Visual Wrapper */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5 relative"
              >
                <div className="aspect-[3/4] rounded-[3.5rem] bg-white border border-black/[0.03] overflow-hidden shadow-2xl relative">
                  <img
                    src="/placeholder.svg"
                    alt="Creative Direction Leadership"
                    className="w-full h-full object-contain p-12 transition-all duration-1000 grayscale hover:grayscale-0"
                  />
                  
                  {/* Digital Signature / Badge */}
                  <div className="absolute inset-x-8 bottom-8 p-6 bg-[#F5F0E8]/90 backdrop-blur-xl rounded-[2.5rem] border border-black/5 shadow-md">
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <UserCheck size={12} className="text-[#C94A2C]" />
                                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#C94A2C]">Operational Lead</span>
                            </div>
                            <p className="text-[#0D0D0D] font-display text-xl font-black tracking-tight">King Edmund</p>
                            <p className="text-[9px] uppercase font-bold text-[#0D0D0D]/30 tracking-widest mt-1">Founding Creative Director</p>
                        </div>
                    </div>
                  </div>
                </div>
                
                 {/* Decorative element */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-[#C94A2C]/10 rounded-[4rem] -z-10 scale-105 -rotate-3" />
              </motion.div>

              {/* Leadership Copy */}
              <div className="lg:col-span-7 space-y-12">
                <div className="space-y-6">
                     <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#C94A2C]">Our Methodology</span>
                     <h2 className="font-display text-4xl md:text-6xl font-black leading-[0.95] tracking-tighter">
                        Direct Access. <br /> Lean Strategy. <br /> High Fidelity.
                     </h2>
                </div>
                
                <div className="space-y-8 text-[#0D0D0D]/60 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                  <p>
                    When you work with KŌDĒ, you have direct access to the creative decision-maker. No account managers playing telephone. No juniors learning on your dime.
                  </p>
                  <p>
                    We operate lean: a dedicated Creative Director, an in-house expert, and strategic administration. We strip away the bloated agency model to focus purely on the architecture of your brand.
                  </p>
                </div>

                <div className="pt-6">
                   <a href="#contact" className="w-fit flex items-center gap-4 bg-[#F5F0E8] text-[#0D0D0D] px-10 py-5 rounded-full font-display font-medium text-[10px] tracking-[0.3em] uppercase transition-all hover:bg-white active:scale-95 border border-black/5 shadow-sm">
                        Join the Partnership
                   </a>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* Footer / Exit Block */}
      <div className="relative z-20">
        <Testimonials />
        <Cta background="transparent" />
        <RedesignFooter />
      </div>
    </div >
  );
};

export default About;