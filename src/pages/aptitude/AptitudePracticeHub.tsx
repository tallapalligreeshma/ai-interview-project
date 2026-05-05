import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    ChevronRight, 
    Trophy, CheckCircle2, XCircle, Timer, Bookmark,
    LayoutGrid, ListChecks, BarChart3, Settings2, RefreshCw,
    Plus, Lightbulb, Star, 
    AlertCircle, Flame, Sparkles, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { aiService } from "@/lib/AiService";
import { toast } from "react-toastify";
import Breadcrumb from "@/layouts/Breadcrumb";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { aptitudeTopics } from "@/data/aptitudeData";

const AptitudePracticeHub = () => {
    const { width, height } = useWindowSize();
    const [step, setStep] = useState(1); // 1: Hub, 2: Session, 3: Result
    const [config, setConfig] = useState<any>({
        topic: "Quantitative",
        subtopic: "Percentages",
        difficulty: "Easy",
        count: 10
    });

    const categories = ["Quantitative", "Logical", "Verbal"];
    
    // Filter subtopics based on Category AND Difficulty
    const filteredSubtopics = useMemo(() => {
        return aptitudeTopics.filter(t => 
            t.category === config.topic && 
            t.difficulty === config.difficulty
        );
    }, [config.topic, config.difficulty]);

    // Update subtopic when filter changes
    useEffect(() => {
        if (filteredSubtopics.length > 0) {
            const currentSubtopicExists = filteredSubtopics.some(s => s.title === config.subtopic);
            if (!currentSubtopicExists) {
                setConfig((prev: any) => ({ ...prev, subtopic: filteredSubtopics[0].title }));
            }
        }
    }, [filteredSubtopics]);

    // Session States
    const [isLoading, setIsLoading] = useState(false);
    const [questions, setQuestions] = useState<any[]>([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isEvaluated, setIsEvaluated] = useState(false);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(600); // 10 mins
    const [showConfetti, setShowConfetti] = useState(false);
    const [results, setResults] = useState<any>(null);
    const [showSolution, setShowSolution] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const startPractice = async () => {
        setIsLoading(true);
        try {
            // mode is now internally 'Most Repeated'
            const data = await aiService.generateModuleResponse("aptitude_hub_gen", { ...config, mode: "Most Repeated" });
            setQuestions(data.questions || []);
            setStep(2);
            setCurrentIdx(0);
            setScore(0);
            setTimeLeft(config.count * 60);
        } catch (err) {
            toast.error("Failed to fetch questions. Try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleAnswerSubmit = () => {
        if (!selectedAnswer) return;
        const correct = selectedAnswer === questions[currentIdx].correct_answer;
        if (correct) {
            setScore(prev => prev + 10);
            toast.success("Correct! +10 Points");
        } else {
            toast.error("Incorrect. Review the solution below.");
        }
        setIsEvaluated(true);
    };

    const nextQuestion = () => {
        if (currentIdx + 1 < questions.length) {
            setCurrentIdx(prev => prev + 1);
            resetQuestionState();
        } else {
            finishSession();
        }
    };

    const resetQuestionState = () => {
        setSelectedAnswer(null);
        setIsEvaluated(false);
        setShowSolution(false);
        setShowHint(false);
        setIsAdded(false);
        setIsBookmarked(false);
    };

    const finishSession = async () => {
        setIsLoading(true);
        try {
            const finalData = await aiService.generateModuleResponse("final_summary", {
                score: score,
                total: questions.length * 10,
                topic: config.topic
            });
            setResults(finalData);
            setStep(3);
            if (score / (questions.length * 10) >= 0.8) {
                setShowConfetti(true);
                setTimeout(() => setShowConfetti(false), 5000);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        let timerId: any;
        if (step === 2 && timeLeft > 0 && !isLoading) {
            timerId = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        } else if (timeLeft === 0 && step === 2) {
            finishSession();
        }
        return () => clearInterval(timerId);
    }, [step, timeLeft, isLoading]);

    const formatTime = (secs: number) => {
        const m = Math.floor(secs / 60);
        const s = secs % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex flex-col min-h-[calc(100vh-80px)] bg-neutral-50 dark:bg-[#0B0F1A] p-4 lg:p-10 relative overflow-hidden">
            {showConfetti && <Confetti width={width} height={height} recycle={false} />}
            
            <Breadcrumb title="Aptitude Practice" text={step === 1 ? "Setup Session" : step === 2 ? "Live Practice" : "Performance Hub"} />

            {/* Background Decorative Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20 dark:opacity-40">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[140px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[140px] animate-pulse delay-1000" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto w-full mt-4 font-sans">
                
                {/* STEP 1: HUB CONFIGURATION SCREEN (PREMIUM GRID) */}
                {step === 1 && (
                    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-12">
                        <div className="text-center space-y-6">
                            <Badge className="bg-primary/10 text-primary border-none px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest mx-auto animate-bounce">
                                <Sparkles size={14} className="mr-2 fill-current" /> Intelligent Question Selection
                            </Badge>
                            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
                                Master Most <br/>
                                <span className="premium-gradient-text italic">Repeated Questions</span>
                            </h1>
                            <p className="text-slate-500 font-medium max-w-2xl mx-auto text-lg leading-relaxed">
                                Solve high-frequency patterns asked in top-tier technical interviews.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                            
                            {/* Left: Setup Panel (7/12) */}
                            <Card className="lg:col-span-7 bg-white dark:bg-slate-900/50 border border-neutral-200 dark:border-white/5 rounded-[3.5rem] p-8 lg:p-14 shadow-4xl relative overflow-hidden backdrop-blur-xl">
                                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none dark:text-white">
                                    <Settings2 size={120} />
                                </div>
                                
                                <div className="space-y-10 relative z-10 font-sans">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 px-1">
                                                <LayoutGrid size={14} className="text-primary" />
                                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Select Category</label>
                                            </div>
                                            <select 
                                                value={config.topic}
                                                onChange={(e) => setConfig({...config, topic: e.target.value})}
                                                className="w-full h-18 rounded-2xl bg-neutral-50 dark:bg-slate-800/50 border border-neutral-100 dark:border-white/5 text-slate-900 dark:text-white font-black px-6 outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all cursor-pointer"
                                            >
                                                {categories.map(c => <option key={c} className="bg-white dark:bg-slate-900" value={c}>{c}</option>)}
                                            </select>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 px-1">
                                                <ListChecks size={14} className="text-primary" />
                                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Select Subtopic</label>
                                            </div>
                                            <select 
                                                value={config.subtopic}
                                                onChange={(e) => setConfig({...config, subtopic: e.target.value})}
                                                className="w-full h-18 rounded-2xl bg-neutral-50 dark:bg-slate-800/50 border border-neutral-100 dark:border-white/5 text-slate-900 dark:text-white font-black px-6 outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all cursor-pointer"
                                            >
                                                {filteredSubtopics.map(t => (
                                                    <option key={t.id} className="bg-white dark:bg-slate-900" value={t.title}>
                                                        {t.title}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] px-1">Difficulty Level</label>
                                            <div className="flex gap-2 p-1.5 bg-neutral-50 dark:bg-slate-800/30 rounded-2xl">
                                                {['Easy', 'Medium', 'Hard'].map(d => (
                                                    <Button 
                                                        key={d}
                                                        onClick={() => setConfig({...config, difficulty: d})}
                                                        className={`flex-1 rounded-xl h-12 font-black uppercase text-[10px] tracking-widest transition-all ${config.difficulty === d ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105' : 'bg-transparent text-slate-500 hover:bg-neutral-100 dark:hover:bg-slate-700'}`}
                                                    >{d}</Button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] px-1">Questions</label>
                                            <div className="flex gap-2 p-1.5 bg-neutral-50 dark:bg-slate-800/30 rounded-2xl">
                                                {[5, 10, 15].map(c => (
                                                    <Button 
                                                        key={c}
                                                        onClick={() => setConfig({...config, count: c})}
                                                        className={`flex-1 rounded-xl h-12 font-black uppercase text-[10px] tracking-widest transition-all ${config.count === c ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105' : 'bg-transparent text-slate-500 hover:bg-neutral-100 dark:hover:bg-slate-700'}`}
                                                    >{c}</Button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-8 text-center">
                                        <Button 
                                            onClick={startPractice}
                                            disabled={isLoading || filteredSubtopics.length === 0}
                                            className="w-full h-22 rounded-[2.5rem] bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:scale-[1.01] active:scale-98 font-black uppercase tracking-[0.4em] text-xs shadow-3xl transition-all gap-4 flex items-center justify-center"
                                        >
                                            {isLoading ? <RefreshCw className="animate-spin" /> : "Start Practice"} <ArrowRight size={22} className="text-primary" />
                                        </Button>

                                        {/* Pasive Smart System Indicator */}
                                        <div className="flex flex-col items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-1000">
                                            <div className="flex items-center gap-2 text-orange-500">
                                                <Badge className="bg-orange-500/10 text-orange-600 border-none px-3 py-1 rounded-full p-0">
                                                    <Flame size={14} className="fill-current" />
                                                </Badge>
                                                <span className="text-xs font-black uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-500">
                                                    Practicing Frequently Asked Questions
                                                </span>
                                            </div>
                                            <p className="text-[10px] font-bold text-slate-400 italic">
                                                High-frequency interview questions curated from top companies
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                             {/* Right: Analytics Panel (5/12) */}
                             <div className="lg:col-span-5 space-y-10">
                                <Card className="bg-gradient-to-br from-indigo-700 via-purple-700 to-indigo-900 rounded-[3.5rem] p-10 text-white shadow-3xl relative overflow-hidden group">
                                     <div className="absolute -bottom-20 -right-20 opacity-10 scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-[2000ms]">
                                        <BarChart3 size={350} />
                                     </div>
                                     <div className="space-y-10 relative z-10">
                                         <div className="flex items-center gap-4">
                                            <div className="w-18 h-18 rounded-[2rem] bg-white/20 text-white flex items-center justify-center backdrop-blur-md">
                                                <Trophy size={36} />
                                            </div>
                                            <div>
                                                <h3 className="text-3xl font-black italic tracking-tighter">Performance IQ</h3>
                                                <p className="text-[10px] font-black opacity-60 tracking-[0.2em] uppercase">Live Benchmark Data</p>
                                            </div>
                                         </div>
                                         <div className="space-y-8">
                                            {[
                                                { label: 'Quant Efficiency', val: 88, color: 'bg-cyan-400' },
                                                { label: 'Logic Accuracy', val: 92, color: 'bg-amber-400' },
                                                { label: 'Verbal Mastery', val: 75, color: 'bg-rose-400' }
                                            ].map(s => (
                                                <div key={s.label} className="space-y-3">
                                                    <div className="flex justify-between text-[11px] font-black uppercase tracking-widest opacity-90">
                                                        <span>{s.label}</span>
                                                        <span>{s.val}%</span>
                                                    </div>
                                                    <Progress value={s.val} className="h-2.5 bg-white/10 rounded-full" indicatorClassName={s.color} />
                                                </div>
                                            ))}
                                         </div>
                                     </div>
                                </Card>

                                <Card className="bg-white dark:bg-slate-900 rounded-[3.5rem] p-10 border-none shadow-2xl relative overflow-hidden group border border-neutral-200 dark:border-white/5">
                                    <div className="flex flex-col gap-6 relative z-10">
                                        <div className="flex items-center justify-between">
                                            <Badge className="bg-indigo-500/10 text-indigo-500 border-none font-black text-[9px] uppercase tracking-[0.2em] px-4 py-2">Tiered Strategy</Badge>
                                            <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-600 transition-all group-hover:scale-110">
                                                <Sparkles size={24} />
                                            </div>
                                        </div>
                                        <h3 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">Master Level-Specific Challenges.</h3>
                                        <p className="text-sm font-bold text-slate-500 leading-relaxed italic opacity-80 border-l-2 border-indigo-500 pl-6">
                                            "Start with Easy for speed, move to Hard for interview readiness. Each tier follows a different logic pattern."
                                        </p>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* STEP 2: PRACTICE SESSION SCREEN */}
                {step === 2 && questions.length > 0 && (
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-10 max-w-5xl mx-auto w-full pb-20">
                        {/* Header Progress Bar */}
                        <div className="flex flex-col md:flex-row items-center gap-8 justify-between bg-white dark:bg-slate-900/80 p-8 rounded-[2.5rem] shadow-xl backdrop-blur-md border border-neutral-200 dark:border-white/5">
                            <div className="flex flex-col gap-2">
                                <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Question {currentIdx + 1} <span className="opacity-50">of {questions.length}</span></h4>
                                <div className="w-60 h-2 bg-neutral-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                                        className="h-full bg-primary shadow-[0_0_15px_rgba(59,130,246,0.3)]" 
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-12">
                                <div className="text-center">
                                    <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">XP Gain</div>
                                    <div className="text-2xl font-black text-amber-500 tabular-nums flex items-center justify-center gap-2">
                                        <Star size={20} className="fill-current text-amber-400" /> {score}
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Time Remaining</div>
                                    <div className="text-2xl font-black text-slate-900 dark:text-white font-mono flex items-center justify-center gap-2">
                                        <Timer size={20} className="text-primary" /> {formatTime(timeLeft)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Central Question Card */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                             <div className="lg:col-span-8 space-y-8">
                                <Card className="p-10 md:p-14 bg-white dark:bg-slate-900 border border-neutral-200 dark:border-white/5 rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-2 h-full bg-primary/20 group-hover:bg-primary transition-all duration-500" />
                                    
                                    <div className="flex flex-wrap items-center gap-3 mb-10">
                                        <Badge className="bg-orange-500/10 text-orange-600 border-none font-black text-[9px] px-4 py-1.5 uppercase tracking-widest rounded-full animate-pulse">
                                            🔥 Frequently Asked
                                        </Badge>
                                        <Badge className={`border-none font-black text-[9px] px-4 py-1.5 uppercase tracking-widest rounded-full ${
                                            config.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-500' :
                                            config.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-500' :
                                            'bg-rose-500/10 text-rose-500'
                                        }`}>
                                            {config.difficulty}
                                        </Badge>
                                        <Badge className="bg-slate-100 dark:bg-slate-800 text-slate-500 border-none font-black text-[9px] px-4 py-1.5 uppercase tracking-widest rounded-full">
                                            {config.topic}
                                        </Badge>
                                    </div>

                                    <div className="space-y-12">
                                        <h3 className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                                            {questions[currentIdx].question}
                                        </h3>

                                        {/* Multiple Choice Options */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            {questions[currentIdx].options.map((opt: string, idx: number) => {
                                                const isSelected = selectedAnswer === opt;
                                                const isCorrect = isEvaluated && opt === questions[currentIdx].correct_answer;
                                                const isWrong = isEvaluated && isSelected && opt !== questions[currentIdx].correct_answer;

                                                return (
                                                    <button
                                                        key={opt}
                                                        disabled={isEvaluated}
                                                        onClick={() => setSelectedAnswer(opt)}
                                                        className={`p-6 rounded-[2rem] border-2 text-left transition-all relative overflow-hidden group transform active:scale-95 ${
                                                            isCorrect ? 'bg-emerald-500/10 border-emerald-500 text-emerald-900 dark:text-emerald-400' :
                                                            isWrong ? 'bg-rose-500/10 border-rose-500 text-rose-900 dark:text-rose-400' :
                                                            isSelected ? 'bg-primary/5 border-primary shadow-lg shadow-primary/10' :
                                                            'bg-neutral-50 dark:bg-white/5 border-neutral-100 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-primary/40'
                                                        }`}
                                                    >
                                                        <div className="flex items-center gap-4 relative z-10">
                                                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xs transition-colors ${
                                                                isSelected ? 'bg-primary text-white' : 'bg-white dark:bg-slate-800 text-slate-400 shadow-sm'
                                                            }`}>
                                                                {String.fromCharCode(65 + idx)}
                                                            </div>
                                                            <span className="text-base font-bold">{opt}</span>
                                                        </div>
                                                        {isCorrect && <CheckCircle2 size={24} className="absolute right-6 top-1/2 -translate-y-1/2 text-emerald-500 animate-in zoom-in" />}
                                                        {isWrong && <XCircle size={24} className="absolute right-6 top-1/2 -translate-y-1/2 text-rose-500 animate-in zoom-in" />}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {!isEvaluated ? (
                                            <Button 
                                                onClick={handleAnswerSubmit}
                                                disabled={!selectedAnswer}
                                                className="w-full h-20 rounded-[2.5rem] bg-primary text-white hover:opacity-90 font-black uppercase tracking-[0.4em] text-xs shadow-3xl disabled:opacity-50 transition-all"
                                            >
                                                Submit Answer <ArrowRight size={18} className="ml-2" />
                                            </Button>
                                        ) : (
                                            <div className="space-y-6">
                                                <div className={`p-8 rounded-[2.5rem] border-2 flex items-start gap-4 animate-in slide-in-from-bottom-5 ${
                                                    selectedAnswer === questions[currentIdx].correct_answer ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-rose-500/5 border-rose-500/10'
                                                }`}>
                                                    <div className={`p-3 rounded-2xl shrink-0 ${selectedAnswer === questions[currentIdx].correct_answer ? 'bg-emerald-500/20 text-emerald-600' : 'bg-rose-500/20 text-rose-600'}`}>
                                                        {selectedAnswer === questions[currentIdx].correct_answer ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-black text-slate-900 dark:text-white uppercase text-[10px] tracking-widest mb-1">
                                                            {selectedAnswer === questions[currentIdx].correct_answer ? 'Correct Identification' : 'Logic Insight Needed'}
                                                        </h4>
                                                        <p className="text-sm font-medium text-slate-500 italic">
                                                            {selectedAnswer === questions[currentIdx].correct_answer ? "Perfect logic. You have mastered this frequent pattern." : `The correct answer was ${questions[currentIdx].correct_answer}. Expand the solution to learn the pattern.`}
                                                        </p>
                                                    </div>
                                                </div>

                                                <button 
                                                    onClick={() => setShowSolution(!showSolution)}
                                                    className="w-full py-4 px-6 rounded-2xl bg-slate-100 dark:bg-white/5 text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center justify-between hover:bg-neutral-200 dark:hover:bg-white/10 transition-colors"
                                                >
                                                    {showSolution ? "Hide Solution" : "Show Full Solution & Explanation"}
                                                    <ChevronRight className={`transition-transform ${showSolution ? 'rotate-90' : ''}`} />
                                                </button>

                                                <AnimatePresence>
                                                    {showSolution && (
                                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="overflow-hidden">
                                                            <div className="p-8 rounded-[2.5rem] bg-neutral-50 dark:bg-slate-800/40 border border-neutral-100 dark:border-white/5 space-y-8">
                                                                <div className="space-y-4">
                                                                    <span className="text-[10px] font-black uppercase text-primary tracking-widest">Logic Breakdown</span>
                                                                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-loose">
                                                                        {questions[currentIdx].explanation}
                                                                    </p>
                                                                </div>
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                    <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-neutral-100 dark:border-white/5">
                                                                        <span className="text-[9px] font-black uppercase text-orange-500 mb-2 block">Quick Shortcut</span>
                                                                        <p className="text-xs text-slate-500 italic">"Use the unit digit elimination method for faster results."</p>
                                                                    </div>
                                                                    <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-neutral-100 dark:border-white/5">
                                                                        <span className="text-[9px] font-black uppercase text-indigo-500 mb-2 block">Formula Note</span>
                                                                        <p className="text-xs text-slate-500 italic">"X% of Y = Y% of X. Remember this for multi-step math."</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
 
                                                <Button 
                                                    onClick={nextQuestion}
                                                    className="w-full h-18 rounded-[2rem] bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl transition-all"
                                                >
                                                    {currentIdx + 1 < questions.length ? "Continue to Next Pattern" : "Finish Practice Audit"}
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </Card>
                             </div>

                             {/* Practice Action Section Sidebar (CLEAN ACTIONS) */}
                             <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
                                <Card className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl border border-neutral-200 dark:border-white/5 space-y-4">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Toolkit</h4>
                                    
                                    <div className="space-y-3">
                                        <button 
                                            onClick={() => { setIsAdded(!isAdded); toast.success("Updated practice list"); }}
                                            className={`w-full flex items-center gap-4 p-5 rounded-2xl transition-all ${isAdded ? 'bg-primary/20 text-primary' : 'hover:bg-neutral-50 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400'}`}
                                        >
                                            <Plus size={18} />
                                            <span className="text-[11px] font-black uppercase tracking-widest">{isAdded ? 'In Practice List' : 'Add to Practice'}</span>
                                        </button>

                                        <button 
                                            onClick={() => { setIsBookmarked(!isBookmarked); toast.info("Bookmark updated"); }}
                                            className={`w-full flex items-center gap-4 p-5 rounded-2xl transition-all ${isBookmarked ? 'bg-amber-500/20 text-amber-600' : 'hover:bg-neutral-50 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400'}`}
                                        >
                                            <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
                                            <span className="text-[11px] font-black uppercase tracking-widest">Bookmark Pattern</span>
                                        </button>

                                        <button 
                                            onClick={resetQuestionState}
                                            className="w-full flex items-center gap-4 p-5 rounded-2xl hover:bg-neutral-50 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400 transition-all"
                                        >
                                            <RefreshCw size={18} />
                                            <span className="text-[11px] font-black uppercase tracking-widest">Retry Step</span>
                                        </button>

                                        <button 
                                            onClick={() => setShowHint(true)}
                                            className={`w-full flex items-center gap-4 p-5 rounded-2xl transition-all ${showHint ? 'bg-primary/10 text-primary animate-pulse' : 'hover:bg-neutral-50 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400'}`}
                                        >
                                            <Lightbulb size={18} />
                                            <span className="text-[11px] font-black uppercase tracking-widest">Reveal Strategy Hint</span>
                                        </button>
                                    </div>
                                </Card>

                                <AnimatePresence>
                                    {showHint && (
                                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-8 bg-primary/10 border-2 border-dashed border-primary/20 rounded-[2.5rem] relative">
                                            <div className="flex items-center gap-3 mb-3 text-primary">
                                                <Sparkles size={16} />
                                                <span className="text-[10px] font-black uppercase tracking-widest">Hint Strategy</span>
                                            </div>
                                            <p className="text-xs font-bold text-slate-600 dark:text-slate-300 italic leading-relaxed">
                                                "Eliminate the most extreme options first. Re-read the core logic requirement if stuck on the wording."
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                             </div>
                        </div>
                    </motion.div>
                )}

                {/* STEP 3: RESULTS SCREEN (AUDIT) */}
                {step === 3 && results && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-4xl mx-auto w-full pb-20">
                         <Card className="bg-white dark:bg-slate-900 border border-neutral-200 dark:border-white/5 rounded-[4rem] p-12 lg:p-20 text-center relative overflow-hidden shadow-4xl backdrop-blur-2xl">
                            <div className="absolute top-0 left-0 w-full h-full bg-primary/5 z-0" />
                            <div className="relative z-10 flex flex-col items-center gap-12">
                                <div className="space-y-4">
                                    <div className="w-24 h-24 bg-primary/10 text-primary rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 animate-bounce">
                                        <Trophy size={48} />
                                    </div>
                                    <Badge className="bg-primary/10 text-primary border-none font-black text-[10px] uppercase tracking-widest px-8 py-2.5 rounded-full">Practice Outcome Audit Completed</Badge>
                                    <h2 className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tighter">Session <span className="text-primary italic">Mastered</span></h2>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
                                    {[
                                        { label: 'Total Score', val: `+${score}` },
                                        { label: 'Accuracy', val: `${Math.round((score / (questions.length * 10)) * 100)}%` },
                                        { label: 'Tier Depth', val: config.difficulty },
                                        { label: 'Status', val: (score / (questions.length * 10)) >= 0.8 ? 'Ready' : 'Review' }
                                    ].map(stat => (
                                        <div key={stat.label} className="p-8 bg-neutral-50 dark:bg-slate-800/50 rounded-[2.5rem] border border-neutral-100 dark:border-white/10">
                                            <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">{stat.label}</div>
                                            <div className="text-2xl font-black text-slate-900 dark:text-white">{stat.val}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-10 rounded-[3.5rem] bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 w-full space-y-6 text-left">
                                    <div className="flex items-center gap-3 text-primary">
                                        <Sparkles size={18} />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">AI Strategic Insights</span>
                                    </div>
                                    <p className="text-sm font-bold text-slate-500 leading-relaxed italic border-l-4 border-primary pl-8 py-2">
                                        "{results.feedback || "Exceptional logic flow. Your accuracy is in the top tier. Next, focus on speed to reduce per-question time by 15%."}"
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                                    <Button onClick={() => setStep(1)} variant="outline" className="h-20 rounded-[2.5rem] border-neutral-200 dark:border-white/10 text-slate-600 dark:text-white font-black uppercase tracking-widest text-[10px] hover:bg-neutral-100 dark:hover:bg-white/5">
                                        Change Topic / Challenge
                                    </Button>
                                    <Button onClick={() => setStep(1)} className="h-20 rounded-[2.5rem] bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black uppercase tracking-widest text-[10px] shadow-3xl">
                                        Back to Dashboard
                                    </Button>
                                </div>
                            </div>
                         </Card>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default AptitudePracticeHub;
