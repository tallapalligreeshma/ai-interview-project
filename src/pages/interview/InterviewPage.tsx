import { 
    Mic, StopCircle, RefreshCw, Sparkles, ArrowLeft, ArrowRight, BookOpen, Brain, 
    Zap, Monitor, AlertCircle, MessageSquare, Code2, Timer, CheckCircle2, ShieldAlert, FileText,
    ChevronRight, Video, Target, BrainCircuit
} from "lucide-react";
import { aiService } from "@/lib/AiService";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { rolesData } from "@/data/rolesData";

const InterviewPage = () => {
    const navigate = useNavigate();
    const { roleSlug } = useParams();
    const [step, setStep] = useState(1);
    const [selectedRole, setSelectedRole] = useState<any>(null);
    const [selectedType, setSelectedType] = useState<string | null>(null);

    // AI Session States
    const [inputValue, setInputValue] = useState("");
    const [isThinking, setIsThinking] = useState(false);
    const [timeLeft, setTimeLeft] = useState(120);
    const [isRecording, setIsRecording] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [messages, setMessages] = useState<any[]>([]);
    const [questionNumber, setQuestionNumber] = useState(1);
    const [questions, setQuestions] = useState<any[]>([]);
    const totalQuestions = 5;

    // Intermediate Result State
    const [isShowingResult, setIsShowingResult] = useState(false);
    const [lastEvaluation, setLastEvaluation] = useState<any>(null);

    // 9.8 Upgrade States
    const [showHint, setShowHint] = useState(false);
    const [hintText, setHintText] = useState("");
    const [isFollowUp, setIsFollowUp] = useState(false);

    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        if (roleSlug) {
            const matchedRole = rolesData.find(r => r.title.toLowerCase().replace(/\s+/g, '-') === roleSlug);
            if (matchedRole) {
                setSelectedRole(matchedRole);
                setStep(2);
            }
        }
    }, [roleSlug]);

    useEffect(() => {
        if (step === 3 && !isShowingResult && !isThinking && timeLeft > 0) {
            const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0 && step === 3 && !isShowingResult) {
            handleSend();
        }
    }, [step, timeLeft, isShowingResult, isThinking]);

    useEffect(() => {
        const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;
            recognitionRef.current.onresult = (event: any) => {
                const transcript = Array.from(event.results).map((r: any) => r[0].transcript).join("");
                setInputValue(transcript);
            };
        }
    }, []);

    const toggleRecording = () => {
        if (!recognitionRef.current) return;
        if (isRecording) recognitionRef.current.stop();
        else recognitionRef.current.start();
        setIsRecording(!isRecording);
    };

    const handleSend = async () => {
        if (isThinking || (!inputValue.trim() && timeLeft > 0)) return;
        setIsThinking(true);
        setShowHint(false);
        if (isRecording) { recognitionRef.current.stop(); setIsRecording(false); }
        
        try {
            const response = await aiService.evaluateAnswer(currentQuestion, inputValue, messages);
            setMessages(prev => [...prev, { role: 'user', content: inputValue, score: response.score }]);
            setLastEvaluation(response);
            
            // 9.8 Logic: If score is below 80, trigger a follow-up to test adaptability.
            if (response.score < 80 && !isFollowUp) {
                setIsFollowUp(true);
            } else {
                setIsFollowUp(false);
            }

            setIsShowingResult(true);
        } catch (error) {
            toast.error("Failed to evaluate answer.");
        } finally {
            setIsThinking(false);
        }
    };

    const handleNextQuestion = async () => {
        if (questionNumber >= totalQuestions && !isFollowUp) {
            navigate('/performance');
            return;
        }

        if (isFollowUp) {
            setCurrentQuestion("Follow-up: " + (lastEvaluation?.suggestion || "Clarify your previous point."));
            setHintText("Focus on improving the specific area mentioned in the suggestion.");
        } else {
            const nextIdx = questionNumber;
            if (questions[nextIdx]) {
                setCurrentQuestion(questions[nextIdx].question);
                setHintText(`Difficulty: ${questions[nextIdx].difficulty}`);
                setQuestionNumber(prev => prev + 1);
            } else {
                // Fallback if questions are missing
                setCurrentQuestion("Tell me more about your experience with this role's core technologies.");
                setQuestionNumber(prev => prev + 1);
            }
        }

        setIsShowingResult(false);
        setInputValue("");
        setTimeLeft(isFollowUp ? 60 : 120);
    };

    const startSimulation = async (type: string) => {
        setSelectedType(type);
        setIsThinking(true);
        try {
            const response = await aiService.generateModuleResponse("questions", { 
                role: selectedRole?.title, 
                category: type 
            });
            if (response.questions && response.questions.length > 0) {
                setQuestions(response.questions);
                setCurrentQuestion(response.questions[0].question);
                setHintText(`Difficulty: ${response.questions[0].difficulty}`);
            } else {
                setCurrentQuestion("Could you start by introducing yourself and your background relevant to this role?");
            }
            setStep(3);
        } catch (error) {
            toast.error("Failed to initialize questions.");
            setCurrentQuestion("Could you start by introducing yourself?");
            setStep(3);
        } finally {
            setIsThinking(false);
        }
    };

    return (
        <div className="flex-1 w-full min-h-screen bg-[#0B0F1A] text-slate-200 font-sans p-4 md:p-6 overflow-x-hidden">
            {/* Ambient Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#6366F1]/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[700px] h-[700px] bg-[#22D3EE]/5 rounded-full blur-[150px]" />
            </div>

            <main className="relative z-10 w-full space-y-10">
                
                {/* STEP 1: ROLE SELECTION (Simplified for demo) */}
                {step === 1 && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 text-center py-20">
                        <div className="space-y-4">
                            <h2 className="text-4xl font-black text-white tracking-tight">Select Intelligence Path</h2>
                            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Choose your career diagnostic route</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                            {rolesData.slice(0, 4).map(role => (
                                <button key={role.id} onClick={() => { setSelectedRole(role); setStep(2); }} className="p-8 glass-premium-blue border-white/5 rounded-[2rem] hover:border-white/20 transition-all group flex items-center gap-6 text-left">
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-[#22D3EE] group-hover:scale-110 transition-transform">
                                        <Monitor size={28} />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-black text-white">{role.title}</h4>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Diagnostic Ready</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* STEP 2: ROUND SELECTION */}
                {step === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10 py-10">
                        <div className="text-center space-y-4">
                            <h2 className="text-4xl font-black text-white tracking-tight">Select <span className="text-[#6366F1]">Mission Scope</span></h2>
                            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Configuring neural sync for {selectedRole?.title}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { id: 'technical', title: 'Technical Core', icon: Code2, color: 'text-[#6366F1]' },
                                { id: 'coding', title: 'Coding & Logic', icon: Sparkles, color: 'text-[#EC4899]' },
                                { id: 'behavioral', title: 'HR Behavioral', icon: MessageSquare, color: 'text-[#10B981]' },
                                { id: 'logic', title: 'Aptitude & Logic', icon: Brain, color: 'text-[#F59E0B]' }
                            ].map(type => (
                                <button key={type.id} onClick={() => startSimulation(type.id)} className="p-10 glass-premium-blue border-white/5 rounded-[2.5rem] hover:border-white/20 transition-all group flex flex-col items-center gap-6 text-center">
                                    <div className={`w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center ${type.color} group-hover:scale-110 transition-transform shadow-inner`}>
                                        <type.icon size={40} />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black text-white">{type.title}</h4>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Start Simulation</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* STEP 3: THE CORE ENGINE (Vertical Layout) */}
                {step === 3 && (
                    <div className="space-y-8 pb-20">
                        
                        {/* 🧠 1. QUESTION PANEL */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-premium-blue p-10 rounded-[2.5rem] border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <BrainCircuit size={80} />
                            </div>
                            <div className="flex items-center justify-between mb-8">
                                <div className="space-y-1">
                                    <span className="text-[10px] font-black text-[#6366F1] uppercase tracking-[0.2em]">
                                        {isFollowUp ? "Cross-Questioning Active" : `Neural Challenge ${questionNumber}/${totalQuestions}`}
                                    </span>
                                    <h2 className="text-2xl font-black text-white">{selectedRole?.title}</h2>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Button variant="outline" size="sm" onClick={() => setShowHint(!showHint)} className="h-10 px-4 rounded-xl glass-premium-blue border-white/10 text-[#F59E0B] font-bold uppercase tracking-widest text-[10px] hover:bg-white/10">
                                        <Sparkles size={14} className="mr-2" /> {showHint ? "Hide Hint" : "Get Hint"}
                                    </Button>
                                    <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5 font-bold text-[#22D3EE] text-sm">
                                        <Zap size={16} /> 850 Points
                                    </div>
                                </div>
                            </div>
                            <div className="p-8 bg-white/5 rounded-3xl border border-white/10 shadow-inner space-y-4">
                                <div className="flex gap-4 items-start">
                                    <FileText size={24} className="text-[#6366F1] shrink-0 mt-1" />
                                    <h3 className="text-2xl font-bold text-white leading-relaxed tracking-tight">
                                        {currentQuestion || "Initializing neural link..."}
                                    </h3>
                                </div>
                                
                                <AnimatePresence>
                                    {showHint && (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                                            <div className="mt-4 p-4 rounded-2xl bg-[#F59E0B]/10 border border-[#F59E0B]/20 flex gap-3 text-[#F59E0B]">
                                                <Target size={18} className="shrink-0 mt-0.5" />
                                                <p className="text-sm font-medium">{hintText}</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>

                        {/* ✍️ 2. ANSWER INPUT AREA */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-premium-blue p-8 rounded-[2.5rem] border-white/5 space-y-6">
                            <div className="relative">
                                <textarea 
                                    placeholder={isRecording ? "Listening to your neural response..." : "Provide your detailed architectural answer here..."}
                                    className="w-full min-h-[250px] bg-white/5 rounded-3xl p-8 border border-white/5 text-lg font-medium resize-none focus:border-[#6366F1]/50 outline-none text-white placeholder:text-slate-600 transition-all"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    disabled={isThinking || isShowingResult}
                                />
                                <div className="absolute bottom-6 right-6 flex gap-4">
                                    <button 
                                        onClick={toggleRecording}
                                        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${isRecording ? 'bg-rose-500 animate-pulse' : 'bg-[#6366F1]/20 text-[#6366F1] hover:bg-[#6366F1] hover:text-white'}`}
                                    >
                                        {isRecording ? <StopCircle size={28} /> : <Mic size={28} />}
                                    </button>
                                </div>
                            </div>
                            {!isShowingResult && (
                                <Button 
                                    onClick={handleSend}
                                    disabled={isThinking}
                                    className="w-full h-20 rounded-3xl bg-[#6366F1] hover:bg-[#4F46E5] text-white font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-[#6366F1]/20 transition-all hover:scale-[1.02] active:scale-95"
                                >
                                    {isThinking ? <RefreshCw className="animate-spin mr-2" /> : (inputValue.trim() ? "Transmit Response" : "Time's Up - Get Answer")}
                                </Button>
                            )}
                        </motion.div>

                        {/* ⏱️ 3. TIMER + PROGRESS */}
                        {!isShowingResult && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4 px-10">
                                <div className="flex justify-between items-center text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                    <div className="flex items-center gap-2">
                                        <Timer size={14} className={timeLeft < 30 ? 'text-rose-500 animate-pulse' : ''} />
                                        Time Remaining: <span className={timeLeft < 30 ? 'text-rose-500' : 'text-white'}>{timeLeft}s</span>
                                    </div>
                                    <div>Logic Depth Analysis: 78%</div>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: "100%" }}
                                        animate={{ width: `${(timeLeft / 120) * 100}%` }}
                                        className={`h-full ${timeLeft < 30 ? 'bg-rose-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-[#6366F1]'}`}
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* 📊 4. AI FEEDBACK PANEL */}
                        <AnimatePresence>
                            {isShowingResult && (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.95 }} 
                                    animate={{ opacity: 1, scale: 1 }} 
                                    className="space-y-8"
                                >
                                    <div className="space-y-6">
                                        <div className="glass-premium-blue p-10 rounded-[2.5rem] border-[#10B981]/30 grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2 text-[10px] font-black text-[#10B981] uppercase tracking-widest">
                                                    <CheckCircle2 size={16} /> Performance Evaluation
                                                </div>
                                                <div className="text-5xl font-black text-white">{lastEvaluation?.score || 0}<span className="text-xl ml-1 text-slate-500">/10</span></div>
                                                
                                                <div className="space-y-2">
                                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Strengths</p>
                                                    <ul className="text-xs font-bold text-emerald-400 list-disc list-inside">
                                                        {(lastEvaluation?.strengths || ["Analyzing response..."]).map((s: string, i: number) => (
                                                            <li key={i}>{s}</li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className="space-y-2">
                                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Improvements</p>
                                                    <ul className="text-xs font-bold text-amber-400 list-disc list-inside">
                                                        {(lastEvaluation?.improvements || ["Identifying gaps..."]).map((m: string, i: number) => (
                                                            <li key={i}>{m}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="space-y-6">
                                                <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-4">
                                                    <div className="flex items-center gap-2 text-[10px] font-black text-[#8B5CF6] uppercase tracking-widest">
                                                        <Sparkles size={16} /> Logic Analysis (Thought Process)
                                                    </div>
                                                    <p className="text-xs font-medium text-slate-300 leading-relaxed italic">
                                                        "{lastEvaluation?.thoughtAnalysis || "Your approach was analyzed based on industry logic patterns."}"
                                                    </p>
                                                </div>
                                                <div className="p-6 bg-[#6366F1]/10 rounded-3xl border border-[#6366F1]/20 space-y-4">
                                                    <div className="flex items-center gap-2 text-[10px] font-black text-[#6366F1] uppercase tracking-widest">
                                                        <Brain size={16} /> How to Think (Strategy)
                                                    </div>
                                                    <p className="text-xs font-bold text-white leading-relaxed">
                                                        {lastEvaluation?.howToThink || "Focus on breaking down the problem into smaller logical blocks."}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="glass-premium-blue p-8 rounded-[2.5rem] border-[#EC4899]/30 space-y-4">
                                            <div className="flex items-center gap-2 text-[10px] font-black text-[#EC4899] uppercase tracking-widest">
                                                <BookOpen size={16} /> Ideal Expert Answer
                                            </div>
                                            <div className="p-6 bg-slate-950/50 rounded-2xl border border-white/5">
                                                <pre className="text-xs font-mono text-emerald-300 whitespace-pre-wrap leading-relaxed">
                                                    {lastEvaluation?.idealAnswer || "The ideal solution involves optimized time complexity and clean logic flow."}
                                                </pre>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 🚀 5. NEXT QUESTION BUTTON */}
                                    <Button 
                                        onClick={handleNextQuestion}
                                        className={`w-full h-20 rounded-3xl text-white font-black uppercase tracking-[0.3em] text-xs transition-all hover:scale-[1.02] active:scale-95 shadow-2xl ${isFollowUp ? 'bg-rose-500 hover:bg-rose-600' : 'bg-white text-[#0B0F1A] hover:bg-white/90'}`}
                                    >
                                        {isFollowUp ? "Start Follow-up Challenge" : (questionNumber >= totalQuestions ? "Final Intelligence Report" : "Engage Next Challenge")} <ArrowRight size={20} className="ml-2" />
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </main>
        </div>
    );
};

export default InterviewPage;

