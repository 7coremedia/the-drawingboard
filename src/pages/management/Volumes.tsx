import { useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useUser } from "@/hooks/usePortfolioAuth";
import { useVolumes } from "@/hooks/useVolumes";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Plus, Edit2, Trash2 } from "lucide-react";
import { VolumeRecord } from "@/types/volume";

// Moved to VolumeForm component

export default function ManagementVolumes() {
  const navigate = useNavigate();
  const { user, role } = useUser();
  const { toast } = useToast();
  const {
    volumes,
    isLoading,
    error,
    deleteVolume,
  } = useVolumes();

  useEffect(() => {
    if (!user || !(role?.is_admin || role?.is_moderator)) {
      navigate("/");
    }
  }, [user, role, navigate]);

  const sortedVolumes = useMemo(
    () => [...volumes].sort((a, b) => a.orderIndex - b.orderIndex),
    [volumes]
  );

  const handleCreateNew = () => {
    navigate("/management/volumes/new");
  };

  const handleEdit = (volumeId: string) => {
    navigate(`/management/volumes/${volumeId}/edit`);
  };

  const handleDelete = async (volume: VolumeRecord) => {
    const confirmDelete = window.confirm(
      `Delete ${volume.title}? This action cannot be undone.`
    );

    if (!confirmDelete) return;
    try {
      await deleteVolume(volume.id);
      toast({
        title: "Volume deleted",
        description: `${volume.title} has been removed`,
      });
    } catch (err: any) {
      console.error(err);
      toast({
        title: "Error",
        description: err?.message ?? "Failed to delete volume",
        variant: "destructive",
      });
    }
  };

  if (!user || !(role?.is_admin || role?.is_moderator)) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#F5F0E8] text-[#0D0D0D] py-16 md:py-24">
      <Helmet>
        <title>Volumes Registry – ŌDEY</title>
      </Helmet>
      
      <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <span className="text-[10px] uppercase tracking-[0.5em] font-black text-[#C94A2C]">Editorial Governance</span>
                    <div className="h-px w-12 bg-black/10" />
                </div>
                <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter leading-none uppercase">Volumes <br /><span className="text-black/20">Registry.</span></h1>
                <p className="text-xl text-black/60 font-medium max-w-2xl">
                    Publish and update ŌDEY Volumes. Each entry powers the public volumes experience and individual detail pages.
                </p>
            </div>
            
            <Button 
                onClick={() => navigate("/management/volumes/new")}
                className="bg-[#0D0D0D] hover:bg-[#C94A2C] text-white px-10 py-8 h-auto rounded-full text-[11px] font-black uppercase tracking-widest shadow-2xl transition-all"
            >
              <Plus className="w-5 h-5 mr-3" />
              Initiate New Edition
            </Button>
          </div>

      <div className="bg-white border border-black/[0.05] rounded-[2.5rem] overflow-hidden shadow-xl shadow-black/5">
        {isLoading ? (
          <div className="py-32 flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-2 border-[#C94A2C] border-t-transparent rounded-full animate-spin mb-6" />
            <p className="text-[10px] uppercase tracking-[0.4em] font-black text-black/60">Fetching Editorial Registry...</p>
          </div>
        ) : error ? (
          <div className="py-20 text-center text-[#C94A2C] font-bold uppercase tracking-widest text-[10px]">
            Protocol Interrupted: Failed to load registry streams.
          </div>
        ) : sortedVolumes.length === 0 ? (
          <div className="py-32 text-center max-w-md mx-auto space-y-8">
            <div className="mx-auto w-20 h-20 bg-[#F5F0E8] border border-black/5 rounded-[2.5rem] flex items-center justify-center shadow-inner">
               <Loader2 size={32} className="text-[#C94A2C]/20" />
            </div>
            <div className="space-y-3">
                <h3 className="text-3xl font-display font-black tracking-tighter uppercase">Registry Empty</h3>
                <p className="text-[#0D0D0D]/60 font-bold text-sm tracking-wide leading-relaxed">
                    No clinical volumes detected in the editorial database. 
                </p>
            </div>
            <Button 
                onClick={handleCreateNew}
                className="bg-[#0D0D0D] hover:bg-[#C94A2C] text-white px-10 h-14 rounded-full text-[10px] font-black uppercase tracking-widest transition-all"
            >
              Initiate First Edition
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F5F0E8]/50 border-b border-black/5 h-20">
                <TableHead className="text-[10px] uppercase tracking-[0.3em] font-black text-[#0D0D0D]/60 pl-10">Order</TableHead>
                <TableHead className="text-[10px] uppercase tracking-[0.3em] font-black text-[#0D0D0D]/60">Edition</TableHead>
                <TableHead className="text-[10px] uppercase tracking-[0.3em] font-black text-[#0D0D0D]/60">Clinical Volume</TableHead>
                <TableHead className="text-[10px] uppercase tracking-[0.3em] font-black text-[#0D0D0D]/60">Author</TableHead>
                <TableHead className="text-[10px] uppercase tracking-[0.3em] font-black text-[#0D0D0D]/60">Status</TableHead>
                <TableHead className="text-[10px] uppercase tracking-[0.3em] font-black text-[#0D0D0D]/60 w-32 text-right pr-10">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedVolumes.map((volume) => (
                <TableRow key={volume.id} className="h-16 bg-white hover:bg-[#F5F0E8]/40 border-b border-black/5 transition-all">
                  <TableCell className="pl-8 font-bold text-black/20 text-[10px]">#{volume.orderIndex ?? 0}</TableCell>
                  <TableCell>
                    <div className="font-display font-black tracking-tighter text-base text-[#0D0D0D]">{volume.volumeNumber}</div>
                    <div className="text-[8px] font-bold text-black/20 uppercase tracking-widest">{volume.slug}</div>
                  </TableCell>
                  <TableCell className="font-bold text-[#0D0D0D] text-sm">{volume.title}</TableCell>
                  <TableCell className="text-[10px] font-bold text-black/40 uppercase tracking-tight">{volume.writer}</TableCell>
                  <TableCell>
                    {volume.isPublished ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border border-[#C94A2C]/10 bg-[#C94A2C]/5 text-[#C94A2C]">
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border border-black/10 bg-black/[0.05] text-black/60">
                        Staging
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="pr-6">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(volume.id)}
                        className="h-8 w-8 p-0 rounded-lg hover:bg-black/5 transition-colors"
                      >
                         <Edit2 size={14} className="text-[#0D0D0D]/60" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(volume)}
                        className="h-8 w-8 p-0 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={14} className="text-[#C94A2C]" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  </main>
);
}
