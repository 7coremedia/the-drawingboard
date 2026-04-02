import { useRef, useMemo, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePublicPortfolio } from "@/hooks/usePublicPortfolio";
import { cn } from "@/lib/utils";

const FALLBACK_PROJECTS = [
    {
        image: "/redesign/loomrooms_showcase.png",
        client: "Confidential",
        industry: "Lagos-based Fintech Startup",
        challenge: "Raised pre-seed funding but brand resembled a side project, not a serious financial platform.",
        built: "Brand strategy, visual identity system, investor presentation, website copy.",
        outcome: "Closed $500K seed round within two months. Now in Series A talks."
    },
    {
        image: "/redesign/visual_identity.png",
        client: "Confidential",
        industry: "E-Commerce Luxury Brand",
        challenge: "Struggling to justify premium pricing with an outdated visual presence.",
        built: "Brand strategy, UI/UX design, luxury packaging, visual identity.",
        outcome: "Increased average order value by 40% and expanded to the UK market."
    },
    {
        image: "/redesign/strategic_foundation.png",
        client: "Confidential",
        industry: "Creative Agency",
        challenge: "Needed a definitive brand voice to stand out in a saturated market.",
        built: "Brand positioning, comprehensive messaging toolkit, website redesign.",
        outcome: "Secured 3 enterprise-level retainer clients within 6 months."
    },
    {
        image: "/redesign/human_interaction.png",
        client: "Confidential",
        industry: "Healthcare Tech Platform",
        challenge: "Clinical and cold branding was causing low user trust and adoption.",
        built: "Brand identity, tone of voice, patient-facing UX experience overhaul.",
        outcome: "User engagement increased by 150%, leading to successful acquisition."
    },
    {
        image: "/redesign/growth_funding.png",
        client: "Confidential",
        industry: "Personal Brand - Founder",
        challenge: "Lack of cohesive narrative for speaking engagements and thought leadership.",
        built: "Personal brand system, social media architecture, complete media kit.",
        outcome: "Booked 5 international speaking gigs including TEDx in the first quarter."
    },
    {
        image: "/redesign/future_vision.png",
        client: "Confidential",
        industry: "B2B SaaS Platform",
        challenge: "Complex product offering was confusing potential enterprise buyers.",
        built: "Product architecture, simplified messaging taxonomy, website redesign.",
        outcome: "Reduced sales cycle length by 30% and significantly improved lead quality."
    }
];

const PARALLAX_OFFSET = 50;

const ProjectInfoBar = ({ project, isMobile = false }: { project: any, isMobile?: boolean }) => (
    <div className={cn(
        "absolute inset-x-0 bottom-0 p-4 md:p-6 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/60 to-transparent transition-all duration-300",
        isMobile ? "opacity-100" : "xl:opacity-0 xl:group-hover:opacity-100"
    )}>
        <div className="mb-3">
            <span className="text-[9px] uppercase tracking-[0.2em] text-brand-blue font-bold">{project.industry}</span>
            <h4 className="text-white text-lg font-display font-medium leading-tight">{project.client}</h4>
        </div>

        <div className="space-y-2">
            <div>
                <span className="text-[8px] uppercase tracking-widest text-zinc-400 font-bold block">Challenge</span>
                <p className="text-zinc-300 text-[11px] leading-relaxed line-clamp-2">{project.challenge}</p>
            </div>
            <div>
                <span className="text-[8px] uppercase tracking-widest text-zinc-400 font-bold block">Built</span>
                <p className="text-zinc-300 text-[11px] leading-relaxed line-clamp-1">{project.built}</p>
            </div>
            <div>
                <span className="text-[8px] uppercase tracking-widest text-zinc-400 font-bold block">Outcome</span>
                <p className="text-white text-[11px] font-medium leading-relaxed line-clamp-1">{project.outcome}</p>
            </div>
        </div>
    </div>
);

