import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Currency = "NGN" | "USD" | "EUR";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  symbol: string;
  formatPrice: (usd: number) => string;
}

const SYMBOLS: Record<Currency, string> = { NGN: "₦", USD: "$", EUR: "€" };
const RATES: Record<Currency, number> = { USD: 1, NGN: 1600, EUR: 0.92 };

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    try {
      const stored = localStorage.getItem("kode-currency");
      if (stored === "NGN" || stored === "USD" || stored === "EUR") return stored;
    } catch {}
    return "USD";
  });

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    try { localStorage.setItem("kode-currency", c); } catch {}
  };

  const symbol = SYMBOLS[currency];

  const formatPrice = (usd: number) => {
    const converted = Math.round(usd * RATES[currency]);
    if (currency === "NGN") {
      return `${SYMBOLS.NGN}${converted.toLocaleString()}`;
    }
    if (currency === "EUR") {
      return `€${converted.toLocaleString()}`;
    }
    return `$${converted.toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, symbol, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
