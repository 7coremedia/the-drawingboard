import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import {
  FileText,
  DownloadCloud,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  Loader2,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Portal() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [brand, setBrand] = useState<any>(null);
  const [milestones, setMilestones] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [assets, setAssets] = useState<any[]>([]);

  useEffect(() => {
    const fetchPortalData = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        // Fetch base brand details
        const { data: brandData, error: brandError } = await supabase
          .from("onboarding_responses")
          .select("brand_name, sender_name")
          .eq("id", id)
          .single();

        if (brandError) throw brandError;
        setBrand(brandData);

        // Fetch milestones
        const { data: milestoneData } = await supabase
          .from("project_milestones")
          .select("*")
          .eq("brand_id", id)
          .order("order_index", { ascending: true });
        
        if (milestoneData) setMilestones(milestoneData);

        // Fetch invoices
        const { data: invoiceData } = await supabase
          .from("client_invoices")
          .select("*")
          .eq("brand_id", id)
          .order("created_at", { ascending: false });
        
        if (invoiceData) setInvoices(invoiceData);

        // Fetch assets
        const { data: assetData } = await supabase
          .from("client_deliverables")
          .select("*")
          .eq("brand_id", id)
          .order("created_at", { ascending: false });
        
        if (assetData) setAssets(assetData);

      } catch (err) {
        console.error("Failed to load portal data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortalData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#C94A2C] animate-spin" />
      </div>
    );
  }

  // If accessed without ID or invalid ID
  if (!brand) {
    return (
      <div className="min-h-screen bg-[#F5F0E8] flex flex-col items-center justify-center p-6 text-center">
         <Lock className="w-12 h-12 text-black/20 mb-6" />
         <h1 className="text-3xl font-display font-black tracking-tight mb-2">Secure Portal</h1>
         <p className="text-black/50 font-medium max-w-sm mb-8">You need a valid tracking link to access your client portal.</p>
         <Button asChild className="bg-[#0D0D0D] text-white hover:bg-[#C94A2C] rounded-full uppercase text-[10px] tracking-widest px-8">
            <Link to="/">Return to KŌDĒ</Link>
         </Button>
      </div>
    );
  }

  // Helper to extract initials
  const getInitials = (name: string) => {
    if (!name) return "KD";
    const parts = name.split(" ");
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const clientName = brand.sender_name || "Partner";
  const completedMilestones = milestones.filter(m => m.status === 'completed').length;
  const progressPercent = milestones.length > 0 ? Math.round((completedMilestones / milestones.length) * 100) : 0;

  return (
    <div className="bg-[#F5F0E8] min-h-screen text-[#0D0D0D] font-sans selection:bg-[#C94A2C] selection:text-[#F5F0E8]">
      <Helmet>
        <title>{brand.brand_name || "Portal"} – KŌDĒ Client Network</title>
      </Helmet>

      {/* Minimalist Portal Header */}
      <header className="px-6 py-6 md:px-12 md:py-8 flex items-center justify-between border-b border-black/[0.05]">
        <div className="flex items-center gap-3">
           <span className="kode-wordmark text-xl tracking-tight font-black text-[#0D0D0D]">
             KŌDĒ
           </span>
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#C94A2C] bg-[#C94A2C]/10 px-2 py-1 rounded">
            Portal
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="hidden sm:flex border-black/10 hover:bg-black/5 hover:text-black rounded-full h-10 px-5 text-xs font-bold tracking-widest uppercase">
            <MessageSquare className="w-3.5 h-3.5 mr-2" /> Support
          </Button>
          <div className="w-10 h-10 rounded-full bg-white border border-black/10 flex items-center justify-center text-sm font-black shadow-sm">
            {getInitials(clientName)}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 md:py-16 md:px-12 max-w-6xl space-y-12 md:space-y-24">
        
        {/* Intro Section */}
        <section className="space-y-4">
          <p className="text-[10px] uppercase tracking-[0.4em] font-black text-[#C94A2C]">
            Project Directory — {brand.brand_name}
          </p>
          <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter leading-none">
            Welcome back, <br className="hidden md:block"/>
            <span className="text-black/30">{clientName}.</span>
          </h1>
          <p className="text-lg md:text-xl text-black/60 font-medium max-w-2xl mt-4">
            Track your project progress, manage invoices, and access your brand aesthetics all in one place.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Main Column (Milestones & Invoices) */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Milestones */}
            <section className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-black/[0.05] shadow-sm">
               <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-display font-black tracking-tighter">Project Matrix</h2>
                  <span className="text-[10px] font-bold bg-[#C94A2C]/10 uppercase tracking-widest text-[#C94A2C] px-3 py-1.5 rounded-full">
                    {progressPercent}% Completed
                  </span>
               </div>

               {milestones.length === 0 ? (
                 <div className="py-12 text-center border-2 border-dashed border-black/5 rounded-2xl">
                    <p className="text-sm font-medium text-black/40">Architecting timeline. Your milestones will appear here shortly.</p>
                 </div>
               ) : (
                 <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-[11px] before:w-px before:bg-black/10">
                   {milestones.map((stone) => (
                     <div key={stone.id} className="relative flex gap-6 items-start">
                       <div className={`w-6 h-6 rounded-full flex items-center justify-center z-10 shrink-0 ${stone.status === 'completed' ? 'bg-[#C94A2C] text-white' : stone.status === 'in-progress' ? 'bg-white border-2 border-[#C94A2C]' : 'bg-[#F5F0E8] border border-black/10'}`}>
                          {stone.status === 'completed' && <CheckCircle2 className="w-4 h-4" />}
                       </div>
                       <div className="flex-1 pb-6 border-b border-black/5 last:border-0 last:pb-0">
                          <div className="flex items-center justify-between">
                            <h3 className={`font-bold ${stone.status === 'pending' ? 'text-black/40' : 'text-black'} text-lg`}>
                              {stone.title}
                            </h3>
                            <span className="text-xs font-medium text-black/40">{stone.date_label}</span>
                          </div>
                          {stone.status === 'in-progress' && (
                            <div className="mt-3">
                              <span className="text-[10px] uppercase font-bold tracking-widest text-[#C94A2C] bg-[#C94A2C]/5 px-2 py-1 rounded">Active Phase</span>
                            </div>
                          )}
                       </div>
                     </div>
                   ))}
                 </div>
               )}
            </section>

            {/* Invoices */}
            <section className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-black/[0.05] shadow-sm">
               <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-display font-black tracking-tighter">Financials</h2>
                  <FileText className="w-5 h-5 text-black/30" />
               </div>

               {invoices.length === 0 ? (
                 <div className="py-12 text-center border-2 border-dashed border-black/5 rounded-2xl">
                    <p className="text-sm font-medium text-black/40">No outstanding invoices or ledgers currently active.</p>
                 </div>
               ) : (
                 <div className="space-y-4 flex flex-col">
                   {invoices.map(inv => (
                     <div key={inv.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 md:p-6 rounded-2xl bg-[#F5F0E8]/50 hover:bg-[#F5F0E8] transition-colors border border-black/5 gap-4">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                              <FileText className="w-4 h-4 text-black/60" />
                           </div>
                           <div>
                              <p className="font-bold text-sm tracking-tight">{inv.id}</p>
                              <p className="text-xs text-black/50 font-medium">{inv.date_label}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-4 sm:gap-6 ml-14 sm:ml-0">
                           <span className="font-display font-bold tracking-tight text-lg">{inv.amount}</span>
                           <span className={`text-[9px] w-16 text-center uppercase tracking-widest font-black px-2 py-1 rounded ${inv.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-red-100/50 text-[#C94A2C]'}`}>
                             {inv.status}
                           </span>
                           {inv.download_url && (
                             <a href={inv.download_url} target="_blank" rel="noreferrer" className="text-black/30 hover:text-black transition-colors" aria-label="Download Invoice">
                                <DownloadCloud className="w-5 h-5" />
                             </a>
                           )}
                        </div>
                     </div>
                   ))}
                 </div>
               )}
            </section>

          </div>

          {/* Sidebar (Assets & Actions) */}
          <div className="space-y-8 lg:space-y-12">
            
            {/* Quick Actions */}
            <section className="bg-black rounded-[2.5rem] p-8 text-white relative overflow-hidden">
               {/* Lighting effect */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[50px] pointer-events-none" />
              
              <h2 className="text-xl font-display font-black tracking-tighter mb-4 relative z-10">Need Assistance?</h2>
              <p className="text-white/60 text-sm mb-8 font-medium relative z-10 leading-relaxed">Connect directly with our team for questions about your clinical architecture.</p>
              
              <div className="space-y-3 relative z-10">
                <Button className="w-full bg-white text-black hover:bg-white/90 rounded-full h-12 font-bold uppercase tracking-widest text-[10px] transition-transform active:scale-95">
                  <MessageSquare className="w-4 h-4 mr-2" /> Open Chat
                </Button>
              </div>
            </section>

            {/* Deliverables Vault */}
            <section className="bg-white rounded-[2.5rem] p-8 border border-black/[0.05] shadow-sm">
               <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-display font-black tracking-tighter">Deliverables</h2>
                  {assets.length > 0 && <span className="text-[10px] bg-black/5 px-2 py-1 rounded uppercase tracking-widest font-bold text-black/50">{assets.length} Files</span>}
               </div>

               {assets.length === 0 ? (
                 <div className="py-8 text-center bg-[#F5F0E8]/50 rounded-2xl border border-black/5">
                   <p className="text-xs font-medium text-black/40">Vault is empty.</p>
                 </div>
               ) : (
                 <div className="space-y-3 flex flex-col">
                   {assets.map(asset => (
                     <a href={asset.download_url} target="_blank" rel="noreferrer" key={asset.id} className="group flex items-center justify-between p-4 rounded-2xl bg-[#F5F0E8]/50 hover:bg-[#0D0D0D] transition-colors border border-black/5 cursor-pointer">
                        <div className="mr-4">
                          <p className="text-sm font-bold text-black group-hover:text-white transition-colors line-clamp-1">{asset.name}</p>
                          <p className="text-[10px] text-black/40 group-hover:text-white/40 font-bold uppercase tracking-widest mt-0.5 transition-colors">{asset.file_type} • {asset.file_size}</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white group-hover:bg-[#333] flex items-center justify-center transition-colors shrink-0">
                          <ArrowRight className="w-3.5 h-3.5 text-black group-hover:text-white" />
                        </div>
                     </a>
                   ))}
                 </div>
               )}
            </section>

          </div>

        </div>
      </main>
    </div>
  );
}
