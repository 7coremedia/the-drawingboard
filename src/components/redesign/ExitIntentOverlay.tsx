import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, ArrowRight, ShieldCheck, CheckCircle2, Loader2, DownloadCloud } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function ExitIntentOverlay() {
    const [isVisible, setIsVisible] = useState(false);
    const [hasTriggered, setHasTriggered] = useState(false);
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<'idle' | 'loading' | 'unlocked'>('idle');

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
        // Reset state after close animation completes
        setTimeout(() => setStatus('idle'), 500);
    };

    const handleUnlock = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');

        try {
            // Save lead to database
            await supabase.from("lead_captures").insert([{ email, source: 'exit-intent-pbl' }]);
            
            // Simulate deep verification animation (2.5s)
            setTimeout(() => {
                setStatus('unlocked');
            }, 2500);
        } catch (error) {
            console.error("Lead capture failed:", error);
            setStatus('idle');
        }
    };

    // Replace with your actual Supabase storage URL once uploaded
    const pdfUrl = "https://your-supabase-project.supabase.co/storage/v1/object/public/portal_assets/Personal%20Brand%20Launcher.pdf";

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
                        className="bg-[#0D0D0D] text-white w-full max-w-xl rounded-[2.5rem] p-6 md:p-10 relative z-10 shadow-2xl overflow-y-auto max-h-[90vh] no-scrollbar"
                    >
                        {/* Background flare */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C94A2C]/20 blur-[100px] pointer-events-none" />

                        <button 
                            onClick={closeOverlay}
                            className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white"
                        >
                            <X size={20} />
                        </button>

                        {/* Content States */}
                        <AnimatePresence mode="wait">
                            {status === 'idle' && (
                                <motion.div 
                                    key="idle"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="flex flex-col items-center text-center"
                                >
                                    <motion.div 
                                        initial={{ rotateY: -10, rotateX: 5 }}
                                        animate={{ rotateY: [0, -10, 0], y: [0, -8, 0] }}
                                        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                                        style={{ perspective: "1000px" }}
                                        className="mb-6 w-32 md:w-40 relative shrink-0"
                                    >
                                        <div className="absolute -inset-4 bg-[#C94A2C]/20 blur-2xl rounded-full" />
                                        <img 
                                            src="/Personal Brand Launcher page/Personal Brand Launcher Cheatsheet Cover.png" 
                                            alt="Personal Brand Launcher Cover" 
                                            className="w-full h-auto object-contain relative z-10 shadow-[20px_20px_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.1)] rounded-md"
                                        />
                                    </motion.div>
                                    
                                    <h2 className="text-2xl md:text-3xl font-display font-medium tracking-tight mb-3">
                                        Don't leave your brand to chance.
                                    </h2>
                                    
                                    <p className="text-white/60 text-sm md:text-base mb-6 max-w-md">
                                        Get the <span className="text-white font-bold">Personal Brand Launcher PDF</span> — our internal diagnostic checklist used to validate ₦100M+ brands.
                                    </p>

                                    <form className="w-full space-y-4" onSubmit={handleUnlock}>
                                        <input 
                                            type="email" 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Where should we send it?" 
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-full px-5 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#C94A2C] transition-colors font-medium text-sm"
                                        />
                                        <button
                                            type="submit"
                                            className="group w-full bg-[#C94A2C] text-white py-3.5 px-6 rounded-full font-display text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-[#0D0D0D] transition-colors flex items-center justify-center gap-3 shadow-lg"
                                        >
                                            Unlock Framework
                                            <ShieldCheck size={16} className="transition-transform group-hover:scale-110" />
                                        </button>
                                    </form>
                                    
                                    <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/30 mt-6">
                                        We protect your inbox like we protect your brand.
                                    </p>
                                </motion.div>
                            )}

                            {status === 'loading' && (
                                <motion.div 
                                    key="loading"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.1 }}
                                    className="flex flex-col items-center justify-center text-center py-12"
                                >
                                    <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
                                        <motion.div 
                                            animate={{ rotate: 360 }}
                                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                            className="absolute inset-0 rounded-full border-2 border-white/10 border-t-[#C94A2C] border-r-[#C94A2C]"
                                        />
                                        <motion.div 
                                            animate={{ rotate: -360 }}
                                            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                                            className="absolute inset-2 rounded-full border border-white/5 border-b-white/50"
                                        />
                                        <ShieldCheck size={32} className="text-[#C94A2C] animate-pulse" />
                                    </div>
                                    <h3 className="text-xl font-display font-bold tracking-widest uppercase mb-2">Authenticating</h3>
                                    <p className="text-white/40 text-sm font-medium tracking-wide">Securing your framework access...</p>
                                </motion.div>
                            )}

                            {status === 'unlocked' && (
                                <motion.div 
                                    key="unlocked"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center text-center py-8"
                                >
                                    <motion.div 
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                        className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                                    >
                                        <CheckCircle2 size={40} className="text-[#0D0D0D]" />
                                    </motion.div>
                                    
                                    <h3 className="text-3xl font-display font-black tracking-tighter mb-4">Access Granted.</h3>
                                    <p className="text-white/60 mb-8 max-w-sm">
                                        Your email has been securely verified. You can now download the Personal Brand Launcher.
                                    </p>

                                    <a 
                                        href={pdfUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        onClick={closeOverlay}
                                        className="group w-full bg-white text-[#0D0D0D] py-4 px-6 rounded-full font-display text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#C94A2C] hover:text-white transition-colors flex items-center justify-center gap-3 shadow-xl"
                                    >
                                        Download PDF Now
                                        <DownloadCloud size={16} className="transition-transform group-hover:-translate-y-1" />
                                    </a>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
