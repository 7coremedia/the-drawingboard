import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Bookmark, Plus, ChevronDown, Activity, UserPlay } from 'lucide-react';
import PortfolioActions from '@/components/portfolio/PortfolioActions';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useHeaderScroll } from '@/hooks/useHeaderScroll';
import { cn } from '@/lib/utils';

interface Partner {
  id: string;
  name: string;
  socialName: string;
  imageUrl?: string;
  socialLink?: string;
}

interface MultiplePartnersHeaderProps {
  title: string;
  brandName: string;
  partners: Partner[];
  slug: string;
}

export default function MultiplePartnersHeader({
  title,
  brandName,
  partners,
  slug,
}: MultiplePartnersHeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const isHidden = useHeaderScroll();

  return (
    <div className={cn(
      "w-full bg-white/80 border-b border-black/[0.05] py-5 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between shadow-sm sticky top-0 z-50 backdrop-blur-xl transition-all duration-500",
      isHidden ? "-translate-y-full" : "translate-y-0"
    )}>
      <div className="flex items-center gap-6">
        {/* Brand/Profile Info */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#F5F0E8] border border-black/5 flex-shrink-0 flex items-center justify-center overflow-hidden shadow-inner">
             <div className="w-4 h-4 bg-[#C94A2C] rounded-full opacity-20 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-black tracking-tighter text-[#0D0D0D] leading-none mb-1 uppercase">{brandName}</span>
            <div className="flex items-center gap-2">
                <span className="text-[8px] font-bold text-black/30 uppercase tracking-widest">Collab Protocol</span>
                <span className="text-[10px] font-bold text-[#C94A2C]">{partners.length}</span>
            </div>
          </div>
        </div>

        {/* Follow All Button with Dropdown */}
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="rounded-full border-black/10 px-6 h-8 text-[9px] font-black uppercase tracking-widest text-[#0D0D0D] hover:bg-[#C94A2C] hover:text-white hover:border-[#C94A2C] transition-all bg-transparent flex items-center gap-2"
            >
              <UserPlay className="w-3.5 h-3.5" />
              Engage Partners
              <ChevronDown className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-80 rounded-[2.5rem] border border-black/10 bg-white/95 text-[#0D0D0D] shadow-2xl animate-in fade-in-0 zoom-in-95 backdrop-blur-xl p-4 mt-4"
            sideOffset={8}
          >
            <div className="px-4 py-2 mb-4 border-b border-black/5">
                <span className="text-[8px] font-black uppercase tracking-widest text-black/20">Active Contributors</span>
            </div>
            {partners.map((partner) => (
              <DropdownMenuItem
                key={partner.id}
                className="flex items-center gap-4 p-3 hover:bg-[#F5F0E8] focus:bg-[#F5F0E8] rounded-2xl transition-all cursor-pointer"
                onClick={() => {
                  if (partner.socialLink) {
                    let url = partner.socialLink;
                    if (partner.socialName.toLowerCase().includes('instagram') || partner.socialName.toLowerCase().includes('ig')) {
                      if (!url.startsWith('http')) url = `https://instagram.com/${url.replace('@', '')}`;
                    } else if (partner.socialName.toLowerCase().includes('whatsapp')) {
                      if (!url.startsWith('http')) url = `https://wa.me/${url.replace(/\D/g, '')}`;
                    } else if (partner.socialName.toLowerCase().includes('twitter') || partner.socialName.toLowerCase().includes('x')) {
                      if (!url.startsWith('http')) url = `https://twitter.com/${url.replace('@', '')}`;
                    } else if (partner.socialName.toLowerCase().includes('linkedin')) {
                      if (!url.startsWith('http')) url = `https://linkedin.com/in/${url.replace('@', '')}`;
                    } else if (!url.startsWith('http')) url = `https://${url}`;
                    window.open(url, '_blank', 'noopener,noreferrer');
                  }
                }}
              >
                <div className="w-12 h-12 rounded-full border border-black/5 flex-shrink-0 flex items-center justify-center bg-gray-50 overflow-hidden">
                  {partner.imageUrl ? (
                    <img
                      src={partner.imageUrl}
                      alt={partner.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#F5F0E8] flex items-center justify-center">
                        <span className="text-[10px] font-black text-black/20">{partner.name.substring(0,2).toUpperCase()}</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="font-bold text-xs tracking-tighter uppercase">{partner.name}</span>
                  <span className="text-[10px] text-black/30 truncate">{partner.socialName}</span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex-1 text-center md:mx-12 mt-6 md:mt-0 overflow-hidden">
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
          <Bookmark className="w-3.5 h-3.5" /> Save
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
