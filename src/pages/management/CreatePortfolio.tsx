import { Helmet } from "react-helmet-async";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import BehanceStyleEditor from "@/components/admin/BehanceStyleEditor";

export default function CreatePortfolio() {
  const queryClient = useQueryClient();

  const { mutateAsync: createPortfolio, isPending } = useMutation({
    mutationFn: async (data: any): Promise<void> => {
      const { data: { user } } = await supabase.auth.getUser();

      const { data: portfolio, error } = await supabase
        .from("portfolios")
        .insert([{
          slug: data.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
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
          description: data.description,
          notes: data.notes,
          is_notes_downloadable: data.is_notes_downloadable,
          portfolio_type: data.portfolio_type || 'gallery',
          pdf_url: data.pdf_url || null,
          content_blocks: data.content_blocks || [],
          order_index: 0,
          user_id: user?.id,
        }])
        .select()
        .single();

      if (error) {
        console.error("Portfolio creation error:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolioItems"] });
      queryClient.invalidateQueries({ queryKey: ["publicPortfolio"] });
      queryClient.invalidateQueries({ queryKey: ["publicPortfolioItem"] });
      toast({
        title: "Protocol Success",
        description: "New exhibition asset registered in the KŌDĒ repository.",
      });
    },
    onError: (error) => {
      toast({
        title: "Protocol Error",
        description: "Failed to initialize archival sequence.",
        variant: "destructive",
      });
      console.error("Create error:", error);
    },
  });

  return (
    <>
      <Helmet>
        <title>New Project – KŌDĒ</title>
      </Helmet>
      <BehanceStyleEditor
        mode="create"
        onSubmit={createPortfolio}
        isLoading={isPending}
      />
    </>
  );
}