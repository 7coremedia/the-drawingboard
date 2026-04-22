import { type ProjectDetails } from "@/components/smart-blocks/ProjectInfoOverlay";
import React from "react";
import { cn } from "@/lib/utils";

type Props = {
  details: ProjectDetails;
  isEditable?: boolean;
};

/**
 * A card that displays structured project information and notes.
 * Extracts typography/text blocks from the portfolio JSON for clean reading.
 */
export default function ProjectInfoCard({ details, isEditable = false }: Props) {
  const renderDetailItem = (label: string, value?: string) => {
    if (!value) return null;
    return (
      <div>
        <h4 className="font-bold text-[9px] uppercase tracking-widest text-[#C94A2C] mb-1">
          {label}
        </h4>
        <p className="text-sm font-semibold text-neutral-900">{value}</p>
      </div>
    );
  };

  const textBlocks = (details.content_blocks || []).filter(
    (b) => b.type === "heading" || b.type === "text"
  );

  return (
    <div className="bg-[#F5F0E8]/40 max-h-[70vh] overflow-y-auto custom-scrollbar relative">
      {/* Editorial Header */}
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-black/5 px-8 pt-8 pb-6">
         <span className="text-[10px] uppercase tracking-[0.4em] font-black text-[#C94A2C] block mb-2 opacity-80">Project Details</span>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-6">
            {renderDetailItem("Client", details.client)}
            {renderDetailItem("Industry", details.industry)}
            {renderDetailItem("Location", details.location)}
            {renderDetailItem("Year", details.year)}
         </div>
         {details.our_role && (
           <div className="mt-6 pt-6 border-t border-black/5">
             <h4 className="font-bold text-[9px] uppercase tracking-widest text-[#C94A2C] mb-2">Our Role</h4>
             <p className="text-sm font-semibold text-neutral-900 leading-relaxed max-w-2xl">{details.our_role}</p>
           </div>
         )}
      </div>

      {/* Project Literature Body */}
      <div className="p-8 space-y-8 max-w-3xl">
        {textBlocks.length > 0 ? (
           <div className="space-y-6">
             {textBlocks.map((block) => (
                <div key={block.id} className="w-full">
                   {block.type === 'heading' && (
                     React.createElement(
                        block.level === 1 ? 'h1' : block.level === 2 ? 'h2' : 'h3',
                        {
                          className: cn(
                            "font-display font-black tracking-tight",
                            block.level === 1 ? "text-3xl mt-8 mb-4 border-b border-black/5 pb-2" : 
                            block.level === 2 ? "text-2xl mt-6 mb-3" : 
                            "text-xl mt-4 mb-2 uppercase text-[#C94A2C]/80"
                          ),
                          dangerouslySetInnerHTML: { __html: (block.content || '').replace(/\n/g, '<br/>') }
                        }
                     )
                   )}
                   {block.type === 'text' && (
                     <p className="text-[15px] font-medium leading-relaxed text-black/70 mb-4 whitespace-pre-wrap">
                        {block.content}
                     </p>
                   )}
                </div>
             ))}
           </div>
        ) : (
           <div className="flex flex-col items-center justify-center py-12 opacity-40">
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold">No qualitative data recorded.</p>
           </div>
        )}
      </div>
    </div>
  );
}