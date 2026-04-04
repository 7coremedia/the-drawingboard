import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import emailjs from '@emailjs/browser';

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleUserRedirect = async () => {
      if (user) {
        console.log("User authenticated, handling redirect...", user);
        
        // Handle pending wizard data first
        const pendingWizardData = sessionStorage.getItem('pendingWizardData');
        if (pendingWizardData) {
          try {
            const wizardData = JSON.parse(pendingWizardData);
            
            // Save brand data to database
            const { data: brand, error } = await supabase
              .from('brands')
              .insert({
                brand_name: wizardData.name,
                description: wizardData.description,
                colors: wizardData.colors,
                typography: wizardData.typography,
                logo_url: wizardData.logo?.url,
                logo_alt: wizardData.logo?.alt,
                user_id: user.id,
                is_primary: false,
              })
              .select()
              .single();

            if (error) throw error;

            sessionStorage.removeItem('pendingWizardData');
            toast({ 
              title: "Brand Created!", 
              description: "Your brand has been successfully saved. Welcome!" 
            });
            navigate(`/brand/${brand.id}`);
            return; // Exit early if we're handling wizard data
          } catch (error: any) {
            console.error("Failed to save wizard data:", error);
            toast({ 
              title: "Save Failed", 
              description: error.message || "Could not save your brand. Please try again.", 
              variant: "destructive" 
            });
          }
        }

        // Handle pending onboarding data
        const pendingOnboardingData = sessionStorage.getItem('pendingOnboardingData');
        if (pendingOnboardingData) {
          try {
            const onboardingData = JSON.parse(pendingOnboardingData);
            
            // Send email with onboarding data
            const templateParams = {
              brand_name: onboardingData.brand_name,
              elevator_pitch: onboardingData.elevator_pitch,
              sender_name: onboardingData.sender_name,
              sender_email: onboardingData.sender_email,
              industry: onboardingData.industry,
              offerings: onboardingData.offerings,
              primary_audience: onboardingData.primary_audience,
              one_year_vision: onboardingData.one_year_vision,
              budget: onboardingData.budget,
              launch_timeline: onboardingData.launch_timeline,
            };

            await emailjs.send(
              import.meta.env.VITE_EMAILJS_SERVICE_ID!,
              import.meta.env.VITE_EMAILJS_TEMPLATE_ID!,
              templateParams,
              import.meta.env.VITE_EMAILJS_PUBLIC_KEY!
            );

            sessionStorage.removeItem('pendingOnboardingData');
            toast({ 
              title: "Onboarding Completed!", 
              description: "Your brand details have been successfully submitted. Welcome!" 
            });
            navigate('/dashboard');
            return; // Exit early if we're handling onboarding data
          } catch (error: any) {
            console.error("Failed to submit onboarding data:", error);
            toast({ 
              title: "Submission Failed", 
              description: error.message || "Could not submit your onboarding data. Please try again.", 
              variant: "destructive" 
            });
          }
        }
        
        // Handle pending brand data
        const pendingData = sessionStorage.getItem('pendingBrandData');
        if (pendingData) {
          try {
            const brandData = JSON.parse(pendingData);
            const { data, error } = await supabase
              .from('brands')
              .insert({ ...brandData, user_id: user.id, is_primary: false })
              .select()
              .single();

            if (error) throw error;

            sessionStorage.removeItem('pendingBrandData');
            toast({ title: "Brand profile created!", description: "Your new brand has been saved." });
            navigate(`/brand/${data.id}`);
            return; // Exit early if we're handling brand data
          } catch (error: any) {
            console.error("Failed to save brand data:", error);
            toast({ title: "Save Failed", description: error.message || "Could not save your brand.", variant: "destructive" });
          }
        }
        
        // If no pending data, redirect to dashboard or home
        console.log("Redirecting authenticated user");
        const target = location.state?.redirectTo || '/dashboard';
        navigate(target);
      }
    };

    handleUserRedirect();
  }, [user, navigate, toast]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signInWithEmail(email, password);
    
    if (error) {
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Welcome back!",
        description: "You've successfully signed in.",
      });
      const redirectTo = location.state?.redirectTo || '/dashboard';
      navigate(redirectTo);
    }
    
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signUpWithEmail(email, password);
    
    if (error) {
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Account created!",
        description: "Please check your email to verify your account.",
      });
    }
    
    setLoading(false);
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    const { error } = await signInWithGoogle();
    
    if (error) {
      toast({
        title: "Authentication failed",
        description: error.message,
        variant: "destructive",
      });
    }
    
    setLoading(false);
  };

  return (
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F5F0E8] p-6 pt-32">
      <Helmet>
        <title>Protocol Access – KŌDĒ</title>
        <meta name="description" content="Sign in to access your strategic brand protocols." />
        <link rel="canonical" href="/auth" />
      </Helmet>
      
      <div className="w-full max-w-[480px]">
          <div className="text-center mb-12">
              <span className="text-[10px] uppercase font-black tracking-[0.4em] text-[#C94A2C] mb-4 block">Security Gateway</span>
              <h1 className="text-5xl md:text-6xl font-display font-black tracking-tighter leading-[0.9] text-[#0D0D0D]">
                  Operational <br /> Access.
              </h1>
              <p className="mt-6 text-[#0D0D0D]/40 font-medium max-w-sm mx-auto">
                {location.state?.fromOnboarding 
                  ? "Authentication required to finalize onboarding protocols." 
                  : location.state?.fromWizard
                  ? "Authentication required to encrypt brand assets."
                  : "Provide credentials to access your administrative dashboard."
                }
              </p>
              
              {location.state?.message && (
                <div className="mt-8 p-4 bg-white rounded-2xl border border-black/5 shadow-md inline-block">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-[#C94A2C]">{location.state.message}</p>
                </div>
              )}
          </div>

          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-black/5 shadow-2xl">
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8 bg-black/5 rounded-xl block p-1">
                  <TabsTrigger value="signin" className="rounded-lg text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-[#0D0D0D] data-[state=active]:shadow-sm transition-all h-10">Sign In</TabsTrigger>
                  <TabsTrigger value="signup" className="rounded-lg text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-[#0D0D0D] data-[state=active]:shadow-sm transition-all h-10">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="signin" className="space-y-6">
                  <form onSubmit={handleSignIn} className="space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="signin-email" className="text-[9px] font-black uppercase tracking-[0.2em] text-[#0D0D0D]/40">Email Identification</Label>
                      <Input
                        id="signin-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-14 bg-[#F5F0E8]/50 border border-black/5 rounded-xl px-4 font-medium focus:bg-white transition-colors"
                        placeholder="admin@kode.studio"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="signin-password" className="text-[9px] font-black uppercase tracking-[0.2em] text-[#0D0D0D]/40">Security Key</Label>
                      <Input
                        id="signin-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="h-14 bg-[#F5F0E8]/50 border border-black/5 rounded-xl px-4 font-medium focus:bg-white transition-colors"
                        placeholder="••••••••"
                      />
                    </div>
                    <Button type="submit" className="w-full h-14 bg-[#0D0D0D] hover:bg-[#C94A2C] text-white rounded-xl text-[11px] font-black uppercase tracking-widest transition-colors shadow-lg" disabled={loading}>
                      {loading ? "Authenticating..." : "Establish Secure Uplink"}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="signup" className="space-y-6">
                  <form onSubmit={handleSignUp} className="space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="signup-email" className="text-[9px] font-black uppercase tracking-[0.2em] text-[#0D0D0D]/40">Email Identification</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-14 bg-[#F5F0E8]/50 border border-black/5 rounded-xl px-4 font-medium focus:bg-white transition-colors"
                        placeholder="admin@kode.studio"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="signup-password" className="text-[9px] font-black uppercase tracking-[0.2em] text-[#0D0D0D]/40">Security Key</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                        className="h-14 bg-[#F5F0E8]/50 border border-black/5 rounded-xl px-4 font-medium focus:bg-white transition-colors"
                        placeholder="••••••••"
                      />
                    </div>
                    <Button type="submit" className="w-full h-14 bg-[#0D0D0D] hover:bg-[#C94A2C] text-white rounded-xl text-[11px] font-black uppercase tracking-widest transition-colors shadow-lg" disabled={loading}>
                      {loading ? "Generating Record..." : "Register Credentials"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
              
              <div className="mt-8 pt-8 border-t border-black/5">
                <Button
                  type="button"
                  onClick={handleGoogleAuth}
                  disabled={loading}
                  className="w-full h-14 bg-white border border-black/10 hover:bg-[#F5F0E8] text-[#0D0D0D] rounded-xl text-[11px] font-black uppercase tracking-widest transition-all shadow-sm flex items-center justify-center gap-3"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.6401 9.20454C17.6401 8.56636 17.5828 7.95272 17.4764 7.36363H9.00006V11.1073H13.8437C13.6351 12.3182 12.9355 13.3373 11.9128 14.0209V16.4454H14.8214C16.5229 14.8786 17.6401 12.2727 17.6401 9.20454Z" fill="#4285F4"/>
                      <path d="M9.00006 18C11.4259 18 13.4477 17.1982 14.8255 15.8645L11.9169 13.44C11.1724 13.9391 10.1701 14.2818 9.00006 14.2818C6.7337 14.2818 4.81096 12.7514 4.1237 10.6691H1.1087V13.0064C2.56096 15.8891 5.53915 18 9.00006 18Z" fill="#34A853"/>
                      <path d="M4.12371 10.6691C3.9478 10.1455 3.84962 9.58499 3.84962 9.00001C3.84962 8.41503 3.9478 7.85455 4.12371 7.33092V4.99365H1.10871C0.519616 6.16773 0.184143 7.53546 0.184143 9.00001C0.184143 10.4646 0.519616 11.8323 1.10871 13.0064L4.12371 10.6691Z" fill="#FBBC05"/>
                      <path d="M9.00006 3.71818C10.3214 3.71818 11.4996 4.17273 12.4323 5.06455L14.891 2.60591C13.4437 1.25591 11.4219 0 9.00006 0C5.53915 0 2.56096 2.11091 1.1087 4.99364L4.1237 7.33091C4.81096 5.24864 6.7337 3.71818 9.00006 3.71818Z" fill="#EA4335"/>
                  </svg>
                  Authenticate via Google
                </Button>
              </div>
          </div>
      </div>
    </main>
  );
}