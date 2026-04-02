import { Button } from '@/components/ui/button';
import { Bookmark, Plus, Activity } from 'lucide-react';
import PortfolioActions from '@/components/portfolio/PortfolioActions';
import { useHeaderScroll } from '@/hooks/useHeaderScroll';
import { cn } from '@/lib/utils';

interface CaseStudyHeaderProps {
  title: string;
  owner: string;
  slug: string;
}

export default function CaseStudyHeader({
  title,
  owner,
  slug,
}: CaseStudyHeaderProps) {
  const isHidden = useHeaderScroll();

  return (
    <div className={cn(
      "w-full bg-white/80 border-b border-black/[0.05] py-5 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between shadow-sm sticky top-0 z-50 backdrop-blur-xl transition-all duration-500",
      isHidden ? "-translate-y-full" : "translate-y-0"
    )}>
      <div className="flex items-center gap-6">
        {/* Owner/Profile Info */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#F5F0E8] border border-black/5 flex-shrink-0 flex items-center justify-center overflow-hidden shadow-inner">
             {/* Dynamic placeholder for clinical look */}
             <div className="w-4 h-4 bg-[#C94A2C] rounded-full opacity-20 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-black tracking-tighter text-[#0D0D0D] leading-none mb-1 uppercase">{owner}</span>
            <div className="flex items-center gap-2">
                <span className="text-[8px] font-bold text-black/30 uppercase tracking-widest">Clinical Lead</span>
                <Activity size={8} className="text-[#C94A2C]" />
            </div>
          </div>
        </div>
        <Button 
            variant="outline" 
            className="rounded-full border-black/10 px-6 h-8 text-[9px] font-black uppercase tracking-widest text-[#0D0D0D] hover:bg-[#C94A2C] hover:text-white hover:border-[#C94A2C] transition-all bg-transparent"
        >
          <Plus className="w-3 h-3 mr-2" /> Follow
        </Button>
      </div>

      <div className="flex-1 text-center md:mx-12 mt-4 md:mt-0 overflow-hidden">
        <h1 className="text-sm md:text-lg font-display font-black tracking-tighter text-[#0D0D0D] truncate uppercase">
            Protocol_{slug.substring(0,6).toUpperCase()} // {title}
        </h1>
      </div>

      <div className="flex items-center gap-4 mt-6 md:mt-0">
        <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2 rounded-full border-black/10 px-6 h-10 text-[9px] font-black uppercase tracking-widest text-[#0D0D0D] hover:bg-black hover:text-white transition-all bg-transparent"
        >
          <Bookmark className="w-3.5 h-3.5" /> Save to Archive
        </Button>
        <PortfolioActions
          title={title}
          slug={slug}
          variant="header"
        />
      </div>
    </div>
  );
}
