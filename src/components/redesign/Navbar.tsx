import { NavLink } from "react-router-dom";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [isAtTop, setIsAtTop] = React.useState(true);
    const [heroScrollProgress, setHeroScrollProgress] = React.useState(0);
    const [menuOpen, setMenuOpen] = React.useState(typeof window !== 'undefined' && window.innerWidth < 768);
    const lastScrollY = React.useRef(0);

    React.useEffect(() => {
        const onScroll = () => {
            const currentY = window.scrollY;
            const atTop = currentY < 20;
            setIsAtTop(atTop);

            // Auto toggle menu on mobile based on scroll
            const delta = currentY - lastScrollY.current;
            const threshold = 8;
            if (window.innerWidth < 768) {
                if (atTop) {
                    setMenuOpen(true);
                } else if (delta > threshold) {
                    setMenuOpen(false); // smoothly close when scrolling down
                } else if (delta < -threshold) {
                    setMenuOpen(true); // smoothly open when scrolling up
                }
            }
            lastScrollY.current = currentY;
        };

        const onHeroScroll = (e: CustomEvent) => {
            setHeroScrollProgress(e.detail);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("hero-scroll", onHeroScroll as EventListener);

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("hero-scroll", onHeroScroll as EventListener);
        };
    }, []);

    // Calculate X offset based on hero scroll progress
    // We map 0 -> 0.6 progress to 0 -> 350px offset
    const xOffset = Math.min(heroScrollProgress / 0.6, 1) * 350;

    return (
        <nav
            className={cn(
                "fixed top-6 inset-x-0 z-[60] transition-transform duration-500",
                isAtTop ? "translate-y-0" : "translate-y-[-10px]"
            )}
        >
            <div className="container mx-auto relative flex md:justify-center px-4 md:px-0">
                {/* Mobile Hamburger Toggle */}
                <button
                    className="md:hidden text-white/80 hover:text-white p-1 rounded-full bg-white/5 border border-white/10 transition-colors backdrop-blur-md absolute left-4 z-50"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle Menu"
                >
                    {menuOpen ? <X size={18} /> : <Menu size={18} />}
                </button>

                {/* Mobile Stacked Popup Menu */}
                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.9, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -20, scale: 0.9, filter: "blur(10px)" }}
                            transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.8 }}
                            className="absolute top-12 left-4 bg-[#232323]/60 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-2 flex flex-col w-48 shadow-2xl md:hidden z-50 overflow-hidden"
                        >
                            <NavLink
                                to="/"
                                onClick={() => setMenuOpen(false)}
                                className={({ isActive }) =>
                                    cn(
                                        "px-4 py-3.5 text-center text-lg font-medium transition-all duration-300 w-full rounded-[1.5rem]",
                                        isActive ? "bg-[#0b00ff] text-white" : "text-white/70 hover:text-white hover:bg-white/5"
                                    )
                                }
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/portfolio"
                                onClick={() => setMenuOpen(false)}
                                className={({ isActive }) =>
                                    cn(
                                        "px-4 py-3.5 text-center text-lg font-medium transition-all duration-300 w-full rounded-[1.5rem]",
                                        isActive ? "bg-[#0b00ff] text-white" : "text-white/70 hover:text-white hover:bg-white/5"
                                    )
                                }
                            >
                                Work
                            </NavLink>
                            <NavLink
                                to="/about"
                                onClick={() => setMenuOpen(false)}
                                className={({ isActive }) =>
                                    cn(
                                        "px-4 py-3.5 text-center text-lg font-medium transition-all duration-300 w-full rounded-[1.5rem]",
                                        isActive ? "bg-[#0b00ff] text-white" : "text-white/70 hover:text-white hover:bg-white/5"
                                    )
                                }
                            >
                                Studio
                            </NavLink>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Desktop Pill Navigation */}
                <div
                    style={{ transform: `translateX(${xOffset}px)` }}
                    className="hidden md:flex items-center gap-1 p-1.5 bg-black/60 backdrop-blur-2xl rounded-full border border-white/10 shadow-2xl transition-transform duration-100 ease-out will-change-transform"
                >
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            cn(
                                "px-5 py-2 rounded-full text-xs font-medium transition-all duration-300",
                                isActive
                                    ? "bg-brand-blue text-white shadow-[0_0_20px_rgba(0,85,255,0.4)]"
                                    : "text-zinc-400 hover:text-white"
                            )
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            cn(
                                "px-5 py-2 rounded-full text-xs font-medium transition-all duration-300",
                                isActive
                                    ? "bg-brand-blue text-white shadow-[0_0_20px_rgba(0,85,255,0.4)]"
                                    : "text-zinc-400 hover:text-white"
                            )
                        }
                    >
                        Studio
                    </NavLink>
                    <NavLink
                        to="/portfolio"
                        className={({ isActive }) =>
                            cn(
                                "px-5 py-2 rounded-full text-xs font-medium transition-all duration-300",
                                isActive
                                    ? "bg-brand-blue text-white shadow-[0_0_20px_rgba(0,85,255,0.4)]"
                                    : "text-zinc-400 hover:text-white"
                            )
                        }
                    >
                        Work
                    </NavLink>
                    <NavLink
                        to="/volumes"
                        className={({ isActive }) =>
                            cn(
                                "px-5 py-2 rounded-full text-xs font-medium transition-all duration-300",
                                isActive
                                    ? "bg-brand-blue text-white shadow-[0_0_20px_rgba(0,85,255,0.4)]"
                                    : "text-zinc-400 hover:text-white"
                            )
                        }
                    >
                        Volumes
                    </NavLink>
                    <NavLink
                        to="/contact"
                        className={({ isActive }) =>
                            cn(
                                "px-5 py-2 rounded-full text-xs font-medium transition-all duration-300",
                                isActive
                                    ? "bg-brand-blue text-white shadow-[0_0_20px_rgba(0,85,255,0.4)]"
                                    : "text-zinc-400 hover:text-white"
                            )
                        }
                    >
                        Contact
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}
