import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Mic, Zap, CheckCircle2, Star, Shield, Trophy, Cpu } from "lucide-react";
import { aiService } from "@/lib/AiService";

const Home = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: Brain,
            title: "Intelligence Diagnostics",
            desc: "Uncover deep technical gaps with proprietary AI diagnostics that evaluate your logic, time complexity, and system design expertise.",
            color: "text-blue-500",
            bg: "bg-blue-500/10"
        },
        {
            icon: Mic,
            title: "Behavioral Pulse",
            desc: "Master the art of storytelling with real-time feedback on your confidence, articulation, and structural response during HR rounds.",
            color: "text-purple-500",
            bg: "bg-purple-500/10"
        },
        {
            icon: Zap,
            title: "Company-Level Blueprints",
            desc: "Train on exact interview patterns from Google, Meta, and Netflix, curated from our database of the most repeated questions.",
            color: "text-orange-500",
            bg: "bg-orange-500/10"
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-[#0B0F1A] overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px]" />
            </div>

            <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-40">
                {/* Hero Section */}
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                    <div className="flex-1 space-y-12 text-left">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="space-y-6"
                        >
                            <div className="space-y-4">
                                <h1 className="text-[52px] md:text-[80px] lg:text-[100px] font-[1000] tracking-[-0.04em] leading-[0.9] text-slate-950 dark:text-white">
                                    Stop Guessing. <span className="block md:inline-block md:mt-2 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent italic font-[900]">Start Practicing Real Interviews.</span>
                                </h1>
                            </div>

                            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-medium leading-[1.6] max-w-[580px] pt-6 pr-4">
                                A hands-on interview simulator built for students and freshers who want more than theory—practice real coding, system design, and behavioral rounds with instant feedback.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="flex flex-col sm:flex-row items-center gap-5 justify-start"
                        >
                            <Button 
                                onClick={() => navigate('/interview')}
                                className="h-16 px-12 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-[0.1em] shadow-xl shadow-blue-500/30 transition-all hover:scale-[1.03] active:scale-95 text-xs"
                            >
                                Start Mock Interview <ArrowRight size={18} className="ml-2" />
                            </Button>
                            <button
                                onClick={() => navigate('/practice')}
                                className="h-16 px-10 rounded-2xl border-2 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-black uppercase tracking-[0.1em] hover:bg-slate-50 dark:hover:bg-slate-900 transition-all text-xs"
                            >
                                Explore Practice Hub
                            </button>
                        </motion.div>

                        {/* Quick Trust Badges */}
                        <div className="pt-12 flex flex-wrap items-center justify-start gap-10 opacity-40 grayscale hover:grayscale-0 transition-all">
                            <div className="flex items-center gap-2 font-black text-[11px] uppercase tracking-[0.1em] text-slate-500"><Shield size={18} /> Bank-Level Encryption</div>
                            <div className="flex items-center gap-2 font-black text-[11px] uppercase tracking-[0.1em] text-slate-500"><Trophy size={18} /> ISO Certified</div>
                            <div className="flex items-center gap-2 font-black text-[11px] uppercase tracking-[0.1em] text-slate-500"><Brain size={18} /> GPT-4 Intelligence</div>
                        </div>
                    </div>

                    {/* Right Side: Floating AI Interface Mockup */}
                    <div className="flex-1 relative perspective-1000">
                        <motion.div 
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="relative z-10 w-full max-w-[500px] h-[600px] bg-slate-950 rounded-[4rem] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.8)] p-px overflow-hidden group"
                        >
                            {/* Inner Glass Layer */}
                            <div className="w-full h-full bg-[#0B0F1A] rounded-[4rem] p-10 flex flex-col gap-8 relative overflow-hidden backdrop-blur-3xl">
                                <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-primary/20 to-transparent pointer-events-none" />
                                
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <div className="w-12 h-1.5 rounded-full bg-primary/20" />
                                        <div className="w-8 h-1.5 rounded-full bg-primary/10" />
                                    </div>
                                    <Badge className="bg-emerald-500/20 text-emerald-500 border-none">AI-Powered Interview Practice Platform</Badge>
                                </div>

                                {/* Simulated Question */}
                                <div className="space-y-4 pt-10">
                                    <div className="p-6 bg-white/5 border border-white/10 rounded-3xl space-y-3">
                                        <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest">
                                            <Brain size={12} /> AI Feedback Mechanism
                                        </div>
                                        <p className="text-sm font-medium text-slate-300 italic leading-relaxed">
                                            "Explain how you would handle a race condition in a distributed microservices architecture using pessimistic locking..."
                                        </p>
                                    </div>
                                </div>

                                {/* Simulated Biometer */}
                                <div className="mt-auto grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Confidence</p>
                                        <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                                            <motion.div animate={{ width: "85%" }} transition={{ duration: 2, repeat: Infinity }} className="h-full bg-primary" />
                                        </div>
                                    </div>
                                    <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Articulation</p>
                                        <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                                            <motion.div animate={{ width: "92%" }} transition={{ duration: 1.5, repeat: Infinity }} className="h-full bg-purple-500" />
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Glow */}
                                <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-primary/30 rounded-full blur-[80px]" />
                            </div>
                        </motion.div>

                        {/* Back Decor Orbs */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-600/30 rounded-full blur-[60px]" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-600/30 rounded-full blur-[60px]" />
                    </div>
                </div>

                {/* Feature Grid */}
                <div className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className="p-10 rounded-[4rem] bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-4xl transition-all group overflow-hidden relative"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                            <div className={`w-20 h-20 rounded-[2rem] ${feature.bg} ${feature.color} flex items-center justify-center mb-10 group-hover:rotate-12 group-hover:scale-110 transition-all shadow-inner`}>
                                <feature.icon size={36} />
                            </div>
                            <h3 className="text-3xl font-black mb-6 dark:text-white tracking-tight">{feature.title}</h3>
                            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                                {feature.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Final Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-40 p-16 lg:p-28 rounded-[4rem] bg-[#050A18] text-white relative overflow-hidden text-center border border-white/5 shadow-4xl"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.1),transparent_70%)]" />
                    <div className="relative z-10 space-y-12 max-w-5xl mx-auto">
                        <div className="space-y-6">
                            <h2 className="text-4xl md:text-[56px] font-[900] tracking-[-0.03em] leading-[1.1] italic">
                                Real Interview Practice. <br/> Zero Theory.
                            </h2>
                            <p className="text-lg text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
                                Built as a full-stack project focused on solving one problem: <br className="hidden md:block"/>
                                making interview practice feel real, not theoretical.
                            </p>
                        </div>

                        <div className="py-12 border-y border-white/10 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 text-left">
                            {[
                                { title: "Elite Simulation", desc: "Experience actual technical rounds, not just random question sets." },
                                { title: "Actionable Insights", desc: "Get instant, structured feedback to improve your performance." },
                                { title: "Full-Stack Coverage", desc: "Master coding, system design, and behavioral rounds in one place." },
                                { title: "Targeted Growth", desc: "Drive measurable improvement through deliberate, repeat practice." }
                            ].map((v, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <div className="w-6 h-6 rounded-full bg-blue-600/20 text-blue-500 flex items-center justify-center shrink-0 mt-1">
                                        <CheckCircle2 size={14} />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-lg font-black text-white">{v.title}</h4>
                                        <p className="text-sm text-slate-400 font-medium">{v.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-6">
                            <Button 
                                onClick={() => navigate('/interview')}
                                className="h-20 px-16 rounded-full bg-white text-slate-950 hover:bg-slate-100 font-black uppercase tracking-[0.2em] shadow-3xl transition-transform hover:scale-105 active:scale-95 text-xs"
                            >
                                Start Practicing Now
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

// Helper for Badge since it's used in Home
const Badge = ({ children, variant, className }: any) => (
    <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${className} ${variant === 'outline' ? 'border' : 'bg-primary text-white'}`}>
        {children}
    </span>
);

export default Home;
