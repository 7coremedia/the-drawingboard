import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { PlusCircle, ArrowRight, RefreshCw, Database } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { migrateVolumes } from '@/services/volumeMigration';
import { Skeleton } from '@/components/ui/skeleton';

// Define the type for onboarding responses from Supabase
type OnboardingResponse = {
  id: string;
  user_id: string | null;
  brand_name: string | null;
  tagline: string | null;
  elevator_pitch: string | null;
  created_at: string;
};

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const [brands, setBrands] = useState<OnboardingResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMigrating, setIsMigrating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (authLoading) return; // Wait until auth completes
    
    const fetchBrands = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('onboarding_responses')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data) {
          setBrands(data);
        }
      } catch (error) {
        console.error('Error fetching brands:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, [user, authLoading]);

  const handleMigrateVolumes = async () => {
    const { success, message } = await migrateVolumes();
    if (success) {
      window.location.reload();
    }
  };

  return (
    <div className="bg-[#F5F0E8] min-h-screen text-[#0D0D0D] font-sans selection:bg-[#C94A2C] selection:text-[#F5F0E8] pt-12 pb-24">
      <Helmet>
        <title>Client Directory – KŌDĒ</title>
        <meta name="description" content="Manage your incoming brands and configure their specific client portals." />
      </Helmet>

      <main className="container mx-auto px-6 md:px-12 max-w-6xl space-y-16">
        
        {/* Header Setup */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/10 pb-8">
           <div className="space-y-4">
             <span className="text-[10px] uppercase font-black tracking-[0.4em] text-[#C94A2C]">
                 Operations Directory
             </span>
             <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter leading-none">
                 Client <br className="hidden md:block"/><span className="text-black/30">Network.</span>
             </h1>
             <p className="text-black/60 font-medium max-w-lg text-sm md:text-base">
                 Configure active client portals, oversee inbound onboarding responses, and manage brand deliverables.
             </p>
           </div>
           
           <div className="flex items-center gap-3">
             <Button 
                variant="outline"
                className="bg-transparent rounded-full border-black/10 text-black/80 hover:bg-black/5 hover:text-black uppercase text-[10px] font-bold tracking-widest px-6 disabled:opacity-50"
                onClick={handleMigrateVolumes}
                disabled={isMigrating}
             >
                <Database className="h-3.5 w-3.5 mr-2" />
                {isMigrating ? "Migrating Data..." : "Migrate Volumes"}
             </Button>
             
             <Button asChild className="rounded-full bg-[#0D0D0D] text-white hover:bg-[#C94A2C] uppercase text-[10px] font-bold tracking-widest px-6">
                <Link to="/onboarding">
                  <PlusCircle className="h-3.5 w-3.5 mr-2" />
                  New Brand Integration
                </Link>
             </Button>
           </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-[2rem] p-8 border border-black/5 h-64 flex flex-col justify-between">
                  <Skeleton className="h-8 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="mt-8 flex gap-3">
                      <Skeleton className="h-10 w-full rounded-full" />
                      <Skeleton className="h-10 w-full rounded-full" />
                  </div>
              </div>
            ))}
          </div>
        ) : brands.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {brands.map((brand) => (
              <div key={brand.id} className="group bg-white rounded-[2.5rem] p-8 md:p-10 border border-black/[0.05] shadow-sm hover:shadow-xl transition-all flex flex-col relative overflow-hidden">
                 
                 {/* Internal glowing blur on hover */}
                 <div className="absolute top-0 right-0 w-32 h-32 bg-black/5 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                 <div className="mb-auto space-y-4 relative z-10">
                   <div className="flex justify-between items-start">
                     <h2 className="text-2xl font-display font-black tracking-tight leading-tight max-w-[85%]">{brand.brand_name || "Unnamed Brand"}</h2>
                     <div className="w-2 h-2 rounded-full bg-[#C94A2C] mt-2 shrink-0 animate-pulse" />
                   </div>
                   
                   <p className="text-xs text-black/50 font-bold uppercase tracking-widest line-clamp-1 border-b border-black/5 pb-4">
                     {brand.tagline || "Pending Strategic Baseline"}
                   </p>
                   
                   <p className="text-sm text-black/60 font-medium line-clamp-3">
                     {brand.elevator_pitch || "No executive summary provided. Review full diagnostic."}
                   </p>
                 </div>

                 <div className="pt-8 flex flex-col sm:flex-row gap-3 relative z-10">
                   <Button variant="default" asChild className="w-full rounded-full bg-[#0D0D0D] text-white hover:bg-[#C94A2C] uppercase text-[9px] font-bold tracking-widest text-center shadow-lg transition-transform focus:scale-95 active:scale-95">
                     <Link to={`/brand-profile/${brand.id}`}>
                       Client Management
                       <ArrowRight className="h-3.5 w-3.5 ml-2 hidden lg:block" />
                     </Link>
                   </Button>
                 </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white/50 border border-dashed border-black/10 rounded-[3rem]">
            <PlusCircle className="h-10 w-10 text-black/20 mx-auto mb-4" />
            <h2 className="text-2xl font-display font-black tracking-tight text-black mb-2">No active clients found.</h2>
            <p className="text-black/50 font-medium max-w-sm mx-auto mb-8">
              Start by launching a new client brand to configure their tracking portal and generate strategic reports.
            </p>
            <Button asChild className="rounded-full bg-[#0D0D0D] text-white hover:bg-[#C94A2C] uppercase text-[10px] font-bold tracking-widest px-8 shadow-xl">
              <Link to="/onboarding">
                Initialize Client Directory
              </Link>
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
