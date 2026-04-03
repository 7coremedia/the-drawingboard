import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PartnerManager from "./PartnerManager";
import EnhancedMediaUpload from "./EnhancedMediaUpload";
import PortfolioBlockBuilder, { PortfolioBlock } from "./PortfolioBlockBuilder";
import { supabase } from "@/integrations/supabase/client";
import { ClipboardList, Archive, ShieldCheck, Activity, Database, FileUp, Network } from "lucide-react";
import { cn } from "@/lib/utils";

const portfolioSchema = z.object({
  title: z.string().min(1, "Title is required"),
  client: z.string().optional(),
  category: z.enum(["Branding", "Logo", "Poster", "Other"]),
  industry: z.string().optional(),
  location: z.string().optional(),
  the_challenge: z.string().optional(),
  the_solution: z.string().optional(),
  description: z.string().optional(),
  notes: z.any().optional(),
  is_notes_downloadable: z.boolean().default(true),
  tagline: z.string().min(1, "Tagline is required"),
  year: z.string().optional(),
  is_published: z.boolean().default(true),
  is_multiple_partners: z.boolean().default(false),
  brand_name: z.string().optional(),
});

type PortfolioFormData = z.infer<typeof portfolioSchema>;

interface MediaFile {
  id: string;
  url: string;
  type: 'image' | 'video' | 'gif' | 'pdf';
  name: string;
  size?: number;
}

interface CreatePortfolioFormV2Props {
  onSubmit: (data: PortfolioFormData & { 
    media_url: string; 
    full_image_url?: string;
    media_files?: MediaFile[];
    industry?: string;
    location?: string;
    our_role?: string;
    the_solution?: string;
    description?: string;
    notes?: any;
    is_notes_downloadable?: boolean;
    portfolio_type: 'gallery' | 'case_study';
    pdf_url?: string | null;
    partners?: Array<{ name: string; social_name: string; social_link: string; image_url: string }>;
    content_blocks?: any;
  }) => Promise<void>;
  isLoading?: boolean;
  initialData?: Partial<PortfolioFormData> & {
    media_url?: string;
    full_image_url?: string;
    media_files?: MediaFile[];
    industry?: string;
    location?: string;
    our_role?: string;
    the_solution?: string;
    description?: string;
    notes?: any;
    is_notes_downloadable?: boolean;
    portfolio_type?: 'gallery' | 'case_study';
    pdf_url?: string | null;
    partners?: Array<{ name: string; social_name: string; social_link: string; image_url: string }>;
    content_blocks?: any;
  };
}

