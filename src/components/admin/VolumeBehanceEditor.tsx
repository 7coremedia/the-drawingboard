import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowLeft, Save, Eye, EyeOff, GripVertical, Trash2,
  Image as ImageIcon, Type, LayoutGrid, Video, Code2,
  FileText, Minus, Plus, ChevronLeft, ChevronRight,
  Settings, Palette, Paperclip, Upload, X, Check,
  Heading1, AlignLeft, Loader2, Globe, Lock, Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

// ─── Block Types ────────────────────────────────────────────────────────────

export type BlockType = "image" | "text" | "heading" | "gallery" | "video" | "embed" | "pdf" | "divider" | "meta_background";

export interface ContentBlock {
  id: string;
  type: BlockType;
  // text / heading
  content?: string;
  // image / video
  media_url?: string;
  // gallery
  media_urls?: string[];
  // pdf
  pdf_url?: string;
  pdf_name?: string;
  // layout hint
  style?: "default" | "inset" | "full" | "wide";
  size?: "small" | "medium" | "big";
  layout?: "left" | "center" | "right";
  side_text?: string;
}

// ─── Volume meta schema ───────────────────────────────────────────────────

const metaSchema = z.object({
  title: z.string().min(1, "Title required"),
  volumeType: z.enum(["article", "masterclass"]).default("article"),
  category: z.string().optional(),
  writer: z.string().optional(),
  writerAvatar: z.string().optional(),
  publishedAt: z.string().optional(),
  timeToRead: z.string().optional(),
  volumeNumber: z.string().optional(),
  goal: z.string().optional(),
  summary: z.string().optional(),
  slug: z.string().optional(),
  isPublished: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  isLatest: z.boolean().default(false),
});

type MetaFormData = z.infer<typeof metaSchema>;

// ─── Block module catalogue ──────────────────────────────────────────────────

const BLOCK_MODULES: { type: BlockType; label: string; icon: React.ElementType; color: string }[] = [
  { type: "image",   label: "Image",      icon: ImageIcon,  color: "#C94A2C" },
  { type: "text",    label: "Text",       icon: AlignLeft,  color: "#4A7CC9" },
  { type: "heading", label: "Heading",    icon: Heading1,   color: "#9B59B6" },
  { type: "gallery", label: "Photo Grid", icon: LayoutGrid, color: "#27AE60" },
  { type: "video",   label: "Video",      icon: Video,      color: "#E67E22" },
  { type: "embed",   label: "Embed",      icon: Code2,      color: "#16A085" },
  { type: "pdf",     label: "PDF",        icon: FileText,   color: "#C94A2C" },
  { type: "divider", label: "Divider",    icon: Minus,      color: "#95A5A6" },
];

// ─── Props ───────────────────────────────────────────────────────────────────

