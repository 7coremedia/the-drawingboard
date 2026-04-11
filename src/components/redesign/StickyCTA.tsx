import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function StickyCTA() {
    const [isVisible, setIsVisible] = useState(false);
    const location = useLocation();

    // Only show on primary marketing pages
    const allowedPaths = ["/", "/services", "/solutions", "/about"];
    const isAllowed = allowedPaths.includes(location.pathname);
    
    useEffect(() => {
        if (!isAllowed) {
            setIsVisible(false);
            return;
        }

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const docHeight = document.documentElement.scrollHeight;
            const winHeight = window.innerHeight;
            const scrollPercent = scrollY / (docHeight - winHeight);

            // Show after 25% scroll, hide when we reach the very bottom (footer)
            if (scrollPercent > 0.25 && scrollPercent < 0.95) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isAllowed]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div 
                    className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="bg-[#0D0D0D]/90 backdrop-blur-xl border border-white/10 rounded-full p-2 pr-6 flex items-center gap-4 shadow-2xl">
                        <Link 
                            to="/contact"
                            className="bg-[#C94A2C] text-white rounded-full px-6 py-3 font-display text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-[#0D0D0D] transition-colors flex items-center gap-2"
                        >
                            Start the Architecture
                            <ArrowRight size={14} />
                        </Link>
                        <div className="hidden sm:flex flex-col">
                            <span className="text-[11px] font-bold text-white tracking-wide">Q2 Projects</span>
                            <span className="text-[9px] uppercase tracking-widest text-[#C94A2C] font-bold">2 Spots Left</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
