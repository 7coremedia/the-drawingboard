import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const services = {
    management: {
        title: "Brand Management",
        subtitle: "The-DrawingBoard",
        description: "Comprehensive strategic oversight for brands ready to dominate their category. We handle the psychology, growth, and positioning so you can focus on execution.",
        items: [
            "Strategy & Research",
            "Consultation",
            "Growth Architecture",
            "Market Positioning",
            "Investment Readiness",
            "Visibility & PR"
        ],
        image: "/redesign/strategic_foundation.png" // Placeholder: High-end strategy vibe
    },
    studio: {
        title: "T-DB Studio",
        subtitle: "Creative Excellence",
        description: "The execution arm of our philosophy. Where world-class aesthetics meet architectural precision to create undeniable brand assets.",
        items: [
            "Visual Identity Systems",
            "Creative Direction",
            "Digital Experience Design",
            "Packaging & Print",
            "Motion & Interaction",
            "Campaign visual"
        ], // Added a few extra to balance the list visually
        image: "/redesign/visual_identity.png" // Placeholder: Premium texture vibe
    }
};

export default function Services() {
    const [activeTab, setActiveTab] = useState<'management' | 'studio'>('management');

    return (
        <section className="relative py-24 md:py-32 bg-black overflow-hidden min-h-[90vh] flex flex-col items-center">

            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(circle_at_top_center,#675241_0%,transparent_50%)] opacity-20 pointer-events-none" />

            <div className="container px-6 relative z-10 flex flex-col items-center h-full">

                {/* 1. Blurred Tab Navigation */}
                <div className="flex items-center justify-center gap-3 md:gap-16 mb-12 md:mb-24 relative w-full px-2">
                    {/* Tab 1: Brand Management */}
                    <button
                        onClick={() => setActiveTab('management')}
                        className={`relative text-[1.1rem] sm:text-2xl md:text-5xl font-display font-medium transition-all duration-500 whitespace-nowrap ${activeTab === 'management'
                            ? 'text-white blur-none scale-100 md:scale-105'
                            : 'text-zinc-600 blur-[1px] md:blur-[2px] hover:blur-none hover:text-zinc-400 scale-95'
                            }`}
                    >
                        Management
                        {activeTab === 'management' && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute -bottom-2 md:-bottom-4 left-0 right-0 h-[2px] bg-brand-pink/50 shadow-[0_0_10px_2px_rgba(255,100,200,0.3)]"
                            />
                        )}
                    </button>

                    {/* Separator / Divider */}
                    <div className="w-[1px] h-8 md:h-12 bg-white/10" />

                    {/* Tab 2: T-DB Studio */}
                    <button
                        onClick={() => setActiveTab('studio')}
                        className={`relative text-[1.1rem] sm:text-2xl md:text-5xl font-display font-medium transition-all duration-500 whitespace-nowrap ${activeTab === 'studio'
                            ? 'text-white blur-none scale-100 md:scale-105'
                            : 'text-zinc-600 blur-[1px] md:blur-[2px] hover:blur-none hover:text-zinc-400 scale-95'
                            }`}
                    >
                        Studio
                        {activeTab === 'studio' && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute -bottom-2 md:-bottom-4 left-0 right-0 h-[2px] bg-brand-blue/50 shadow-[0_0_10px_2px_rgba(0,100,255,0.3)]"
                            />
                        )}
                    </button>
                </div>


                {/* 2. Content Sections (AnimatePresence for smooth switch) */}
                <div className="w-full max-w-6xl mx-auto flex-1">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center"
                        >

                            {/* Left: Text & List */}
                            <div className="space-y-10 order-2 md:order-1">
                                <div className="space-y-4">
                                    <h3 className="text-xl md:text-2xl font-display text-zinc-400">
                                        {services[activeTab].subtitle}
                                    </h3>
                                    <p className="text-zinc-500 leading-relaxed text-sm md:text-base max-w-md">
                                        {services[activeTab].description}
                                    </p>
                                </div>

                                {/* Services List */}
                                <div className="grid grid-cols-1 gap-4">
                                    {services[activeTab].items.map((item, index) => (
                                        <motion.div
                                            key={item}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 + 0.3 }}
                                            className="flex items-center gap-4 group"
                                        >
                                            <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${activeTab === 'management' ? 'bg-brand-pink group-hover:shadow-[0_0_8px_rgba(255,100,200,0.6)]' : 'bg-brand-blue group-hover:shadow-[0_0_8px_rgba(0,100,255,0.6)]'}`} />
                                            <span className="text-white text-lg md:text-2xl font-display font-light group-hover:pl-2 transition-all duration-300">
                                                {item}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Right: Cinematic Image Visual */}
                            <div className="relative order-1 md:order-2">
                                <div className={`absolute inset-0 bg-gradient-to-tr opacity-20 blur-[100px] rounded-full pointer-events-none ${activeTab === 'management' ? 'from-brand-pink to-transparent' : 'from-brand-blue to-transparent'}`} />

                                <motion.div
                                    className="aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/5 relative z-10 shadow-2xl"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <img
                                        src={services[activeTab].image}
                                        alt={services[activeTab].title}
                                        className="w-full h-full object-cover opacity-80"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 md:via-transparent to-transparent opacity-80 md:opacity-60" />

                                    {/* Glass Overlay Tag */}
                                    <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <p className="text-zinc-500 text-[8px] md:text-[9px] uppercase tracking-widest mb-1">Service Tier</p>
                                                <p className="text-white font-display text-base md:text-lg">{activeTab === 'management' ? 'Strategic Oversight' : 'Visual Execution'}</p>
                                            </div>
                                            <div className="text-white/20">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>
        </section>
    );
}