function GalleryItem({ project, index }: { project: any; index: number }) {
    const [showMobileInfo, setShowMobileInfo] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <div
            className="relative flex-none w-[296px] aspect-[16/10] rounded-2xl md:rounded-3xl border border-white/5 overflow-hidden group cursor-pointer bg-zinc-900/50"
            onClick={() => {
                if (window.innerWidth < 1280) setShowMobileInfo(!showMobileInfo);
            }}
        >
            {/* Elegant Loading Skeleton that hides the half-loaded image visual glitch */}
            {!imageLoaded && (
                <div className="absolute inset-0 bg-zinc-800 animate-pulse z-0" />
            )}

            <img
                src={project.image}
                alt={project.client}
                loading={index < 4 ? "eager" : "lazy"}
                decoding={index < 4 ? "sync" : "async"}
                onLoad={() => setImageLoaded(true)}
                className={cn(
                    "w-full h-full object-cover transition-all duration-700 ease-out",
                    imageLoaded ? "opacity-100 xl:group-hover:scale-105" : "opacity-0"
                )}
            />

            {/* Desktop Hover Info */}
            <div className="hidden xl:block">
                <ProjectInfoBar project={project} />
            </div>

            {/* Mobile "i" Button & Info Overlay */}
            <div className="xl:hidden">
                <button
                    className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white text-xs font-medium z-30"
                >
                    i
                </button>
                {showMobileInfo && (
                    <div className="absolute inset-0 z-20">
                        <ProjectInfoBar project={project} isMobile={true} />
                    </div>
                )}
            </div>

            {/* Subtle Overlay Shadow */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />
        </div>
    );
}

function GridRow({ projects }: { projects: any[] }) {
    return (
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-7xl mx-auto px-4">
            {projects.map((project, i) => (
                <GalleryItem key={i} project={project} index={i} />
            ))}
        </div>
    );
}

export default function CinematicGallery() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const { data: portfolioItems, isLoading } = usePublicPortfolio();

    // Map the Supabase data or fallback to default
    const displayProjects = useMemo(() => {
        if (!portfolioItems || portfolioItems.length === 0) {
            return FALLBACK_PROJECTS;
        }

        const validItems = portfolioItems.filter(i => i.cover_url && i.title);

        if (validItems.length === 0) return FALLBACK_PROJECTS;

        return validItems.map((item: any, i) => {
            // Cycle through fallback data to populate missing structured text fields
            const fallback = FALLBACK_PROJECTS[i % FALLBACK_PROJECTS.length];
            return {
                image: item.cover_url,
                client: item.title,
                industry: item.category || fallback.industry,
                challenge: item.tagline || item.short_description || fallback.challenge,
                built: fallback.built,
                outcome: fallback.outcome
            };
        });
    }, [portfolioItems]);

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section
            ref={containerRef}
            id="work"
            className="relative py-20 md:py-40 bg-black overflow-hidden border-t border-white/5"
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
                    <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tight text-white leading-[1.1]">
                        The Work — <span className="text-white/50">Real Businesses.</span> <br className="hidden md:block" />
                        <span className="bg-gradient-to-r from-white via-white/80 to-white/40 bg-clip-text text-transparent">Real Results.</span>
                    </h2>
                </motion.div>
            </div>

            <div className="relative z-10 mb-32 min-h-[60vh] flex items-center justify-center">
                {isLoading ? (
                    <div className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-7xl mx-auto px-4">
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="relative flex-none w-[296px] aspect-[16/10] rounded-2xl md:rounded-3xl border border-white/5 bg-zinc-900/50 animate-pulse"
                            />
                        ))}
                    </div>
                ) : (
                    <GridRow projects={displayProjects} />
                )}
            </div>

            {/* Call to Action Block */}
            <div className="container relative z-20 px-6 max-w-3xl mx-auto text-center mt-12 mb-12">
                <p className="text-zinc-400 text-base md:text-xl leading-relaxed mb-8">
                    "Every project on this page started with a conversation. Not a proposal — a conversation. If something you've seen here has made you think about your own brand, that's exactly where we should start."
                </p>
                <a
                    href="/brand-audit"
                    className="inline-block bg-white hover:bg-zinc-200 text-black px-10 py-4 rounded-full font-display font-medium text-lg transition-transform hover:scale-105 duration-300"
                >
                    Book a Brand Audit — $250
                </a>
            </div>

            {/* Bottom fade for smooth transition to footer */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-20" />
        </section>
    );
}
