import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function AnnouncementBanner() {
    return (
        <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#FFB16B] relative z-[70] overflow-hidden h-14 md:h-16 flex items-center"
        >
            <div className="container mx-auto px-4 md:px-6 flex flex-row items-center justify-center gap-2 md:gap-6">
                <p className="text-[12px] md:text-sm font-medium tracking-tight text-[#0D0D0D] text-center whitespace-nowrap">
                    PR services launching soon <span className="opacity-50 ml-1 hidden md:inline">(We now take you global)</span>
                </p>
                <Link 
                    to="/portfolio" 
                    className="group bg-black/10 hover:bg-black/20 text-[#0D0D0D] px-4 md:px-6 py-1 md:py-2 rounded-full text-[11px] md:text-[13px] font-medium transition-all flex items-center gap-1.5 whitespace-nowrap shadow-sm"
                >
                    Learn more 
                    <span className="text-sm md:text-lg leading-none group-hover:translate-x-1 transition-transform">→</span>
                </Link>
            </div>
        </motion.div>
    );
}
