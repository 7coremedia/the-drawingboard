import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useUser } from "@/hooks/usePortfolioAuth";
import PortfolioManager from "@/components/admin/PortfolioManager";
import { Button } from "@/components/ui/button";
import { Plus, Database, ShieldAlert } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function DashboardPortfolio() {
  const { user, role } = useUser();
  const navigate = useNavigate();

  // Redirect if not authorized
  useEffect(() => {
    if (!user || !(role?.is_admin || role?.is_moderator || role?.is_worker)) {
      navigate("/");
    }
  }, [user, role, navigate]);

  if (!user || !(role?.is_admin || role?.is_moderator || role?.is_worker)) {
    return (
      <main className="min-h-screen bg-[#F5F0E8] flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full space-y-8 text-center">
            <div className="w-20 h-20 bg-white rounded-[2.5rem] border border-black/5 flex items-center justify-center mx-auto shadow-xl">
                 <ShieldAlert size={32} className="text-[#C94A2C]" />
            </div>
            <div className="space-y-4">
                <h1 className="text-3xl font-display font-black tracking-tighter uppercase">Access Suspended</h1>
                <p className="text-[#0D0D0D]/60 font-bold text-sm tracking-wide leading-relaxed">
                    Personnel credentials insufficient for exhibition database orchestration. Contact system lead for Stage 4 clearance.
                </p>
            </div>
            <Button onClick={() => navigate("/")} className="bg-black text-white px-8 rounded-full h-12 text-[10px] font-black uppercase tracking-widest">Return to Base</Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F0E8] text-[#0D0D0D] py-16 md:py-24 selection:bg-[#C94A2C] selection:text-white">
      <Helmet>
        <title>Exhibition Registry – ŌDEY</title>
      </Helmet>
      
      <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <span className="text-[10px] uppercase tracking-[0.5em] font-black text-[#C94A2C]">Archival Governance</span>
                    <div className="h-px w-12 bg-black/10" />
                </div>
                <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter leading-none uppercase">Portfolio <br /><span className="text-black/20">Registry.</span></h1>
            </div>
            
            <Button 
                onClick={() => navigate("/management/portfolio/new")}
                className="bg-[#0D0D0D] hover:bg-[#C94A2C] text-white px-10 py-8 h-auto rounded-full text-[11px] font-black uppercase tracking-widest shadow-2xl transition-all"
            >
              <Plus className="w-5 h-5 mr-3" />
              Initiate New Protocol
            </Button>
          </div>

          <div className="relative">
              <div className="absolute -top-12 left-0 flex items-center gap-3 opacity-40">
                  <Database size={16} />
                  <span className="text-[9px] font-black uppercase tracking-[0.3em]">Live Feed: Supabase_Instance_01</span>
              </div>
              <PortfolioManager />
          </div>
      </div>
    </main>
  );
}