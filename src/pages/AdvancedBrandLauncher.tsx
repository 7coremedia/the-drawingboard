import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ShieldCheck, Microscope, Link as LinkIcon, Command, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

type LauncherData = {
  // Phase 1 (Core)
  strength: string;
  audience: string;
  transformation: string;
  uniqueApproach: string;
  coreValue: string;
  // Phase 2 (Fight)
  standAgainst: string;
  standFor: string;
  contrarianTruth: string;
  // Phase 3 (Trust)
  logic: string;
  empathy: string;
  authenticity: string;
  purposeMission: string;
};

const INITIAL_DATA: LauncherData = {
  strength: "", audience: "", transformation: "", uniqueApproach: "", coreValue: "",
  standAgainst: "", standFor: "", contrarianTruth: "",
  logic: "", empathy: "", authenticity: "", purposeMission: ""
};

export default function AdvancedBrandLauncher() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<LauncherData>(INITIAL_DATA);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleNext = () => {
    if (step < 3) {
      setStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      processResults();
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const processResults = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
    }, 4000);
  };

  const updateData = (field: keyof LauncherData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  if (isComplete) {
    return <ResultsDashboard data={data} />;
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white pt-24 pb-32 selection:bg-[#C94A2C] selection:text-white">
      <Helmet>
        <title>Advanced Brand Diagnostic Protocol | KŌDĒ</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Progress Header */}
      <div className="fixed top-0 left-0 w-full z-40 bg-[#0D0D0D]/80 backdrop-blur-xl border-b border-white/5 pt-20 pb-4">
        <div className="container mx-auto px-6 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Clinical Diagnostic</span>
            <div className="flex items-center gap-2">
                {[0, 1, 2, 3].map((s) => (
                    <div key={s} className={cn(
                        "w-12 h-1 rounded-full transition-colors duration-500",
                        step >= s ? "bg-[#C94A2C]" : "bg-white/10"
                    )} />
                ))}
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#C94A2C]">Phase 0{step + 1}</span>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-4xl mt-12">
        <AnimatePresence mode="wait">
          
          {/* STEP 0: THE INNER CORE */}
          {step === 0 && (
            <motion.div 
                key="step0"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
            >
               <div className="space-y-4">
                 <div className="inline-flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10 mb-4">
                    <Microscope size={14} className="text-[#C94A2C]" />
                    <span className="text-[9px] font-black uppercase tracking-[0.3em]">Phase I</span>
                 </div>
                 <h2 className="font-display text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.95]">The Inner <br /><span className="text-white/20">Core.</span></h2>
                 <p className="text-xl text-white/60 font-medium">Your personal brand is the intersection of who you truly are and what the world needs from you. Let's isolate the variables.</p>
               </div>

               <div className="space-y-8 bg-white/5 p-8 md:p-12 rounded-[2rem] border border-white/10">
                   <InputField label="What comes effortlessly to you that others struggle with? (Your unique strength)" value={data.strength} onChange={(v) => updateData('strength', v)} placeholder="e.g. Breaking down complex systems into simple analogies" />
                   <InputField label="Who exactly are you trying to help? (Target Audience)" value={data.audience} onChange={(v) => updateData('audience', v)} placeholder="e.g. Burned-out creative agency founders" />
                   <InputField label="What massive transformation do you create for them?" value={data.transformation} onChange={(v) => updateData('transformation', v)} placeholder="e.g. Reclaim 20 hours a week and double their margins" />
                   <InputField label="What is your unique mechanism/approach?" value={data.uniqueApproach} onChange={(v) => updateData('uniqueApproach', v)} placeholder="e.g. Using the LEAN constraint system" />
                   <InputField label="What core value drives this mission? (Your 'Why')" value={data.coreValue} onChange={(v) => updateData('coreValue', v)} placeholder="e.g. Time is the only irreplaceable asset" />
               </div>
            </motion.div>
          )}

          {/* STEP 1: THE FIGHT */}
          {step === 1 && (
            <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
            >
               <div className="space-y-4">
                <div className="inline-flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10 mb-4">
                    <Command size={14} className="text-[#C94A2C]" />
                    <span className="text-[9px] font-black uppercase tracking-[0.3em]">Phase II</span>
                 </div>
                 <h2 className="font-display text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.95]">The <br /><span className="text-white/20">Fight.</span></h2>
                 <p className="text-xl text-white/60 font-medium">Your brand is defined as much by what you oppose as what you support. What frustrates you reveals your mission.</p>
               </div>

               <div className="space-y-8 bg-white/5 p-8 md:p-12 rounded-[2rem] border border-white/10 relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-[#C94A2C] opacity-5 blur-[100px] pointer-events-none" />
                   <InputField label="What common industry practice makes you angry? (What you stand AGAINST)" value={data.standAgainst} onChange={(v) => updateData('standAgainst', v)} placeholder="e.g. Hustle culture gurus glorifying 80-hour work weeks" />
                   <InputField label="What is your alternative vision? (What you stand FOR)" value={data.standFor} onChange={(v) => updateData('standFor', v)} placeholder="e.g. Building highly profitable micro-businesses that support a lifestyle" />
                   <InputField label="What contrarian truth do you believe that others disagree with?" value={data.contrarianTruth} onChange={(v) => updateData('contrarianTruth', v)} placeholder="e.g. Success shouldn't require sacrificing your health" />
               </div>
            </motion.div>
          )}

          {/* STEP 2: THE TRUST ARCHITECTURE */}
          {step === 2 && (
            <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
            >
               <div className="space-y-4">
                 <div className="inline-flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10 mb-4">
                    <ShieldCheck size={14} className="text-[#C94A2C]" />
                    <span className="text-[9px] font-black uppercase tracking-[0.3em]">Phase III</span>
                 </div>
                 <h2 className="font-display text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.95]">Trust <br /><span className="text-white/20">Architecture.</span></h2>
                 <p className="text-xl text-white/60 font-medium">People don't buy what you do; they buy why you do it—and whether they trust you. (The LEAP Framework)</p>
               </div>

               <div className="space-y-10 bg-white/5 p-8 md:p-12 rounded-[2rem] border border-white/10">
                   <div className="border-l-4 border-[#C94A2C] pl-6">
                        <InputField label="(L) LOGIC: How do you build credibility through clear thinking/systems?" value={data.logic} onChange={(v) => updateData('logic', v)} placeholder="e.g. I provide step-by-step mathematical frameworks and data" />
                   </div>
                   <div className="border-l-4 border-white/20 pl-6">
                        <InputField label="(E) EMPATHY: How do you actively show them you understand their pain?" value={data.empathy} onChange={(v) => updateData('empathy', v)} placeholder="e.g. Sharing how I almost went bankrupt in 2018 making the same mistakes" />
                   </div>
                   <div className="border-l-4 border-white/20 pl-6">
                        <InputField label="(A) AUTHENTICITY: What characteristic keeps you genuine/unpolished?" value={data.authenticity} onChange={(v) => updateData('authenticity', v)} placeholder="e.g. I'm radically transparent about my financial numbers (even the bad months)" />
                   </div>
                   <div className="border-l-4 border-[#C94A2C] pl-6">
                        <InputField label="(P) PURPOSE: What is the larger mission beyond making money?" value={data.purposeMission} onChange={(v) => updateData('purposeMission', v)} placeholder="e.g. Normalizing mental health conversations for male founders" />
                   </div>
               </div>
            </motion.div>
          )}

          {/* STEP 3: SUBMISSION */}
          {step === 3 && (
            <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="space-y-12 text-center"
            >
               {!isProcessing ? (
                   <div className="py-24 space-y-8">
                       <Activity size={48} className="text-[#C94A2C] mx-auto opacity-50" />
                       <h2 className="font-display text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.95]">Ready to <br /><span className="text-white/20">Synthesize.</span></h2>
                       <p className="text-xl text-white/60 font-medium max-w-xl mx-auto">We have extracted the necessary data points. Click below to algorithmically generate your core Brand Protocol, Positioning Statement, and Trust Architecture.</p>
                   </div>
               ) : (
                   <div className="py-32 flex flex-col items-center justify-center space-y-8">
                       <div className="w-24 h-24 border-4 border-white/10 border-t-[#C94A2C] rounded-full animate-spin" />
                       <div className="space-y-2">
                           <h3 className="font-display text-2xl font-black tracking-widest uppercase">Processing Protocol</h3>
                           <p className="text-sm font-black uppercase tracking-[0.3em] text-[#C94A2C] animate-pulse">Running Synthesis Algorithms...</p>
                       </div>
                   </div>
               )}
            </motion.div>
          )}

        </AnimatePresence>

        {/* Navigation Controls */}
        {!isProcessing && (
            <div className="flex items-center justify-between mt-12 bg-white/5 p-4 rounded-full border border-white/10">
                <button 
                    onClick={handleBack} 
                    disabled={step === 0}
                    className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 disabled:opacity-30 transition-colors"
                >
                    <ArrowLeft size={18} />
                </button>
                <div className="flex-1 px-6">
                    <button 
                        onClick={handleNext}
                        className="w-full bg-white text-[#0D0D0D] py-4 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-[#C94A2C] hover:text-white transition-all shadow-[0_0_40px_rgba(201,74,44,0.1)] hover:shadow-[0_0_40px_rgba(201,74,44,0.3)]"
                    >
                        {step === 3 ? "Generate Brand Protocol" : "Lock In & Continue"} <ArrowRight size={14} className="inline ml-2" />
                    </button>
                </div>
            </div>
        )}

      </div>
    </div>
  );
}

