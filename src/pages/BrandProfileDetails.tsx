import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Save, Edit, Loader2, FileText, Receipt, LayoutDashboard, Database, Activity, Target, PenTool, RadioTower } from 'lucide-react';
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
import { colorPalettes, logoStyles, typographyPairings, imageryStyles } from '@/config/brandOptions';
import ColorPalettePreview from '@/components/ui/ColorPalettePreview';
import ProposalGenerator from '@/components/powerups/ProposalGenerator';
import InvoiceGenerator from '@/components/powerups/InvoiceGenerator';
import { useAuth } from '@/hooks/useAuth';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState<'portal' | 'strategy' | 'settings'>('portal');
  const { toast } = useToast();

  useEffect(() => {
    const fetchBrandProfile = async () => {
      try {
        if (!id) throw new Error('Brand ID is missing');
        const { data, error } = await supabase
          .from('onboarding_responses')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setBrandProfile(data as OnboardingResponse);
      } catch (err) {
        console.error(err);
        setError('Failed to load brand profile');
      } finally {
        setLoading(false);
      }
    };
    fetchBrandProfile();
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

  if (loading) return <div className="flex h-screen items-center justify-center bg-[#F5F0E8]"><Loader2 className="animate-spin text-[#C94A2C]" /></div>;
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
            <Button variant="outline" size="sm" onClick={() => setShowProposalModal(true)} className="rounded-full border-black/10 hover:bg-black/5 text-[10px] uppercase font-bold tracking-widest hidden md:flex">
              <FileText className="mr-2 h-3.5 w-3.5" /> Proposal
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowInvoiceModal(true)} className="rounded-full border-black/10 hover:bg-black/5 text-[10px] uppercase font-bold tracking-widest hidden md:flex">
              <Receipt className="mr-2 h-3.5 w-3.5" /> Invoice
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
                 <p className="text-black/50 font-medium max-w-xl">Configure the data that feeds into {brandProfile.brand_name}'s client-facing portal. Updates here sync in real-time.</p>
               </section>

               <div className="grid gap-6 md:grid-cols-2">
                  <div className="bg-white rounded-[2.5rem] p-8 border border-black/5 shadow-sm space-y-6">
                     <h3 className="text-xl font-display font-black tracking-tight flex items-center gap-2">
                        <Activity className="w-5 h-5 text-[#C94A2C]" /> Milestones
                     </h3>
                     <p className="text-sm text-black/50 font-medium">Update the project matrix progression.</p>
                     <Button className="w-full bg-[#0D0D0D] hover:bg-black/80 rounded-full font-bold uppercase tracking-widest text-[10px] h-10">
                        Launch Timeline Editor
                     </Button>
                  </div>

                  <div className="bg-white rounded-[2.5rem] p-8 border border-black/5 shadow-sm space-y-6">
                     <h3 className="text-xl font-display font-black tracking-tight flex items-center gap-2">
                        <Receipt className="w-5 h-5 text-[#C94A2C]" /> Invoices
                     </h3>
                     <p className="text-sm text-black/50 font-medium">Draft embedded invoices for the portal.</p>
                     <Button onClick={() => setShowInvoiceModal(true)} className="w-full bg-[#0D0D0D] hover:bg-[#C94A2C] rounded-full font-bold uppercase tracking-widest text-[10px] h-10">
                        Generate Invoice
                     </Button>
                  </div>

                  <div className="bg-white rounded-[2.5rem] p-8 border border-black/5 shadow-sm space-y-6 md:col-span-2">
                     <div className="flex items-center justify-between">
                       <h3 className="text-xl font-display font-black tracking-tight flex items-center gap-2">
                          <Database className="w-5 h-5 text-[#C94A2C]" /> Deliverables Vault
                       </h3>
                       <span className="text-[10px] font-bold tracking-widest uppercase bg-black/5 px-3 py-1 rounded">0 Files</span>
                     </div>
                     <div className="border-2 border-dashed border-black/10 rounded-2xl p-12 text-center text-black/40 hover:bg-black/5 hover:border-black/20 transition-colors cursor-pointer">
                        Upload strategy decks, assets, and guidelines here.
                     </div>
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
                         <p className="font-medium text-sm leading-relaxed">{brandProfile.elevator_pitch || 'N/A'}</p>
                       </div>
                       <div>
                         <p className="text-[10px] uppercase font-bold tracking-widest text-black/40 mb-1">USP</p>
                         <p className="font-medium text-sm leading-relaxed">{brandProfile.usp || 'N/A'}</p>
                       </div>
                       <div className="flex gap-4">
                         <div className="flex-1">
                           <p className="text-[10px] uppercase font-bold tracking-widest text-black/40 mb-1">Vision 1Y</p>
                           <p className="font-medium text-sm">{brandProfile.one_year_vision || 'N/A'}</p>
                         </div>
                         <div className="flex-1">
                           <p className="text-[10px] uppercase font-bold tracking-widest text-black/40 mb-1">Vision 5Y</p>
                           <p className="font-medium text-sm">{brandProfile.five_year_vision || 'N/A'}</p>
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
                            <p className="font-medium text-sm">{brandProfile.primary_audience || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-bold tracking-widest text-black/40 mb-1">Demographic</p>
                            <p className="font-medium text-sm">{brandProfile.age_range} • {brandProfile.gender_focus}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-bold tracking-widest text-black/40 mb-1">Price Position</p>
                            <p className="font-medium text-sm">{brandProfile.brand_personality?.pricePositioning || '50'}/100</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-bold tracking-widest text-black/40 mb-1">Launch Config</p>
                            <p className="font-medium text-sm">{brandProfile.launch_timing || 'N/A'}</p>
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
                    <AlertDialogContent className="rounded-3xl">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Terminate Client Protocol?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will eradicate "{brandProfile.brand_name}" from the servers completely. All data will be lost.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteBrand} className="bg-red-600 hover:bg-red-700 rounded-full">
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
    </div>
  );
}