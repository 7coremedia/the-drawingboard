import { motion } from "framer-motion";
import { TrendingUp, ShieldCheck } from "lucide-react";

export default function SocialProofTicker() {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 border-y border-black/5 py-4 mb-10 w-full overflow-hidden"
        >
            <div className="flex items-center gap-3 shrink-0">
                <div className="w-8 h-8 rounded-full bg-[#3D2C1F] flex items-center justify-center text-[#F5F0E8]">
                    <ShieldCheck size={16} />
                </div>
                <div className="flex flex-col">
                    <span className="text-[14px] font-display font-medium text-[#0D0D0D] leading-tight">20+ Brands Built</span>
                    <span className="text-[10px] uppercase tracking-widest text-[#0D0D0D]/40 font-bold">Since 2024</span>
                </div>
            </div>

            <div className="hidden sm:block w-px h-8 bg-black/10 shrink-0" />

            <div className="flex items-center gap-3 shrink-0">
                <div className="w-8 h-8 rounded-full bg-[#C94A2C] flex items-center justify-center text-white">
                    <TrendingUp size={16} />
                </div>
                <div className="flex flex-col">
                    <span className="text-[14px] font-display font-medium text-[#0D0D0D] leading-tight">₦180M+ ROI Generated</span>
                    <span className="text-[10px] uppercase tracking-widest text-[#0D0D0D]/40 font-bold">In Client Value</span>
                </div>
            </div>
            
            <div className="hidden sm:block w-px h-8 bg-black/10 shrink-0" />
            
            <div className="flex items-center gap-3 shrink-0">
                 <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                         <div key={i} className="w-8 h-8 rounded-full border-2 border-[#F5F0E8] bg-black/5 flex items-center justify-center text-[#0D0D0D]/40 font-bold text-[8px]">
                             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                         </div>
                    ))}
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[14px] font-display font-medium text-[#0D0D0D] leading-tight">Global Roster</span>
                    <span className="text-[10px] uppercase tracking-widest text-[#0D0D0D]/40 font-bold">Lagos · London</span>
                </div>
            </div>
        </motion.div>
    );
}
