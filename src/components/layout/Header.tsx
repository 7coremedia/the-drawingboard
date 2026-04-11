import { NavLink, useLocation } from "react-router-dom";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function useNavColorMode() {
  const [isDark, setIsDark] = React.useState(true);

  React.useEffect(() => {
    const detect = () => {
      // Sample at y=110 — below navbar (80px) but clear of the blur layer's top stacking
      const el = document.elementFromPoint(window.innerWidth / 2, 110) as HTMLElement | null;
      let target = el;
      while (target && target !== document.body) {
        const bg = window.getComputedStyle(target).backgroundColor;
        if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
          const m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
          if (m) {
            const lum = (0.299 * +m[1] + 0.587 * +m[2] + 0.114 * +m[3]) / 255;
            setIsDark(lum < 0.55);
            return;
          }
        }
        target = target.parentElement as HTMLElement | null;
      }
      setIsDark(true);
    };

    detect();
    const id = setInterval(detect, 200); // re-check periodically too
    window.addEventListener("scroll", detect, { passive: true });
    return () => {
      clearInterval(id);
      window.removeEventListener("scroll", detect);
    };
  }, []);

  return isDark;
}

export default function Header() {
  const [isHidden, setIsHidden] = React.useState(false);
  const [isAtTop, setIsAtTop] = React.useState(true);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const lastScrollY = React.useRef(0);
  const location = useLocation();
  const isDark = useNavColorMode();

  const isStudioPage = location.pathname === '/about';

  React.useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      const threshold = 8;
      const atTop = currentY < 10;
      setIsAtTop(atTop);

      if (atTop) {
        setIsHidden(false);
      } else if (delta > threshold && !menuOpen) {
        setIsHidden(true);
      } else if (delta < -threshold) {
        setIsHidden(false);
      }
      lastScrollY.current = currentY;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  // Derived palette
  const logoColor    = isDark ? "#F5F0E8" : "#0D0D0D";
  const pillBg       = isDark ? "bg-black/80 border-white/10" : "bg-white/90 border-black/10";
  const pillText     = isDark ? "text-white/60 hover:text-white" : "text-black/60 hover:text-black";
  const hamburgerCls = isDark
    ? "text-white/80 hover:text-white bg-white/5 border-white/10"
    : "text-black/80 hover:text-black bg-black/5 border-black/10";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[60] h-16 md:h-20 transition-all duration-300",
        isHidden ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <div className="w-full flex items-start justify-between px-6 md:px-10 py-6 relative">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 flex-shrink-0 pt-2" onClick={() => setMenuOpen(false)}>
          <span
            className="kode-wordmark text-lg sm:text-xl tracking-tight select-none transition-colors duration-300"
            style={{ color: logoColor, fontWeight: 800, letterSpacing: '-0.05em', fontFamily: '"Inter",sans-serif', textTransform: 'uppercase' }}
          >
            K<span style={{ fontVariant: 'normal' }}>Ō</span>D<span style={{ fontVariant: 'normal' }}>Ē</span>
          </span>
        </NavLink>

        {/* Desktop Pill Nav */}
        <div className="flex items-center gap-4 pt-2">
          <nav className={cn(
            "hidden md:flex items-center rounded-full p-1.5 flex-shrink-0 border shadow-2xl backdrop-blur-md transition-all duration-300",
            pillBg
          )}>
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "Studio" },
              { to: "/portfolio", label: "Work" },
              { to: "/volumes", label: "Volumes" },
              { to: "/contact", label: "Contact" },
            ].map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  cn(
                    "px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-300 whitespace-nowrap",
                    isActive
                      ? "bg-[#C94A2C] text-[#F5F0E8]"
                      : pillText
                  )
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Hamburger (Mobile) */}
          <button
            className={cn(
              "md:hidden p-2 rounded-full border transition-colors backdrop-blur-md z-50",
              hamburgerCls
            )}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, scale: 0.9, filter: "blur(10px)" }}
              transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.8 }}
              className={cn(
                "absolute top-16 left-4 border rounded-3xl p-3 flex flex-col w-56 shadow-2xl md:hidden z-50 overflow-hidden backdrop-blur-xl",
                isDark ? "bg-[#0D0D0D]/95 border-white/10" : "bg-white/95 border-black/10"
              )}
            >
              {[
                { to: "/", label: "Home" },
                { to: "/portfolio", label: "Work" },
                { to: "/about", label: "Studio" },
                { to: "/volumes", label: "Volumes" },
                { to: "/contact", label: "Contact" },
              ].map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === "/"}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "px-4 py-3.5 text-center text-lg font-medium transition-all duration-300 w-full rounded-[1.5rem]",
                      isActive
                        ? "bg-[#C94A2C] text-[#F5F0E8]"
                        : isDark
                          ? "text-white/70 hover:text-white hover:bg-white/5"
                          : "text-black/70 hover:text-black hover:bg-black/5"
                    )
                  }
                >
                  {label}
                </NavLink>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}