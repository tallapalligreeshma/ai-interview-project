// Elite AI Hero image
const AuthImage = "/assets/auth-hero.png";


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
    username: z
        .string("Username is required!")
        .min(3, "Username must be at least 6 characters.")
        .max(20, "Username must be at most 10 characters."),
    email: z.string().email("Enter a valid email address."),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters.")
        .max(20, "Password must be at most 10 characters."),
});


const Register = () => {
    const navigate = useNavigate();
    const { isSubmitting, setIsSubmitting } = useIsSubmitting();
    const [isLoading, setIsLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    });

    const handleRegister = async (data: z.infer<typeof formSchema>) => {
        setIsSubmitting(true);
        setIsLoading(true);

        try {
            await authAPI.register(data);
            toast.success("Registration successful! Please log in.");
            navigate("/auth/login");
        } catch (error: any) {
            const message = error.response?.data?.message || "Registration failed. Please try again.";
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
                                Start Your <span className="premium-gradient-text">AI Journey</span> Today.
                            </h1>
                            <p className="text-slate-400 text-lg mt-6 font-medium leading-relaxed">
                                Join thousands of engineers mastering their interview skills with real-time AI simulations and expert diagnostics.
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
                                <span className="text-[10px] font-black text-white uppercase tracking-widest">Secured AI Node</span>
                            </div>
                        </div>
                    </div>
                </div>
            <div className="lg:w-1/2 py-8 px-6 flex flex-col justify-center">
                <div className="lg:max-w-[464px] mx-auto w-full">
                    <div>
                        <Link to="/" className="mb-8 flex items-center gap-3">
                            <div className="bg-gradient-to-tr from-primary to-purple-600 p-2.5 rounded-2xl">
                                <BrainCircuit className="text-white w-6 h-6" />
                            </div>
                            <span className="text-2xl font-black text-slate-900 dark:text-white-900 tracking-tight">AI Interview Coach</span>
                        </Link>
                        <h4 className="mb-3">Sign up to your Account</h4>
                        <p className="mb-8 text-neutral-600 dark:text-neutral-200 text-lg">Welcome back! Please enter your details</p>
                    </div>
                    <form action="#" onSubmit={form.handleSubmit(handleRegister)}>
                        <FieldGroup className="mb-4">
                            <Controller
                                name="username"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className={cn('gap-1')}>
                                        <div className="icon-field relative">
                                            <Mail className="absolute start-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
                                            <Input
                                                {...field}
                                                type="text"
                                                aria-invalid={fieldState.invalid}
                                                disabled={isSubmitting}
                                                placeholder="Username"
                                                name="username"
                                                autoComplete="off"
                                                className="ps-13 pe-12 h-14 rounded-xl bg-neutral-100 dark:bg-slate-800 border border-neutral-300 dark:border-slate-700 focus:border-primary dark:focus:border-primary focus-visible:border-primary !shadow-none !ring-0"
                                            />
                                        </div>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                        <FieldGroup className="mb-4">
                            <Controller
                                name="email"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className={cn('gap-1')}>
                                        <div className="icon-field relative">
                                            <Mail className="absolute start-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
                                            <Input
                                                {...field}
                                                type="email"
                                                aria-invalid={fieldState.invalid}
                                                disabled={isSubmitting}
                                                placeholder="Email"
                                                name="email"
                                                autoComplete="off"
                                                className="ps-13 pe-12 h-14 rounded-xl bg-neutral-100 dark:bg-slate-800 border border-neutral-300 dark:border-slate-700 focus:border-primary dark:focus:border-primary focus-visible:border-primary !shadow-none !ring-0"
                                            />
                                        </div>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                        <FieldGroup className="mb-4">
                            <Controller
                                name="password"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className={cn('gap-1')}>
                                        <div className="icon-field relative">
                                            <Lock className="absolute start-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
                                            <Input
                                                {...field}
                                                type={showPassword ? 'text' : 'password'}
                                                aria-invalid={fieldState.invalid}
                                                disabled={isSubmitting}
                                                placeholder="Password"
                                                name="password"
                                                autoComplete="off"
                                                className="ps-13 pe-12 h-14 rounded-xl bg-neutral-100 dark:bg-slate-800 border border-neutral-300 dark:border-slate-700 focus:border-primary dark:focus:border-primary focus-visible:border-primary !shadow-none !ring-0"
                                            />
                                            <Button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 transform -translate-y-1/2 !p-0 bg-transparent hover:bg-transparent text-muted-foreground h-[unset]"
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="w-5 h-5" />
                                                ) : (
                                                    <Eye className="w-5 h-5" />
                                                )}
                                            </Button>
                                        </div>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </FieldGroup>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-start gap-2 flex justify-between items-center">
                            <Checkbox
                                id="createAccount"
                                className="border border-neutral-500 w-4.5 h-4.5 mt-1"
                            />
                            <label htmlFor="createAccount" className="text-sm">
                                By creating an account means you agree to the{" "}
                                <Link
                                    to="#"
                                    className="text-primary font-semibold hover:underline"
                                >
                                    Terms & Conditions
                                </Link>{" "}
                                and our{" "}
                                <Link
                                    to="#"
                                    className="text-primary font-semibold hover:underline"
                                >
                                    Privacy Policy
                                </Link>
                            </label>
                        </div>


                        <Button
                            type="submit"
                            className="w-full rounded-lg h-[52px] text-sm mt-8"
                            disabled={isSubmitting}
                        >
                            {isLoading && <Loader2 className="animate-spin h-4.5 w-4.5 mr-2" />}
                            {isLoading ? "Signing in..." : "Sign Up"}
                        </Button>

                        <div className="mt-8 center-border-horizontal text-center relative before:absolute before:w-full before:h-[1px] before:top-1/2 before:-translate-y-1/2 before:bg-neutral-300 before:start-0">
                            <span className="bg-white dark:bg-slate-900 z-[2] relative px-4">Or sign in with</span>
                        </div>
                        <SocialLogin />
                        <div className="mt-8 text-center text-sm">
                            <p className="mb-0">Already have an account? <Link to="/auth/login" className="text-primary font-semibold hover:underline">Sign In</Link></p>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        </section>
    );
};

export default Register;