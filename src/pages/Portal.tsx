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
  Activity,
  Layers,
  Banknote,
  LayoutTemplate,
  Plus,
  X,
  Upload
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/usePortfolioAuth";
import { toast } from "sonner";

export default function Portal() {
  const { id } = useParams();
  const { role } = useUser();
  const isAdmin = role?.is_admin || role?.is_moderator || role?.is_worker;

  const [loading, setLoading] = useState(true);
  const [brand, setBrand] = useState<any>(null);
  const [milestones, setMilestones] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [assets, setAssets] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'matrix' | 'growth' | 'finance'>('matrix');

  // Admin Form States
  const [showMilestoneForm, setShowMilestoneForm] = useState(false);
  const [newMilestone, setNewMilestone] = useState({ title: '', date_label: '' });
  
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [newInvoice, setNewInvoice] = useState({ id: '', date_label: '', amount: '', download_url: '' });

  const [showAssetForm, setShowAssetForm] = useState(false);
  const [newAsset, setNewAsset] = useState({ name: '', file_type: '', file_size: '', download_url: '' });
  const [isUploadingAsset, setIsUploadingAsset] = useState(false);

  const handleAssetUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !id) return;
    setIsUploadingAsset(true);
    try {
       const fileExt = file.name.split('.').pop();
       const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
       const filePath = `${id}/${fileName}`;
       const { error: uploadError } = await supabase.storage.from('portal_assets').upload(filePath, file);
       if (uploadError) throw uploadError;
       const { data } = supabase.storage.from('portal_assets').getPublicUrl(filePath);
       
       const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
       setNewAsset({
          name: file.name.replace(`.${fileExt}`, ''),
          file_type: fileExt?.toUpperCase() || 'FILE',
          file_size: `${sizeMb} MB`,
          download_url: data.publicUrl
       });
    } catch (err) {
       console.error("Upload failed", err);
       alert("Failed to upload file. Check permissions.");
    } finally {
       setIsUploadingAsset(false);
    }
  };

  const [enteredPin, setEnteredPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinError, setPinError] = useState(false);

  useEffect(() => {
    const fetchPortalData = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const { data: brandData, error: brandError } = await supabase
          .from("onboarding_responses")
          .select("brand_name, sender_name, portal_pin")
          .eq("id", id)
          .single();

        if (brandError) throw brandError;
        setBrand(brandData);

        const { data: milestoneData } = await supabase
          .from("project_milestones")
          .select("*")
          .eq("brand_id", id)
          .order("order_index", { ascending: true });
        
        if (milestoneData) setMilestones(milestoneData);

        const { data: invoiceData } = await supabase
          .from("client_invoices")
          .select("*")
          .eq("brand_id", id)
          .order("created_at", { ascending: false });
        
        if (invoiceData) setInvoices(invoiceData);

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

  if (brand && !isAuthenticated && !isAdmin) {
    const handlePinSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (brand.portal_pin && enteredPin === brand.portal_pin) {
         setIsAuthenticated(true);
         setPinError(false);
      } else {
         setPinError(true);
      }
    };

    return (
      <div className="min-h-screen bg-[#F5F0E8] flex flex-col items-center justify-center p-6 text-center">
         <Lock className="w-12 h-12 text-[#C94A2C] mb-6" />
         <h1 className="text-3xl font-display font-black tracking-tight mb-2">Secure Protocol Access</h1>
         <p className="text-black/50 font-medium max-w-sm mb-8">Enter your 6-digit access PIN to unlock the {brand.brand_name} portal.</p>
         
         <form onSubmit={handlePinSubmit} className="flex flex-col items-center gap-4 w-full max-w-xs">
            <input 
              type="password" 
              maxLength={6}
              value={enteredPin}
              onChange={(e) => { setEnteredPin(e.target.value); setPinError(false); }}
              placeholder="••••••" 
              className={`w-full text-center text-3xl tracking-[1em] font-mono bg-white border ${pinError ? 'border-red-500' : 'border-black/10'} rounded-xl py-4 shadow-sm outline-none focus:border-[#C94A2C] transition-colors`} 
            />
            {pinError && <p className="text-xs text-red-500 font-bold uppercase tracking-widest">Invalid PIN Code</p>}
            
            <Button type="submit" className="w-full bg-[#0D0D0D] text-white hover:bg-[#C94A2C] rounded-full uppercase text-[10px] tracking-widest h-12 mt-2">
              Unlock Portal
            </Button>
         </form>

         <div className="mt-12">
            <Link to="/contact" className="text-[10px] font-bold text-black/40 hover:text-black uppercase tracking-widest transition-colors flex items-center gap-2">
               <MessageSquare className="w-3 h-3" /> Request New PIN
            </Link>
         </div>
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="min-h-screen bg-[#F5F0E8] flex flex-col items-center justify-center p-6 text-center">
         <Lock className="w-12 h-12 text-black/20 mb-6" />
         <h1 className="text-3xl font-display font-black tracking-tight mb-2">Secure Portal</h1>
         <p className="text-black/50 font-medium max-w-sm mb-8">You need a valid tracking link to access your client portal.</p>
         <Button asChild className="bg-[#0D0D0D] text-white hover:bg-[#C94A2C] rounded-full uppercase text-[10px] tracking-widest px-8">
            <Link to="/">Return to ŌDEY</Link>
         </Button>
      </div>
    );
  }

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

  const tabs = [
    { id: 'matrix', label: 'Project Matrix', icon: LayoutTemplate },
    { id: 'growth', label: 'Growth & Intel', icon: Activity },
    { id: 'finance', label: 'Financials', icon: Banknote }
  ] as const;

  return (
    <div className="bg-[#F5F0E8] min-h-screen text-[#0D0D0D] font-sans selection:bg-[#C94A2C] selection:text-[#F5F0E8]">
      <Helmet>
        <title>{brand.brand_name || "Portal"} – ŌDEY</title>
      </Helmet>

      {/* Minimalist Portal Header */}
      <header className="px-6 py-6 md:px-12 md:py-8 flex items-center justify-between border-b border-black/[0.05]">
        <div className="flex items-center gap-3">
           <span className="kode-wordmark text-xl tracking-tight font-black text-[#0D0D0D]">
             ŌDEY
           </span>
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#C94A2C] bg-[#C94A2C]/10 px-2 py-1 rounded">
            Portal
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="hidden sm:flex border-black/10 text-black hover:bg-black hover:text-white rounded-full h-10 px-5 text-[10px] font-bold tracking-widest uppercase transition-all">
            <MessageSquare className="w-3.5 h-3.5 mr-2" /> Support
          </Button>
          <div className="w-10 h-10 rounded-full bg-white border border-black/10 flex items-center justify-center text-sm font-black shadow-sm text-black">
            {getInitials(clientName)}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 md:py-16 md:px-12 max-w-6xl space-y-12">
        
        {/* Intro Section */}
        <section className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
             <p className="text-[10px] uppercase tracking-[0.4em] font-black text-[#C94A2C]">
               Project Directory — {brand.brand_name}
             </p>
             {isAdmin && (
               <div className="flex items-center gap-2">
                 <Button 
                   variant="outline" 
                   size="sm" 
                   onClick={async () => {
                     if (brand.portal_pin) {
                        navigator.clipboard.writeText(brand.portal_pin);
                        toast.success("Access PIN copied to clipboard");
                        return;
                     }
                     // Use crypto for more secure random generation
                     const array = new Uint32Array(1);
                     window.crypto.getRandomValues(array);
                     const newPin = (array[0] % 900000 + 100000).toString();
                     
                     await supabase.from("onboarding_responses").update({ portal_pin: newPin }).eq("id", id);
                     setBrand({ ...brand, portal_pin: newPin });
                     toast.success("Secure PIN generated successfully");
                   }} 
                   className="text-[10px] uppercase font-bold tracking-widest border-[#C94A2C] text-[#C94A2C] hover:bg-[#C94A2C]/10"
                 >
                   <Lock className="w-3 h-3 mr-2" /> {brand.portal_pin ? `PIN: ${brand.portal_pin} (Copy)` : 'Generate PIN'}
                 </Button>
                 <Button 
                   variant="outline" 
                   size="sm" 
                   onClick={() => {
                     navigator.clipboard.writeText(window.location.href);
                     toast.success("Portal link copied to clipboard");
                   }} 
                   className="text-[10px] uppercase font-bold tracking-widest border-black/10 hover:bg-black/5"
                 >
                   Copy Link
                 </Button>
               </div>
             )}
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter leading-none">
            Welcome back, <br className="hidden md:block"/>
            <span className="text-black/30">{clientName}.</span>
          </h1>
        </section>

        {/* Tab Navigation Hub */}
        <div className="flex overflow-x-auto hide-scrollbar border-b border-black/10">
           <div className="flex gap-8 px-1">
              {tabs.map((tab) => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 pb-4 pt-2 border-b-2 transition-all whitespace-nowrap text-xs sm:text-sm font-bold uppercase tracking-widest ${activeTab === tab.id ? 'border-[#C94A2C] text-black' : 'border-transparent text-black/40 hover:text-black/70'}`}
                >
                   <tab.icon className="w-4 h-4" /> {tab.label}
                   {tab.id === 'growth' && <span className="ml-1 px-1.5 py-0.5 rounded-full bg-[#C94A2C]/10 text-[#C94A2C] text-[8px]">SOON</span>}
                </button>
              ))}
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 pt-4">
          
          {/* Main Content Area based on Active Tab */}
          <div className="lg:col-span-2 space-y-12">
            
            {activeTab === 'matrix' && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <section className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-black/[0.05] shadow-sm">
                   <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl font-display font-black tracking-tighter">Project Matrix</h2>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold bg-[#C94A2C]/10 uppercase tracking-widest text-[#C94A2C] px-3 py-1.5 rounded-full">
                          {progressPercent}% Completed
                        </span>
                        {isAdmin && (
                          <Button size="sm" onClick={() => setShowMilestoneForm(true)} className="bg-black text-white hover:bg-[#C94A2C] rounded-full h-8 px-4 text-[10px] uppercase font-bold tracking-widest">
                            <Plus className="w-3 h-3 mr-1" /> Add
                          </Button>
                        )}
                      </div>
                   </div>

                   {milestones.length === 0 ? (
                     <div className="py-12 text-center border-2 border-dashed border-black/5 rounded-2xl">
                        <p className="text-sm font-medium text-black/40">Architecting timeline. Your milestones will appear here shortly.</p>
                     </div>
                   ) : (
                     <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-[11px] before:w-px before:bg-black/10">
                       {milestones.map((stone) => (
                         <div 
                           key={stone.id} 
                           className={`relative flex gap-6 items-start ${isAdmin ? 'cursor-pointer hover:bg-black/[0.02] p-2 -ml-2 rounded-xl transition-colors' : ''}`}
                           onClick={async () => {
                              if (!isAdmin) return;
                              const nextStatus = stone.status === 'pending' ? 'in-progress' : stone.status === 'in-progress' ? 'completed' : 'pending';
                              await supabase.from("project_milestones").update({ status: nextStatus }).eq("id", stone.id);
                              setMilestones(milestones.map(m => m.id === stone.id ? { ...m, status: nextStatus } : m));
                           }}
                         >
                           <div className={`w-6 h-6 rounded-full flex items-center justify-center z-10 shrink-0 ${stone.status === 'completed' ? 'bg-[#C94A2C] text-white' : stone.status === 'in-progress' ? 'bg-white border-2 border-[#C94A2C]' : 'bg-[#F5F0E8] border border-black/10'}`}>
                              {stone.status === 'completed' && <CheckCircle2 className="w-4 h-4" />}
                           </div>
                           <div className="flex-1 pb-6 border-b border-black/5 last:border-0 last:pb-0">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
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
                              {stone.status === 'pending' && (
                                <div className="mt-3">
                                  <span className="text-[10px] uppercase font-bold tracking-widest text-black/40 bg-black/5 px-2 py-1 rounded">Pending</span>
                                </div>
                              )}
                           </div>
                         </div>
                       ))}
                     </div>
                   )}
                </section>
              </div>
            )}

            {activeTab === 'growth' && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                 <section className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-black/[0.05] shadow-sm text-center">
                    <Layers className="w-12 h-12 text-black/10 mx-auto mb-6" />
                    <h2 className="text-2xl font-display font-black tracking-tighter mb-4">Intelligence Reports</h2>
                    <p className="text-black/50 font-medium max-w-md mx-auto mb-8">
                      Your monthly strategic performance insights, competitor analyses, and growth roadmaps will populate here as we build toward Phase Two of your brand rollout.
                    </p>
                    <div className="inline-block border border-[#C94A2C]/20 bg-[#C94A2C]/5 text-[#C94A2C] text-[10px] uppercase font-bold tracking-widest px-4 py-2 rounded-full">
                      Engineering Mode
                    </div>
                 </section>
              </div>
            )}

            {activeTab === 'finance' && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <section className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-black/[0.05] shadow-sm">
                   <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl font-display font-black tracking-tighter">Invoices & Ledgers</h2>
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-black/30" />
                        {isAdmin && (
                          <Button size="sm" onClick={() => setShowInvoiceForm(true)} className="bg-black text-white hover:bg-[#C94A2C] rounded-full h-8 px-4 text-[10px] uppercase font-bold tracking-widest">
                            <Plus className="w-3 h-3 mr-1" /> Add
                          </Button>
                        )}
                      </div>
                   </div>

                   {invoices.length === 0 ? (
                     <div className="py-12 text-center border-2 border-dashed border-black/5 rounded-2xl">
                        <p className="text-sm font-medium text-black/40">No outstanding invoices currently active.</p>
                     </div>
                   ) : (
                     <div className="space-y-4 flex flex-col">
                       {invoices.map(inv => (
                         <div 
                           key={inv.id} 
                           className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 md:p-6 rounded-2xl bg-[#F5F0E8]/50 hover:bg-[#F5F0E8] transition-colors border border-black/5 gap-4 ${isAdmin ? 'cursor-pointer' : ''}`}
                           onClick={async () => {
                             if (!isAdmin) return;
                             const nextStatus = inv.status === 'unpaid' ? 'paid' : 'unpaid';
                             await supabase.from("client_invoices").update({ status: nextStatus }).eq("id", inv.id);
                             setInvoices(invoices.map(i => i.id === inv.id ? { ...i, status: nextStatus } : i));
                           }}
                         >
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
            )}

          </div>

          {/* Sidebar Area (Persistent) */}
          <div className="space-y-8 lg:space-y-12">
            
            {/* Deliverables Vault */}
            <section className="bg-white rounded-[2.5rem] p-8 border border-black/[0.05] shadow-sm">
               <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-display font-black tracking-tighter">Deliverables</h2>
                  <div className="flex items-center gap-3">
                    {assets.length > 0 && <span className="text-[10px] bg-black/5 px-2 py-1 rounded uppercase tracking-widest font-bold text-black/50">{assets.length} Files</span>}
                    {isAdmin && (
                      <Button size="sm" onClick={() => setShowAssetForm(true)} className="bg-[#F5F0E8] text-black hover:bg-black hover:text-white rounded-full h-8 px-4 text-[10px] uppercase font-bold tracking-widest border border-black/5 transition-colors">
                        <Plus className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
               </div>

               {assets.length === 0 ? (
                 <div className="py-8 text-center bg-[#F5F0E8]/50 rounded-2xl border border-black/5">
                   <p className="text-xs font-medium text-black/40">Vault is empty.</p>
                 </div>
               ) : (
                 <div className="space-y-3 flex flex-col">
                   {assets.map(asset => (
                     <a href={asset.download_url} target="_blank" rel="noreferrer" key={asset.id} className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-[#F5F0E8]/50 hover:bg-[#0D0D0D] transition-colors border border-black/5 cursor-pointer gap-2">
                        <div className="mr-0 sm:mr-4 pr-6 sm:pr-0 relative">
                          <p className="text-sm font-bold text-black group-hover:text-white transition-colors line-clamp-1">{asset.name}</p>
                          <p className="text-[10px] text-black/40 group-hover:text-white/40 font-bold uppercase tracking-widest mt-0.5 transition-colors">{asset.file_type} • {asset.file_size}</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white group-hover:bg-[#333] hidden sm:flex items-center justify-center transition-colors shrink-0">
                          <ArrowRight className="w-3.5 h-3.5 text-black group-hover:text-white" />
                        </div>
                     </a>
                   ))}
                 </div>
               )}
            </section>

             {/* Quick Actions (Support) */}
             <section className="bg-black rounded-[2.5rem] p-8 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[50px] pointer-events-none" />
              
               <h2 className="text-xl font-display font-black tracking-tighter mb-4 relative z-10">Need Assistance?</h2>
               <p className="text-white/60 text-sm mb-8 font-medium relative z-10 leading-relaxed">Connect directly with our team for questions about your clinical architecture.</p>
              
               <div className="space-y-3 relative z-10">
                 <Button className="w-full bg-white text-black hover:bg-white/90 rounded-full h-12 font-bold uppercase tracking-widest text-[10px] transition-transform active:scale-95">
                   <MessageSquare className="w-4 h-4 mr-2" /> Open Chat
                 </Button>
               </div>
            </section>

          </div>

        </div>
      </main>

      {/* ADMIN MODALS */}
      {showMilestoneForm && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-[2rem] w-full max-w-md shadow-2xl relative">
            <button onClick={() => setShowMilestoneForm(false)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5"><X size={16} /></button>
            <h3 className="text-2xl font-display font-black mb-6">Add Milestone</h3>
            <div className="space-y-4">
              <div>
                 <label className="text-[10px] font-bold uppercase tracking-widest text-black/50 mb-2 block">Title</label>
                 <input type="text" value={newMilestone.title} onChange={e => setNewMilestone({...newMilestone, title: e.target.value})} className="w-full border border-black/10 rounded-xl p-3 text-sm font-medium outline-none focus:border-[#C94A2C]" placeholder="e.g. Identity Prototyping" />
              </div>
              <div>
                 <label className="text-[10px] font-bold uppercase tracking-widest text-black/50 mb-2 block">Date Label</label>
                 <input type="text" value={newMilestone.date_label} onChange={e => setNewMilestone({...newMilestone, date_label: e.target.value})} className="w-full border border-black/10 rounded-xl p-3 text-sm font-medium outline-none focus:border-[#C94A2C]" placeholder="e.g. Oct 28" />
              </div>
              <Button onClick={async () => {
                 if (!newMilestone.title) return;
                 const { data, error } = await supabase.from("project_milestones").insert([{ brand_id: id, title: newMilestone.title, date_label: newMilestone.date_label, status: 'pending', order_index: milestones.length }]).select().single();
                 if (data && !error) setMilestones([...milestones, data]);
                 setShowMilestoneForm(false);
                 setNewMilestone({ title: '', date_label: '' });
              }} className="w-full bg-[#0D0D0D] text-white hover:bg-[#C94A2C] rounded-full mt-4">Save Milestone</Button>
            </div>
          </div>
        </div>
      )}

      {showInvoiceForm && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-[2rem] w-full max-w-md shadow-2xl relative">
            <button onClick={() => setShowInvoiceForm(false)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5"><X size={16} /></button>
            <h3 className="text-2xl font-display font-black mb-6">Create Invoice</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="text-[10px] font-bold uppercase tracking-widest text-black/50 mb-2 block">Invoice ID</label>
                   <input type="text" value={newInvoice.id} onChange={e => setNewInvoice({...newInvoice, id: e.target.value})} className="w-full border border-black/10 rounded-xl p-3 text-sm font-medium outline-none focus:border-[#C94A2C]" placeholder="INV-001" />
                </div>
                <div>
                   <label className="text-[10px] font-bold uppercase tracking-widest text-black/50 mb-2 block">Amount</label>
                   <input type="text" value={newInvoice.amount} onChange={e => setNewInvoice({...newInvoice, amount: e.target.value})} className="w-full border border-black/10 rounded-xl p-3 text-sm font-medium outline-none focus:border-[#C94A2C]" placeholder="$5,000" />
                </div>
              </div>
              <div>
                 <label className="text-[10px] font-bold uppercase tracking-widest text-black/50 mb-2 block">Date Range</label>
                 <input type="text" value={newInvoice.date_label} onChange={e => setNewInvoice({...newInvoice, date_label: e.target.value})} className="w-full border border-black/10 rounded-xl p-3 text-sm font-medium outline-none focus:border-[#C94A2C]" placeholder="Oct 24, 2024" />
              </div>
              <div>
                 <label className="text-[10px] font-bold uppercase tracking-widest text-black/50 mb-2 block">PDF Download URL</label>
                 <input type="url" value={newInvoice.download_url} onChange={e => setNewInvoice({...newInvoice, download_url: e.target.value})} className="w-full border border-black/10 rounded-xl p-3 text-sm font-medium outline-none focus:border-[#C94A2C]" placeholder="https://..." />
              </div>
              <Button onClick={async () => {
                 if (!newInvoice.id) return;
                 const { data, error } = await supabase.from("client_invoices").insert([{ ...newInvoice, brand_id: id, status: 'unpaid' }]).select().single();
                 if (data && !error) setInvoices([data, ...invoices]);
                 setShowInvoiceForm(false);
                 setNewInvoice({ id: '', date_label: '', amount: '', download_url: '' });
              }} className="w-full bg-[#0D0D0D] text-white hover:bg-[#C94A2C] rounded-full mt-4">Save Invoice</Button>
            </div>
          </div>
        </div>
      )}

      {showAssetForm && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-[2rem] w-full max-w-md shadow-2xl relative">
            <button onClick={() => setShowAssetForm(false)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5"><X size={16} /></button>
            <h3 className="text-2xl font-display font-black mb-6">Add Deliverable</h3>
            
            <div className="p-4 border-2 border-dashed border-black/10 rounded-2xl mb-6 text-center hover:bg-black/[0.02] transition-colors relative">
              <input type="file" onChange={handleAssetUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              {isUploadingAsset ? (
                 <div className="flex flex-col items-center gap-2"><Loader2 className="w-5 h-5 animate-spin text-[#C94A2C]" /><span className="text-xs font-bold">Uploading...</span></div>
              ) : (
                 <div className="flex flex-col items-center gap-2"><Upload className="w-5 h-5 text-black/40" /><span className="text-xs font-bold text-black/60">Click or drag file to upload directly to Vault</span></div>
              )}
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-black/10" />
              <span className="text-[10px] uppercase font-bold text-black/30 tracking-widest">OR PASTE EXTERNAL LINK</span>
              <div className="flex-1 h-px bg-black/10" />
            </div>

            <div className="space-y-4">
              <div>
                 <label className="text-[10px] font-bold uppercase tracking-widest text-black/50 mb-2 block">Asset Name</label>
                 <input type="text" value={newAsset.name} onChange={e => setNewAsset({...newAsset, name: e.target.value})} className="w-full border border-black/10 rounded-xl p-3 text-sm font-medium outline-none focus:border-[#C94A2C]" placeholder="e.g. Brand Guidelines" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="text-[10px] font-bold uppercase tracking-widest text-black/50 mb-2 block">Type (Ext)</label>
                   <input type="text" value={newAsset.file_type} onChange={e => setNewAsset({...newAsset, file_type: e.target.value})} className="w-full border border-black/10 rounded-xl p-3 text-sm font-medium outline-none focus:border-[#C94A2C]" placeholder="PDF, FIGMA..." />
                </div>
                <div>
                   <label className="text-[10px] font-bold uppercase tracking-widest text-black/50 mb-2 block">Size</label>
                   <input type="text" value={newAsset.file_size} onChange={e => setNewAsset({...newAsset, file_size: e.target.value})} className="w-full border border-black/10 rounded-xl p-3 text-sm font-medium outline-none focus:border-[#C94A2C]" placeholder="12 MB" />
                </div>
              </div>
              <div>
                 <label className="text-[10px] font-bold uppercase tracking-widest text-black/50 mb-2 block">URL</label>
                 <input type="url" value={newAsset.download_url} onChange={e => setNewAsset({...newAsset, download_url: e.target.value})} className="w-full border border-black/10 rounded-xl p-3 text-sm font-medium outline-none focus:border-[#C94A2C]" placeholder="https://..." />
              </div>
              <Button onClick={async () => {
                 if (!newAsset.name || !newAsset.download_url) return;
                 const { data, error } = await supabase.from("client_deliverables").insert([{ ...newAsset, brand_id: id }]).select().single();
                 if (data && !error) setAssets([data, ...assets]);
                 setShowAssetForm(false);
                 setNewAsset({ name: '', file_type: '', file_size: '', download_url: '' });
              }} className="w-full bg-[#0D0D0D] text-white hover:bg-[#C94A2C] rounded-full mt-4">Save Asset</Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
