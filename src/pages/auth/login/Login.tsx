// Image updated to elite AI hero
const AuthImage = "/assets/auth-hero.png";
import ThemeLogo from "@/components/shared/ThemeLogo";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useIsSubmitting } from "@/context/isSubmittingContext";
import { authAPI } from "@/services/api";
import { BrainCircuit, Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import SocialLogin from "../components/SocialLogin";

import {
    Field,
    FieldError,
    FieldGroup
} from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";


const formSchema = z.object({
    email: z.string().email("Enter a valid email address."),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters.")
        .max(20, "Password must be at most 10 characters."),
});


const Login = () => {
    const navigate = useNavigate();
    const { isSubmitting, setIsSubmitting } = useIsSubmitting();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const handleLogin = async (data: z.infer<typeof formSchema>) => {
        setIsSubmitting(true);
        setIsLoading(true);

        try {
            const response = await authAPI.login(data);
            const { token, user } = response.data;

            if (token) {
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                toast.success(`Welcome back, ${user.username || 'User'}!`);
                navigate("/ai-interview-dashboard");
            }
        } catch (error: any) {
            // Demo fallback: Allow entry even if backend is down for the demo user
            if (data.email === "demo@ai-coach.com") {
                const mockUser = { username: "Guest Hunter", email: "demo@ai-coach.com" };
                localStorage.setItem('token', 'mock_token_for_demo');
                localStorage.setItem('user', JSON.stringify(mockUser));
                toast.success("Welcome back, Demo User! (Local Session)");
                navigate("/ai-interview-dashboard");
                return;
            }
            const message = error.response?.data?.message || "Login failed. Please check your credentials.";
            toast.error(message);
        } finally {
            setIsSubmitting(false);
            setIsLoading(false);
        }
    }

    return (
        <section className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden bg-slate-950">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px] animate-pulse delay-700" />
                <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-blue-600/10 blur-[100px] animate-bounce duration-[10000ms]" />
            </div>

            <div className="relative z-10 w-full max-w-[1100px] flex bg-white/5 dark:bg-slate-900/40 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-700">
                
                {/* Left Side: Visual/Branding (Hidden on mobile) */}
                <div className="hidden lg:flex w-1/2 p-12 flex-col justify-between bg-gradient-to-br from-primary/10 to-purple-600/10 border-r border-white/5">
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center gap-3">
                            <div className="bg-gradient-to-tr from-primary to-purple-600 p-2.5 rounded-2xl shadow-lg shadow-primary/20">
                                <BrainCircuit className="text-white w-6 h-6" />
                            </div>
                            <span className="text-2xl font-black text-white tracking-tight">AI Interview Coach</span>
                        </Link>
                        <div className="pt-10">
                            <h1 className="text-5xl font-black text-white leading-tight tracking-tighter">
                                Master Your <span className="premium-gradient-text">Next Interview</span> with AI.
                            </h1>
                            <p className="text-slate-400 text-lg mt-6 font-medium leading-relaxed">
                                Experience the future of career preparation. Realistic simulations, instant feedback, and data-driven growth.
                            </p>
                        </div>
                    </div>
                    
                    <div className="relative group">
                        <img 
                            src={AuthImage} 
                            alt="AI Interview Illustration" 
                            className="w-full h-auto rounded-[3rem] drop-shadow-[0_20px_50px_rgba(59,130,246,0.3)] transition-transform duration-700 group-hover:scale-105" 
                        />
                        <div className="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-xl">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="text-[10px] font-black text-white uppercase tracking-widest">AI Engine Online</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="w-full lg:w-1/2 p-8 md:p-14 flex flex-col justify-center">
                    <div className="max-w-[400px] mx-auto w-full">
                        <div className="lg:hidden mb-10 text-center flex justify-center">
                            <div className="flex items-center gap-3">
                                <div className="bg-gradient-to-tr from-primary to-purple-600 p-2.5 rounded-2xl">
                                    <BrainCircuit className="text-white w-5 h-5" />
                                </div>
                                <span className="text-xl font-black text-white">AI Interview Coach</span>
                            </div>
                        </div>
                        
                        <div className="mb-10 text-center lg:text-left">
                            <h2 className="text-3xl font-black text-white tracking-tight mb-2">Welcome Back</h2>
                            <p className="text-slate-400 font-medium">Please enter your details to access your dashboard</p>
                        </div>

                        <form action="#" onSubmit={form.handleSubmit(handleLogin)} className="space-y-5">
                            <Controller
                                name="email"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <div className="space-y-1.5">
                                        <div className="relative group">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-primary transition-colors" />
                                            <Input
                                                {...field}
                                                type="email"
                                                disabled={isSubmitting}
                                                placeholder="Email Address"
                                                autoComplete="off"
                                                className="pl-12 h-14 bg-slate-800/50 border-slate-700/50 focus:border-primary focus:ring-primary/20 rounded-2xl text-white placeholder:text-slate-500 transition-all font-medium"
                                            />
                                        </div>
                                        {fieldState.invalid && (
                                            <p className="text-xs font-bold text-rose-500 px-1">{fieldState.error?.message}</p>
                                        )}
                                    </div>
                                )}
                            />

                            <Controller
                                name="password"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <div className="space-y-1.5">
                                        <div className="relative group">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-primary transition-colors" />
                                            <Input
                                                {...field}
                                                type={showPassword ? 'text' : 'password'}
                                                disabled={isSubmitting}
                                                placeholder="Password"
                                                autoComplete="new-password"
                                                className="pl-12 pr-12 h-14 bg-slate-800/50 border-slate-700/50 focus:border-primary focus:ring-primary/20 rounded-2xl text-white placeholder:text-slate-500 transition-all font-medium"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors p-1"
                                            >
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                        {fieldState.invalid && (
                                            <p className="text-xs font-bold text-rose-500 px-1">{fieldState.error?.message}</p>
                                        )}
                                    </div>
                                )}
                            />

                            <div className="flex items-center justify-between text-xs font-bold">
                                <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-white transition-colors">
                                    <Checkbox id="remember" className="bg-slate-800 border-slate-700 rounded-md" />
                                    <span>Remember me</span>
                                </label>
                                <Link to="/auth/forgot-password" title="Forgot Password" className="text-primary hover:text-blue-400 transition-colors uppercase tracking-widest">
                                    Forgot Password?
                                </Link>
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full h-14 rounded-2xl bg-primary hover:bg-blue-600 text-white font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/25 group transition-all hover:scale-[1.02] active:scale-95"
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <Loader2 className="animate-spin" size={20} />
                                        <span>Signing In...</span>
                                    </span>
                                ) : (
                                    "Log In Now"
                                )}
                            </Button>

                            <div className="relative pt-6 pb-2 text-center">
                                <div className="absolute inset-0 top-1/2 h-[1px] bg-slate-800" />
                                <span className="relative z-10 bg-[#0B0F1A] px-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Or Continue With</span>
                            </div>

                            <SocialLogin />

                            <button
                                type="button"
                                onClick={() => {
                                    form.setValue("email", "demo@ai-coach.com");
                                    form.setValue("password", "123456");
                                    // Automatically trigger login after a tiny delay for visibility
                                    setTimeout(() => form.handleSubmit(handleLogin)(), 100);
                                }}
                                className="w-full py-4 rounded-2xl border border-slate-800 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:bg-white/5 hover:text-white hover:border-slate-600 transition-all font-sans"
                            >
                                Practice with Demo Account
                            </button>

                            <p className="text-center text-sm font-medium text-slate-500 pt-6">
                                Don't have an account? <Link to="/auth/register" className="text-primary font-bold hover:underline">Create Account</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;