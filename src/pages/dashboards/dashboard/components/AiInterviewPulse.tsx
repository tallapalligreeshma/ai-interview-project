import { useState, useEffect } from "react";
import { 
  Zap, 
  Target, 
  ChevronRight, 
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Brain,
  Rocket,
  ShieldCheck,
  Trophy,
  ArrowRight
} from "lucide-react";
import { aiService } from "@/lib/AiService";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const AiInterviewPulse = () => {
    const navigate = useNavigate();
    const [advice, setAdvice] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    const userMockData = {
        role: "Java Developer",
        weakAreas: ["OOPS", "SQL Join"],
        lastScore: 65
    };

    useEffect(() => {
        const fetchAdvice = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user') || '{}');
                const data = await aiService.generateModuleResponse("dashboard", {
                    name: user.username || "Candidate",
                    role: userMockData.role,
                    level: "Senior",
                    scores: userMockData.lastScore
                });
                setAdvice(data);
            } catch (error) {
                console.error("Failed to fetch dashboard intelligence", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAdvice();
    }, []);

  if (isLoading) return <div className="h-full flex items-center justify-center text-primary animate-pulse font-black uppercase text-xs tracking-widest">Initializing AI Interview Insights...</div>;

  return (
    <div className="flex flex-col h-full gap-6">
      
      {/* 1. Header: Dashboard Career Brain */}
      <div className="flex flex-col gap-1 px-1">
        <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-neutral-800 dark:text-white tracking-tight uppercase flex items-center gap-2">
                <Brain className="text-primary" size={24} /> AI Interview Intelligence
            </h3>
            <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse">
                Analysis Engine Active
            </div>
        </div>
        <p className="text-sm font-bold text-neutral-400 dark:text-slate-500">Personalized daily guidance based on stats</p>
      </div>

      {/* 2. Today's Improvement Plan (Feature 1) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 px-1">
            <Rocket size={16} className="text-primary" />
            <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Today's Focus</span>
        </div>
        <div className="space-y-3">
                <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start gap-4 p-5 bg-white dark:bg-slate-900 border border-neutral-100 dark:border-slate-800 rounded-3xl shadow-sm hover:border-primary/30 transition-all border-l-4 border-l-primary"
                >
                    <div className="w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-[10px] font-black shrink-0">
                        !
                    </div>
                    <div>
                        <p className="text-xs font-black text-neutral-700 dark:text-slate-300 uppercase tracking-tight mb-1">Key Improvement Tip</p>
                        <p className="text-xs font-bold text-neutral-500 dark:text-slate-400 leading-relaxed font-sans">{advice?.improvementSuggestion || "Analyze core framework patterns."}</p>
                    </div>
                </motion.div>
        </div>
      </div>

      {/* 3. Next Best Action (Feature 2) */}
      <div className="p-8 rounded-[3rem] bg-slate-950 text-white relative overflow-hidden group shadow-2xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[80px]" />
        <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2">
                <Target size={16} className="text-primary" />
                <span className="text-[10px] font-black text-primary uppercase tracking-widest">Target Objective</span>
            </div>
            <p className="text-sm font-black tracking-tight leading-tight italic">
                "{advice?.nextRecommendedAction || "Master your system design fundamentals."}"
            </p>
            <Button 
                onClick={() => navigate('/practice')}
                className="w-full h-14 bg-white text-slate-950 hover:bg-white/90 rounded-2xl font-black uppercase text-[10px] tracking-widest gap-2 shadow-xl shadow-white/10"
            >
                Start Practice Session <ArrowRight size={14} />
            </Button>
        </div>
      </div>

      {/* 4. Performance Summary (Integrated) */}
      <div className="px-1 space-y-4">
        <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-rose-500" />
            <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Interview Readiness Status</span>
        </div>
        <div className="flex flex-wrap gap-2">
            <div className="px-4 py-2 bg-rose-500/10 text-rose-500 border border-rose-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                <AlertCircle size={12} /> {advice?.progressSummary?.[0] || "Review Needed"}
            </div>
            <div className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                <Trophy size={11} /> Last Interview Score: {userMockData.lastScore}%
            </div>
        </div>
      </div>

      {/* 5. Welcome & Coaching */}
      <div className="mt-auto p-8 bg-gradient-to-br from-primary/5 to-purple-500/5 dark:from-primary/10 dark:to-purple-500/10 border border-primary/10 dark:border-primary/20 rounded-[3rem] flex gap-5 relative overflow-hidden">
        <div className="absolute -bottom-6 -right-6 opacity-10">
            <Sparkles size={80} />
        </div>
        <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 border border-primary/20 text-primary flex items-center justify-center shrink-0 shadow-2xl relative z-10">
            <Sparkles size={24} className="fill-current" />
        </div>
        <div className="flex flex-col gap-1 relative z-10">
            <p className="text-[10px] font-black text-primary uppercase tracking-widest leading-none mb-1">AI Career Coaching Feedback</p>
            <p className="text-sm font-black text-neutral-800 dark:text-white leading-tight mb-2">{advice?.welcomeMessage || "Welcome back!"}</p>
            <p className="text-xs font-medium text-neutral-500 dark:text-slate-400 leading-relaxed italic pr-4">
                "{advice?.progressSummary || "Keep up the great momentum in your technical rounds."}"
            </p>
        </div>
      </div>

    </div>
  );
};

export default AiInterviewPulse;
