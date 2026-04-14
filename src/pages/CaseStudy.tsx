import React from "react";
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

  const projectTags = [
    currentCaseStudy.category,
    currentCaseStudy.client || "Client Work",
    currentCaseStudy.industry || "Design System",
  ];

  const roleItems = (currentCaseStudy.our_role || "")
    .split(/\r?\n|•|,/)
    .map((entry) => entry.trim())
    .filter(Boolean);

  const challengeParagraphs = (currentCaseStudy.the_challenge || "")
    .split(/\n+/)
    .map((entry) => entry.trim())
    .filter(Boolean);

  const solutionParagraphs = (currentCaseStudy.the_solution || "")
    .split(/\n+/)
    .map((entry) => entry.trim())
    .filter(Boolean);

  const growthParagraphs = (currentCaseStudy.description || "")
    .split(/\n+/)
    .map((entry) => entry.trim())
    .filter(Boolean);

  const blocks: any[] = currentCaseStudy?.content_blocks ? (currentCaseStudy.content_blocks as any[]) : [];
  const displayBlocks = blocks.filter(b => b.type !== 'meta_background');
  const bgBlock = blocks.find(b => b.type === 'meta_background');
  const hasBg = !!bgBlock?.media_url;

  return (
    <div className={cn("min-h-screen relative pt-24 md:pt-40 pb-32", hasBg ? "text-white" : "bg-[#F5F0E8] text-[#0D0D0D]")}>
      {hasBg && (
         <div className="fixed inset-0 z-[-1]" style={{ backgroundImage: `url(${bgBlock.media_url})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
            <div className="absolute inset-0 bg-black/70" />
         </div>
      )}
      <Helmet>
        <title>{currentCaseStudy.title} – ŌDEY Archive</title>
      </Helmet>

      {/* Case Study Header & Cover Section */}
      <div className="container mx-auto px-0 md:px-6 mb-12 md:mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-12">
            
            <div className="max-w-3xl space-y-4 px-6 md:px-0 order-1">
                <div className="flex items-center gap-3 pt-6 md:pt-0">
                    <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-[#C94A2C]">
                      {currentCaseStudy.portfolio_type === 'case_study' ? 'Diagnostic Protocol' : 'Exhibition Entry'}
                    </span>
                    <div className="h-px w-8 bg-black/5" />
                </div>
                <h1 className="font-display text-4xl md:text-6xl font-black leading-[0.95]" style={{ letterSpacing: '-0.04em' }}>
                    {currentCaseStudy.title}
                </h1>
                {currentCaseStudy.tagline && (
                  <p className={cn("text-sm md:text-base font-medium leading-relaxed", hasBg ? "text-white/60" : "text-[#0D0D0D]/50")}>
                      {currentCaseStudy.tagline}
                  </p>
                )}
            </div>

            {currentCaseStudy.cover_url && (
                <div className="hidden md:block w-full md:w-[340px] lg:w-[400px] xl:w-[440px] shrink-0 order-2 aspect-[202/158] overflow-hidden rounded-2xl bg-black/5 shadow-xl md:mr-4 lg:mr-8 transition-transform hover:scale-[1.02]">
                    <img
                        src={currentCaseStudy.cover_url}
                        alt={`${currentCaseStudy.title}`}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}
          </div>
      </div>

      <main className="container mx-auto px-6 overflow-visible">

        {/* Project Intelligence Grid (Always visible if fields exist) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 py-10 md:py-14 border-t border-black/[0.03]">
            {/* Metadata Sidebar */}
            <aside className="space-y-12">
                <div className="space-y-12">
                    <div>
                        <h4 className="text-[9px] uppercase tracking-[0.4em] font-black text-[#C94A2C] mb-5">Metadata</h4>
                        <div className="grid grid-cols-2 gap-5">
                            {currentCaseStudy.client && (
                              <div>
                                  <p className="text-[8px] uppercase tracking-widest text-[#C94A2C] font-bold mb-0.5">Entity</p>
                                  <p className="text-sm font-bold">{currentCaseStudy.client}</p>
                              </div>
                            )}
                            {currentCaseStudy.industry && (
                              <div>
                                  <p className="text-[8px] uppercase tracking-widest text-[#C94A2C] font-bold mb-0.5">Industry</p>
                                  <p className="text-sm font-bold">{currentCaseStudy.industry}</p>
                              </div>
                            )}
                            {currentCaseStudy.location && (
                              <div>
                                  <p className="text-[8px] uppercase tracking-widest text-[#C94A2C] font-bold mb-0.5">Location</p>
                                  <p className="text-sm font-bold">{currentCaseStudy.location}</p>
                              </div>
                            )}
                            {currentCaseStudy.year && (
                              <div>
                                  <p className="text-[8px] uppercase tracking-widest text-[#C94A2C] font-bold mb-0.5">Timeline</p>
                                  <p className="text-sm font-bold">{currentCaseStudy.year}</p>
                              </div>
                            )}
                        </div>
                    </div>
                    
                    {currentCaseStudy.our_role && (
                      <div className="pt-5 border-t border-black/5">
                           <h4 className="text-[9px] uppercase tracking-[0.4em] font-black text-[#C94A2C] mb-2">Strategic Role</h4>
                           <div className="text-xs font-bold opacity-70 whitespace-pre-wrap leading-relaxed">
                              {currentCaseStudy.our_role}
                           </div>
                      </div>
                    )}
                </div>
            </aside>
        </div>

        {/* Modular Sequence / Media Exhibition */}
        {displayBlocks.length > 0 ? (
          <section className="py-12 md:py-16 border-t border-black/[0.03] overflow-visible">
            <div className="max-w-7xl mx-auto space-y-12 md:space-y-16 overflow-visible">
                {displayBlocks.map((block: any) => (
                   <div key={block.id} className="w-full">
                      {/* HEADING BLOCK */}
                      {block.type === 'heading' && (
                        <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-black uppercase max-w-4xl leading-[0.95]" style={{ letterSpacing: '-0.04em' }} dangerouslySetInnerHTML={{ __html: (block.content || '').replace(/\n/g, '<br/>') }} />
                      )}
                      
                      {/* TEXT BLOCK */}
                      {block.type === 'text' && (
                        <p className={cn("text-base md:text-xl font-medium leading-relaxed max-w-3xl", hasBg ? "text-white/70" : "text-[#0D0D0D]/55")}>
                            {block.content}
                        </p>
                      )}
                      
                      {/* IMAGE BLOCK */}
                      {block.type === 'image' && block.media_url && (
                        <div className={cn(
                          "w-full flex",
                          block.layout === 'left' ? 'justify-start' : block.layout === 'right' ? 'justify-end' : 'justify-center'
                        )}>
                          <div className={cn(
                            "flex flex-col gap-8 w-full",
                            (block.side_text && (block.size === 'small' || block.size === 'medium')) 
                              ? (block.layout === 'right' ? 'md:flex-row-reverse' : 'md:flex-row items-center')
                              : "items-center"
                          )}>
                            <div className={cn(
                              "overflow-hidden shrink-0 shadow-xl border bg-white", 
                              hasBg ? "border-white/10" : "border-black/5",
                              block.size === 'small' ? 'w-full md:max-w-md rounded-lg md:rounded-xl' : 
                              block.size === 'medium' ? 'w-full md:max-w-3xl rounded-xl md:rounded-2xl' : 'w-full max-w-6xl rounded-xl md:rounded-2xl'
                            )}>
                              <img src={block.media_url} alt="Exhibit Media" className="w-full h-auto object-cover" loading="lazy" />
                            </div>
                            
                            {block.side_text && (block.size === 'small' || block.size === 'medium') && (
                               <div className="flex-1 px-4 lg:px-12">
                                  <p className={cn("text-lg md:text-xl font-medium leading-relaxed", hasBg ? "text-white/70" : "text-[#0D0D0D]/60 whitespace-pre-wrap")}>
                                     {block.side_text}
                                  </p>
                               </div>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {/* GALLERY BLOCK — horizontal scroll strip */}
                      {block.type === 'gallery' && block.media_urls && block.media_urls.length > 0 && (
                        <div className="relative w-screen left-1/2 -translate-x-1/2">
                          <div className="flex gap-3 overflow-x-auto px-6 md:px-12 pb-4 snap-x snap-mandatory scrollbar-hide">
                            {block.media_urls.map((url: string, i: number) => (
                              <div
                                key={i}
                                className="shrink-0 snap-start overflow-hidden rounded-lg md:rounded-xl"
                                style={{ height: '260px' }}
                              >
                                <img
                                  src={url}
                                  alt={`Gallery ${i}`}
                                  className="h-full w-auto object-cover hover:scale-[1.03] transition-transform duration-700"
                                  loading="lazy"
                                  style={{ maxWidth: 'none' }}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* VIDEO BLOCK */}
                      {block.type === 'video' && block.media_url && (
                        <div className="max-w-6xl mx-auto overflow-hidden rounded-[2rem] shadow-2xl bg-[#0D0D0D] border border-black/10 aspect-video">
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
                        <div className="max-w-4xl mx-auto">
                          <div className="flex flex-col md:flex-row items-center justify-between bg-white rounded-[2rem] p-10 border border-black/5 shadow-xl transition-all hover:-translate-y-2 hover:shadow-2xl">
                            <div className="flex items-center gap-8 mb-8 md:mb-0">
                              <div className="w-20 h-20 bg-[#C94A2C]/10 rounded-2xl flex items-center justify-center shrink-0">
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
                              className="w-full md:w-auto px-12 py-6 bg-[#0D0D0D] text-white rounded-full text-[12px] font-bold uppercase tracking-widest hover:bg-[#C94A2C] transition-colors text-center"
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
                <a href="/contact" className="bg-[#C94A2C] text-white px-16 py-6 rounded-full text-[12px] font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-[#0D0D0D] transition-colors">Initiate Protocol</a>
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
