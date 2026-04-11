import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Mail, Download, ArrowUpRight, Check } from "lucide-react";
import RedesignFooter from "@/components/redesign/RedesignFooter";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const invisibilityCosts = [
    "You explain far more than you should have to in high-stakes meetings.",
    "Opportunities go to people with less experience and significantly better visibility.",
    "Investors and clients search for you and find absolute silence.",
    "Your company's brand dwarfs your own — which inherently makes you replaceable.",
    "You are building a business, but you aren't building a name."
];

const frameworkSteps = [
    { num: "01", title: "The Strategic Audit", desc: "Before you speak, we analyze what the market is currently hearing.", points: ["Current footprint mapping", "Competitor noise analysis"] },
    { num: "02", title: "The Positioning Statement", desc: "The singular, undeniable claim that separates you from generalists.", points: ["Core ambition framing", "The 'Category of One' angle"] },
    { num: "03", title: "The Audience Blueprint", desc: "We don't build for everyone. We build for the people who can elevate you.", points: ["Stakeholder mapping", "Access & engagement strategy"] },
    { num: "04", title: "The Content Architecture", desc: "Stop posting randomly. We build a structured, high-authority thematic engine.", points: ["Core thematic pillars", "The 'Hero' narrative arc"] },
    { num: "05", title: "The Visual Identity Layer", desc: "Editorial-grade visual cues designed to trigger immediate, subconscious trust.", points: ["Premium typographic hierarchy", "Photography art direction"] },
    { num: "06", title: "The Platform Strategy", desc: "Selecting the precise distribution vehicle for your unique talent stack.", points: ["Primary channel dominance", "Format optimization"] },
    { num: "07", title: "The Authority Engine", desc: "Engineering calculated collaborations to skip years of trust-building friction.", points: ["Strategic association mapping", "The 'Borrowed Trust' system"] },
    { num: "08", title: "The 30-Day Launch Sequence", desc: "A day-by-day strategic deployment sequence to launch your new machine.", points: ["The calculated visual reset", "The momentum sustainment protocol"] }
];

type JourneyState = 'invisible' | 'stalled' | 'frozen' | 'starting';

