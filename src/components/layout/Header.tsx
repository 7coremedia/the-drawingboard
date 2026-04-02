import { NavLink, useLocation } from "react-router-dom";
import * as React from "react";
import { BRAND_CONFIG } from "@/config/brand";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isHidden, setIsHidden] = React.useState(false);
  const [isAtTop, setIsAtTop] = React.useState(true);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const lastScrollY = React.useRef(0);
  const location = useLocation();

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
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[60] h-16 md:h-20 transition-all duration-300",
        isHidden ? "-translate-y-full" : "translate-y-0",
        !isAtTop && "bg-black/0" // Transparent, relying on global CinematicNavbarBlur
      )}
    >
      <div className="w-full flex items-start justify-between px-6 md:px-10 py-6 relative">
        {/* Top Left: Logo (Text) */}
        <NavLink to="/" className="flex items-center gap-2 flex-shrink-0 pt-2" onClick={() => setMenuOpen(false)}>
          <span className="kode-wordmark text-lg sm:text-xl tracking-tight select-none" style={{color:'#F5F0E8', fontWeight:800, letterSpacing:'-0.05em', fontFamily:'"Inter",sans-serif', textTransform:'uppercase'}}>
            K<span style={{fontVariant:'normal'}}>Ō</span>D<span style={{fontVariant:'normal'}}>Ē</span>
          </span>
        </NavLink>

        {/* Top Right: Navigation */}
        <div className="flex items-center gap-4 pt-2">
          {/* Pill Navigation (Desktop) */}
          <nav className="hidden md:flex items-center bg-[#0D0D0D] rounded-full p-1.5 flex-shrink-0 border border-white/10 shadow-2xl">
            <NavLink
              to="/"
              className={({ isActive }) =>
                cn(
                  "px-5 py-1.5 rounded-full text-[13px] font-medium transition-all duration-300 whitespace-nowrap",
                  isActive ? "bg-[#C94A2C] text-[#F5F0E8]" : "text-white/60 hover:text-white"
                )
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                cn(
                  "px-5 py-1.5 rounded-full text-[13px] font-medium transition-all duration-300 whitespace-nowrap",
                  isActive ? "bg-[#C94A2C] text-[#F5F0E8]" : "text-white/60 hover:text-white"
                )
              }
            >
              Studio
            </NavLink>
            <NavLink
              to="/portfolio"
              className={({ isActive }) =>
                cn(
                  "px-5 py-1.5 rounded-full text-[13px] font-medium transition-all duration-300 whitespace-nowrap",
                  isActive ? "bg-[#C94A2C] text-[#F5F0E8]" : "text-white/60 hover:text-white"
                )
              }
            >
              Work
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                cn(
                  "px-5 py-1.5 rounded-full text-[13px] font-medium transition-all duration-300 whitespace-nowrap",
                  isActive ? "bg-[#C94A2C] text-[#F5F0E8]" : "text-white/60 hover:text-white"
                )
              }
            >
              Contact
            </NavLink>
          </nav>

          {/* Hamburger (Mobile) */}
          <button
            className="md:hidden text-white/80 hover:text-white p-2 rounded-full bg-white/5 border border-white/10 transition-colors backdrop-blur-md z-50"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>



        {/* Mobile Stacked Popup Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, scale: 0.9, filter: "blur(10px)" }}
              transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.8 }}
              className="absolute top-16 left-4 bg-[#0D0D0D] border border-white/10 rounded-3xl p-3 flex flex-col w-56 shadow-2xl md:hidden z-50 overflow-hidden"
            >
              <NavLink
                to="/"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "px-4 py-3.5 text-center text-lg font-medium transition-all duration-300 w-full rounded-[1.5rem]",
                    isActive ? "bg-[#C94A2C] text-[#F5F0E8]" : "text-white/70 hover:text-white hover:bg-white/5"
                  )
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/portfolio"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "px-4 py-3.5 text-center text-lg font-medium transition-all duration-300 w-full rounded-[1.5rem]",
                    isActive ? "bg-[#C94A2C] text-[#F5F0E8]" : "text-white/70 hover:text-white hover:bg-white/5"
                  )
                }
              >
                Work
              </NavLink>
              <NavLink
                to="/about"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "px-4 py-3.5 text-center text-lg font-medium transition-all duration-300 w-full rounded-[1.5rem]",
                    isActive ? "bg-[#C94A2C] text-[#F5F0E8]" : "text-white/70 hover:text-white hover:bg-white/5"
                  )
                }
              >
                Studio
              </NavLink>

              {/* Conditionally reveal Volume and Contact on mobile when on Studio page */}
              {isStudioPage && (
                <>
                  <NavLink
                    to="/volumes"
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "px-4 py-3.5 text-center text-lg font-medium transition-all duration-300 w-full rounded-[1.5rem]",
                        isActive ? "bg-[#0b00ff] text-white" : "text-white/70 hover:text-white hover:bg-white/5"
                      )
                    }
                  >
                    Volumes
                  </NavLink>
                  <NavLink
                    to="/contact"
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "px-4 py-3.5 text-center text-lg font-medium transition-all duration-300 w-full rounded-[1.5rem]",
                        isActive ? "bg-[#0b00ff] text-white" : "text-white/70 hover:text-white hover:bg-white/5"
                      )
                    }
                  >
                    Contact
                  </NavLink>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}