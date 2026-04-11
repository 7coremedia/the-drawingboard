import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { VolumeRecord } from "@/types/volume";

const mapVolumeFromDb = (row: any): VolumeRecord => ({
  id: row.id,
  slug: row.slug,
  volumeType: row.volume_type ?? 'article',
  volumeNumber: row.volume_number ?? undefined,
  category: row.category ?? undefined,
  title: row.title,
  writer: row.writer,
  writerAvatar: row.writer_avatar ?? null,
  publishedAt: row.published_at ?? undefined,
  timeToRead: row.time_to_read ?? undefined,
  goal: row.goal ?? undefined,
  summary: row.summary,
  content: row.content ?? [],
  leadParagraph: row.lead_paragraph ?? null,
  heroImageUrl: row.hero_image_url ?? null,
  isPublished: row.is_published,
  isFeatured: row.is_featured ?? false,
  isLatest: row.is_latest ?? false,
  orderIndex: row.order_index,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

const mapVolumeToDb = (input: Partial<VolumeRecord>) => ({
  slug: input.slug,
  volume_type: input.volumeType ?? 'article',
  volume_number: input.volumeNumber ?? null,
  category: input.category ?? null,
  title: input.title,
  writer: input.writer,
  writer_avatar: input.writerAvatar ?? null,
  published_at: input.publishedAt ?? null,
  time_to_read: input.timeToRead ?? null,
  goal: input.goal ?? null,
  summary: input.summary,
  content: input.content ?? [],
  lead_paragraph: input.leadParagraph ?? null,
  hero_image_url: input.heroImageUrl ?? null,
  is_published: input.isPublished ?? false,
  is_featured: input.isFeatured ?? false,
  is_latest: input.isLatest ?? false,
  order_index: input.orderIndex ?? 0,
  created_at: input.createdAt ?? new Date().toISOString(),
});


export const volumeQueryKeys = {
  all: ["volumes"] as const,
  detail: (id: string) => ["volumes", id] as const,
};

export function useVolumes() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: volumeQueryKeys.all,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("volumes")
        .select("*")
        .order("order_index", { ascending: true });

      if (error) throw error;
      return (data ?? []).map(mapVolumeFromDb);
    },
  });

  const createMutation = useMutation({
    mutationFn: async (payload: Partial<VolumeRecord>) => {
      const { data, error } = await supabase
        .from("volumes")
        .insert([mapVolumeToDb(payload)])
        .select()
        .single();

      if (error) throw error;
      return mapVolumeFromDb(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: volumeQueryKeys.all });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (payload: VolumeRecord) => {
      const { error } = await supabase
        .from("volumes")
        .update({
          ...mapVolumeToDb(payload),
          updated_at: new Date().toISOString(),
        })
        .eq("id", payload.id);

      if (error) throw error;
      return payload;
    },
    onSuccess: (_, payload) => {
      queryClient.invalidateQueries({ queryKey: volumeQueryKeys.all });
      if (payload?.id) {
        queryClient.invalidateQueries({ queryKey: volumeQueryKeys.detail(payload.id) });
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("volumes").delete().eq("id", id);
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: volumeQueryKeys.all });
    },
  });

  const reorderMutation = useMutation({
    mutationFn: async (updates: { id: string; orderIndex: number }[]) => {
      for (const update of updates) {
        const { error } = await supabase
          .from("volumes")
          .update({
            order_index: update.orderIndex,
            updated_at: new Date().toISOString(),
          })
          .eq("id", update.id);

        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: volumeQueryKeys.all });
    },
  });

  return {
    volumes: data ?? [],
    isLoading,
    error,
    createVolume: createMutation.mutateAsync,
    updateVolume: updateMutation.mutateAsync,
    deleteVolume: deleteMutation.mutateAsync,
    reorderVolumes: reorderMutation.mutateAsync,
  };
}

export function useVolume(id?: string) {
  return useQuery({
    queryKey: id ? volumeQueryKeys.detail(id) : volumeQueryKeys.detail("new"),
    enabled: Boolean(id),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("volumes")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return mapVolumeFromDb(data);
    },
  });
}
