import { Link } from "react-router-dom";

export default function RedesignFooter() {
    return (
        <footer className="bg-white pt-24 md:pt-48 pb-20 border-t border-black/[0.05]">
            <div className="container px-6 max-w-7xl mx-auto">
                
                {/* 1. BRAND STATEMENT */}
                <div className="mb-24 md:mb-40 max-w-4xl">
                    <p className="font-display text-4xl md:text-6xl font-black text-[#0D0D0D] tracking-tighter leading-[0.95]">
                        We build brands that people have feelings about — the kind that travel across industries, borders, and every room you walk into. <span className="text-[#C94A2C]">That is the KŌDĒ standard.</span>
                    </p>
                </div>

                {/* 2. INFORMATION GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-20 mb-32 border-t border-black/[0.03] pt-16">
                    
                    {/* Contact Column */}
                    <div className="space-y-8">
                        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#C94A2C]">Contact</span>
                        <div className="flex flex-col gap-4">
                            <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" className="text-lg md:text-xl font-medium text-[#0D0D0D] hover:text-[#C94A2C] transition-all">Book a Call</a>
                            <a href="mailto:hello@kode.com.ng" className="text-lg md:text-xl font-medium text-[#0D0D0D] hover:text-[#C94A2C] transition-all">hello@kode.com.ng</a>
                            <a href="https://instagram.com/kode.designed" target="_blank" rel="noopener noreferrer" className="text-lg md:text-xl font-medium text-[#0D0D0D] hover:text-[#C94A2C] transition-all">@kode.designed</a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-lg md:text-xl font-medium text-[#0D0D0D] hover:text-[#C94A2C] transition-all">LinkedIn</a>
                        </div>
                    </div>

                    {/* Quick Links Column */}
                    <div className="space-y-8">
                        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#C94A2C]">Quick Links</span>
                        <div className="flex flex-col gap-4">
                            <Link to="/services" className="text-lg md:text-xl font-medium text-[#0D0D0D] hover:text-[#C94A2C] transition-all">Services</Link>
                            <Link to="/portfolio" className="text-lg md:text-xl font-medium text-[#0D0D0D] hover:text-[#C94A2C] transition-all">Work / Case Studies</Link>
                            <Link to="/about" className="text-lg md:text-xl font-medium text-[#0D0D0D] hover:text-[#C94A2C] transition-all">About</Link>
                            <Link to="/brand-audit" className="text-lg md:text-xl font-medium text-[#0D0D0D] hover:text-[#C94A2C] transition-all">Brand Audit</Link>
                        </div>
                    </div>

                    {/* Location Column */}
                    <div className="space-y-8">
                        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#C94A2C]">Location</span>
                        <div className="space-y-6">
                            <div className="space-y-1">
                                <p className="text-lg md:text-xl font-black text-[#0D0D0D]">Lagos, Nigeria</p>
                                <p className="text-lg md:text-xl font-black text-[#0D0D0D]">London, UK</p>
                            </div>
                            <p className="text-xs uppercase tracking-widest font-black text-[#C94A2C]">Working with clients globally</p>
                        </div>
                    </div>

                </div>

                {/* 3. BASE ANCHOR */}
                <div className="pt-20 border-t border-black/5">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                        <span
                            className="select-none pointer-events-none block text-left leading-none font-display font-black tracking-tighter text-[#C94A2C] text-[clamp(4rem,15vw,12rem)]"
                        >
                            KŌDĒ
                        </span>
                        
                        <div className="flex flex-col items-start md:items-end gap-4 text-[9px] uppercase tracking-[0.4em] font-bold text-black/20 pb-4">
                            <div className="flex gap-4">
                                <span>© 2026 KŌDĒ. All Rights Reserved.</span>
                                <span className="hidden md:inline">•</span>
                                <span>Lagos — London</span>
                            </div>
                            <span className="text-[#C94A2C]/40">Lifestyle Branding Studio</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
