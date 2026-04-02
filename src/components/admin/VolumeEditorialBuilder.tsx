import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { 
    GripVertical, 
    Plus, 
    Trash2, 
    Image as ImageIcon, 
    Type, 
    Heading, 
    LayoutGrid, 
    Quote as QuoteIcon,
    Terminal,
    Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { EditorialBlock, BlockType } from "@/types/blocks";
import SimpleRichEditor from "../editor/SimpleRichEditor";

interface VolumeEditorialBuilderProps {
  blocks: EditorialBlock[];
  onChange: (blocks: EditorialBlock[]) => void;
}

export default function VolumeEditorialBuilder({ blocks, onChange }: VolumeEditorialBuilderProps) {
  const [isUploading, setIsUploading] = useState(false);

  const addBlock = (type: BlockType) => {
    const newBlock: EditorialBlock = {
      id: Math.random().toString(36).slice(2),
      type,
      content: '',
      style: 'default'
    };
    onChange([...blocks, newBlock]);
  };

  const updateBlock = (id: string, updates: Partial<EditorialBlock>) => {
    onChange(blocks.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  const removeBlock = (id: string) => {
    onChange(blocks.filter(b => b.id !== id));
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(blocks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    onChange(items);
  };

  const uploadMedia = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).slice(2)}.${fileExt}`;
    setIsUploading(true);
    try {
      const { data, error } = await supabase.storage
        .from('portfolio-assets')
        .upload(fileName, file);
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-assets')
        .getPublicUrl(data.path);
      return publicUrl;
    } catch (error) {
      console.error('Upload failed:', error);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleSingleImageUpload = async (id: string, file: File) => {
    const url = await uploadMedia(file);
    if (url) updateBlock(id, { media_url: url });
  };

  const renderBlockEditor = (block: EditorialBlock, index: number) => {
    const inputClasses = "bg-white border-black/10 rounded-2xl p-6 text-sm font-bold tracking-tight text-[#0D0D0D] placeholder:text-black/30 focus-visible:ring-[#C94A2C] focus-visible:ring-offset-0 transition-all w-full leading-relaxed";

    switch (block.type) {
      case 'heading':
        return (
          <Input 
            placeholder="Heading text..." 
            className={cn(inputClasses, "text-2xl font-display font-black tracking-tighter uppercase h-16")}
            value={block.content || ''}
            onChange={(e) => updateBlock(block.id, { content: e.target.value })}
          />
        );
      case 'text':
        return (
          <SimpleRichEditor 
            content={block.content || ''}
            onChange={(html) => updateBlock(block.id, { content: html })}
            placeholder="Write the volume body text here..."
            className="p-6 bg-white rounded-3xl border border-black/5"
          />
        );
      case 'image':
        return (
          <div className="space-y-6 p-2 bg-white rounded-3xl border border-black/5 overflow-hidden">
            {block.media_url ? (
              <div className="relative rounded-2xl overflow-hidden border border-black/5 aspect-video w-full flex items-center justify-center bg-black/5">
                 <img src={block.media_url} alt="" className="max-h-full object-contain" />
                 <Button 
                    variant="destructive" 
                    size="sm" 
                    className="absolute top-4 right-4 rounded-full font-black uppercase text-[10px]"
                    onClick={() => updateBlock(block.id, { media_url: '' })}
                 >
                     Remove Asset
                 </Button>
              </div>
            ) : (
                <label className="border-2 border-dashed border-black/10 rounded-2xl p-16 flex flex-col items-center justify-center cursor-pointer hover:border-[#C94A2C] transition-all bg-[#F5F0E8]/40 hover:bg-white group">
                    <input type="file" accept="image/*,video/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleSingleImageUpload(block.id, e.target.files[0])} />
                    <ImageIcon size={32} className="text-[#0D0D0D]/20 group-hover:text-[#C94A2C] mb-6 transition-colors" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0D0D0D]">Upload Primary Asset</span>
                </label>
            )}
            
            <div className="px-4 pb-4 flex flex-col gap-4">
                <Input 
                    placeholder="Provide a caption for this asset..." 
                    className="bg-black/5 border-none rounded-xl h-10 text-[11px] font-bold"
                    value={block.caption || ''}
                    onChange={(e) => updateBlock(block.id, { caption: e.target.value })}
                />
                <div className="flex gap-2">
                    {['default', 'inset', 'full'].map((style) => (
                        <Button 
                            key={style}
                            variant={block.style === style || (!block.style && style==='default') ? 'default' : 'outline'}
                            onClick={() => updateBlock(block.id, { style: style as any })}
                            className="rounded-full text-[9px] uppercase font-black px-4 h-8"
                            size="sm"
                        >
                            {style}
                        </Button>
                    ))}
                </div>
            </div>
          </div>
        );
      case 'quote':
        return (
          <div className="p-8 bg-[#0D0D0D] rounded-3xl space-y-6">
              <QuoteIcon className="text-[#C94A2C] h-10 w-10 opacity-40" />
              <Textarea 
                placeholder="Editorial pull quote..." 
                className="bg-transparent border-none text-white text-2xl font-display font-black tracking-tighter uppercase placeholder:text-white/20 resize-none h-auto min-h-[100px] p-0 focus-visible:ring-0"
                value={block.content || ''}
                onChange={(e) => updateBlock(block.id, { content: e.target.value })}
              />
              <Input 
                placeholder="Attribution / Reference" 
                className="bg-white/10 border-none rounded-xl h-10 text-[10px] font-black uppercase tracking-widest text-white/60 placeholder:text-white/20"
                value={block.caption || ''}
                onChange={(e) => updateBlock(block.id, { caption: e.target.value })}
              />
          </div>
        );
      case 'registry_highlight':
        return (
          <div className="p-6 bg-white rounded-3xl border border-black/5 relative group/highlight">
              <div className="flex items-center gap-4 mb-4">
                  <span className="text-[8px] font-black text-black/40 uppercase tracking-[0.4em]">Protocol_ID_0{index + 1}</span>
                  <div className="h-px w-full bg-black/5" />
              </div>
              <Textarea 
                placeholder="Enter critical insight or registry highlight..." 
                className="bg-[#F5F0E8] border-none rounded-2xl min-h-[100px] p-6 text-sm font-bold tracking-tight text-[#0D0D0D] placeholder:text-black/20 focus-visible:ring-[#C94A2C] transition-all resize-none shadow-inner"
                value={block.content || ''}
                onChange={(e) => updateBlock(block.id, { content: e.target.value })}
              />
          </div>
        );
    }
  };

  return (
    <div className="space-y-10 relative">
        {isUploading && (
            <div className="absolute inset-0 z-50 bg-[#F5F0E8]/80 backdrop-blur-sm rounded-[3rem] flex items-center justify-center">
                <div className="bg-black text-white rounded-3xl p-8 shadow-2xl flex items-center gap-6 border border-white/10 scale-110">
                    <div className="w-8 h-8 border-4 border-white/10 border-t-[#C94A2C] rounded-full animate-spin" />
                    <span className="text-[11px] font-black uppercase tracking-[0.4em]">ARCHIVING_ASSETS...</span>
                </div>
            </div>
        )}

        <div className="flex flex-wrap items-center gap-4 p-5 bg-white rounded-[2.5rem] border border-black/5 shadow-2xl sticky top-24 z-40 backdrop-blur-md bg-white/90">
            <div className="flex items-center gap-3 px-4 border-r border-black/5 mr-2">
                <Terminal size={14} className="text-[#C94A2C]" />
                <span className="text-[10px] font-black uppercase tracking-widest text-black/40">Toolbox</span>
            </div>
            
            <Button variant="ghost" onClick={() => addBlock('heading')} className="group flex items-center gap-3 rounded-2xl text-[9px] font-black uppercase tracking-widest text-[#0D0D0D] hover:bg-[#F5F0E8] hover:text-[#C94A2C] transition-all h-10 px-4">
                <Heading size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" /> Heading
            </Button>
            <Button variant="ghost" onClick={() => addBlock('text')} className="group flex items-center gap-3 rounded-2xl text-[9px] font-black uppercase tracking-widest text-[#0D0D0D] hover:bg-[#F5F0E8] hover:text-[#C94A2C] transition-all h-10 px-4">
                <Type size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" /> Rich Text
            </Button>
            <Button variant="ghost" onClick={() => addBlock('image')} className="group flex items-center gap-3 rounded-2xl text-[9px] font-black uppercase tracking-widest text-[#0D0D0D] hover:bg-[#F5F0E8] hover:text-[#C94A2C] transition-all h-10 px-4">
                <ImageIcon size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" /> Media
            </Button>
            <Button variant="ghost" onClick={() => addBlock('quote')} className="group flex items-center gap-3 rounded-2xl text-[9px] font-black uppercase tracking-widest text-[#0D0D0D] hover:bg-[#F5F0E8] hover:text-[#C94A2C] transition-all h-10 px-4">
                <QuoteIcon size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" /> Quote
            </Button>
            <Button variant="ghost" onClick={() => addBlock('registry_highlight')} className="group flex items-center gap-3 rounded-2xl text-[9px] font-black uppercase tracking-widest text-[#0D0D0D] hover:bg-[#F5F0E8] hover:text-[#C94A2C] transition-all h-10 px-4">
                <Sparkles size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" /> Highlight
            </Button>
        </div>

        {blocks.length === 0 ? (
            <div className="border-2 border-dashed border-black/[0.05] rounded-[3.5rem] p-24 text-center flex flex-col items-center bg-black/[0.01]">
                <div className="w-16 h-16 bg-[#F5F0E8] rounded-3xl flex items-center justify-center mb-8 shadow-inner">
                    <LayoutGrid size={32} className="text-black/10" />
                </div>
                <h4 className="text-3xl font-display font-black tracking-tighter uppercase mb-3 text-[#0D0D0D]">Editorial Canvas Empty</h4>
                <p className="text-[#0D0D0D]/40 font-bold text-[11px] uppercase tracking-[0.3em] max-w-sm leading-relaxed">
                    Select a component from the toolbox above to construct your volume edition.
                </p>
            </div>
        ) : (
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="volume_blocks">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-10 pb-20">
                            {blocks.map((block, index) => (
                                <Draggable key={block.id} draggableId={block.id} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            className={cn(
                                                "group relative bg-[#F5F0E8] rounded-[3rem] p-4 pr-12 md:p-6 md:pr-14 transition-all border border-black/[0.03] shadow-sm",
                                                snapshot.isDragging && "shadow-2xl scale-[1.01] z-50 ring-2 ring-[#C94A2C] ring-offset-8 ring-offset-[#F5F0E8]"
                                            )}
                                        >
                                            <div 
                                                {...provided.dragHandleProps} 
                                                className="absolute top-4 left-4 w-10 h-10 flex flex-col items-center justify-center opacity-40 hover:opacity-100 cursor-grab active:cursor-grabbing text-[#0D0D0D] hidden md:flex"
                                            >
                                                <GripVertical size={20} />
                                            </div>
                                            
                                            <div className="md:ml-12">
                                                <div className="flex items-center gap-3 mb-6">
                                                   <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#0D0D0D]/60 bg-black/[0.03] px-4 py-2 rounded-full border border-black/5">
                                                       PROTOCOL_TYPE // {block.type}
                                                   </span>
                                                </div>
                                                {renderBlockEditor(block, index)}
                                            </div>

                                            <button 
                                                onClick={() => removeBlock(block.id)}
                                                className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center bg-white rounded-2xl shadow-md text-black/40 hover:text-[#C94A2C] transition-all border border-black/5"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        )}
    </div>
  );
}
