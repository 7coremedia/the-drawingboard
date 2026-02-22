import { Button } from '@/components/ui/button';
import { Bookmark, Plus } from 'lucide-react';
import PortfolioActions from '@/components/portfolio/PortfolioActions';
import { useHeaderScroll } from '@/hooks/useHeaderScroll';
import { cn } from '@/lib/utils';

interface SinglePartnerHeaderProps {
  title: string;
  partnerName: string;
  partnerType?: string; // e.g., "By KING"
  slug: string;
}

export default function SinglePartnerHeader({
  title,
  partnerName,
  partnerType = "By KING",
  slug,
}: SinglePartnerHeaderProps) {
  const isHidden = useHeaderScroll();

  return (
    <div className={cn(
      "w-full bg-black border-b border-white/10 py-4 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between shadow-sm sticky top-0 z-50 backdrop-blur-md bg-black/90 transition-transform duration-300",
      isHidden ? "-translate-y-full" : "translate-y-0"
    )}>
      <div className="flex items-center gap-4">
        {/* Partner/Profile Info */}
        <div className="flex items-center gap-2">
          {/* Placeholder for partner avatar */}
          <div className="w-8 h-8 rounded-full bg-white/10 flex-shrink-0"></div>
          <div className="flex flex-col text-sm">
            <span className="font-medium text-white">{partnerName}</span>
            <span className="text-gray-400">{partnerType}</span>
          </div>
        </div>

        {/* Simple Follow Button */}
        <Button
          variant="outline"
          className="border border-white/20 px-3 py-1.5 text-xs text-white hover:bg-white/10 flex items-center gap-1 bg-transparent transition-colors"
        >
          <Plus className="w-3 h-3" />
          Follow
        </Button>
      </div>

      {/* Action buttons on the right */}
      <div className="flex items-center gap-2 mt-4 md:mt-0">
        <Button variant="outline" size="sm" className="flex items-center gap-1 border border-white/20 px-3 py-1.5 text-xs text-white hover:bg-white/10 bg-transparent transition-colors">
          <Bookmark className="w-3 h-3" /> Save
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
