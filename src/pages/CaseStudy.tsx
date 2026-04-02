import React from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import { usePublicPortfolioItem, usePublicPortfolio } from "@/hooks/usePublicPortfolio";
import CaseStudyHeader from "@/components/case-study/CaseStudyHeader";
import MultiplePartnersHeader from "@/components/case-study/MultiplePartnersHeader";
import SinglePartnerHeader from "@/components/case-study/SinglePartnerHeader";
import PortfolioMediaDisplay from "@/components/portfolio/PortfolioMediaDisplay";
import PortfolioItem from "@/components/portfolio/PortfolioItem";
import ProjectInfoOverlay from "@/components/smart-blocks/ProjectInfoOverlay";
import PortfolioActions from "@/components/portfolio/PortfolioActions";
import RedesignFooter from "@/components/redesign/RedesignFooter";
import { cn } from '@/lib/utils';
import { Activity, ShieldCheck, Microscope } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#0D0D0D] pt-24 md:pt-40">
      <Helmet>
        <title>{currentCaseStudy.title} – KŌDĒ Exhibition Archive</title>
        <meta name="description" content={currentCaseStudy.tagline} />
        <link rel="canonical" href={`/portfolio/${slug}`} />
      </Helmet>

      {/* Case Study Header Section */}
      <div className="container mx-auto px-6 mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div className="max-w-4xl space-y-8">
                <div className="flex items-center gap-4">
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#C94A2C]">Exhibition Entry</span>
                    <div className="h-px w-12 bg-black/5" />
                </div>
                <h1 className="font-display text-5xl md:text-8xl font-black tracking-tighter leading-[0.95]">
                    {currentCaseStudy.title}
                </h1>
                <p className="text-[#0D0D0D]/60 text-lg md:text-2xl font-medium leading-relaxed">
                    {currentCaseStudy.tagline || "Comprehensive brand architecture and identity systems designed for undisputed market authority."}
                </p>
            </div>
            
            <div className="hidden lg:block">
                <div className="w-24 h-24 rounded-[2.5rem] bg-white border border-black/5 flex items-center justify-center shadow-lg">
                    <ShieldCheck size={32} className="text-[#C94A2C]" />
                </div>
            </div>
          </div>
      </div>

      <main className="container mx-auto px-6">
        {/* Cover Display */}
        {currentCaseStudy.cover_url && (
            <div className="relative mb-24 group">
                 <div className="absolute top-8 left-8 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="bg-white/90 backdrop-blur-md text-[8px] font-black uppercase tracking-[0.4em] px-4 py-2 rounded-full shadow-lg border border-black/5">Archival Frame_01</span>
                </div>
                <div className="overflow-hidden rounded-[3rem] md:rounded-[4.5rem] bg-white border border-black/[0.03] shadow-2xl">
                    <img
                        src={currentCaseStudy.cover_url}
                        alt={`${currentCaseStudy.title}`}
                        className="w-full h-auto object-cover"
                    />
                </div>
            </div>
        )}

        {/* Project Intelligence Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-20 py-24 border-t border-black/[0.03]">
            {/* Metadata Sidebar */}
            <aside className="space-y-16">
                <div className="space-y-12 bg-white/40 p-10 rounded-[2.5rem] border border-black/5">
                    <div>
                        <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-[#C94A2C] mb-4">Diagnostic Context</h4>
                        <div className="space-y-8">
                            <div>
                                <p className="text-[8px] uppercase tracking-widest text-black/20 font-bold mb-1">Entity</p>
                                <p className="text-xl font-bold">{currentCaseStudy.client || "Confidential Client"}</p>
                            </div>
                            <div>
                                <p className="text-[8px] uppercase tracking-widest text-black/20 font-bold mb-1">Industry</p>
                                <p className="text-xl font-bold">{currentCaseStudy.industry || "Market Leader"}</p>
                            </div>
                            <div>
                                <p className="text-[8px] uppercase tracking-widest text-black/20 font-bold mb-1">Metric_02</p>
                                <p className="text-xl font-bold">{currentCaseStudy.year || "2026 Archive"}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="pt-8 border-t border-black/5">
                         <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-black/20 mb-4">Strategic Role</h4>
                         <ul className="space-y-3">
                            {roleItems.map(role => (
                                <li key={role} className="flex items-center gap-3 text-sm font-bold opacity-60">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#C94A2C]" />
                                    {role}
                                </li>
                            ))}
                         </ul>
                    </div>
                </div>

                <div className="flex items-center gap-3 text-[#C94A2C]/40 px-10">
                    <Activity size={16} />
                    <span className="text-[9px] font-black uppercase tracking-[0.3em]">Protocol Verified</span>
                </div>
            </aside>

            {/* Content Logic */}
            <div className="space-y-24">
                {challengeParagraphs.length > 0 && (
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                        <h3 className="font-display text-2xl font-black uppercase tracking-tighter text-[#0D0D0D]">The Challenge</h3>
                        <div className="h-px flex-grow bg-black/[0.03]" />
                    </div>
                    {challengeParagraphs.map((paragraph, index) => (
                      <p key={`challenge-${index}`} className="text-xl md:text-2xl font-medium text-[#0D0D0D]/60 leading-relaxed max-w-4xl">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}

                {solutionParagraphs.length > 0 && (
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                        <h3 className="font-display text-2xl font-black uppercase tracking-tighter text-[#0D0D0D]">The Solution</h3>
                        <div className="h-px flex-grow bg-black/[0.03]" />
                    </div>
                    {solutionParagraphs.map((paragraph, index) => (
                      <p key={`solution-${index}`} className="text-xl md:text-2xl font-medium text-[#0D0D0D]/60 leading-relaxed max-w-4xl">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
            </div>
        </div>

        {/* Modular Sequence / Media Exhibition */}
        {currentCaseStudy.content_blocks && (currentCaseStudy.content_blocks as any[]).length > 0 ? (
          <section className="py-24 border-t border-black/[0.03]">
            <div className="max-w-7xl mx-auto space-y-16 lg:space-y-32">
                {(currentCaseStudy.content_blocks as any[]).map((block: any) => (
                   <div key={block.id} className="w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
                      {block.type === 'heading' && (
                        <h2 className="text-3xl md:text-5xl lg:text-7xl font-display font-black tracking-tighter uppercase max-w-5xl leading-[0.95]" dangerouslySetInnerHTML={{ __html: (block.content || '').replace(/\n/g, '<br/>') }} />
                      )}
                      
                      {block.type === 'text' && (
                        <p className="text-xl md:text-3xl font-medium text-[#0D0D0D]/60 leading-relaxed max-w-4xl whitespace-pre-wrap">
                            {block.content}
                        </p>
                      )}
                      
                      {block.type === 'image' && block.media_url && (
                        <div className={cn(
                          "overflow-hidden rounded-[2rem] md:rounded-[4rem] shadow-2xl border border-black/5", 
                          block.style === 'full' ? 'w-full' : block.style === 'inset' ? 'max-w-3xl mx-auto' : 'w-full max-w-6xl'
                        )}>
                          <img src={block.media_url} alt="Exhibit Media" className="w-full h-auto object-cover" />
                        </div>
                      )}
                      
                      {block.type === 'gallery' && block.media_urls && block.media_urls.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
                          {block.media_urls.map((url: string, i: number) => (
                            <div key={i} className="aspect-square rounded-[2rem] overflow-hidden shadow-lg border border-black/5 group cursor-pointer">
                              <img src={url} alt={`Gallery ${i}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>
                          ))}
                        </div>
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

        {/* Archival Tags */}
        <section className="py-24 border-t border-black/[0.03]">
            <div className="flex flex-wrap gap-4 items-center mb-32">
                <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-black/20 mr-4">Tags:</span>
                {projectTags.map((tag) => (
                    <span
                        key={tag}
                        className="rounded-full bg-white border border-black/5 px-8 py-3 text-[9px] font-bold uppercase tracking-widest text-[#0D0D0D] transition-all hover:bg-[#C94A2C] hover:text-white hover:shadow-xl"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Cross-Reference Section */}
            {relatedCaseStudies.length > 0 && (
                <div className="pb-40">
                    <div className="flex items-end justify-between mb-16 border-b border-black/[0.03] pb-10">
                        <h2 className="font-display text-4xl md:text-6xl font-black tracking-tighter leading-none">Diagnostic <br /> Cross-Reference</h2>
                        <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-black/20">Related Protocols</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
                        {relatedCaseStudies.map((item, index) => (
                            <PortfolioItem
                                key={index}
                                title={item.title}
                                category={item.category}
                                imageUrl={item.cover_url}
                                slug={item.slug}
                            />
                        ))}
                    </div>
                </div>
            )}
        </section>
      </main>

      {/* Protocol Actions Block */}
      <div className="bg-[#0D0D0D] py-32 px-6 flex flex-col items-center justify-center text-white relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#C94A2C]/20 to-transparent pointer-events-none" />
          <div className="max-w-4xl text-center relative z-10 space-y-12">
            <h3 className="text-4xl md:text-7xl font-display font-black tracking-tighter leading-[0.95]">Architecting the <br /> Next Milestone?</h3>
            <div className="flex flex-wrap justify-center gap-6">
                <a href="/contact" className="bg-[#C94A2C] text-white px-12 py-5 rounded-full text-[11px] font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">Initiate Protocol</a>
                <a href="/portfolio" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-12 py-5 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-white/20 transition-all">Back to Archive</a>
            </div>
          </div>
          
          <div className="absolute bottom-10 left-10 opacity-10 group-hover:scale-110 transition-transform duration-1000">
             <Microscope size={120} className="text-white" />
          </div>
      </div>

      <div className="fixed bottom-12 left-1/2 transform -translate-x-1/2 z-50">
        <ProjectInfoOverlay projectData={currentCaseStudy} />
      </div>

      <RedesignFooter />
    </div>
  );
}
