import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface AnnouncementBannerProps {
    message?: string;
    messageSecondary?: string;
    linkLabel?: string;
    linkTo?: string;
    pill?: string;
    bgColor?: string;
}

export default function AnnouncementBanner({
    message = "Now accepting Q2 projects",
    messageSecondary = "— 2 spots remaining",
    linkLabel = "Learn more",
    linkTo = "/portfolio",
    pill,
    bgColor = "#FFB16B",
}: AnnouncementBannerProps) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-[70] overflow-hidden h-14 md:h-16 flex items-center"
            style={{ backgroundColor: bgColor }}
        >
            <div className="container mx-auto px-4 md:px-6 flex flex-row items-center justify-center gap-2 md:gap-6">
                {pill && (
                    <span className="bg-black/10 text-[#0D0D0D] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap">
                        {pill}
                    </span>
                )}
                <p className="text-[12px] md:text-sm font-medium tracking-tight text-[#0D0D0D] text-center whitespace-nowrap">
                    {message} <span className="opacity-50 ml-1 hidden md:inline">{messageSecondary}</span>
                </p>
                <Link 
                    to={linkTo} 
                    className="group bg-black/10 hover:bg-black/20 text-[#0D0D0D] px-4 md:px-6 py-1 md:py-2 rounded-full text-[11px] md:text-[13px] font-medium transition-all flex items-center gap-1.5 whitespace-nowrap shadow-sm"
                >
                    {linkLabel} 
                    <span className="text-sm md:text-lg leading-none group-hover:translate-x-1 transition-transform">→</span>
                </Link>
            </div>
        </motion.div>
    );
}
