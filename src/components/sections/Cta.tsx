import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { PhoneCall, Mail, ArrowUpRight } from "lucide-react";
import emailjs from '@emailjs/browser';
import { cn } from "@/lib/utils";

type CtaProps = {
  background?: 'transparent' | 'white';
  className?: string;
};

export default function Cta({ background = 'transparent', className }: CtaProps) {
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message || "Hi — I came across ŌDEY and I'm interested in talking about my brand.");
    window.open(`https://wa.me/2348160891799?text=${encodedMessage}`, '_blank');
  };

  const handleEmailClick = async () => {
    if (!message.trim()) {
      alert("Please enter a brief project description.");
      return;
    }

    try {
      const templateParams = {
        message: message,
        time: new Date().toLocaleString(),
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_GRAVITY_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      alert("Protocol sequence initiated. We will respond within 24 hours.");
      setMessage("");
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("System error. Please contact us directly via phone or WhatsApp.");
    }
  };

  const handleCallClick = () => {
    window.open("tel:+2349137145159", '_self');
  };

  return (
    <section className={cn("container mx-auto py-24 md:py-48 px-6", className)}>
      {/* Clinical Intake Container */}
      <div className={cn(
        "rounded-[3.5rem] p-8 md:p-20 max-w-6xl mx-auto border border-black/[0.03] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.06)] relative overflow-hidden",
        background === 'white' ? 'bg-white' : 'bg-white'
      )}>
        {/* Decorative corner detail */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#C94A2C]/5 blur-3xl rounded-full -mr-16 -mt-16" />

        <div className="grid lg:grid-cols-12 gap-12 items-start relative z-10">
          
          {/* Left: Heading & Context */}
          <div className="lg:col-span-12 xl:col-span-5 space-y-6">
            <div className="flex items-center gap-4">
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#C94A2C]">Ready to Start?</span>
                <div className="h-px w-12 bg-black/5" />
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-black text-[#0D0D0D] tracking-tighter leading-[0.95]">
              Tell us what <br /> you're building.
            </h2>
            <p className="text-[#0D0D0D]/60 text-lg md:text-xl font-medium leading-relaxed max-w-sm">
              You don't need a perfect brief. Just tell us where you are and where you want to be — we'll take it from there.
            </p>
          </div>

          {/* Right: Intake Form */}
          <form ref={formRef} data-emailjs-form className="lg:col-span-12 xl:col-span-7 space-y-8 w-full">
            <div className="relative group">
              <textarea
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What's the biggest challenge your brand is facing?"
                className="w-full h-40 p-10 bg-[#F5F0E8]/50 border border-black/[0.05] rounded-[2.5rem] placeholder:text-black/20 resize-none focus:outline-none focus:ring-1 focus:ring-[#C94A2C] text-[#0D0D0D] transition-all duration-500 font-medium text-lg leading-relaxed"
              />
              <div className="absolute top-8 right-8 text-black/5 group-focus-within:text-[#C94A2C]/20 transition-colors">
                 <ArrowUpRight size={24} />
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
                <div className="flex flex-wrap gap-4 justify-start w-full">
                    <Button
                        type="button"
                        onClick={handleWhatsAppClick}
                        className="bg-[#0D0D0D] text-white rounded-full px-8 py-6 hover:scale-105 active:scale-95 transition-all font-display text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-3 shadow-xl"
                    >
                        Send via WhatsApp
                    </Button>
                    <Button
                        type="button"
                        onClick={() => window.location.href = '/onboarding'}
                        className="bg-white text-[#0D0D0D] border border-black/10 rounded-full px-8 py-6 hover:bg-black/5 active:scale-95 transition-all font-display text-[10px] font-bold uppercase tracking-[0.3em]"
                    >
                        Detailed Brief
                    </Button>
                </div>

                <div className="flex items-center gap-6 w-full md:w-auto md:ml-auto">
                    <button 
                        type="button"
                        onClick={handleCallClick}
                        className="flex items-center gap-2 group text-[#0D0D0D]/40 hover:text-[#0D0D0D] transition-colors"
                    >
                        <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center transition-all group-hover:bg-[#C94A2C] group-hover:text-white">
                            <PhoneCall size={16} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest">Call</span>
                    </button>
                    <button 
                        type="button"
                        onClick={handleEmailClick}
                        className="flex items-center gap-2 group text-[#0D0D0D]/40 hover:text-[#0D0D0D] transition-colors"
                    >
                        <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center transition-all group-hover:bg-[#C94A2C] group-hover:text-white">
                            <Mail size={16} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest">Email</span>
                    </button>
                </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}