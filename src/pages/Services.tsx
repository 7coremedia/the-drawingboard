import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import ServicesTabbed from "@/components/redesign/Services";
import Exclusive from "@/components/redesign/Exclusive";
import RedesignFooter from "@/components/redesign/RedesignFooter";
import { MoveRight, Star } from "lucide-react";
import CurrencySelector from "@/components/redesign/CurrencySelector";
import { useCurrency } from "@/context/CurrencyContext";

const servicesData = [
  {
    category: "Strategic Diagnostic",
    title: "Brand Audit",
    priceUsd: 250,
    frequency: "One-time session",
    desc: "A complete review of your brand across every touchpoint. Clear gaps, clear next steps — delivered in 48 hours.",
    tag: "Essential",
    badge: "Essential"
  },
  {
    category: "Identity System",
    title: "Brand Sprint",
    priceUsd: 800,
    frequency: "Starting cost",
    desc: "A sharp, professional brand identity — fast. Logo system, color palette, and the confidence to show up in any room.",
    tag: "Fast Track",
    badge: "Fast Track"
  },
  {
    category: "Core Architecture",
    title: "Brand Foundation",
    priceUsd: 2500,
    frequency: "Comprehensive",
    desc: "Our most popular engagement. Full brand strategy, visual identity, and voice system — everything you need to be taken seriously.",
    tag: "Popular",
    badge: "Most Popular",
    popular: true
  },
  {
    category: "Expansion & Growth",
    title: "Brand Elevation",
    priceUsd: 7000,
    frequency: "Full transformation",
    desc: "The full transformation. Strategy, identity, website, launch assets, and ongoing brand management — for brands ready to lead their category.",
    tag: "High Touch",
    badge: "Full Service"
  }
];

export default function Services() {
  const { formatPrice } = useCurrency();

  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#0D0D0D] selection:bg-[#C94A2C] selection:text-[#F5F0E8] pt-24 md:pt-40">
      <Helmet>
        <title>Services – ŌDEY | Strategic Brand Systems</title>
        <meta name="description" content="ŌDEY brand strategy, identity, and design services. Clear deliverables, transparent pricing — in Naira, Dollars, or Euros." />
        <link rel="canonical" href="/services" />
      </Helmet>

      <main className="container mx-auto px-6">
        {/* Header Section */}
        <div className="max-w-4xl mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#C94A2C]">Our Services</span>
            <h1 className="font-display text-5xl md:text-8xl font-black tracking-tighter leading-[0.95] mb-8">
              Everything your <br /> brand needs to win.
            </h1>
            <p className="text-[#0D0D0D]/60 text-lg md:text-2xl font-medium max-w-2xl leading-relaxed">
              Clear deliverables. Transparent pricing. From brand audit to full identity — choose where you start.
            </p>
          </motion.div>
        </div>

        {/* Currency Selector */}
        <div className="flex justify-end mb-8">
          <CurrencySelector />
        </div>

        {/* Horizontal Scroll Grid / Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 pb-32">
          {servicesData.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col h-full"
            >
              <div 
                className={cn(
                  "relative aspect-[4/5] rounded-[3rem] overflow-hidden mb-6 transition-all duration-700 group-hover:scale-[1.01] shadow-xl",
                  service.popular ? "bg-[#3D2C1F]/5" : "bg-white/50"
                )}
              >
                {/* Authority Badge */}
                <div className="absolute top-8 right-8 z-20">
                  <div className="w-16 h-16 rounded-full border border-[#0D0D0D]/10 flex items-center justify-center p-2 text-center bg-white/40 backdrop-blur-md">
                    <span className="text-[7px] uppercase font-bold tracking-tight leading-tight text-[#0D0D0D]/60">
                      {service.badge}
                    </span>
                  </div>
                </div>

                {/* Status Tag */}
                <div className="absolute top-8 left-8 z-20">
                    <span className="text-[9px] uppercase font-bold tracking-[0.2em] bg-white text-black px-4 py-1.5 rounded-full shadow-sm">
                        {service.tag}
                    </span>
                </div>

                {/* Image Component */}
                <div className="absolute inset-0 flex items-center justify-center p-12">
                   <div className="w-full h-full relative transition-transform duration-700 group-hover:scale-105">
                     <img 
                        src="/placeholder.svg" 
                        alt={service.title}
                        className="w-full h-full object-contain opacity-80"
                     />
                   </div>
                </div>

                {/* Bottom Card Copy */}
                <div className="absolute bottom-10 left-10 right-10 z-20">
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <h3 className="text-3xl font-display font-bold tracking-tighter">{service.title}</h3>
                            <p className="text-sm font-medium text-[#0D0D0D]/50">{service.frequency}</p>
                        </div>
                        <div className="pt-4 border-t border-[#0D0D0D]/5 flex items-end justify-between">
                            <div className="space-y-0.5">
                                <p className="text-[10px] uppercase font-bold tracking-widest text-[#0D0D0D]/40">Starting at</p>
                                <p className="text-lg font-bold">{formatPrice(service.priceUsd)}*</p>
                            </div>
                            <button className="w-10 h-10 rounded-full bg-[#0D0D0D] text-white flex items-center justify-center transition-transform hover:scale-110 active:scale-95 shadow-lg">
                                <MoveRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Popular Overlay */}
                {service.popular && (
                    <div className="absolute inset-0 border-4 border-[#C94A2C] rounded-[3rem] pointer-events-none z-30 opacity-40" />
                )}
              </div>
              
              {/* Card Detail / Description outside card for clinical feel */}
              <div className="px-8 flex-grow">
                 <p className="text-sm font-medium leading-relaxed text-[#0D0D0D]/60">
                    {service.desc}
                 </p>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <ServicesTabbed />
      <Exclusive />

      <RedesignFooter />
    </div>
  );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ');
}
