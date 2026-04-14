import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, ClipboardCheck, Clock, FileText, Activity } from "lucide-react";
import RedesignFooter from "@/components/redesign/RedesignFooter";
import { useCurrency } from "@/context/CurrencyContext";
import CurrencySelector from "@/components/redesign/CurrencySelector";

export default function BrandAudit() {
    const { formatPrice } = useCurrency();
    return (
        <div className="min-h-screen bg-[#F5F0E8] text-[#0D0D0D] selection:bg-[#C94A2C] selection:text-[#F5F0E8] pt-24 md:pt-40">
            <Helmet>
                <title>Strategic Diagnostic – ŌDEY | The Drawing Board</title>
                <meta name="description" content="ŌDEY Strategic Diagnostic — a complete 48-hour brand architecture report." />
                <link rel="canonical" href="/brand-audit" />
            </Helmet>

            <main className="container mx-auto px-6 relative">
                {/* Section Header */}
                <div className="max-w-4xl mb-24 md:mb-40">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-8"
                    >
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#C94A2C]">Brand Audit</span>
                            <div className="h-px w-12 bg-black/5" />
                        </div>
                        <h1 className="font-display text-5xl md:text-8xl font-black tracking-tighter leading-[0.95] mb-8">
                            See what's holding <br /> your brand <br /> <span className="text-[#C94A2C]">back.</span>
                        </h1>
                        <p className="text-[#0D0D0D]/60 text-lg md:text-2xl font-medium max-w-2xl leading-relaxed">
                            A complete 48-hour brand review that shows you exactly where you're losing trust, leaving money on the table, and how to fix it.
                        </p>
                        <div className="pt-6">
                            <Link to="/brand-audit-quiz" className="inline-flex items-center gap-3 font-bold text-xs uppercase tracking-[0.1em] text-[#C94A2C] hover:text-[#0D0D0D] transition-colors">
                                Not sure if you need one? Take the free assessment <ArrowUpRight size={16} />
                            </Link>
                        </div>
                    </motion.div>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 md:gap-20 items-stretch max-w-7xl mx-auto pb-40">
                    
                    {/* Diagnostic Outcomes (Col Span 7) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-12 xl:col-span-7 bg-white rounded-[3.5rem] p-10 md:p-24 shadow-[0_60px_100px_-20px_rgba(0,0,0,0.06)] border border-black/[0.03] flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex items-center gap-3 mb-12">
                                <ClipboardCheck size={20} className="text-[#C94A2C]" />
                                <h3 className="text-xs md:text-sm font-bold uppercase tracking-[0.4em] text-[#0D0D0D]">What You Get</h3>
                            </div>
                            
                            <ul className="space-y-12">
                                {[
                                    { title: "Visual Architecture Audit", desc: "We review your logo, typography, colors, and visual consistency across every platform your audience sees." },
                                    { title: "Message Matrix Analysis", desc: "Is your brand saying the right things to the right people? We find out." },
                                    { title: "Competitive Landscape Mapping", desc: "Where you stand compared to the brands your audience is choosing instead of you." },
                                    { title: "Strategic Roadmap", desc: "Three specific, actionable next steps you can take immediately to start closing the gap." }
                                ].map((item, i) => (
                                    <li key={i} className="group cursor-default">
                                        <div className="flex gap-8">
                                            <span className="text-xl md:text-2xl font-black text-[#C94A2C] opacity-30 group-hover:opacity-100 transition-opacity">0{i+1}</span>
                                            <div className="space-y-2">
                                                <h4 className="text-2xl md:text-3xl font-display font-black tracking-tight text-[#0D0D0D]">{item.title}</h4>
                                                <p className="text-[#0D0D0D]/50 text-base md:text-lg font-medium leading-relaxed">{item.desc}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div className="mt-16 pt-12 border-t border-black/5 flex items-center justify-between">
                             <div className="flex items-center gap-2">
                                <FileText size={16} className="text-[#C94A2C]" />
                                <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#0D0D0D]/40 leading-none">Full written report delivered</span>
                             </div>
                        </div>
                    </motion.div>

                    {/* Investment & Booking (Col Span 5) */}
                    <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-10">
                        {/* Who it's for */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-[3.5rem] p-10 md:p-16 border border-black/[0.03] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)]"
                        >
                            <div className="flex items-center gap-3 mb-10">
                                <Activity size={18} className="text-[#C94A2C]" />
                                <h3 className="text-xs md:text-sm font-bold uppercase tracking-[0.4em] text-[#0D0D0D]">Who This Is For</h3>
                            </div>
                            <ul className="space-y-6">
                                {[
                                    "Startups preparing for their next funding round",
                                    "Founders and executives building a personal brand",
                                    "Established businesses ready for a rebrand or category shift",
                                    "Any brand that's outgrown its current identity"
                                ].map((criteria, i) => (
                                    <li key={i} className="flex gap-4">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#C94A2C] mt-2 shrink-0 shadow-[0_0_5px_rgba(201,74,44,0.5)]" />
                                        <span className="text-[#0D0D0D]/60 text-lg md:text-xl font-medium leading-tight">{criteria}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Order Module */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-[#0D0D0D] rounded-[3.5rem] p-10 md:p-16 text-white relative overflow-hidden"
                        >
                            <div className="relative z-10 space-y-12">
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[9px] uppercase font-bold tracking-[0.3em] text-white/30">investment</span>
                                        </div>
                                        <p className="text-4xl md:text-5xl font-display font-black tracking-tighter text-white">{formatPrice(250)} <span className="text-lg text-white/20 font-bold uppercase tracking-widest"></span></p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Clock size={12} className="text-[#C94A2C]" />
                                            <span className="text-[9px] uppercase font-bold tracking-[0.3em] text-white/30">Cycle Time</span>
                                        </div>
                                        <p className="text-3xl md:text-4xl font-display font-black tracking-tight text-white mt-1">48 Hours</p>
                                    </div>
                                </div>

                                <a 
                                    href="https://calendly.com" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="group w-full flex items-center justify-center gap-4 bg-[#C94A2C] text-white px-8 py-6 rounded-full font-display font-bold text-[11px] uppercase tracking-[0.4em] hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_40px_-10px_rgba(201,74,44,0.3)]"
                                >
                                    Book Your Audit
                                    <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </a>
                                
                                <div className="flex items-center justify-between">
                                    <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-center text-white/20">Limited spots available each month</p>
                                    <CurrencySelector />
                                </div>
                            </div>
                            
                            {/* Decorative Background Orb */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#C94A2C]/10 blur-[100px] rounded-full -z-0" />
                        </motion.div>
                    </div>

                </div>
            </main>
            
            <RedesignFooter />
        </div>
    );
}
