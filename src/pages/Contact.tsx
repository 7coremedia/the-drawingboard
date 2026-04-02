import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, PhoneCall, Mail, MapPin } from "lucide-react";
import RedesignFooter from "@/components/redesign/RedesignFooter";

const Schema = z.object({ name: z.string().min(2), email: z.string().email(), message: z.string().min(10) });

type Values = z.infer<typeof Schema>;

export default function Contact() {
  const [searchParams] = useSearchParams();
  const form = useForm<Values>({ resolver: zodResolver(Schema) });
  const whatsappNumber = "2348160891799"; 
  const callNumber = "+2349137145159";

  useEffect(() => {
    const portfolioTitle = searchParams.get('portfolio');
    const portfolioUrl = searchParams.get('url');
    const planName = searchParams.get('plan');
    const planMessage = searchParams.get('message');
    const service = searchParams.get('service');

    const parts: string[] = [];

    if (planName || planMessage) {
      const header = planName ? `I'm interested in the ${planName} plan.` : "";
      parts.push([header, planMessage].filter(Boolean).join("\n\n"));
    }

    if (portfolioTitle && portfolioUrl) {
      parts.push(`I want this: ${portfolioTitle}\n\nPortfolio Link: ${portfolioUrl}`);
    }

    if (service) {
      parts.unshift(`I want design for: ${service}`);
    }

    if (parts.length) {
      form.setValue('message', parts.join('\n\n'));
    }
  }, [searchParams, form]);

  const sendToWhatsApp = (values: Values) => {
    const message = `Hi — I'm interested in working with KŌDĒ.\n\nName: ${values.name}\nEmail: ${values.email}\nMessage: ${values.message}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    toast({ title: "Opening WhatsApp", description: "Protocol sequence initiated." });
    form.reset();
  };

  const onSubmit = (v: Values) => {
    sendToWhatsApp(v);
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#0D0D0D] selection:bg-[#C94A2C] selection:text-[#F5F0E8] pt-24 md:pt-40">
      <Helmet>
        <title>Initiate Protocol – KŌDĒ | The Drawing Board</title>
        <meta name="description" content="Contact KŌDĒ for strategic brand architecture. Lagos — London. Working globally." />
        <link rel="canonical" href="/contact" />
      </Helmet>

      <main className="container mx-auto px-6 relative">
        {/* Header Section */}
        <div className="max-w-4xl mb-24 md:mb-40 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4">
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#C94A2C]">Get In Touch</span>
              <div className="h-px w-12 bg-black/5" />
            </div>
            <h1 className="font-display text-5xl md:text-8xl font-black tracking-tighter leading-[0.95]">
              Let's build <br /> something you're <br /> <span className="text-[#C94A2C]">proud of.</span>
            </h1>
            <p className="text-[#0D0D0D]/60 text-lg md:text-2xl font-medium max-w-2xl leading-relaxed">
              We're currently taking on new projects. Tell us where you are, where you want to be, and we'll figure out the rest together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center gap-4 bg-[#0D0D0D] text-white px-10 py-5 rounded-full font-display font-bold text-[10px] tracking-[0.3em] uppercase transition-all hover:scale-105 active:scale-95 shadow-xl">
                    Book a Call
                    <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a href="/brand-audit" className="group flex items-center justify-center gap-4 bg-white text-[#0D0D0D] border border-black/5 px-10 py-5 rounded-full font-display font-bold text-[10px] tracking-[0.3em] uppercase transition-all hover:bg-black/5">
                    Get a Brand Audit
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C94A2C] shadow-[0_0_8px_rgba(201,74,44,0.5)]" />
                </a>
            </div>
          </motion.div>
        </div>

        {/* Clinical Intake Module */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-6xl mx-auto rounded-[3.5rem] bg-white p-8 md:p-24 shadow-[0_60px_120px_-30px_rgba(0,0,0,0.06)] border border-black/[0.03] mb-40"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <FormField name="name" control={form.control} render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormLabel className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#0D0D0D]/30">Your Name</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-2xl bg-[#F5F0E8]/50 border-black/[0.05] text-[#0D0D0D] h-16 focus:ring-1 focus:ring-[#C94A2C] transition-all placeholder:text-black/10 px-6 text-lg font-medium"
                        placeholder="Your full name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="email" control={form.control} render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormLabel className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#0D0D0D]/30">Email Address</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-2xl bg-[#F5F0E8]/50 border-black/[0.05] text-[#0D0D0D] h-16 focus:ring-1 focus:ring-[#C94A2C] transition-all placeholder:text-black/10 px-6 text-lg font-medium"
                        type="email"
                        placeholder="protocol@brand.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <FormField name="message" control={form.control} render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormLabel className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#0D0D0D]/30">Tell Us About Your Project</FormLabel>
                  <FormControl>
                    <div className="relative group">
                        <Textarea
                        rows={6}
                        className="rounded-[2rem] bg-[#F5F0E8]/50 border-black/[0.05] text-[#0D0D0D] focus:ring-1 focus:ring-[#C94A2C] transition-all placeholder:text-black/10 px-6 py-6 text-lg font-medium resize-none"
                        placeholder="What are you building? What's the biggest challenge your brand is facing right now?"
                        {...field}
                        />
                        <div className="absolute top-6 right-6 text-black/5 group-focus-within:text-[#C94A2C]/20 transition-colors">
                            <Mail size={24} />
                        </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <div className="flex flex-col lg:flex-row justify-between items-center gap-12 pt-8">
                <div className="flex flex-wrap gap-4 w-full lg:w-auto">
                    <Button
                        type="submit"
                        className="rounded-full px-10 py-7 h-auto bg-[#0D0D0D] text-white font-display font-bold text-[10px] tracking-[0.3em] uppercase hover:scale-105 active:scale-95 transition-all shadow-xl"
                    >
                        Send via WhatsApp
                    </Button>
                    <Button
                        type="button"
                        onClick={() => {
                        const values = form.getValues();
                        const subject = encodeURIComponent("Strategic Briefing Request – KŌDĒ");
                        const body = encodeURIComponent(
                            `Protocol Inquiry:\n\n${values.message || ''}\n\nOrigin: ${values.name || ''} (${values.email || ''})`
                        );
                        window.location.href = `mailto:hello@kode.com.ng?subject=${subject}&body=${body}`;
                        }}
                        className="rounded-full px-10 py-7 h-auto bg-white text-[#0D0D0D] border border-black/10 font-display font-bold text-[10px] tracking-[0.3em] uppercase hover:bg-black/5 transition-all"
                    >
                        Official Email
                    </Button>
                </div>

                <div className="flex items-center gap-8 w-full lg:w-auto lg:ml-auto">
                    <button 
                        type="button"
                        onClick={() => window.open(`tel:${callNumber}`, '_self')}
                        className="flex items-center gap-3 group text-[#0D0D0D]/30 hover:text-[#0D0D0D] transition-colors"
                    >
                        <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center transition-all group-hover:bg-[#C94A2C] group-hover:text-white shadow-sm">
                            <PhoneCall size={16} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest">Call Us</span>
                    </button>
                    
                    <div className="hidden md:flex items-center gap-3 text-[#0D0D0D]/20">
                        <MapPin size={16} />
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] whitespace-nowrap">LOS / LDN</span>
                    </div>
                </div>
              </div>

              {/* Minimalist Contact Card Footer */}
              <div className="mt-16 pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-[#0D0D0D]/30 text-[9px] font-bold uppercase tracking-[0.4em] text-center md:text-left">
                  Lagos · London · Working globally across all time zones.
                </p>
                <div className="flex gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-black/10" />
                    <div className="w-1.5 h-1.5 rounded-full bg-black/10" />
                    <div className="w-1.5 h-1.5 rounded-full bg-black/10" />
                </div>
              </div>
            </form>
          </Form>
        </motion.div>
      </main>
      
      <RedesignFooter />
    </div>
  );
}