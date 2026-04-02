import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useVolume } from "@/hooks/useVolumes";
import { EditorialBlock } from "@/types/blocks";
import { Loader2, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const EditorialBlockRenderer = ({ block }: { block: EditorialBlock }) => {
  switch (block.type) {
    case 'heading':
      return (
        <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-black tracking-tighter uppercase text-white mt-16 mb-8 first:mt-0"
        >
          {block.content}
        </motion.h2>
      );
    case 'text':
      return (
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="prose prose-invert prose-neutral max-w-none prose-p:text-white/80 prose-p:leading-relaxed prose-p:text-lg prose-headings:text-white prose-strong:text-[#C94A2C] prose-a:text-[#C94A2C] prose-li:text-white/70"
            dangerouslySetInnerHTML={{ __html: block.content || '' }} 
        />
      );
    case 'image':
      return (
        <motion.figure 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={cn(
                "my-16 space-y-4",
                block.style === 'inset' ? "max-w-4xl mx-auto px-6" : block.style === 'full' ? "-mx-4 md:-mx-20 lg:-mx-32" : ""
            )}
        >
          <div className="rounded-[3rem] overflow-hidden border border-white/10 bg-white/5">
             <img src={block.media_url} alt={block.caption || ""} className="w-full h-auto" />
          </div>
          {block.caption && (
            <figcaption className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 text-center px-8">
              {block.caption}
            </figcaption>
          )}
        </motion.figure>
      );
    case 'quote':
      return (
        <motion.blockquote 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="my-16 p-12 bg-white/[0.03] border-l-4 border-[#C94A2C] rounded-r-[3rem] space-y-6"
        >
          <p className="text-3xl md:text-4xl font-display font-black tracking-tighter uppercase text-white leading-tight">
            "{block.content}"
          </p>
          {block.caption && (
              <span className="block text-[11px] font-black uppercase tracking-[0.4em] text-[#C94A2C]">
                 // {block.caption}
              </span>
          )}
        </motion.blockquote>
      );
    case 'registry_highlight':
      return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="my-10 p-8 rounded-[3rem] border border-white/10 bg-white/[0.02] space-y-4"
        >
           <div className="flex items-center gap-4 opacity-30">
               <div className="h-1 w-1 bg-white rounded-full" />
               <span className="text-[9px] font-black uppercase tracking-[0.5em]">Clinical_Record</span>
               <div className="h-px flex-1 bg-white/10" />
           </div>
           <p className="text-lg text-white/90 font-medium leading-relaxed">
             {block.content}
           </p>
        </motion.div>
      );
    default:
      return null;
  }
};

export default function VolumeDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: volume, isLoading } = useVolume(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-[#C94A2C]" />
      </div>
    );
  }

  if (!volume) {
    return <Navigate to="/volumes" replace />;
  }

  const contentBlocks = (volume.content as any[]) || [];

  return (
    <main className="bg-[#0D0D0D] min-h-screen text-white pb-32">
      <Helmet>
        <title>{`${volume.title} | KŌDĒ Archives`}</title>
      </Helmet>

      {/* Editorial Header */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#C94A2C]/5 to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-[1400px]">
           <div className="flex flex-col gap-12 lg:grid lg:grid-cols-2 lg:items-end">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                  <Button asChild variant="ghost" className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 hover:text-[#C94A2C] -ml-4">
                      <Link to="/volumes" className="flex items-center gap-3">
                          <ArrowLeft size={14} /> Back to Archives
                      </Link>
                  </Button>

                  <div className="space-y-4">
                      <div className="flex items-center gap-4 text-[#C94A2C]">
                          <span className="text-[11px] font-black uppercase tracking-[0.8em]">{volume.volumeNumber}</span>
                          <div className="h-px w-20 bg-[#C94A2C]/30" />
                      </div>
                      <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter uppercase leading-[0.9] text-white">
                        {volume.title}
                      </h1>
                  </div>

                  <p className="text-xl text-white/60 font-medium max-w-2xl leading-relaxed">
                    {volume.summary}
                  </p>

                  <div className="flex flex-col gap-2 pt-4">
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Lead Personnel</span>
                      <span className="text-lg font-bold text-white uppercase tracking-tight">{volume.writer}</span>
                  </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative rounded-[4rem] overflow-hidden border border-white/10 aspect-[4/5] md:aspect-square bg-white/5"
              >
                {volume.heroImageUrl ? (
                    <img src={volume.heroImageUrl} className="w-full h-full object-cover" alt={volume.title} />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/5">
                        <span className="text-[10rem] font-black uppercase tracking-widest leading-none">KŌDĒ</span>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/60 to-transparent" />
              </motion.div>
           </div>
        </div>
      </section>

      {/* Editorial Content Workspace */}
      <section className="container mx-auto px-6 max-w-4xl py-20">
         <article className="space-y-12">
            {contentBlocks.length > 0 ? (
                contentBlocks.map((block: any, idx: number) => {
                    // Check if it's a block object or legacy string
                    const renderedBlock = typeof block === 'string' 
                        ? { id: `leg-${idx}`, type: idx === 0 ? 'text' : 'registry_highlight', content: idx === 0 ? `<p>${block}</p>` : block } as EditorialBlock
                        : block as EditorialBlock;
                    
                    return <EditorialBlockRenderer key={renderedBlock.id} block={renderedBlock} />;
                })
            ) : (
                <div className="text-center py-20 border border-dashed border-white/10 rounded-[3rem]">
                    <p className="text-white/20 text-[10px] font-black uppercase tracking-[1em]">NO_CONTENT_PROCESSED</p>
                </div>
            )}
         </article>

         {/* Share & Support Footer */}
         <div className="mt-40 pt-20 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="text-center md:text-left space-y-4">
                <h4 className="text-xl font-display font-black tracking-tighter uppercase">Support This Edition</h4>
                <p className="text-white/40 text-[11px] font-bold uppercase tracking-widest max-w-sm">
                    KŌDĒ Volumes are community-funded clinical archives. Join the sequence.
                </p>
            </div>
            <div className="flex gap-4">
                <Button variant="outline" className="rounded-2xl h-14 px-8 border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                    Share Record
                </Button>
                <Button className="rounded-2xl h-14 px-8 bg-[#C94A2C] hover:bg-[#A33D24] text-white text-[10px] font-black uppercase tracking-widest transition-all">
                    Join Masterclass
                </Button>
            </div>
         </div>
      </section>
    </main>
  );
}
