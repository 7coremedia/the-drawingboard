import * as React from 'react';
import { usePublicPortfolio } from '@/hooks/usePublicPortfolio';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function FeaturedWorksCarousel() {
  const { data: portfolioItems, isLoading } = usePublicPortfolio();
  
  const allItems = React.useMemo(() => {
    if (!Array.isArray(portfolioItems)) return [];
    
    // Sort logic to move requested slugs to the front
    const requestedSlugs = ['increasing-sales-through-website', 'luxury-that-makes-you-aspire!--branding'];
    
    const baseItems = portfolioItems.map((item) => ({
      title: String(item.title),
      category: String(item.category || 'Strategic Framework'),
      imageUrl: String(item.cover_url || '/placeholder.svg'),
      slug: String(item.slug),
      summary: String((item as any).tagline || (item as any).short_description || 'High-performance identity execution.'),
    }));

    // Find requested items
    const priorityItems = requestedSlugs
      .map(slug => baseItems.find(item => item.slug === slug))
      .filter(Boolean) as any[];

    // Remaining items (non-duplicates)
    const remainingItems = baseItems.filter(item => !requestedSlugs.includes(item.slug));

    return [...priorityItems, ...remainingItems].slice(0, 6);
  }, [portfolioItems]);

  const mockItems = [
    { title: 'Increasing Sales', category: 'Growth Strategy', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80', slug: 'increasing-sales-through-website', summary: 'Conversion framework.' },
    { title: 'Luxury Identity', category: 'Luxury Narrative', imageUrl: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80', slug: 'luxury-that-makes-you-aspire!--branding', summary: 'Aspirational positioning.' },
    { title: 'Global Structure', category: 'Spatial Experience', imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80', slug: 'structure', summary: 'Environmental storytelling.' }
  ];

  const displayItems = allItems.length > 0 ? allItems : mockItems;

  return (
    <div className="w-full bg-[#3D2C1F] rounded-[2rem] md:rounded-[3rem] pt-12 md:pt-20 pb-8 md:pb-16 relative overflow-hidden text-[#F5F0E8] shadow-2xl">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C9A66B]/15 blur-[120px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3" />
      
      {/* Intro Copy block */}
      <div className="relative z-10 max-w-3xl px-6 md:px-16 mb-16 md:mb-24">
          <h2 className="text-[28px] sm:text-3xl md:text-5xl lg:text-[56px] font-display font-medium tracking-[-0.06em] leading-[0.9] mb-8">
            Brands built here. Results felt <span className="text-[#C9A66B]">everywhere.</span>
          </h2>
          <Link 
              to="/contact" 
              className="inline-flex items-center justify-center bg-[#F4D9A9] text-[#3D2C1F] font-bold text-sm md:text-base px-8 py-3.5 rounded-full hover:bg-white hover:scale-105 transition-all shadow-xl shadow-black/10"
          >
               Work with us
          </Link>
      </div>

      <div className="mb-6 px-6 md:px-16 relative z-10">
        <h3 className="text-xl md:text-3xl lg:text-4xl font-display font-bold tracking-tighter text-white/90 leading-tight">
          Selected ventures & case studies
        </h3>
      </div>

      {/* The Carousel */}
      <div className="relative z-10 flex overflow-x-auto gap-4 md:gap-6 pb-6 -mx-0 px-6 md:px-16 snap-x snap-mandatory scrollbar-hidden">
        {displayItems.map((item, index) => (
          <Link 
            key={index} 
            to={`/portfolio/${item.slug}`}
            className="block flex-shrink-0 w-[65vw] sm:w-[45vw] md:w-[600px] aspect-[3/4] md:aspect-video snap-center group relative rounded-[2.5rem] overflow-hidden isolate transform-gpu will-change-transform bg-[#D9C5B2] shadow-md hover:shadow-xl transition-shadow"
          >
            {/* The Portfolio Image (Full bleed underneath) */}
            <img src={item.imageUrl} alt={item.title} className="absolute inset-0 w-full h-full object-cover rounded-[2.5rem] z-0 scale-100 group-hover:scale-105 transition-transform duration-1000" />

            {/* Top Premium Blur Area (Dark Frosted Glass) */}
            <div className="absolute top-0 inset-x-0 h-[40%] bg-[#0D0D0D]/40 backdrop-blur-3xl z-10 rounded-t-[2.5rem] [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)] flex items-start p-5 md:p-8">
                <div className="flex justify-between w-full items-start">
                    <span className="bg-[#F4D9A9] text-[#3D2C1F] text-[9px] md:text-[11px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">New</span>
                    
                    {/* FDA-style Certification Stamp */}
                    <div className="hidden md:block w-16 h-16 text-white/40 relative group-hover:rotate-90 transition-transform duration-[2s] ease-linear">
                        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                            <path id="curveText" d="M 50 10 A 40 40 0 1 1 49.9 10" fill="transparent"/>
                            <text fontSize="10" fill="currentColor" fontWeight="bold" letterSpacing="4" className="uppercase opacity-80">
                            <textPath href="#curveText" startOffset="0%">CERTIFIED · PROTOCOL ·</textPath>
                            </text>
                            <circle cx="50" cy="50" r="22" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="opacity-50" />
                            <text x="50" y="54" fontSize="13" fill="currentColor" textAnchor="middle" fontWeight="black" className="font-display">ŌDEY</text>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Bottom Premium Blur Area (Dark Frosted Glass) */}
            <div className="absolute bottom-0 inset-x-0 h-[50%] md:h-[45%] bg-[#0D0D0D]/60 backdrop-blur-3xl z-10 rounded-b-[2.5rem] [mask-image:linear-gradient(to_top,black_50%,transparent_100%)] flex flex-col justify-end p-6 md:p-10">
                {/* SMALLEST — micro label */}
                <p className="text-[7px] md:text-[9px] uppercase font-black tracking-[0.25em] text-[#F4D9A9]/80 mb-1.5">
                  {item.category} · System
                </p>
                {/* BIG — dominant project title */}
                <h4 className="font-display font-black text-[18px] md:text-[24px] lg:text-[28px] tracking-[-0.08em] leading-[0.9] text-white mb-3">
                  {item.title}
                </h4>
                {/* SMALL — project-related descriptor */}
                <p className="text-[9px] md:text-[11px] font-bold uppercase tracking-widest text-white/30">
                  Case Study
                </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