// ----------------------------------------------------
// RESULTS DASHBOARD COMPONENT
// ----------------------------------------------------
function ResultsDashboard({ data }: { data: LauncherData }) {
    
    // Assemble the synthesized statements from the raw data
    const identityStatement = `I am someone who ${data.strength || '[Strength]'} to help ${data.audience || '[Audience]'} achieve ${data.transformation || '[Transformation]'} through ${data.uniqueApproach || '[Method]'} because I believe ${data.coreValue || '[Core Value]'}.`;
    
    const positioningStatement = `I help ${data.audience || '[Audience]'} achieve ${data.transformation || '[Transformation]'} by ${data.uniqueApproach || '[Unique Angle]'} unlike those who ${data.standAgainst || '[Common Approach]'}, because I believe ${data.contrarianTruth || '[Contrarian Truth]'}.`;

    const trustStatement = `People trust me because I ${data.logic || '[Provide clear logic]'}, deeply understand their pain by ${data.empathy || '[Showing empathy]'}, show up as ${data.authenticity || '[Authentic]'}, and I am relentlessly committed to ${data.purposeMission || '[Bigger Mission]'}.`;

    return (
        <div className="min-h-screen bg-[#F5F0E8] text-[#0D0D0D] pt-24 pb-40">
            <Helmet>
                <title>Your Personal Brand Protocol | KŌDĒ</title>
            </Helmet>

            <header className="container mx-auto px-6 mb-20 text-center">
                 <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full border border-black/5 shadow-sm mb-8">
                    <ShieldCheck size={16} className="text-[#C94A2C]" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Synthesis Complete</span>
                 </div>
                 <h1 className="font-display text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.95]">Your Brand <br /><span className="text-black/20">Protocol.</span></h1>
            </header>

            <main className="container mx-auto px-6 max-w-5xl space-y-12">
                
                {/* Result Block 1: Identity */}
                <div className="bg-white p-10 md:p-16 rounded-[3rem] border border-black/5 shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-2 h-full bg-[#0D0D0D]" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30 block mb-6">Phase 1 Synthesis</span>
                    <h2 className="font-display text-4xl font-black uppercase tracking-tight mb-8">The Universal Identity Statement.</h2>
                    <p className="text-2xl md:text-3xl font-medium leading-relaxed bg-[#F5F0E8] p-8 rounded-2xl border border-black/5">
                        {identityStatement}
                    </p>
                </div>

                {/* Result Block 2: Positioning (The Fight) */}
                <div className="bg-[#0D0D0D] text-white p-10 md:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-[#C94A2C]" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 block mb-6">Phase 2 Synthesis</span>
                    <h2 className="font-display text-4xl font-black uppercase tracking-tight mb-8">Your Strategic Positioning.</h2>
                    <p className="text-2xl md:text-3xl font-medium leading-relaxed bg-white/5 p-8 rounded-2xl border border-white/10">
                        {positioningStatement}
                    </p>
                </div>

                {/* Result Block 3: Trust Architecture */}
                <div className="bg-white p-10 md:p-16 rounded-[3rem] border border-black/5 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-[#0D0D0D]" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30 block mb-6">Phase 3 Synthesis</span>
                    <h2 className="font-display text-4xl font-black uppercase tracking-tight mb-8">The LEAP Trust Architecture.</h2>
                    <p className="text-2xl md:text-3xl font-medium leading-relaxed bg-[#F5F0E8] p-8 rounded-2xl border border-black/5">
                        {trustStatement}
                    </p>
                </div>

                {/* Next Steps */}
                <div className="text-center pt-20 border-t border-black/10 mt-20">
                    <h3 className="font-display text-4xl font-black uppercase tracking-tight mb-6">The Architecture is Built.</h3>
                    <p className="text-xl font-medium text-black/60 mb-10 max-w-2xl mx-auto">You now have the exact psychological positioning to avoid authority erosion. You can deploy this immediately, or you can have the architects construct the machine for you.</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a href="/contact" className="bg-[#C94A2C] text-white px-10 py-5 rounded-full text-[11px] font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-xl">
                            Hire The Architects
                        </a>
                        <button onClick={() => window.print()} className="bg-white border border-black/10 text-[#0D0D0D] px-10 py-5 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-black/5 transition-colors">
                            Print Protocol
                        </button>
                    </div>
                </div>

            </main>
        </div>
    );
}

// ----------------------------------------------------
// HELPER COMPONENTS
// ----------------------------------------------------
function InputField({ label, value, onChange, placeholder }: { label: string, value: string, onChange: (v: string) => void, placeholder: string }) {
    return (
        <div className="space-y-4">
            <label className="block text-sm md:text-base font-bold text-white/80 uppercase tracking-wide">
                {label}
            </label>
            <textarea 
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                rows={2}
                className="w-full bg-[#0D0D0D] border border-white/20 rounded-2xl p-6 text-xl text-white placeholder:text-white/20 focus:outline-none focus:border-[#C94A2C] focus:ring-1 focus:ring-[#C94A2C] transition-all resize-none shadow-inner"
            />
        </div>
    );
}
