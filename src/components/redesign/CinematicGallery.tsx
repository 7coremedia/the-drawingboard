import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const GALLERY_IMAGES = [
    "/redesign/loomrooms_showcase.png",
    "/redesign/visual_identity.png",
    "/redesign/strategic_foundation.png",
    "/redesign/human_interaction.png",
    "/redesign/growth_funding.png",
    "/redesign/future_vision.png",
    // Duplicates for density if needed, though marquee usually handles this by repeating children
    "/redesign/loomrooms_showcase.png",
    "/redesign/visual_identity.png",
];

const PARALLAX_OFFSET = 50;

function GalleryItem({ src, index, speed = 1 }: { src: string; index: number; speed?: number }) {
    return (
        <motion.div
            className="relative flex-none w-[220px] sm:w-[300px] md:w-[450px] aspect-[4/5] md:aspect-[4/5] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden group cursor-pointer"
            whileHover={{ scale: 0.98 }}
        >
            <img
                src={src}
                alt={`Gallery Item ${index}`}
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
            />

            {/* Cinematic Glass Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

            {/* Glass Reflection/Highlight */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-overlay" />

            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-medium">Project 0{index + 1}</span>
                <h4 className="text-white text-lg font-display font-medium mt-1">Brand Identity</h4>
            </div>
        </motion.div>
    );
}

function MarqueeRow({ images, direction = "left", speed = 20 }: { images: string[]; direction?: "left" | "right"; speed?: number }) {
    return (
        <div className="flex overflow-hidden relative w-full py-2 md:py-4">
            {/* Gradient Masks for fade effect at edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

            <motion.div
                className="flex gap-4 md:gap-10 pl-4 md:pl-10"
                animate={{
                    x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
                }}
                transition={{
                    duration: speed,
                    ease: "linear",
                    repeat: Infinity,
                }}
            >
                {[...images, ...images, ...images].map((src, i) => (
                    <GalleryItem key={i} src={src} index={i % images.length} />
                ))}
            </motion.div>
        </div>
    );
}

export default function CinematicGallery() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section
            ref={containerRef}
            className="relative py-20 md:py-48 bg-black overflow-hidden border-t border-white/5"
        >
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-black pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#675241]/10 rounded-full blur-[120px] mix-blend-screen" />
            </div>

            <div className="container relative z-10 px-6 mb-20 md:mb-32">
                <motion.div
                    style={{ opacity }}
                    className="max-w-4xl mx-auto text-center space-y-6"
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.3em] text-white/70 backdrop-blur-md">
                        Case Study Spotlight
                    </span>
                    <h2 className="text-4xl md:text-7xl font-display font-medium tracking-tight text-white leading-[1.1]">
                        Design as a <span className="font-serif italic text-white/50">Weapon</span> of <br className="hidden md:block" />
                        <span className="bg-gradient-to-r from-white via-white/80 to-white/40 bg-clip-text text-transparent">Influence</span>.
                    </h2>
                    <p className="text-zinc-500 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
                        We don't just design brands; we construct visual empires. Explore a curated selection of our most pivotal works, engineered to dominate categories.
                    </p>
                </motion.div>
            </div>

            <div className="flex flex-col gap-4 md:gap-12 relative z-10 -rotate-1 scale-[1.02] origin-center">
                <MarqueeRow
                    images={GALLERY_IMAGES.slice(0, 3)}
                    direction="left"
                    speed={40}
                />
                <MarqueeRow
                    images={GALLERY_IMAGES.slice(3, 6)}
                    direction="right"
                    speed={35}
                />
                {/* Optional third row for that "infinite" feeling if needed, but 2 might be cleaner */}
            </div>

            {/* Bottom fade for smooth transition to footer */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-20" />
        </section>
    );
}
