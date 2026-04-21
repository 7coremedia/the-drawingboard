import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { PortfolioItem } from "@/hooks/usePortfolio";
import BehanceStyleEditor from "@/components/admin/BehanceStyleEditor";
import { Loader2 } from "lucide-react";

export default function EditPortfolio() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const { data: dataArr, isLoading: isLoadingData } = useQuery({
    queryKey: ["portfolio-and-media", id],
    queryFn: async () => {
      const { data: portfolio, error: pError } = await supabase
        .from("portfolios")
        .select("*")
        .eq("id", id)
        .single();
      if (pError) throw pError;

      const { data: media, error: mError } = await supabase
        .from("portfolio_media")
        .select("*")
        .eq("portfolio_id", id)
        .order("display_order", { ascending: true });
      if (mError) throw mError;

      return { portfolio, media };
    },
  });

  const portfolio = dataArr?.portfolio;
  const mediaItems = dataArr?.media;

  const { mutateAsync: updatePortfolio, isPending } = useMutation({
    mutationFn: async (data: any): Promise<void> => {
      const updatePayload = {
        title: data.title,
        client: data.client ?? null,
        category: data.category,
        tagline: data.tagline,
        year: data.year ?? null,
        cover_url: data.media_url,
        media_url: data.media_url,
        media_type: 'image' as const,
        full_image_url: data.full_image_url ?? data.media_url,
        is_published: data.is_published,
        is_multiple_partners: data.is_multiple_partners ?? false,
        brand_name: data.brand_name ?? null,
        industry: data.industry,
        location: data.location,
        our_role: data.our_role,
        the_challenge: null,
        the_solution: null,
        notes: data.notes,
        is_notes_downloadable: data.is_notes_downloadable,
        content_blocks: data.content_blocks,
        portfolio_type: data.portfolio_type,
        pdf_url: data.pdf_url ?? null,
        slug: data.slug || data.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        updated_at: new Date().toISOString(),
        description: null,
      };

      console.log("[DEBUG] Payload to Supabase:", updatePayload);

      const { error } = await supabase
        .from("portfolios")
        .update(updatePayload)
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolioItems"] });
      queryClient.invalidateQueries({ queryKey: ["portfolio-and-media", id] });
      queryClient.invalidateQueries({ queryKey: ["publicPortfolio"] });
      queryClient.invalidateQueries({ queryKey: ["publicPortfolioItem"] });
      toast({
        title: "Saved",
        description: "Project updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update project.",
        variant: "destructive",
      });
      console.error("Update error:", error);
    },
  });

  if (isLoadingData) {
    return (
      <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 size={20} className="animate-spin text-[#C94A2C]" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/40">
            Loading Project...
          </span>
        </div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center">
        <p className="text-black/40 font-bold text-sm">Project not found.</p>
      </div>
    );
  }

  // Synthesize content_blocks from legacy portfolio_media if empty
  let synthesizedBlocks = (portfolio as any).content_blocks?.length > 0 
    ? (portfolio as any).content_blocks 
    : mediaItems?.filter(m => !m.is_cover).map(m => ({
        id: m.id,
        type: m.media_type === 'video' ? 'video' : 'image',
        media_url: m.url,
        style: 'default'
      })) || [];

  // If there's a legacy PDF and no blocks yet, add a PDF block
  if ((portfolio as any).pdf_url && synthesizedBlocks.length > 0 && !(portfolio as any).content_blocks) {
    synthesizedBlocks.push({
      id: 'legacy-pdf',
      type: 'pdf',
      pdf_url: (portfolio as any).pdf_url,
      pdf_name: 'Legacy Project Document'
    });
  }

  return (
    <>
      <Helmet>
        <title>Edit {portfolio.title} – ŌDEY</title>
      </Helmet>
      <BehanceStyleEditor
        mode="edit"
        initialMeta={{
          title: portfolio.title,
          client: (portfolio as any).client,
          category: portfolio.category as any,
          tagline: (portfolio as any).tagline,
          year: (portfolio as any).year,
          is_published: portfolio.is_published,
          industry: (portfolio as any).industry,
          location: (portfolio as any).location,
          our_role: (portfolio as any).our_role,
          the_challenge: (portfolio as any).the_challenge,
          the_solution: (portfolio as any).the_solution,
          description: (portfolio as any).description,
          notes: (portfolio as any).notes,
          is_notes_downloadable: (portfolio as any).is_notes_downloadable,
          is_multiple_partners: (portfolio as any).is_multiple_partners,
          brand_name: (portfolio as any).brand_name,
          media_url: (portfolio as any).cover_url ?? (portfolio as any).media_url,
          full_image_url: (portfolio as any).full_image_url ?? (portfolio as any).cover_url,
          content_blocks: synthesizedBlocks,
          portfolio_type: (portfolio as any).portfolio_type || 'gallery',
          pdf_url: (portfolio as any).pdf_url,
          slug: portfolio.slug,
        }}
        onSubmit={updatePortfolio}
        isLoading={isPending}
      />
    </>
  );
}
