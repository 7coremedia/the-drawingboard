import * as React from 'react';
import { useState } from 'react';
import PortfolioItem from '@/components/portfolio/PortfolioItem';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePublicPortfolio } from '@/hooks/usePublicPortfolio';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { AlertCircle, Layers, FolderArchive, Microscope } from 'lucide-react';

const FALLBACK_PREVIEW_ITEMS = [
  {
    title: 'National Gallery of Art',
    summary: 'Brand identity and experiential signage concepts for a cultural landmark.',
  },
  {
    title: 'Chatsworth',
    summary: 'Heritage campaign posters and storytelling visuals for a luxury estate.',
  },
  {
    title: 'Liberty',
    summary: 'Seasonal fashion creative exploring typography and editorial layouts.',
  },
  {
    title: 'Mastercard',
    summary: 'Digital-first motion frames highlighting simplicity and connectivity.',
  },
  {
    title: 'AfroHaus',
    summary: 'Immersive launch graphics inspired by African futurism.',
  },
  {
    title: 'Kora Studio',
    summary: 'Minimalist UI tiles and product visuals for a design collective.',
  },
];

export default function PortfolioGrid() {
  const { data: portfolioItems, isLoading, error } = usePublicPortfolio();
  const [tab, setTab] = useState<'portfolio' | 'case_studies' | 'research_docs' | 'collections'>('portfolio');

  const allItems = Array.isArray(portfolioItems)
    ? portfolioItems
      .filter((i) => i && i.title && i.category && i.cover_url && i.slug)
      .map((item) => ({
        title: String(item.title),
        category: String(item.category),
        imageUrl: String(item.cover_url),
        slug: String(item.slug),
        portfolio_type: String((item as any).portfolio_type || 'gallery'),
        summary: String((item as any).tagline || (item as any).short_description || item.category || 'Creative collaboration'),
        createdAt: item.created_at,
      }))
    : [];
  const caseStudyItems = allItems.filter((i) => i.portfolio_type === 'case_study');
  const collectionRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  const basePreviewItems = React.useMemo(() => {
    if (allItems.length > 0) {
      return allItems.map((item) => ({
        title: item.title,
        summary: item.summary || item.category || 'Creative collaboration',
      }));
    }
    return FALLBACK_PREVIEW_ITEMS;
  }, [allItems]);

  const placeholderCollections = React.useMemo(() => {
    const source = basePreviewItems.length > 0 ? basePreviewItems : FALLBACK_PREVIEW_ITEMS;
    const total = source.length;
    const itemsPerCollection = 10;

    const buildItems = (offset: number) =>
      Array.from({ length: itemsPerCollection }, (_, idx) => {
        const reference = source[(offset + idx) % total];
        return {
          title: reference.title,
          summary: reference.summary,
        };
      });

    const secondOffset = total > 5 ? 5 : Math.floor(total / 2);

    return [
      {
        title: 'Ad Posters',
        id: 'ad-posters',
        items: buildItems(0),
        icon: <Layers size={18} />
      },
      {
        title: 'Video Design',
        id: 'video-design',
        items: buildItems(secondOffset),
        icon: <FolderArchive size={18} />
      },
    ];
  }, [basePreviewItems]);

  const scrollCollection = (index: number, direction: 'prev' | 'next') => {
    const container = collectionRefs.current[index];
    if (!container) return;
    const scrollAmount = container.clientWidth * 0.8;
    const delta = direction === 'next' ? scrollAmount : -scrollAmount;
    container.scrollBy({ left: delta, behavior: 'smooth' });
  };

  const isRecent = (dateString?: string | null) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays <= 30 && diffDays >= 0;
  };

  if (isLoading) {
    return (
      <section className="container mx-auto py-32 px-6">
        <div className="flex flex-col items-center gap-6">
          <div className="w-12 h-12 border-2 border-[#C94A2C] border-t-transparent rounded-full animate-spin" />
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-black/40">Initiating Grid Protocol...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container mx-auto py-32 px-6 text-center">
        <div className="max-w-md mx-auto space-y-4">
            <AlertCircle size={32} className="mx-auto text-[#C94A2C]" />
            <h3 className="text-xl font-display font-black tracking-tighter">Connection Interrupted</h3>
            <p className="text-sm text-black/40">Diagnostic error while fetching exhibition assets. Please verify connection protocol.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full pb-32">
      <Tabs value={tab} onValueChange={(v) => setTab(v as any)} className="w-full">
        {/* EXHIBITION TAB SYSTEM */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <TabsList className="bg-black/[0.04] p-1 md:p-1 border border-black/[0.06] flex md:inline-flex h-auto w-full md:w-auto">
              <TabsTrigger
                value="portfolio"
                className="flex-1 md:flex-initial px-3 md:px-6 py-2 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] transition-all data-[state=active]:bg-[#0D0D0D] data-[state=active]:text-white"
              >
                Archive
              </TabsTrigger>
              <TabsTrigger
                value="case_studies"
                className="flex-1 md:flex-initial px-3 md:px-6 py-2 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] transition-all data-[state=active]:bg-[#0D0D0D] data-[state=active]:text-white"
              >
                Case Files
              </TabsTrigger>
              <TabsTrigger
                value="research_docs"
                className="flex-1 md:flex-initial px-3 md:px-6 py-2 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] transition-all data-[state=active]:bg-[#0D0D0D] data-[state=active]:text-white"
              >
                Research
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto border-t md:border-t-0 md:border-l border-black/[0.05] pt-4 md:pt-0 md:pl-6">
                <div className="flex lg:flex items-center gap-6">
                    <button className="text-[8px] md:text-[9px] uppercase tracking-widest font-black text-black/40 hover:text-[#C94A2C] transition-colors">Digital</button>
                    <button className="text-[8px] md:text-[9px] uppercase tracking-widest font-black text-black/40 hover:text-[#C94A2C] transition-colors">Physical</button>
                </div>
                <Button
                    variant="outline"
                    className={cn(
                    "border-black/10 px-6 py-2 h-auto text-[10px] uppercase font-bold tracking-widest transition-all",
                    tab === 'collections'
                        ? 'bg-[#C94A2C] text-white border-[#C94A2C]'
                        : 'bg-white hover:bg-black/5'
                    )}
                    onClick={() => setTab('collections')}
                >
                    Collections
                </Button>
            </div>
        </div>

        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {(tab === 'portfolio' || tab === 'case_studies') && (
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.1
                      }
                    }
                  }}
                >
                  {(tab === 'portfolio' ? allItems : caseStudyItems).map((item, index) => (
                    <motion.div
                      key={index}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                      }}
                    >
                      <PortfolioItem
                        title={item.title}
                        category={item.category}
                        imageUrl={item.imageUrl}
                        slug={item.slug}
                        isNew={isRecent(item.createdAt)}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {tab === 'research_docs' && (
                <div className="border border-black/[0.05] p-16 text-center bg-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#C94A2C]/5 blur-[100px] pointer-events-none" />
                  <div className="max-w-2xl mx-auto space-y-8 relative z-10">
                    <div className="w-16 h-16 bg-[#F5F0E8] border border-black/5 flex items-center justify-center mx-auto mb-8">
                        <Microscope size={28} className="text-[#C94A2C]" />
                    </div>
                    <h3 className="text-4xl font-display font-black tracking-tighter leading-none">Internal Protocol <br /> Under Stage 4 Audit</h3>
                    <p className="text-lg text-black/40 font-medium leading-relaxed">
                        Our research archives are currently undergoing clinical vetting. We are curating deep-perspective documentation of our category-shifting processes. Access granted soon.
                    </p>
                    <div className="pt-8 flex justify-center items-center gap-4 text-[9px] uppercase font-bold tracking-[0.4em] text-black/20">
                        <span>Lagos</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-black/5" />
                        <span>London</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-black/5" />
                        <span>Ready Q3</span>
                    </div>
                  </div>
                </div>
              )}

              {tab === 'collections' && (
                  <div className="space-y-16">
                  {placeholderCollections.map((collection, index) => (
                    <section key={collection.id} className="relative group">
                      <div className="flex items-center justify-between gap-4 mb-10 pb-6 border-b border-black/[0.03]">
                        <div className="flex items-center gap-4">
                            <div className="text-[#C94A2C]">{collection.icon}</div>
                            <h3 className="font-display text-4xl font-black text-[#0D0D0D] tracking-tighter">
                            {collection.title}
                            </h3>
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-black/20">
                          Archive Vol. 00{index + 1}
                        </span>
                      </div>

                      <div className="relative">
                        <div
                          ref={(el) => {
                            collectionRefs.current[index] = el;
                          }}
                          className="flex gap-8 overflow-x-auto overflow-y-visible pb-12 snap-x snap-mandatory scrollbar-hidden px-1"
                        >
                          {collection.items.map((item, itemIndex) => (
                            <div
                              key={`${collection.id}-${itemIndex}`}
                              className="relative z-10 flex-shrink-0 w-56 sm:w-72 snap-center"
                            >
                              <div className="group/item relative aspect-[3/4] flex flex-col justify-between transition-all">
                                <div className="space-y-4">
                                    <div className="w-8 h-8 bg-[#F5F0E8] border border-black/5 flex items-center justify-center">
                                        <span className="text-[8px] font-black text-[#C94A2C]">PRT</span>
                                    </div>
                                    <h4 className="text-2xl font-display font-black text-[#0D0D0D] tracking-tighter leading-tight">
                                        {item.title}
                                    </h4>
                                    <p className="text-sm text-black/40 leading-relaxed font-medium line-clamp-4">
                                        {item.summary}
                                    </p>
                                </div>
                                <div className="flex justify-between items-end pt-4 opacity-30">
                                    <span className="text-[7px] uppercase font-bold tracking-widest text-black">Asset Link Active</span>
                                    <div className="w-1.5 h-1.5 rounded-full bg-black shadow-[0_0_8px_rgba(0,0,0,0.1)]" />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-end gap-3 mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="w-10 h-10 border-black/10 bg-white hover:bg-[#0D0D0D] hover:text-white transition-all"
                            onClick={() => scrollCollection(index, 'prev')}
                          >
                            ←
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="w-10 h-10 border-black/10 bg-white hover:bg-[#0D0D0D] hover:text-white transition-all"
                            onClick={() => scrollCollection(index, 'next')}
                          >
                            →
                          </Button>
                        </div>
                      </div>
                    </section>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </Tabs>
    </section>
  );
}
