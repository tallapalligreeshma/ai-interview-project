import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Mic, 
    RotateCcw, 
    UserCircle2, 
    BarChart3, 
    AlertTriangle, 
    Video, 
    Brain, 
    Trophy, 
    History as HistoryIcon, 
    Zap, 
    Search, 
    ChevronRight, 
    Sparkles, 
    Shield, 
    LayoutGrid, 
    Monitor, 
    Target,
    Activity,
    Cpu,
    ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const features = [
    {
        id: 1,
        title: "AI Interview Simulation Engine",
        description: "Real-time AI interviewer with adaptive difficulty. Experience Technical, HR, and Mixed rounds tailored to your target role.",
        icon: Mic,
        category: "AI Interview Engine",
        tags: ["AI", "Simulation", "Real-time"],
        color: "#6366F1",
        image: "interview_sim"
    },
    {
        id: 2,
        title: "Rotation Interview System",
        description: "Dynamic question rotation prevents repetition and simulates real interview unpredictability for maximum readiness.",
        icon: RotateCcw,
        category: "AI Interview Engine",
        tags: ["Logic", "Rotation"],
        color: "#22D3EE"
    },
    {
        id: 3,
        title: "AI Interviewer Personality System",
        description: "Practice against different personas: from the strict FAANG interviewer to the friendly startup founder or senior engineer.",
        icon: UserCircle2,
        category: "AI Interview Engine",
        tags: ["Personas", "Adaptive"],
        color: "#8B5CF6"
    },
    {
        id: 4,
        title: "Smart Performance Analytics",
        description: "Deep dive into your readiness score, skill amplitude, and growth vectors with high-fidelity visualization charts.",
        icon: BarChart3,
        category: "Analytics",
        tags: ["Data", "Analytics"],
        color: "#10B981"
    },
    {
        id: 5,
        title: "Weakness Detection Engine",
        description: "Automatically identify logic gaps and weak topics. Get real-time suggestions and improvement tracking protocols.",
        icon: AlertTriangle,
        category: "Analytics",
        tags: ["Detection", "AI"],
        color: "#EF4444"
    },
    {
        id: 6,
        title: "Video Interview Analysis",
        description: "Advanced biometric analysis tracking eye contact, confidence scoring, and speech clarity to optimize your delivery.",
        icon: Video,
        category: "Video Analysis",
        tags: ["Biometrics", "Analysis"],
        color: "#6366F1"
    },
    {
        id: 7,
        title: "AI Career Coach",
        description: "A personal career architect that generates daily learning plans, roadmaps, and skill gap analysis for your dream role.",
        icon: Brain,
        category: "AI Coach",
        tags: ["Coach", "Career"],
        color: "#8B5CF6"
    },
    {
        id: 8,
        title: "Gamification System",
        description: "Stay motivated with streaks, achievements, and level-ups. Transform your preparation into a high-stakes mastery journey.",
        icon: Trophy,
        category: "Gamification",
        tags: ["Engagement", "Social"],
        color: "#F59E0B"
    },
    {
        id: 9,
        title: "Interview History System",
        description: "Replay every session, compare performance across timelines, and track your evolution from student to engineer.",
        icon: HistoryIcon,
        category: "Analytics",
        tags: ["History", "Tracking"],
        color: "#22D3EE"
    },
    {
        id: 10,
        title: "Smart Question Engine",
        description: "Dynamic question generation based on your real-time responses. Experience a recursive difficulty adjustment system.",
        icon: Zap,
        category: "AI Interview Engine",
        tags: ["Dynamic", "Engine"],
        color: "#F59E0B"
    }
];

const categories = ["All Features", "AI Interview Engine", "Analytics", "Video Analysis", "AI Coach", "Gamification"];

