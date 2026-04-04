import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PortfolioMediaItem } from "./usePortfolioMedia";

export interface PublicPartner {
  id: string;
  name: string;
  social_name: string;
  social_link?: string;
  image_url?: string;
}

export interface PublicPortfolioItem {
  id: string;
  slug: string;
  title: string;
  client?: string;
  category: "Branding" | "Logo" | "Poster" | "Other";
  tagline: string;
  cover_url: string;
  full_image_url?: string;
  year?: string;
  is_multiple_partners: boolean;
  brand_name?: string;
  is_published: boolean;
  portfolio_type?: 'gallery' | 'case_study';
  pdf_url?: string | null;
  industry?: string;
  location?: string;
  our_role?: string;
  the_challenge?: string;
  the_solution?: string;
  description?: string;
  notes?: any;
  is_notes_downloadable?: boolean;
  content_blocks?: any;
  created_at: string;
  updated_at: string;
  partners?: PublicPartner[];
  media?: PortfolioMediaItem[];
}

export function usePublicPortfolio() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["publicPortfolio"],
    queryFn: async () => {
      // Get published portfolio items with their partners
      const { data: portfolios, error: portfolioError } = await supabase
        .from("portfolios")
        .select(`
          *,
          portfolio_partners (
            id,
            name,
            social_name,
            social_link,
            image_url
          )
        `)
        .eq("is_published", true)
        .order("order_index");

      if (portfolioError) throw portfolioError;

      // Transform the data to match the expected format
      const transformedData = portfolios.map((portfolio: any) => ({
        ...portfolio,
        partners: portfolio.portfolio_partners?.map((partner: any) => ({
          id: partner.id,
          name: partner.name,
          social_name: partner.social_name,
          social_link: partner.social_link,
          image_url: partner.image_url,
        })) || [],
      }));

      return transformedData as PublicPortfolioItem[];
    },
  });

  return { data, isLoading, error };
}

export function usePublicPortfolioItem(slug: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["publicPortfolioItem", slug],
    queryFn: async () => {
      if (!slug) return null;

      const { data: portfolio, error: portfolioError } = await supabase
        .from("portfolios")
        .select(`
          *,
          portfolio_partners (
            id,
            name,
            social_name,
            social_link,
            image_url
          ),
          portfolio_media (
            *
          )
        `)
        .eq("slug", slug)
        .single();

      if (portfolioError) {
        if (portfolioError.code === 'PGRST116') {
          // No rows returned - portfolio not found
          return null;
        }
        throw portfolioError;
      }

      // Transform the data to match the expected format
      const transformedData = {
        ...portfolio,
        partners: portfolio.portfolio_partners?.map((partner: any) => ({
          id: partner.id,
          name: partner.name,
          social_name: partner.social_name,
          social_link: partner.social_link,
          image_url: partner.image_url,
        })) || [],
        media: (portfolio.portfolio_media || []).sort((a: any, b: any) => a.display_order - b.display_order),
      };

      return transformedData as PublicPortfolioItem;
    },
    enabled: !!slug,
  });

  return { data, isLoading, error };
}
