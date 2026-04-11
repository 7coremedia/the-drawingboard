import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { VolumeRecord } from "@/types/volume";
import { EditorialBlock } from "@/types/blocks";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Loader2, Archive, Activity, PenTool, Hash, UserCircle, Globe, Settings2, LayoutGrid } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import EnhancedMediaUpload from "./EnhancedMediaUpload";
import VolumeEditorialBuilder from "./VolumeEditorialBuilder";

interface MediaFile {
  id: string;
  url: string;
  type: 'image' | 'video' | 'gif' | 'pdf';
  name: string;
}

export const volumeFormSchema = z.object({
  volumeNumber: z.string().min(1, "Required"),
  slug: z.string().min(1, "Required"),
  title: z.string().min(1, "Required"),
  writer: z.string().min(1, "Required"),
  goal: z.string().min(1, "Required"),
  summary: z.string().min(1, "Required"),
  heroImageUrl: z.string().optional(),
  heroImageOrientation: z.enum(['portrait', 'landscape']).optional().default('portrait'),
  orderIndex: z.coerce.number().int().min(0),
  isPublished: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  isLatest: z.boolean().default(false),
  content: z.array(z.any()).min(1),
});

export type VolumeFormValues = z.infer<typeof volumeFormSchema>;

const slugify = (value: string) =>
  value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const hydrateContent = (content?: any[]): EditorialBlock[] => {
    if (!content || content.length === 0) return [];
    if (typeof content[0] === 'object' && content[0].type) return content as EditorialBlock[];
    return content.map((str, idx) => ({
        id: `legacy-${idx}`,
        type: idx === 0 ? 'text' : 'registry_highlight',
        content: idx === 0 ? `<p>${str}</p>` : str,
        style: 'default'
    }));
};

interface VolumeFormProps {
  initialData?: VolumeRecord | null;
  defaultOrderIndex?: number;
  isSubmitting?: boolean;
  submitLabel?: string;
  onSubmit: (payload: any) => Promise<void>;
  onCancel?: () => void;
  className?: string;
}