const FeaturesPage = () => {
    const [activeCategory, setActiveCategory] = useState("All Features");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredFeatures = features.filter(f => {
        const matchesCategory = activeCategory === "All Features" || f.category === activeCategory;
        const matchesSearch = f.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             f.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-[#0B0F1A] text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
            {/* Background Ambient Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#6366F1]/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[700px] h-[700px] bg-[#22D3EE]/10 rounded-full blur-[150px]" />
                <div className="absolute top-[30%] left-[20%] w-[400px] h-[400px] bg-[#8B5CF6]/5 rounded-full blur-[120px]" />
            </div>

            {/* Sticky Header */}
            <header className="sticky top-0 z-50 glass-premium-blue border-b border-white/5 backdrop-blur-2xl">
                <div className="max-w-[1800px] mx-auto px-6 lg:px-12 h-24 flex items-center justify-between gap-8">
                    <div className="flex items-center gap-4 group cursor-pointer">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#6366F1] to-[#22D3EE] rounded-2xl flex items-center justify-center shadow-4xl group-hover:rotate-12 smooth-transition">
                            <Cpu size={24} className="text-white" />
                        </div>
                        <h1 className="text-xl font-black text-white italic uppercase tracking-tighter">
                            AI <span className="text-gradient-cyan">Simulation</span>
                        </h1>
                    </div>

                    <div className="hidden md:flex flex-1 max-w-xl relative group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#6366F1] smooth-transition" size={20} />
                        <Input 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search intelligence features..."
                            className="w-full h-14 pl-16 pr-6 rounded-full bg-white/[0.03] border-white/5 focus-visible:ring-[#6366F1]/50 focus-visible:ring-2 text-sm font-bold italic smooth-transition"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <Button variant="ghost" className="hidden lg:flex text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white smooth-transition">Login</Button>
                        <Button className="h-14 px-8 rounded-2xl bg-white text-slate-950 hover:bg-[#6366F1] hover:text-white font-black uppercase tracking-[0.2em] text-[10px] shadow-4xl smooth-transition group">
                            Start Free Trial <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 smooth-transition" />
                        </Button>
                    </div>
                </div>
                {/* Gradient Underline on scroll simulation (CSS only here) */}
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#6366F1]/30 to-transparent" />
            </header>

            <main className="relative z-10 max-w-[1800px] mx-auto px-6 lg:px-12 py-20 space-y-24">
                {/* Hero Section */}
                <section className="text-center space-y-8 max-w-4xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-3 px-6 py-2 bg-[#6366F1]/10 text-[#22D3EE] rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-[#6366F1]/20"
                    >
                        <Sparkles size={14} className="animate-pulse" /> Advanced Capability Matrix
                    </motion.div>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black text-white italic uppercase tracking-tighter leading-none"
                    >
                        Powerful AI <span className="text-gradient-cyan">Features</span> to Crack Any Interview
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 text-lg md:text-xl font-bold italic max-w-2xl mx-auto leading-relaxed"
                    >
                        AI-driven interview simulation, adaptive learning, and real-time feedback system designed to train you like real-world interviews.
                    </motion.p>
                </section>

                {/* Category Filter Bar */}
                <section className="sticky top-24 z-40 bg-[#0B0F1A]/80 backdrop-blur-md py-6 -mx-6 px-6 lg:-mx-12 lg:px-12 border-b border-white/5">
                    <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide pb-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={cn(
                                    "whitespace-nowrap px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] italic smooth-transition border",
                                    activeCategory === cat 
                                        ? "bg-white text-slate-950 border-white shadow-4xl" 
                                        : "bg-white/[0.03] border-white/5 text-slate-500 hover:text-white hover:border-white/20"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Features Grid */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <AnimatePresence mode="popLayout">
                        {filteredFeatures.map((feature, idx) => (
                            <motion.div
                                key={feature.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4, delay: idx * 0.05 }}
                            >
                                <Card className="group glass-premium-blue rounded-[3rem] p-10 h-full border-white/5 hover:border-white/20 hover:-translate-y-3 smooth-transition shadow-4xl relative overflow-hidden flex flex-col justify-between">
                                    {/* Animated Glow Backdrop */}
                                    <div className="absolute top-0 right-0 w-40 h-40 opacity-0 group-hover:opacity-20 smooth-transition blur-3xl rounded-full -mr-20 -mt-20" style={{ backgroundColor: feature.color }} />
                                    
                                    <div className="space-y-8">
                                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 shadow-inner group-hover:scale-110 smooth-transition relative overflow-hidden" style={{ backgroundColor: `${feature.color}15` }}>
                                            <feature.icon size={28} style={{ color: feature.color }} />
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 smooth-transition" />
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex flex-wrap gap-2">
                                                {feature.tags.map(tag => (
                                                    <span key={tag} className="text-[8px] font-black uppercase tracking-widest px-3 py-1 bg-white/[0.03] border border-white/10 rounded-full text-slate-500 group-hover:text-white smooth-transition">{tag}</span>
                                                ))}
                                            </div>
                                            <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter leading-tight group-hover:text-gradient-cyan smooth-transition">
                                                {feature.title}
                                            </h3>
                                            <p className="text-sm font-bold text-slate-400 italic leading-relaxed">
                                                "{feature.description}"
                                            </p>
                                        </div>
                                    </div>

                                    <Button variant="ghost" className="mt-12 w-full h-14 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] border border-white/5 hover:bg-white/5 group-hover:border-[#6366F1]/30 italic smooth-transition flex items-center justify-between px-8">
                                        Initialize Protocol <ArrowRight size={16} className="group-hover:translate-x-2 smooth-transition" />
                                    </Button>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </section>

                {/* Call To Action Banner */}
                <section className="pt-20 pb-10">
                    <Card className="glass-premium-blue rounded-[4rem] p-16 lg:p-24 border-white/5 shadow-4xl relative overflow-hidden flex flex-col items-center text-center gap-10 group">
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-5 pointer-events-none" />
                        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#6366F1]/20 blur-[150px] rounded-full pointer-events-none" />
                        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#22D3EE]/20 blur-[150px] rounded-full pointer-events-none" />
                        
                        <div className="space-y-6 relative z-10">
                            <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 text-white rounded-full text-[10px] font-black uppercase tracking-[0.4em] border border-white/10 italic">
                                Mission-Critical Readiness
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none">
                                Ready to <span className="text-gradient-cyan">Dominate</span> Your Next Interview?
                            </h2>
                            <p className="text-slate-400 text-lg md:text-xl font-bold italic max-w-2xl mx-auto">
                                Join 50,000+ engineers using our Neural Simulation Engine to optimize their career trajectory.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6 relative z-10">
                            <Button className="h-20 px-12 rounded-[2.5rem] bg-white text-slate-950 hover:bg-[#6366F1] hover:text-white font-black uppercase tracking-[0.3em] text-xs shadow-4xl smooth-transition group/btn">
                                Start AI Interview Now <Zap size={20} className="ml-3 group-hover/btn:scale-125 smooth-transition fill-current" />
                            </Button>
                            <Button variant="outline" className="h-20 px-12 rounded-[2.5rem] bg-transparent border-white/10 text-white hover:bg-white/5 font-black uppercase tracking-[0.3em] text-xs smooth-transition italic">
                                Consult AI Architect
                            </Button>
                        </div>

                        <div className="flex items-center gap-10 opacity-40 mt-10 relative z-10 grayscale group-hover:grayscale-0 smooth-transition">
                            <Shield size={40} />
                            <LayoutGrid size={40} />
                            <Monitor size={40} />
                            <Target size={40} />
                            <Activity size={40} />
                        </div>
                    </Card>
                </section>
            </main>

            {/* Footer-lite */}
            <footer className="max-w-[1800px] mx-auto px-6 lg:px-12 py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-600 italic">
                    © 2026 AI Simulation & Career Intelligence System
                </div>
                <div className="flex gap-8">
                    {["Protocol", "Encryption", "Entity Sync", "Privacy"].map(link => (
                        <a key={link} href="#" className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white smooth-transition italic">{link}</a>
                    ))}
                </div>
            </footer>

            <style>{`
                .text-gradient-cyan {
                    background: linear-gradient(to right, #6366F1, #22D3EE);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .glass-premium-blue {
                    background: rgba(17, 24, 39, 0.7);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
                .shadow-4xl {
                    box-shadow: 0 20px 50px -20px rgba(0, 0, 0, 0.5), 0 0 1px 1px rgba(255, 255, 255, 0.05) inset;
                }
                .smooth-transition {
                    transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
                }
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
};

export default FeaturesPage;