export default function CreatePortfolioFormV2({ 
  onSubmit, 
  isLoading, 
  initialData 
}: CreatePortfolioFormV2Props) {
  const [coverImage, setCoverImage] = useState<MediaFile | null>(() => {
    if (initialData?.media_url) {
      return {
        id: 'existing-cover',
        url: initialData.media_url,
        type: 'image',
        name: 'Cover Image',
      };
    }
    return null;
  });

  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>(
    initialData?.media_files || []
  );

  const [mode, setMode] = useState<'gallery' | 'case_study'>(initialData?.portfolio_type || 'gallery');
  const [contentBlocks, setContentBlocks] = useState<PortfolioBlock[]>(
      (initialData?.content_blocks as PortfolioBlock[]) || []
  );
  const [pdfFile, setPdfFile] = useState<{ url: string; name: string; size?: number } | null>(
    initialData?.pdf_url ? { url: initialData.pdf_url, name: 'Case Study', size: undefined } : null
  );

  const [partners, setPartners] = useState<Array<{
    name: string;
    social_name: string;
    social_link: string;
    image_url: string;
  }>>(initialData?.partners || []);
  const form = useForm<PortfolioFormData>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      client: initialData?.client ?? "",
      category: initialData?.category ?? "Branding",
      tagline: initialData?.tagline ?? "",
      year: initialData?.year ?? "",
      industry: initialData?.industry ?? "",
      location: initialData?.location ?? "",
      our_role: initialData?.our_role ?? "",
      the_challenge: initialData?.the_challenge ?? "",
      the_solution: initialData?.the_solution ?? "",
      description: initialData?.description ?? "",
      notes: initialData?.notes,
      is_notes_downloadable: initialData?.is_notes_downloadable ?? true,
      is_published: initialData?.is_published ?? true,
      is_multiple_partners: initialData?.is_multiple_partners ?? false,
      brand_name: initialData?.brand_name ?? "",
    }
  });

  const watchIsMultiplePartners = form.watch("is_multiple_partners");

  const onFormSubmit = async (data: PortfolioFormData) => {
    if (!coverImage?.url) {
      alert('Security Protocol: Cover mapping required.');
      return;
    }

    if (mode === 'case_study' && !pdfFile?.url) {
      alert('Security Protocol: Case Study PDF source required.');
      return;
    }

    await onSubmit({
      ...data,
      media_url: coverImage.url,
      full_image_url: coverImage.url,
      media_files: mode === 'gallery' ? mediaFiles : [],
      industry: data.industry,
      location: data.location,
      our_role: data.our_role,
      the_solution: data.the_solution,
      description: data.description,
      notes: data.notes,
      is_notes_downloadable: data.is_notes_downloadable,
      portfolio_type: mode,
      pdf_url: mode === 'case_study' ? (pdfFile?.url || null) : null,
      partners: partners.filter(p => p.name.trim() !== ''),
      content_blocks: mode === 'gallery' ? contentBlocks : null,
    });
  };

  const uploadPdf = async (file: File) => {
    const ext = file.name.split('.').pop();
    const name = `${Math.random().toString(36).slice(2)}.${ext}`;
    const { data, error } = await supabase.storage.from('portfolio-assets').upload(name, file);
    if (error) throw error;
    const { data: pub } = supabase.storage.from('portfolio-assets').getPublicUrl(data.path);
    return pub.publicUrl;
  };

  const inputClasses = "bg-[#F5F0E8] border-black/10 rounded-2xl h-14 text-sm font-bold tracking-tight text-[#0D0D0D] placeholder:text-black/20 focus-visible:ring-[#C94A2C] focus-visible:ring-offset-0 transition-all";
  const labelClasses = "text-[10px] uppercase tracking-[0.4em] font-black text-black/60 mb-3 block";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Left Side - Form */}
      <div className="space-y-12">
        <Card className="bg-white border-black/[0.05] p-10 md:p-16 rounded-[4rem] shadow-2xl shadow-black/5 space-y-12 h-fit">
          <div className="flex items-center justify-between border-b border-black/5 pb-8">
              <div className="space-y-3">
                  <h2 className="text-3xl font-display font-black tracking-tighter uppercase flex items-center gap-4 text-[#0D0D0D]">
                      <Archive size={28} className="text-[#C94A2C]" />
                      Entry Details
                  </h2>
                  <p className="text-[10px] uppercase tracking-[0.4em] font-black text-black/60">Operational_Sequence_01</p>
              </div>
          </div>

          <Tabs value={mode} onValueChange={(v) => setMode(v as any)} className="w-full">
            <TabsList className="grid grid-cols-2 w-full h-16 bg-[#F5F0E8] rounded-2.5xl p-2">
              <TabsTrigger value="gallery" className="rounded-2xl text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-[#0D0D0D]">Clinical Exhibit</TabsTrigger>
              <TabsTrigger value="case_study" className="rounded-2xl text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-[#0D0D0D]">Case Study Archive</TabsTrigger>
            </TabsList>
          </Tabs>

          <Form {...form}>
          <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-10">
            {/* Title */}
            <FormField control={form.control} name="title" render={({ field }) => (
              <FormItem>
                  <FormLabel className={labelClasses}>Project Label *</FormLabel>
                  <FormControl>
                      <Input placeholder="Registry Title" className={inputClasses} {...field} />
                  </FormControl>
                  <FormMessage />
              </FormItem>
            )} />

            {/* Client */}
            <FormField control={form.control} name="client" render={({ field }) => (
              <FormItem>
                  <FormLabel className={labelClasses}>Clinical Client</FormLabel>
                  <FormControl>
                      <Input placeholder="Entity Name" className={inputClasses} {...field} />
                  </FormControl>
                  <FormMessage />
              </FormItem>
            )} />

            {/* Category and Year */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField control={form.control} name="category" render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClasses}>Exhibit Category *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger className={inputClasses}>
                            <SelectValue placeholder="Select Sector" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white border-black/5 rounded-2xl">
                      <SelectItem value="Branding" className="text-xs font-bold uppercase tracking-widest">Branding</SelectItem>
                      <SelectItem value="Logo" className="text-xs font-bold uppercase tracking-widest">Logo</SelectItem>
                      <SelectItem value="Poster" className="text-xs font-bold uppercase tracking-widest">Poster</SelectItem>
                      <SelectItem value="Other" className="text-xs font-bold uppercase tracking-widest">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="year" render={({ field }) => (
                <FormItem>
                    <FormLabel className={labelClasses}>Primary Outcome (Results)</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g. +45% Conversion Lift..." className={inputClasses} {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
              )} />
            </div>

            {/* Tagline */}
            <FormField control={form.control} name="tagline" render={({ field }) => (
              <FormItem>
                  <FormLabel className={labelClasses}>Strategic Tagline *</FormLabel>
                  <FormControl>
                      <Textarea placeholder="Core project statement..." className={cn(inputClasses, "min-h-[100px] py-4")} {...field} />
                  </FormControl>
                  <FormMessage />
              </FormItem>
            )} />

            {/* About Project Section */}
            <div className="space-y-8 pt-6 border-t border-black/5">
                <div className="space-y-2">
                    <h3 className="text-xl font-display font-black tracking-tighter uppercase flex items-center gap-3">
                        <Activity size={20} className="text-[#C94A2C]" />
                        Project Analytics
                    </h3>
                    <p className="text-[9px] uppercase tracking-[0.4em] font-black text-black/60">Operational_Sequence_02</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField control={form.control} name="industry" render={({ field }) => (
                    <FormItem>
                        <FormLabel className={labelClasses}>Vertical</FormLabel>
                        <FormControl><Input placeholder="Sector Economy" className={inputClasses} {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="location" render={({ field }) => (
                    <FormItem>
                        <FormLabel className={labelClasses}>Geographic Scope</FormLabel>
                        <FormControl><Input placeholder="Operational Radius" className={inputClasses} {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="our_role" render={({ field }) => (
                  <FormItem>
                      <FormLabel className={labelClasses}>Clinical Role</FormLabel>
                      <FormControl><Input placeholder="Strategic Capacity" className={inputClasses} {...field} /></FormControl>
                      <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="the_challenge" render={({ field }) => (
                  <FormItem>
                      <FormLabel className={labelClasses}>Diagnostic (Before)</FormLabel>
                      <FormControl><Textarea placeholder="Diagnostic complication..." className={cn(inputClasses, "min-h-[120px] py-4")} {...field} /></FormControl>
                      <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="the_solution" render={({ field }) => (
                  <FormItem>
                      <FormLabel className={labelClasses}>Strategy & Transformation</FormLabel>
                      <FormControl><Textarea placeholder="Clinical mitigation..." className={cn(inputClasses, "min-h-[120px] py-4")} {...field} /></FormControl>
                      <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem>
                      <FormLabel className={labelClasses}>Digital & Growth Execution</FormLabel>
                      <FormControl><Textarea placeholder="Digital and growth metrics/strategy..." className={cn(inputClasses, "min-h-[120px] py-4")} {...field} /></FormControl>
                      <FormMessage />
                  </FormItem>
                )} />
            </div>

            {/* Project Notes Section */}
            <div className="space-y-8 pt-6 border-t border-black/5">
                <div className="space-y-2">
                    <h3 className="text-xl font-display font-black tracking-tighter uppercase flex items-center gap-3">
                        <ClipboardList size={20} className="text-[#C94A2C]" />
                        Operational Notes
                    </h3>
                    <p className="text-[9px] uppercase tracking-[0.4em] font-black text-black/60">Operational_Sequence_03</p>
                </div>

                <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClasses}>Archival Context (Markdown)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Detailed project insights and strategic data..."
                            className={cn(inputClasses, "min-h-[250px] p-6")}
                            value={typeof field.value === 'object' ? JSON.stringify(field.value) : field.value || ''}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                <FormField control={form.control} name="is_notes_downloadable" render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-[2rem] border border-black/5 bg-[#F5F0E8]/40 p-6 shadow-inner transition-all hover:bg-[#F5F0E8]/60 group">
                    <div className="space-y-1">
                        <FormLabel className="text-[10px] uppercase tracking-[0.3em] font-black text-black/80 group-hover:text-[#0D0D0D]">Enable Public Export</FormLabel>
                        <FormDescription className="text-[10px] font-bold text-black/40">Allow authorized visitors to download project documentation.</FormDescription>
                    </div>
                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} className="data-[state=checked]:bg-[#C94A2C]" /></FormControl>
                  </FormItem>
                )} />
            </div>

            {/* Multiple Partners Toggle */}
            <div className="space-y-8 pt-6 border-t border-black/5">
                <FormField control={form.control} name="is_multiple_partners" render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-[2rem] border border-black/5 bg-[#F5F0E8]/40 p-6 shadow-inner transition-all hover:bg-[#F5F0E8]/60 group">
                    <div className="space-y-1">
                        <FormLabel className="text-[10px] uppercase tracking-[0.3em] font-black text-black/80 group-hover:text-[#0D0D0D]">Collaborative Protocol</FormLabel>
                        <FormDescription className="text-[10px] font-bold text-black/40">Activate partner mapping for team projects.</FormDescription>
                    </div>
                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} className="data-[state=checked]:bg-[#C94A2C]" /></FormControl>
                  </FormItem>
                )} />

                {watchIsMultiplePartners && (
                  <FormField control={form.control} name="brand_name" render={({ field }) => (
                    <FormItem className="animate-in fade-in slide-in-from-top-4">
                        <FormLabel className={labelClasses}>Collaborative Project Identity</FormLabel>
                        <FormControl><Input placeholder="Protocol Label" className={inputClasses} {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                  )} />
                )}
            </div>

            {/* Publish Toggle */}
            <div className="space-y-8 pt-6 border-t border-black/5 pb-6">
                <FormField control={form.control} name="is_published" render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-[2rem] border border-black/5 bg-[#F5F0E8]/40 p-6 shadow-inner transition-all hover:bg-[#F5F0E8]/60 group">
                    <div className="space-y-1">
                        <FormLabel className="text-[10px] uppercase tracking-[0.3em] font-black text-black/80 group-hover:text-[#0D0D0D]">Global Deployment</FormLabel>
                        <FormDescription className="text-[10px] font-bold text-black/40">Commit clinical data to primary exhibition archive visibility.</FormDescription>
                    </div>
                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} className="data-[state=checked]:bg-[#C94A2C]" /></FormControl>
                  </FormItem>
                )} />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full bg-[#0D0D0D] hover:bg-[#C94A2C] text-white font-black h-20 rounded-[2.5rem] text-[11px] uppercase tracking-[0.3em] transition-all shadow-2xl" disabled={isLoading}>
              {isLoading ? (
                  <div className="flex items-center gap-3">
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>Executing Sequence...</span>
                  </div>
              ) : mode === 'gallery' ? "Initialize Archival Sequence" : "Initialize Case Study Deployment"}
            </Button>
          </form>
          </Form>
        </Card>

        {/* Partners Section */}
        {watchIsMultiplePartners && (
          <div className="animate-in fade-in duration-700">
             <PartnerManager portfolioId={(initialData as any)?.id} onError={(message) => console.error(message)} />
          </div>
        )}
      </div>

      {/* Right Side - Media Upload */}
      <div className="space-y-12">
        {mode === 'case_study' ? (
          <>
            <EnhancedMediaUpload 
                coverImage={coverImage} 
                mediaFiles={[]} 
                onCoverChange={setCoverImage} 
                onMediaFilesChange={() => {}} 
                maxFiles={0} 
                acceptedTypes={['image/*']} 
            />
            <Card className="bg-white border-black/[0.05] p-16 rounded-[4rem] shadow-xl space-y-8">
              <div className="space-y-3">
                  <h3 className="text-2xl font-display font-black tracking-tighter uppercase flex items-center gap-3">
                      <FileUp size={24} className="text-[#C94A2C]" />
                      Case Study Source
                  </h3>
                  <p className="text-[10px] uppercase tracking-[0.4em] font-black text-black/60">Operational_Sequence_04</p>
              </div>

              {!pdfFile ? (
                <label className="block border-2 border-dashed border-black/5 bg-[#F5F0E8]/40 rounded-[3rem] p-16 text-center cursor-pointer hover:border-[#C94A2C]/40 hover:bg-[#F5F0E8] transition-all group">
                  <input type="file" accept="application/pdf" className="hidden" onChange={async (e) => {
                    const f = e.target.files?.[0];
                    if (!f) return;
                    try {
                      const url = await uploadPdf(f);
                      setPdfFile({ url, name: f.name, size: f.size });
                    } catch (err) {
                      console.error('PDF upload failed', err);
                      alert('Failed to upload PDF');
                    }
                  }} />
                  <div className="w-16 h-16 bg-white rounded-[1.5rem] border border-black/5 flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:bg-[#0D0D0D] transition-colors">
                      <FileUp size={24} className="text-[#C94A2C] group-hover:text-white transition-colors" />
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0D0D0D]/40 group-hover:text-[#0D0D0D] transition-colors">Inject PDF Repository</div>
                  <div className="text-[9px] font-bold text-black/20 mt-2 uppercase tracking-widest">Protocol Limiter: 500 MB</div>
                </label>
              ) : (
                <div className="flex items-center justify-between bg-[#F5F0E8] rounded-[2rem] p-8 border border-black/5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                        <FileUp size={18} className="text-[#C94A2C]" />
                    </div>
                    <div>
                        <div className="text-xs font-black uppercase tracking-tight text-[#0D0D0D]">{pdfFile.name}</div>
                        <div className="text-[9px] font-bold text-black/30 tracking-widest">{pdfFile.size ? `${(pdfFile.size/1024/1024).toFixed(1)} MB` : 'Archival Size Verified'}</div>
                    </div>
                  </div>
                  <Button variant="ghost" className="hover:bg-red-50 hover:text-[#C94A2C] rounded-full h-10 px-6 text-[9px] font-black uppercase tracking-widest" onClick={() => setPdfFile(null)}>Purge</Button>
                </div>
              )}
            </Card>
          </>
        ) : (
          <div className="space-y-12">
              <EnhancedMediaUpload
                coverImage={coverImage}
                onCoverChange={setCoverImage}
                onMediaFilesChange={() => {}}
                maxFiles={0}
              />
              <Card className="bg-[#white] border-black/[0.05] p-10 md:p-16 rounded-[4rem] shadow-xl space-y-10">
                  <div className="flex items-center justify-between border-b border-black/5 pb-8">
                      <div className="space-y-3">
                          <h3 className="text-2xl font-display font-black tracking-tighter uppercase flex items-center gap-4">
                              <Network size={24} className="text-[#C94A2C]" />
                              Modular Sequence
                          </h3>
                           <p className="text-[10px] uppercase tracking-[0.4em] font-black text-black/60 font-bold">Block_Builder_Engine</p>
                      </div>
                  </div>
                  <PortfolioBlockBuilder blocks={contentBlocks} onChange={setContentBlocks} />
              </Card>
          </div>
        )}
        
        {/* Security / Activity Feed placeholder */}
        <div className="bg-black/5 rounded-[4rem] p-16 border border-dashed border-black/10 flex flex-col items-center justify-center text-center space-y-6">
            <Activity size={32} className="text-black/10" />
            <p className="text-[9px] uppercase tracking-[0.6em] font-black text-black/60 leading-relaxed max-w-xs">
                Real-time security telemetry active... <br /> All archival sequences are audited under KŌDĒ clinical surveillance protocol.
            </p>
        </div>
      </div>
    </div>
  );
}
