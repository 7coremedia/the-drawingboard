import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import FeaturedWorksCarousel from "./FeaturedWorksCarousel";
import SocialProofTicker from "./SocialProofTicker";

export default function CinematicHero() {
    return (
        <div className="bg-[#F5F0E8] text-[#0D0D0D] relative min-h-screen flex flex-col pt-32 md:pt-40 pb-20">
            {/* Main Container */}
            <div className="container px-6 md:px-10 max-w-7xl mx-auto flex-1">
                {/* Clean Clinical Headline */}
                <motion.h1 
                    className="text-[60px] md:text-[100px] font-display font-medium tracking-[-0.10em] text-[#0D0D0D] leading-[0.78] max-w-4xl mb-10"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.1,
                                delayChildren: 0.1
                            }
                        }
                    }}
                >
                    <div className="block">
                        {["The", "brand"].map((word, i) => (
                            <motion.span
                                key={`w1-${i}`}
                                className="inline-block mr-[0.18em]"
                                variants={{
                                    hidden: { opacity: 0, y: 60, rotateX: 45 },
                                    visible: { 
                                        opacity: 1, 
                                        y: 0, 
                                        rotateX: 0,
                                        transition: { duration: 1.2, ease: [0.215, 0.61, 0.355, 1] } 
                                    }
                                }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </div>
                    <div className="block">
                        {["your", "ambition"].map((word, i) => (
                            <motion.span
                                key={`w2-${i}`}
                                className="inline-block mr-[0.18em]"
                                variants={{
                                    hidden: { opacity: 0, y: 60, rotateX: 45 },
                                    visible: { 
                                        opacity: 1, 
                                        y: 0, 
                                        rotateX: 0,
                                        transition: { duration: 1.2, ease: [0.215, 0.61, 0.355, 1] } 
                                    }
                                }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </div>
                    <div className="block">
                        {["always", "needed"].map((word, i) => (
                            <motion.span
                                key={`w3-${i}`}
                                className="inline-block mr-[0.18em] text-black/20"
                                variants={{
                                    hidden: { opacity: 0, y: 60, rotateX: 45 },
                                    visible: { 
                                        opacity: 1, 
                                        y: 0, 
                                        rotateX: 0,
                                        transition: { duration: 1.2, ease: [0.215, 0.61, 0.355, 1] } 
                                    }
                                }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </div>
                </motion.h1>

                <SocialProofTicker />

                {/* Mobile Video Section (shows before the cards) */}
                <motion.div
                    className="md:hidden block mb-4"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                >
                    <Link to="/portfolio" className="block relative w-full aspect-video rounded-[2.5rem] overflow-hidden shadow-sm shrink-0 group">
                        <video 
                            src="/Hero%20Videos/LOOM%20REVEAL.mp4" 
                            autoPlay 
                            muted 
                            loop 
                            playsInline 
                            className="w-full h-full object-cover"
                        />
                        
                        {/* Dramatic Overlay */}
                        <div className="absolute inset-0 bg-black/20 group-active:bg-black/40 transition-colors" />

                        {/* Top Left Label: Latest Project */}
                        <div className="absolute top-6 left-6 flex items-center gap-2">
                            <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg">
                                Latest Project
                            </span>
                        </div>

                        {/* Bottom Right Label: Case Study Arrow */}
                        <div className="absolute bottom-6 right-6 flex items-center gap-2">
                            <span className="text-white text-[11px] font-medium tracking-tight flex items-center gap-1.5 drop-shadow-md">
                                Case Study 
                                <span className="text-lg leading-none translate-y-[-1px]">→</span>
                            </span>
                        </div>
                    </Link>
                </motion.div>

                {/* Section 1: 2 Large Cards (Side-by-side on mobile) */}
                <motion.div 
                    className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-6 mb-6"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                >
                    <Link to="/contact" className="group">
                        <div className="bg-[#3D2C1F] text-white rounded-[1.5rem] md:rounded-[2.5rem] p-5 md:p-8 aspect-[3/4] md:aspect-video relative overflow-hidden flex flex-col justify-between transition-transform duration-500 hover:scale-[0.99] shadow-sm">
                            
                            {/* Web Video Background (remains unchanged for web) */}
                            <video 
                                src="/Hero%20Videos/LOOM%20REVEAL.mp4" 
                                autoPlay 
                                muted 
                                loop 
                                playsInline 
                                className="hidden md:block absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Overlay for text readability on Web */}
                            <div className="hidden md:block absolute inset-0 bg-black/40 z-0 group-hover:bg-black/30 transition-colors duration-500" />
                            
                            <div className="z-10 relative flex flex-col items-start gap-1">
                                <div className="bg-[#C9A66B] text-[#3D2C1F] text-[7px] md:text-[10px] font-bold px-2 md:px-3 py-0.5 md:py-1 rounded-full uppercase tracking-widest shadow-xl absolute top-0 right-0 md:relative md:top-auto md:right-auto">New</div>
                                <p className="text-[#C9A66B] font-bold text-[10px] sm:text-xs md:text-base lg:text-lg xl:text-xl mb-0 md:mb-1 drop-shadow-md">Ready for a</p>
                                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-display tracking-tighter leading-[0.95] drop-shadow-lg w-[95%] md:max-w-[240px] lg:max-w-[320px] pr-4 md:pr-0">
                                    brand strategy
                                </h3>
                            </div>

                            <div className="z-10 relative flex items-center justify-between mt-auto pt-4">
                                <span className="font-semibold text-xs sm:text-sm md:text-xl lg:text-2xl border-b border-white/30 hover:border-white transition-colors drop-shadow-md truncate max-w-[80%] pb-1">Start building</span>
                                <ChevronRight className="w-5 h-5 md:w-8 md:h-8 drop-shadow-md flex-shrink-0" />
                            </div>
                        </div>
                    </Link>

                    <Link to="/brand-audit" className="group">
                        <div className="bg-[#D9C5B2] text-[#0D0D0D] rounded-[1.5rem] md:rounded-[2.5rem] p-5 md:p-8 aspect-[3/4] md:aspect-video relative overflow-hidden flex flex-col justify-between transition-transform duration-500 hover:scale-[0.99] shadow-sm">
                            
                            <div className="z-10 relative">
                                <div className="bg-[#0D0D0D] text-white text-[7px] md:text-[10px] font-bold px-2 md:px-3 py-0.5 md:py-1 rounded-full uppercase tracking-widest shadow-xl absolute top-0 right-0">New</div>
                                <p className="text-[#5C4D42] font-semibold text-[10px] sm:text-xs md:text-base lg:text-lg xl:text-xl mb-0 md:mb-1">Your brand is</p>
                                <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-4 md:flex-wrap">
                                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[64px] font-display tracking-tighter leading-[0.9] text-[#3D2C1F] max-w-[85%]">
                                        leaving money on the table
                                    </h3>
                                    
                                    <div className="text-[7.5px] md:text-[11px] font-bold uppercase tracking-[0.15em] text-[#3D2C1F] flex items-center gap-1 group w-max mt-1 md:mt-0 md:mb-1.5">
                                        <span className="text-xs md:text-xl transition-transform group-hover:translate-y-1">↑</span> 3x more trust
                                    </div>
                                </div>
                            </div>

                            {/* Graphic Placeholder (Right side image) */}
                            <div className="absolute right-0 bottom-0 w-1/2 h-full min-h-[50%] group-hover:scale-105 transition-transform duration-1000">
                                <img src="/placeholder.svg" alt="Growth" className="w-full h-full object-cover opacity-5" />
                            </div>

                            <div className="z-10 relative flex items-center justify-between mt-auto pt-4">
                                <span>&nbsp;</span>
                                <ChevronRight className="w-5 h-5 md:w-8 md:h-8 opacity-60 flex-shrink-0" />
                            </div>
                        </div>
                    </Link>
                </motion.div>

                {/* Section 2: 4 Small Cards (Stacked Rows on Mobile, Landscape Capsules on Web) */}
                <motion.div 
                    className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-12 md:mb-20"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.1,
                                delayChildren: 1.2
                            }
                        }
                    }}
                >
                    {[
                        { title: "Strategic brand systems", color: "text-[#1B4B66]", img: "/Quick Actions/Strategic Brand Systems.png", link: "/strategic-brand-systems", scaleClass: "scale-[3.8] md:scale-[2.5]", badge: null },
                        { title: "Rebuild brand authority", color: "text-[#8B4513]", img: "/Quick Actions/Rebuild Brand Authority.png", link: "/personal-brand-launcher", scaleClass: "scale-[2.4] md:scale-[1.8]", badge: null },
                        { title: "Scale your presence", color: "text-[#3D2C1F]", img: "/Quick Actions/Scale Your Presence.png", link: "/superstars", scaleClass: "scale-[1.9] md:scale-[1.35]", badge: null },
                        { title: "Free brand assessment", color: "text-[#006400]", img: "/Quick Actions/Free Brand Assesment.png", link: "/brand-audit-quiz", scaleClass: "scale-[2.4] md:scale-[1.8]", badge: null },
                        { title: "Brand ROI calculator", color: "text-[#0D0D0D]", img: null, link: "/brand-roi-calculator", scaleClass: "", badge: "NEW" },
                    ].map((card, i) => (
                        <motion.div
                            key={i}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                            }}
                            className={cn(card.title === "Brand ROI calculator" ? "block md:hidden" : "block")}
                        >
                            <Link to={card.link} className="group block w-full">
                                <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-4 md:px-6 md:py-4 h-[80px] md:h-[100px] border border-black/5 flex flex-row items-center justify-between hover:bg-black/[0.02] transition-colors relative overflow-hidden">
                                    <div className="flex flex-col items-start gap-2 z-10 w-auto px-2 md:px-0">
                                        <h4 className={cn("text-base md:text-[17px] font-display font-medium leading-[1.1] max-w-[150px] md:max-w-[130px]", card.color)}>
                                            {card.title.split(' ').map((word, idx) => (
                                              <span key={idx} className={cn(idx === card.title.split(' ').length - 1 ? "opacity-60" : "")}>
                                                {word}{' '}
                                              </span>
                                            ))}
                                        </h4>
                                    </div>
                                    
                                    <div className="flex items-center gap-1 md:gap-2 z-10 px-2 md:px-0 flex-shrink-0">
                                        {card.badge && (
                                            <span className="bg-[#C9A66B] text-white text-[8px] font-black uppercase tracking-[0.2em] px-2 py-1 rounded-full shadow-sm mr-2">{card.badge}</span>
                                        )}
                                        {card.img && (
                                            <div className="relative w-16 h-16 md:w-24 md:h-24 opacity-100 group-hover:scale-110 transition-all duration-500 flex items-center justify-center pointer-events-none">
                                                <img src={card.img} alt="Card Icon" className={cn("w-full h-full object-contain drop-shadow-lg", card.scaleClass)} />
                                            </div>
                                        )}
                                        <ChevronRight className="w-4 h-4 md:w-5 md:h-5 opacity-40 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Section 3: The Hims-style GLP-1 Mobile Carousel */}
                <FeaturedWorksCarousel />
            </div>
        </div>
    );
}
