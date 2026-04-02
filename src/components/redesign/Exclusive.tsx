import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Activity } from "lucide-react";

export default function Exclusive() {
    return (
        <section className="py-32 md:py-64 bg-[#F5F0E8] flex flex-col items-center justify-center relative overflow-hidden border-t border-black/5 px-2 md:px-6">
            {/* Subtle background element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-black/[0.03] rounded-full pointer-events-none -z-0 scale-125" />

            <div className="container relative z-10 flex flex-col items-center max-w-6xl mx-auto">
                {/* Priority / Access Card Visual Container */}
                <div className="relative w-full">
                    
                    {/* 1. FLOATING PROTOCOL BADGE (Clinical Fidelity) */}
                    <motion.div
                        initial={{ y: 40, rotate: -8, opacity: 0 }}
                        whileInView={{ y: 0, rotate: -8, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute -top-12 md:-top-32 left-0 md:-left-12 w-48 sm:w-64 md:w-80 aspect-[1.6/1] bg-white rounded-[2rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] border border-black/[0.05] p-8 md:p-12 flex flex-col justify-between z-30 group hover:rotate-0 transition-transform duration-700"
                    >
                         <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <div className="text-[#C94A2C] font-bold text-[9px] uppercase tracking-[0.4em]">Protocol 2.26</div>
                                <div className="text-[#0D0D0D]/20 text-[7px] uppercase font-bold tracking-[0.2em]">Diagnostic Clearance</div>
                            </div>
                            <ShieldCheck size={24} className="text-[#C94A2C]" />
                        </div>
                        <div className="space-y-3">
                             <div className="text-[#0D0D0D] font-display text-sm md:text-lg font-black tracking-widest uppercase">ID: ELITE-PRIME</div>
                             <div className="h-0.5 w-16 bg-[#C94A2C]" />
                             <p className="text-[#0D0D0D]/40 text-[8px] md:text-[10px] font-bold tracking-widest leading-tight uppercase flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-[#C94A2C] rounded-full animate-pulse" />
                                High Fidelity Priority
                             </p>
                        </div>
                    </motion.div>

                    {/* 2. MAIN ENROLLMENT MODULE */}
                    <div className="w-full bg-white border border-black/[0.05] rounded-[3.5rem] md:rounded-[5rem] px-5 py-12 md:p-32 flex flex-col justify-center items-center text-center relative z-10 overflow-hidden shadow-[0_80px_150px_-40px_rgba(0,0,0,0.08)] min-h-[500px] md:min-h-[700px]">
                        
                        {/* Clinical Background Detail */}
                        <div className="absolute top-0 right-1/3 w-px h-40 bg-gradient-to-b from-black/[0.08] to-transparent" />
                        <div className="absolute bottom-0 left-1/4 w-px h-40 bg-gradient-to-t from-black/[0.08] to-transparent" />

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#F5F0E8] border border-black/[0.05] mb-12 flex items-center justify-center relative"
                        >
                            <Activity size={24} className="text-[#C94A2C]" />
                            <div className="absolute inset-0 rounded-full border border-[#C94A2C]/20 animate-ping" />
                        </motion.div>

                        <div className="space-y-12 max-w-4xl relative z-20 px-4">
                            <span className="text-[10px] uppercase tracking-[0.5em] font-black text-[#C94A2C]">Engagement Capacity</span>
                            <h2 className="text-3xl md:text-6xl font-display leading-[0.95] text-[#0D0D0D] font-black tracking-tighter">
                                Architecture, <br className="hidden md:block" /> Not Volume.
                            </h2>
                            <p className="text-[#0D0D0D]/50 text-lg md:text-2xl font-medium leading-relaxed max-w-2xl mx-auto">
                                We admit a select number of new category-shifting projects each quarter. This ensures the KŌDĒ standard of undeniable market authority.
                            </p>
                        </div>

                        <div className="flex flex-col md:flex-row gap-6 md:gap-10 mt-16 relative z-20 w-full sm:w-auto px-6">
                            <a
                                href="/onboarding"
                                className="group w-full sm:w-auto bg-[#0D0D0D] text-white py-6 px-12 md:px-16 rounded-full font-display text-[11px] font-bold uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-4 border border-transparent"
                            >
                                Initiate Brief
                                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                            </a>
                            <a
                                href="/about"
                                className="w-full sm:w-auto bg-transparent py-6 px-12 md:px-16 rounded-full font-display text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-black/[0.03] transition-all border border-black/10 text-[#0D0D0D] flex items-center justify-center"
                            >
                                Our Methodology
                            </a>
                        </div>

                        {/* Status Ticker Footer */}
                        <div className="absolute bottom-12 md:bottom-20 left-0 right-0 flex justify-center items-center gap-6 md:gap-16 opacity-30 px-8 text-center text-[7px] md:text-[9px] font-black uppercase tracking-[0.4em] text-[#0D0D0D]">
                            <div className="flex items-center gap-3">
                                <div className="w-1 h-1 bg-[#C94A2C] rounded-full" />
                                <span className="whitespace-nowrap">High Touch Strategy</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-1 h-1 bg-black rounded-full" />
                                <span className="whitespace-nowrap font-black text-[#C94A2C]">Enrollment Open Q2</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-1 h-1 bg-black rounded-full" />
                                <span className="whitespace-nowrap">Global Access Authorized</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
