import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";

const missionCards = [
    {
        title: "Precision",
        description: "Every word, every pixel, every client interaction held to one standard: is this the best it can be?",
        icon: "⚡",
        bg: "bg-[#C94A2C]",
        delay: 0.1,
    },
    {
        title: "Cultural Intelligence",
        description: "We are rooted in our context. African creative culture is not a reference — it is the foundation.",
        icon: "🌍",
        bg: "bg-[#1A1A1A] border border-white/10",
        delay: 0.15,
    },
    {
        title: "Long-Term Thinking",
        description: "We build brands that compound. Not just work that wins awards this year, but positioning that pays dividends for a decade.",
        icon: "🏛️",
        bg: "bg-[#F5F0E8]",
        delay: 0.2,
    },
];

export default function Mission() {
    return (
        <section className="py-24 md:py-40 bg-[#F5F0E8] text-[#0D0D0D]">
            <div className="container px-6">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 md:mb-24">
                    <div className="max-w-2xl space-y-4">
                        <span className="text-[10px] uppercase tracking-[0.4em] font-bold" style={{color:'#C94A2C'}}>The KŌDĒ Standard</span>
                        <h2 className="text-4xl md:text-6xl font-display leading-[1.1] tracking-tight">
                            Brand is not decoration. <br />
                            <span className="opacity-80">Brand is infrastructure.</span>
                        </h2>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-3">
                        <button className="flex items-center gap-2 group text-[#0D0D0D]/80 hover:text-[#0D0D0D] font-medium text-sm transition-colors">
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
                            className={`p-10 md:p-12 rounded-[2.5rem] flex flex-col justify-between aspect-[1.1/1] hover:scale-[1.02] transition-transform duration-500 shadow-2xl ${card.bg} ${card.title === 'Long-Term Thinking' ? 'text-[#0D0D0D]' : 'text-white'}`}
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
