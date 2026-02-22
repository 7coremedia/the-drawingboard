import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import AnnouncementBanner from "./AnnouncementBanner";

export default function CinematicHero() {
    const section2Ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: section2Ref,
        offset: ["start start", "end end"]
    });

    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Logo Animation: Center -> Top Center (Adjusted for mobile)
    const logoScale = useTransform(scrollYProgress, [0, 0.6], [1, isMobile ? 0.45 : 0.28]); // Scale sized up properly for mobile center
    const logoX = useTransform(scrollYProgress, [0, 0.6], ["0%", isMobile ? "0%" : "-33vw"]); // Perfectly center horizontally on mobile
    const logoY = useTransform(scrollYProgress, [0, 0.6], ["0vh", isMobile ? "-45.5vh" : "-44vh"]); // Vertically align perfectly with the hamburger boundary

    // Opacity for the center content (Banner, Reviews, CTA) to fade out
    const contentOpacity = useTransform(scrollYProgress, [0.1, 0.4], [1, 0]);

    // Dispatch scroll progress to Navbar for the "visual balance" shift
    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (v) => {
            window.dispatchEvent(new CustomEvent("hero-scroll", { detail: v }));
        });
        return () => unsubscribe();
    }, [scrollYProgress]);

    return (
        <div className="bg-black">
            {/* 1. SECTION 1: Intro Section (3.mp4) */}
            <section className="relative h-[100svh] w-full overflow-hidden z-20">
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-contain md:object-cover object-center scale-110 md:scale-100"
                    >
                        <source src="/3.mp4" type="video/mp4" />
                    </video>
                </div>

                <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black" />

                {/* Section 1 Content */}
                <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6 pt-[40vh]">
                    <p className="text-white text-lg md:text-2xl font-display uppercase tracking-tighter opacity-80 max-w-2xl px-4 mb-8">
                        Crafting human brands and experiences <br className="hidden md:block" />
                        since AI happened
                    </p>

                    <div className="flex flex-col items-center gap-4">
                        <a
                            href="/onboarding"
                            className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-10 py-3 rounded-full font-display font-medium text-lg transition-all duration-300 border border-white/10"
                        >
                            Apply
                        </a>

                        <div className="text-zinc-500 text-[11px] md:text-xs font-medium tracking-tight">
                            Explore <a href="/pricing" className="underline underline-offset-4 decoration-zinc-500/50 hover:text-zinc-300 transition-colors">T-DB Pricing Plans.</a> See <a href="/faq" className="underline underline-offset-4 decoration-zinc-500/50 hover:text-zinc-300 transition-colors">FAQ.</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. SECTION 2: Sticky Animation Section (The Background i want.mp4) */}
            <div ref={section2Ref} className="relative h-[250vh] z-30 bg-black">
                <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
                    {/* Background Video */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black via-transparent to-transparent h-64" />
                        <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none bg-gradient-to-t from-black via-transparent to-transparent h-64" />

                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover scale-110 md:scale-100 object-center"
                        >
                            <source src="/The%20Background%20i%20want.mp4" type="video/mp4" />
                        </video>
                    </div>

                    {/* Content Container */}
                    <div className="relative z-20 h-full flex flex-col items-center justify-center pointer-events-none">

                        {/* Announcement Banner - Fades out */}
                        <motion.div
                            style={{ opacity: contentOpacity }}
                            className="absolute top-[25vh] z-30 pointer-events-auto"
                        >
                            <AnnouncementBanner className="scale-75 md:scale-90" />
                        </motion.div>

                        {/* Animated Logo: Moves to Top Left */}
                        <motion.div
                            style={{ scale: logoScale, x: logoX, y: logoY }}
                            className="flex flex-col items-center gap-8 md:gap-12 origin-center"
                        >
                            <img
                                src="/TheDrawingBoard Logo.svg"
                                alt="The-DrawingBoard"
                                className="w-[85vw] md:w-[70vw] h-auto object-contain filter drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                            />
                        </motion.div>

                        {/* Reviews & CTA Block - Fades out */}
                        <motion.div
                            style={{ opacity: contentOpacity }}
                            className="absolute bottom-16 md:bottom-24 left-0 right-0 flex flex-col items-center gap-6 pointer-events-auto"
                        >
                            <div className="flex flex-col items-center gap-2">
                                <span className="text-zinc-500 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-medium">In the past 15 months</span>
                                <div className="flex items-center gap-2 md:gap-4 bg-zinc-900/40 backdrop-blur-xl px-3 md:px-4 py-2 rounded-full border border-white/5 shadow-2xl">
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-[#0b00ff]">
                                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="text-white text-xs font-medium">5/5 20+ Star rating from 20+ Brands</span>
                                </div>
                            </div>

                            <a
                                href="/onboarding"
                                className="bg-white text-black px-6 py-2.5 rounded-full font-display font-medium text-base hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                            >
                                Start Your Project
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* 3. FIXED LOGO LAYER - Appears after animation completes */}
            <motion.div
                style={{
                    scale: logoScale,
                    x: logoX,
                    y: logoY,
                    opacity: useTransform(scrollYProgress, [0.6, 0.65], [0, 1])
                }}
                className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none"
            >
                <img
                    src="/TheDrawingBoard Logo.svg"
                    alt="The-DrawingBoard"
                    className="w-[85vw] md:w-[70vw] h-auto object-contain filter drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                />
            </motion.div>
        </div>
    );
}
