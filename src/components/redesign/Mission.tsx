import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";

const missionCards = [
    {
        title: "Strategy & Research",
        description: "Deep-dives into market psychology and category gaps.",
        icon: "⚛️",
        bg: "bg-brand-pink/90",
        delay: 0.1,
    },
    {
        title: "Visual Grade",
        description: "Superior design execution that commands attention.",
        icon: "👑",
        bg: "bg-[#0A0A0A] border border-white/10",
        delay: 0.15,
    },
    {
        title: "Brand Invisibility",
        description: "Psychological triggers that make competition disappear.",
        icon: "💎",
        bg: "bg-brand-purple/90",
        delay: 0.2,
    },
];

export default function Mission() {
    return (
        <section className="py-24 md:py-40 bg-black">
            <div className="container px-6">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 md:mb-24">
                    <div className="max-w-2xl space-y-4">
                        <span className="text-[10px] uppercase tracking-[0.4em] text-brand-pink font-bold">The Protocol</span>
                        <h2 className="text-4xl md:text-6xl font-display leading-[1.1] tracking-tight">
                            Human <em className="italic opacity-80">Positioning</em><br />
                            for AI <span className="font-sans font-black">takeover</span>
                        </h2>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-3">
                        <button className="flex items-center gap-2 group text-white/80 hover:text-white font-medium text-sm transition-colors">
                            <span>Read Whitepaper</span>
                            <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Bento Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {missionCards.map((card) => (
                        <motion.div
                            key={card.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: card.delay, duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
                            viewport={{ once: true }}
                            className={`p-10 md:p-12 rounded-[2.5rem] flex flex-col justify-between aspect-[1.1/1] hover:scale-[1.02] transition-transform duration-500 shadow-2xl ${card.bg}`}
                        >
                            <div className="text-4xl md:text-5xl drop-shadow-lg">{card.icon}</div>
                            <div className="space-y-4">
                                <h3 className="text-2xl md:text-3xl font-display tracking-tight">{card.title}</h3>
                                <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-[240px] font-medium">
                                    {card.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
