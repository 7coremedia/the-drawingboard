import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Edit, Loader2, FileText, Receipt, LayoutDashboard, Database, Activity, Target, PenTool, RadioTower, Plus, Trash2, CheckCircle, FileSignature } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { colorPalettes, logoStyles, typographyPairings, imageryStyles } from '@/config/brandOptions';
import ColorPalettePreview from '@/components/ui/ColorPalettePreview';
import ProposalGenerator from '@/components/powerups/ProposalGenerator';
import InvoiceGenerator from '@/components/powerups/InvoiceGenerator';
import AgreementGenerator from '@/components/powerups/AgreementGenerator';
import { useAuth } from '@/hooks/useAuth';

const milestoneTemplates: Record<string, {title: string, label: string}[]> = {
  "arch": [
    { title: "Discovery & Audit", label: "Week 1" },
    { title: "Strategic Positioning", label: "Week 2" },
    { title: "Visual Identity Concepting", label: "Week 3-4" },
    { title: "Brand Bible Formulation", label: "Week 5" },
    { title: "Deliverables Handover", label: "Week 6" }
  ],
  "refresh": [
    { title: "Brand Diagnostic", label: "Week 1" },
    { title: "Identity Evolution", label: "Week 2" },
    { title: "Digital Systems Update", label: "Week 3" },
    { title: "Rollout Strategy", label: "Week 4" }
  ],
  "digital": [
    { title: "UX/UI Wireframing", label: "Week 1" },
    { title: "High-Fidelity Prototyping", label: "Week 2-3" },
    { title: "Development Phase", label: "Week 4-5" },
    { title: "QA & Deployment", label: "Week 6" }
  ]
};

// Keep same types and helpers
type OnboardingResponse = {
  id: string;
  user_id: string | null;
  brand_name: string | null;
  tagline: string | null;
  elevator_pitch: string | null;
  industry: string | null;
  offerings: string | null;
  primary_audience: string | null;
  one_year_vision: string | null;
  five_year_vision: string | null;
  budget_range: string | null;
  launch_timing: string | null;
  usp: string | null;
  competitors: string | null;
  age_range: string | null;
  gender_focus: string | null;
  income_level: string | null;
  challenges: string | null;
  likes_dislikes: string | null;
  extra_notes: string | null;
  online_link: string | null;
  brand_personality: any;
  sender_name: string | null;
  sender_email: string | null;
  created_at: string;
  updated_at: string;
};

const getLogoStyle = (id: string | undefined) => id ? logoStyles.find(style => style.id === id) : null;
const getColorPalette = (id: string | undefined) => id ? colorPalettes.find(palette => palette.id === id) : null;
const getTypographyPairing = (id: string | undefined) => id ? typographyPairings.find(pairing => pairing.id === id) : null;
const getImageryStyle = (id: string | undefined) => id ? imageryStyles.find(style => style.id === id) : null;

