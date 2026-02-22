import { motion } from "framer-motion";

const cards = [
    {
        id: 1,
        title: "Strategic Foundation",
        description: "Market psychology meets architectural precision.",
        image: "/redesign/strategic_foundation.png",
        delay: 0.1
    },
    {
        id: 2,
        title: "Visual Sovereignty",
        description: "Bespoke identity systems for premium market positioning.",
        image: "/redesign/visual_identity.png",
        delay: 0.15
    },
    {
        id: 3,
        title: "Human Connection",
        description: "Designing experiences that resonate on a human level.",
        image: "/redesign/human_interaction.png",
        delay: 0.2
    },
    {
        id: 4,
        title: "Institutional Scaling",
        description: "Branding engineered to secure your next round of funding.",
        image: "/redesign/growth_funding.png",
        delay: 0.25
    },
    {
        id: 5,
        title: "Future Vision",
        description: "Transforming raw ideas into inevitable category leaders.",
        image: "/redesign/future_vision.png",
        delay: 0.3
    },
];

export default function Hero() {
    return (
        <section className="relative py-16 md:py-40 overflow-hidden bg-black">
            {/* Elevated Premium Gradient Glow with Bottom Blend */}
            <div
                className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0 opacity-40"
                style={{
                    background: 'radial-gradient(circle at center, #675241 0%, transparent 70%)',
                    maskImage: 'linear-gradient(to top, transparent 10%, black 40%)',
                    WebkitMaskImage: 'linear-gradient(to top, transparent 10%, black 40%)'
                }}
            />

            <div className="container px-6 relative z-10">
                {/* Cinematic Headline Section */}
                <div className="max-w-4xl mx-auto text-center mb-20 md:mb-32 space-y-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-3xl md:text-5xl font-display leading-[1.1] tracking-tight"
                    >
                        The-DrawingBoard is a <br className="block md:hidden" /><span className="text-zinc-400">Human-Centered</span> Branding and Media Agency.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed"
                    >
                        Built for small and medium sized businesses. <br className="hidden md:block" />
                        Grow your business from idea to Funding.
                    </motion.p>
                </div>

                {/* Bento Grid Cards */}
                <div
                    className="flex overflow-x-auto md:grid md:grid-cols-5 gap-4 md:gap-6 max-w-7xl mx-auto w-full mb-16 px-4 md:px-0 snap-x snap-mandatory pb-4 md:pb-0 [&::-webkit-scrollbar]:hidden"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {cards.map((card) => (
                        <motion.div
                            key={card.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: card.delay, duration: 0.6, ease: "easeOut" }}
                            whileHover={{ y: -10, transition: { duration: 0.3 } }}
                            className="w-[80vw] sm:w-[60vw] md:w-auto flex-shrink-0 snap-center md:snap-align-none aspect-[4/5] md:aspect-[3/4] rounded-3xl bg-zinc-900/30 border border-white/5 overflow-hidden group relative backdrop-blur-sm"
                        >
                            <img
                                src={card.image}
                                alt={card.title}
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-all duration-700 grayscale-[0.5] group-hover:grayscale-0 scale-105 group-hover:scale-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

                            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 space-y-2">
                                <h3 className="text-white font-display text-lg md:text-2xl tracking-tight leading-tight">
                                    {card.title}
                                </h3>
                                <p className="text-zinc-400 text-xs md:text-sm font-medium leading-relaxed opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform md:translate-y-2 group-hover:translate-y-0">
                                    {card.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Subtle CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="flex justify-center"
                >
                    <a
                        href="/onboarding"
                        className="bg-white text-black py-3 px-10 rounded-full font-display font-medium text-sm hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                    >
                        Apply for Selection
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
