import { 
    Mic, StopCircle, Sparkles, ArrowRight, BookOpen, Brain, 
    MessageSquare, Timer, CheckCircle2,
    Target, BrainCircuit, Monitor, Code2
} from "lucide-react";

import { useState, useRef, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { rolesData } from "@/data/rolesData";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";


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

    // 🚀 REAL FRONTEND: Static Question Bank
    const staticQuestions: Record<string, any[]> = {
        technical: [
            { question: "Explain the core differences between microservices and monolithic architecture in terms of scalability.", difficulty: "Advanced" },
            { question: "How would you optimize a slow React application with complex state updates?", difficulty: "Intermediate" },
            { question: "What is the importance of Dependency Inversion in the SOLID principles?", difficulty: "Advanced" },
            { question: "Describe how you would design a rate-limiting system for a high-traffic API.", difficulty: "Advanced" },
            { question: "What are the trade-offs between using SQL and NoSQL databases for a real-time messaging app?", difficulty: "Intermediate" }
        ],
        coding: [
            { question: "Write a function to find the first non-repeating character in a string and explain its time complexity.", difficulty: "Standard" },
            { question: "How would you implement a custom hook for handling debounced API calls?", difficulty: "Advanced" }
        ],
        behavioral: [
            { question: "Tell me about a time you had to make a difficult technical decision with limited information.", difficulty: "Standard" },
            { question: "How do you handle a situation where a teammate is not meeting their project deadlines?", difficulty: "Standard" }
        ],
        logic: [
            { question: "If you have two water jugs (3L and 5L), how can you measure exactly 4L of water?", difficulty: "Mind Bender" }
        ]
    };

    const handleSend = async () => {
        if (isThinking || (!inputValue.trim() && timeLeft > 0)) return;
        setIsThinking(true);
        setShowHint(false);
        if (isRecording) { recognitionRef.current.stop(); setIsRecording(false); }
        
        // 🚀 REAL FRONTEND: Simulation of AI Analysis
        setTimeout(() => {
            const baseScore = Math.min(95, Math.max(45, inputValue.length / 8));
            const bonus = inputValue.toLowerCase().includes('scalable') || inputValue.toLowerCase().includes('optimization') ? 10 : 0;
            const finalScore = Math.round(baseScore + bonus);

            const mockResponse = {
                score: finalScore,
                feedback: finalScore > 75 
                    ? "Exceptional response! You demonstrated deep architectural understanding and used appropriate terminology." 
                    : "A solid foundation, but try to incorporate more specific examples and technical depth in your explanation.",
                strengths: ["Strong conceptual clarity", "Professional terminology", "Logical structure"],
                improvements: ["Include real-world use cases", "Elaborate on edge cases", "Discuss alternative approaches"],
                thoughtAnalysis: "Candidate shows high cognitive resonance with the problem space. Logic vectors are aligned with industry standards.",
                howToThink: "Break the problem into: 1. Core Definition 2. Technical implementation 3. Trade-offs 4. Personal experience.",
                idealAnswer: "A perfect answer would mention decoupling, horizontal vs vertical scaling, and the specific impact on deployment cycles."
            };
            
            setMessages(prev => [...prev, { role: 'user', content: inputValue, score: mockResponse.score }]);
            setLastEvaluation(mockResponse);
            
            // Save to localStorage for Dashboard updates
            const stats = JSON.parse(localStorage.getItem('interview_stats') || '{"total_score": 0, "sessions": 0, "history": []}');
            stats.total_score += finalScore;
            stats.sessions += 1;
            stats.last_score = finalScore;
            stats.history.push({ role: selectedRole?.title, score: finalScore, date: new Date().toLocaleDateString() });
            localStorage.setItem('interview_stats', JSON.stringify(stats));

            setIsShowingResult(true);
            setIsThinking(false);
        }, 1800); // Fake AI processing delay
    };

    const handleNextQuestion = async () => {
        if (questionNumber >= totalQuestions && !isFollowUp) {
            // Save final result to localStorage for ResultPage
            localStorage.setItem('interview_results', JSON.stringify({
                score: Math.round(messages.reduce((acc, m) => acc + (m.score || 0), 0) / messages.length),
                role: selectedRole?.title,
                messages: messages
            }));
            navigate('/interview/result');
            return;
        }

        if (isFollowUp) {
            setCurrentQuestion("Deeper Probe: " + (lastEvaluation?.improvements?.[0] || "Could you clarify how you handle edge cases in this scenario?"));
            setHintText("Focus on being specific and technical in your follow-up response.");
            setIsFollowUp(false); // Reset follow-up after one probe
        } else {
            const nextIdx = questionNumber;
            const categoryQuestions = (selectedType ? staticQuestions[selectedType] : null) || staticQuestions.technical;
            if (categoryQuestions[nextIdx]) {
                setCurrentQuestion(categoryQuestions[nextIdx].question);
                setHintText(`Difficulty: ${categoryQuestions[nextIdx].difficulty}`);
                setQuestionNumber(prev => prev + 1);
            } else {
                setCurrentQuestion("System Challenge: How do you handle high-pressure deployments in this role?");
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
        
        // 🚀 REAL FRONTEND: Simulation of loading questions
        setTimeout(() => {
            const categoryQuestions = staticQuestions[type] || staticQuestions.technical;
            // setQuestions(categoryQuestions);
            setCurrentQuestion(categoryQuestions[0].question);
            setHintText(`Difficulty: ${categoryQuestions[0].difficulty}`);
            setStep(3);
            setIsThinking(false);
        }, 1000);
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
                        {/* ⏱️ 3. PROGRESS BAR & STATUS */}
                        <div className="px-10 space-y-4">
                            <div className="flex justify-between items-end">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Interview Progress</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-black text-white">{questionNumber}</span>
                                        <span className="text-slate-500 font-bold">/ {totalQuestions}</span>
                                    </div>
                                </div>
                                <div className="text-right space-y-1">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Logic Synchronization</p>
                                    <div className="text-sm font-bold text-[#22D3EE] flex items-center gap-2">
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map(i => (
                                                <div key={i} className={cn("w-1 h-3 rounded-full", i <= questionNumber ? "bg-[#22D3EE] animate-pulse" : "bg-white/10")} />
                                            ))}
                                        </div>
                                        {Math.min(100, questionNumber * 20)}%
                                    </div>
                                </div>
                            </div>
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
                                <motion.div 
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
                                    className="h-full bg-gradient-to-r from-[#6366F1] to-[#22D3EE] rounded-full shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                                />
                            </div>
                        </div>

                        {/* 🧠 1. QUESTION PANEL */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-premium-blue p-10 rounded-[2.5rem] border-white/5 relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <BrainCircuit size={120} className="animate-pulse" />
                            </div>
                            <div className="flex items-center justify-between mb-8 relative z-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-[#6366F1]/20 flex items-center justify-center text-[#6366F1] border border-[#6366F1]/20">
                                        <Brain size={24} />
                                    </div>
                                    <div className="space-y-0.5">
                                        <span className="text-[10px] font-black text-[#6366F1] uppercase tracking-[0.2em]">
                                            {isFollowUp ? "Cross-Questioning Active" : `System Challenge Q${questionNumber}`}
                                        </span>
                                        <h2 className="text-xl font-black text-white tracking-tight">{selectedRole?.title}</h2>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Button variant="outline" size="sm" onClick={() => setShowHint(!showHint)} className="h-10 px-4 rounded-xl glass-premium-blue border-white/10 text-[#F59E0B] font-bold uppercase tracking-widest text-[10px] hover:bg-white/10 group">
                                        <Sparkles size={14} className="mr-2 group-hover:rotate-12 transition-transform" /> {showHint ? "Hide Hint" : "Get Hint"}
                                    </Button>
                                    <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5 font-bold text-[#22D3EE] text-sm">
                                        <Timer size={16} className={timeLeft < 30 ? "text-rose-500 animate-pulse" : ""} /> {timeLeft}s
                                    </div>
                                </div>
                            </div>
                            <div className="p-8 bg-slate-950/40 rounded-3xl border border-white/5 shadow-inner relative z-10">
                                <div className="flex gap-4 items-start">
                                    <div className="mt-1 w-1.5 h-6 bg-[#6366F1] rounded-full shrink-0" />
                                    <h3 className="text-2xl font-bold text-white leading-relaxed tracking-tight">
                                        {currentQuestion || "Initializing neural link..."}
                                    </h3>
                                </div>
                                
                                <AnimatePresence>
                                    {showHint && (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                                            <div className="mt-6 p-5 rounded-2xl bg-[#F59E0B]/10 border border-[#F59E0B]/20 flex gap-4 text-[#F59E0B]">
                                                <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/20 flex items-center justify-center shrink-0">
                                                    <Target size={18} />
                                                </div>
                                                <p className="text-sm font-bold leading-relaxed">{hintText}</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>

                        {/* ✍️ 2. ANSWER INPUT AREA */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-premium-blue p-8 rounded-[2.5rem] border-white/5 space-y-6 relative">
                            <div className="relative group">
                                <textarea 
                                    placeholder={isRecording ? "Listening to your response..." : "Provide your detailed architectural answer here..."}
                                    className="w-full min-h-[300px] bg-slate-950/40 rounded-[2rem] p-10 border border-white/5 text-lg font-medium resize-none focus:border-[#6366F1]/30 outline-none text-white placeholder:text-slate-700 transition-all shadow-inner"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    disabled={isThinking || isShowingResult}
                                />
                                <div className="absolute bottom-8 right-8 flex gap-4">
                                    <button 
                                        onClick={toggleRecording}
                                        className={cn(
                                            "w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg",
                                            isRecording ? 'bg-rose-500 text-white animate-pulse shadow-rose-500/20' : 'bg-[#6366F1]/10 text-[#6366F1] hover:bg-[#6366F1] hover:text-white border border-[#6366F1]/20'
                                        )}
                                    >
                                        {isRecording ? <StopCircle size={28} /> : <Mic size={28} />}
                                    </button>
                                </div>
                                {isThinking && (
                                    <div className="absolute inset-0 bg-[#0B0F1A]/60 backdrop-blur-sm rounded-[2rem] flex flex-col items-center justify-center gap-6 z-20">
                                        <div className="relative">
                                            <div className="w-20 h-20 rounded-full border-4 border-[#6366F1]/20 border-t-[#6366F1] animate-spin" />
                                            <BrainCircuit className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#22D3EE] animate-pulse" size={32} />
                                        </div>
                                        <div className="space-y-2 text-center">
                                            <p className="text-lg font-black text-white tracking-widest uppercase italic">Analyzing Your Response</p>
                                            <div className="flex items-center justify-center gap-1">
                                                <span className="w-1.5 h-1.5 bg-[#6366F1] rounded-full animate-bounce [animation-delay:-0.3s]" />
                                                <span className="w-1.5 h-1.5 bg-[#6366F1] rounded-full animate-bounce [animation-delay:-0.15s]" />
                                                <span className="w-1.5 h-1.5 bg-[#6366F1] rounded-full animate-bounce" />
                                            </div>
                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mt-2">Evaluating Logic & Depth...</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            {!isShowingResult && (
                                <Button 
                                    onClick={handleSend}
                                    disabled={isThinking || !inputValue.trim()}
                                    className="w-full h-20 rounded-[2rem] bg-[#6366F1] hover:bg-[#4F46E5] text-white font-black uppercase tracking-[0.3em] text-xs shadow-[0_0_30px_rgba(99,102,241,0.3)] transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50 disabled:grayscale"
                                >
                                    {isThinking ? "Processing Intelligence..." : "Transmit Response →"}
                                </Button>
                            )}
                        </motion.div>

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

