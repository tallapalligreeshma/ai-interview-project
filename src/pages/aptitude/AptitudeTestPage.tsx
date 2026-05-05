import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { aptitudeQuestions } from "@/data/aptitudeData";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Timer, 
    CheckCircle2, 
    XCircle, 
    Trophy, 
    Zap, 
    RefreshCw,
    AlertCircle,
    ArrowLeft,
    Bookmark,
    Plus,
    Lightbulb,
    Flag,
    BookOpen,
    Target,
    Flame,
    Share2,
    ChevronDown,
    ChevronUp,
    Cpu,
    Sparkles
} from "lucide-react";
import { toast } from "react-toastify";
import { cn } from "@/lib/utils";

export default function AptitudeTestPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const questions = useMemo(() => {
        if (id) {
            return aptitudeQuestions.filter(q => q.id === id);
        }
        return aptitudeQuestions;
    }, [id]);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showSolution, setShowSolution] = useState(false);
    const [timer, setTimer] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [streak, setStreak] = useState(3);
    const [points, setPoints] = useState(1250);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const [showHint, setShowHint] = useState(false);

    const currentQuestion = questions[currentIndex];
    const progress = ((currentIndex + 1) / questions.length) * 100;

    // Timer Logic
    useEffect(() => {
        if (isFinished || isSubmitted) return;
        const interval = setInterval(() => setTimer(prev => prev + 1), 1000);
        return () => clearInterval(interval);
    }, [isFinished, isSubmitted]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleOptionSelect = (idx: number) => {
        if (isSubmitted) return;
        setSelectedOption(idx);
    };

    const handleSubmit = () => {
        if (selectedOption === null) return;
        setIsSubmitted(true);
        if (selectedOption === currentQuestion.correctOption - 1) {
            setStreak(prev => prev + 1);
            setPoints(prev => prev + 50);
            toast.success("Intelligence Vector Secured! +50 XP");
        } else {
            setStreak(0);
            toast.error("Parity Error. Review the logic injection.");
        }
    };

    const handleRetry = () => {
        setIsSubmitted(false);
        setSelectedOption(null);
        setShowSolution(false);
        setShowHint(false);
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setIsSubmitted(false);
            setSelectedOption(null);
            setShowSolution(false);
            setShowHint(false);
            setIsBookmarked(false);
            setIsAdded(false);
        } else {
            setIsFinished(true);
        }
    };

    if (isFinished) {
        return (
            <div className="min-h-screen bg-[#0B0F1A] flex items-center justify-center p-6 page-fade-in">
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#6366F1]/10 rounded-full blur-[150px]" />
                    <div className="absolute bottom-[-10%] left-[-5%] w-[700px] h-[700px] bg-[#22D3EE]/10 rounded-full blur-[150px]" />
                </div>

                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 w-full max-w-2xl">
                    <Card className="glass-premium-blue border-white/5 rounded-[4rem] p-12 lg:p-20 text-center shadow-4xl relative overflow-hidden group">
                        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#6366F1] to-[#22D3EE]" />
                        
                        <div className="relative mb-12 group/orb">
                            <div className="w-32 h-32 bg-[#6366F1]/10 text-[#6366F1] rounded-[2.5rem] flex items-center justify-center mx-auto border border-[#6366F1]/20 shadow-4xl group-hover/orb:scale-110 group-hover/orb:rotate-12 smooth-transition relative overflow-hidden">
                                <Trophy size={64} className="animate-pulse" />
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                            </div>
                            <div className="absolute inset-0 blur-3xl bg-[#6366F1]/10 rounded-full -z-10" />
                        </div>

                        <div className="space-y-6 mb-12">
                            <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-none">Diagnostic <span className="text-gradient-cyan">Successful</span></h2>
                            <p className="text-xl font-bold italic text-slate-400">"Cognitive patterns synchronized. You have mastered these architectural concepts."</p>
                        </div>

                        <div className="grid grid-cols-2 gap-8 mb-12">
                            <div className="p-8 glass-premium-blue border-white/5 rounded-[2.5rem] shadow-inner space-y-2">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 italic block">XP Accumulated</span>
                                <span className="text-4xl font-black text-[#6366F1] italic tracking-tighter leading-none">+250</span>
                            </div>
                            <div className="p-8 glass-premium-blue border-white/5 rounded-[2.5rem] shadow-inner space-y-2">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 italic block">Logic Precision</span>
                                <span className="text-4xl font-black text-[#22D3EE] italic tracking-tighter leading-none">85%</span>
                            </div>
                        </div>

                        <Button onClick={() => navigate('/aptitude')} className="w-full h-20 rounded-[2rem] bg-white text-slate-950 hover:bg-[#6366F1] hover:text-white font-black tracking-[0.4em] uppercase text-xs shadow-4xl transition-all">
                            Back to Command Dashboard
                        </Button>
                    </Card>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0B0F1A] text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden page-fade-in pb-24">
            {/* Background Ambient Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#6366F1]/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[700px] h-[700px] bg-[#22D3EE]/10 rounded-full blur-[150px]" />
            </div>

            {/* Premium Header */}
            <header className="px-6 py-6 lg:px-12 glass-premium-blue border-b border-white/5 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-8">
                    <Button variant="ghost" size="icon" onClick={() => navigate('/aptitude')} className="rounded-xl w-12 h-12 bg-white/5 border border-white/10 hover:border-[#6366F1]/30">
                        <ArrowLeft size={20} className="text-slate-400" />
                    </Button>
                    <div className="hidden md:flex flex-col">
                        <span className="text-[9px] font-black uppercase text-slate-500 tracking-[0.3em] italic">Intelligence Vector</span>
                        <span className="font-black text-white italic tracking-tighter">{currentIndex + 1} <span className="text-slate-600 text-xs uppercase ml-1">/ {questions.length} Nodes</span></span>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                     <div className="hidden sm:flex items-center gap-3 bg-[#F97316]/10 text-[#F97316] px-5 py-2.5 rounded-2xl border border-[#F97316]/20 shadow-inner">
                         <Flame size={18} fill="currentColor" className="animate-pulse" />
                         <span className="font-black text-sm italic tracking-tighter">{streak} SYNC</span>
                     </div>
                     <div className="hidden sm:flex items-center gap-3 bg-[#6366F1]/10 text-[#6366F1] px-5 py-2.5 rounded-2xl border border-[#6366F1]/20 shadow-inner">
                         <Trophy size={18} />
                         <span className="font-black text-sm italic tracking-tighter">{points} XP</span>
                     </div>
                     <div className="flex items-center gap-3 text-[#22D3EE] font-mono font-black text-sm bg-black/40 px-5 py-2.5 rounded-2xl border border-white/5 shadow-inner">
                         <Timer size={18} /> {formatTime(timer)}
                     </div>
                </div>
            </header>

            <main className="max-w-[1500px] mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
                
                {/* Left Side: Question Space (8/12) */}
                <div className="lg:col-span-8 space-y-10">
                    
                    {/* Progress Hub */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                             <div className="space-y-1">
                                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 italic">Neural Sync Progress</span>
                                 <h4 className="text-xl font-black text-white italic tracking-tighter uppercase">Diagnostic Stream</h4>
                             </div>
                             <span className="text-xl font-black text-[#22D3EE] italic tracking-tighter leading-none">{Math.round(progress)}%</span>
                        </div>
                        <div className="h-3 bg-black/40 rounded-full p-0.5 border border-white/5 shadow-inner overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} className="h-full bg-gradient-to-r from-[#6366F1] to-[#22D3EE] rounded-full shadow-[0_0_20px_rgba(99,102,241,0.4)]" />
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="space-y-10"
                        >
                            {/* Question Card */}
                            <Card className="p-10 md:p-16 glass-premium-blue border-white/5 rounded-[4rem] shadow-4xl relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-2 h-full bg-[#6366F1]/20 group-hover:bg-[#6366F1] smooth-transition" />
                                
                                <div className="flex items-center gap-4 mb-12">
                                    <Badge className={cn(
                                        "border-none font-black text-[9px] uppercase tracking-[0.3em] px-4 py-2 rounded-full italic",
                                        currentQuestion.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400' :
                                        currentQuestion.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400' :
                                        'bg-rose-500/10 text-rose-400'
                                    )}>
                                        {currentQuestion.difficulty} Level
                                    </Badge>
                                    <Badge className="bg-white/5 text-slate-400 border border-white/10 font-black text-[9px] uppercase tracking-[0.3em] px-4 py-2 rounded-full italic">
                                        {currentQuestion.category} Sector
                                    </Badge>
                                    <div className="ml-auto hidden sm:flex gap-3">
                                         {currentQuestion.companies.map(c => <span key={c} className="text-[10px] font-black text-slate-600 uppercase tracking-widest italic">#{c}</span>)}
                                    </div>
                                </div>

                                <div className="space-y-12">
                                    <h1 className="text-2xl md:text-3xl font-black leading-tight text-white italic tracking-tighter uppercase">
                                        {currentQuestion.title}
                                    </h1>

                                    {/* MCQ Options */}
                                    <div className="grid grid-cols-1 gap-5">
                                        {currentQuestion.options.map((option, idx) => {
                                            const isSelected = selectedOption === idx;
                                            const isCorrect = currentQuestion.correctOption - 1 === idx;
                                            const showResult = isSubmitted;
                                            
                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() => handleOptionSelect(idx)}
                                                    disabled={isSubmitted}
                                                    className={cn(
                                                        "group/opt p-8 rounded-[2rem] border smooth-transition text-left flex items-center justify-between relative overflow-hidden",
                                                        !showResult && isSelected ? "bg-[#6366F1]/10 border-[#6366F1]/40 shadow-inner" : 
                                                        !showResult ? "bg-white/[0.02] border-white/5 hover:border-[#6366F1]/20 hover:bg-white/[0.04]" :
                                                        isCorrect ? "bg-emerald-500/10 border-emerald-500/40 shadow-inner" :
                                                        isSelected ? "bg-rose-500/10 border-rose-500/40 shadow-inner" : "bg-white/[0.01] border-white/[0.03] opacity-40"
                                                    )}
                                                >
                                                    <div className="flex items-center gap-6 relative z-10">
                                                        <div className={cn(
                                                            "w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xs smooth-transition",
                                                            isSelected ? "bg-[#6366F1] text-white" : "bg-white/5 text-slate-500 group-hover/opt:bg-[#6366F1]/20 group-hover/opt:text-[#6366F1]"
                                                        )}>
                                                            {String.fromCharCode(65 + idx)}
                                                        </div>
                                                        <span className={cn(
                                                            "text-lg font-bold italic smooth-transition",
                                                            isSelected ? "text-white" : "text-slate-400 group-hover/opt:text-white"
                                                        )}>{option}</span>
                                                    </div>
                                                    
                                                    {showResult && isCorrect && <CheckCircle2 size={24} className="text-emerald-400 relative z-10 animate-bounce" />}
                                                    {showResult && isSelected && !isCorrect && <XCircle size={24} className="text-rose-400 relative z-10" />}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {!isSubmitted ? (
                                    <Button 
                                        onClick={handleSubmit} 
                                        disabled={selectedOption === null}
                                        className="mt-16 w-full h-20 rounded-[2.5rem] bg-white text-slate-950 hover:bg-[#6366F1] hover:text-white font-black uppercase tracking-[0.4em] text-xs shadow-4xl smooth-transition disabled:opacity-20"
                                    >
                                        Initialize Logic Sync
                                    </Button>
                                ) : (
                                    <div className="mt-16 space-y-8">
                                        <div className={cn(
                                            "p-8 rounded-[2.5rem] border flex items-start gap-6 relative overflow-hidden shadow-inner",
                                            selectedOption === currentQuestion.correctOption - 1 ? "bg-emerald-500/5 border-emerald-500/20" : "bg-rose-500/5 border-rose-500/20"
                                        )}>
                                            <div className={cn(
                                                "p-4 rounded-2xl shrink-0",
                                                selectedOption === currentQuestion.correctOption - 1 ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"
                                            )}>
                                                {selectedOption === currentQuestion.correctOption - 1 ? <Sparkles size={28} /> : <AlertCircle size={28} />}
                                            </div>
                                            <div className="space-y-2 relative z-10">
                                                <h4 className="text-xl font-black text-white italic uppercase tracking-tighter">
                                                    {selectedOption === currentQuestion.correctOption - 1 ? 'Logic Verified' : 'Sync Error Detected'}
                                                </h4>
                                                <p className="text-sm font-bold text-slate-500 italic leading-relaxed">
                                                    "{currentQuestion.explanation.split('.')[0]}. Decrypting full architectural solution below."
                                                </p>
                                            </div>
                                        </div>

                                        {/* Solution Hub */}
                                        <div className="rounded-[3rem] glass-premium-blue border-white/5 overflow-hidden shadow-inner">
                                            <button 
                                                onClick={() => setShowSolution(!showSolution)}
                                                className="w-full px-12 py-8 flex items-center justify-between hover:bg-white/5 smooth-transition"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <BookOpen size={22} className="text-[#6366F1]" />
                                                    <span className="font-black text-[10px] uppercase tracking-[0.4em] text-white italic">Neural Logic Extraction</span>
                                                </div>
                                                {showSolution ? <ChevronUp size={22} className="text-slate-500" /> : <ChevronDown size={22} className="text-slate-500" />}
                                            </button>
                                            
                                            <AnimatePresence>
                                                {showSolution && (
                                                    <motion.div 
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="px-12 pb-12 pt-4"
                                                    >
                                                        <div className="h-[1px] bg-white/5 mb-10" />
                                                        <div className="space-y-10">
                                                            <div className="flex gap-6">
                                                                <div className="w-10 h-10 rounded-2xl bg-[#6366F1]/10 text-[#6366F1] flex items-center justify-center font-black text-xs shrink-0 mt-1 border border-[#6366F1]/20">01</div>
                                                                <p className="text-base font-bold text-slate-400 italic leading-relaxed">{currentQuestion.explanation}</p>
                                                            </div>
                                                            <div className="p-8 bg-[#22D3EE]/5 rounded-[2.5rem] border border-[#22D3EE]/10 relative overflow-hidden">
                                                                <div className="absolute top-0 right-0 p-6 opacity-[0.03]">
                                                                    <Zap size={80} className="text-[#22D3EE]" />
                                                                </div>
                                                                <div className="flex items-center gap-3 mb-4 text-[10px] font-black uppercase text-[#22D3EE] tracking-[0.4em] italic">
                                                                    <Target size={16} /> Velocity Shortcut
                                                                </div>
                                                                <p className="text-sm font-bold text-slate-500 italic leading-relaxed">
                                                                    "Optimizing results: Elimination of unit digits secures the vector in ~30% less cycles. Avoid complete calculation."
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                        
                                        <Button 
                                            onClick={handleNext}
                                            className="w-full h-20 rounded-[2.5rem] bg-gradient-to-r from-[#6366F1] to-[#22D3EE] text-white font-black uppercase tracking-[0.4em] text-xs shadow-4xl smooth-transition hover:scale-[1.02] active:scale-95"
                                        >
                                            {currentIndex === questions.length - 1 ? 'Terminate Practice Stream' : 'Calibrate Next Vector'}
                                        </Button>
                                    </div>
                                )}
                            </Card>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Right Side: Action Hub (4/12) */}
                <div className="lg:col-span-4 space-y-8">
                    
                    {/* Sector Mastery Card */}
                    <Card className="p-10 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-[3.5rem] border-none text-white shadow-4xl relative overflow-hidden group">
                        <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 smooth-transition">
                            <Cpu size={200} />
                        </div>
                        <div className="relative z-10 space-y-6">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60 italic">Architect Skill Rank</span>
                            <h3 className="text-3xl font-black italic tracking-tighter uppercase leading-none">{currentQuestion.category}</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-[10px] font-black uppercase italic tracking-widest">
                                    <span>Sync Rank 12</span>
                                    <span>88% Accuracy</span>
                                </div>
                                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                                    <motion.div initial={{ width: 0 }} animate={{ width: "88%" }} className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Action Protocol Hub */}
                    <Card className="p-4 glass-premium-blue border-white/5 rounded-[3.5rem] shadow-4xl space-y-2">
                        <div className="p-8 border-b border-white/5">
                             <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 italic">Command Protocol</h4>
                        </div>
                        
                        <div className="p-3 grid grid-cols-1 gap-3">
                            <button 
                                onClick={() => { setIsAdded(!isAdded); toast.success(isAdded ? "Removed from list" : "Added to Practice List"); }}
                                className={cn(
                                    "flex items-center justify-between px-8 py-5 rounded-[1.5rem] smooth-transition",
                                    isAdded ? "bg-[#6366F1] text-white shadow-xl" : "bg-white/[0.02] hover:bg-white/[0.06] text-slate-400 hover:text-white border border-white/5"
                                )}
                            >
                                <div className="flex items-center gap-4">
                                    <Plus size={20} className={cn("smooth-transition", isAdded && "rotate-45")} />
                                    <span className="text-xs font-black uppercase tracking-widest italic">{isAdded ? 'Node Added' : 'Sync to List'}</span>
                                </div>
                            </button>

                            <button 
                                onClick={() => { setIsBookmarked(!isBookmarked); toast.info(isBookmarked ? "Bookmark removed" : "Question bookmarked"); }}
                                className={cn(
                                    "flex items-center justify-between px-8 py-5 rounded-[1.5rem] smooth-transition",
                                    isBookmarked ? "bg-amber-500 text-white shadow-xl" : "bg-white/[0.02] hover:bg-white/[0.06] text-slate-400 hover:text-white border border-white/5"
                                )}
                            >
                                <div className="flex items-center gap-4">
                                    <Bookmark size={20} fill={isBookmarked ? "currentColor" : "none"} />
                                    <span className="text-xs font-black uppercase tracking-widest italic">{isBookmarked ? 'Mark Node' : 'Bookmark Node'}</span>
                                </div>
                            </button>

                            <button 
                                onClick={handleRetry}
                                className="flex items-center justify-between px-8 py-5 rounded-[1.5rem] bg-white/[0.02] hover:bg-white/[0.06] text-slate-400 hover:text-white border border-white/5 smooth-transition"
                            >
                                <div className="flex items-center gap-4">
                                    <RefreshCw size={20} />
                                    <span className="text-xs font-black uppercase tracking-widest italic">Recalibrate Sync</span>
                                </div>
                            </button>

                            <button 
                                onClick={() => setShowHint(true)}
                                className={cn(
                                    "flex items-center justify-between px-8 py-5 rounded-[1.5rem] smooth-transition",
                                    showHint ? "bg-[#22D3EE]/10 text-[#22D3EE] border-[#22D3EE]/20 shadow-inner" : "bg-white/[0.02] hover:bg-white/[0.06] text-slate-400 hover:text-white border border-white/5"
                                )}
                            >
                                <div className="flex items-center gap-4">
                                    <Lightbulb size={20} />
                                    <span className="text-xs font-black uppercase tracking-widest italic">Extract Hint</span>
                                </div>
                            </button>

                            <div className="h-[1px] bg-white/5 my-3" />

                            <button className="flex items-center justify-between px-8 py-5 rounded-[1.5rem] bg-white/[0.01] hover:bg-rose-500/10 text-slate-600 hover:text-rose-500 smooth-transition">
                                <div className="flex items-center gap-4">
                                    <Flag size={20} />
                                    <span className="text-xs font-black uppercase tracking-widest italic">Report Parity Error</span>
                                </div>
                            </button>
                        </div>
                    </Card>

                    {/* Hint Banner */}
                    <AnimatePresence>
                        {showHint && (
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-10 bg-amber-500/10 border border-amber-500/20 rounded-[3rem] relative overflow-hidden shadow-inner">
                                <div className="absolute top-0 right-0 p-6 opacity-[0.03]">
                                    <Lightbulb size={80} className="text-amber-500" />
                                </div>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-8 h-8 bg-amber-500/20 rounded-xl flex items-center justify-center text-amber-500 border border-amber-500/20">
                                        <Sparkles size={16} />
                                    </div>
                                    <span className="text-[10px] font-black uppercase text-amber-500 tracking-[0.4em] italic">Neural Coach Insight</span>
                                </div>
                                <p className="text-sm font-bold text-amber-200 leading-relaxed italic">
                                    "Try using the LCM method instead of finding individual work rates to optimize cycle time."
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Share Protocol */}
                    <button className="w-full p-10 glass-premium-blue border border-dashed border-white/10 rounded-[3rem] flex items-center justify-center gap-4 text-slate-500 hover:border-[#6366F1] hover:text-[#6366F1] smooth-transition group">
                        <Share2 size={20} className="group-hover:scale-125 smooth-transition" />
                        <span className="text-xs font-black uppercase tracking-[0.3em] italic">Propagate Diagnostic</span>
                    </button>

                </div>
            </main>

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
}