export default function PersonalBrandLauncher() {
    const { toast } = useToast();
    const [heroState, setHeroState] = useState<JourneyState>('invisible');
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const heroCopy = {
        invisible: {
            title: <>Your work speaks for itself. <br/><span className="text-[#C94A2C]">Your brand should too.</span></>,
            desc: "For the founder who has the results but remains the industry's best-kept secret. It's time to build the infrastructure your talent deserves."
        },
        stalled: {
            title: <>Your brand went quiet. <br/><span className="text-[#C94A2C]">Here's how to make it loud again.</span></>,
            desc: "For the executive who had momentum and watched it fade. We diagnostic the silence and re-engineer the authority engine."
        },
        frozen: {
            title: <>Your brand is stuck in 2021. <br/><span className="text-[#C94A2C]">Let's unfreeze it.</span></>,
            desc: "For the leader whose digital footprint no longer matches their real-world seniority. A complete visual and strategic reset."
        },
        starting: {
            title: <>The room is waiting. <br/><span className="text-[#C94A2C]">Walk in ready.</span></>,
            desc: "For the rising star at a career inflection point. Build the authority layer before the opportunity arrives."
        }
    };

    const handleDownload = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            toast({
                title: "Framework Sent",
                description: "The complete Launcher PDF is on its way to your inbox.",
            });
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#F5F0E8] text-[#0D0D0D] selection:bg-[#C94A2C] selection:text-[#F5F0E8] pt-20">
            <Helmet>
                <title>Rebuild Brand Authority | KŌDĒ</title>
                <meta name="description" content="You had momentum, or never built it. The definitive system for turning invisible expertise into undeniable market authority." />
            </Helmet>

            <main>
                {/* Hero Section */}
                <section className="relative pt-12 lg:pt-32 pb-24 lg:pb-32 px-6 overflow-hidden">
                    <div className="container mx-auto max-w-7xl relative z-10">
                        <div className="max-w-4xl flex flex-col items-start space-y-12">
                            {/* Journey Selection Toggle */}
                            <div className="flex flex-col space-y-4">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C94A2C]">Which describes you?</span>
                                <div className="flex flex-wrap bg-black/[0.04] p-1.5 rounded-3xl shadow-inner relative z-20 w-fit">
                                {(['invisible', 'stalled', 'frozen', 'starting'] as JourneyState[]).map((state) => (
                                    <button 
                                        key={state}
                                        onClick={() => setHeroState(state)}
                                        className={cn("py-3 px-6 rounded-full text-[9px] font-black tracking-[0.2em] uppercase transition-all duration-300 relative z-10", 
                                            heroState === state ? "text-white shadow-md shadow-[#C94A2C]/20" : "text-black/40 hover:text-black/80"
                                        )}
                                    >
                                        {heroState === state && <motion.div layoutId="activeBg" className="absolute inset-0 bg-[#C94A2C] rounded-full -z-10" />}
                                        {state}
                                    </button>
                                ))}
                                </div>
                            </div>

                            {/* Interactive Headline - ALIGNED LEFT, STABLE */}
                            <div className="relative min-h-[160px] lg:min-h-[200px] w-full">
                                <AnimatePresence mode="wait">
                                    <motion.h1 
                                        key={heroState}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        className="text-5xl lg:text-[72px] font-display font-medium tracking-[-0.05em] leading-[0.85] text-[#0D0D0D] absolute top-0 left-0 max-w-3xl"
                                    >
                                        {heroCopy[heroState].title}
                                    </motion.h1>
                                </AnimatePresence>
                            </div>

                            <motion.p 
                                key={`p-${heroState}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-xl lg:text-2xl text-[#3D2C1F]/70 font-medium max-w-2xl tracking-tight leading-relaxed"
                            >
                                {heroCopy[heroState].desc}
                            </motion.p>
                        </div>
                    </div>

                    {/* Warm Editorial Image Background (Abs positioned behind) */}
                    <div className="absolute inset-x-6 lg:inset-x-12 bottom-0 top-[40%] rounded-t-[3rem] overflow-hidden -z-10 mix-blend-multiply opacity-[0.15]">
                         <img src="/placeholder.svg" alt="Editorial background" className="w-full h-full object-cover" />
                         <div className="absolute inset-0 bg-gradient-to-t from-[#F5F0E8] via-transparent to-transparent" />
                    </div>
                </section>

                {/* Section 1: The Cost of Invisibility */}
                <section className="py-24 lg:py-32 bg-white rounded-[3rem] lg:rounded-[4rem] mx-4 lg:mx-8 px-6 lg:px-20 border border-black/5 shadow-sm">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 lg:gap-24 items-start">
                        <div className="md:w-5/12 sticky top-32">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C94A2C] block mb-4">The Reality</span>
                            <h2 className="text-4xl lg:text-[64px] font-display font-medium tracking-[-0.05em] leading-[0.9] text-[#0D0D0D] mb-6">
                                The cost of <br className="hidden lg:block"/>invisibility.
                            </h2>
                            <p className="text-xl text-black/50 font-medium tracking-tight">
                                This isn't about vanity. It's about leverage. When your brand is absent, you pay the tax in every interaction.
                            </p>
                        </div>
                        
                        <div className="md:w-7/12 space-y-4">
                            {invisibilityCosts.map((cost, idx) => (
                                <motion.div 
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    key={idx} 
                                    className="bg-[#F5F0E8]/50 border border-black/5 rounded-[3rem] p-8 flex items-start gap-6 group hover:bg-[#F5F0E8] transition-colors"
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#C94A2C] shrink-0 mt-3 group-hover:scale-150 transition-transform" />
                                    <h4 className="text-[19px] lg:text-[22px] font-display font-medium tracking-[-0.03em] text-[#0D0D0D] leading-snug">
                                        {cost}
                                    </h4>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Section 2: The Personal Brand Launcher Framework */}
                <section className="py-32 lg:py-40 container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-20 max-w-3xl mx-auto">
                        <h2 className="text-4xl lg:text-6xl font-display font-medium tracking-[-0.05em] mb-6">The Launcher Framework</h2>
                        <p className="text-xl text-black/50 font-medium tracking-tight">
                            The exact 8-part strategic blueprint we use internally to architect undeniable market authority. Laid out completely transparently.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                        {frameworkSteps.map((step, idx) => (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: idx * 0.05 }}
                                key={idx} 
                                className="bg-white rounded-[3rem] p-8 border border-black/[0.04] flex flex-col h-full hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] transition-all group"
                            >
                                <span className="text-[10px] font-black tracking-[0.2em] text-[#C9A66B] mb-6 block">PHASE {step.num}</span>
                                <h3 className="text-2xl font-display font-medium tracking-[-0.03em] mb-3 text-[#0D0D0D] group-hover:text-[#C94A2C] transition-colors">{step.title}</h3>
                                <p className="text-sm font-medium text-black/50 tracking-tight leading-relaxed mb-8 flex-grow">{step.desc}</p>
                                
                                <div className="space-y-3 mt-auto pt-6 border-t border-black/5">
                                    {step.points.map((point, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <div className="w-4 h-4 rounded-full bg-[#E8E4DE] flex items-center justify-center shrink-0 mt-0.5">
                                                <Check size={10} className="text-[#3D2C1F]" strokeWidth={3} />
                                            </div>
                                            <span className="text-xs font-bold text-black/70 tracking-tight">{point}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Section 3: The PDF Offer (Email Capture) */}
                <section className="bg-[#0D0D0D] text-white py-24 lg:py-32 relative overflow-hidden rounded-[3rem] lg:rounded-[5rem] mx-4 lg:mx-8 mb-12 shadow-2xl">
                    <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay">
                         <img src="/placeholder.svg" className="w-full h-full object-cover" alt="Texture" />
                    </div>
                    
                    <div className="container mx-auto px-6 max-w-6xl relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                        <div className="w-full lg:w-1/2">
                            <motion.div 
                                initial={{ opacity: 0, rotateY: -20, x: -40 }}
                                whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="aspect-[3/4] w-full max-w-md mx-auto bg-white rounded-[3rem] p-2 shadow-2xl relative"
                                style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
                            >
                                <img src="/placeholder.svg" alt="PDF Cover" className="w-full h-full object-cover rounded-[2.5rem] grayscale" />
                                <div className="absolute top-12 left-12 right-12 text-black mix-blend-difference">
                                    <p className="text-[10px] font-black tracking-widest uppercase mb-4">Framework V2.0</p>
                                    <h3 className="text-5xl font-display font-medium tracking-tighter leading-none">The Brand <br/>Launcher.</h3>
                                </div>
                                <div className="absolute -right-12 top-1/4 w-48 h-48 bg-[#C94A2C] blur-[100px] opacity-40 mix-blend-screen -z-10" />
                            </motion.div>
                        </div>

                        <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
                            <h2 className="text-4xl lg:text-[64px] font-display font-medium tracking-[-0.05em] leading-[0.9]">Take the full <br/>framework with you.</h2>
                            <p className="text-xl text-white/50 font-medium tracking-tight max-w-md mx-auto lg:mx-0">
                                Enter your email below to receive the complete, print-ready strategic architecture PDF.
                            </p>

                            {!isSuccess ? (
                                <form onSubmit={handleDownload} className="space-y-4 max-w-md mx-auto lg:mx-0 pt-4">
                                    <div className="relative">
                                        <input 
                                            type="email" 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            placeholder="founder@company.com"
                                            className="w-full h-16 bg-white/5 border border-white/10 rounded-full pl-8 pr-32 focus:outline-none focus:border-[#C9A66B] focus:bg-white/10 transition-all text-white font-medium placeholder:text-white/20"
                                        />
                                        <button 
                                            type="submit" 
                                            disabled={isSubmitting}
                                            className="absolute right-2 top-2 bottom-2 bg-white text-[#0D0D0D] px-8 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#C9A66B] transition-colors flex items-center justify-center disabled:opacity-50"
                                        >
                                            {isSubmitting ? "Sending..." : "Send it"}
                                        </button>
                                    </div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 flex items-center justify-center lg:justify-start gap-2">
                                        <Check size={12} /> No weekly emails. No spam. Yours to keep.
                                    </p>
                                </form>
                            ) : (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-white/5 border border-green-500/30 rounded-[3rem] p-10 max-w-md mx-auto lg:mx-0 text-center"
                                >
                                    <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto mb-6">
                                        <Check size={32} />
                                    </div>
                                    <h4 className="text-2xl font-display font-medium tracking-tight mb-2">Transmission Secured</h4>
                                    <p className="text-base text-white/60 font-medium">The framework has been routed to your inbox. Check your spam if it doesn't arrive shortly.</p>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Section 4: Hand-off / Up-sell */}
                <section className="py-24 lg:py-32 bg-[#E8E4DE] text-[#0D0D0D]">
                    <div className="container mx-auto px-6 max-w-6xl">
                        <div className="text-center mb-16">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C94A2C] block mb-4">The Implementation</span>
                            <h2 className="text-4xl lg:text-[56px] font-display font-medium tracking-[-0.05em] leading-[0.9]">
                                The framework works. <br/>But a partner compounds faster.
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            {/* Option 1: The Productized Sprint */}
                            <div className="bg-white rounded-[2.5rem] p-10 lg:p-12 border border-black/5 flex flex-col justify-between group hover:shadow-xl transition-shadow relative overflow-hidden">
                                <div className="absolute top-0 right-0 bg-[#C9A66B] text-white text-[9px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-bl-2xl">Studio Engagement</div>
                                <div>
                                    <h3 className="text-3xl font-display font-medium tracking-[-0.04em] mb-4">Personal Brand Sprint</h3>
                                    <p className="text-base text-black/60 font-medium tracking-tight mb-8">
                                        We execute the entire 8-part framework for you. You get the positioning, the strategy, the visual layer, and the rollout sequence handed to you fully cooked.
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3D2C1F]/40 mb-1">Starting At</p>
                                    <p className="text-2xl font-display font-medium tracking-tight mb-8">₦2.5M <span className="text-base text-black/30 font-sans tracking-normal">/ typically 4 weeks</span></p>
                                    <a href="/contact?plan=Personal Brand Sprint" className="w-full bg-[#0D0D0D] text-white py-5 rounded-full text-center text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#C9A66B] transition-colors block">
                                        Request the Brief
                                    </a>
                                </div>
                            </div>

                            {/* Option 2: The Call */}
                            <div className="bg-[#D9C5B2] rounded-[2.5rem] p-10 lg:p-12 border border-black/5 flex flex-col justify-between group hover:bg-[#C9A66B] hover:text-white transition-colors">
                                <div>
                                    <h3 className="text-3xl font-display font-medium tracking-[-0.04em] mb-4">Strategic Brand Call</h3>
                                    <p className="text-base text-[#3D2C1F]/70 group-hover:text-white/80 font-medium tracking-tight mb-8 transition-colors">
                                        Not sure what you need? Let's spend 20 minutes dissecting your current digital footprint and figuring out exactly where the friction lies.
                                    </p>
                                </div>
                                <div className="mt-auto pt-8">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-1">Investment</p>
                                    <p className="text-2xl font-display font-medium tracking-tight mb-8">Complimentary</p>
                                    <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" className="w-full bg-white text-[#0D0D0D] py-5 rounded-full text-center text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors block shadow-sm">
                                        Book 20 Minutes
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 5: Authority Proof */}
                <section className="py-24 lg:py-32 container mx-auto px-6 max-w-5xl">
                    <div className="text-center mb-16">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C94A2C] block mb-4">The Impact</span>
                        <h2 className="text-4xl font-display font-medium tracking-[-0.04em]">From invisible to undeniable.</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-[3rem] p-10 lg:p-12 border border-black/[0.04] relative">
                            <svg className="absolute top-10 left-10 w-8 h-8 text-[#C9A66B]/20" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                            <p className="text-xl lg:text-2xl font-display font-medium tracking-tight leading-snug text-[#0D0D0D] mb-8 relative z-10 pt-4">
                                "Before working with KŌDĒ I was posting without a strategy. Now I have an undeniable brand that people actually recognize in the boardroom."
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden bg-[#F5F0E8] border border-black/5">
                                    <img src="/placeholder.svg" alt="Founder" className="w-full h-full object-cover grayscale" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#0D0D0D]">Tech Founder</p>
                                    <p className="text-[10px] font-black tracking-widest text-black/40">Lagos, NG</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-[3rem] p-10 lg:p-12 border border-black/[0.04] relative">
                            <svg className="absolute top-10 left-10 w-8 h-8 text-[#C9A66B]/20" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                            <p className="text-xl lg:text-2xl font-display font-medium tracking-tight leading-snug text-[#0D0D0D] mb-8 relative z-10 pt-4">
                                "The positioning statement alone changed how I introduce myself to investors. The clarity was immediate."
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden bg-[#F5F0E8] border border-black/5">
                                    <img src="/placeholder.svg" alt="Executive" className="w-full h-full object-cover grayscale" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#0D0D0D]">Creative Executive</p>
                                    <p className="text-[10px] font-black tracking-widest text-black/40">London, UK</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <RedesignFooter />
        </div>
    );
}
