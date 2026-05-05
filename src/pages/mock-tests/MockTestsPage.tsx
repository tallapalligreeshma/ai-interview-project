import { motion, AnimatePresence } from "framer-motion";
import { 
    Zap, 
    Timer, 
    Target, 
    ShieldCheck, 
    ChevronRight,
    Star,
    Award,
    Activity,
    Cpu,
    Sparkles,
    Shield,
    Monitor
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const MockTestsPage = () => {
    const navigate = useNavigate();
    const mockTests = [
        { 
            title: "Java Full Mock Interview", 
            role: "Software Developer", 
            duration: "60 min", 
            difficulty: "Hard", 
            totalQuestions: 40, 
            avgScore: "72%",
            icon: Zap,
            color: "#6366F1",
            glow: "rgba(99, 102, 241, 0.5)"
        },
        { 
            title: "QA Fundamentals Exam", 
            role: "QA Automation Tester", 
            duration: "45 min", 
            difficulty: "Medium", 
            totalQuestions: 30, 
            avgScore: "85%",
            icon: ShieldCheck,
            color: "#10B981",
            glow: "rgba(16, 185, 129, 0.5)"
        },
        { 
            title: "Frontend Engineering Test", 
            role: "React/Next.js Developer", 
            duration: "90 min", 
            difficulty: "Hard", 
            totalQuestions: 35, 
            avgScore: "68%",
            icon: Target,
            color: "#8B5CF6",
            glow: "rgba(139, 92, 246, 0.5)"
        },
        { 
            title: "SQL & Data Expert Quiz", 
            role: "Data Analyst", 
            duration: "30 min", 
            difficulty: "Medium", 
            totalQuestions: 25, 
            avgScore: "90%",
            icon: Activity,
            color: "#F59E0B",
            glow: "rgba(245, 158, 11, 0.5)"
        }
    ];

    return (
        <div className="flex-1 w-full min-h-screen bg-[#0B0F1A] text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden page-fade-in pb-24">
            {/* Background Ambient Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#6366F1]/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[700px] h-[700px] bg-[#22D3EE]/10 rounded-full blur-[150px]" />
            </div>

            <div className="relative z-10 px-6 py-10 lg:px-12 space-y-16 max-w-[1800px] mx-auto">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row items-end justify-between gap-10 border-b border-white/5 pb-16">
                    <div className="space-y-6">
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-3 px-6 py-2 bg-[#6366F1]/10 text-[#22D3EE] rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-[#6366F1]/20 shadow-inner"
                        >
                            <Sparkles size={14} className="animate-pulse" /> Full Intelligence Simulation Hub
                        </motion.div>
                        <h2 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none">
                            Simulation <span className="text-gradient-cyan">Stream</span> Hub
                        </h2>
                        <p className="text-xl font-bold italic text-slate-400 max-w-2xl">
                            "Simulate high-pressure environments with real-time neural tracking and adaptive logic injectors."
                        </p>
                    </div>
                    <div className="flex items-center gap-6">
                         <div className="hidden xl:flex items-center gap-4 px-8 py-4 bg-white/5 rounded-[2rem] border border-white/10">
                            <div className="text-right">
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Global Readiness</p>
                                <p className="text-xl font-black text-white italic">84.2%</p>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-[#6366F1]/10 flex items-center justify-center border border-[#6366F1]/20">
                                <Activity size={20} className="text-[#6366F1]" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Simulation Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <AnimatePresence mode="popLayout">
                        {mockTests.map((test, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <Card className="group glass-premium-blue rounded-[3.5rem] border-white/5 shadow-4xl smooth-transition hover:border-[#6366F1]/30 hover:-translate-y-2 relative overflow-hidden h-full">
                                    <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:scale-125 smooth-transition pointer-events-none" style={{ color: test.color }}>
                                        <test.icon size={250} />
                                    </div>
                                    
                                    <CardContent className="p-10 lg:p-12 flex flex-col md:flex-row items-center gap-10 relative z-10">
                                        {/* Icon Orb */}
                                        <div className="relative shrink-0">
                                            <div className="w-32 h-32 rounded-[2.5rem] bg-black/40 border border-white/10 flex items-center justify-center shadow-4xl group-hover:rotate-6 smooth-transition relative overflow-hidden">
                                                <test.icon size={56} style={{ color: test.color }} />
                                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                                            </div>
                                            <div className="absolute inset-0 blur-3xl opacity-0 group-hover:opacity-20 smooth-transition pointer-events-none rounded-full" style={{ backgroundColor: test.color }} />
                                        </div>
                                        
                                        <div className="flex-1 space-y-6 text-center md:text-left">
                                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                                                <Badge className="bg-white/5 text-slate-400 border-white/10 font-black uppercase tracking-[0.2em] text-[9px] px-4 py-2 rounded-full italic italic">
                                                    {test.role}
                                                </Badge>
                                                <Badge className={cn(
                                                    "border-none font-black uppercase tracking-[0.2em] text-[9px] px-4 py-2 rounded-full italic",
                                                    test.difficulty === 'Hard' ? 'bg-rose-500/10 text-rose-400' : 'bg-amber-500/10 text-amber-400'
                                                )}>
                                                    {test.difficulty} Protocol
                                                </Badge>
                                            </div>
                                            <h3 className="text-3xl font-black text-white italic tracking-tighter leading-tight group-hover:text-gradient-cyan smooth-transition uppercase">
                                                {test.title}
                                            </h3>
                                            
                                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 pt-2 opacity-60 group-hover:opacity-100 smooth-transition">
                                                <div className="flex items-center gap-3">
                                                    <Timer size={18} className="text-[#6366F1]" />
                                                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">{test.duration} Stream</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Award size={18} className="text-[#22D3EE]" />
                                                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">{test.totalQuestions} Vectors</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Activity size={18} className="text-[#8B5CF6]" />
                                                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">{test.avgScore} Avg Accuracy</span>
                                                </div>
                                            </div>
                                        </div>

                                        <Button 
                                            onClick={() => navigate('/mock-tests/live')}
                                            className="w-full md:w-20 h-full md:h-48 rounded-[2rem] bg-white text-slate-950 hover:bg-[#6366F1] hover:text-white transition-all font-black uppercase text-[10px] shadow-4xl shrink-0 flex flex-col items-center justify-center gap-4 group/btn"
                                        >
                                            <span className="md:-rotate-90 md:whitespace-nowrap tracking-[0.3em] flex items-center gap-3">
                                                Start Sync <ChevronRight size={18} className="group-hover/btn:translate-x-2 smooth-transition" />
                                            </span>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Achievement Tip Banner */}
                <div className="pt-10">
                    <Card className="glass-premium-blue rounded-[4rem] p-12 lg:p-16 border-white/5 shadow-4xl relative overflow-hidden group flex flex-col md:flex-row items-center gap-12">
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-5 pointer-events-none" />
                        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#22D3EE]/10 blur-[150px] rounded-full pointer-events-none" />
                        
                        <div className="w-24 h-24 rounded-[2rem] bg-[#6366F1]/10 flex items-center justify-center border border-[#6366F1]/20 shadow-inner group-hover:scale-110 smooth-transition relative shrink-0">
                            <Star size={48} className="text-amber-400 fill-amber-400 animate-pulse" />
                            <div className="absolute inset-0 bg-[#6366F1]/5 animate-pulse rounded-full blur-2xl" />
                        </div>
                        
                        <div className="flex-1 space-y-4 text-center md:text-left relative z-10">
                            <h4 className="text-3xl font-black text-white italic uppercase tracking-tighter leading-none">Elite Challenger Protocol Locked</h4>
                            <p className="text-lg font-bold italic text-slate-400 leading-relaxed max-w-3xl">
                                "Synchronizing 3 simulation streams with over 85% accuracy decodes the 'Interview Master' neural badge. Calibrate your performance vectors now."
                            </p>
                        </div>
                        
                        <div className="flex gap-4 opacity-30 group-hover:opacity-100 smooth-transition">
                            <Shield size={32} />
                            <Monitor size={32} />
                            <Cpu size={32} />
                        </div>
                    </Card>
                </div>
            </div>

            <style>{`
                .page-fade-in { animation: fadeIn 0.8s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
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
            `}</style>
        </div>
    );
};

export default MockTestsPage;