interface VolumeBehanceEditorProps {
  mode: "create" | "edit";
  initialMeta?: Partial<MetaFormData> & {
    media_url?: string; // We map this to heroImageUrl
    content_blocks?: ContentBlock[];
    pdf_url?: string;
  };
  onSubmit: (data: MetaFormData & {
    media_url: string;
    content_blocks: ContentBlock[];
    pdf_url?: string | null;
  }) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function genId() {
  return Math.random().toString(36).slice(2, 10);
}

async function uploadToSupabase(file: File): Promise<string> {
  const ext = file.name.split(".").pop();
  const name = `${genId()}.${ext}`;
  const { data, error } = await supabase.storage.from("portfolio-assets").upload(name, file);
  if (error) throw error;
  const { data: pub } = supabase.storage.from("portfolio-assets").getPublicUrl(data.path);
  return pub.publicUrl;
}

// ─── Block editor sub-components ─────────────────────────────────────────────

function ImageBlock({ block, onUpdate }: { block: ContentBlock; onUpdate: (u: Partial<ContentBlock>) => void }) {
  const [uploading, setUploading] = useState(false);
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setUploading(true);
    try { onUpdate({ media_url: await uploadToSupabase(f) }); }
    catch { alert("Upload failed"); }
    finally { setUploading(false); }
  };
  return (
    <div className="space-y-4">
      {block.media_url ? (
        <div className="relative group rounded-2xl overflow-hidden bg-black/5 border border-black/5">
          <img src={block.media_url} alt="" className="w-full object-cover max-h-[560px]" />
          <button
            onClick={() => onUpdate({ media_url: "" })}
            className="absolute top-3 right-3 w-8 h-8 bg-black/80 hover:bg-[#C94A2C] rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-black/10 rounded-2xl p-16 cursor-pointer hover:border-[#C94A2C]/40 hover:bg-[#F5F0E8]/60 transition-all group">
          {uploading ? (
            <Loader2 size={32} className="text-[#C94A2C] animate-spin mb-3" />
          ) : (
            <ImageIcon size={32} className="text-black/20 group-hover:text-[#C94A2C] mb-3 transition-colors" />
          )}
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40 group-hover:text-[#0D0D0D] transition-colors">
            {uploading ? "Uploading..." : "Drop or click to upload image"}
          </span>
          <input type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={uploading} />
        </label>
      )}
      <div className="flex gap-2 flex-wrap items-center bg-[#F5F0E8] p-3 rounded-xl border border-black/5 mt-4">
        <div className="flex items-center gap-2">
            <span className="text-[9px] font-black uppercase tracking-widest text-black/50 mr-2">Size</span>
            {(["small", "medium", "big"] as const).map((s) => (
            <button key={s} onClick={() => onUpdate({ size: s })} className={cn("px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all", (block.size ?? "medium") === s ? "bg-[#0D0D0D] text-white border-[#0D0D0D]" : "bg-white text-black/40 border-black/10 hover:border-black/30")}>
                {s}
            </button>
            ))}
        </div>
        <div className="h-4 w-px bg-black/10 mx-2" />
        <div className="flex items-center gap-2">
            <span className="text-[9px] font-black uppercase tracking-widest text-black/50 mr-2">Align</span>
            {(["left", "center", "right"] as const).map((s) => (
            <button key={s} onClick={() => onUpdate({ layout: s })} className={cn("px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all", (block.layout ?? "center") === s ? "bg-[#0D0D0D] text-white border-[#0D0D0D]" : "bg-white text-black/40 border-black/10 hover:border-black/30")}>
                {s}
            </button>
            ))}
        </div>
      </div>
      {(block.size === "small" || block.size === "medium") && (
          <div className="mt-3">
              <label className="text-[9px] font-black uppercase tracking-widest text-black/50 mb-2 block">Contextual Side Text (Optional)</label>
              <Textarea 
                placeholder="Explanatory text rendering beside the image..." 
                className="bg-[#F5F0E8] border-black/10 rounded-xl text-xs font-medium text-[#0D0D0D] placeholder:text-black/20 focus-visible:ring-[#C94A2C] min-h-[60px] resize-none leading-relaxed w-full p-3"
                value={block.side_text ?? ""}
                onChange={(e) => onUpdate({ side_text: e.target.value })}
              />
          </div>
      )}
    </div>
  );
}

function GalleryBlock({ block, onUpdate }: { block: ContentBlock; onUpdate: (u: Partial<ContentBlock>) => void }) {
  const [uploading, setUploading] = useState(false);
  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setUploading(true);
    try {
      const urls = [...(block.media_urls ?? [])];
      for (const f of Array.from(e.target.files)) {
        urls.push(await uploadToSupabase(f));
      }
      onUpdate({ media_urls: urls });
    } catch { alert("Upload failed"); }
    finally { setUploading(false); }
  };
  const remove = (i: number) => onUpdate({ media_urls: block.media_urls?.filter((_, idx) => idx !== i) });
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {(block.media_urls ?? []).map((url, i) => (
          <div key={i} className="relative aspect-square bg-black/5 rounded-xl overflow-hidden group border border-black/5">
            <img src={url} alt="" className="w-full h-full object-cover" />
            <button onClick={() => remove(i)} className="absolute top-2 right-2 w-6 h-6 bg-black/80 hover:bg-[#C94A2C] rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all">
              <X size={10} />
            </button>
          </div>
        ))}
        <label className="aspect-square border-2 border-dashed border-black/10 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[#C94A2C]/40 hover:bg-[#F5F0E8]/60 transition-all group">
          {uploading ? <Loader2 size={20} className="text-[#C94A2C] animate-spin" /> : <Plus size={20} className="text-black/20 group-hover:text-[#C94A2C] transition-colors" />}
          <span className="text-[8px] font-black uppercase tracking-widest text-black/30 mt-2">Add</span>
          <input type="file" accept="image/*" multiple className="hidden" onChange={handleFiles} disabled={uploading} />
        </label>
      </div>

      <div className="flex gap-2 flex-wrap items-center bg-[#F5F0E8] p-3 rounded-xl border border-black/5">
        <div className="flex items-center gap-2">
            <span className="text-[9px] font-black uppercase tracking-widest text-black/50 mr-2">Align</span>
            {(["left", "center", "right"] as const).map((s) => (
            <button key={s} onClick={() => onUpdate({ layout: s })} className={cn("px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all", (block.layout ?? "center") === s ? "bg-[#0D0D0D] text-white border-[#0D0D0D]" : "bg-white text-black/40 border-black/10 hover:border-black/30")}>
                {s}
            </button>
            ))}
        </div>
      </div>
    </div>
  );
}

