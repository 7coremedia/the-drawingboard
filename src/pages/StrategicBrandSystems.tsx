import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Check, X, ArrowRight } from "lucide-react";
import RedesignFooter from "@/components/redesign/RedesignFooter";
import { cn } from "@/lib/utils";

const systemSteps = [
    {
        num: "1",
        title: "Brand Strategy & Positioning",
        desc: "The foundation of everything. We define who you are, what you own in the minds of your audience, and why it matters.",
        list: ["Brand Positioning Document", "The Core Narrative", "Target Audience Architecture"]
    },
    {
        num: "2",
        title: "Visual Identity System",
        desc: "Commanding attention without saying a word. A design language built to be unmistakable.",
        list: ["Primary & Secondary Marks", "Editorial Typography", "Art Direction Guidelines"]
    },
    {
        num: "3",
        title: "Brand Voice & Messaging",
        desc: "The tone and cadence of your authority. We craft how you speak, write, and persuade.",
        list: ["Tone of Voice Framework", "Core Messaging Pillars", "Elevator Pitch & Bios"]
    },
    {
        num: "4",
        title: "Digital Brand Architecture",
        desc: "Deployment into the digital world. Websites and structural digital systems that convert.",
        list: ["Web UI Prototype", "Social Grid Systems", "Digital Pitch Decks"]
    },
    {
        num: "5",
        title: "Launch & Rollout",
        desc: "Going to market. We architect the sequence in which the world experiences your new identity.",
        list: ["Rollout Strategy", "Teaser Campaigns", "Announcement Assets"]
    },
    {
        num: "6",
        title: "Brand Governance",
        desc: "The rules that keep it consistent long after we leave. Your internal playbook.",
        list: ["The Brand Bible", "Asset Management System", "Internal Training Guide"]
    }
];

const tiers = [
    { name: "Brand Foundation", price: "₦3.5M", highlight: false, includes: [true, true, true, false, false, false] },
    { name: "Brand Architecture", price: "₦5.0M", highlight: true, includes: [true, true, true, true, false, true] },
    { name: "Brand Elevation", price: "₦8.5M+", highlight: false, includes: [true, true, true, true, true, true] }
];

const features = [
    { name: "Brand Strategy & Positioning" },
    { name: "Visual Identity System" },
    { name: "Brand Voice & Messaging" },
    { name: "Digital Brand Architecture" },
    { name: "Go-to-Market Launch" },
    { name: "Detailed Brand Governance" }
];

