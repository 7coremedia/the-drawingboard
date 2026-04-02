import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const TESTIMONIALS = [
    {
        quote: "Closed a seed round of $500K within two months of the rebrand. Now in active conversations with Series A investors.",
        name: "Confidential",
        title: "Founder",
        company: "Lagos-based Fintech Startup",
        outcome: "Fundraising Success"
    },
    {
        quote: "Increased average order value by 40% and expanded to the UK market.",
        name: "Confidential",
        title: "CEO",
        company: "E-Commerce Luxury Brand",
        outcome: "Revenue Growth"
    },
    {
        quote: "Secured 3 enterprise-level retainer clients within 6 months.",
        name: "Confidential",
        title: "Managing Partner",
        company: "Creative Agency",
        outcome: "Market Retention"
    }
];

export default function Testimonials() {
    return (
        <section className="py-24 md:py-48 bg-[#F5F0E8] border-t border-black/5 relative overflow-hidden">
            <div className="container px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-16 md:mb-32">
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#C94A2C] mb-6 block">Results</span>
                    <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter text-[#0D0D0D] leading-tight">What happened after.</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-7xl mx-auto">
                    {TESTIMONIALS.map((testimonial, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="p-10 rounded-[3rem] bg-white border border-black/5 flex flex-col justify-between shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)] transition-all duration-500 hover:scale-[1.02]"
                        >
                            <div className="space-y-8">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 size={12} className="text-[#C94A2C]" />
                                        <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#C94A2C]">{testimonial.outcome}</span>
                                    </div>
                                    <div className="text-[#0D0D0D]/10">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 21V3M12 3L21 12M12 3L3 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-[#0D0D0D]/70 text-lg md:text-2xl font-medium leading-relaxed tracking-tight">
                                    "{testimonial.quote}"
                                </p>
                            </div>
                            
                            <div className="pt-10 mt-10 border-t border-black/5">
                                <h4 className="text-[#0D0D0D] font-display text-xl font-black tracking-tight">{testimonial.name}</h4>
                                <p className="text-[#0D0D0D]/30 text-xs font-bold uppercase tracking-widest mt-2">{testimonial.title} — {testimonial.company}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
