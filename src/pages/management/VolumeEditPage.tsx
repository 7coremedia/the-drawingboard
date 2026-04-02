import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useUser } from '@/hooks/usePortfolioAuth';
import { useVolumes } from '@/hooks/useVolumes';
import VolumeForm, { VolumeSubmitPayload } from '@/components/admin/VolumeForm';
import { toast } from '@/components/ui/use-toast';
import { Database, ShieldCheck, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function VolumeEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, role } = useUser();
  const { volumes, updateVolume, isLoading: isVolumesLoading } = useVolumes();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [volume, setVolume] = useState<typeof volumes[0] | null>(null);

  useEffect(() => {
    if (!user || !(role?.is_admin || role?.is_moderator)) {
      navigate('/');
      return;
    }

    if (!isVolumesLoading && volumes.length > 0) {
      const foundVolume = volumes.find(v => v.id === id);
      if (foundVolume) {
        setVolume(foundVolume);
      } else {
        navigate('/management/volumes');
      }
    }
  }, [user, role, navigate, volumes, id, isVolumesLoading]);

  const handleSubmit = async (values: VolumeSubmitPayload) => {
    if (!volume) return;
    
    setIsSubmitting(true);
    try {
      await updateVolume({
        ...values,
        id: volume.id,
      });
      
      toast({
        title: 'Registry Updated',
        description: `Changes to ${volume.title} have been successfully synchronized.`,
      });
      
      navigate('/management/volumes');
    } catch (error) {
      console.error('Failed to update volume:', error);
      toast({
        title: 'Synchronization Error',
        description: 'Failed to update archival record. Protocol aborted.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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

  return (
    <main className="min-h-screen bg-[#F5F0E8] py-12 px-6 lg:px-12">
      <Helmet>
        <title>Edit {volume.title} | KŌDĒ Archival Registry</title>
      </Helmet>

      <div className="max-w-[1400px] mx-auto space-y-12">
        {/* Clinical Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-black/5 pb-12">
            <div className="space-y-6">
                <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => navigate('/management/volumes')}
                    className="group -ml-4 text-[10px] font-black uppercase tracking-[0.4em] text-black/40 hover:text-black transition-colors"
                >
                    <ArrowLeft size={14} className="mr-3 group-hover:-translate-x-1 transition-transform" />
                    Back to Volumes
                </Button>
                
                <div className="space-y-2">
                    <div className="flex items-center gap-3 text-[#C94A2C]">
                        <Database size={20} />
                        <span className="text-[10px] font-black uppercase tracking-[0.6em]">Edit Volume</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-display font-black tracking-tight uppercase text-[#0D0D0D]">
                        Update <br /> <span className="text-black/20">Volume Record</span>
                    </h1>
                </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-3">
                <div className="flex items-center gap-2 bg-black/[0.03] px-4 py-2 rounded-full border border-black/5">
                    <ShieldCheck size={14} className="text-[#C94A2C]" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-black/60">Edits Active</span>
                </div>
                <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest text-left md:text-right max-w-xs leading-relaxed">
                    Make changes to the volume details below. These updates will be reflected across the entire site.
                </p>
            </div>
        </div>

        {/* Form Section */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <VolumeForm 
                initialData={volume}
                onSubmit={handleSubmit}
                onCancel={() => navigate('/management/volumes')}
                isSubmitting={isSubmitting}
                submitLabel={isSubmitting ? 'Updating...' : 'Synchronize Edition'}
            />
        </div>
      </div>
    </main>
  );
}
