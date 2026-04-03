import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowRight, Zap, Target, Building2 } from "lucide-react";
import RedesignFooter from "@/components/redesign/RedesignFooter";
import { Link } from "react-router-dom";

export default function Solutions() {
    const [source, setSource] = useState<string | null>(null);
    const [selectedAudience, setSelectedAudience] = useState<string | null>(null);

    const handleSelect = (audience: string) => {
        setSelectedAudience(audience);
        setTimeout(() => {
            document.getElementById("tailored-content")?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    const sources = ["Instagram", "Twitter / X", "LinkedIn", "Referral", "Portfolio"];

    return (
        <div className="min-h-screen bg-[#F5F0E8] text-[#0D0D0D] selection:bg-[#C94A2C] selection:text-[#F5F0E8] pt-24 md:pt-40">
            <Helmet>
                <title>Solutions – KŌDĒ | The Drawing Board</title>
                <meta name="description" content="Tailored brand architecture solutions for startup founders, personal brands, and enterprise scale-ups. We build brands that command authority." />
                <link rel="canonical" href="/solutions" />
            </Helmet>

            <main className="container mx-auto px-6 max-w-5xl mb-32">
                
                {/* Intro Selection: How did you hear about KODE? What do you identify as? */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-3xl mb-20"
                >
                    <span className="text-[10px] uppercase tracking-[0.3em] font-black text-[#C94A2C] block mb-6">Client Typology</span>
                    <h1 className="text-5xl md:text-7xl font-display font-medium tracking-tighter leading-[0.9] mb-8">
                        Architecting the <br /> brands of the <span className="text-black/30">next decade.</span>
                    </h1>
                    
                    <AnimatePresence mode="wait">
                        {!source ? (
                            <motion.div 
                                key="source"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <p className="text-[#0D0D0D]/60 text-lg md:text-xl font-medium leading-relaxed">
                                    Before we begin: How did you find your way into the room?
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    {sources.map((s) => (
                                        <button 
                                            key={s}
                                            onClick={() => setSource(s)}
                                            className="px-6 py-3 rounded-full border border-black/10 hover:border-[#C94A2C] hover:text-[#C94A2C] transition-all text-sm font-bold uppercase tracking-widest"
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="audience"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-12"
                            >
                                <p className="text-[#0D0D0D]/60 text-lg md:text-xl font-medium leading-relaxed">
                                    We don't build generic solutions—we write the code to greatness. Tell us what you are building to see the direction.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <button 
                                        onClick={() => handleSelect("founder")}
                                        className={`p-6 rounded-[2rem] text-left transition-all border ${selectedAudience === 'founder' ? 'bg-[#0D0D0D] text-white border-transparent' : 'bg-white border-black/5 hover:border-black/20'}`}
                                    >
                                        <Zap size={24} className={selectedAudience === 'founder' ? 'text-[#C9A66B]' : 'text-[#C94A2C]'} />
                                        <h3 className="font-display font-medium text-xl mt-4 mb-2">Startup Founder</h3>
                                        <p className={`text-sm ${selectedAudience === 'founder' ? 'text-white/60' : 'text-black/50'}`}>Pre-seed to Series A. Raising capital, building initial trust.</p>
                                    </button>
                                    
                                    <button 
                                        onClick={() => handleSelect("personal")}
                                        className={`p-6 rounded-[2rem] text-left transition-all border ${selectedAudience === 'personal' ? 'bg-[#0D0D0D] text-white border-transparent' : 'bg-white border-black/5 hover:border-black/20'}`}
                                    >
                                        <Target size={24} className={selectedAudience === 'personal' ? 'text-[#C9A66B]' : 'text-[#C94A2C]'} />
                                        <h3 className="font-display font-medium text-xl mt-4 mb-2">Personal Brand</h3>
                                        <p className={`text-sm ${selectedAudience === 'personal' ? 'text-white/60' : 'text-black/50'}`}>Executive or creative building individual authority.</p>
                                    </button>
                                    
                                    <button 
                                        onClick={() => handleSelect("enterprise")}
                                        className={`p-6 rounded-[2rem] text-left transition-all border ${selectedAudience === 'enterprise' ? 'bg-[#0D0D0D] text-white border-transparent' : 'bg-white border-black/5 hover:border-black/20'}`}
                                    >
                                        <Building2 size={24} className={selectedAudience === 'enterprise' ? 'text-[#C9A66B]' : 'text-[#C94A2C]'} />
                                        <h3 className="font-display font-medium text-xl mt-4 mb-2">Scale-Up / SME</h3>
                                        <p className={`text-sm ${selectedAudience === 'enterprise' ? 'text-white/60' : 'text-black/50'}`}>Revenue is real, but growth plateaued. Need a full rebrand.</p>
                                    </button>
                                </div>
                                
                                <button 
                                    onClick={() => setSource(null)}
                                    className="text-[9px] font-black uppercase tracking-[0.3em] text-black/30 hover:text-[#C94A2C] transition-colors"
                                >
                                    ← Back to source selection
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Content Section based on Selection */}
                <div id="tailored-content" className="scroll-mt-40">
                    <AnimatePresence mode="wait">
                        {selectedAudience === 'founder' && (
                            <motion.div
                                key="founder"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="bg-white rounded-[3rem] p-10 md:p-16 border border-black/5">
                                    <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tight mb-6">You're building something that matters. Your brand should say so.</h2>
                                    <div className="grid md:grid-cols-2 gap-12">
                                        <div className="space-y-6 text-lg text-black/70">
                                            <p>You have a product, platform, or service you believe in completely. You have raised or are raising. But your current brand is embarrassing you in serious rooms.</p>
                                            <p>A Canva logo or a freelancer-built identity doesn't reflect your ambition. You need a brand that says ‘we are already here’ even before you are.</p>
                                        </div>
                                        <div className="bg-[#fcfaf8] p-8 rounded-3xl border border-black/[0.03]">
                                            <h3 className="font-bold mb-4 uppercase tracking-widest text-[11px] text-[#C94A2C]">Strategic Outcome</h3>
                                            <ul className="space-y-4 text-sm font-medium">
                                                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#3D2C1F]" /> Look as expensive as your valuation.</li>
                                                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#3D2C1F]" /> Pitch decks that naturally command attention.</li>
                                                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#3D2C1F]" /> Foundational identity built to scale to Series C.</li>
                                            </ul>
                                            <Link to="/contact" className="mt-8 group w-full bg-[#0D0D0D] text-white py-4 px-6 rounded-full font-display text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#C94A2C] transition-colors flex items-center justify-between">
                                                Request the Brief
                                                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        
                        {selectedAudience === 'personal' && (
                            <motion.div
                                key="personal"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="bg-[#3D2C1F] text-white rounded-[3rem] p-10 md:p-16">
                                    <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tight mb-6">Build individual authority. Become the destination.</h2>
                                    <div className="grid md:grid-cols-2 gap-12">
                                        <div className="space-y-6 text-lg text-white/70">
                                            <p>You are an executive, a creative, or a specialized founder whose name holds weight. But your digital footprint is fragmented, and you lack the visual sophistication of a premium asset.</p>
                                            <p>We apply the exact same rigorous brand architecture from our enterprise engagements into the **Personal Brand Launcher** — an exclusive, productized program to solidify your authority.</p>
                                        </div>
                                        <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                                            <h3 className="font-bold mb-4 uppercase tracking-widest text-[11px] text-[#C9A66B]">Strategic Outcome</h3>
                                            <ul className="space-y-4 text-sm font-medium">
                                                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#C9A66B]" /> Cohesive digital footprint and media kits.</li>
                                                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#C9A66B]" /> Brand positioning that commands higher speaking fees.</li>
                                                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#C9A66B]" /> A scalable identity to launch future products.</li>
                                            </ul>
                                            <Link to="/personal-brand-launcher" className="mt-8 group w-full bg-[#F5F0E8] text-[#0D0D0D] py-4 px-6 rounded-full font-display text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#C9A66B] transition-colors flex items-center justify-between">
                                                Launch Your Brand
                                                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {selectedAudience === 'enterprise' && (
                            <motion.div
                                key="enterprise"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="bg-white rounded-[3rem] p-10 md:p-16 border-t-4 border-[#C94A2C] shadow-sm">
                                    <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tight mb-6">You've outgrown your identity. Your brand is capping your growth.</h2>
                                    <div className="grid md:grid-cols-2 gap-12">
                                        <div className="space-y-6 text-lg text-black/70">
                                            <p>Your company is 2-7 years old. The revenue is real, but you're embarrassed showing the brand to potential partners and enterprise clients. It looks like where you started, not where you are.</p>
                                            <p>You need a full strategic repositioning without losing your earned equity. You don't need a refresh; you need a system for the next decade.</p>
                                        </div>
                                        <div className="bg-[#F5F0E8] p-8 rounded-3xl border border-black/[0.03]">
                                            <h3 className="font-bold mb-4 uppercase tracking-widest text-[11px] text-[#C94A2C]">Strategic Outcome</h3>
                                            <ul className="space-y-4 text-sm font-medium">
                                                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#3D2C1F]" /> Enterprise-grade brand architecture.</li>
                                                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#3D2C1F]" /> Improved close rates and pricing leverage.</li>
                                                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#3D2C1F]" /> Systems that unify internal culture and external messaging.</li>
                                            </ul>
                                            <Link to="/contact" className="mt-8 group w-full bg-[#C94A2C] text-white py-4 px-6 rounded-full font-display text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#0D0D0D] transition-colors flex items-center justify-between">
                                                Request a Conversation
                                                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
            <RedesignFooter />
        </div>
    );
}
