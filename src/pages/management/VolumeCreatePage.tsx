import { Helmet } from "react-helmet-async";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useVolumes } from "@/hooks/useVolumes";
import VolumeBehanceEditor from "@/components/admin/VolumeBehanceEditor";

export default function VolumeCreatePage() {
  const navigate = useNavigate();
  const { createVolume } = useVolumes();
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: any): Promise<void> => {
      await createVolume({
        title: data.title,
        slug: data.slug || data.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        volumeType: data.volumeType,
        category: data.category,
        writer: data.writer,
        writerAvatar: data.writerAvatar,
        publishedAt: data.publishedAt,
        timeToRead: data.timeToRead,
        volumeNumber: data.volumeNumber,
        goal: data.goal,
        summary: data.summary,
        content: data.content_blocks || [],
        heroImageUrl: data.media_url,
        isPublished: data.isPublished,
        isFeatured: data.isFeatured,
        isLatest: data.isLatest,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["volumes"] });
      toast({
        title: "Protocol Success",
        description: "New volume asset registered in the ŌDEY repository.",
      });
      navigate("/management/volumes");
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
        <title>New Volume – ŌDEY</title>
      </Helmet>
      <VolumeBehanceEditor
        mode="create"
        onSubmit={mutateAsync}
        isLoading={isPending}
      />
    </>
  );
}
