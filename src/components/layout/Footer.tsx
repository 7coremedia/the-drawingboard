import { BRAND_CONFIG } from "@/config/brand";
import { cn } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <img
              src="/TheDrawingBoard Logo.svg"
              alt="The-DrawingBoard"
              className="h-10 w-auto mb-8 opacity-90"
            />
            <p className="text-white/40 max-w-sm font-medium leading-relaxed">
              Engineering cultural shifts through premium brand identity and strategic digital luxury.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Connect</h3>
            <ul className="space-y-4">
              <li><a href="mailto:studio@thedrawingboard.com.ng" className="text-white/60 hover:text-brand-blue transition-colors font-medium text-sm">studio@thedrawingboard.com.ng</a></li>
              <li><a href="#" className="text-white/60 hover:text-brand-blue transition-colors font-medium text-sm">Instagram</a></li>
              <li><a href="#" className="text-white/60 hover:text-brand-blue transition-colors font-medium text-sm">Twitter</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Studio</h3>
            <ul className="space-y-4">
              <li><a href="/about" className="text-white/60 hover:text-brand-blue transition-colors font-medium text-sm">Our Story</a></li>
              <li><a href="/portfolio" className="text-white/60 hover:text-brand-blue transition-colors font-medium text-sm">Work</a></li>
              <li><a href="/onboarding" className="text-white/60 hover:text-brand-blue transition-colors font-medium text-sm">Start a Project</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 gap-6">
          <p className="text-white/20 text-xs font-medium uppercase tracking-widest">
            © 2026 {BRAND_CONFIG.shortName}. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="/privacy" className="text-white/20 hover:text-white/40 transition-colors text-xs font-medium uppercase tracking-widest">Privacy Policy</a>
            <a href="/terms" className="text-white/20 hover:text-white/40 transition-colors text-xs font-medium uppercase tracking-widest">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
