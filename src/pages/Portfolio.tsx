import * as React from "react";
import { Helmet } from "react-helmet-async";
import PortfolioGrid from "@/components/sections/PortfolioGrid";
import { motion } from "framer-motion";
import RedesignFooter from "@/components/redesign/RedesignFooter";
import { cn } from "@/lib/utils";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#0D0D0D] selection:bg-[#C94A2C] selection:text-[#F5F0E8] pt-24 md:pt-40">
      <Helmet>
        <title>Exhibition Archive – KŌDĒ | The Drawing Board</title>
        <meta name="description" content="KŌDĒ brand exhibition. A clinical archive of identity systems, strategic architecture, and creative growth. Lagos — London." />
        <link rel="canonical" href="/portfolio" />
      </Helmet>

      <main className="container mx-auto px-6 relative">
        {/* Clinical Header Section */}
        <div className="max-w-4xl mb-24 md:mb-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4">
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#C94A2C]">Exhibition Protocol</span>
              <div className="h-px w-12 bg-black/5" />
            </div>
            <motion.h1 
              className="font-display text-5xl md:text-8xl font-black tracking-tighter leading-[0.95]"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.2
                  }
                }
              }}
            >
              {[["Diagnostic", false], ["Exhibition", false], ["Archive.", true]].map(([word, isAccent], i) => (
                <React.Fragment key={i}>
                  <motion.span
                    className={cn("inline-block", isAccent ? "text-[#C94A2C]" : "")}
                    variants={{
                      hidden: { opacity: 0, y: 40, rotateX: 45 },
                      visible: { 
                        opacity: 1, 
                        y: 0, 
                        rotateX: 0,
                        transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
                      }
                    }}
                  >
                    {word as string}
                  </motion.span>
                  {i < 2 ? <br /> : null}
                </React.Fragment>
              ))}
            </motion.h1>
            <motion.p 
              className="text-[#0D0D0D]/60 text-lg md:text-2xl font-medium max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            >
              An evidence-based collection of brand systems, identity frameworks, and strategic architecture. Engineered for authority.
            </motion.p>
          </motion.div>
        </div>

        <PortfolioGrid />
      </main>
      
      <div className="mt-32">
        <RedesignFooter />
      </div>
    </div>
  );
}
