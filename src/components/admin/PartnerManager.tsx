import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MediaUpload from "@/components/admin/MediaUpload";
import { supabase } from "@/integrations/supabase/client";
import { Partner } from "@/types/portfolio";

const partnerSchema = z.object({
  name: z.string().min(1, "Partner name is required"),
  socialName: z.string().min(1, "Social handle is required"),
  socialLink: z.string().url("Must be a valid URL"),
});

type PartnerFormValues = z.infer<typeof partnerSchema>;

interface PartnerManagerProps {
  portfolioId?: string;
  onError: (message: string) => void;
};

export default function PartnerManager({ 
  portfolioId,
  onError
}: PartnerManagerProps) {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isAddingPartner, setIsAddingPartner] = useState(false);

  const form = useForm<PartnerFormValues>({
    resolver: zodResolver(partnerSchema),
    defaultValues: {
      name: "",
      socialName: "",
      socialLink: "",
    },
  });

  // Load existing partners
  useEffect(() => {
    if (portfolioId) {
      const loadPartners = async () => {
        const { data, error } = await supabase
          .from("portfolio_partners")
          .select("*")
          .eq("portfolio_id", portfolioId);

        if (error) {
          onError("Failed to load partners");
          return;
        }

        setPartners(data || []);
      };

      loadPartners();
    }
  }, [portfolioId]);

  const onSubmit = async (data: PartnerFormValues) => {
    try {
      if (portfolioId) {
        const { error } = await supabase
          .from("portfolio_partners")
          .insert({
            portfolio_id: portfolioId,
            ...data,
          });

        if (error) throw error;
      }

      const newPartner: Partner = {
        id: Date.now().toString(),
        name: data.name,
        socialName: data.socialName,
        socialLink: data.socialLink
      };
      setPartners([...partners, newPartner]);
      setIsAddingPartner(false);
      form.reset();
    } catch (error) {
      onError("Failed to add partner");
    }
  };

  const removePartner = async (partnerId: string) => {
    try {
      if (portfolioId) {
        const { error } = await supabase
          .from("portfolio_partners")
          .delete()
          .eq("id", partnerId);

        if (error) throw error;
      }

      setPartners(partners.filter(p => p.id !== partnerId));
    } catch (error) {
      onError("Failed to remove partner");
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between border-b border-black/5 pb-8">
        <div className="space-y-2">
            <h3 className="text-xl font-display font-black tracking-tighter uppercase flex items-center gap-3">
                <Plus size={20} className="text-[#C94A2C]" />
                Collaborative Protocol
            </h3>
            <p className="text-[9px] uppercase tracking-[0.4em] font-black text-black/40">Engagement_Registry</p>
        </div>
        {!isAddingPartner && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAddingPartner(true)}
              className="border-black/10 rounded-full px-8 h-12 text-[10px] font-black uppercase tracking-widest hover:bg-[#C94A2C] hover:text-white transition-all shadow-lg"
            >
              Add Partner
            </Button>
        )}
      </div>

      {/* Existing Partners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="flex items-center justify-between rounded-[2.5rem] border border-black/5 bg-[#F5F0E8]/40 p-8 shadow-inner group hover:bg-[#F5F0E8]/60 transition-all"
          >
            <div className="space-y-1">
              <p className="text-sm font-black uppercase tracking-tight text-[#0D0D0D]">{partner.name}</p>
              <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest">
                {partner.social_name || (partner as any).socialName}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removePartner(partner.id)}
              className="w-10 h-10 rounded-2xl bg-white shadow-sm text-black/20 hover:text-[#C94A2C] transition-colors"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* Add Partner Form */}
      {isAddingPartner && (
        <div className="rounded-[3rem] border border-black/5 bg-white p-10 md:p-14 shadow-2xl animate-in fade-in slide-in-from-top-8 duration-500">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] uppercase tracking-[0.4em] font-black text-black/60 mb-3 block">Partner Name</FormLabel>
                        <FormControl>
                          <Input className="bg-[#F5F0E8] border-black/10 rounded-2xl h-14 text-sm font-bold tracking-tight text-[#0D0D0D] placeholder:text-black/20 focus-visible:ring-[#C94A2C] focus-visible:ring-offset-0 transition-all" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="socialName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] uppercase tracking-[0.4em] font-black text-black/60 mb-3 block">Social Handle</FormLabel>
                        <FormControl>
                          <Input className="bg-[#F5F0E8] border-black/10 rounded-2xl h-14 text-sm font-bold tracking-tight text-[#0D0D0D] placeholder:text-black/20 focus-visible:ring-[#C94A2C] focus-visible:ring-offset-0 transition-all" {...field} placeholder="@username" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
              </div>

              <FormField
                control={form.control}
                name="socialLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] uppercase tracking-[0.4em] font-black text-black/60 mb-3 block">Social Link</FormLabel>
                    <FormControl>
                      <Input 
                        className="bg-[#F5F0E8] border-black/10 rounded-2xl h-14 text-sm font-bold tracking-tight text-[#0D0D0D] placeholder:text-black/20 focus-visible:ring-[#C94A2C] focus-visible:ring-offset-0 transition-all"
                        {...field} 
                        placeholder="https://instagram.com/username"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4 pt-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setIsAddingPartner(false);
                    form.reset();
                  }}
                  className="rounded-full px-8 h-12 text-[10px] font-black uppercase tracking-widest text-black/40 hover:text-black"
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#0D0D0D] text-white rounded-full px-10 h-12 text-[10px] font-black uppercase tracking-widest hover:bg-[#C94A2C] transition-all shadow-xl">Add Partner</Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
}