import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Zap, 
    Timer, 
    ChevronRight, 
    CheckCircle2, 
    XCircle, 
    ArrowRight, 
    BookOpen, 
    Code, 
    UserCheck,
    RefreshCw,
    Award
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { aiService } from "@/lib/AiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LiveMockTest = () => {
    const navigate = useNavigate();
    const [testData, setTestData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentStep, setCurrentStep] = useState(0); // 0: Intro, 1: MCQ, 2: Coding, 3: HR, 4: Result
    const [answers, setAnswers] = useState<any>({});
    const [timer, setTimer] = useState(1800); // 30 mins

    useEffect(() => {
        const fetchTest = async () => {
            try {
                const data = await aiService.generateModuleResponse("mock_test", {
                    role: "Software Engineer",
                    category: "Full Stack"
                });
                setTestData(data.test);
            } catch (error) {
                toast.error("Failed to generate test.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchTest();
    }, []);

    useEffect(() => {
        if (currentStep > 0 && currentStep < 4 && timer > 0) {
            const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [currentStep, timer]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    if (isLoading) return <div className="h-screen flex items-center justify-center font-black uppercase tracking-widest text-primary animate-pulse">Generating Challenge...</div>;

    return (
        <div className="flex flex-col min-h-screen bg-[#0B0F1A] text-slate-200 font-sans selection:bg-indigo-500/30 relative overflow-hidden page-fade-in">
            {/* Background Ambient Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#6366F1]/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[700px] h-[700px] bg-[#8B5CF6]/10 rounded-full blur-[150px]" />
            </div>

            {/* Header / HUD */}
            <header className="relative z-10 max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-6 py-10 px-6 border-b border-white/5 mb-12">
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <Badge className="bg-gradient-to-r from-rose-500 to-orange-500 text-white border-none font-black text-[10px] uppercase tracking-[0.2em] px-4 py-1.5 shadow-[0_0_15px_rgba(244,63,94,0.4)]">Challenge Active</Badge>
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                           <Code size={14} className="text-[#22D3EE]" /> Intelligence Sync Active
                        </span>
                    </div>
                    <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic">AI Master <span className="text-gradient-cyan">Mock Simulation</span></h2>
                </div>

                <div className="flex items-center gap-6">
                    <div className="glass-premium-blue rounded-[1.5rem] border-white/10 px-6 py-4 flex items-center gap-5 shadow-2xl">
                        <div className="p-3 bg-rose-500/10 text-rose-500 rounded-xl shadow-inner">
                            <Timer size={24} className="animate-pulse" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Sim Time Left</p>
                            <p className="text-2xl font-black text-white font-mono tracking-wider">{formatTime(timer)}</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="relative z-10 max-w-5xl mx-auto w-full px-6 pb-20">
                <AnimatePresence mode="wait">
                    {/* Step 0: Welcome / Instructions */}
                    {currentStep === 0 && (
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} key="intro">
                            <Card className="glass-premium-blue border-white/5 rounded-[3rem] p-12 lg:p-20 shadow-3xl overflow-hidden relative group">
                                <div className="absolute top-0 right-0 w-80 h-80 bg-[#6366F1]/10 blur-[100px] -mr-40 -mt-40 group-hover:bg-[#6366F1]/20 transition-all duration-1000" />
                                <div className="relative z-10 flex flex-col items-center text-center space-y-10">
                                    <div className="w-24 h-24 rounded-[2.5rem] bg-gradient-to-tr from-[#6366F1] to-[#22D3EE] text-white flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.5)] transform group-hover:rotate-12 smooth-transition">
                                        <Award size={48} />
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-5xl font-black text-white tracking-tight leading-tight">Test Your <span className="text-gradient-cyan">Neural Limits</span></h3>
                                        <p className="text-lg font-medium text-slate-400 max-w-xl mx-auto leading-relaxed">
                                            This simulation adapts to your responses in real-time. Full attention is required.
                                        </p>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
                                        {[
                                            { icon: BookOpen, label: "5 Logic MCQs", color: "text-[#6366F1]", bg: "bg-[#6366F1]/10" },
                                            { icon: Code, label: "2 Algorithmic Tasks", color: "text-[#22D3EE]", bg: "bg-[#22D3EE]/10" },
                                            { icon: UserCheck, label: "2 Behavioral Rounds", color: "text-[#8B5CF6]", bg: "bg-[#8B5CF6]/10" }
                                        ].map((item, i) => (
                                            <div key={i} className="p-8 glass-premium-blue rounded-3xl border-white/5 space-y-4 hover:border-white/10 smooth-transition shadow-inner">
                                                <item.icon className={item.color} size={30} />
                                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <Button 
                                        onClick={() => setCurrentStep(1)}
                                        className="h-20 px-16 rounded-2xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-black uppercase tracking-[0.25em] shadow-2xl shadow-indigo-500/40 hover:scale-105 active:scale-95 transition-all text-xs"
                                    >
                                        Initialize Sequence <ArrowRight className="ml-3" />
                                    </Button>
                                </div>
                            </Card>
                        </motion.div>
                    )}

                    {/* Step 1: MCQs */}
                    {currentStep === 1 && (
                        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} key="mcq" className="space-y-10">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-black text-[#22D3EE] uppercase tracking-[0.2em] border-b-2 border-[#22D3EE] pb-2">Segment 01: Theoretical Mastery</span>
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Phase 1 of 3</span>
                            </div>
                            <div className="space-y-10">
                                {testData.mcq.map((q: any, i: number) => (
                                    <Card key={i} className="glass-premium-blue border-white/5 rounded-[2.5rem] p-12 shadow-2xl hover:border-[#6366F1]/30 smooth-transition group">
                                        <div className="space-y-8">
                                            <div className="flex items-start gap-6">
                                                <span className="w-12 h-12 shrink-0 rounded-2xl bg-[#6366F1]/20 text-[#6366F1] flex items-center justify-center font-black text-sm border border-[#6366F1]/30 shadow-inner">0{i+1}</span>
                                                <h4 className="text-2xl font-bold text-white leading-tight tracking-tight pt-2">{q.q}</h4>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                {q.small_options.map((opt: string, oi: number) => (
                                                    <button 
                                                        key={oi}
                                                        onClick={() => setAnswers({...answers, [`mcq_${i}`]: opt})}
                                                        className={`p-7 rounded-2xl border-2 text-left transition-all font-bold text-sm group/opt ${
                                                            answers[`mcq_${i}`] === opt 
                                                                ? 'bg-[#6366F1]/20 border-[#6366F1] text-white shadow-[0_0_20px_rgba(99,102,241,0.2)]' 
                                                                : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/20 hover:bg-white/[0.08]'
                                                        }`}
                                                    >
                                                        <span className="mr-4 opacity-30 font-black italic">{String.fromCharCode(65 + oi)}.</span> {opt}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                            <Button onClick={() => setCurrentStep(2)} className="w-full h-20 rounded-[1.5rem] bg-white text-slate-950 hover:bg-[#22D3EE] font-black uppercase tracking-[0.25em] gap-3 smooth-transition shadow-2xl shadow-white/10 text-xs">
                                Next: Algorithmic Implementation <ChevronRight size={20} />
                            </Button>
                        </motion.div>
                    )}

                    {/* Further steps (Coding, HR, Result) */}
                    {currentStep >= 2 && currentStep < 4 && (
                        <div className="h-[500px] flex flex-col items-center justify-center gap-10">
                             <div className="relative">
                                 <RefreshCw className="animate-spin text-[#6366F1]" size={64} />
                                 <div className="absolute inset-0 bg-[#6366F1] blur-3xl opacity-20 animate-pulse"></div>
                             </div>
                             <div className="space-y-4 text-center">
                                <p className="text-2xl font-black text-white uppercase tracking-[0.3em] animate-pulse">Neural Processing...</p>
                                <p className="text-slate-500 font-medium uppercase tracking-widest text-[10px]">Synchronizing technical segment benchmarks</p>
                             </div>
                             <Button onClick={() => setCurrentStep(4)} className="glass-premium-blue border-white/10 px-12 h-16 rounded-2xl text-white font-black uppercase tracking-widest text-xs hover:bg-[#6366F1] smooth-transition">Force Sync Result</Button>
                        </div>
                    )}

                    {/* Step 4: Final Evaluation */}
                    {currentStep === 4 && (
                         <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-10">
                            <Card className="glass-premium-blue border-white/5 rounded-[3.5rem] p-16 lg:p-24 shadow-[0_0_60px_rgba(0,0,0,0.5)] text-center space-y-10 w-full max-w-3xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 blur-[120px] -mr-40 -mt-40 group-hover:opacity-100 transition-opacity" />
                                <div className="w-28 h-28 rounded-[2.5rem] bg-gradient-to-tr from-emerald-500 to-cyan-500 text-white flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(16,185,129,0.5)] transform hover:rotate-6 smooth-transition">
                                    <CheckCircle2 size={60} />
                                </div>
                                <div className="space-y-6">
                                     <h3 className="text-5xl font-black text-white tracking-tighter italic">Evaluation <span className="text-emerald-500">Complete</span></h3>
                                     <p className="text-lg text-slate-400 font-medium leading-relaxed max-w-lg mx-auto">
                                        Your theoretical performance was <span className="text-white font-bold">Elite</span>. Technical metrics have been synchronized with your profile.
                                     </p>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="p-8 glass-premium-blue rounded-[2rem] border-white/5 flex flex-col items-center gap-2 hover:border-emerald-500/30 smooth-transition shadow-inner">
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Efficiency</span>
                                        <span className="text-3xl font-black text-white tracking-tight">{formatTime(1800 - timer)}</span>
                                    </div>
                                    <div className="p-8 glass-premium-blue rounded-[2rem] border-white/5 flex flex-col items-center gap-2 hover:border-emerald-500/30 smooth-transition shadow-inner">
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Global Rank</span>
                                        <span className="text-3xl font-black text-emerald-500 uppercase tracking-tighter italic">Expert</span>
                                    </div>
                                </div>
                                <Button 
                                    onClick={() => navigate('/history')}
                                    className="h-20 px-12 rounded-2xl bg-white text-slate-950 font-black uppercase tracking-[0.3em] w-full hover:bg-emerald-500 hover:text-white smooth-transition shadow-2xl text-xs"
                                >
                                    Log Session To History
                                </Button>
                            </Card>
                         </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

export default LiveMockTest;
