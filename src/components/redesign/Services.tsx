import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const services = {
    management: {
        title: "Strategic Management",
        subtitle: "Strategy & Direction",
        description: "For brands that need the thinking before the making. We handle the strategy, positioning, and growth plan — so every creative decision has purpose behind it.",
        items: [
            "Brand Strategy & Research — Audience mapping, competitive positioning, brand architecture",
            "Growth & Expansion Branding — Brand systems built for the next stage",
            "Market Positioning — Define what you own in your category",
            "Investor-Ready Brand — Visual and verbal identity for funding",
            "UI/UX & Digital Design — Experiences that convert",
            "Personal Brand System — For executives and founders"
        ],
        image: "/placeholder.svg"
    },
    studio: {
        title: "KŌDĒ Studio",
        subtitle: "Design & Execution",
        description: "Where strategy becomes visible. World-class visual identity, digital design, and brand assets — built to make people stop scrolling and start paying attention.",
        items: [
            "Visual Identity Systems",
            "Creative Direction",
            "Digital Experience Design",
            "Packaging & Print",
            "Motion & Interaction",
            "Campaign Visuals"
        ],
        image: "/placeholder.svg"
    }
};

export default function Services() {
    const [activeTab, setActiveTab] = useState<'management' | 'studio'>('management');

    return (
        <section className="relative py-24 md:py-48 bg-[#F5F0E8] overflow-hidden min-h-screen flex flex-col items-center border-t border-black/5">
            <div className="container px-6 relative z-10 flex flex-col items-center h-full">

                {/* Section Intro */}
                <div className="max-w-2xl mx-auto text-center mb-16 md:mb-24 space-y-6">
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#C94A2C]">How We Work</span>
                    <h2 className="text-4xl md:text-6xl font-display font-medium tracking-tighter leading-[0.95]">Two ways to work with us</h2>
                    <p className="text-[#0D0D0D]/60 text-base md:text-lg leading-relaxed font-medium">
                        We don't take briefs and disappear. Every engagement starts with understanding where you are, where you need to be, and what's standing in the way.
                    </p>
                </div>

                {/* 1. Blurred Tab Navigation */}
                <div className="flex items-center justify-center gap-6 md:gap-24 mb-16 md:mb-32 relative w-full px-2">
                    {/* Tab 1: Management */}
                    <button
                        onClick={() => setActiveTab('management')}
                        className={`relative text-2xl md:text-7xl font-display font-black tracking-tighter transition-all duration-700 whitespace-nowrap ${activeTab === 'management'
                            ? 'text-[#0D0D0D] blur-none scale-100 md:scale-105'
                            : 'text-[#0D0D0D]/10 blur-[2px] md:blur-[4px] hover:blur-none hover:text-[#0D0D0D]/40'
                            }`}
                    >
                        Management
                        {activeTab === 'management' && (
                            <motion.div
                                layoutId="activeTabUnderline"
                                className="absolute -bottom-4 md:-bottom-8 left-0 right-0 h-1 md:h-1.5 bg-[#C94A2C]"
                            />
                        )}
                    </button>

                    {/* Tab 2: Studio */}
                    <button
                        onClick={() => setActiveTab('studio')}
                        className={`relative text-2xl md:text-7xl font-display font-black tracking-tighter transition-all duration-700 whitespace-nowrap ${activeTab === 'studio'
                            ? 'text-[#0D0D0D] blur-none scale-100 md:scale-105'
                            : 'text-[#0D0D0D]/10 blur-[2px] md:blur-[4px] hover:blur-none hover:text-[#0D0D0D]/40'
                            }`}
                    >
                        Studio
                        {activeTab === 'studio' && (
                            <motion.div
                                layoutId="activeTabUnderline"
                                className="absolute -bottom-4 md:-bottom-8 left-0 right-0 h-1 md:h-1.5 bg-[#C94A2C]"
                            />
                        )}
                    </button>
                </div>


                {/* 2. Content Sections */}
                <div className="w-full max-w-7xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, scale: 0.98, filter: "blur(20px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 1.02, filter: "blur(20px)" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch"
                        >

                            {/* Left: Text & List (Col span 7) */}
                            <div className="lg:col-span-7 flex flex-col justify-center space-y-12 md:space-y-20 order-2 lg:order-1">
                                <div className="space-y-6">
                                    <h3 className="text-xs md:text-sm font-bold uppercase tracking-[0.4em] text-[#C94A2C]">
                                        {services[activeTab].subtitle}
                                    </h3>
                                    <p className="text-[#0D0D0D]/70 font-medium leading-relaxed text-lg md:text-2xl max-w-2xl">
                                        {services[activeTab].description}
                                    </p>
                                </div>

                                {/* Services List */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                                    {services[activeTab].items.map((item, index) => (
                                        <motion.div
                                            key={item}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 + 0.3 }}
                                            className="flex flex-col gap-2 group cursor-default"
                                        >
                                            <div className="h-px w-full bg-black/5 mb-2" />
                                            <span className="text-xl md:text-2xl font-display font-medium tracking-tight text-[#0D0D0D]/80 group-hover:text-black transition-colors">
                                                {item.includes(' — ') ? (
                                                    <>
                                                        <span className="block">{item.split(' — ')[0]}</span>
                                                        <span className="block text-xs md:text-sm font-bold uppercase tracking-widest text-[#0D0D0D]/30 mt-1">{item.split(' — ')[1]}</span>
                                                    </>
                                                ) : (
                                                    item
                                                )}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Right: Cinematic Visual (Col span 5) */}
                            <div className="lg:col-span-5 relative order-1 lg:order-2">
                                <motion.div
                                    className="aspect-[4/5] rounded-[3.5rem] overflow-hidden bg-white shadow-2xl relative z-10 border border-black/[0.03]"
                                    whileHover={{ scale: 0.99 }}
                                    transition={{ duration: 0.7 }}
                                >
                                    <img
                                        src={services[activeTab].image}
                                        alt={services[activeTab].title}
                                        className="w-full h-full object-contain p-12 opacity-60 transition-all duration-1000 grayscale group-hover:grayscale-0"
                                    />
                                    <div className="absolute inset-x-10 bottom-10 p-8 bg-[#F5F0E8]/80 backdrop-blur-xl rounded-[2.5rem] border border-black/5 shadow-lg">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#C94A2C] mb-1">Service Type</p>
                                                <p className="text-[#0D0D0D] font-display text-xl font-bold tracking-tight">{services[activeTab].title}</p>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-[#0D0D0D] text-white flex items-center justify-center">
                                                <ArrowUpRight size={20} />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                                
                                {/* Background Decorative element */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-black/[0.05] rounded-[4rem] -z-10 scale-105 rotate-3" />
                            </div>

                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>
        </section>
    );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ');
}
