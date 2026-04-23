import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import RedesignFooter from "@/components/redesign/RedesignFooter";
import { cn } from "@/lib/utils";

const tracks = [
    {
        id: "athlete",
        label: "The Talent",
        headline: <>You're the product.<br /><span className="text-[#C94A2C]">Look like it.</span></>,
        sub: "Athletes. Artists. Entertainers. Your name is the asset. We build the architecture around it.",
        accent: "#C9A66B",
    },
    {
        id: "creator",
        label: "The Creator",
        headline: <>Millions watch.<br /><span className="text-[#C94A2C]">Few remember.</span></>,
        sub: "Reach without brand equity is noise. We convert your platform into an undeniable identity.",
        accent: "#0D0D0D",
    },
    {
        id: "executive",
        label: "The Executive",
        headline: <>The title is yours.<br /><span className="text-[#C94A2C]">The name should be too.</span></>,
        sub: "Your company has a brand. You need one that travels independent of it.",
        accent: "#3D2C1F",
    },
];

const deliverables = [
    { num: "01", title: "Name Audit & Positioning", desc: "We establish exactly what your name means in the market — and what it needs to mean." },
    { num: "02", title: "Visual Identity System", desc: "A custom typographic and visual language that reads premium across every surface." },
    { num: "03", title: "Brand Voice Architecture", desc: "The tone, cadence, and vocabulary that makes your presence unmistakable." },
    { num: "04", title: "Platform Strategy", desc: "The precise digital ecosystem that amplifies you — not just where you post, but how." },
    { num: "05", title: "Press & Authority Layer", desc: "Editorial positioning strategy for press, speaking, and public-facing recognition." },
    { num: "06", title: "The Rollout Sequence", desc: "A calculated launch plan that creates attention, not just awareness." },
];

const stats = [
    { number: "3×", label: "Average authority lift within 90 days" },
    { number: "₦2.5B+", label: "In deals closed through brand-credentialed clients" },
    { number: "6wks", label: "Typical delivery timeline" },
];

