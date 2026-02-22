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

const Schema = z.object({ name: z.string().min(2), email: z.string().email(), message: z.string().min(10) });

type Values = z.infer<typeof Schema>;

export default function Contact() {
  const [searchParams] = useSearchParams();
  const form = useForm<Values>({ resolver: zodResolver(Schema) });
  const whatsappNumber = "2348160891799"; // Your WhatsApp number without + sign
  const callNumber = "+2349137145159";

  // Auto-fill form with portfolio information from URL params
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
    const message = `Hi! I'm ${values.name}.

Email: ${values.email}
Message: ${values.message}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');

    toast({
      title: "Redirecting to WhatsApp",
      description: "Opening WhatsApp with your message."
    });

    form.reset();
  };

  const onSubmit = (v: Values) => {
    sendToWhatsApp(v);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-brand-blue selection:text-white pb-32">
      <Helmet>
        <title>Contact – KING</title>
        <meta name="description" content="Contact KING for branding and creative projects." />
        <link rel="canonical" href="/contact" />
      </Helmet>

      <main className="container mx-auto py-12 px-4 md:px-0 relative">
        {/* Background glow orb */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none -z-10" />

        {/* CTA-style header borrowed from gravity block */}
        <div className="max-w-4xl mx-auto mb-10 text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-6xl font-bold text-white mb-4 tracking-tighter"
          >
            READY TO BUILD A <br className="hidden md:block" />
            BRAND WITH <span className="text-brand-blue">GRAVITY?</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg md:text-xl font-light"
          >
            Let's turn your vision into a decisive identity.
          </motion.p>
        </div>

        {/* Elevated rounded container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-2 max-w-4xl mx-auto rounded-[2.5rem] border border-white/10 bg-[#0a0a0a]/50 backdrop-blur-xl p-8 md:p-12 shadow-2xl overflow-hidden relative group"
        >
          {/* Subtle accent border at the top */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-blue/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField name="name" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/40 uppercase tracking-widest text-xs font-bold">Name</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-xl bg-white/5 border-white/10 text-white h-12 focus:border-brand-blue/50 transition-all placeholder:text-white/20"
                        placeholder="Your name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="email" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/40 uppercase tracking-widest text-xs font-bold">Email</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-xl bg-white/5 border-white/10 text-white h-12 focus:border-brand-blue/50 transition-all placeholder:text-white/20"
                        type="email"
                        placeholder="you@brand.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <FormField name="message" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/40 uppercase tracking-widest text-xs font-bold">Message</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      className="rounded-2xl bg-white/5 border-white/10 text-white focus:border-brand-blue/50 transition-all placeholder:text-white/20 resize-none"
                      placeholder="How can I help?"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              {/* Action buttons inspired by CTA block */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-4">
                <div className="flex flex-wrap gap-4 w-full sm:w-auto justify-center sm:justify-start">
                  <Button
                    variant="premium"
                    type="submit"
                    className="rounded-full px-8 py-6 h-auto bg-brand-blue hover:bg-brand-blue/90 text-white border-0 shadow-[0_0_20px_rgba(11,0,255,0.3)]"
                  >
                    Send via WhatsApp
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-full px-8 py-6 h-auto border-white/10 hover:bg-white/5 text-white"
                    onClick={() => {
                      const values = form.getValues();
                      const subject = encodeURIComponent("Brand enquiry – KING");
                      const body = encodeURIComponent(
                        `Hi KING,\n\n${values.message || ''}\n\n— ${values.name || ''} (${values.email || ''})`
                      );
                      window.location.href = `mailto:kingedmundbrand@gmail.com?subject=${subject}&body=${body}`;
                    }}
                  >
                    Email us
                  </Button>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  className="text-white/60 hover:text-white hover:bg-transparent group transition-colors"
                  onClick={() => window.open(`tel:${callNumber}`, '_self')}
                >
                  <span className="border-b border-white/20 group-hover:border-white transition-colors">Call now</span>
                </Button>
              </div>
            </form>
          </Form>
        </motion.div>
      </main>
    </div>
  );
}