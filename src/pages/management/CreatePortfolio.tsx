import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import CreatePortfolioFormV2 from "@/components/admin/CreatePortfolioFormV2";
import { ClipboardList, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CreatePortfolio() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutateAsync: createPortfolio } = useMutation({
    mutationFn: async (data: any): Promise<void> => {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data: portfolio, error } = await supabase
        .from("portfolios")
        .insert([{
          slug: data.title.toLowerCase().replace(/\s+/g, '-'),
          title: data.title,
          client: data.client,
          category: data.category,
          tagline: data.tagline,
          year: data.year,
          cover_url: data.media_url,
          media_url: data.media_url,
          media_type: 'image',
          full_image_url: data.full_image_url,
          is_published: data.is_published,
          is_multiple_partners: data.is_multiple_partners || false,
          brand_name: data.brand_name,
          industry: data.industry,
          location: data.location,
          our_role: data.our_role,
          the_challenge: data.the_challenge,
          the_solution: data.the_solution,
          notes: data.notes,
          is_notes_downloadable: data.is_notes_downloadable,
          portfolio_type: data.portfolio_type || 'gallery',
          pdf_url: data.portfolio_type === 'case_study' ? (data.pdf_url || null) : null,
          order_index: 0,
          user_id: user?.id,
        }])
        .select()
        .single();

      if (error) {
        console.error("Portfolio creation error:", error);
        throw error;
      }

      if (data.portfolio_type !== 'case_study' && data.media_files && data.media_files.length > 0) {
        const mediaData = data.media_files.map((media: any, index: number) => ({
          portfolio_id: portfolio.id,
          url: media.url,
          media_type: media.type,
          file_name: media.name,
          file_size: media.size || null,
          display_order: index,
          is_cover: false,
        }));

        const { error: mediaError } = await supabase
          .from("portfolio_media")
          .insert(mediaData);

        if (mediaError) {
          console.error("Media creation error:", mediaError);
        }
      }

      if (data.partners && data.partners.length > 0 && portfolio) {
        const partnersData = data.partners.map((partner: any) => ({
          portfolio_id: portfolio.id,
          name: partner.name,
          social_name: partner.social_name,
          social_link: partner.social_link,
          image_url: partner.image_url,
        }));

        const { error: partnersError } = await supabase
          .from("portfolio_partners")
          .insert(partnersData);

        if (partnersError) {
          console.error("Partners creation error:", partnersError);
          throw partnersError;
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolioItems"] });
      toast({
        title: "Protocol Success",
        description: "New exhibition asset has been successfully registered in the KŌDĒ repository.",
      });
      navigate("/management/portfolio");
    },
    onError: (error) => {
      toast({
        title: "Protocol Error",
        description: "Failed to initialize clinical archival sequence.",
        variant: "destructive",
      });
      console.error("Create error:", error);
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async (data: any) => {
    setIsLoading(true);
    try {
      await createPortfolio(data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F5F0E8] text-[#0D0D0D] py-16 md:py-24 selection:bg-[#C94A2C] selection:text-white">
      <Helmet>
        <title>Initiate Archival Protocol – KŌDĒ</title>
      </Helmet>

      <div className="container mx-auto px-6">
        <header className="mb-20 space-y-8">
            <button 
                onClick={() => navigate("/management/portfolio")}
                className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] font-black text-black/40 hover:text-[#C94A2C] transition-colors group"
            >
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Back to Registry
            </button>
            
            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <span className="text-[10px] uppercase tracking-[0.5em] font-black text-[#C94A2C]">Exhibition Entry Protocol</span>
                    <div className="h-px w-12 bg-black/10" />
                </div>
                <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter leading-none uppercase">Create Archival <br /><span className="text-black/20"> Entry.</span></h1>
                <p className="text-lg text-[#0D0D0D]/40 font-medium max-w-xl">
                    Registering new clinical project data into the primary KŌDĒ Exhibition Archive.
                </p>
            </div>
        </header>

        <section className="relative">
            <div className="absolute -top-12 right-0 flex items-center gap-3 opacity-20 hidden md:flex">
                <ClipboardList size={16} />
                <span className="text-[9px] font-black uppercase tracking-[0.3em]">Entry Form_v2.0</span>
            </div>
            
            <CreatePortfolioFormV2
                onSubmit={handleCreate}
                isLoading={isLoading}
            />
        </section>
      </div>
    </main>
  );
}