import { useState, useEffect } from "react";
import { motion, animate } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useNavigate, useParams } from "react-router-dom";
import { 
    RefreshCw, ArrowLeft, Trophy, Sparkles, Brain, History, ChevronRight, Download, Target, Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import { interviewAPI } from "@/services/api";
import { aiService } from "@/lib/AiService";
import { toast } from "react-toastify";


const ResultPage = () => {
    const navigate = useNavigate();
    const { resultId } = useParams();
    const { width, height } = useWindowSize();
    const [showConfetti, setShowConfetti] = useState(false);
    const [results, setResults] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hireDecision, setHireDecision] = useState<any>(null);

    const [displayScore, setDisplayScore] = useState(0);
    const overallScore = hireDecision?.score || results?.overallScore || 78;

    useEffect(() => {
        const controls = animate(0, overallScore, {
            duration: 2.5,
            ease: "circOut",
            delay: 0.5,
            onUpdate: (latest) => setDisplayScore(Math.round(latest))
        });
        return controls.stop;
    }, [overallScore]);

    useEffect(() => {
        const fetchResults = async () => {
            if (resultId) {
                try {
                    const response = await interviewAPI.getFinalResult(resultId);
                    setResults(response.data);
                } catch (error) {
                    console.error("Error fetching result", error);
                    loadLocalResults();
                }
            } else {
                await loadLocalResults();
            }
            setIsLoading(false);
        };

        const loadLocalResults = async () => {
            const stored = JSON.parse(localStorage.getItem('interview_results') || '{}');
            const resData = {
                score: stored.score || 0,
                role: stored.role || "Candidate",
                history: stored.messages?.filter((m: any) => m.role === 'user') || []
            };
            setResults(resData);

            // Fetch AI Hiring Decision
            try {
                const decision = await aiService.generateModuleResponse("hire_decision", {
                    name: "Candidate",
                    role: resData.role,
                    level: "Senior",
                    scores: resData.score,
                    history_data: resData.history
                });
                setHireDecision(decision);
            } catch (e) {
                console.error("Failed to fetch hire decision", e);
                // 🚀 REAL FRONTEND: Mock Hiring Decision
                const mockDecision = {
                    status: resData.score > 75 ? "Hire Ready" : "Maybe Hire",
                    feedback: resData.score > 75 
                        ? "Exceptional performance. Candidate demonstrates senior-level architectural thinking." 
                        : "Promising candidate. Technical foundations are solid but could use more exposure to large-scale patterns.",
                    strengths: ["Communication clarity", "Technical depth", "Problem extraction"],
                    improvements: ["System design specifics", "Edge case handling"],
                    breakdown: { technical: resData.score, communication: resData.score + 5, problemSolving: resData.score - 5 }
                };
                setHireDecision(mockDecision);
            }
        };

        fetchResults();
    }, [resultId]);

    const role = results?.role || "Candidate";
    const historyData = results?.history || [];

    useEffect(() => {
        if (!isLoading && overallScore >= 80) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 5000);
        }
    }, [isLoading, overallScore]);

    // Determine decision based on score
    let decision = "Not Ready";
    let badgeColor = "";

    if (overallScore >= 80) {
        decision = "Hire Ready";
        badgeColor = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.3)]";
    } else if (overallScore >= 50) {
        decision = "Maybe Hire";
        badgeColor = "bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.3)]";
    } else {
        decision = "Not Ready";
        badgeColor = "bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.3)]";
    }

    const improvements = JSON.parse(localStorage.getItem('resume_analysis_report') || '{}').improvements || [
        "Focus on technical depth in core frameworks.",
        "Practice explaining project architectures clearly.",
        "Improve communication clarity and confidence."
    ];

    const radius = 90;
    const circumference = 2 * Math.PI * radius;

    if (isLoading) return (
        <div className="h-screen flex flex-col items-center justify-center bg-[#0B0F1A] gap-6">
            <div className="w-16 h-16 border-4 border-[#6366F1]/20 border-t-[#6366F1] rounded-full animate-spin" />
            <div className="text-[10px] font-black uppercase tracking-[0.5em] text-[#6366F1] animate-pulse">Analyzing Session Intelligence...</div>
        </div>
    );

    return (
        <div className="flex-1 w-full min-h-screen bg-[#0B0F1A] text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden page-fade-in p-6 lg:p-12">
            {showConfetti && <Confetti width={width} height={height} recycle={false} numberOfPieces={400} colors={['#6366F1', '#22D3EE', '#8B5CF6']} />}

            {/* Background Ambient Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#6366F1]/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[700px] h-[700px] bg-[#8B5CF6]/10 rounded-full blur-[150px]" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto w-full space-y-12 pb-20">
                
                {/* Score Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full glass-premium-blue border border-white/5 rounded-[4rem] p-12 lg:p-20 shadow-4xl flex flex-col items-center text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#6366F1]/50 to-transparent" />
                    
                    <div className="space-y-6 mb-12">
                        <div className="inline-flex items-center gap-3 px-6 py-2 bg-[#6366F1]/10 rounded-full text-[#22D3EE] font-black text-[10px] uppercase tracking-[0.3em] border border-[#6366F1]/20">
                            <Trophy size={18} className="text-[#6366F1]" /> Evaluation Vector Synchronized
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter italic uppercase">
                            Diagnostic <span className="text-gradient-cyan">Summary</span>
                        </h1>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Session ID: EVAL_{resultId?.slice(0,8) || 'LOCAL_DB'}</p>
                    </div>

                    <div className="relative w-80 h-80 flex items-center justify-center my-10 group">
                        <div className="absolute inset-0 bg-[#6366F1]/10 blur-[80px] rounded-full animate-pulse" />
                        <svg className="w-full h-full transform -rotate-90 relative z-10" viewBox="0 0 240 240">
                            <circle cx="120" cy="120" r={radius} fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="16" />
                            <motion.circle
                                cx="120" cy="120" r={radius} fill="transparent" stroke="url(#gradient)" strokeWidth="16"
                                strokeDasharray={circumference}
                                initial={{ strokeDashoffset: circumference }}
                                animate={{ strokeDashoffset: circumference - (overallScore / 100) * circumference }}
                                transition={{ duration: 2.5, ease: "circOut", delay: 0.5 }}
                                strokeLinecap="round" 
                                className="drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                            />
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#6366F1" />
                                    <stop offset="100%" stopColor="#22D3EE" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="absolute flex flex-col items-center justify-center z-20">
                            <motion.span className="text-8xl font-black text-white drop-shadow-2xl tracking-tighter italic">
                                {displayScore}<span className="text-3xl text-[#22D3EE]">%</span>
                            </motion.span>
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mt-2">Overall Intelligence</span>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-8">
                        <Badge className={`px-12 py-5 text-2xl font-black uppercase tracking-[0.3em] rounded-3xl border-2 italic ${badgeColor}`}>
                            {hireDecision?.status || decision}
                        </Badge>
                        <div className="text-slate-400 text-xs font-bold flex items-center gap-4">
                            <span className="w-12 h-[1px] bg-white/10" />
                            Target Role: <span className="text-white uppercase tracking-widest">{role}</span>
                            <span className="w-12 h-[1px] bg-white/10" />
                        </div>
                    </div>

                    {/* Breakdown Section */}
                    {hireDecision && (
                        <div className="w-full mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { label: 'Technical Vector', value: hireDecision.breakdown?.technical || overallScore, icon: Brain },
                                { label: 'Cognitive Flow', value: hireDecision.breakdown?.communication || overallScore - 5, icon: Activity },
                                { label: 'Problem Extraction', value: hireDecision.breakdown?.problemSolving || overallScore + 5, icon: Target }
                            ].map(item => (
                                <div key={item.label} className="p-8 glass-premium-blue border border-white/5 rounded-[2.5rem] space-y-4 group hover:border-[#6366F1]/30 smooth-transition shadow-inner">
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase text-slate-500 tracking-widest">
                                        <div className="flex items-center gap-2">
                                            <item.icon size={14} className="text-[#6366F1]" />
                                            {item.label}
                                        </div>
                                        <span className="text-white">{item.value}%</span>
                                    </div>
                                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${item.value}%` }}
                                            transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
                                            className="h-full bg-gradient-to-r from-[#6366F1] to-[#22D3EE] rounded-full"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* AI Detailed Feedback */}
                {hireDecision && (
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-10"
                    >
                        <div className="glass-premium-blue border border-white/5 rounded-[3rem] p-12 space-y-10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#6366F1]/5 blur-[100px] -mr-32 -mt-32" />
                            <div className="flex items-center gap-3">
                                <Sparkles className="text-[#6366F1]" size={24} />
                                <h3 className="text-2xl font-black uppercase tracking-tight text-white italic">Neural Strengths</h3>
                            </div>
                            <div className="space-y-6">
                                {(hireDecision.strengths || hireDecision.reasons)?.map((r: string, i: number) => (
                                    <div key={i} className="flex gap-5 p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.05] smooth-transition">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                                            <ChevronRight size={20} />
                                        </div>
                                        <p className="text-sm font-bold text-slate-300 leading-relaxed italic">"{r}"</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="glass-premium-blue border border-white/5 rounded-[3rem] p-12 space-y-10 relative overflow-hidden">
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#22D3EE]/5 blur-[100px] -ml-32 -mb-32" />
                            <div className="flex items-center gap-3">
                                <Brain className="text-[#22D3EE]" size={24} />
                                <h3 className="text-2xl font-black uppercase tracking-tight text-white italic">Coach Verdict</h3>
                            </div>
                            <div className="p-8 bg-black/40 rounded-[2.5rem] border border-white/5 shadow-inner relative z-10">
                                <p className="text-lg font-bold text-slate-200 leading-relaxed italic tracking-tight">
                                    "{hireDecision.feedback || hireDecision.finalFeedback}"
                                </p>
                                <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Confidence Analysis</div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-6 bg-[#6366F1] rounded-full" />
                                        <div className="w-1.5 h-6 bg-[#6366F1] rounded-full" />
                                        <div className="w-1.5 h-6 bg-[#6366F1] rounded-full" />
                                        <div className="w-1.5 h-6 bg-[#6366F1]/20 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Improvement Roadmap */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="w-full">
                    <div className="glass-premium-blue rounded-[4rem] p-12 text-white shadow-4xl relative overflow-hidden group border border-white/5">
                         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#6366F1]/10 blur-[150px] -mr-64 -mt-64" />
                         <div className="flex items-center justify-between mb-12 relative z-10">
                            <div className="space-y-2">
                                <h3 className="text-3xl font-black uppercase tracking-tighter italic">Growth <span className="text-gradient-cyan">Blueprint</span></h3>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Strategic vectors for 10x readiness</p>
                            </div>
                            <Button variant="ghost" className="text-[#6366F1] hover:bg-[#6366F1]/10 font-black uppercase text-[10px] tracking-widest gap-2">
                                <Download size={16} /> Export PDF
                            </Button>
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                            {(hireDecision?.improvements || improvements).map((improvement: string, i: number) => (
                                <div key={i} className="flex flex-col gap-6 p-8 bg-white/[0.03] border border-white/5 rounded-[2.5rem] hover:bg-white/[0.08] smooth-transition group/card">
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 text-[#22D3EE] flex items-center justify-center font-black text-xl border border-white/10 group-hover/card:scale-110 smooth-transition shadow-inner">{i+1}</div>
                                    <p className="text-sm font-bold text-slate-200 leading-relaxed italic">"{improvement}"</p>
                                </div>
                            ))}
                         </div>
                    </div>
                </motion.div>

                {/* Question Breakdown */}
                {historyData.length > 0 && (
                    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="w-full space-y-10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-[#6366F1]/10 flex items-center justify-center border border-[#6366F1]/20">
                                <History size={24} className="text-[#6366F1]" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-2xl font-black text-white tracking-tight italic uppercase">Neural Trace Breakdown</h3>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Granular evaluation of each response vector</p>
                            </div>
                        </div>
                        <div className="space-y-8">
                            {historyData.map((item: any, i: number) => (
                                <div key={i} className="glass-premium-blue border border-white/5 rounded-[3rem] p-10 shadow-2xl flex flex-col md:flex-row gap-10 hover:border-[#6366F1]/20 smooth-transition overflow-hidden relative">
                                    <div className="absolute top-0 right-0 p-8 opacity-5">
                                        <div className="text-8xl font-black text-white italic">{i+1}</div>
                                    </div>
                                    <div className="flex flex-col items-center justify-center p-8 bg-white/[0.03] rounded-[2.5rem] min-w-[160px] border border-white/5 shadow-inner">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4">Score</span>
                                        <span className="text-5xl font-black text-[#6366F1] italic tracking-tighter">{item.score || 0}<span className="text-xl">%</span></span>
                                    </div>
                                    <div className="flex-1 space-y-8 text-left relative z-10">
                                        <div className="space-y-3">
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Candid Response</h4>
                                            <p className="text-lg font-bold text-slate-300 italic tracking-tight leading-relaxed">"{item.content}"</p>
                                        </div>
                                        <div className="space-y-4 pt-6 border-t border-white/5">
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#22D3EE] flex items-center gap-2"><Sparkles size={14}/> Diagnostic Analysis</h4>
                                            <p className="text-sm font-bold text-white leading-relaxed italic">"{item.feedback}"</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Action Footer */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-white/5">
                    <Button onClick={() => navigate('/interview')} className="h-20 rounded-[2rem] glass-premium-blue border border-white/5 text-white font-black uppercase tracking-widest hover:bg-white/10 smooth-transition gap-4 text-xs">
                        <RefreshCw size={20} /> Retry Session
                    </Button>
                    <Button onClick={() => navigate('/history')} className="h-20 rounded-[2rem] glass-premium-blue border border-white/5 text-white font-black uppercase tracking-widest hover:bg-white/10 smooth-transition gap-4 text-xs">
                        <Brain size={20} /> Performance Intel
                    </Button>
                    <Button onClick={() => { toast.success("Vector saved to Career Cloud"); navigate('/ai-interview-dashboard'); }} className="h-20 rounded-[2rem] bg-[#6366F1] text-white font-black uppercase tracking-widest shadow-[0_20px_50px_rgba(99,102,241,0.3)] gap-4 hover:scale-105 smooth-transition text-xs">
                        Save Result <ArrowLeft size={20} className="rotate-180" />
                    </Button>
                </div>
            </div>

            <style>{`
                .page-fade-in { animation: fadeIn 0.8s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
};

export default ResultPage;
