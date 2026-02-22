import { cn } from "@/lib/utils";

export default function RedesignFooter() {
    return (
        <footer className="bg-black pt-20 md:pt-32 pb-10">
            <div className="container px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-20 md:mb-32 items-end">
                    {/* Vertical Pillars */}
                    <div className="flex flex-col gap-0">
                        <span className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.85] text-white">TECH</span>
                        <span className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.85] text-white">FASHION</span>
                        <span className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.85] text-white/40">MUSIC</span>
                        <span className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.85] text-white">CULTURE</span>
                    </div>

                    {/* Abstract Block & Links */}
                    <div className="flex flex-col gap-10">
                        <div className="aspect-square w-full max-w-sm rounded-3xl bg-[#3C0A0A] border border-white/5 opacity-80" />

                        <div className="grid grid-cols-2 gap-10">
                            <div className="flex flex-col gap-4">
                                <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">Contact</span>
                                <a href="mailto:hello@tdb.studio" className="text-sm text-white/60 hover:text-white transition-colors">hello@tdb.studio</a>
                                <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Instagram</a>
                            </div>
                            <div className="flex flex-col gap-4 text-right">
                                <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">Location</span>
                                <p className="text-sm text-white/60">Lagos, Nigeria</p>
                                <p className="text-sm text-white/60">London, UK</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Massive Logo */}
                <div className="pt-12 md:pt-20 border-t border-white/5 flex justify-center">
                    <img
                        src="/TheDrawingBoard Logo.svg"
                        alt="The-DrawingBoard"
                        className="w-full h-auto max-w-[85vw] md:max-w-7xl opacity-90 select-none pointer-events-none"
                    />
                </div>

                <div className="mt-8 flex justify-center md:justify-between items-center text-[7px] md:text-[8px] uppercase tracking-[0.4em] text-zinc-700">
                    <span>All Rights Reserved 2026</span>
                </div>
            </div>
        </footer>
    );
}