function VideoBlock({ block, onUpdate }: { block: ContentBlock; onUpdate: (u: Partial<ContentBlock>) => void }) {
  const [uploaded, setUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setUploading(true);
    try { onUpdate({ media_url: await uploadToSupabase(f) }); setUploaded(true); }
    catch { alert("Upload failed"); }
    finally { setUploading(false); }
  };
  if (block.media_url) {
    return (
      <div className="relative group rounded-2xl overflow-hidden bg-black border border-black/10">
        <video src={block.media_url} controls className="w-full max-h-[480px]" />
        <button onClick={() => { onUpdate({ media_url: "" }); setUploaded(false); }} className="absolute top-3 right-3 w-8 h-8 bg-black/80 hover:bg-[#C94A2C] rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all">
          <X size={14} />
        </button>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      <label className="flex flex-col items-center justify-center border-2 border-dashed border-black/10 rounded-2xl p-12 cursor-pointer hover:border-[#C94A2C]/40 hover:bg-[#F5F0E8]/60 transition-all group">
        {uploading ? <Loader2 size={32} className="text-[#C94A2C] animate-spin mb-3" /> : <Video size={32} className="text-black/20 group-hover:text-[#C94A2C] mb-3 transition-colors" />}
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40 group-hover:text-[#0D0D0D] transition-colors">{uploading ? "Uploading..." : "Upload video file"}</span>
        <input type="file" accept="video/*" className="hidden" onChange={handleFile} disabled={uploading} />
      </label>
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-black/5" />
        <span className="text-[8px] font-black uppercase tracking-widest text-black/20">or paste URL</span>
        <div className="h-px flex-1 bg-black/5" />
      </div>
      <Input
        placeholder="https://youtube.com/embed/... or video URL"
        className="bg-[#F5F0E8] border-black/10 rounded-xl h-11 text-xs font-bold text-[#0D0D0D] placeholder:text-black/20"
        onChange={(e) => onUpdate({ media_url: e.target.value })}
      />
    </div>
  );
}

function EmbedBlock({ block, onUpdate }: { block: ContentBlock; onUpdate: (u: Partial<ContentBlock>) => void }) {
  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Paste embed code (<iframe>...</iframe> or URL)"
        className="bg-[#F5F0E8] border-black/10 rounded-xl min-h-[120px] text-xs font-mono text-[#0D0D0D] placeholder:text-black/20"
        value={block.content ?? ""}
        onChange={(e) => onUpdate({ content: e.target.value })}
      />
      {block.content && (block.content.includes("<") ? (
        <div className="rounded-xl overflow-hidden border border-black/5 bg-black/5 p-2">
          <div dangerouslySetInnerHTML={{ __html: block.content }} />
        </div>
      ) : (
        <iframe src={block.content} className="w-full h-64 rounded-xl border border-black/5" allowFullScreen />
      ))}
    </div>
  );
}

function PDFBlock({ block, onUpdate }: { block: ContentBlock; onUpdate: (u: Partial<ContentBlock>) => void }) {
  const [uploading, setUploading] = useState(false);
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setUploading(true);
    try {
      const url = await uploadToSupabase(f);
      onUpdate({ pdf_url: url, pdf_name: block.pdf_name || f.name.replace(".pdf", "") });
    } catch { alert("Upload failed"); }
    finally { setUploading(false); }
  };
  return (
    <div className="space-y-4">
      <div>
        <label className="text-[9px] font-black uppercase tracking-[0.4em] text-black/50 mb-2 block">PDF Display Name</label>
        <Input
          placeholder="e.g. Brand Strategy Report, Case Study Vol.1 ..."
          className="bg-[#F5F0E8] border-black/10 rounded-xl h-11 text-xs font-bold text-[#0D0D0D] placeholder:text-black/20"
          value={block.pdf_name ?? ""}
          onChange={(e) => onUpdate({ pdf_name: e.target.value })}
        />
      </div>
      {block.pdf_url ? (
        <div className="flex items-center justify-between bg-[#F5F0E8] rounded-2xl p-5 border border-black/5 group">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#C94A2C]/10 rounded-xl flex items-center justify-center">
              <FileText size={18} className="text-[#C94A2C]" />
            </div>
            <div>
              <div className="text-xs font-black text-[#0D0D0D] tracking-tight">{block.pdf_name || "PDF Document"}</div>
              <div className="text-[9px] font-bold text-black/30 uppercase tracking-widest mt-0.5">PDF · Uploaded to Archive</div>
            </div>
          </div>
          <div className="flex gap-2">
            <a href={block.pdf_url} target="_blank" rel="noopener noreferrer">
              <button className="px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-black/10 hover:border-[#C94A2C] hover:text-[#C94A2C] transition-all">Preview</button>
            </a>
            <button onClick={() => onUpdate({ pdf_url: "", pdf_name: "" })} className="px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-black/10 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all">Remove</button>
          </div>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-black/10 rounded-2xl p-12 cursor-pointer hover:border-[#C94A2C]/40 hover:bg-[#F5F0E8]/60 transition-all group">
          {uploading ? <Loader2 size={32} className="text-[#C94A2C] animate-spin mb-3" /> : <FileText size={32} className="text-black/20 group-hover:text-[#C94A2C] mb-3 transition-colors" />}
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40 group-hover:text-[#0D0D0D] transition-colors">{uploading ? "Uploading PDF..." : "Drop or click to upload PDF"}</span>
          <span className="text-[9px] font-bold text-black/20 mt-1.5 uppercase tracking-widest">Max 500MB · PDF files only</span>
          <input type="file" accept="application/pdf" className="hidden" onChange={handleFile} disabled={uploading} />
        </label>
      )}
    </div>
  );
}

// ─── Single block wrapper ─────────────────────────────────────────────────────

function CanvasBlock({
  block, index, onUpdate, onRemove, isDragging,
  provided, isMobile,
}: {
  block: ContentBlock;
  index: number;
  onUpdate: (id: string, u: Partial<ContentBlock>) => void;
  onRemove: (id: string) => void;
  isDragging: boolean;
  provided: any;
  isMobile: boolean;
}) {
  const module = BLOCK_MODULES.find((m) => m.type === block.type);
  const Icon = module?.icon ?? Type;

  const renderEditor = () => {
    switch (block.type) {
      case "heading":
        return (
          <Input
            placeholder="Add a heading..."
            className="bg-transparent border-none shadow-none text-3xl md:text-4xl font-display font-black tracking-tighter text-[#0D0D0D] placeholder:text-black/20 h-auto p-0 focus-visible:ring-0"
            value={block.content ?? ""}
            onChange={(e) => onUpdate(block.id, { content: e.target.value })}
          />
        );
      case "text":
        return (
          <Textarea
            placeholder="Write something..."
            className="bg-transparent border-none shadow-none resize-none text-base font-medium leading-relaxed text-[#0D0D0D] placeholder:text-black/20 p-0 focus-visible:ring-0 min-h-[80px]"
            value={block.content ?? ""}
            onChange={(e) => onUpdate(block.id, { content: e.target.value })}
          />
        );
      case "image":
        return <ImageBlock block={block} onUpdate={(u) => onUpdate(block.id, u)} />;
      case "gallery":
        return <GalleryBlock block={block} onUpdate={(u) => onUpdate(block.id, u)} />;
      case "video":
        return <VideoBlock block={block} onUpdate={(u) => onUpdate(block.id, u)} />;
      case "embed":
        return <EmbedBlock block={block} onUpdate={(u) => onUpdate(block.id, u)} />;
      case "pdf":
        return <PDFBlock block={block} onUpdate={(u) => onUpdate(block.id, u)} />;
      case "divider":
        return <div className="h-px bg-black/10 my-4 w-full" />;
      default:
        return null;
    }
  };

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      className={cn(
        "group relative bg-white rounded-2xl border border-black/5 transition-all",
        block.type === "heading" || block.type === "text" || block.type === "divider" ? "px-8 py-6" : "p-6",
        isDragging && "shadow-2xl scale-[1.01] ring-2 ring-[#C94A2C]/20"
      )}
    >
      {/* Drag handle - Hidden on mobile liter mode */}
      {!isMobile && (
        <div
          {...provided.dragHandleProps}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-6 flex flex-col items-center gap-0.5 opacity-0 group-hover:opacity-40 hover:!opacity-100 cursor-grab active:cursor-grabbing transition-all"
        >
          <GripVertical size={16} className="text-black" />
        </div>
      )}

      {/* Block type badge */}
      <div className="absolute top-4 right-14 opacity-0 group-hover:opacity-100 transition-all">
        <span
          className="text-[8px] font-black uppercase tracking-[0.3em] px-2.5 py-1 rounded-full"
          style={{ backgroundColor: `${module?.color}15`, color: module?.color }}
        >
          {block.type}
        </span>
      </div>

      {/* Delete button */}
      <button
        onClick={() => onRemove(block.id)}
        className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center bg-white rounded-xl shadow-sm border border-black/5 text-black/30 hover:text-[#C94A2C] hover:border-[#C94A2C]/20 opacity-0 group-hover:opacity-100 transition-all"
      >
        <Trash2 size={13} />
      </button>

      <div className={cn(block.type !== "divider" ? "ml-1 md:ml-4" : "")}>
        {renderEditor()}
      </div>
    </div>
  );
}

// ─── Cover image uploader ────────────────────────────────────────────────────

function CoverUploader({ url, onChange }: { url: string; onChange: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setUploading(true);
    try { onChange(await uploadToSupabase(f)); }
    catch { alert("Cover upload failed"); }
    finally { setUploading(false); }
  };
  return (
    <div className="w-full">
      {url ? (
        <div className="relative group w-full h-56 rounded-2xl overflow-hidden border border-black/5 bg-black/5">
          <img src={url} alt="Cover" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-3">
            <label className="cursor-pointer px-4 py-2 bg-white/90 rounded-full text-[9px] font-black uppercase tracking-widest text-[#0D0D0D] hover:bg-white transition-colors">
              Replace
              <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
            </label>
            <button onClick={() => onChange("")} className="px-4 py-2 bg-[#C94A2C]/90 rounded-full text-[9px] font-black uppercase tracking-widest text-white hover:bg-[#C94A2C] transition-colors">
              Remove
            </button>
          </div>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-black/10 rounded-2xl cursor-pointer hover:border-[#C94A2C]/40 hover:bg-[#F5F0E8]/60 transition-all group">
          {uploading ? (
            <Loader2 size={24} className="text-[#C94A2C] animate-spin mb-2" />
          ) : (
            <Upload size={24} className="text-black/20 group-hover:text-[#C94A2C] mb-2 transition-colors" />
          )}
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-black/30 group-hover:text-[#0D0D0D] transition-colors">
            {uploading ? "Uploading..." : "Upload Cover Image"}
          </span>
          <input type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={uploading} />
        </label>
      )}
    </div>
  );
}

// ─── Main Editor ─────────────────────────────────────────────────────────────

export default function VolumeBehanceEditor({ mode, initialMeta, onSubmit, onCancel, isLoading }: VolumeBehanceEditorProps) {
  const navigate = useNavigate();
  const [blocks, setBlocks] = useState<ContentBlock[]>((initialMeta?.content_blocks as ContentBlock[]) ?? []);
  const [coverImage, setCoverImage] = useState<string>(initialMeta?.media_url ?? "");
  const [leftOpen, setLeftOpen] = useState(true);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [activeSection, setActiveSection] = useState<"add" | "settings" | null>("add");
  const [mobileActivePanel, setMobileActivePanel] = useState<"none" | "meta" | "actions">("none");

  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Filter modules on mobile
  const activeModules = isMobile 
    ? BLOCK_MODULES.filter(m => ["image", "text", "pdf", "heading"].includes(m.type))
    : BLOCK_MODULES;

  const bgBlockRef = blocks.find(b => b.type === "meta_background");
  const bgImageUrl = bgBlockRef?.media_url ?? "";

  const handleBgImageChange = (url: string) => {
    setBlocks(prev => {
      const filtered = prev.filter(b => b.type !== "meta_background");
      if (url) filtered.push({ id: genId(), type: "meta_background", media_url: url });
      return filtered;
    });
  };

  useEffect(() => {
    if (initialMeta) {
      setBlocks(prev => {
        let newBlocks = [...prev];
        let migrated = false;
        
        const hasChallenge = newBlocks.some(b => b.type === "heading" && b.content?.toLowerCase().includes("challenge"));
        if (initialMeta.the_challenge && !hasChallenge) {
          newBlocks.push({ id: genId(), type: "heading", content: "The Challenge" });
          newBlocks.push({ id: genId(), type: "text", content: initialMeta.the_challenge });
          migrated = true;
        }

        const hasSolution = newBlocks.some(b => b.type === "heading" && b.content?.toLowerCase().includes("solution"));
        if (initialMeta.the_solution && !hasSolution) {
          newBlocks.push({ id: genId(), type: "heading", content: "The Solution" });
          newBlocks.push({ id: genId(), type: "text", content: initialMeta.the_solution });
          migrated = true;
        }

        const hasGrowth = newBlocks.some(b => b.type === "heading" && (b.content?.toLowerCase().includes("growth") || b.content?.toLowerCase().includes("execution")));
        if (initialMeta.description && !hasGrowth) {
          newBlocks.push({ id: genId(), type: "heading", content: "Growth & Digital Execution" });
          newBlocks.push({ id: genId(), type: "text", content: initialMeta.description });
          migrated = true;
        }

        return migrated ? newBlocks : prev;
      });
    }
  }, [initialMeta]);

  const form = useForm<MetaFormData>({
    resolver: zodResolver(metaSchema),
    defaultValues: {
      title: initialMeta?.title ?? "",
      volumeType: initialMeta?.volumeType ?? "article",
      category: initialMeta?.category ?? "",
      writer: initialMeta?.writer ?? "",
      writerAvatar: initialMeta?.writerAvatar ?? "",
      publishedAt: initialMeta?.publishedAt ?? "",
      timeToRead: initialMeta?.timeToRead ?? "",
      volumeNumber: initialMeta?.volumeNumber ?? "",
      goal: initialMeta?.goal ?? "",
      summary: initialMeta?.summary ?? "",
      slug: initialMeta?.slug ?? "",
      isPublished: initialMeta?.isPublished ?? false,
      isFeatured: initialMeta?.isFeatured ?? false,
      isLatest: initialMeta?.isLatest ?? false,
    },
  });

  const watchTitle = form.watch("title");
  const watchPublished = form.watch("isPublished");
  const watchVolumeType = form.watch("volumeType");

  // ── Block mutations ──────────────────────────────────────────────────────

  const addBlock = (type: BlockType) => {
    setBlocks((prev) => [...prev, { id: genId(), type }]);
  };

  const updateBlock = (id: string, updates: Partial<ContentBlock>) => {
    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, ...updates } : b)));
  };

  const removeBlock = (id: string) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  };

  const displayBlocks = blocks.filter(b => b.type !== "meta_background");

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(displayBlocks);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);
    
    const metas = blocks.filter(b => b.type === "meta_background");
    setBlocks([...metas, ...items]);
  };

  // ── Submit ───────────────────────────────────────────────────────────────

  const handleSubmit = form.handleSubmit(async (data) => {
    if (!coverImage) {
      alert("A cover image is required.");
      return;
    }
    setSaveStatus("saving");
    try {
      const pdfBlock = blocks.find((b) => b.type === "pdf" && b.pdf_url);

      await onSubmit({
        ...data,
        media_url: coverImage,
        content_blocks: blocks,
        pdf_url: pdfBlock?.pdf_url || null,
      });
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2500);
    } catch {
      setSaveStatus("idle");
    }
  });

  // ── Input shared styles ──────────────────────────────────────────────────

  const fieldLabel = "text-[9px] font-black uppercase tracking-[0.4em] text-black/50 mb-1.5 block";
  const fieldInput = "bg-[#F5F0E8] border-black/10 rounded-xl h-10 text-xs font-bold text-[#0D0D0D] placeholder:text-black/20 focus-visible:ring-[#C94A2C]";
  const fieldTextarea = "bg-[#F5F0E8] border-black/10 rounded-xl text-xs font-medium text-[#0D0D0D] placeholder:text-black/20 focus-visible:ring-[#C94A2C] min-h-[80px] resize-none leading-relaxed";

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-[#F5F0E8] overflow-hidden">

      {/* ── TOP BAR ──────────────────────────────────────────────────────── */}
      <header className="flex items-center h-14 px-6 bg-white/90 backdrop-blur-md border-b border-black/5 shrink-0 z-50 gap-4">
        <button
          onClick={() => navigate("/management/volumes")}
          className="flex items-center gap-1.5 text-black/40 hover:text-[#C94A2C] transition-colors group"
        >
          <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
          <span className="text-[9px] font-black uppercase tracking-[0.3em] hidden sm:inline">Registry</span>
        </button>

        <div className="h-5 w-px bg-black/10" />

        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#C94A2C]">KŌDĒ</span>
          {isMobile && (
            <span className="text-[7px] font-black uppercase tracking-widest text-black/30 -mt-0.5">Mobile_Lite</span>
          )}
        </div>

        <div className="h-5 w-px bg-black/10" />

        {/* Inline title */}
        <input
          {...form.register("title")}
          placeholder="Untitled Project"
          className="flex-1 bg-transparent border-none outline-none text-sm font-black text-[#0D0D0D] placeholder:text-black/20 tracking-tight min-w-0"
        />

        <div className="flex items-center gap-3 ml-auto shrink-0">
          {/* Publish status */}
          <button
            type="button"
            onClick={() => form.setValue("isPublished", !watchPublished)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all",
              watchPublished
                ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                : "bg-black/5 border-black/10 text-black/40 hover:bg-black/10"
            )}
          >
            {watchPublished ? <Globe size={12} /> : <Lock size={12} />}
            <span className="hidden sm:inline">{watchPublished ? "Published" : "Draft"}</span>
          </button>

          <Button
            onClick={handleSubmit}
            disabled={isLoading || saveStatus === "saving"}
            className={cn(
              "h-9 px-4 sm:px-6 rounded-full text-[9px] font-black uppercase tracking-widest transition-all shadow-sm",
              saveStatus === "saved"
                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                : "bg-[#0D0D0D] hover:bg-[#C94A2C] text-white"
            )}
          >
            {saveStatus === "saving" ? (
              <span className="flex items-center gap-2"><Loader2 size={13} className="animate-spin" /> <span className="hidden sm:inline">Saving...</span></span>
            ) : saveStatus === "saved" ? (
              <span className="flex items-center gap-2"><Check size={13} /> <span className="hidden sm:inline">Saved</span></span>
            ) : (
              <span className="flex items-center gap-2"><Save size={13} /> <span className="hidden sm:inline">Save</span></span>
            )}
          </Button>

          {/* Mobile menu toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button
               onClick={() => setMobileActivePanel(mobileActivePanel === 'meta' ? 'none' : 'meta')}
               className={cn("w-9 h-9 rounded-full flex items-center justify-center transition-all", mobileActivePanel === 'meta' ? "bg-[#C94A2C] text-white" : "bg-black/5 text-black/40")}
            >
              <Settings size={16} />
            </button>
            <button
               onClick={() => setMobileActivePanel(mobileActivePanel === 'actions' ? 'none' : 'actions')}
               className={cn("w-9 h-9 rounded-full flex items-center justify-center transition-all", mobileActivePanel === 'actions' ? "bg-[#C94A2C] text-white" : "bg-black/5 text-black/40")}
            >
               <Menu size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* ── BODY ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* LEFT METADATA RAIL ─────────────────────────────────────────────── */}
        <aside
          className={cn(
            "bg-white border-r border-black/5 flex flex-col transition-all duration-300 shrink-0 overflow-hidden",
            "lg:relative fixed inset-y-0 left-0 z-[60] pt-14 lg:pt-0",
            leftOpen ? "w-72" : "w-0",
            // Mobile visibility override
            mobileActivePanel === "meta" ? "w-72 shadow-2xl translate-x-0" : "lg:translate-x-0 -translate-x-full lg:w-72",
            !leftOpen && "lg:w-0"
          )}
        >
          <div className="flex-1 overflow-y-auto p-6 space-y-5 min-w-[288px]">
            {/* Cover image */}
            <div>
              <label className={fieldLabel}>Cover Image</label>
              <CoverUploader url={coverImage} onChange={setCoverImage} />
            </div>

            <div className="h-px bg-black/5" />

            {/* Type */}
            <div>
              <label className={fieldLabel}>Volume Type</label>
              <Select
                onValueChange={(v) => form.setValue("volumeType", v as any)}
                defaultValue={form.getValues("volumeType")}
              >
                <SelectTrigger className={cn(fieldInput, "w-full")}>
                  <SelectValue placeholder="Select Type..." />
                </SelectTrigger>
                <SelectContent className="bg-white border-black/5 rounded-2xl">
                  {["article", "masterclass"].map((c) => (
                    <SelectItem key={c} value={c} className="text-xs font-bold uppercase tracking-widest">{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Category / Read Time */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={fieldLabel}>Category</label>
                <Input {...form.register("category")} placeholder="E.g. Strategy" className={fieldInput} />
              </div>
              <div>
                 <label className={fieldLabel}>Time To Read</label>
                 <Input {...form.register("timeToRead")} placeholder="E.g. 5 min read" className={fieldInput} />
              </div>
            </div>

            {/* Writer name */}
            <div>
              <label className={fieldLabel}>Writer Name</label>
              <Input {...form.register("writer")} placeholder="E.g. KING Editorial Team" className={fieldInput} />
            </div>

            {/* Writer avatar */}
            <div>
              <label className={fieldLabel}>Writer Avatar URL</label>
              <Input {...form.register("writerAvatar")} placeholder="https://..." className={fieldInput} />
            </div>

            {/* Date of publishing */}
            <div>
              <label className={fieldLabel}>Date of Publishing</label>
              <Input {...form.register("publishedAt")} placeholder="E.g. September 18, 2025" className={fieldInput} />
            </div>

            {/* Volume Number (if masterclass) */}
            {watchVolumeType === "masterclass" && (
              <div>
                <label className={fieldLabel}>Volume Number</label>
                <Input {...form.register("volumeNumber")} placeholder="E.g. Volume I" className={fieldInput} />
              </div>
            )}

            {/* Summary */}
            <div>
              <label className={fieldLabel}>Executive Summary</label>
              <Textarea {...form.register("summary")} placeholder="Tactical overview of this session..." className={fieldTextarea} />
            </div>

            {/* Goal */}
            <div>
              <label className={fieldLabel}>Objective / Goal</label>
              <Input {...form.register("goal")} placeholder="E.g. Position KING as..." className={fieldInput} />
            </div>

            {/* Slug */}
            <div>
              <label className={fieldLabel}>Web Slug</label>
              <Input {...form.register("slug")} placeholder="E.g. brand-systems" className={fieldInput} />
            </div>

            <div className="h-px bg-black/5" />

            {/* Background Image */}
            <div>
              <label className={fieldLabel}>Dynamic Background Photo</label>
              <CoverUploader url={bgImageUrl} onChange={handleBgImageChange} />
              <p className="text-[8px] font-bold text-black/30 mt-1.5 uppercase tracking-widest">Auto text contrast applied</p>
            </div>

            <div className="h-px bg-black/5" />

            {/* Metadata Toggles */}
            <div className="space-y-4">
              <label className={fieldLabel}>Visibility Protocols</label>
              
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#0D0D0D]">Set as Latest Post</span>
                <Switch
                  checked={form.watch("isLatest")}
                  onCheckedChange={(c) => form.setValue("isLatest", c)}
                  className="data-[state=checked]:bg-[#C94A2C]"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#0D0D0D]">Featured</span>
                <Switch
                  checked={form.watch("isFeatured")}
                  onCheckedChange={(c) => form.setValue("isFeatured", c)}
                  className="data-[state=checked]:bg-[#C94A2C]"
                />
              </div>
            </div>
          </div>
        </aside>

        {/* Toggle left rail button */}
        <button
          onClick={() => setLeftOpen((o) => !o)}
          className="absolute left-0 top-1/2 z-40 -translate-y-1/2 w-5 h-12 bg-white border border-black/5 border-l-0 rounded-r-xl hidden lg:flex items-center justify-center text-black/30 hover:text-[#C94A2C] hover:bg-[#F5F0E8] transition-all shadow-sm"
          style={{ left: leftOpen ? "288px" : "0" }}
        >
          {leftOpen ? <ChevronLeft size={12} /> : <ChevronRight size={12} />}
        </button>

        {/* CENTER CANVAS ──────────────────────────────────────────────────── */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-6 py-12">

            {displayBlocks.length === 0 ? (
              /* ── Empty state ── */
              <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-black tracking-tighter text-[#0D0D0D] mb-3 px-4">
                  Start building your project:
                </h2>
                <p className="text-xs md:text-sm text-black/40 font-medium mb-8 md:mb-12">Add content blocks from the panel on the right →</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-lg mx-auto md:max-w-none">
                  {activeModules.map(({ type, label, icon: Icon, color }) => (
                    <button
                      key={type}
                      onClick={() => addBlock(type)}
                      className="flex flex-col items-center gap-3 p-5 bg-white rounded-2xl border border-black/5 hover:border-black/20 hover:shadow-md transition-all group"
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors group-hover:scale-110 duration-200"
                        style={{ backgroundColor: `${color}15` }}
                      >
                        <Icon size={22} style={{ color }} />
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-black/50 group-hover:text-[#0D0D0D] transition-colors">{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* ── Canvas with blocks ── */
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="blocks">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                      {displayBlocks.map((block, index) => (
                        <Draggable key={block.id} draggableId={block.id} index={index}>
                          {(provided, snapshot) => (
                            <CanvasBlock
                              block={block}
                              index={index}
                              onUpdate={updateBlock}
                              onRemove={removeBlock}
                              isDragging={snapshot.isDragging}
                              provided={provided}
                              isMobile={isMobile}
                            />
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}

                      {/* Inline add block row */}
                      <div className="flex flex-wrap gap-2 pt-4 pb-2">
                        {activeModules.map(({ type, label, icon: Icon, color }) => (
                          <button
                            key={type}
                            onClick={() => addBlock(type)}
                            className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-black/5 hover:border-black/20 hover:shadow-sm transition-all text-[9px] font-black uppercase tracking-widest text-black/40 hover:text-[#0D0D0D] group"
                          >
                            <Icon size={12} style={{ color }} className="group-hover:scale-110 transition-transform" />
                            {label}
                          </button>
                        ))}
                      </div>

                      <div className="h-32" />
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </div>
        </main>

        {/* RIGHT ACTION PANEL ─────────────────────────────────────────────── */}
        <aside
          className={cn(
            "w-56 bg-white border-l border-black/5 flex flex-col shrink-0 overflow-y-auto",
            "lg:relative fixed inset-y-0 right-0 z-[60] pt-14 lg:pt-0 transition-all duration-300",
            // Mobile visibility override
            mobileActivePanel === "actions" ? "w-56 shadow-2xl translate-x-0" : "translate-x-full lg:translate-x-0 lg:w-56"
          )}
        >
          {/* Mobile close button overlay (scrim-like) */}
          {mobileActivePanel !== 'none' && (
             <div className="lg:hidden fixed inset-0 z-[-1] bg-black/20 backdrop-blur-sm" onClick={() => setMobileActivePanel('none')} />
          )}

          {/* Add Content */}
          <div className="border-b border-black/5">
            <button
              onClick={() => setActiveSection(activeSection === "add" ? null : "add")}
              className="w-full flex items-center justify-between px-4 py-3.5 text-[9px] font-black uppercase tracking-[0.3em] text-black/60 hover:text-[#0D0D0D] transition-colors"
            >
              Add Content
              <ChevronRight size={12} className={cn("transition-transform", activeSection === "add" && "rotate-90")} />
            </button>
            {activeSection === "add" && (
              <div className="px-3 pb-4 grid grid-cols-2 gap-2">
                {activeModules.map(({ type, label, icon: Icon, color }) => (
                  <button
                    key={type}
                    onClick={() => addBlock(type)}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl border border-black/5 hover:border-black/15 hover:bg-[#F5F0E8]/60 transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}12` }}>
                      <Icon size={16} style={{ color }} />
                    </div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-black/40 group-hover:text-[#0D0D0D] transition-colors text-center leading-tight">{label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Edit Project */}
          <div className="border-b border-black/5">
            <button
              onClick={() => setActiveSection(activeSection === "settings" ? null : "settings")}
              className="w-full flex items-center justify-between px-4 py-3.5 text-[9px] font-black uppercase tracking-[0.3em] text-black/60 hover:text-[#0D0D0D] transition-colors"
            >
              Edit Project
              <ChevronRight size={12} className={cn("transition-transform", activeSection === "settings" && "rotate-90")} />
            </button>
            {activeSection === "settings" && (
              <div className="px-3 pb-4 space-y-2">
                <button className="w-full flex items-center gap-3 p-3 rounded-xl border border-black/5 hover:bg-[#F5F0E8]/60 hover:border-black/15 transition-all group text-left" onClick={() => setLeftOpen(true)}>
                  <Settings size={14} className="text-black/30 group-hover:text-[#C94A2C] transition-colors" />
                  <span className="text-[8px] font-black uppercase tracking-widest text-black/40 group-hover:text-[#0D0D0D] transition-colors">Settings</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-xl border border-black/5 hover:bg-[#F5F0E8]/60 hover:border-black/15 transition-all group text-left" onClick={() => setLeftOpen(true)}>
                  <Palette size={14} className="text-black/30 group-hover:text-[#C94A2C] transition-colors" />
                  <span className="text-[8px] font-black uppercase tracking-widest text-black/40 group-hover:text-[#0D0D0D] transition-colors">Styles</span>
                </button>
              </div>
            )}
          </div>

          {/* Attach Assets - Desktop Only */}
          {!isMobile && (
            <div className="border-t border-black/5 mt-4">
              <div className="px-4 py-3.5">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-black/60">Attach Assets</span>
              </div>
              <div className="px-3 pb-4">
                <div className="rounded-xl border-2 border-dashed border-black/8 p-5 flex flex-col items-center text-center gap-2">
                  <Paperclip size={18} className="text-black/20" />
                  <p className="text-[8px] font-bold text-black/30 leading-relaxed">
                    Add fonts, zips, templates as free or paid downloads
                  </p>
                  <button
                    onClick={() => addBlock("pdf")}
                    className="mt-1 px-3 py-1.5 bg-[#F5F0E8] rounded-full text-[8px] font-black uppercase tracking-widest text-black/50 hover:text-[#C94A2C] hover:bg-[#F5F0E8] transition-colors border border-black/5"
                  >
                    + Add PDF
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Block count */}
          <div className="mt-auto px-4 py-4 border-t border-black/5">
            <div className="text-[8px] font-black uppercase tracking-widest text-black/20">
              {blocks.length} block{blocks.length !== 1 ? "s" : ""} in canvas
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
