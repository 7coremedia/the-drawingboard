import { Sparkle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AnnouncementBanner({ className }: { className?: string }) {
    return (
        <div className={cn("inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full shadow-2xl animate-fade-in", className)}>
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <p className="text-[9px] md:text-sm font-medium text-white/80 flex items-center gap-2 uppercase tracking-widest leading-none">
                <Sparkle className="w-3 h-3" />
                <span className="truncate max-w-[70vw] md:max-w-none">PR Media Services Launching Soon <span className="hidden sm:inline">— Amplify Your Brand</span></span>
            </p>
        </div>
    );
}
