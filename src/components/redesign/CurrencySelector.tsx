import { useState, useRef, useEffect } from "react";
import { useCurrency, Currency } from "@/context/CurrencyContext";
import { ChevronDown } from "lucide-react";

const OPTIONS: { value: Currency; label: string; symbol: string }[] = [
  { value: "NGN", label: "Naira", symbol: "₦" },
  { value: "USD", label: "Dollar", symbol: "$" },
  { value: "EUR", label: "Euro", symbol: "€" },
];

export default function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const current = OPTIONS.find((o) => o.value === currency)!;

  return (
    <div ref={ref} className="relative inline-flex">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm border border-black/[0.06] rounded-full px-4 py-2 text-[12px] font-bold uppercase tracking-[0.15em] text-[#0D0D0D]/70 hover:bg-white hover:border-black/10 transition-all shadow-sm"
      >
        <span className="text-[#C94A2C] font-black text-sm">{current.symbol}</span>
        <span>{current.label}</span>
        <ChevronDown
          size={14}
          className={`text-black/30 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute top-full mt-2 right-0 bg-white rounded-2xl border border-black/[0.06] shadow-xl overflow-hidden z-50 min-w-[140px]">
          {OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                setCurrency(opt.value);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-5 py-3 text-left text-[12px] font-bold uppercase tracking-[0.1em] transition-colors ${
                currency === opt.value
                  ? "bg-[#F5F0E8] text-[#C94A2C]"
                  : "text-[#0D0D0D]/60 hover:bg-[#F5F0E8]/50"
              }`}
            >
              <span className="text-sm font-black w-4">{opt.symbol}</span>
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
