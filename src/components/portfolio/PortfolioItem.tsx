import * as React from 'react';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PortfolioItemProps {
  title: string;
  category: string;
  imageUrl: string;
  slug: string;
  isNew?: boolean;
}

export default function PortfolioItem({
  title,
  category,
  imageUrl,
  slug,
  isNew,
}: PortfolioItemProps) {
  const [loaded, setLoaded] = React.useState(false);

  return (
    <Link
      to={`/portfolio/${slug}`}
      className="relative group block select-none focus:outline-none overflow-hidden"
    >
      {/* Landscape Media container */}
      <div className="relative w-full aspect-video overflow-hidden rounded-[1rem] transition-all duration-700">
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
        <div className="absolute inset-0 p-8 flex flex-col justify-end pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="flex justify-end absolute top-8 right-8">
                <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#0D0D0D] shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <ArrowUpRight size={18} />
                </div>
            </div>
        </div>
      </div>
      
      <div className="mt-3 px-0 pb-2">
        <div className="flex flex-col gap-1 text-left">
            <div className="flex justify-between items-center">
                <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-black/40">{category}</span>
                {isNew && (
                    <span className="bg-[#C94A2C] text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest leading-none">New</span>
                )}
            </div>
            <h3 className="font-display text-lg md:text-xl font-black tracking-tight leading-tight text-[#0D0D0D] uppercase">{title}</h3>
        </div>
      </div>
    </Link>
  );
}
