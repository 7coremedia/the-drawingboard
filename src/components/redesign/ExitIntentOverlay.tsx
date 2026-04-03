import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, ArrowRight } from "lucide-react";

export default function ExitIntentOverlay() {
    const [isVisible, setIsVisible] = useState(false);
    const [hasTriggered, setHasTriggered] = useState(false);

    useEffect(() => {
        // Check if user already saw it this session to not annoy them
        const sessionSaw = sessionStorage.getItem("kode_exit_intent_seen");
        if (sessionSaw) {
            setHasTriggered(true);
            return;
        }

        const handleMouseLeave = (e: MouseEvent) => {
            // Trigger if mouse leaves top of viewport
            if (e.clientY <= 0 && !hasTriggered) {
                setIsVisible(true);
                setHasTriggered(true);
                sessionStorage.setItem("kode_exit_intent_seen", "true");
            }
        };

        document.addEventListener("mouseleave", handleMouseLeave);
        return () => document.removeEventListener("mouseleave", handleMouseLeave);
    }, [hasTriggered]);

    const closeOverlay = () => {
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={closeOverlay}
                    />
                    
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.05, y: -20 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="bg-[#0D0D0D] text-white w-full max-w-xl rounded-[2.5rem] p-8 md:p-12 relative z-10 shadow-2xl overflow-hidden"
                    >
                        {/* Background flare */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C94A2C]/20 blur-[100px] pointer-events-none" />

                        <button 
                            onClick={closeOverlay}
                            className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-[1.5rem] bg-[#C94A2C] flex items-center justify-center mb-6 shadow-[0_10px_30px_rgba(201,74,44,0.3)]">
                                <FileText size={32} className="text-white" />
                            </div>
                            
                            <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight mb-4">
                                Don't leave your brand to chance.
                            </h2>
                            
                            <p className="text-white/60 text-base md:text-lg mb-8 max-w-md">
                                Get the <span className="text-white font-bold">Personal Brand Launcher PDF</span> — our internal diagnostic checklist used to validate ₦100M+ brands.
                            </p>

                            <form className="w-full space-y-4" onSubmit={(e) => { e.preventDefault(); closeOverlay(); }}>
                                <input 
                                    type="email" 
                                    placeholder="Where should we send it?" 
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#C94A2C] transition-colors font-medium"
                                />
                                <button
                                    type="submit"
                                    className="group w-full bg-[#C94A2C] text-white py-4 px-6 rounded-full font-display text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-[#0D0D0D] transition-colors flex items-center justify-center gap-3"
                                >
                                    Send me the framework
                                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                                </button>
                            </form>
                            
                            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/30 mt-6">
                                We protect your inbox like we protect your brand.
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
