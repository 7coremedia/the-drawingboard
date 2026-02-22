import { motion } from "framer-motion";

export default function Exclusive() {
    return (
        <section className="py-20 md:py-48 bg-black flex flex-col items-center justify-center relative overflow-hidden border-t border-white/5">
            {/* Background radial glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container px-6 relative z-10 flex flex-col items-center">
                {/* Ticket/Envelope Visual Container */}
                <div className="relative mb-16 flex justify-center w-full max-w-2xl">
                    {/* Top Card (Black Titanium Style) */}
                    <motion.div
                        initial={{ y: 20, rotate: -4, opacity: 0 }}
                        whileInView={{ y: 0, rotate: -4, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="absolute -top-10 md:-top-12 -left-2 md:-left-12 w-40 sm:w-48 md:w-64 aspect-[1.6/1] bg-gradient-to-br from-zinc-800 to-black rounded-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] border border-white/10 p-4 md:p-8 flex flex-col justify-between z-20 backdrop-blur-3xl overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full -mr-16 -mt-16" />
                        <div className="relative z-10 flex justify-between items-start">
                            <div className="text-white/40 text-[8px] uppercase tracking-[0.4em] font-bold">Priority Selection</div>
                            <div className="w-8 h-6 bg-white/10 rounded-md border border-white/10" />
                        </div>
                        <div className="relative z-10 space-y-2">
                            <div className="text-white font-display text-xs md:text-sm tracking-widest uppercase">ID: PROTOCOL-26</div>
                            <div className="text-white/20 text-[7px] md:text-[8px] font-medium leading-tight max-w-[140px]">Reserved for brands with the vision to redefine their category.</div>
                        </div>
                    </motion.div>

                    {/* Main Card */}
                    <div className="w-full aspect-[4/3] md:aspect-video bg-zinc-900 border border-white/10 rounded-3xl md:rounded-[3rem] p-6 md:p-16 flex flex-col justify-center items-center text-center relative z-10 overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
                        {/* Pattern Background */}
                        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />

                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 mb-8 flex items-center justify-center backdrop-blur-xl"
                        >
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                        </motion.div>

                        <h2 className="text-3xl md:text-5xl font-display mb-10 leading-tight">
                            Reserved for the <em className="italic text-zinc-400">future</em><br />
                            of human industry.
                        </h2>

                        <div className="flex flex-col md:flex-row gap-3 md:gap-6 relative z-20 w-full sm:w-auto mt-4 md:mt-0">
                            <a
                                href="/onboarding"
                                className="w-full sm:w-auto bg-white text-black py-3.5 px-8 md:px-10 rounded-full font-display font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                            >
                                Apply for Selection
                            </a>
                            <a
                                href="/about"
                                className="w-full sm:w-auto bg-white/5 py-3.5 px-8 md:px-10 rounded-full font-display font-medium text-xs uppercase tracking-widest hover:bg-white/10 transition-colors border border-white/10 text-white backdrop-blur-md"
                            >
                                View Philosophy
                            </a>
                        </div>

                        <div className="absolute bottom-6 md:bottom-10 left-0 right-0 flex justify-center items-center gap-2 md:gap-8 opacity-20 px-2 text-center flex-wrap">
                            <span className="text-[7px] md:text-[8px] uppercase tracking-[0.3em] md:tracking-[0.5em] text-white">GEN v2.26</span>
                            <div className="hidden sm:block w-1 h-1 bg-white rounded-full" />
                            <span className="hidden sm:block text-[7px] md:text-[8px] uppercase tracking-[0.3em] md:tracking-[0.5em] text-white">BOUTIQUE MODEL</span>
                            <div className="w-1 h-1 bg-white rounded-full" />
                            <span className="text-[7px] md:text-[8px] uppercase tracking-[0.3em] md:tracking-[0.5em] text-white">AGENCY ACCESS</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
