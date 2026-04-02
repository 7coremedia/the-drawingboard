import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const systems = [
    {
        id: 1,
        name: "Brand Strategy Architecture",
        description: "The logic before the craft. We build the architecture that sustains market leader status.",
    },
    {
        id: 2,
        name: "Visual Identity Systems",
        description: "Engineered to be unmistakable. We create design languages that scale across all touchpoints.",
    },
    {
        id: 3,
        name: "Scale & Performance",
        description: "Growth readiness. Brand systems built from first principles for Series A through exit.",
    },
];

export default function Hero() {
    return (
        <section className="relative py-24 md:py-40 bg-[#F5F0E8] overflow-hidden">
            <div className="container px-6 md:px-10 max-w-7xl mx-auto">
                {/* Clinical Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 md:mb-32">
                    <motion.div 
                        className="max-w-2xl"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="text-[10px] uppercase tracking-[0.3em] font-black text-[#C94A2C] block mb-6">Our approach</span>
                        <h2 className="text-4xl md:text-6xl lg:text-[72px] font-display font-medium tracking-[-0.08em] text-[#0D0D0D] leading-[0.82] mb-10 md:mb-14">
                            We don’t do pretty. <br />
                            <span className="text-[#C94A2C]">We do decisive.</span>
                        </h2>
                    </motion.div>
                    <motion.p 
                        className="text-[#3D2C1F]/60 text-lg md:text-xl max-w-md leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    >
                        KŌDĒ works with emerging businesses ready to build brands that travel — across industries, borders, and every stage of growth.
                    </motion.p>
                </div>

                {/* Typographic System List */}
                <motion.div 
                    className="space-y-0 mb-32"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.2
                            }
                        }
                    }}
                >
                    {systems.map((system, index) => (
                        <motion.div 
                            key={system.id} 
                            className="group border-t border-black/[0.08] last:border-b"
                            variants={{
                                hidden: { opacity: 0, y: 40 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                            }}
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between py-10 md:py-16 gap-6 md:gap-12 transition-all hover:bg-black/[0.01]">
                                <div className="flex items-start gap-8 md:gap-16">
                                    <span className="text-sm font-mono text-black/40 pt-2 font-black select-none">{String(index + 1).padStart(2, '0')}</span>
                                    <h3 className="text-3xl md:text-5xl lg:text-6xl font-display text-[#0D0D0D] tracking-[-0.04em] font-medium max-w-xl leading-[0.9]">
                                        {system.name}
                                    </h3>
                                </div>
                                <p className="text-[#3D2C1F]/50 text-base md:text-lg max-w-sm leading-relaxed md:text-right">
                                    {system.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Dark Clinical CTA Area - Matching the bottom of the Hims image */}
                <motion.div 
                    className="bg-[#3D2C1F] rounded-[3rem] p-10 md:p-20 text-white relative overflow-hidden group"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                    
                    <div className="flex flex-col items-center text-center max-w-3xl mx-auto relative z-10">
                        <h3 className="text-3xl md:text-5xl lg:text-[60px] font-display tracking-[-0.08em] font-medium mb-10 leading-[0.82]">
                            The growth you’ve <br /> always deserved.
                        </h3>
                        <p className="text-white/60 text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed">
                            Join 20+ brands that have scaled with the KŌDĒ clinical framework. Lagos — London.
                        </p>
                        
                        <Link
                            to="/contact"
                            className="bg-[#F5F0E8] text-[#0D0D0D] py-5 px-12 rounded-full font-display font-medium text-lg hover:scale-[1.02] transition-transform shadow-2xl"
                        >
                            Apply to Work With Us
                        </Link>
                    </div>

                    {/* Subtle Graphic background element */}
                    <div className="absolute right-0 bottom-0 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                         <img src="/placeholder.svg" alt="results" className="w-96 h-96 object-contain filter invert" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
