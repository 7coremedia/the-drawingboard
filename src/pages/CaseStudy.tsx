import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import { usePublicPortfolioItem, usePublicPortfolio } from "@/hooks/usePublicPortfolio";
import PortfolioMediaDisplay from "@/components/portfolio/PortfolioMediaDisplay";
import ProjectInfoOverlay from "@/components/smart-blocks/ProjectInfoOverlay";
import RedesignFooter from "@/components/redesign/RedesignFooter";
import { cn } from '@/lib/utils';
import { Activity, ShieldCheck } from 'lucide-react';

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const { data: currentCaseStudy, isLoading, error } = usePublicPortfolioItem(slug || '');
  const { data: allPortfolioItems } = usePublicPortfolio();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F5F0E8]">
        <div className="w-12 h-12 border-2 border-[#C94A2C] border-t-transparent rounded-full animate-spin mb-6" />
        <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-black/40">Fetching Archive Protocol...</p>
      </div>
    );
  }

  if (error || !currentCaseStudy) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F5F0E8]">
        <div className="text-center space-y-6">
            <h2 className="text-3xl font-display font-black tracking-tighter">Protocol Inaccessible</h2>
            <p className="text-[#0D0D0D]/40 font-medium">The requested archive entry could not be located.</p>
            <Link to="/portfolio" className="inline-block bg-[#0D0D0D] text-white px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl">Return to Archive</Link>
        </div>
      </div>
    );
  }

  const relatedCaseStudies = (allPortfolioItems || [])
    .filter((item) => currentCaseStudy && item.slug !== slug && item.category === currentCaseStudy.category)
    .slice(0, 3);

  const blocks: any[] = currentCaseStudy?.content_blocks ? (currentCaseStudy.content_blocks as any[]) : [];
  const displayBlocks = blocks.filter(b => !['meta_background', 'meta_background_image', 'meta_background_color', 'meta_title_font'].includes(b.type));
  const bgImageBlock = blocks.find(b => b.type === 'meta_background' || b.type === 'meta_background_image');
  const bgColorBlock = blocks.find(b => b.type === 'meta_background_color');
  const titleFontBlock = blocks.find(b => b.type === 'meta_title_font');
  
  const customTitleFont = titleFontBlock?.content;
  const googleFontUrl = customTitleFont ? `https://fonts.googleapis.com/css2?family=${customTitleFont.replace(/\s+/g, '+')}&display=swap` : null;
  const hasBg = !!bgImageBlock?.media_url;
  const customBgColor = bgColorBlock?.content;

  return (
    <div
      className={cn("min-h-screen relative pb-32", hasBg ? "text-white" : "text-[#0D0D0D]")}
      style={{ backgroundColor: customBgColor || (hasBg ? 'transparent' : '#F5F0E8') }}
    >
      {hasBg && (
         <div className="fixed inset-0 z-[-1]" style={{ backgroundImage: `url(${bgImageBlock.media_url})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
            <div className="absolute inset-0 bg-black/70" />
         </div>
      )}
      <Helmet>
        <title>{currentCaseStudy.title} – ŌDEY Archive</title>
        {googleFontUrl && <link href={googleFontUrl} rel="stylesheet" />}
      </Helmet>

      {/* Full-width cover hero */}
      {currentCaseStudy.cover_url && (
        <div className="w-full flex items-center justify-center overflow-hidden bg-[#0D0D0D]">
          <img
            src={currentCaseStudy.cover_url}
            alt={currentCaseStudy.title}
            className="w-full h-auto md:h-[min(100vh,900px)] object-contain md:object-cover block"
          />
        </div>
      )}

      {/* Case Study Header */}
      <div className="px-8 md:px-16 lg:px-24 pt-12 pb-6 flex flex-col items-center text-center">
        <div className="max-w-4xl space-y-4">
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.5em] font-black text-[#C94A2C]">
            {currentCaseStudy.portfolio_type === 'case_study' ? 'Diagnostic Protocol' : 'Exhibition Entry'}
          </span>
          <h1 
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95]" 
            style={{ 
              fontFamily: customTitleFont ? `"${customTitleFont}", sans-serif` : "var(--font-display)",
              letterSpacing: customTitleFont ? 'normal' : '-0.04em' 
            }}
          >
            {currentCaseStudy.title}
          </h1>
          {currentCaseStudy.tagline && (
            <p className={cn("text-sm md:text-lg lg:text-xl font-medium max-w-2xl mx-auto opacity-70", hasBg ? "text-white" : "text-[#0D0D0D]")}>
              {currentCaseStudy.tagline}
            </p>
          )}
        </div>
      </div>

      <main className="px-8 md:px-16 lg:px-24 overflow-visible">

        {/* Project Intelligence Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 py-8 md:py-10 border-t border-black/[0.03]">
            {/* Metadata Sidebar */}
            <aside className="space-y-8">
                <div className="space-y-8">
                    <div>
                        <h4 className="text-[8px] uppercase tracking-[0.4em] font-black text-[#C94A2C] mb-4 opacity-50">Intelligence_Data</h4>
                        <div className="grid grid-cols-2 gap-4">
                            {currentCaseStudy.client && (
                              <div>
                                  <p className="text-[7px] uppercase tracking-[0.3em] text-[#C94A2C] font-black mb-0.5 opacity-60">Entity</p>
                                  <p className="text-xs font-bold">{currentCaseStudy.client}</p>
                              </div>
                            )}
                            {currentCaseStudy.industry && (
                              <div>
                                  <p className="text-[7px] uppercase tracking-[0.3em] text-[#C94A2C] font-black mb-0.5 opacity-60">Industry</p>
                                  <p className="text-xs font-bold">{currentCaseStudy.industry}</p>
                              </div>
                            )}
                            {currentCaseStudy.location && (
                              <div>
                                  <p className="text-[7px] uppercase tracking-[0.3em] text-[#C94A2C] font-black mb-0.5 opacity-60">Location</p>
                                  <p className="text-xs font-bold">{currentCaseStudy.location}</p>
                              </div>
                            )}
                            {currentCaseStudy.year && (
                              <div>
                                  <p className="text-[7px] uppercase tracking-[0.3em] text-[#C94A2C] font-black mb-0.5 opacity-60">Timeline</p>
                                  <p className="text-xs font-bold">{currentCaseStudy.year}</p>
                              </div>
                            )}
                        </div>
                    </div>

                    {currentCaseStudy.our_role && (
                      <div className="pt-4 border-t border-black/5">
                           <h4 className="text-[7px] uppercase tracking-[0.4em] font-black text-[#C94A2C] mb-1.5 opacity-60">Strategic Role</h4>
                           <div className="text-[10px] font-bold opacity-50 whitespace-pre-wrap leading-relaxed max-w-sm">
                              {currentCaseStudy.our_role}
                           </div>
                      </div>
                    )}
                </div>
            </aside>
        </div>

        {/* Modular Sequence / Media Exhibition */}
        {displayBlocks.length > 0 ? (
          <section className="py-8 md:py-12 border-t border-black/[0.03] overflow-visible">
            <div className="max-w-5xl space-y-8 md:space-y-12 overflow-visible">
                {displayBlocks.map((block: any) => (
                   <div key={block.id} className="w-full">
                      {/* HEADING BLOCK */}
                      {block.type === 'heading' && (
                        <div className={cn(
                          "w-full flex",
                          (block.layout ?? 'left') === 'left' ? 'justify-start' : (block.layout ?? 'left') === 'right' ? 'justify-end' : 'justify-center'
                        )}>
                          {React.createElement(
                            block.level === 1 ? 'h1' : block.level === 2 ? 'h2' : 'h3',
                            {
                              className: cn(
                                "font-display font-black uppercase max-w-4xl leading-[0.95]",
                                block.level === 1 ? "text-3xl md:text-5xl lg:text-6xl" : 
                                block.level === 2 ? "text-2xl md:text-4xl lg:text-5xl" : 
                                "text-xl md:text-2xl",
                                (block.layout ?? 'left') === 'left' ? 'text-left' : (block.layout ?? 'left') === 'right' ? 'text-right' : 'text-center'
                              ),
                              style: { letterSpacing: '-0.04em' },
                              dangerouslySetInnerHTML: { __html: (block.content || '').replace(/\n/g, '<br/>') }
                            }
                          )}
                        </div>
                      )}
                      
                      {/* TEXT BLOCK */}
                      {block.type === 'text' && (
                        <div className={cn(
                          "w-full flex",
                          (block.layout ?? 'left') === 'left' ? 'justify-start' : (block.layout ?? 'left') === 'right' ? 'justify-end' : 'justify-center'
                        )}>
                          <p className={cn(
                            "text-base md:text-lg font-medium leading-relaxed max-w-2xl opacity-60",
                            (block.layout ?? 'left') === 'left' ? 'text-left' : (block.layout ?? 'left') === 'right' ? 'text-right' : 'text-center',
                            hasBg ? "text-white" : "text-[#0D0D0D]"
                          )}>
                              {block.content}
                          </p>
                        </div>
                      )}
                      
                      {/* IMAGE BLOCK */}
                      {block.type === 'image' && block.media_url && (
                        <div className={cn(
                          "w-full flex mb-6",
                          (block.layout ?? 'left') === 'left' ? 'justify-start' : (block.layout ?? 'left') === 'right' ? 'justify-end' : 'justify-center'
                        )}>
                          <div className={cn(
                            "flex flex-col gap-6",
                            (block.side_text && (block.size === 'small' || block.size === 'medium')) 
                              ? ((block.layout ?? 'left') === 'right' ? 'md:flex-row-reverse' : 'md:flex-row items-center')
                              : ((block.layout ?? 'left') === 'left' ? 'items-start' : (block.layout ?? 'left') === 'right' ? 'items-end' : 'items-center'),
                            block.size === 'small' ? 'md:max-w-[40%]' : 
                            block.size === 'medium' ? 'md:max-w-[70%]' : 'w-full'
                          )}>
                            <div className="w-full overflow-hidden shrink-0">
                               <img src={block.media_url} alt="Exhibit Media" className="w-full h-auto object-cover" loading="lazy" />
                            </div>
                            
                            {block.side_text && (block.size === 'small' || block.size === 'medium') && (
                               <div className="px-4">
                                  <p className={cn("text-[15px] font-medium leading-relaxed opacity-60", hasBg ? "text-white" : "text-[#0D0D0D] whitespace-pre-wrap")}>
                                     {block.side_text}
                                  </p>
                               </div>
                            )}
                          </div>
                        </div>
                      )}
                      {/* GALLERY BLOCK — horizontal automatic marquee */}
                      {block.type === 'gallery' && block.media_urls && block.media_urls.length > 0 && (
                        <div className="relative w-[100vw] left-[50%] -translate-x-[50%] overflow-hidden py-10">
                          <motion.div 
                            className="flex gap-4 px-0"
                            animate={{ x: ["0%", `-${100 / ([...block.media_urls, ...block.media_urls, ...block.media_urls].length / block.media_urls.length)}%`] }}
                            transition={{
                              duration: block.media_urls.length * 8,
                              ease: "linear",
                              repeat: Infinity,
                            }}
                          >
                            {[...block.media_urls, ...block.media_urls, ...block.media_urls].map((url: string, i: number) => (
                              <div
                                key={i}
                                className="shrink-0 overflow-hidden"
                                style={{ height: 'clamp(220px, 45vh, 480px)' }}
                              >
                                <img
                                  src={url}
                                  alt={`Gallery ${i}`}
                                  className="h-full w-auto object-cover block"
                                  loading="lazy"
                                  style={{ maxWidth: 'none' }}
                                />
                              </div>
                            ))}
                          </motion.div>
                        </div>
                      )}

                      {/* VIDEO BLOCK */}
                      {block.type === 'video' && block.media_url && (
                        <div className="w-full bg-[#0D0D0D] aspect-video overflow-hidden">
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
                      )}

                      {/* PDF BLOCK */}
                      {block.type === 'pdf' && block.pdf_url && (
                        <div className="max-w-3xl">
                          <div className="flex flex-col md:flex-row items-center justify-between border-t border-black/[0.06] py-8 gap-8 md:gap-12">
                            <div className="flex items-center gap-6 mb-0">
                              <div className="w-14 h-14 bg-[#C94A2C]/10 flex items-center justify-center shrink-0">
                                <Activity size={40} className="text-[#C94A2C]" />
                              </div>
                              <div className="text-left">
                                <span className="text-[12px] uppercase tracking-[0.4em] font-black text-black/30 block mb-2">Archived Document</span>
                                <h4 className="text-2xl md:text-3xl font-black text-[#0D0D0D] tracking-tight">{block.pdf_name || "Protocol Documentation"}</h4>
                              </div>
                            </div>
                            <a 
                              href={block.pdf_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="w-full md:w-auto px-8 py-4 bg-[#0D0D0D] text-white text-[11px] font-bold uppercase tracking-widest hover:bg-[#C94A2C] transition-colors text-center"
                            >
                              Download File
                            </a>
                          </div>
                        </div>
                      )}

                      {/* DIVIDER BLOCK */}
                      {block.type === 'divider' && (
                        <div className="max-w-2xl mx-auto h-px bg-black/10 my-16" />
                      )}
                   </div> 
                ))}
            </div>
          </section>
        ) : (
          <section className="py-24 border-t border-black/[0.03]">
               <PortfolioMediaDisplay
                  mediaFiles={(currentCaseStudy?.media || [])
                    .filter(m => !m.is_cover)
                    .map(media => ({
                      id: media.id,
                      url: media.url,
                      type: media.media_type as 'image' | 'video' | 'gif' | 'pdf',
                      name: media.file_name
                    }))}
                />
          </section>
        )}

      </main>

      {/* Protocol Actions Block */}
      <div className="bg-[#0D0D0D] py-32 px-6 flex flex-col items-center justify-center text-white relative mt-32">
          <div className="max-w-4xl text-center relative z-10 space-y-12">
            <h3 className="text-5xl md:text-8xl font-display font-black tracking-tighter leading-[0.95]">Architecting the <br /> Next Milestone?</h3>
            <div className="flex justify-center mt-12">
                <a href="/contact" className="bg-[#C94A2C] text-white px-16 py-6 rounded-xl text-[12px] font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-[#0D0D0D] transition-colors shadow-lg">Initiate Protocol</a>
            </div>
          </div>
      </div>

      <div className="fixed bottom-12 left-1/2 transform -translate-x-1/2 z-50">
        <ProjectInfoOverlay projectData={currentCaseStudy} />
      </div>

      <RedesignFooter />
    </div>
  );
}
