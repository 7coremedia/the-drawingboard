import { NavLink, useLocation } from "react-router-dom";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const location = useLocation();
    const [isAtTop, setIsAtTop] = React.useState(true);
    const [menuOpen, setMenuOpen] = React.useState(false);
    const lastScrollY = React.useRef(0);

    React.useEffect(() => {
        const onScroll = () => {
            const currentY = window.scrollY;
            const atTop = currentY < 20;
            setIsAtTop(atTop);
            lastScrollY.current = currentY;
        };

        window.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    const isHome = location.pathname === "/";
    const isSuperstars = location.pathname === "/superstars";
    const isVolumeRoute = location.pathname.startsWith("/volumes");
    const hasBanner = isHome || isSuperstars;
    // Dark hero sections vs entirely dark pages
    const isDarkHero = isSuperstars;
    const isWhiteNav = isVolumeRoute || (isDarkHero && isAtTop);

    return (
        <>
            <nav
                className={cn(
                    "fixed inset-x-0 z-[60] h-16 md:h-20 transition-all duration-500 flex items-center border-none shadow-none",
                    hasBanner && isAtTop ? "top-14 md:top-16" : "top-0",
                    isAtTop ? "translate-y-0" : "translate-y-[-4px] backdrop-blur-sm bg-black/5"
                )}
            >
                <div className="w-full flex items-center justify-between px-6 md:px-10 relative">
                    {/* Top Left: Logo (Text) */}
                    <NavLink to="/" className="flex items-center gap-2 flex-shrink-0" onClick={() => setMenuOpen(false)}>
                        <span className={cn(
                            "kode-wordmark text-lg sm:text-xl tracking-tight select-none font-black transition-colors duration-300",
                            isWhiteNav ? "text-white" : "text-[#0D0D0D]"
                        )}>
                            KŌDĒ
                        </span>
                    </NavLink>

                    {/* Sidebar Navigation Toggle */}
                    <div className="flex items-center gap-4">
                        <button
                            className={cn(
                                "p-2 md:p-3 rounded-full border transition-colors backdrop-blur-md z-50 overflow-hidden",
                                isWhiteNav
                                    ? "text-white/80 hover:text-white bg-white/10 border-white/20"
                                    : "text-[#0D0D0D]/80 hover:text-black bg-black/5 border-black/10"
                            )}
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Toggle Menu"
                        >
                            {menuOpen ? <X size={20} className="md:w-6 md:h-6" /> : <Menu size={20} className="md:w-6 md:h-6" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Global Sidebar & Backdrop (Outside <nav> to avoid transform clipping) */}
            <AnimatePresence>
                {menuOpen && (
                    <>
                        {/* Backdrop Overlay to blur the page behind */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-[#0D0D0D]/10 backdrop-blur-md z-[80] transition-all duration-300"
                            onClick={() => setMenuOpen(false)}
                        />

                        {/* Vertical Sidebar */}
                        <motion.div 
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 right-0 w-full xs:w-72 sm:w-80 md:w-96 bg-[#F5F0E8] border-l border-black/[0.05] flex flex-col shadow-[-30px_0_100px_rgba(0,0,0,0.15)] z-[100]"
                        >
                            {/* Sidebar Header with Close Button */}
                            <div className="flex items-center justify-between p-6 md:p-10 border-b border-black/[0.03]">
                                <NavLink to="/" onClick={() => setMenuOpen(false)}>
                                    <span className="kode-wordmark text-lg tracking-tight select-none text-[#0D0D0D] font-black">
                                        KŌDĒ
                                    </span>
                                </NavLink>
                                <button
                                    onClick={() => setMenuOpen(false)}
                                    className="p-3 rounded-full hover:bg-black/5 transition-colors text-[#0D0D0D]"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="px-4 py-8 md:p-8 flex flex-col gap-1 overflow-y-auto custom-scrollbar">
                                {[
                                    { name: "Home", path: "/" },
                                    { name: "Work", path: "/portfolio" },
                                    { name: "Solutions", path: "/solutions" },
                                    { name: "Services", path: "/services" },
                                    { name: "Studio", path: "/about" },
                                    { name: "Brand Audit", path: "/brand-audit" },
                                    { name: "Management", path: "/management" },
                                    { name: "Dashboard", path: "/dashboard" },
                                    { name: "Client Portal", path: "/portal", isHighlighted: true },
                                    { name: "Contact", path: "/contact" }
                                ].map((link) => (
                                    <NavLink
                                        key={link.path}
                                        to={link.path}
                                        onClick={() => setMenuOpen(false)}
                                        className={({ isActive }) =>
                                            cn(
                                                "px-6 py-4 text-left text-2xl md:text-3xl font-display font-medium tracking-tighter transition-all duration-300 w-full rounded-2xl",
                                                isActive ? "text-[#C94A2C]" : "text-[#0D0D0D]/40 hover:text-black hover:pl-8",
                                                link.isHighlighted ? "text-[#C94A2C]/60 hover:text-[#C94A2C]" : ""
                                            )
                                        }
                                    >
                                        {link.name}
                                    </NavLink>
                                ))}
                            </div>

                            {/* Secondary Social/Meta block at the bottom */}
                            <div className="mt-auto space-y-6 px-10 pb-12">
                                <div className="h-px w-12 bg-black/10" />
                                <div className="flex flex-col gap-2">
                                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#C94A2C]">Connect</span>
                                    <a href="mailto:hello@kode.com.ng" className="text-sm font-medium text-[#0D0D0D]/40 hover:text-black transition-colors">hello@kode.com.ng</a>
                                    <a href="https://instagram.com/kode.designed" className="text-sm font-medium text-[#0D0D0D]/40 hover:text-black transition-colors">Instagram</a>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
