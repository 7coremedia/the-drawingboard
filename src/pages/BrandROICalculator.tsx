import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Calculator, ArrowRight, TrendingUp, ShieldCheck, Activity } from "lucide-react";
import RedesignFooter from "@/components/redesign/RedesignFooter";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

export default function BrandROICalculator() {
    const [revenue, setRevenue] = useState<number>(50000000); // 50M default
    const [dealSize, setDealSize] = useState<number>(2000000); // 2M default
    const [closeRate, setCloseRate] = useState<number>(20); // 20%
    const [targetCloseRate, setTargetCloseRate] = useState<number>(35); // 35%
    
    // Formatting helper
    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(val);
    };

    // Calculate metrics
    const currentDeals = revenue / dealSize;
    const leadsNeeded = currentDeals / (closeRate / 100);
    const projectedDeals = leadsNeeded * (targetCloseRate / 100);
    const projectedRevenue = projectedDeals * dealSize;
    const annualLostRevenue = projectedRevenue - revenue;
    
    // 3-Year compounding with an estimated 10% YoY growth based on brand equity
    const threeYearCompounding = (projectedRevenue * 1.1) + (projectedRevenue * 1.21) + (projectedRevenue * 1.331) - (revenue * 3);

    return (
        <div className="min-h-screen bg-[#F5F0E8] text-[#0D0D0D] selection:bg-[#C94A2C] selection:text-[#F5F0E8] pt-24 md:pt-40">
            <Helmet>
                <title>Brand ROI Calculator – ŌDEY | The Drawing Board</title>
                <meta name="description" content="Calculate the hidden cost of a weak brand and project your compounding returns with ŌDEY clinical brand architecture." />
                <link rel="canonical" href="/brand-roi-calculator" />
            </Helmet>

            <main className="container mx-auto px-6 relative max-w-6xl mb-32">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                    
                    {/* Left: Interactive Input Panel */}
                    <div className="lg:w-1/2 space-y-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#C94A2C]">Diagnostic Tool</span>
                                <div className="h-px w-12 bg-black/5" />
                            </div>
                            <h1 className="font-display text-4xl md:text-6xl font-black tracking-tighter leading-[0.95]">
                                The Cost of <br /> Indecision.
                            </h1>
                            <p className="text-[#0D0D0D]/60 text-lg font-medium leading-relaxed max-w-md">
                                A weak brand doesn't just look bad. It caps your pricing, destroys trust, and forces you to fight for every conversion. See what poor positioning is actually costing you.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="bg-white rounded-[3rem] p-8 md:p-12 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)] border border-black/[0.03] space-y-12"
                        >
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <label className="text-[10px] uppercase tracking-[0.3em] font-black text-black/60">Current Annual Revenue</label>
                                    <span className="text-xl font-bold text-[#C94A2C]">{formatCurrency(revenue)}</span>
                                </div>
                                <Slider 
                                    value={[revenue]} 
                                    max={500000000} 
                                    step={1000000}
                                    onValueChange={(val) => setRevenue(val[0])}
                                    className="[&_[role=slider]]:bg-[#0D0D0D] [&_[role=slider]]:border-[#0D0D0D]"
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <label className="text-[10px] uppercase tracking-[0.3em] font-black text-black/60">Average Deal Size</label>
                                    <span className="text-xl font-bold text-[#C94A2C]">{formatCurrency(dealSize)}</span>
                                </div>
                                <Slider 
                                    value={[dealSize]} 
                                    max={50000000} 
                                    step={100000}
                                    onValueChange={(val) => setDealSize(val[0])}
                                    className="[&_[role=slider]]:bg-[#0D0D0D] [&_[role=slider]]:border-[#0D0D0D]"
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <label className="text-[10px] uppercase tracking-[0.3em] font-black text-black/60">Current Close Rate</label>
                                    <span className="text-xl font-bold text-[#C94A2C]">{closeRate}%</span>
                                </div>
                                <Slider 
                                    value={[closeRate]} 
                                    max={100} 
                                    step={1}
                                    onValueChange={(val) => setCloseRate(val[0])}
                                    className="[&_[role=slider]]:bg-[#0D0D0D] [&_[role=slider]]:border-[#0D0D0D]"
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <label className="text-[10px] uppercase tracking-[0.3em] font-black text-black/60">Target Close Rate (with Premium Brand)</label>
                                    <span className="text-xl font-bold text-[#0D0D0D]">{targetCloseRate}%</span>
                                </div>
                                <Slider 
                                    value={[targetCloseRate]} 
                                    max={100} 
                                    step={1}
                                    onValueChange={(val) => setTargetCloseRate(val[0])}
                                    className="[&_[role=slider]]:bg-[#0D0D0D] [&_[role=slider]]:border-[#0D0D0D]"
                                />
                                <p className="text-[9px] font-bold text-black/30 mt-2">Historically, a ŌDEY brand architecture system lifts close rates by 15-40% through increased trust and perceived authority.</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Output/Projection Panel */}
                    <div className="lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="bg-[#0D0D0D] rounded-[3.5rem] p-10 md:p-14 text-white sticky top-32 shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C94A2C]/20 blur-[100px] pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 blur-[100px] pointer-events-none" />
                            
                            <div className="relative z-10 space-y-12">
                                <div>
                                    <h3 className="text-[10px] uppercase tracking-[0.4em] font-black text-white/40 mb-3 flex items-center gap-2">
                                        <Activity size={14} className="text-[#C94A2C]" />
                                        Annual Revenue Leak
                                    </h3>
                                    <div className="text-5xl md:text-[64px] font-display font-black tracking-tighter text-[#C94A2C] leading-none mb-4">
                                        {formatCurrency(annualLostRevenue > 0 ? annualLostRevenue : 0)}
                                    </div>
                                    <p className="text-sm font-medium text-white/50 leading-relaxed">
                                        This is the estimated gross revenue you will lose this year simply because prospects don't trust how you look.
                                    </p>
                                </div>

                                <div className="h-px w-full bg-white/10" />

                                <div>
                                    <h3 className="text-[10px] uppercase tracking-[0.4em] font-black text-white/40 mb-3 flex items-center gap-2">
                                        <TrendingUp size={14} className="text-[#C9A66B]" />
                                        3-Year Compounding Advantage
                                    </h3>
                                    <div className="text-4xl md:text-5xl font-display font-black tracking-tighter text-white leading-none mb-4">
                                        {formatCurrency(threeYearCompounding > 0 ? threeYearCompounding : 0)}
                                    </div>
                                    <p className="text-sm font-medium text-white/50 leading-relaxed">
                                        Brand equity compounds. If you fix the leak today, this is the projected value creation over the next 36 months via improved positioning, trust, and pricing power.
                                    </p>
                                </div>

                                <div className="pt-8">
                                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex items-start gap-4 mb-10">
                                        <ShieldCheck size={24} className="text-[#C9A66B] shrink-0" />
                                        <p className="text-xs font-bold text-white/70 leading-relaxed">
                                            The investment to build a ŌDEY brand system is typically less than 5% of what you are losing annually. Think about that.
                                        </p>
                                    </div>
                                    
                                    <a
                                        href="/contact"
                                        className="group w-full bg-[#C94A2C] text-white py-6 px-10 rounded-full font-display text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-[#0D0D0D] transition-colors flex items-center justify-between"
                                    >
                                        Stop The Leak
                                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </main>
            <RedesignFooter />
        </div>
    );
}
