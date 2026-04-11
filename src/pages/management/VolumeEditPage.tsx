import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from '@/hooks/use-toast';
import { useVolumes } from '@/hooks/useVolumes';
import VolumeBehanceEditor from '@/components/admin/VolumeBehanceEditor';
import { Loader2 } from 'lucide-react';

export default function VolumeEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { volumes, updateVolume, isLoading: isVolumesLoading } = useVolumes();
  const queryClient = useQueryClient();
  const [volume, setVolume] = useState<typeof volumes[0] | null>(null);

  useEffect(() => {
    if (!isVolumesLoading && volumes.length > 0) {
      const foundVolume = volumes.find(v => v.id === id);
      if (foundVolume) {
        setVolume(foundVolume);
      } else {
        navigate('/management/volumes');
      }
    }
  }, [navigate, volumes, id, isVolumesLoading]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: any): Promise<void> => {
      if (!volume) return;
      await updateVolume({
        id: volume.id,
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
        orderIndex: volume.orderIndex,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["volumes"] });
      toast({
        title: "Protocol Success",
        description: "Volume asset securely synchronized in the KŌDĒ repository.",
      });
      navigate("/management/volumes");
    },
    onError: (error) => {
      toast({
        title: "Protocol Error",
        description: "Failed to initialize archival sequence.",
        variant: "destructive",
      });
      console.error("Update error:", error);
    },
  });

  if (isVolumesLoading || !volume) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F5F0E8]">
        <div className="flex flex-col items-center gap-6">
            <Loader2 className="h-12 w-12 animate-spin text-[#C94A2C]" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/40">Accessing Database Registry...</span>
        </div>
      </div>
    );
  }

  const initialMeta = {
    title: volume.title,
    slug: volume.slug,
    volumeType: volume.volumeType,
    category: volume.category,
    writer: volume.writer,
    writerAvatar: volume.writerAvatar || "",
    publishedAt: volume.publishedAt || "",
    timeToRead: volume.timeToRead || "",
    volumeNumber: volume.volumeNumber || "",
    goal: volume.goal || "",
    summary: volume.summary,
    media_url: volume.heroImageUrl || "",
    content_blocks: volume.content as any,
    isPublished: volume.isPublished,
    isFeatured: volume.isFeatured,
    isLatest: volume.isLatest,
  };

  return (
    <>
      <Helmet>
        <title>Edit {volume.title} – KŌDĒ</title>
      </Helmet>
      <VolumeBehanceEditor
        mode="edit"
        initialMeta={initialMeta}
        onSubmit={mutateAsync}
        isLoading={isPending}
        onCancel={() => navigate('/management/volumes')}
      />
    </>
  );
}
