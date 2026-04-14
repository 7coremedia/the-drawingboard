import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useVolume } from "@/hooks/useVolumes";
import { EditorialBlock } from "@/types/blocks";
import { Loader2, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const EditorialBlockRenderer = ({ block }: { block: any }) => {
  switch (block.type) {
    case 'heading':
      return (
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-black tracking-tighter uppercase text-white mt-16 mb-8 lg:mb-12" dangerouslySetInnerHTML={{ __html: (block.content || '').replace(/\n/g, '<br/>') }} />
      );
    case 'text':
      return (
        <p className="text-[15px] md:text-lg font-medium leading-[1.8] text-white/70 max-w-3xl whitespace-pre-wrap">
           {block.content}
        </p>
      );
    case 'image':
      if (!block.media_url) return null;
      return (
        <div className={cn(
          "w-full flex my-16 space-y-4",
          block.layout === 'left' ? 'justify-start' : block.layout === 'right' ? 'justify-end' : 'justify-center'
        )}>
          <div className={cn(
            "flex flex-col gap-8 w-full",
            (block.side_text && (block.size === 'small' || block.size === 'medium')) 
              ? (block.layout === 'right' ? 'md:flex-row-reverse' : 'md:flex-row items-center')
              : "items-center"
          )}>
            <div className={cn(
              "overflow-hidden shrink-0 shadow-xl border bg-white/5 border-white/10", 
              block.size === 'small' ? 'w-full md:max-w-md rounded-[2rem]' : 
              block.size === 'medium' ? 'w-full md:max-w-3xl rounded-[3rem]' : 'w-full max-w-5xl rounded-[3rem]'
            )}>
              <img src={block.media_url} alt="Exhibit Media" className="w-full h-auto object-cover" loading="lazy" />
            </div>
            
            {block.side_text && (block.size === 'small' || block.size === 'medium') && (
               <div className="flex-1 px-4 lg:px-12">
                  <p className="text-lg md:text-xl font-medium leading-relaxed text-white/70 whitespace-pre-wrap">
                     {block.side_text}
                  </p>
               </div>
            )}
          </div>
        </div>
      );
    case 'gallery':
      if (!block.media_urls || block.media_urls.length === 0) return null;
      return (
        <div className="relative w-screen left-1/2 -translate-x-1/2 my-16">
          <div className="flex gap-3 overflow-x-auto px-6 md:px-12 pb-4 snap-x snap-mandatory scrollbar-hide">
            {block.media_urls.map((url: string, i: number) => (
              <div
                key={i}
                className="shrink-0 snap-start overflow-hidden rounded-[2rem]"
                style={{ height: '300px' }}
              >
                <img
                  src={url}
                  alt={`Gallery ${i}`}
                  className="h-full w-auto object-cover"
                  loading="lazy"
                  style={{ maxWidth: 'none' }}
                />
              </div>
            ))}
          </div>
        </div>
      );
    case 'video':
      if (!block.media_url) return null;
      return (
        <div className="max-w-5xl mx-auto overflow-hidden rounded-[3rem] shadow-2xl bg-[#0D0D0D] border border-white/10 aspect-video my-16">
          {block.media_url.includes('youtube') || block.media_url.includes('vimeo') ? (
            <iframe 
              src={block.media_url.includes('youtube') ? block.media_url.replace('watch?v=', 'embed/') : block.media_url} 
              className="w-full h-full" 
              allowFullScreen
            />
          ) : (
            <video src={block.media_url} controls className="w-full h-full object-cover" />
          )}
        </div>
      );
    case 'pdf':
      if (!block.pdf_url) return null;
      return (
        <div className="max-w-4xl mx-auto my-16">
          <div className="flex flex-col md:flex-row items-center justify-between bg-white/5 rounded-[3rem] p-10 border border-white/10 shadow-xl">
            <div className="flex items-center gap-8 mb-8 md:mb-0">
              <div className="text-left">
                <span className="text-[12px] uppercase tracking-[0.4em] font-black text-white/30 block mb-2">Archived Document</span>
                <h4 className="text-2xl md:text-3xl font-black text-white tracking-tight">{block.pdf_name || "Protocol Documentation"}</h4>
              </div>
            </div>
            <a 
              href={block.pdf_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full md:w-auto px-12 py-6 bg-white text-black rounded-full text-[12px] font-bold uppercase tracking-widest hover:bg-[#C94A2C] hover:text-white transition-colors text-center"
            >
              Download File
            </a>
          </div>
        </div>
      );
    case 'divider':
      return (
        <div className="max-w-2xl mx-auto h-px bg-white/10 my-24" />
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
        <title>{`${volume.title} | ŌDEY Archives`}</title>
      </Helmet>

      {/* Editorial Header */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#C94A2C]/5 to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-[1200px]">
           <div className={cn("flex flex-col gap-10 lg:grid lg:items-end", 
             volume.heroImageOrientation === 'landscape' ? "lg:grid-cols-1" : "lg:grid-cols-[1fr_420px]"
           )}>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn("space-y-8", volume.heroImageOrientation === 'landscape' ? "max-w-4xl pt-8 pb-4" : "")}
              >
                  <Button asChild variant="ghost" className={cn("text-[10px] font-black uppercase tracking-[0.5em] text-white/40 hover:text-[#C94A2C] -ml-4", volume.heroImageOrientation === 'landscape' ? "hidden" : "inline-flex")}>
                      <Link to="/volumes" className="flex items-center gap-3">
                          <ArrowLeft size={14} /> Back to Archives
                      </Link>
                  </Button>

                  <div className="space-y-4">
                      <div className={cn("flex items-center gap-4 text-[#C94A2C]", volume.heroImageOrientation === 'landscape' ? "justify-start" : "")}>
                          <span className="text-[11px] font-black uppercase tracking-[0.8em]">{volume.volumeNumber}</span>
                          <div className="h-px w-20 bg-[#C94A2C]/30" />
                      </div>
                      <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-black tracking-tighter uppercase leading-[0.95] text-white">
                        {volume.title}
                      </h1>
                  </div>

                  <p className={cn("text-xl text-white/60 font-medium leading-relaxed", volume.heroImageOrientation === 'landscape' ? "max-w-3xl" : "max-w-2xl")}>
                    {volume.summary}
                  </p>

                  <div className="flex flex-col gap-2 pt-4">
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Lead Personnel</span>
                      <span className="text-lg font-bold text-white uppercase tracking-tight">{volume.writer}</span>
                  </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className={cn("relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/5", 
                  volume.heroImageOrientation === 'landscape' ? "aspect-video w-full" : "aspect-[4/5]"
                )}
              >
                {volume.heroImageUrl ? (
                    <img src={volume.heroImageUrl} className="w-full h-full object-cover" alt={volume.title} />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/5">
                        <span className="text-[10rem] font-black uppercase tracking-widest leading-none">ŌDEY</span>
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
                    ŌDEY Volumes are community-funded clinical archives. Join the sequence.
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
