import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { BrainCircuit, Lock, Mail, Quote } from 'lucide-react';
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


const formSchema = z.object({
    email: z.string().min(1, "Identity required"),
    password: z.string().min(1, "Security key required"),
});

const Login = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
            const mockUser = { 
                username: data.email.split('@')[0] || "Candidate", 
                email: data.email 
            };
            
            localStorage.setItem('token', 'session_' + Math.random().toString(36).substr(2, 9));
            localStorage.setItem('user', JSON.stringify(mockUser));
            
            toast.success("Intelligence Link Established!");
            
            setTimeout(() => {
                navigate("/ai-interview-dashboard");
            }, 600);
            
        } catch (error: any) {
            toast.error("Failed to synchronize with neural network.");
        } finally {
            setIsSubmitting(false);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate("/ai-interview-dashboard");
        }
    }, [navigate]);

    return (
        <section className="relative min-h-screen flex items-center justify-center p-4 lg:p-8 overflow-hidden bg-[#0B0F1A]">
            {/* Ambient Neural Network Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#6366F1]/10 blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#22D3EE]/10 blur-[120px] animate-pulse delay-700" />
            </div>

            <div className="relative z-10 w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-700">
                
                {/* Left Side: Image & Quotation */}
                <div className="relative hidden lg:flex flex-col justify-between p-16 overflow-hidden border-r border-white/10">
                    <div className="absolute inset-0 z-0">
                        <img 
                            src="/assets/login-hero.png" 
                            alt="AI Intelligence" 
                            className="w-full h-full object-cover opacity-40 scale-110 group-hover:scale-100 transition-transform duration-[20s]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-[#0B0F1A]/40 to-transparent" />
                    </div>

                    <div className="relative z-10">
                        <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl inline-flex items-center gap-2 border border-white/20 mb-8">
                            <BrainCircuit className="text-[#22D3EE] w-6 h-6" />
                            <span className="text-[10px] font-black text-white uppercase tracking-widest">IntelliHire AI Core</span>
                        </div>
                    </div>

                    <div className="relative z-10 space-y-6">
                        <Quote className="text-[#6366F1] w-12 h-12 opacity-50" />
                        <h2 className="text-4xl font-black text-white leading-tight italic">
                            The future of work isn't about human vs AI, but <span className="text-[#22D3EE]">human plus AI</span>. Master the synergy to lead the next era of innovation.
                        </h2>
                        <div className="flex items-center gap-4 pt-4">
                            <div className="w-12 h-1 rounded-full bg-gradient-to-r from-[#6366F1] to-[#22D3EE]" />
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Neural Link Protocol v1.0</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="p-10 lg:p-20 flex flex-col justify-center">
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left mb-12">
                        <div className="bg-gradient-to-tr from-[#6366F1] to-[#22D3EE] p-4 rounded-3xl mb-8 shadow-xl shadow-indigo-500/20 lg:hidden">
                            <BrainCircuit className="text-white w-10 h-10" />
                        </div>
                        <h1 className="text-4xl font-black text-white tracking-tight mb-3 uppercase italic">IntelliHire <span className="text-[#22D3EE]">AI</span></h1>
                        <p className="text-slate-400 font-medium text-lg">Initiate your intelligence synchronization</p>
                    </div>

                    <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-6">
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Neural Identity (Email)</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-[#22D3EE] transition-colors" />
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="greeshma@gmail.com"
                                            className="pl-16 h-16 bg-white/5 border-white/10 focus:border-[#22D3EE] focus:ring-[#22D3EE]/20 rounded-2xl text-white placeholder:text-slate-700 transition-all font-bold text-lg"
                                        />
                                    </div>
                                </div>
                            )}
                        />

                        <Controller
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Security Key</label>
                                    <div className="relative group">
                                        <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-[#22D3EE] transition-colors" />
                                        <Input
                                            {...field}
                                            type="password"
                                            placeholder="••••••••"
                                            className="pl-16 h-16 bg-white/5 border-white/10 focus:border-[#22D3EE] focus:ring-[#22D3EE]/20 rounded-2xl text-white placeholder:text-slate-700 transition-all font-bold text-lg"
                                        />
                                    </div>
                                </div>
                            )}
                        />

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full h-16 rounded-2xl bg-[#6366F1] hover:bg-[#4F46E5] text-white font-black uppercase tracking-[0.3em] shadow-xl shadow-indigo-500/25 transition-all hover:scale-[1.02] active:scale-95 mt-8 text-sm"
                        >
                            {isLoading ? "Synchronizing..." : "Initiate Link →"}
                        </Button>
                    </form>

                    <div className="mt-16 pt-10 border-t border-white/5 text-center lg:text-left">
                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Adaptive Interview Intelligence System • V1.0</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;