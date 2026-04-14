import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";

type AnswerValue = string | number;

const SCREENS = ['intro', 'q1', 'q2', 'q3', 'q4', 'q5', 'result'] as const;
type ScreenType = typeof SCREENS[number];

const PROG_LABELS = ['Assessment', '1 of 5', '2 of 5', '3 of 5', '4 of 5', '5 of 5', 'Complete'];
const PROG_PCTS = [0, 20, 40, 60, 80, 100, 100];

export default function BrandAssessment() {
  const [screenIdx, setScreenIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [score, setScore] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [screenIdx]);

  const handlePick = (qNum: number, value: AnswerValue) => {
    setAnswers((prev) => ({ ...prev, [qNum]: value }));
  };

  const handleNext = () => {
    if (screenIdx === 5) {
      calculateResult();
    } else {
      setScreenIdx((prev) => prev + 1);
    }
  };

  const calculateResult = () => {
    const q2 = parseFloat(answers[2] as string) || 30;
    const q3 = parseFloat(answers[3] as string) || 30;
    const q4 = parseFloat(answers[4] as string) || 40;

    const raw = Math.round(q2 * 0.3 + q3 * 0.4 + q4 * 0.3);
    const calculatedScore = Math.min(92, Math.max(10, raw));
    setScore(calculatedScore);
    setScreenIdx(6);
  };

  const restart = () => {
    setAnswers({});
    setScore(0);
    setScreenIdx(0);
  };

  const currentStepLabel = PROG_LABELS[screenIdx] || "Brand Assessment";
  const progressPct = PROG_PCTS[screenIdx] || 0;

  // Derive Result text
  let resultTitle = "";
  let resultDesc = "";
  if (score < 35) {
    resultTitle = "Brand in critical condition";
    resultDesc = "Your brand is actively working against you. Every room you walk into, every link you send — the brand is costing you trust, deals, and money. The gap between your ability and how you appear is your biggest business problem right now.";
  } else if (score < 52) {
    resultTitle = "Brand needs serious attention";
    resultDesc = "You have a brand, but it has real gaps that are limiting how seriously you're taken. Clients and investors are making judgments before you even open your mouth — and the brand isn't making the case for you.";
  } else if (score < 70) {
    resultTitle = "Brand is functional but not working hard enough";
    resultDesc = "Your brand holds its own, but it's not a competitive advantage. At this stage of your growth, 'fine' is the ceiling — and it shouldn't be. Your brand should be actively winning you rooms, not just surviving them.";
  } else {
    resultTitle = "Brand has a strong foundation";
    resultDesc = "You have something solid. The question now is whether it's keeping pace with your ambition — and whether it's genuinely differentiating you or just keeping you in the game. Good brands get better or get overtaken.";
  }

  // Derive Insights
  const goal = answers[5] as string | undefined;
  const q3v = parseFloat(answers[3] as string) || 50;
  const q4v = parseFloat(answers[4] as string) || 50;
  const challenge = String(answers[2] || "30");

  const buildInsights = () => {
    const pool = [];

    if (q3v <= 25) {
      pool.push({ head: "Your brand is costing you deals in real time", body: "When you're embarrassed walking into rooms, that energy transmits — and sophisticated clients and investors pick it up. A confident brand isn't vanity. It's a business tool that either opens doors or closes them before you speak." });
    } else if (q3v <= 50) {
      pool.push({ head: "That nervousness is costing you money", body: "The gap between how good your work is and how good your brand looks is a revenue gap. Every time you hesitate before sending someone your link, that's a signal. Clients and investors read it too." });
    } else {
      pool.push({ head: "Confidence is an advantage — protect it", body: "A brand that makes you proud in rooms is a compounding asset. As your business grows, your brand needs to grow at the same pace — or faster. Confident brands attract confident clients." });
    }

    if (q4v <= 35) {
      pool.push({ head: "Your competitor has a positioning advantage", body: "When your brand looks weaker, you've already lost part of the deal before the conversation starts. Brand is the first impression — and first impressions compound across every decision a client makes. Closing this gap is the fastest leverage available to you." });
    } else if (q4v <= 55) {
      pool.push({ head: "Looking the same is the same as losing", body: "In a crowded category, parity is not a safe position — it's a losing one. When brands look similar, price becomes the differentiator. The moment your brand is unmistakably distinct, pricing conversations change." });
    }

    if (challenge === "15" || challenge === "10") {
      pool.push({ head: "Starting from scratch is actually an advantage", body: "Building a brand from the ground up means no baggage, no legacy decisions to undo. Done right, you get to enter the market looking exactly as serious as you intend to be — from day one." });
    } else if (challenge === "30") {
      pool.push({ head: "You're over-delivering and under-presenting", body: "Your work is stronger than your brand. That's actually the best starting point — because the gap between your quality and your brand's quality is a fixable, visible transformation. Not a rebuild. A revelation." });
    } else if (challenge === "45") {
      pool.push({ head: "An outgrown brand is a ceiling, not a foundation", body: "Businesses that grow faster than their brand eventually hit a wall. The identity that got you here won't get you there. A strategic rebrand at the right moment is one of the highest-leverage investments a growing company can make." });
    }

    if (goal === "fund") {
      pool.push({ head: "Investors read your brand before they read your deck", body: "Sophisticated investors make first-impression judgments before you reach slide three. A brand that signals clarity, taste, and self-awareness opens rooms that a weak brand closes — before you even get to the numbers." });
    } else if (goal === "clients") {
      pool.push({ head: "Premium clients expect a premium brand", body: "The clients you're trying to win are already making brand judgments about the brands they work with. If you want to command premium rates, every touchpoint — from your Instagram to your invoice — needs to feel premium." });
    } else if (goal === "expand") {
      pool.push({ head: "Expansion exposes brand weakness fast", body: "New markets mean your brand has to work without the benefit of existing relationships and context. A brand built for Lagos needs to hold its own in London, New York, or Nairobi without you in the room to explain it." });
    } else if (goal === "hire") {
      pool.push({ head: "Talent evaluates your brand before they apply", body: "The best candidates are choosing between multiple opportunities. A brand that communicates culture, vision, and ambition attracts the people who will build the thing — not just fill the role." });
    } else if (goal === "launch") {
      pool.push({ head: "New products inherit your brand's reputation", body: "Whatever you launch next will be judged through the lens of your existing brand. A strong brand architecture makes every new product launch easier, faster, and more trusted. A weak one creates doubt before you've said a word." });
    }

    return pool.slice(0, 3);
  };
  const insights = buildInsights();

  const ctaHead = score < 55 ? "Start with a Brand Audit" : "See exactly what to sharpen";
  const ctaSub = score < 55 ? "A 48-hour deep review of your brand across every touchpoint — with a specific roadmap for what to fix first. No fluff. No vague recommendations." : "A 48-hour brand review that pinpoints the exact gaps between where your brand is and where your ambition is heading.";

  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#0D0D0D] selection:bg-[#C94A2C] selection:text-[#F5F0E8] font-sans flex flex-col">
      <Helmet>
        <title>Brand Health Assessment — ŌDEY</title>
      </Helmet>

      {/* TOP BAR */}
      <header className="px-6 md:px-10 py-6 border-b border-black/10 flex items-center justify-between sticky top-0 z-50 bg-[#F5F0E8]/80 backdrop-blur-md">
        <Link to="/" className="font-display font-bold text-2xl tracking-tight text-[#0D0D0D]">
          KŌD<span className="text-[#C94A2C]">Ē</span>
        </Link>
        <span className="text-[10px] md:text-xs font-bold tracking-[0.12em] uppercase text-[#0D0D0D]/50 hidden sm:inline-block">Brand Assessment</span>
      </header>

      {/* MAIN */}
      <main className="flex-1 flex justify-center px-4 md:px-6 py-12 md:py-20 lg:py-24">
        <div className="w-full max-w-2xl relative">

          {/* PROGRESS */}
          {screenIdx > 0 && screenIdx < 6 && (
            <div className="mb-12">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-[#C94A2C]">
                  {currentStepLabel}
                </span>
                <span className="text-[10px] font-medium tracking-[0.04em] text-[#0D0D0D]/40">
                  {progressPct}%
                </span>
              </div>
              <div className="h-0.5 bg-black/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-full bg-[#C94A2C] rounded-full" 
                />
              </div>
            </div>
          )}

          {/* SCREENS */}
          <AnimatePresence mode="wait">
            
            {/* INTRO */}
            {screenIdx === 0 && (
              <motion.div 
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#C94A2C]">Free brand assessment</span>
                  <div className="h-px w-10 bg-black/10" />
                </div>
                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.92]">
                  Your brand is saying <br className="hidden md:block"/>something <em className="italic text-[#C94A2C]">right now.</em> <br className="hidden md:block"/>Is it the right thing?
                </h1>
                <p className="text-base md:text-lg text-[#0D0D0D]/60 max-w-md leading-relaxed font-medium">
                  Answer 5 honest questions and we'll show you exactly where your brand stands, what it's costing you, and what to do about it.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 md:gap-8 border border-black/10 rounded-2xl p-6 bg-white shadow-sm mt-8 mb-10 w-fit">
                  <div className="flex flex-col gap-1">
                    <span className="font-display text-2xl font-bold tracking-tight">5</span>
                    <span className="text-[10px] text-[#0D0D0D]/50 font-bold uppercase tracking-wider">Questions</span>
                  </div>
                  <div className="hidden sm:block w-px bg-black/10 h-10" />
                  <div className="flex flex-col gap-1">
                    <span className="font-display text-2xl font-bold tracking-tight">2 min</span>
                    <span className="text-[10px] text-[#0D0D0D]/50 font-bold uppercase tracking-wider">To complete</span>
                  </div>
                  <div className="hidden sm:block w-px bg-black/10 h-10" />
                  <div className="flex flex-col gap-1">
                    <span className="font-display text-2xl font-bold tracking-tight">Free</span>
                    <span className="text-[10px] text-[#0D0D0D]/50 font-bold uppercase tracking-wider">No strings</span>
                  </div>
                </div>

                <button 
                  onClick={handleNext}
                  className="group inline-flex items-center gap-3 bg-[#0D0D0D] text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-[0.08em] transition-all hover:bg-[#C94A2C] hover:scale-105 active:scale-95 shadow-lg"
                >
                  Start the assessment
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            )}

            {/* Q1 */}
            {screenIdx === 1 && (
              <QuestionScreen 
                key="q1"
                qNum={1}
                question="Where is your business right now?"
                sub="This calibrates what your brand actually needs at this stage."
                answers={answers}
                options={[
                  { value: 10, label: "Pre-launch or just starting out", desc: "Building or about to launch" },
                  { value: 25, label: "Early stage — under 2 years", desc: "First clients, first revenue, building momentum" },
                  { value: 40, label: "Growing — 2 to 5 years in", desc: "Proven concept, now scaling" },
                  { value: 50, label: "Established — 5+ years", desc: "Track record built, brand hasn't kept up with growth" },
                ]}
                onPick={(val) => handlePick(1, val)}
                onNext={handleNext}
                onBack={() => setScreenIdx(0)}
              />
            )}

            {/* Q2 */}
            {screenIdx === 2 && (
              <QuestionScreen 
                key="q2"
                qNum={2}
                question="What's your biggest brand problem?"
                sub="Be honest — this is where most of the value comes from."
                answers={answers}
                options={[
                  { value: 15, label: "I don't really have a brand yet", desc: "Freelancer logo, Canva design, or nothing at all" },
                  { value: 30, label: "My brand doesn't reflect the quality of my work", desc: "We're better than we look" },
                  { value: 25, label: "I'm embarrassed showing it to investors or enterprise clients", desc: "The brand is actively costing us deals" },
                  { value: 40, label: "The brand exists but it's not converting", desc: "People aren't taking it seriously enough" },
                  { value: 45, label: "We've outgrown our brand — it no longer fits", desc: "Business has evolved, the brand hasn't kept up" },
                ]}
                onPick={(val) => handlePick(2, val)}
                onNext={handleNext}
                onBack={() => setScreenIdx(1)}
              />
            )}

            {/* Q3 */}
            {screenIdx === 3 && (
              <QuestionScreen 
                key="q3"
                qNum={3}
                question="Walking into a big meeting — how do you feel about your brand?"
                sub="Investor pitch. Enterprise client. Partnership conversation. Be honest."
                answers={answers}
                options={[
                  { value: 85, label: "Confident — my brand holds its own in any room" },
                  { value: 50, label: "Nervous — I'd rather not show the deck", desc: "I know it's not quite there yet" },
                  { value: 25, label: "Embarrassed — it genuinely holds us back", desc: "I've lost opportunities because of how we look" },
                  { value: 10, label: "We don't have a brand — I wing it every time" },
                ]}
                onPick={(val) => handlePick(3, val)}
                onNext={handleNext}
                onBack={() => setScreenIdx(2)}
              />
            )}

            {/* Q4 */}
            {screenIdx === 4 && (
              <QuestionScreen 
                key="q4"
                qNum={4}
                question="Compared to your strongest competitor — your brand looks..."
                sub="Think of the one competitor you most want to beat."
                answers={answers}
                options={[
                  { value: 80, label: "Better — we clearly outclass them visually", desc: "Our brand is a real competitive advantage" },
                  { value: 55, label: "About the same — neither of us stands out", desc: "The whole category looks similar" },
                  { value: 30, label: "Worse — they look more professional", desc: "And I think it's affecting how clients choose" },
                  { value: 35, label: "I honestly avoid comparing — it's uncomfortable" },
                ]}
                onPick={(val) => handlePick(4, val)}
                onNext={handleNext}
                onBack={() => setScreenIdx(3)}
              />
            )}

            {/* Q5 */}
            {screenIdx === 5 && (
              <QuestionScreen 
                key="q5"
                qNum={5}
                question="What matters most in the next 12 months?"
                sub="Your goal shapes what your brand needs to do for you right now."
                answers={answers}
                options={[
                  { value: "fund", label: "Raise funding or attract serious investors" },
                  { value: "clients", label: "Win bigger, higher-paying clients" },
                  { value: "expand", label: "Expand to new markets or go international" },
                  { value: "hire", label: "Scale the team and attract top talent" },
                  { value: "launch", label: "Launch a new product, service, or vertical" },
                ]}
                onPick={(val) => handlePick(5, val)}
                onNext={handleNext}
                onBack={() => setScreenIdx(4)}
              />
            )}

            {/* RESULT */}
            {screenIdx === 6 && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-12"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12 pb-10 border-b border-black/10">
                  <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
                    <svg width="128" height="128" viewBox="0 0 120 120" className="absolute inset-0 -rotate-90">
                      <circle cx="60" cy="60" r="50" fill="none" stroke="#E2DDD5" strokeWidth="6"/>
                      <motion.circle 
                        cx="60" cy="60" r="50" fill="none" stroke="#C94A2C" strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={314.16}
                        initial={{ strokeDashoffset: 314.16 }}
                        animate={{ strokeDashoffset: 314.16 - (314.16 * score / 100) }}
                        transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
                      />
                    </svg>
                    <div className="flex flex-col items-center">
                      <Counter value={score} />
                      <span className="text-[9px] font-bold tracking-[0.1em] uppercase text-[#0D0D0D]/40">/ 100</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#C94A2C] mb-3">Your brand health score</div>
                    <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-[#0D0D0D] mb-3 leading-tight">{resultTitle}</h2>
                    <p className="text-[#0D0D0D]/60 leading-relaxed font-medium">{resultDesc}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#0D0D0D]/50 mb-6">What we found</h3>
                  <div className="space-y-4">
                    {insights.map((ins, i) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + (i * 0.1) }}
                        key={i} 
                        className="p-6 bg-white border border-black/5 border-l-2 border-l-[#C94A2C] rounded-2xl shadow-sm"
                      >
                        <h4 className="font-bold text-[#0D0D0D] mb-2">{ins.head}</h4>
                        <p className="text-sm text-[#0D0D0D]/60 leading-relaxed font-medium">{ins.body}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#0D0D0D] rounded-3xl p-8 md:p-12 relative overflow-hidden text-white shadow-2xl">
                  {/* Decor */}
                  <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#C94A2C] opacity-30 blur-3xl rounded-full pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#C94A2C] mb-4">Recommended next step</div>
                    <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">{ctaHead}</h3>
                    <p className="text-white/60 mb-8 max-w-sm leading-relaxed">{ctaSub}</p>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">
                      <Link 
                        to="/brand-audit" 
                        className="inline-flex items-center gap-2 bg-[#C94A2C] text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-[0.08em] hover:bg-[#a8391e] transition-colors shadow-lg"
                      >
                        Book my brand audit <ArrowRight size={16} />
                      </Link>
                      <Link 
                        to="/contact" 
                        className="text-white/50 hover:text-white font-medium text-sm transition-colors"
                      >
                        Or start a conversation
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="pt-8 pb-8 flex justify-center">
                  <button onClick={restart} className="text-xs font-medium text-[#0D0D0D]/40 hover:text-[#0D0D0D] transition-colors">
                    Retake the assessment
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>
    </div>
  );
}

// ------ Helper Components ------

function QuestionScreen({ 
  qNum, question, sub, answers, options, onPick, onNext, onBack 
}: {
  qNum: number;
  question: string;
  sub: string;
  answers: Record<number, AnswerValue>;
  options: {value: AnswerValue, label: string, desc?: string}[];
  onPick: (val: AnswerValue) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const hasAnswer = answers[qNum] !== undefined;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#C94A2C] mb-4">Question {qNum}</div>
      <h2 className="font-display text-4xl md:text-5xl font-black tracking-tight leading-[1.05] mb-3 text-[#0D0D0D]">{question}</h2>
      <p className="text-[#0D0D0D]/60 text-base md:text-lg mb-8 font-medium">{sub}</p>

      <div className="space-y-3">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => onPick(opt.value)}
            className={`w-full text-left p-5 md:p-6 rounded-2xl border transition-all relative overflow-hidden group ${answers[qNum] === opt.value ? 'bg-white border-[#C94A2C] shadow-sm' : 'bg-white border-black/5 hover:border-[#C94A2C]/40'} `}
          >
            {/* Background hover effect */}
            <div className={`absolute inset-0 bg-[#C94A2C]/[0.02] transition-opacity ${answers[qNum] === opt.value ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
            
            <div className="relative w-full flex items-start gap-4">
              <div className={`mt-0.5 shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${answers[qNum] === opt.value ? 'border-[#C94A2C] bg-[#C94A2C]' : 'border-black/20 group-hover:border-[#C94A2C]/50'}`}>
                {answers[qNum] === opt.value && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
              <div>
                <div className="font-bold text-[#0D0D0D] text-[15px] leading-tight">{opt.label}</div>
                {opt.desc && <div className="text-[13px] text-[#0D0D0D]/50 mt-1.5 font-medium leading-snug">{opt.desc}</div>}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between pt-10">
        <button onClick={onBack} className="text-[#0D0D0D]/40 hover:text-[#0D0D0D] font-medium text-sm flex items-center gap-2 transition-colors">
          <ArrowLeft size={16} /> Back
        </button>
        <button 
          onClick={onNext}
          disabled={!hasAnswer}
          className={`flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-[0.08em] transition-all ${hasAnswer ? 'bg-[#0D0D0D] text-white hover:bg-[#C94A2C] hover:scale-105 active:scale-95 shadow-lg' : 'bg-black/5 text-[#0D0D0D]/30 cursor-not-allowed'}`}
        >
          {qNum === 5 ? "See my brand score" : "Continue"} <ArrowRight size={16} />
        </button>
      </div>
    </motion.div>
  );
}

function Counter({ value }: { value: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easeProgress * value));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };
    
    requestAnimationFrame(animate);
  }, [value]);

  return <span className="font-display text-5xl font-black text-[#0D0D0D] tracking-tighter leading-none">{count}</span>;
}
