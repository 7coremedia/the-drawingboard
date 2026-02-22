import { motion } from "framer-motion";

export default function Showcase() {
    return (
        <section className="py-24 md:py-32 bg-black overflow-hidden border-t border-white/5">
            <div className="container px-6">
                <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold mb-4 block">Case Study Spotlight</span>
                    <h2 className="text-3xl md:text-5xl font-display tracking-tight text-white italic">Design as a Weapon of Influence.</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 max-w-7xl mx-auto">
                    {/* Main Case Study */}
                    <div className="md:col-span-8 flex flex-col gap-6 md:gap-8">
                        <div className="flex items-center justify-between px-2">
                            <h3 className="text-5xl md:text-7xl font-display font-bold tracking-tighter uppercase">LOOMROOMS<span className="text-zinc-700">.</span></h3>
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 font-display text-xl md:text-2xl backdrop-blur-xl">
                                01
                            </div>
                        </div>

                        <motion.div
                            whileHover={{ scale: 0.995 }}
                            className="aspect-video rounded-[2rem] md:rounded-[3rem] bg-zinc-900 overflow-hidden relative group border border-white/10 shadow-2xl"
                        >
                            <img
                                src="/redesign/loomrooms_showcase.png"
                                alt="LoomRooms Showcase"
                                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />

                            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 text-left space-y-2">
                                <p className="text-white/40 text-[10px] uppercase tracking-[0.4em] font-bold">Physical & Digital Identity</p>
                                <p className="text-white text-lg md:text-xl font-medium tracking-tight">Redefining the future of premium workspaces.</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar Elements */}
                    <div className="md:col-span-4 flex flex-col justify-between py-4">
                        {/* Text Content */}
                        <div className="space-y-10 mb-12">
                            <div className="space-y-3">
                                <h4 className="font-display font-bold text-sm uppercase tracking-widest text-white border-l-2 border-zinc-500 pl-4">Institutional Presence</h4>
                                <p className="text-zinc-500 text-sm leading-relaxed pl-4">Establishing market authority through psychological design cues and high-touch visual systems.</p>
                            </div>
                            <div className="space-y-3">
                                <h4 className="font-display font-bold text-sm uppercase tracking-widest text-white border-l-2 border-zinc-500 pl-4">Category Monolith</h4>
                                <p className="text-zinc-500 text-sm leading-relaxed pl-4">We position your brand as the only logical choice, rendering competition secondary in the mind of the consumer.</p>
                            </div>
                            <div className="space-y-3">
                                <h4 className="font-display font-bold text-sm uppercase tracking-widest text-white border-l-2 border-zinc-500 pl-4">Intergenerational Legacy</h4>
                                <p className="text-zinc-500 text-sm leading-relaxed pl-4">Brands architected not for the next fiscal quarter, but for the next half-century of cultural shifts.</p>
                            </div>
                        </div>

                        {/* Palette/Typography Card (Now Dark/Glass) */}
                        <div className="rounded-[2rem] bg-zinc-900/40 border border-white/10 p-8 md:p-10 flex flex-col justify-between min-h-[320px] backdrop-blur-3xl shadow-2xl">
                            <div className="flex justify-between items-start">
                                <div className="flex flex-col gap-1.5">
                                    <div className="w-12 h-6 bg-[#FEA301] rounded-sm opacity-90 shadow-[0_0_15px_rgba(254,163,1,0.2)]" />
                                    <div className="w-12 h-6 bg-zinc-800 rounded-sm" />
                                    <div className="w-12 h-6 bg-zinc-100 rounded-sm" />
                                    <div className="w-12 h-6 bg-brand-blue rounded-sm opacity-90 shadow-[0_0_15px_rgba(0,85,255,0.2)]" />
                                </div>
                                <div className="text-white text-right">
                                    <p className="text-4xl md:text-5xl font-display font-light">Aa<sub className="text-[10px] bottom-0 opacity-40">/12</sub></p>
                                    <p className="text-5xl md:text-6xl font-display font-black italic tracking-tighter">AA<sub className="text-[10px] bottom-0 opacity-40">/01</sub></p>
                                </div>
                            </div>
                            <div className="mt-8 space-y-1">
                                <p className="text-white/20 text-[9px] uppercase font-bold tracking-[0.4em]">Visual Protocol v2.0</p>
                                <p className="text-zinc-400 text-xs font-medium">Core Brand System for LoomRooms™</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
