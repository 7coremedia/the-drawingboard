import { useEffect } from "react";
import { useNavigate, Outlet, NavLink } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/usePortfolioAuth";
import RoleRequestForm from "@/components/admin/RoleRequestForm";
import { ShieldCheck, Activity, Database, Users, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProtectedLayout() {
  const { user, role, isLoading } = useUser();
  const navigate = useNavigate();
  const hasMgmtAccess = Boolean((role as any)?.is_admin || (role as any)?.is_moderator || (role as any)?.is_worker);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-[#F5F0E8]">
        <div className="w-12 h-12 border-2 border-[#C94A2C] border-t-transparent rounded-full animate-spin mb-6" />
        <p className="text-[10px] uppercase tracking-[0.4em] font-black text-black/40">Verifying Security Credentials...</p>
      </div>
    );
  }

  if (!user || !hasMgmtAccess) {
    return (
      <div className="min-h-screen bg-[#F5F0E8] pt-32">
        <div className="container mx-auto py-8 px-6">
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-12">
            <div className="text-center space-y-6 max-w-xl">
              <div className="w-20 h-20 bg-white rounded-[2.5rem] border border-black/5 flex items-center justify-center mx-auto shadow-xl">
                 <ShieldCheck size={32} className="text-[#C94A2C]" />
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter leading-none">Security <br /> Clearance Required.</h1>
              <p className="text-xl text-[#0D0D0D]/40 font-medium">
                The requested archive gateway is restricted to authorized personnel. 
              </p>
              
              <div className="mt-8 p-10 bg-white rounded-[3rem] border border-black/5 text-left space-y-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5">
                    <Activity size={40} />
                </div>
                <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-black/20">Protocol Diagnostics</h4>
                <div className="space-y-3">
                    <div className="flex justify-between border-b border-black/5 pb-2">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-black/40">Entity</span>
                        <span className="text-sm font-bold">{user ? user.email : "Unrecognized"}</span>
                    </div>
                    <div className="flex justify-between border-b border-black/5 pb-2">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-black/40">Clearance</span>
                        <span className="text-sm font-bold text-[#C94A2C] uppercase tracking-tighter">Level_00 (Public)</span>
                    </div>
                </div>
              </div>
            </div>
            
            <RoleRequestForm />
            
            <div className="flex items-center gap-6">
              <Button 
                variant="outline" 
                onClick={() => navigate("/")}
                className="rounded-full border-black/10 px-8 h-12 text-[10px] font-black uppercase tracking-widest text-[#0D0D0D]"
              >
                Go home
              </Button>
              <Button 
                onClick={() => navigate("/auth")}
                className="rounded-full bg-[#0D0D0D] text-white px-8 h-12 text-[10px] font-black uppercase tracking-widest hover:bg-[#C94A2C] transition-all"
              >
                Sign in
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F0E8] selection:bg-[#C94A2C] selection:text-white">
      {/* Admin Operational Bar */}
      <nav className="fixed top-0 inset-x-0 z-[70] bg-white/80 border-b border-black/[0.05] backdrop-blur-xl h-16 flex items-center">
        <div className="container mx-auto flex items-center px-6">
          <div className="mr-12 flex items-center gap-4">
          <NavLink 
            to="/" 
            className="flex items-center gap-4 hover:opacity-70 transition-opacity"
          >
            <span className="text-lg font-display font-black tracking-tighter text-[#0D0D0D]">KŌDĒ</span>
          </NavLink>
            <div className="h-4 w-px bg-black/10 hidden md:block" />
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-black/20 hidden md:block">Operational_Control</span>
          </div>
          
          <div className="flex gap-8 overflow-x-auto no-scrollbar py-2">
            <NavLink 
              to="/management"
              end
              className={({ isActive }) => cn(
                "text-[10px] uppercase font-black tracking-[0.2em] transition-all hover:text-[#C94A2C] flex items-center gap-2",
                isActive ? "text-[#C94A2C]" : "text-black/40"
              )}
            >
              <LayoutDashboard size={12} />
              Dashboard
            </NavLink>
            <NavLink 
              to="/management/portfolio" 
              className={({ isActive }) => cn(
                "text-[10px] uppercase font-black tracking-[0.2em] transition-all hover:text-[#C94A2C] flex items-center gap-2 whitespace-nowrap",
                isActive ? "text-[#C94A2C]" : "text-black/40"
              )}
            >
              <Database size={12} />
              Portfolio Mgt
            </NavLink>
            {(role?.is_admin || role?.is_moderator) && (
              <NavLink
                to="/management/volumes"
                className={({ isActive }) => cn(
                  "text-[10px] uppercase font-black tracking-[0.2em] transition-all hover:text-[#C94A2C] flex items-center gap-2 whitespace-nowrap",
                  isActive ? "text-[#C94A2C]" : "text-black/40"
                )}
              >
                <Database size={12} />
                Volumes
              </NavLink>
            )}
            {(role?.is_admin || role?.is_moderator) && (
              <NavLink 
                to="/management/roles" 
                className={({ isActive }) => cn(
                  "text-[10px] uppercase font-black tracking-[0.2em] transition-all hover:text-[#C94A2C] flex items-center gap-2 whitespace-nowrap",
                  isActive ? "text-[#C94A2C]" : "text-black/40"
                )}
              >
                <Users size={12} />
                Roles
              </NavLink>
            )}
          </div>

          <div className="ml-auto flex items-center gap-6 pl-6 border-l border-black/5">
            <div className="flex items-center gap-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#0D0D0D]">
                {role?.is_admin ? "Protocol_Admin" : role?.is_moderator ? "Protocol_Mod" : "Protocol_Wkr"}
                </span>
                <div className="w-2 h-2 rounded-full bg-[#C94A2C] animate-pulse" />
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-16">
        <Outlet />
      </div>
    </div>
  );
}