export default function Superstars() {
    const [activeTrack, setActiveTrack] = useState(0);

    return (
        <div className="min-h-screen bg-[#0D0D0D] text-white selection:bg-[#C94A2C] selection:text-white">
            <Helmet>
                <title>Scale Your Presence | ŌDEY</title>
                <meta name="description" content="For the talent, creator, and executive who needs a name that commands rooms before they enter them. ŌDEY builds the brand infrastructure behind superstars." />
            </Helmet>

            <main>
                {/* ── HERO ── Full-bleed, editorial, image-led */}
                {/* pt accounts for: announcement banner (~56px) + navbar (~80px) + breathing room */}
                <section className="relative min-h-screen flex flex-col justify-end pb-16 lg:pb-32 overflow-hidden pt-[160px] lg:pt-[180px]">
                    {/* Background editorial image grid */}
                    <div className="absolute inset-0 grid grid-cols-3 gap-px pointer-events-none">
                        <div className="bg-[#141414] relative overflow-hidden">
                            <img src="/Superstar page/The-Talent.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-luminosity scale-110" />
                        </div>
                        <div className="bg-[#1a1a1a] relative overflow-hidden">
                            <img src="/Superstar page/The-Creator.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity" />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0D0D0D]" />
                        </div>
                        <div className="bg-[#111] relative overflow-hidden">
                            <img src="/Superstar page/The-Executive.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-luminosity scale-110" />
                        </div>
                    </div>

                    {/* Gradient vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/80 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D]/60 via-transparent to-[#0D0D0D]/60 pointer-events-none" />

                    <div className="relative z-10 container mx-auto px-6 max-w-7xl">
                        {/* Track Selector — mobile-safe, wraps cleanly */}
                        <div className="flex flex-col mb-10">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C94A2C] mb-4">Which describes you?</span>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="flex flex-wrap gap-2"
                            >
                            {tracks.map((t, i) => (
                                <button
                                    key={t.id}
                                    onClick={() => setActiveTrack(i)}
                                    className={cn(
                                        "px-4 py-2 rounded-full text-[9px] md:text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-300 border",
                                        activeTrack === i
                                            ? "bg-[#C94A2C] border-[#C94A2C] text-white shadow-lg shadow-[#C94A2C]/30"
                                            : "bg-white/5 border-white/10 text-white/40 hover:text-white/70 hover:border-white/20"
                                    )}
                                >
                                    {t.label}
                                </button>
                            ))}
                        </motion.div>
                        </div>

                        {/* Hero headline — scales on mobile */}
                        <div className="relative min-h-[160px] md:min-h-[220px] lg:min-h-[280px] mb-8">
                            <AnimatePresence mode="wait">
                                <motion.h1
                                    key={activeTrack}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    className="text-[44px] md:text-[64px] lg:text-[96px] font-display font-medium tracking-[-0.05em] lg:tracking-[-0.06em] leading-[0.84] absolute top-0 left-0 max-w-4xl"
                                >
                                    {tracks[activeTrack].headline}
                                </motion.h1>
                            </AnimatePresence>
                        </div>

                        {/* Sub */}
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={`sub-${activeTrack}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-lg lg:text-2xl text-white/50 font-medium max-w-xl tracking-tight leading-relaxed mb-12"
                            >
                                {tracks[activeTrack].sub}
                            </motion.p>
                        </AnimatePresence>

                        {/* CTAs */}
                        <div className="flex flex-wrap gap-4 items-center">
                            <a
                                href="#intake"
                                className="group flex items-center gap-3 bg-white text-[#0D0D0D] rounded-full pl-8 pr-6 py-5 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-[#C94A2C] hover:text-white transition-all duration-300 shadow-2xl"
                            >
                                Start Your Brief
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a
                                href="/portfolio"
                                className="text-white/40 text-[11px] font-black uppercase tracking-[0.3em] hover:text-white transition-colors"
                            >
                                See the work →
                            </a>
                        </div>
                    </div>
                </section>

                {/* ── STATS BAR ── Nike-style stark numbers */}
                <section className="border-y border-white/[0.06] py-12 lg:py-16">
                    <div className="container mx-auto px-6 max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-white/[0.06]">
                        {stats.map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                className="flex flex-col items-center text-center py-6 md:py-0 md:px-12"
                            >
                                <span className="text-[56px] lg:text-[72px] font-display font-medium tracking-[-0.06em] text-white leading-none mb-2">{s.number}</span>
                                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white/30">{s.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ── EDITORIAL MOSAIC ── Apple-style image grid with copy */}
                <section className="py-24 lg:py-40">
                    <div className="container mx-auto px-6 max-w-7xl">

                        {/* Label */}
                        <div className="mb-16 flex items-center gap-6">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#C94A2C]">The Work</span>
                            <div className="h-px flex-1 bg-white/[0.06]" />
                        </div>

                        {/* Full-width feature — video-ready, landscape */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.97 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="w-full aspect-video md:aspect-[21/9] rounded-[2rem] lg:rounded-[3rem] overflow-hidden bg-[#1a1a1a] mb-6 relative group"
                        >
                            {/* Built To Win Rooms brand video */}
                            <video
                                src="/Hero Videos/Built To Win Rooms.mp4"
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D]/70 via-transparent to-transparent" />
                            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 right-6 md:right-10">
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-2 md:mb-3">Featured Case</p>
                                <h3 className="text-2xl md:text-4xl lg:text-6xl font-display font-medium tracking-[-0.04em] lg:tracking-[-0.05em] text-white leading-[0.9] max-w-xl">Identity system built to win rooms.</h3>
                            </div>
                            <div className="absolute top-4 right-4 md:top-8 md:right-8">
                                <span className="bg-white/10 backdrop-blur-md border border-white/10 text-white text-[8px] md:text-[9px] font-black px-3 md:px-4 py-1.5 md:py-2 rounded-full uppercase tracking-[0.3em]">Confidential Client</span>
                            </div>
                        </motion.div>

                        {/* 3-column smaller mosaic */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { caption: "Personal brand architecture for a Series B founder.", tag: "Executive", img: "/Superstar page/Personal brand architecture for a Series B founder..png" },
                                { caption: "Visual identity system for a Lagos-based recording artist.", tag: "Talent", img: "/Superstar page/Visual identity system for a Lagos-based recording artist.jpg" },
                                { caption: "Platform strategy for a content creator at 2M followers.", tag: "Creator", img: "/Superstar page/Platform strategy for a content creator at 2M followers.JPG" },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.7 }}
                                    className="group cursor-pointer"
                                >
                                    <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-[#1a1a1a] mb-5 relative">
                                        <img src={item.img} alt={item.caption} className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/80 to-transparent" />
                                        <div className="absolute top-6 left-6">
                                            <span className="bg-white/10 backdrop-blur-md text-white text-[8px] font-black uppercase tracking-[0.3em] px-3 py-1.5 rounded-full border border-white/10">{item.tag}</span>
                                        </div>
                                        <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ChevronRight size={16} className="text-white" />
                                        </div>
                                    </div>
                                    <p className="text-base font-medium text-white/60 tracking-tight leading-snug px-2">{item.caption}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── WHAT WE BUILD ── Clean editorial list, Apple-style */}
                <section className="py-24 lg:py-32 bg-[#0A0A0A]">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">
                            {/* Left: Sticky label + copy */}
                            <div className="lg:sticky lg:top-32">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#C94A2C] block mb-6">What We Build</span>
                                <h2 className="text-4xl lg:text-6xl font-display font-medium tracking-[-0.05em] leading-[0.88] text-white mb-8">
                                    Six parts.<br />
                                    <span className="text-white/20">One system.</span>
                                </h2>
                                <p className="text-lg text-white/40 font-medium tracking-tight leading-relaxed max-w-md">
                                    Every element of your public-facing identity, engineered to work as a single, cohesive authority machine.
                                </p>

                                {/* Product image */}
                                <div className="mt-12 aspect-square w-full max-w-xs rounded-[3rem] overflow-hidden bg-[#1a1a1a] relative">
                                    <img src="/placeholder.svg" alt="Brand System Mockup" className="w-full h-full object-cover opacity-40" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/30 mb-1">ŌDEY</p>
                                            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20">Superstar System</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Numbered deliverables */}
                            <div className="space-y-0">
                                {deliverables.map((d, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-80px" }}
                                        transition={{ duration: 0.6, delay: i * 0.05 }}
                                        className="group flex gap-8 py-8 border-b border-white/[0.06] hover:border-white/20 transition-colors cursor-default"
                                    >
                                        <span className="text-[11px] font-black text-white/20 mt-1.5 shrink-0 group-hover:text-[#C94A2C] transition-colors">{d.num}</span>
                                        <div>
                                            <h3 className="text-2xl lg:text-3xl font-display font-medium tracking-[-0.04em] text-white mb-2 group-hover:text-white transition-colors">{d.title}</h3>
                                            <p className="text-base text-white/40 font-medium tracking-tight leading-relaxed">{d.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── THE SIGNAL ── Nike-style single big proof statement */}
                <section className="py-32 lg:py-48 relative overflow-hidden">
                    <div className="absolute inset-0">
                        <img src="/placeholder.svg" alt="" className="w-full h-full object-cover opacity-5" />
                    </div>
                    <div className="relative container mx-auto px-6 max-w-7xl text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                        >
                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mb-8">The Standard</p>
                            <blockquote className="text-4xl lg:text-[64px] xl:text-[80px] font-display font-medium tracking-[-0.05em] leading-[0.88] text-white max-w-5xl mx-auto">
                                "Your name is<br />
                                your biggest<br />
                                <span className="text-[#C94A2C]">unfair advantage.</span><br />
                                Build it like one."
                            </blockquote>
                            <p className="mt-10 text-[10px] font-black uppercase tracking-[0.4em] text-white/20">— ŌDEY Brand Strategy Vol. I</p>
                        </motion.div>
                    </div>
                </section>

                {/* ── HOW IT WORKS ── Three-step Apple-style clarity */}
                <section className="py-24 lg:py-32 bg-[#F5F0E8] text-[#0D0D0D]">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="text-center mb-20">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#C94A2C] block mb-6">The Process</span>
                            <h2 className="text-4xl lg:text-6xl font-display font-medium tracking-[-0.05em] leading-[0.9] text-[#0D0D0D]">
                                Precise.<br /><span className="text-black/20">Not complicated.</span>
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { step: "1", title: "The Intake Brief", body: "You complete a focused strategic intake. No generic forms — specific questions that surface the intelligence we need to build effectively.", duration: "Day 1" },
                                { step: "2", title: "The Architecture Sprint", body: "We build. Strategy, visual language, voice, platform, authority layer — all in a structured 6-week sprint with weekly drops.", duration: "Weeks 1–6" },
                                { step: "3", title: "The Handoff & Launch", body: "You receive the complete system, a rollout sequence, and 30 days of guided deployment support to ensure the launch lands with impact.", duration: "Week 6–8" },
                            ].map((p, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.15, duration: 0.7 }}
                                    className="bg-white rounded-[3rem] p-10 border border-black/[0.04] relative overflow-hidden group hover:shadow-[0_30px_60px_rgba(0,0,0,0.05)] transition-shadow"
                                >
                                    <div className="text-[120px] font-display font-medium leading-none text-black/[0.03] absolute -top-4 -right-2 select-none">{p.step}</div>
                                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#C9A66B] block mb-6">{p.duration}</span>
                                    <h3 className="text-3xl font-display font-medium tracking-[-0.04em] text-[#0D0D0D] mb-4">{p.title}</h3>
                                    <p className="text-base text-black/50 font-medium leading-relaxed tracking-tight">{p.body}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── PRICING SIGNAL ── Clean, premium, transparent */}
                <section className="py-24 lg:py-32 bg-[#F5F0E8] text-[#0D0D0D]">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-[#0D0D0D] text-white rounded-[3rem] p-12 flex flex-col justify-between relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-48 h-48 bg-[#C94A2C]/20 blur-[80px] pointer-events-none" />
                                <div className="relative z-10">
                                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30 block mb-6">The Superstar System</span>
                                    <h3 className="text-4xl font-display font-medium tracking-[-0.04em] mb-4">Full Identity Build</h3>
                                    <p className="text-base text-white/50 font-medium mb-10 leading-relaxed">Complete personal brand architecture. Strategy, visual identity, voice, platform, authority, and launch.</p>
                                    <div className="space-y-3 mb-10">
                                        {["Strategic positioning", "Full visual identity", "Brand voice architecture", "Platform & authority strategy", "30-day launch sequence"].map((item, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <div className="w-5 h-5 rounded-full bg-[#C9A66B]/20 flex items-center justify-center shrink-0">
                                                    <Check size={10} className="text-[#C9A66B]" strokeWidth={3} />
                                                </div>
                                                <span className="text-sm font-medium text-white/70">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="relative z-10">
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-1">Starting at</p>
                                    <p className="text-4xl font-display font-medium tracking-tight text-[#C9A66B] mb-8">₦2.5M</p>
                                    <a href="#intake" className="block w-full bg-white text-[#0D0D0D] rounded-full py-5 text-center text-[11px] font-black uppercase tracking-[0.3em] hover:bg-[#C94A2C] hover:text-white transition-colors">
                                        Request the Brief
                                    </a>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="bg-[#E8E4DE] rounded-[3rem] p-12 flex flex-col justify-between"
                            >
                                <div>
                                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-black/30 block mb-6">Not Sure Yet?</span>
                                    <h3 className="text-4xl font-display font-medium tracking-[-0.04em] text-[#0D0D0D] mb-4">Strategy Call</h3>
                                    <p className="text-base text-black/50 font-medium mb-10 leading-relaxed">20 minutes. We dissect your current digital footprint and map the exact gap between where you are and where your name should be.</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30 mb-1">Investment</p>
                                    <p className="text-4xl font-display font-medium tracking-tight text-[#0D0D0D] mb-8">Complimentary</p>
                                    <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" className="block w-full bg-[#0D0D0D] text-white rounded-full py-5 text-center text-[11px] font-black uppercase tracking-[0.3em] hover:bg-[#C94A2C] transition-colors">
                                        Book 20 Minutes
                                    </a>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ── INTAKE FORM ── */}
                <section id="intake" className="py-32 lg:py-40 bg-[#F5F0E8]">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-6xl mx-auto mx-4 lg:mx-8 rounded-[3.5rem] bg-white p-8 md:p-24 shadow-[0_60px_120px_-30px_rgba(0,0,0,0.06)] border border-black/[0.03] mb-8"
                    >
                        <div className="text-center mb-16">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#C94A2C] block mb-6">Start Here</span>
                            <h2 className="text-4xl lg:text-6xl font-display font-medium tracking-[-0.05em] mb-6 leading-[0.9] text-[#0D0D0D]">Let's build your name.</h2>
                            <p className="text-xl lg:text-2xl text-black/40 font-medium">Tell us who you are. We'll show you what's possible.</p>
                        </div>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const fd = new FormData(e.currentTarget);
                                const msg = `Hi — I'm interested in the Scale Your Presence / Superstar System.\n\nName: ${fd.get('name')}\nEmail: ${fd.get('email')}\nTrack: ${fd.get('track')}\nTimeline: ${fd.get('timeline')}\n\nAbout Me & Goals:\n${fd.get('message')}`;
                                window.open(`https://wa.me/2348160891799?text=${encodeURIComponent(msg)}`, '_blank');
                            }}
                            className="space-y-12"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-4">
                                    <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#0D0D0D]/30">Full Name</label>
                                    <input name="name" required className="rounded-2xl bg-[#F5F0E8]/50 border border-black/[0.05] text-[#0D0D0D] h-16 w-full focus:outline-none focus:ring-1 focus:ring-[#C94A2C] transition-all px-6 text-lg font-medium" placeholder="Your name" />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#0D0D0D]/30">Email Address</label>
                                    <input name="email" type="email" required className="rounded-2xl bg-[#F5F0E8]/50 border border-black/[0.05] text-[#0D0D0D] h-16 w-full focus:outline-none focus:ring-1 focus:ring-[#C94A2C] transition-all px-6 text-lg font-medium" placeholder="you@brand.com" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-4">
                                    <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#0D0D0D]/30">I am a...</label>
                                    <select name="track" className="rounded-2xl bg-[#F5F0E8]/50 border border-black/[0.05] text-[#0D0D0D] h-16 w-full focus:outline-none focus:ring-1 focus:ring-[#C94A2C] transition-all px-6 text-lg font-medium appearance-none">
                                        <option>Talent / Athlete / Artist</option>
                                        <option>Content Creator</option>
                                        <option>C-Suite Executive</option>
                                        <option>Founder / Entrepreneur</option>
                                    </select>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#0D0D0D]/30">Ideal Timeline</label>
                                    <select name="timeline" className="rounded-2xl bg-[#F5F0E8]/50 border border-black/[0.05] text-[#0D0D0D] h-16 w-full focus:outline-none focus:ring-1 focus:ring-[#C94A2C] transition-all px-6 text-lg font-medium appearance-none">
                                        <option>ASAP — I'm ready now</option>
                                        <option>Next 30 days</option>
                                        <option>Next quarter</option>
                                        <option>Just exploring</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#0D0D0D]/30">Who are you & what do you want to be known for?</label>
                                <textarea name="message" rows={5} required className="rounded-[2rem] bg-[#F5F0E8]/50 border border-black/[0.05] text-[#0D0D0D] w-full focus:outline-none focus:ring-1 focus:ring-[#C94A2C] transition-all px-6 py-6 text-lg font-medium resize-none" placeholder="Tell us about yourself, your platform, your ambition..." />
                            </div>

                            <div className="flex flex-col items-center gap-8 pt-4">
                                <button type="submit" className="w-full md:w-auto rounded-full px-16 py-7 bg-[#0D0D0D] text-white font-display font-bold text-[10px] tracking-[0.3em] uppercase hover:scale-105 active:scale-95 transition-all shadow-xl hover:bg-[#C94A2C]">
                                    Submit Your Brief
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
                </section>
            </main>

            <RedesignFooter />
        </div>
    );
}
