import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useUser } from "@/hooks/usePortfolioAuth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Briefcase,
  Users,
  Settings,
  ImagePlus,
  Edit3,
  List,
  Database,
  BookOpen,
  Activity,
  Microscope
} from "lucide-react";

export default function ManagementDashboard() {
  const { user, role, isLoading } = useUser();
  const navigate = useNavigate();
  const [isMigrating, setIsMigrating] = useState(false);

  const handleMigrateData = async () => {
    setIsMigrating(true);
    try {
      const { migratePortfolioData } = await import("@/scripts/migrate-portfolio-data");
      await migratePortfolioData();
      alert("Migration completed! Check the console for details.");
    } catch (error) {
      console.error("Migration failed:", error);
      alert("Migration failed. Check the console for details.");
    } finally {
      setIsMigrating(false);
    }
  };

  const portfolioActions = [
    {
      title: "View Portfolio Items",
      description: "Browse and manage existing portfolio exhibition assets",
      icon: List,
      href: "/management/portfolio",
      roles: ["is_admin", "is_moderator", "is_worker"],
    },
    {
      title: "Add New Item",
      description: "Initiate new archival protocol entry",
      icon: ImagePlus,
      href: "/management/portfolio/new",
      roles: ["is_admin", "is_moderator"],
    },
    {
      title: "Edit Items",
      description: "Modify existing clinical project data",
      icon: Edit3,
      href: "/management/portfolio",
      roles: ["is_admin", "is_moderator", "is_worker"],
    },
    {
      title: "Manage Volumes",
      description: "Create, edit, and publish KŌDĒ Volumes",
      icon: BookOpen,
      href: "/management/volumes",
      roles: ["is_admin", "is_moderator"],
    },
  ];

  const hasAccess = (allowedRoles: string[]) => {
    if (!role) return false;
    return allowedRoles.some(r => role[r as keyof typeof role]);
  };

  if (isLoading) {
      return (
          <div className="min-h-screen bg-[#F5F0E8] flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-2 border-[#C94A2C] border-t-transparent rounded-full animate-spin mb-6" />
              <p className="text-[10px] uppercase tracking-[0.4em] font-black text-black/60">Authenticating Management Stream...</p>
          </div>
      );
  }

  return (
    <div className="bg-[#F5F0E8] min-h-screen text-[#0D0D0D] selection:bg-[#C94A2C] selection:text-[#F5F0E8] pt-12 md:pt-24">
      <Helmet>
        <title>Operational Intelligence Dashboard – KŌDĒ</title>
      </Helmet>

      <main className="container mx-auto py-12 px-6">
        <header className="mb-24 space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-[0.5em] font-black text-[#C94A2C]">Operational Protocol</span>
            <div className="h-px w-12 bg-black/10" />
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter leading-none">Management <br /><span className="text-black/20">Dashboard.</span></h1>
          <p className="text-xl text-black/60 font-medium max-w-2xl">
            Internal interface for KŌDĒ exhibit governance and database orchestration. 
          </p>
        </header>

        <div className="space-y-32 pb-40">
          {/* Portfolio Management Section */}
          <section className="space-y-12">
            <div className="flex items-end justify-between border-b border-black/5 pb-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-display font-black tracking-tighter flex items-center gap-4">
                   <Briefcase size={28} className="text-[#C94A2C]" />
                  Exhibition Data
                </h2>
                <p className="text-[#0D0D0D]/60 font-medium">Manage portfolio items and clinical showcase assets.</p>
              </div>
              <Activity size={24} className="text-[#C94A2C]/20" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {portfolioActions.map((action, i) => (
                hasAccess(action.roles) && (
                   <Card 
                     key={i}
                    className="bg-white border-black/[0.05] p-6 rounded-[2.5rem] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between aspect-square"
                     onClick={() => navigate(action.href)}
                   >
                    <div className="w-10 h-10 rounded-xl bg-[#F5F0E8] border border-black/5 flex items-center justify-center mb-6 group-hover:bg-[#0D0D0D] transition-colors">
                      <action.icon size={16} className="text-black group-hover:text-white transition-colors" />
                    </div>
                    <div>
                        <h3 className="text-lg font-display font-black tracking-tighter text-[#0D0D0D] leading-tight mb-2">
                            {action.title}
                        </h3>
                        <p className="text-[9px] text-black/40 font-bold leading-relaxed tracking-wide uppercase">
                        {action.description}
                        </p>
                    </div>
                  </Card>
                )
              ))}
            </div>
          </section>

          {/* Admin Only Sections */}
          {(role?.is_admin) && (
            <div className="space-y-32">
              <section className="space-y-12">
                <div className="flex items-end justify-between border-b border-black/5 pb-8">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-display font-black tracking-tighter flex items-center gap-4 text-[#0D0D0D]">
                      <Users size={28} className="text-[#C94A2C]" />
                      Personnel Access
                    </h2>
                    <p className="text-[#0D0D0D]/60 font-medium font-bold">Audit and manage internal user permissions.</p>
                  </div>
                </div>

                <Card className="bg-white border-black/[0.05] p-20 rounded-[3rem] text-center shadow-md relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-48 h-48 bg-black/5 blur-[80px]" />
                   <div className="max-w-xs mx-auto space-y-4 relative z-10">
                        <Microscope size={40} className="mx-auto text-[#C94A2C] mb-4" />
                         <h4 className="text-2xl font-display font-black tracking-tighter uppercase">Audit Protocol Pending</h4>
                        <p className="text-[9px] text-[#0D0D0D]/40 font-bold tracking-widest uppercase">User management features undergoing security verification. Stage 4 clearance required.</p>
                   </div>
                </Card>
              </section>

              <section className="space-y-12">
                <div className="flex items-end justify-between border-b border-black/10 pb-8">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-display font-black tracking-tighter flex items-center gap-4">
                      <Database size={28} className="text-[#C94A2C]" />
                      Archive Migration
                    </h2>
                    <p className="text-[#0D0D0D]/60 font-medium font-bold">Synchronize database streams</p>
                  </div>
                </div>

                <Card className="bg-white border-black/[0.05] p-16 rounded-[3rem] shadow-sm">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="space-y-3 flex-1">
                        <p className="text-base text-[#0D0D0D]/80 font-medium leading-relaxed">
                          Migrate existing exhibition archives from the local codebase to the primary KŌDĒ Cloud repository.
                        </p>
                        <div className="flex items-center gap-3 text-[7px] font-black uppercase tracking-[0.4em] text-[#C94A2C]">
                            <span>Stage: Deployment</span>
                            <div className="w-1 h-1 rounded-full bg-black/10" />
                            <span>Destination: Supabase</span>
                        </div>
                    </div>
                    <Button 
                      onClick={handleMigrateData}
                      disabled={isMigrating}
                      className="bg-[#0D0D0D] hover:bg-[#C94A2C] text-white font-bold rounded-full px-8 py-5 h-auto text-[9px] uppercase tracking-widest transition-all shadow-xl"
                    >
                      <Database className="h-3.5 w-3.5 mr-2" />
                      {isMigrating ? "Executing Protocol..." : "Execute Migration"}
                    </Button>
                  </div>
                </Card>
              </section>

              <section className="space-y-12">
                <div className="flex items-end justify-between border-b border-black/5 pb-8">
                   <div className="space-y-4">
                    <h2 className="text-3xl font-display font-black tracking-tighter flex items-center gap-4 text-[#0D0D0D]">
                      <Settings size={28} className="text-[#C94A2C]" />
                      Core Configurations
                    </h2>
                    <p className="text-[#0D0D0D]/60 font-medium font-bold">Configure system strategic metrics</p>
                  </div>
                </div>

                <Card className="bg-white border-black/[0.05] p-10 rounded-[3rem] shadow-sm flex items-center justify-center border-dashed">
                  <p className="text-[8px] uppercase tracking-[0.5em] font-black text-black/10">Diagnostic Access Suspended // Stage 05</p>
                </Card>
              </section>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}