export default function VolumeForm({
  initialData,
  defaultOrderIndex = 0,
  isSubmitting = false,
  onSubmit,
  onCancel,
  className,
}: VolumeFormProps) {
  const inputClasses = "bg-white border-black/[0.03] rounded-xl h-11 text-sm font-bold tracking-tight text-[#0D0D0D] placeholder:text-black/10 focus-visible:ring-[#C94A2C] focus-visible:ring-offset-0 transition-all w-full shadow-sm";
  const labelClasses = "text-[8px] uppercase tracking-[0.45em] font-black text-black/30 mb-2 block";
  
  const volumeId = initialData?.id;
  const storageKey = useMemo(() => (volumeId ? `volume-form-draft:${volumeId}` : "volume-form-draft:new"), [volumeId]);
  
  const isHydratingRef = useRef(false);
  const [currentCover, setCurrentCover] = useState<MediaFile | null>(null);
  const [contentBlocks, setContentBlocks] = useState<EditorialBlock[]>(hydrateContent(initialData?.content));

  const form = useForm<VolumeFormValues>({
    resolver: zodResolver(volumeFormSchema),
    defaultValues: {
      volumeNumber: initialData?.volumeNumber ?? "",
      slug: initialData?.slug ?? "",
      title: initialData?.title ?? "",
      writer: initialData?.writer ?? "",
      goal: initialData?.goal ?? "",
      summary: initialData?.summary ?? "",
      heroImageUrl: initialData?.heroImageUrl ?? "",
      heroImageOrientation: initialData?.heroImageOrientation ?? "portrait",
      orderIndex: initialData?.orderIndex ?? defaultOrderIndex,
      isPublished: initialData?.isPublished ?? false,
      isFeatured: initialData?.isFeatured ?? false,
      isLatest: initialData?.isLatest ?? false,
      content: hydrateContent(initialData?.content),
    },
  });

  const { control, watch, setValue, handleSubmit } = form;

  useEffect(() => { setValue('content', contentBlocks, { shouldDirty: true }); }, [contentBlocks, setValue]);

  useEffect(() => {
    if (initialData?.heroImageUrl && !currentCover) {
      setCurrentCover({ id: 'initial', url: initialData.heroImageUrl, type: 'image', name: 'Cover' });
    }
  }, [initialData, currentCover]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const rawDraft = window.localStorage.getItem(storageKey);
    if (!rawDraft) return;
    try {
      const parsed = JSON.parse(rawDraft) as Partial<VolumeFormValues>;
      isHydratingRef.current = true;
      form.reset({ ...form.getValues(), ...parsed });
      if (parsed.content) setContentBlocks(parsed.content);
      if (parsed.heroImageUrl) setCurrentCover({ id: 'draft', url: parsed.heroImageUrl, type: 'image', name: 'Draft' });
    } catch (e) { window.localStorage.removeItem(storageKey); } finally { isHydratingRef.current = false; }
  }, [form, storageKey]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const subscription = watch((values) => {
      if (isHydratingRef.current) return;
      window.localStorage.setItem(storageKey, JSON.stringify(values));
    });
    return () => subscription.unsubscribe();
  }, [watch, storageKey]);

  const titleValue = watch("title");
  const slugValue = watch("slug");
  useEffect(() => {
    if (!initialData && titleValue && !slugValue) setValue("slug", slugify(titleValue), { shouldDirty: true });
  }, [initialData, titleValue, slugValue, setValue]);

  const submitHandler = async (values: VolumeFormValues) => {
    await onSubmit({ ...values, heroImageUrl: currentCover?.url || undefined, heroImageOrientation: values.heroImageOrientation, content: values.content as EditorialBlock[] });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(submitHandler)} className={`space-y-16 pb-32 max-w-[1500px] mx-auto ${className || ''}`}>
        
        {/* Cinematic Deployment Bar */}
        <div className="flex items-center justify-between border-b border-black/5 pb-10">
            <div className="flex items-center gap-6">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-black/5 shadow-sm">
                    <Archive size={16} className="text-[#C94A2C]" />
                </div>
                <div className="space-y-1">
                    <h2 className="text-sm font-black uppercase tracking-[0.6em] text-black/20">Archival Registry</h2>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black/60">Sequence 00{watch('volumeNumber') || 'XX'}</p>
                </div>
            </div>
            
            <div className="flex items-center gap-4">
                <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-[#0D0D0D] hover:bg-[#C94A2C] text-white px-10 h-14 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-xl"
                >
                    {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : "Publish Record"}
                </Button>
                {onCancel && (
                    <Button type="button" variant="ghost" onClick={onCancel} className="text-[9px] font-black uppercase tracking-widest text-black/30 hover:text-black">
                        Dismiss
                    </Button>
                )}
            </div>
        </div>

        {/* Master Identity Protocol Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* LHS: Primary Identity (Wide) */}
            <div className="lg:col-span-8 space-y-12">
                
                {/* Huge Display Title */}
                <FormField
                    control={control}
                    name="title"
                    render={({ field }) => (
                        <FormItem className="space-y-4">
                            <FormLabel className={labelClasses}>Edition Title Protocol</FormLabel>
                            <FormControl>
                                <Input 
                                    className="border-none bg-transparent h-auto p-0 text-5xl md:text-6xl font-display font-black tracking-tighter uppercase focus-visible:ring-0 placeholder:text-black/[0.03]" 
                                    placeholder="Enter Title" 
                                    {...field} 
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-black/5">
                    <FormField
                        control={control}
                        name="summary"
                        render={({ field }) => (
                            <FormItem className="md:col-span-2">
                                <FormLabel className={labelClasses}>Executive Summary</FormLabel>
                                <FormControl>
                                    <Textarea 
                                        className="bg-black/[0.015] border-black/[0.03] rounded-3xl min-h-[140px] p-8 text-base font-medium leading-relaxed shadow-inner focus-visible:ring-[#C94A2C] resize-none" 
                                        placeholder="Tactical overview of this session..." 
                                        {...field} 
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <div className="space-y-6">
                        <FormField
                            control={control}
                            name="writer"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={labelClasses}><UserCircle size={10} className="inline mr-2" /> Author</FormLabel>
                                    <FormControl><Input className={cn(inputClasses, "bg-black/[0.01]")} {...field} /></FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="volumeNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={labelClasses}><Hash size={10} className="inline mr-2" /> Rank</FormLabel>
                                    <FormControl><Input className={cn(inputClasses, "bg-black/[0.01]")} {...field} /></FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="space-y-6">
                        <FormField
                            control={control}
                            name="slug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={labelClasses}><Globe size={10} className="inline mr-2" /> Web Slug</FormLabel>
                                    <FormControl><Input className={cn(inputClasses, "font-mono text-[10px] bg-black/[0.01]")} {...field} /></FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="goal"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={labelClasses}><Activity size={10} className="inline mr-2" /> Objective</FormLabel>
                                    <FormControl><Input className={cn(inputClasses, "bg-black/[0.01]")} {...field} /></FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                {/* Sub-Header Settings */}
                <div className="flex flex-wrap items-center gap-6 pt-10 border-t border-black/5">
                    <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-black/[0.03] shadow-sm">
                        <span className="text-[10px] font-black uppercase text-black/40 mr-2 tracking-widest">Visibility</span>
                        <FormField control={control} name="isPublished" render={({ field }) => (
                            <div className="flex items-center gap-2">
                                <span className="text-[8px] font-black uppercase text-black/60">Live</span>
                                <Switch checked={field.value} onCheckedChange={field.onChange} className="data-[state=checked]:bg-[#C94A2C] scale-90" />
                            </div>
                        )} />
                        <div className="w-px h-4 bg-black/5 mx-2" />
                        <FormField control={control} name="isFeatured" render={({ field }) => (
                            <div className="flex items-center gap-2">
                                <span className="text-[8px] font-black uppercase text-black/60">Featured</span>
                                <Switch checked={field.value} onCheckedChange={field.onChange} className="data-[state=checked]:bg-[#C94A2C] scale-90" />
                            </div>
                        )} />
                    </div>
                    
                    <FormField control={control} name="orderIndex" render={({ field }) => (
                        <div className="flex items-center gap-3 ml-auto">
                            <span className="text-[9px] font-black uppercase tracking-widest text-black/30">Registry_Order</span>
                            <Input className="w-14 h-10 bg-white border-black/[0.03] text-center text-[10px] font-black rounded-lg shadow-sm" type="number" {...field} />
                        </div>
                    )} />
                </div>
            </div>

            {/* RHS: Compact Visual Registry (Narrow) */}
            <div className="lg:col-span-4 space-y-6">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 px-2">
                        <LayoutGrid size={14} className="text-[#C94A2C]" />
                        <span className="text-[10px] font-black uppercase tracking-[0.6em] text-black/40">Clinical Source</span>
                    </div>
                    <div className="rounded-[2.5rem] bg-white border border-black/5 p-4 shadow-sm min-h-[300px] flex items-center justify-center overflow-hidden">
                        <div className="w-full scale-90 origin-center">
                            <EnhancedMediaUpload 
                                coverImage={currentCover || undefined}
                                onCoverChange={(file) => {
                                    setCurrentCover(file);
                                    setValue("heroImageUrl", file?.url || "", { shouldDirty: true });
                                }}
                                onMediaFilesChange={() => {}}
                                maxFiles={1}
                                acceptedTypes={['image/*']}
                            />
                        </div>
                    </div>
                    <FormField
                        control={control}
                        name="heroImageOrientation"
                        render={({ field }) => (
                            <FormItem className="px-2 mt-4">
                                <FormLabel className={labelClasses}>Orientation Mode</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value || 'portrait'}>
                                    <FormControl>
                                        <SelectTrigger className="bg-white border-black/5 rounded-xl h-11 text-xs font-bold uppercase tracking-widest text-[#0D0D0D]">
                                            <SelectValue placeholder="Select ratio" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="portrait" className="text-xs font-medium uppercase tracking-widest">Portrait (4:5)</SelectItem>
                                        <SelectItem value="landscape" className="text-xs font-medium uppercase tracking-widest">Landscape (16:9)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                    <p className="text-[8px] font-black uppercase tracking-[0.5em] text-black/20 text-center px-8">
                       Recommended aspect ratio mapping: 4:5 or 16:9 Clinical Standards.
                    </p>
                </div>
            </div>
        </div>

        {/* Editorial Action Area */}
        <div className="space-y-10 pt-16 border-t border-black/5">
            <div className="flex items-center gap-6 px-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-black/5">
                    <PenTool size={20} className="text-[#C94A2C]" />
                </div>
                <div className="space-y-0.5">
                    <h3 className="text-xl font-display font-black tracking-tighter uppercase text-[#0D0D0D]">Editorial Workspace</h3>
                    <p className="text-[9px] font-black uppercase tracking-[0.5em] text-black/30">Construct modular sequence</p>
                </div>
            </div>
            <VolumeEditorialBuilder blocks={contentBlocks} onChange={setContentBlocks} />
        </div>
      </form>
    </Form>
  );
}
