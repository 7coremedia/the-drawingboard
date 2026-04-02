import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { GripVertical, Plus, Trash2, Image as ImageIcon, Type, Heading, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

export type PortfolioBlockType = 'heading' | 'text' | 'image' | 'gallery';

export interface PortfolioBlock {
  id: string;
  type: PortfolioBlockType;
  content?: string;
  media_url?: string;
  media_urls?: string[];
  style?: 'default' | 'inset' | 'full';
}

interface PortfolioBlockBuilderProps {
  blocks: PortfolioBlock[];
  onChange: (blocks: PortfolioBlock[]) => void;
}

export default function PortfolioBlockBuilder({ blocks, onChange }: PortfolioBlockBuilderProps) {
  const [isUploading, setIsUploading] = useState(false);

  const addBlock = (type: PortfolioBlockType) => {
    const newBlock: PortfolioBlock = {
      id: Math.random().toString(36).slice(2),
      type,
    };
    onChange([...blocks, newBlock]);
  };

  const updateBlock = (id: string, updates: Partial<PortfolioBlock>) => {
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
      alert('Upload failed. Please try again.');
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleSingleImageUpload = async (id: string, file: File) => {
    const url = await uploadMedia(file);
    if (url) updateBlock(id, { media_url: url });
  };

  const handleGalleryUpload = async (id: string, files: FileList | null, currentUrls: string[] = []) => {
      if (!files) return;
      const urls: string[] = [...currentUrls];
      for (let i = 0; i < files.length; i++) {
          const url = await uploadMedia(files[i]);
          if (url) urls.push(url);
      }
      updateBlock(id, { media_urls: urls });
  };

  const renderBlockEditor = (block: PortfolioBlock) => {
    const inputClasses = "bg-white border-black/10 rounded-2xl p-4 text-sm font-bold tracking-tight text-[#0D0D0D] placeholder:text-black/30 focus-visible:ring-[#C94A2C] focus-visible:ring-offset-0 transition-all w-full";

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
          <Textarea 
            placeholder="Paragraph text..." 
            className={cn(inputClasses, "min-h-[120px] font-medium leading-relaxed resize-y")}
            value={block.content || ''}
            onChange={(e) => updateBlock(block.id, { content: e.target.value })}
          />
        );
      case 'image':
        return (
          <div className="space-y-4">
            {block.media_url ? (
              <div className="relative rounded-2xl overflow-hidden border border-black/5 bg-black/5 aspect-video w-full flex items-center justify-center">
                 <img src={block.media_url} alt="" className="max-h-full object-contain" />
                 <Button 
                    variant="destructive" 
                    size="sm" 
                    className="absolute top-4 right-4 rounded-full font-black uppercase text-[10px]"
                    onClick={() => updateBlock(block.id, { media_url: '' })}
                 >
                     Remove Image
                 </Button>
              </div>
            ) : (
                <label className="border-2 border-dashed border-black/10 rounded-2xl p-12 flex flex-col items-center justify-center cursor-pointer hover:border-[#C94A2C] transition-all bg-white hover:bg-white/50 group">
                    <input type="file" accept="image/*,video/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleSingleImageUpload(block.id, e.target.files[0])} />
                    <ImageIcon size={32} className="text-[#0D0D0D]/20 group-hover:text-[#C94A2C] mb-4 transition-colors" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0D0D0D]">Upload Media Source</span>
                </label>
            )}
            
            <div className="flex gap-2">
                {['default', 'inset', 'full'].map((style) => (
                    <Button 
                        key={style}
                        variant={block.style === style || (!block.style && style==='default') ? 'default' : 'outline'}
                        onClick={() => updateBlock(block.id, { style: style as any })}
                        className="rounded-full text-[10px] uppercase font-bold px-4"
                        size="sm"
                    >
                        {style} Layout
                    </Button>
                ))}
            </div>
          </div>
        );
      case 'gallery':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
                 {block.media_urls?.map((url, i) => (
                      <div key={i} className="relative aspect-square bg-black/5 rounded-2xl overflow-hidden border border-black/5">
                          <img src={url} className="w-full h-full object-cover" />
                          <button 
                             onClick={() => updateBlock(block.id, { media_urls: block.media_urls?.filter((_, index) => index !== i) })}
                             className="absolute top-2 right-2 bg-black text-white w-6 h-6 rounded-full flex items-center justify-center"
                          >
                             <Trash2 size={12} />
                          </button>
                      </div>
                 ))}
                  <label className="border-2 border-dashed border-black/10 rounded-2xl aspect-square flex flex-col items-center justify-center cursor-pointer hover:border-[#C94A2C] transition-all bg-white hover:bg-white/50 group">
                    <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleGalleryUpload(block.id, e.target.files, block.media_urls)} />
                    <Plus size={24} className="text-[#0D0D0D]/20 group-hover:text-[#C94A2C] mb-2 transition-colors" />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#0D0D0D] text-center px-2">Add Gallery Item</span>
                </label>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-8 relative">
        {isUploading && (
            <div className="absolute inset-0 z-50 bg-[#F5F0E8]/80 backdrop-blur-sm rounded-[3rem] flex items-center justify-center">
                <div className="bg-white rounded-3xl p-6 shadow-2xl flex items-center gap-4 border border-black/5">
                    <div className="w-5 h-5 border-2 border-black/10 border-t-[#C94A2C] rounded-full animate-spin" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#0D0D0D]">Injecting Assets...</span>
                </div>
            </div>
        )}

        <div className="flex flex-wrap gap-3 p-4 bg-white rounded-3xl border border-black/5 shadow-xl sticky top-24 z-40">
            <Button variant="ghost" onClick={() => addBlock('heading')} className="group flex items-center gap-2 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#0D0D0D] hover:bg-[#F5F0E8] hover:text-[#C94A2C] transition-all">
                <Heading size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" /> Add Heading
            </Button>
            <Button variant="ghost" onClick={() => addBlock('text')} className="group flex items-center gap-2 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#0D0D0D] hover:bg-[#F5F0E8] hover:text-[#C94A2C] transition-all">
                <Type size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" /> Add Text
            </Button>
            <Button variant="ghost" onClick={() => addBlock('image')} className="group flex items-center gap-2 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#0D0D0D] hover:bg-[#F5F0E8] hover:text-[#C94A2C] transition-all">
                <ImageIcon size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" /> Add Media
            </Button>
            <Button variant="ghost" onClick={() => addBlock('gallery')} className="group flex items-center gap-2 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#0D0D0D] hover:bg-[#F5F0E8] hover:text-[#C94A2C] transition-all">
                <LayoutGrid size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" /> Add Gallery Grid
            </Button>
        </div>

        {blocks.length === 0 ? (
            <div className="border-2 border-dashed border-black/5 rounded-[3rem] p-20 text-center flex flex-col items-center">
                <LayoutGrid size={48} className="text-black/10 mb-6" />
                <h4 className="text-2xl font-display font-black tracking-tighter uppercase mb-2">Architectural Canvas Empty</h4>
                <p className="text-[#0D0D0D]/60 font-bold text-[11px] uppercase tracking-widest max-w-sm leading-relaxed">
                    Select a module block above to begin constructing the case study sequence.
                </p>
            </div>
        ) : (
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="blocks">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-6">
                            {blocks.map((block, index) => (
                                <Draggable key={block.id} draggableId={block.id} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            className={cn(
                                                "group relative bg-[#F5F0E8] rounded-[2.5rem] p-6 pr-16 md:p-8 md:pr-20 transition-all border border-black/5",
                                                snapshot.isDragging && "shadow-2xl scale-[1.02] z-50 ring-2 ring-[#C94A2C]"
                                            )}
                                        >
                                            <div 
                                                {...provided.dragHandleProps} 
                                                className="absolute top-6 left-6 w-10 h-10 flex flex-col items-center justify-center opacity-40 hover:opacity-100 cursor-grab active:cursor-grabbing text-[#0D0D0D] hidden md:flex"
                                            >
                                                <GripVertical size={20} />
                                            </div>
                                            
                                            <div className="md:ml-12">
                                                <div className="flex items-center gap-3 mb-6">
                                                   <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#0D0D0D]/80 bg-black/5 px-3 py-1 rounded-full">
                                                       {block.type}_module
                                                   </span>
                                                </div>
                                                {renderBlockEditor(block)}
                                            </div>

                                            <button 
                                                onClick={() => removeBlock(block.id)}
                                                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-white rounded-2xl shadow-sm text-black/60 hover:text-[#C94A2C] transition-colors border border-black/5"
                                            >
                                                <Trash2 size={16} />
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
