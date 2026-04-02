import * as React from 'react';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PortfolioItemProps {
  title: string;
  category: string;
  imageUrl: string;
  slug: string;
}

export default function PortfolioItem({
  title,
  category,
  imageUrl,
  slug,
}: PortfolioItemProps) {
  const [loaded, setLoaded] = React.useState(false);

  return (
    <Link
      to={`/portfolio/${slug}`}
      className="relative group block select-none focus:outline-none rounded-[2rem] overflow-hidden"
    >
      {/* Landscape Media container with rounded corners */}
      <div className="relative w-full aspect-[1.5/1] bg-black/[0.03] rounded-[2rem] overflow-hidden transition-all duration-700 group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] group-hover:-translate-y-2">
        {/* Skeleton */}
        <div
          className={cn(
            "absolute inset-0 animate-pulse bg-black/[0.02]",
            loaded && "hidden"
          )}
        />
        <img
          src={imageUrl}
          alt={title}
          className={cn(
            "block w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-105",
            loaded ? "opacity-100" : "opacity-0"
          )}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          draggable={false}
        />
        
        {/* Clinical Interface Overlay (Visible on Hover) */}
        <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="flex justify-end">
                <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#0D0D0D] shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <ArrowUpRight size={20} />
                </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-[1.5rem] border border-white/20 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700 shadow-lg inline-block w-max self-start">
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-[8px] font-black uppercase tracking-[0.4em] text-[#C94A2C]">Vault Entry</span>
                    <div className="h-px w-8 bg-[#C94A2C]/20" />
                </div>
                <h3 className="text-xl font-display font-black tracking-tighter text-[#0D0D0D]">Archive_{slug.substring(0,4).toUpperCase()}</h3>
            </div>
        </div>
      </div>
      
      <div className="mt-6 px-4 pb-4">
        <div className="flex flex-col gap-1 text-left">
            <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-black/20">{category}</span>
            <h3 className="font-display text-2xl md:text-3xl font-black tracking-tighter leading-none text-[#0D0D0D]">{title}</h3>
        </div>
      </div>
    </Link>
  );
}
