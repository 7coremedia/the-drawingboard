import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useUser } from '@/hooks/usePortfolioAuth';
import { useVolumes } from '@/hooks/useVolumes';
import VolumeForm, { VolumeSubmitPayload } from '@/components/admin/VolumeForm';
import { toast } from '@/components/ui/use-toast';
import { Database, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function VolumeCreatePage() {
  const navigate = useNavigate();
  const { user, role } = useUser();
  const { createVolume, volumes } = useVolumes();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!user || !(role?.is_admin || role?.is_moderator)) {
      navigate('/');
    }
  }, [user, role, navigate]);

  const handleSubmit = async (payload: VolumeSubmitPayload) => {
    setIsSubmitting(true);
    try {
      await createVolume(payload);
      
      toast({
        title: 'Registry Updated',
        description: 'New Volume has been successfully ingested into the archival database.',
      });
      
      navigate('/management/volumes');
    } catch (error) {
      console.error('Failed to create volume:', error);
      toast({
        title: 'Ingestion Error',
        description: 'Failed to synchronize with archival database. Protocol aborted.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F5F0E8] py-12 px-6 lg:px-12">
      <Helmet>
        <title>Initiate New Volume | KŌDĒ Archival Registry</title>
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
                        <span className="text-[10px] font-black uppercase tracking-[0.6em]">New Volume</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-display font-black tracking-tight uppercase text-[#0D0D0D]">
                        Create <br /> <span className="text-black/20">New Volume</span>
                    </h1>
                </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-3">
                <div className="flex items-center gap-2 bg-black/[0.03] px-4 py-2 rounded-full border border-black/5">
                    <ShieldCheck size={14} className="text-[#C94A2C]" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-black/60">Creation Mode Active</span>
                </div>
                <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest text-left md:text-right max-w-xs leading-relaxed">
                    Fill in the details below to add a new volume to the KŌDĒ collection.
                </p>
            </div>
        </div>

        {/* Form Section */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <VolumeForm 
                onSubmit={handleSubmit} 
                onCancel={() => navigate('/management/volumes')}
                isSubmitting={isSubmitting}
                defaultOrderIndex={volumes.length}
                submitLabel={isSubmitting ? 'Sync Protocol...' : 'Initiate Edits'}
            />
        </div>
      </div>
    </main>
  );
}