export default function StrategicBrandSystems() {
    return (
        <div className="min-h-screen bg-[#F5F0E8] text-[#0D0D0D] selection:bg-[#C94A2C] selection:text-[#F5F0E8] pt-20">
            <Helmet>
                <title>Strategic Brand Systems | ŌDEY</title>
                <meta name="description" content="We design full-spectrum brand ecosystems. The full architecture of a brand, not just the visible parts." />
            </Helmet>

            <main className="container mx-auto px-6 max-w-7xl">
                
                {/* Hero / AG1 Product Style - SWAPPED: Text Left, Image Right */}
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center lg:items-center pt-10 lg:pt-20 pb-24">
                    {/* Left: Pitch */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="w-full lg:w-[45%] flex flex-col justify-center space-y-8"
                    >
                        <div className="flex gap-3">
                            <span className="bg-[#C9A66B]/20 text-[#3D2C1F] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-sm">Premium Engagement</span>
                            <span className="bg-[#E8E4DE] text-[#0D0D0D]/50 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em]">No Templates</span>
                        </div>
                        
                        <h1 className="text-5xl lg:text-[72px] font-display font-medium tracking-[-0.05em] text-[#0D0D0D] leading-[0.85]">
                            Most brands are built backwards. <br/><span className="text-[#C94A2C] block mt-2">We don't.</span>
                        </h1>

                        <p className="text-xl lg:text-2xl text-[#3D2C1F]/70 font-medium leading-relaxed tracking-tight">
                            The full architecture of a brand, not just the visible parts.
                        </p>

                        <ul className="space-y-4 pb-4">
                            {[
                                "Fully integrated strategy and design system",
                                "Engineered to command outsized market authority",
                                "Built to travel across borders and boardrooms"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-4 text-base lg:text-lg font-medium text-black/80 tracking-tight">
                                    <div className="w-2 h-2 mt-2.5 rounded-full bg-[#C9A66B] shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <div className="space-y-4">
                            <a href="#intake" className="block w-full bg-[#0D0D0D] text-white py-5 lg:py-6 rounded-full text-center text-[11px] lg:text-[13px] font-black uppercase tracking-[0.3em] hover:bg-[#C9A66B] hover:text-[#0D0D0D] transition-all duration-300 shadow-xl">
                                Request the Brief
                            </a>
                            <p className="text-center text-xs font-black uppercase tracking-[0.3em] text-black/40 underline decoration-black/20 underline-offset-4 pt-2">Typical timeline: 6—8 weeks</p>
                        </div>
                    </motion.div>

                    {/* Right: Product Viz */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full lg:w-[55%] bg-[#D9C5B2] rounded-[3rem] relative overflow-hidden aspect-square lg:aspect-[4/3] flex items-center justify-center border border-black/5"
                    >
                        <img src="/placeholder.svg" alt="Brand System" className="w-full h-full object-cover mix-blend-multiply opacity-60" />
                        
                        {/* Decorative seals */}
                        <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 w-24 h-24 lg:w-32 lg:h-32 border border-[#3D2C1F]/20 rounded-full flex flex-col items-center justify-center bg-white/20 backdrop-blur-md shadow-xl text-[#3D2C1F]">
                            <span className="text-[8px] lg:text-[10px] font-black uppercase text-center tracking-[0.3em]">ŌDEY<br/>Certified</span>
                            <div className="w-full h-px bg-[#3D2C1F]/20 my-1 lg:my-2 w-1/2" />
                            <span className="text-[8px] font-bold uppercase tracking-[0.3em] opacity-60">System</span>
                        </div>
                    </motion.div>
                </div>

                {/* Section 1: The Problem */}
                <div className="py-24 lg:py-32 border-t border-black/[0.03]">
                    <div className="mb-16">
                        <h2 className="text-4xl lg:text-6xl font-display font-medium tracking-[-0.04em] mb-4 text-center mx-auto max-w-4xl">The cost of building without a system.</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Fragmented messaging", desc: "You sound like five different companies depending on the platform." },
                            { title: "Visuals that don't travel", desc: "Your identity works on Instagram but falls apart in a boardroom." },
                            { title: "Authority erosion", desc: "You are constantly having to prove your competence instead of letting your reputation precede you." },
                            { title: "Pitch decks that embarrass", desc: "Your visual layer screams 'we just started' when you are actually scaling." }
                        ].map((item, i) => (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                key={i} className="bg-white rounded-[2.5rem] p-8 border border-black/[0.03] flex flex-col hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all duration-500"
                            >
                                <div className="bg-[#F5F0E8] w-full aspect-[4/3] rounded-[1.5rem] mb-8 flex items-center justify-center overflow-hidden border border-black/[0.02]">
                                    <img src="/placeholder.svg" alt="Illustration" className="w-full h-full object-cover mix-blend-multiply opacity-60 transition-transform duration-700 group-hover:scale-110" />
                                </div>
                                <h3 className="text-2xl font-display font-medium tracking-[-0.05em] mb-3 text-[#0D0D0D]">{item.title}</h3>
                                <p className="text-black/50 font-medium leading-relaxed tracking-tight">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Section 2: The System */}
                <div className="py-24 lg:py-32">
                    <div className="bg-white rounded-[3rem] px-6 py-12 lg:p-20 border border-black/[0.04] shadow-sm">
                        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                            <div className="lg:w-5/12">
                                <div className="sticky top-32">
                                    <div className="bg-[#E8E4DE] rounded-[3.5rem] aspect-[4/5] flex items-center justify-center overflow-hidden relative border border-black/[0.04]">
                                        <img src="/placeholder.svg" alt="Architecture" className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-60" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                    </div>
                                </div>
                            </div>
                            <div className="lg:w-7/12 space-y-16 lg:py-6">
                                {systemSteps.map((step, i) => (
                                    <motion.div 
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.6 }}
                                        key={i} className="flex gap-6 lg:gap-10 group"
                                    >
                                        <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-[#E8E4DE] text-[#3D2C1F] group-hover:bg-[#C9A66B] group-hover:text-white transition-colors flex items-center justify-center font-display font-medium text-2xl lg:text-3xl shrink-0 mt-1">
                                            {step.num}
                                        </div>
                                        <div>
                                            <h3 className="text-3xl lg:text-[40px] font-display font-medium tracking-[-0.05em] mb-4 text-[#0D0D0D] leading-[1.1]">{step.title}</h3>
                                            <p className="text-lg text-black/60 font-medium mb-8 leading-relaxed max-w-lg tracking-tight">{step.desc}</p>
                                            <ul className="space-y-4 relative before:absolute before:left-2.5 before:top-4 before:bottom-4 before:w-px before:bg-black/10">
                                                {step.list.map((l, j) => (
                                                    <li key={j} className="flex items-center gap-6 text-sm lg:text-base font-bold text-[#3D2C1F] relative tracking-tight">
                                                    <div className="w-5 h-5 rounded-full bg-white border border-[#C9A66B] flex items-center justify-center z-10 shrink-0">
                                                        <Check size={12} className="text-[#C9A66B]" strokeWidth={3} /> 
                                                    </div>
                                                    {l}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 3: The Evidence */}
                <div className="py-24 lg:py-32">
                    <div className="text-center mb-20 max-w-3xl mx-auto">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C94A2C] block mb-6">The Evidence</span>
                        <h2 className="text-4xl lg:text-6xl font-display font-medium tracking-[-0.05em] mb-6">Transformations</h2>
                        <p className="text-xl lg:text-2xl text-black/50 font-medium">Real outcomes from our clinical brand architecture.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        {[
                            { problem: "Stagnant Series A positioning.", outcome: "Closed enterprise pipeline within 60 days of rebrand." },
                            { problem: "Founder identity overpowered the company.", outcome: "Created unified ecosystem bridging personal and corporate trust." },
                            { problem: "International expansion roadblocks.", outcome: "Built global-grade visual language securing UK market entry." }
                        ].map((item, i) => (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.1 }}
                                key={i} className="space-y-8"
                            >
                                <div className="bg-white rounded-[3rem] aspect-[4/5] overflow-hidden border border-black/[0.04] flex flex-col items-center justify-center relative group">
                                    <div className="absolute inset-0 bg-[#E8E4DE] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <img src="/placeholder.svg" alt="Case Study" className="w-full h-full object-cover mix-blend-multiply relative z-10 opacity-70 group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute bottom-6 bg-white/80 backdrop-blur-md px-6 py-3 rounded-full text-[10px] font-black tracking-[0.3em] uppercase z-10 shadow-sm border border-black/5 text-[#3D2C1F]">Confidential Client</div>
                                </div>
                                <div className="space-y-6 px-4">
                                    <div>
                                        <span className="text-[10px] uppercase font-black tracking-[0.3em] text-black/40 block mb-2">Business Problem</span>
                                        <p className="text-base font-bold text-[#0D0D0D]/80 leading-relaxed tracking-tight">{item.problem}</p>
                                    </div>
                                    <div className="w-full h-px bg-black/10" />
                                    <div>
                                        <span className="text-[10px] uppercase font-black tracking-[0.3em] text-[#C9A66B] block mb-2">Architected Outcome</span>
                                        <h4 className="text-xl lg:text-2xl font-display font-medium tracking-[-0.03em] leading-tight text-[#3D2C1F]">{item.outcome}</h4>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Section 4: The Investment Table */}
                <div className="py-24 lg:py-32">
                    <div className="mb-16 md:flex md:items-end md:justify-between text-center md:text-left gap-8">
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C94A2C] block mb-4">The Investment</span>
                            <h2 className="text-4xl lg:text-6xl font-display font-medium tracking-[-0.04em]">Transparent Tiers</h2>
                        </div>
                        <p className="text-xl text-black/50 font-medium max-w-md mx-auto md:mx-0 mt-4 md:mt-0">Confidence in our product means absolute transparency in our pricing.</p>
                    </div>

                    <div className="bg-white rounded-[2rem] lg:rounded-[3rem] border border-black/[0.04] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.02)]">
                        <div className="w-full overflow-x-auto custom-scrollbar">
                            <div className="min-w-[800px]">
                                {/* Header Row */}
                                <div className="grid grid-cols-4 border-b border-black/[0.04]">
                                    <div className="col-span-1 p-8 lg:p-10 bg-[#FAFAFA] flex items-end border-r border-black/[0.04]">
                                        <span className="text-sm font-bold text-black/40 uppercase tracking-[0.2em]">Deliverables</span>
                                    </div>
                                    {tiers.map((tier, i) => (
                                        <div key={i} className={cn("col-span-1 p-8 lg:p-10 border-r border-black/[0.04] last:border-r-0 flex flex-col justify-between", tier.highlight ? "bg-[#FFF9F2]" : "bg-white")}>
                                            <div>
                                                <h3 className="text-2xl lg:text-3xl font-display font-medium tracking-[-0.05em] text-[#0D0D0D] leading-[1.1]">{tier.name}</h3>
                                                {tier.highlight && <span className="inline-block mt-3 bg-[#C94A2C] text-white text-[9px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded-full">Most Selected</span>}
                                            </div>
                                            <div className="mt-8">
                                                <p className="text-[#3D2C1F] font-medium text-xs lg:text-sm mb-1 opacity-60 tracking-tight">Engagement starts at</p>
                                                <p className="text-[#C9A66B] font-display font-medium text-3xl lg:text-4xl tracking-tight">{tier.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Features Rows */}
                                {features.map((feature, i) => (
                                    <div key={i} className="grid grid-cols-4 border-b border-black/[0.04] last:border-b-0 hover:bg-black/[0.01] transition-colors">
                                        <div className="col-span-1 p-6 lg:px-10 lg:py-8 font-bold text-sm lg:text-base text-[#0D0D0D]/80 flex items-center border-r border-black/[0.04] bg-[#FAFAFA]/50 tracking-tight">
                                            {feature.name}
                                        </div>
                                        {tiers.map((tier, j) => (
                                            <div key={j} className={cn("col-span-1 flex items-center justify-center p-6 lg:py-8 border-r border-black/[0.04] last:border-r-0", tier.highlight ? "bg-[#FFF9F2]/50" : "bg-transparent")}>
                                                {tier.includes[i] ? (
                                                    <div className="w-8 h-8 rounded-full bg-[#C9A66B] text-white flex items-center justify-center shadow-sm">
                                                        <Check size={16} strokeWidth={3} />
                                                    </div>
                                                ) : (
                                                    <div className="w-8 h-8 rounded-full bg-black/5 text-black/20 flex items-center justify-center">
                                                        <X size={16} strokeWidth={3} />
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 5: The Intake Flow - Using Standard Contact Form Logic */}
                <div id="intake" className="py-24 lg:py-32">
                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-6xl mx-auto rounded-[3.5rem] bg-white p-8 md:p-24 shadow-[0_60px_120px_-30px_rgba(0,0,0,0.06)] border border-black/[0.03] mb-40"
                    >
                        <div className="text-center mb-16">
                            <h2 className="text-4xl lg:text-6xl font-display font-medium tracking-[-0.05em] mb-6 leading-[0.9] text-[#0D0D0D]">Ready to build something that lasts?</h2>
                            <p className="text-xl lg:text-2xl text-black/40 font-medium">Provide the context below. We will handle the architecture.</p>
                        </div>

                        {/* Reusing Contact Page Logic for Consistency */}
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            const name = formData.get('name');
                            const email = formData.get('email');
                            const message = formData.get('message');
                            const budget = formData.get('budget');
                            const stage = formData.get('stage');

                            const fullMessage = `Hi — I'm interested in the Strategic Brand Systems engagement.\n\nName: ${name}\nEmail: ${email}\nStage: ${stage}\nBudget Tier: ${budget}\n\nObjectives: ${message}`;
                            const encoded = encodeURIComponent(fullMessage);
                            window.open(`https://wa.me/2348160891799?text=${encoded}`, '_blank');
                        }} className="space-y-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-4">
                                    <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#0D0D0D]/30">Full Name</label>
                                    <input name="name" required className="rounded-2xl bg-[#F5F0E8]/50 border-black/[0.05] text-[#0D0D0D] h-16 w-full focus:ring-1 focus:ring-[#C94A2C] transition-all px-6 text-lg font-medium" placeholder="John Doe" />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#0D0D0D]/30">Email Address</label>
                                    <input name="email" type="email" required className="rounded-2xl bg-[#F5F0E8]/50 border-black/[0.05] text-[#0D0D0D] h-16 w-full focus:ring-1 focus:ring-[#C94A2C] transition-all px-6 text-lg font-medium" placeholder="protocol@brand.com" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-4">
                                    <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#0D0D0D]/30">What stage are you at?</label>
                                    <select name="stage" className="rounded-2xl bg-[#F5F0E8]/50 border-black/[0.05] text-[#0D0D0D] h-16 w-full focus:ring-1 focus:ring-[#C94A2C] transition-all px-6 text-lg font-medium appearance-none">
                                        <option>Pre-Seed / Seed</option>
                                        <option>Series A / B</option>
                                        <option>Scale-up / Enterprise</option>
                                    </select>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#0D0D0D]/30">Budget Tier</label>
                                    <select name="budget" className="rounded-2xl bg-[#F5F0E8]/50 border-black/[0.05] text-[#0D0D0D] h-16 w-full focus:ring-1 focus:ring-[#C94A2C] transition-all px-6 text-lg font-medium appearance-none">
                                        <option>₦3.5M — ₦5.0M</option>
                                        <option>₦5.0M — ₦8.5M</option>
                                        <option>₦8.5M+</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#0D0D0D]/30">What are you trying to achieve?</label>
                                <textarea name="message" rows={5} required className="rounded-[2rem] bg-[#F5F0E8]/50 border-black/[0.05] text-[#0D0D0D] w-full focus:ring-1 focus:ring-[#C94A2C] transition-all px-6 py-6 text-lg font-medium resize-none" placeholder="Describe the business problem..."></textarea>
                            </div>

                            <div className="flex flex-col items-center gap-8 pt-4">
                                <button type="submit" className="w-full md:w-auto rounded-full px-16 py-7 h-auto bg-[#0D0D0D] text-white font-display font-bold text-[10px] tracking-[0.3em] uppercase hover:scale-105 active:scale-95 transition-all shadow-xl">
                                    Submit Project Brief
                                </button>
                                <div className="text-center">
                                    <p className="text-black/30 text-[9px] font-bold uppercase tracking-[0.4em] mb-4">Prefer to move faster?</p>
                                    <a href="https://wa.me/2348160891799" target="_blank" rel="noopener noreferrer" className="text-[#C94A2C] font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-2 group">
                                        Message Us on WhatsApp <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        </form>
                    </motion.div>
                </div>

            </main>
            <RedesignFooter />
        </div>
    );
}
