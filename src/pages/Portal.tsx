import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  FileText,
  DownloadCloud,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Dummy data for visual design
const MILESTONES = [
  { id: 1, title: "Brand Discovery & Strategy", date: "Oct 12", status: "completed" },
  { id: 2, title: "Visual Identity Design", date: "Oct 28", status: "completed" },
  { id: 3, title: "Web Architecture", date: "Nov 15", status: "in-progress" },
  { id: 4, title: "Final Deliverables & Handoff", date: "Dec 01", status: "pending" },
];

const INVOICES = [
  { id: "INV-001", amount: "$2,500", date: "Oct 05", status: "paid" },
  { id: "INV-002", amount: "$2,500", date: "Nov 05", status: "paid" },
  { id: "INV-003", amount: "$5,000", date: "Dec 01", status: "unpaid" },
];

const ASSETS = [
  { id: 1, name: "Brand Guidelines.pdf", size: "12 MB", type: "PDF" },
  { id: 2, name: "Logo Pack (SVG/PNG)", size: "45 MB", type: "ZIP" },
  { id: 3, name: "Typography Files", size: "2 MB", type: "ZIP" },
];

export default function Portal() {
  return (
    <div className="bg-[#F5F0E8] min-h-screen text-[#0D0D0D] font-sans selection:bg-[#C94A2C] selection:text-[#F5F0E8]">
      <Helmet>
        <title>Client Portal – KŌDĒ</title>
      </Helmet>

      {/* Minimalist Portal Header */}
      <header className="px-6 py-8 md:px-12 md:py-10 flex items-center justify-between border-b border-black/[0.05]">
        <div className="flex items-center gap-3">
          <Link to="/">
            <span className="kode-wordmark text-xl tracking-tight font-black text-[#0D0D0D]">
              KŌDĒ
            </span>
          </Link>
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-black/40 bg-black/5 px-2 py-1 rounded">
            Portal
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="hidden sm:flex border-black/10 hover:bg-black/5 hover:text-black rounded-full h-10 px-5 text-xs font-bold tracking-widest uppercase">
            <MessageSquare className="w-3.5 h-3.5 mr-2" /> Support
          </Button>
          <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-sm font-black">
            JD
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 md:py-20 md:px-12 max-w-6xl space-y-12 md:space-y-24">
        
        {/* Intro Section */}
        <section className="space-y-4">
          <p className="text-[10px] uppercase tracking-[0.4em] font-black text-[#C94A2C]">
            Project Overview
          </p>
          <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter leading-none">
            Welcome back, <br className="hidden md:block"/>
            <span className="text-black/30">John Doe.</span>
          </h1>
          <p className="text-lg md:text-xl text-black/60 font-medium max-w-2xl mt-4">
            Track your project progress, manage invoices, and access your brand assets all in one place.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Main Column (Milestones & Invoices) */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Milestones */}
            <section className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-black/[0.05] shadow-sm">
               <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-display font-black tracking-tighter">Project Matrix</h2>
                  <span className="text-xs font-bold bg-[#C94A2C]/10 text-[#C94A2C] px-3 py-1 rounded-full">50% Completed</span>
               </div>

               <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-[11px] before:w-px before:bg-black/10">
                 {MILESTONES.map((stone) => (
                   <div key={stone.id} className="relative flex gap-6 items-start">
                     <div className={`w-6 h-6 rounded-full flex items-center justify-center z-10 shrink-0 ${stone.status === 'completed' ? 'bg-[#C94A2C] text-white' : stone.status === 'in-progress' ? 'bg-white border-2 border-[#C94A2C]' : 'bg-[#F5F0E8] border border-black/10'}`}>
                        {stone.status === 'completed' && <CheckCircle2 className="w-4 h-4" />}
                     </div>
                     <div className="flex-1 pb-6 border-b border-black/5 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between">
                          <h3 className={`font-bold ${stone.status === 'pending' ? 'text-black/40' : 'text-black'} text-lg`}>
                            {stone.title}
                          </h3>
                          <span className="text-xs font-medium text-black/40">{stone.date}</span>
                        </div>
                        {stone.status === 'in-progress' && (
                          <div className="mt-3">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-[#C94A2C] bg-[#C94A2C]/5 px-2 py-1 rounded">Active Phase</span>
                          </div>
                        )}
                     </div>
                   </div>
                 ))}
               </div>
            </section>

            {/* Invoices */}
            <section className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-black/[0.05] shadow-sm">
               <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-display font-black tracking-tighter">Financials</h2>
                  <FileText className="w-5 h-5 text-black/30" />
               </div>

               <div className="space-y-4 flex flex-col">
                 {INVOICES.map(inv => (
                   <div key={inv.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 md:p-6 rounded-2xl bg-[#F5F0E8]/50 hover:bg-[#F5F0E8] transition-colors border border-black/5 gap-4">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                            <FileText className="w-4 h-4 text-black/60" />
                         </div>
                         <div>
                            <p className="font-bold text-sm">{inv.id}</p>
                            <p className="text-xs text-black/50 font-medium">{inv.date}</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-4 sm:gap-6 ml-14 sm:ml-0">
                         <span className="font-display font-medium text-lg">{inv.amount}</span>
                         <span className={`text-[10px] w-16 text-center uppercase tracking-widest font-bold px-2 py-1 rounded ${inv.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                           {inv.status}
                         </span>
                         <button className="text-black/30 hover:text-black transition-colors" aria-label="Download Invoice">
                            <DownloadCloud className="w-5 h-5" />
                         </button>
                      </div>
                   </div>
                 ))}
               </div>
            </section>

          </div>

          {/* Sidebar (Assets & Actions) */}
          <div className="space-y-8 lg:space-y-12">
            
            {/* Quick Actions */}
            <section className="bg-black rounded-[2.5rem] p-8 text-white relative overflow-hidden">
               {/* Lighting effect */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[50px] pointer-events-none" />
              
              <h2 className="text-xl font-display font-black tracking-tighter mb-4 relative z-10">Need Assistance?</h2>
              <p className="text-white/60 text-sm mb-8 font-medium relative z-10 leading-relaxed">Connect directly with our team for questions about your clinical architecture.</p>
              
              <div className="space-y-3 relative z-10">
                <Button className="w-full bg-white text-black hover:bg-white/90 rounded-full h-12 font-bold uppercase tracking-widest text-[10px] transition-transform active:scale-95">
                  <MessageSquare className="w-4 h-4 mr-2" /> Open Chat
                </Button>
              </div>
            </section>

            {/* Deliverables Vault */}
            <section className="bg-white rounded-[2.5rem] p-8 border border-black/[0.05] shadow-sm">
               <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-display font-black tracking-tighter">Deliverables</h2>
                  <Link to="#" className="text-[10px] uppercase tracking-widest font-bold text-[#C94A2C] hover:text-black transition-colors">View All</Link>
               </div>

               <div className="space-y-3 flex flex-col">
                 {ASSETS.map(asset => (
                   <div key={asset.id} className="group flex items-center justify-between p-4 rounded-2xl bg-[#F5F0E8]/50 hover:bg-[#0D0D0D] transition-colors border border-black/5 cursor-pointer">
                      <div className="mr-4">
                        <p className="text-sm font-bold text-black group-hover:text-white transition-colors line-clamp-1">{asset.name}</p>
                        <p className="text-xs text-black/40 group-hover:text-white/40 font-medium transition-colors">{asset.type} • {asset.size}</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white group-hover:bg-[#333] flex items-center justify-center transition-colors shrink-0">
                        <ArrowRight className="w-3.5 h-3.5 text-black group-hover:text-white" />
                      </div>
                   </div>
                 ))}
               </div>
            </section>

          </div>

        </div>
      </main>
    </div>
  );
}