export default function BrandProfileDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [brandProfile, setBrandProfile] = useState<OnboardingResponse | null>(null);
  
  // Data States
  const [milestones, setMilestones] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [assets, setAssets] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showAgreementModal, setShowAgreementModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState<'portal' | 'strategy' | 'settings'>('portal');
  const { toast } = useToast();

  const fetchData = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const { data: brandData, error: brandErr } = await supabase.from('onboarding_responses').select('*').eq('id', id).single();
      if (brandErr) throw brandErr;
      setBrandProfile(brandData as OnboardingResponse);

      // We might get errors if tables don't exist yet, catch them silently
      const { data: mData } = await supabase.from('project_milestones').select('*').eq('brand_id', id).order('order_index');
      if (mData) setMilestones(mData);

      const { data: iData } = await supabase.from('client_invoices').select('*').eq('brand_id', id).order('created_at', { ascending: false });
      if (iData) setInvoices(iData);

      const { data: aData } = await supabase.from('client_deliverables').select('*').eq('brand_id', id).order('created_at', { ascending: false });
      if (aData) setAssets(aData);
    } catch (err: any) {
       console.error(err);
       if (!brandProfile) setError('Failed to load brand profile.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleDeleteBrand = async () => {
    if (!id || !user) return;
    try {
      setDeleting(true);
      const { error } = await supabase.from('onboarding_responses').delete().eq('id', id).eq('user_id', user.id);
      if (error) throw error;
      toast({ title: 'Brand Deleted', description: 'The brand and its data have been removed.' });
      navigate('/dashboard');
    } catch (err: any) {
      toast({ title: 'Delete Failed', description: err.message, variant: 'destructive' });
    } finally {
      setDeleting(false);
    }
  };

  // --- Inline Form Handlers for Portal Sync ---
  const handleAddMilestone = async (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    const title = fd.get('title') as string;
    const dateLabel = fd.get('dateLabel') as string;
    if (!title || !dateLabel) return;
    
    try {
      const { error } = await supabase.from('project_milestones').insert({
        brand_id: id, title: title, date_label: dateLabel, order_index: milestones.length
      });
      if (error) throw error;
      toast({ title: "Milestone Added" });
      (e.target as HTMLFormElement).reset();
      fetchData();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const handleLoadTemplate = async (templateId: string) => {
    const template = milestoneTemplates[templateId];
    if (!template) return;
    
    try {
      // Clear existing
      await supabase.from('project_milestones').delete().eq('brand_id', id);
      
      // Insert new
      const newMilestones = template.map((m, idx) => ({
        brand_id: id,
        title: m.title,
        date_label: m.label,
        order_index: idx,
        status: 'pending'
      }));
      
      const { error } = await supabase.from('project_milestones').insert(newMilestones);
      if (error) throw error;
      
      toast({ title: "Template Loaded", description: "Milestones have been updated." });
      fetchData();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const handleUpdateMilestoneStatus = async (mId: string, currentStatus: string) => {
    const sequence = ['pending', 'in-progress', 'completed'];
    const nextStatus = sequence[(sequence.indexOf(currentStatus) + 1) % sequence.length];
    try {
      await supabase.from('project_milestones').update({ status: nextStatus }).eq('id', mId);
      fetchData();
    } catch (err) { }
  };

  const handleAddInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    const invId = fd.get('invId') as string;
    const amount = fd.get('amount') as string;
    const dateLabel = fd.get('dateLabel') as string;
    const link = fd.get('link') as string;
    if (!invId || !amount || !dateLabel) return;

    try {
      const { error } = await supabase.from('client_invoices').insert({
        brand_id: id, id: invId, amount: amount, date_label: dateLabel, download_url: link || null
      });
      if (error) throw error;
      toast({ title: "Invoice Added" });
      (e.target as HTMLFormElement).reset();
      fetchData();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const handleToggleInvoice = async (iId: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'paid' ? 'unpaid' : 'paid';
    try {
      await supabase.from('client_invoices').update({ status: nextStatus }).eq('id', iId);
      fetchData();
    } catch (err) { }
  };

  const handleAddAsset = async (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    const title = fd.get('title') as string;
    const fType = fd.get('type') as string;
    const link = fd.get('link') as string;
    if (!title || !fType || !link) return;

    try {
      const { error } = await supabase.from('client_deliverables').insert({
        brand_id: id, name: title, file_type: fType, download_url: link, file_size: "Link"
      });
      if (error) throw error;
      toast({ title: "Asset Added" });
      (e.target as HTMLFormElement).reset();
      fetchData();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const handleDeleteAsset = async (aId: string) => {
    try {
      await supabase.from('client_deliverables').delete().eq('id', aId);
      fetchData();
    } catch (err) { }
  };


  if (loading && !brandProfile) return <div className="flex h-screen items-center justify-center bg-[#F5F0E8]"><Loader2 className="animate-spin text-[#C94A2C]" /></div>;
  if (error || !brandProfile) return <div className="flex h-screen items-center justify-center bg-[#F5F0E8] text-black">Error linking to brand.</div>;

  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#0D0D0D] font-sans selection:bg-[#C94A2C] selection:text-[#F5F0E8]">
      
      {/* Cinematic Header Overlay */}
      <header className="sticky top-0 z-50 bg-[#F5F0E8]/80 backdrop-blur-md border-b border-black/5">
        <div className="container max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')} className="rounded-full hover:bg-black/5">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <p className="text-[9px] uppercase font-black tracking-widest text-[#C94A2C]">Client Management</p>
              <h1 className="text-xl md:text-2xl font-display font-black tracking-tight">{brandProfile.brand_name}</h1>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="default" size="sm" onClick={() => setShowAgreementModal(true)} className="rounded-full bg-[#0D0D0D] text-white hover:bg-[#C94A2C] text-[10px] uppercase font-bold tracking-widest hidden md:flex">
              <FileSignature className="mr-2 h-3.5 w-3.5" /> Agreement
            </Button>
            <Button variant="default" size="sm" onClick={() => setShowProposalModal(true)} className="rounded-full bg-[#0D0D0D] text-white hover:bg-[#C94A2C] text-[10px] uppercase font-bold tracking-widest hidden md:flex">
              <FileText className="mr-2 h-3.5 w-3.5" /> Proposal
            </Button>
            <Button variant="default" size="sm" onClick={() => setShowInvoiceModal(true)} className="rounded-full bg-[#0D0D0D] text-white hover:bg-[#C94A2C] text-[10px] uppercase font-bold tracking-widest hidden md:flex">
              <Receipt className="mr-2 h-3.5 w-3.5" /> Quick Invoice
            </Button>
            <Button variant="default" size="sm" onClick={() => navigate('/onboarding', { state: { editOnboardingId: id } })} className="rounded-full bg-[#0D0D0D] text-white hover:bg-[#C94A2C] text-[10px] uppercase font-bold tracking-widest">
              <Edit className="md:mr-2 h-3.5 w-3.5" /> <span className="hidden md:inline">Edit Baseline</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col lg:flex-row gap-12">
        
        {/* Navigation Sidebar */}
        <aside className="w-full lg:w-64 shrink-0 space-y-2">
           {[
             { id: 'portal', label: 'Portal Link', icon: LayoutDashboard },
             { id: 'strategy', label: 'Strategy Baseline', icon: Database },
             { id: 'settings', label: 'Configuration', icon: Activity }
           ].map(t => (
             <button
               key={t.id}
               onClick={() => setActiveTab(t.id as any)}
               className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl transition-all ${activeTab === t.id ? 'bg-[#0D0D0D] text-white shadow-xl' : 'text-black/50 hover:bg-black/5 hover:text-black'}`}
             >
               <t.icon className="w-4 h-4" />
               <span className="text-xs uppercase font-bold tracking-widest">{t.label}</span>
             </button>
           ))}
        </aside>

        {/* Content Area */}
        <div className="flex-1 space-y-12">
          
          {/* PORTAL MANAGEMENT TAB */}
          {activeTab === 'portal' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <section>
                 <h2 className="text-4xl font-display font-black tracking-tighter mb-4">Portal Engine.</h2>
                 <p className="text-black/50 font-medium max-w-xl mb-6">Manage the live data feeding into the client-facing portal. Open the link below to preview.</p>
                 <a href={`/portal/${id}`} target="_blank" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-[#C94A2C] hover:text-black">
                   Preview Client Portal →
                 </a>
               </section>

               <div className="grid gap-6 md:grid-cols-2">
                  
                  {/* Milestones Manager */}
                  <div className="bg-white rounded-[2.5rem] p-8 border border-black/5 shadow-sm space-y-6 flex flex-col">
                     <div className="flex items-center justify-between">
                       <h3 className="text-xl font-display font-black tracking-tight flex items-center gap-2">
                          <Activity className="w-5 h-5 text-[#C94A2C]" /> Milestones
                       </h3>
                       <Select onValueChange={handleLoadTemplate}>
                         <SelectTrigger className="w-[120px] h-8 text-[10px] uppercase font-bold tracking-widest bg-black/5 border-0 rounded">
                           <SelectValue placeholder="TEMPLATE" />
                         </SelectTrigger>
                         <SelectContent>
                           <SelectItem value="arch">Brand Arch</SelectItem>
                           <SelectItem value="refresh">Brand Refresh</SelectItem>
                           <SelectItem value="digital">Digital System</SelectItem>
                         </SelectContent>
                       </Select>
                     </div>

                     <div className="flex-1 space-y-3 overflow-y-auto max-h-64 pr-2">
                       {milestones.length === 0 && <p className="text-xs text-black/40">No milestones tracked.</p>}
                       {milestones.map(m => (
                         <div key={m.id} className="flex items-center justify-between p-3 rounded-xl bg-[#F5F0E8]/50 border border-black/5">
                            <div>
                              <p className="text-xs font-bold leading-tight">{m.title}</p>
                              <p className="text-[10px] text-black/50">{m.date_label}</p>
                            </div>
                            <Button size="sm" variant="outline" className={`h-6 text-[9px] uppercase tracking-widest px-2 ${m.status === 'completed' ? 'bg-green-100 text-green-700 border-green-200' : m.status === 'in-progress' ? 'bg-orange-100 text-orange-700 border-orange-200' : 'text-black/50'}`} onClick={() => handleUpdateMilestoneStatus(m.id, m.status)}>
                              {m.status}
                            </Button>
                         </div>
                       ))}
                     </div>

                     <form onSubmit={handleAddMilestone} className="mt-auto space-y-2 pt-4 border-t border-black/5">
                        <div className="flex gap-2">
                          <Input name="title" placeholder="Ex: Visual Identity" className="h-8 text-xs bg-white text-black border-black/10" required />
                          <Input name="dateLabel" placeholder="Ex: Oct 28" className="h-8 w-24 text-xs bg-white text-black border-black/10" required />
                        </div>
                        <Button type="submit" className="w-full h-8 bg-[#0D0D0D] text-white hover:bg-[#C94A2C] rounded-md text-[10px] uppercase font-bold tracking-widest">Add Milestone</Button>
                     </form>
                  </div>

                  {/* Invoice Manager */}
                  <div className="bg-white rounded-[2.5rem] p-8 border border-black/5 shadow-sm space-y-6 flex flex-col">
                     <div className="flex items-center justify-between">
                       <h3 className="text-xl font-display font-black tracking-tight flex items-center gap-2">
                          <Receipt className="w-5 h-5 text-[#C94A2C]" /> Invoices
                       </h3>
                     </div>

                     <div className="flex-1 space-y-3 overflow-y-auto max-h-64 pr-2">
                       {invoices.length === 0 && <p className="text-xs text-black/40">No active invoices.</p>}
                       {invoices.map(inv => (
                         <div key={inv.id} className="flex items-center justify-between p-3 rounded-xl bg-[#F5F0E8]/50 border border-black/5">
                            <div>
                              <p className="text-xs font-bold leading-tight">{inv.id}</p>
                              <p className="text-[10px] text-black/50">{inv.amount} • {inv.date_label}</p>
                            </div>
                            <Button size="sm" variant="outline" className={`h-6 text-[9px] uppercase tracking-widest px-2 ${inv.status === 'paid' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`} onClick={() => handleToggleInvoice(inv.id, inv.status)}>
                              {inv.status}
                            </Button>
                         </div>
                       ))}
                     </div>

                     <form onSubmit={handleAddInvoice} className="mt-auto space-y-2 pt-4 border-t border-black/5">
                        <div className="grid grid-cols-3 gap-2">
                          <Input name="invId" placeholder="INV-001" className="h-8 text-xs bg-white text-black border-black/10" required />
                          <Input name="amount" placeholder="$5,000" className="h-8 text-xs bg-white text-black border-black/10" required />
                          <Input name="dateLabel" placeholder="Oct 01" className="h-8 text-xs bg-white text-black border-black/10" required />
                        </div>
                        <Input name="link" placeholder="Invoice Link URL (optional)" className="h-8 text-xs bg-white text-black border-black/10" />
                        <Button type="submit" className="w-full h-8 bg-[#0D0D0D] text-white hover:bg-[#C94A2C] rounded-md text-[10px] uppercase font-bold tracking-widest">Log Invoice</Button>
                     </form>
                  </div>

                  {/* Deliverables Manager */}
                  <div className="bg-white rounded-[2.5rem] p-8 border border-black/5 shadow-sm space-y-6 md:col-span-2">
                     <div className="flex items-center justify-between">
                       <h3 className="text-xl font-display font-black tracking-tight flex items-center gap-2">
                          <Database className="w-5 h-5 text-[#C94A2C]" /> Deliverables Vault
                       </h3>
                       <span className="text-[10px] font-bold tracking-widest uppercase bg-black/5 px-3 py-1 rounded">{assets.length} Files</span>
                     </div>
                     
                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                       {assets.map(asset => (
                         <div key={asset.id} className="relative group p-4 rounded-xl bg-[#F5F0E8]/50 border border-black/5 flex flex-col">
                            <p className="text-xs font-bold text-black line-clamp-1 pr-6">{asset.name}</p>
                            <p className="text-[10px] text-black/40 font-medium">Type: {asset.file_type}</p>
                            <button onClick={() => handleDeleteAsset(asset.id)} className="absolute top-3 right-3 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Trash2 className="w-4 h-4" />
                            </button>
                         </div>
                       ))}
                     </div>

                     <form onSubmit={handleAddAsset} className="flex gap-3 pt-6 border-t border-black/5 items-end">
                       <div className="flex-1 space-y-1">
                         <label className="text-[10px] uppercase font-bold tracking-widest text-black/50">Asset Name</label>
                         <Input name="title" placeholder="Brand Guidelines" className="h-10 text-sm bg-white text-black border-black/10" required />
                       </div>
                       <div className="w-24 space-y-1">
                         <label className="text-[10px] uppercase font-bold tracking-widest text-black/50">Type</label>
                         <Input name="type" placeholder="PDF" className="h-10 text-sm bg-white text-black border-black/10" required />
                       </div>
                       <div className="flex-1 space-y-1">
                         <label className="text-[10px] uppercase font-bold tracking-widest text-black/50">Link URL</label>
                         <Input name="link" placeholder="https://" className="h-10 text-sm bg-white text-black border-black/10" required />
                       </div>
                       <Button type="submit" className="h-10 bg-[#0D0D0D] text-white hover:bg-[#C94A2C] rounded-lg px-6 uppercase text-[10px] font-bold tracking-widest"><Plus className="w-4 h-4 mr-1" /> Add</Button>
                     </form>
                  </div>
               </div>
            </div>
          )}

          {/* STRATEGY BASELINE TAB */}
          {activeTab === 'strategy' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <section>
                 <h2 className="text-4xl font-display font-black tracking-tighter mb-4">Baseline.</h2>
                 <p className="text-black/50 font-medium max-w-xl">Deep architectural data submitted during onboarding.</p>
               </section>

               <div className="grid gap-6 md:grid-cols-2">
                  
                  {/* Overview Card */}
                  <Card className="bg-white rounded-[2.5rem] p-6 border-black/5 shadow-sm col-span-full xl:col-span-1">
                    <CardContent className="p-0 space-y-6">
                       <h3 className="text-lg font-black uppercase tracking-widest flex items-center gap-2 text-black"><Target className="w-4 h-4 text-[#C94A2C]" /> Overview</h3>
                       <div>
                         <p className="text-[10px] uppercase font-bold tracking-widest text-black/40 mb-1">Elevator Pitch</p>
                         <p className="font-medium text-sm leading-relaxed text-black/80">{brandProfile.elevator_pitch || 'N/A'}</p>
                       </div>
                       <div>
                         <p className="text-[10px] uppercase font-bold tracking-widest text-black/40 mb-1">USP</p>
                         <p className="font-medium text-sm leading-relaxed text-black/80">{brandProfile.usp || 'N/A'}</p>
                       </div>
                       <div className="flex gap-4">
                         <div className="flex-1">
                           <p className="text-[10px] uppercase font-bold tracking-widest text-black/40 mb-1">Vision 1Y</p>
                           <p className="font-medium text-sm text-black/80">{brandProfile.one_year_vision || 'N/A'}</p>
                         </div>
                         <div className="flex-1">
                           <p className="text-[10px] uppercase font-bold tracking-widest text-black/40 mb-1">Vision 5Y</p>
                           <p className="font-medium text-sm text-black/80">{brandProfile.five_year_vision || 'N/A'}</p>
                         </div>
                       </div>
                    </CardContent>
                  </Card>

                  {/* Architecture & Visuals */}
                  <Card className="bg-white rounded-[2.5rem] p-6 border-black/5 shadow-sm col-span-full xl:col-span-1">
                    <CardContent className="p-0 space-y-6">
                       <h3 className="text-lg font-black uppercase tracking-widest flex items-center gap-2 text-black"><PenTool className="w-4 h-4 text-[#C94A2C]" /> Aesthetics</h3>
                       
                       {brandProfile.brand_personality?.logoStyle && (
                         <div>
                           <p className="text-[10px] uppercase font-bold tracking-widest text-black/40 mb-2">Logo Style Focus</p>
                           <img src={getLogoStyle(brandProfile.brand_personality.logoStyle)?.preview} className="w-full h-24 object-cover rounded-xl" />
                         </div>
                       )}

                       {brandProfile.brand_personality?.colorPalette && (
                         <div>
                           <p className="text-[10px] uppercase font-bold tracking-widest text-black/40 mb-2">Color Matrix</p>
                           <ColorPalettePreview colors={getColorPalette(brandProfile.brand_personality.colorPalette)?.colors || []} label="" />
                         </div>
                       )}
                    </CardContent>
                  </Card>

                  {/* Audience & Marketing */}
                  <Card className="bg-white rounded-[2.5rem] p-6 border-black/5 shadow-sm col-span-full">
                    <CardContent className="p-0 space-y-6">
                       <h3 className="text-lg font-black uppercase tracking-widest flex items-center gap-2 text-black"><RadioTower className="w-4 h-4 text-[#C94A2C]" /> Market Reach</h3>
                       
                       <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                          <div>
                            <p className="text-[10px] uppercase font-bold tracking-widest text-black/40 mb-1">Audience</p>
                            <p className="font-medium text-sm text-black/80">{brandProfile.primary_audience || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-bold tracking-widest text-black/40 mb-1">Demographic</p>
                            <p className="font-medium text-sm text-black/80">{brandProfile.age_range} • {brandProfile.gender_focus}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-bold tracking-widest text-black/40 mb-1">Price Position</p>
                            <p className="font-medium text-sm text-black/80">{brandProfile.brand_personality?.pricePositioning || '50'}/100</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-bold tracking-widest text-black/40 mb-1">Launch Config</p>
                            <p className="font-medium text-sm text-black/80">{brandProfile.launch_timing || 'N/A'}</p>
                          </div>
                       </div>
                    </CardContent>
                  </Card>

               </div>
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <section>
                 <h2 className="text-4xl font-display font-black tracking-tighter mb-4 text-red-600">Danger Zone.</h2>
                 <p className="text-black/50 font-medium max-w-xl">Irreversible system actions for this specific environment.</p>
               </section>

               <div className="bg-red-50 rounded-[2.5rem] p-8 border border-red-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="font-bold text-red-900 mb-1">Terminate Client Record</h3>
                    <p className="text-sm font-medium text-red-700/70">Wipe all onboarding data, portals, and configurations. This cannot be undone.</p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="rounded-full bg-red-600 hover:bg-red-700 text-white uppercase tracking-widest text-[10px] font-bold px-8 h-12" disabled={deleting}>
                        {deleting ? 'Terminating...' : 'Terminate'}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="rounded-3xl bg-white border-black/10">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Terminate Client Protocol?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will eradicate "{brandProfile.brand_name}" from the servers completely. All data will be lost.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteBrand} className="bg-red-600 hover:bg-red-700 rounded-full text-white border-0">
                          Confirm Eradication
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
               </div>
            </div>
          )}

        </div>
      </main>

      <ProposalGenerator isOpen={showProposalModal} onClose={() => setShowProposalModal(false)} brandData={brandProfile} />
      <InvoiceGenerator isOpen={showInvoiceModal} onClose={() => setShowInvoiceModal(false)} brandData={brandProfile} />
      <AgreementGenerator isOpen={showAgreementModal} onClose={() => setShowAgreementModal(false)} brandData={brandProfile} />
    </div>
  );
}