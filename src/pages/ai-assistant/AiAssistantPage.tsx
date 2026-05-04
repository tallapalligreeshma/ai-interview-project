import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Send, Bot, Target, Zap, Activity, Brain, CheckCircle2, ChevronRight, 
    ListTodo, Clock, Sparkles, AlertTriangle, Route
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
    id: string;
    role: 'ai' | 'user';
    content: string;
    timestamp: Date;
}

const AiAssistantPage = () => {
    // Chat State
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'ai',
            content: "Welcome back! I'm your AI Coach. Based on your recent System Design mock interview, I recommend focusing on Database Sharding today. How can I help you prepare?",
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isThinking, setIsThinking] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll chat
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isThinking]);

    const handleSend = async () => {
        if (!inputValue.trim() || isThinking) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: inputValue,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue("");
        setIsThinking(true);

        // Simulate AI response
        setTimeout(() => {
            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'ai',
                content: "That's a great question. In a microservices architecture, you'd typically handle distributed transactions using patterns like Saga or Two-Phase Commit (2PC). For your level, focusing on the Saga pattern with choreography would be highly beneficial.",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMsg]);
            setIsThinking(false);
        }, 1500);
    };

    return (
        <div className="flex-1 w-full min-h-screen bg-[#0B0F1A] text-slate-200 font-sans p-4 md:p-6 overflow-x-hidden">
            {/* Ambient Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#6366F1]/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[700px] h-[700px] bg-[#8B5CF6]/5 rounded-full blur-[150px]" />
            </div>

            <main className="relative z-10 w-full space-y-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-white/5 pb-10">
                    <div className="space-y-2">
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight italic uppercase">
                            AI <span className="text-[#6366F1]">COACH</span>
                        </h1>
                        <p className="text-slate-500 font-black uppercase text-[10px] tracking-[0.4em]">Personalized Neural Mentor</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                    {/* Left Column: Plan, Gap Analysis, Roadmap */}
                    <div className="xl:col-span-7 space-y-8">
                        {/* 📅 Daily Plan */}
                        <div className="glass-premium-blue p-8 rounded-[2.5rem] border-white/5 space-y-6 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <ListTodo size={120} />
                            </div>
                            <h3 className="text-xs font-black text-[#6366F1] uppercase tracking-widest flex items-center gap-2 relative z-10">
                                <Clock size={16} /> Daily Protocol
                            </h3>
                            <div className="space-y-4 relative z-10">
                                {[
                                    { title: "Review System Design Notes", time: "15 mins", type: "Theory" },
                                    { title: "Complete 2 Recursion Challenges", time: "45 mins", type: "Coding" },
                                    { title: "Mock HR Round: Leadership Principles", time: "30 mins", type: "Behavioral" }
                                ].map((task, i) => (
                                    <div key={i} className="p-5 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between hover:bg-white/10 transition-all cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-[#6366F1]/10 flex items-center justify-center text-[#6366F1] border border-[#6366F1]/20">
                                                <Target size={18} />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-white">{task.title}</h4>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{task.type}</span>
                                                    <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                                                    <span className="text-[10px] text-[#22D3EE] font-black uppercase tracking-widest">{task.time}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <CheckCircle2 size={20} className="text-slate-600 hover:text-[#10B981] transition-colors" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 🧠 Skill Gap Analysis */}
                        <div className="glass-premium-blue p-8 rounded-[2.5rem] border-[#EF4444]/20 space-y-6">
                            <h3 className="text-xs font-black text-[#EF4444] uppercase tracking-widest flex items-center gap-2">
                                <AlertTriangle size={16} /> Vulnerability Assessment
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { skill: "Dynamic Programming", level: 45, tip: "Struggling with state transitions." },
                                    { skill: "Database Scaling", level: 55, tip: "Need deeper understanding of Sharding." }
                                ].map((gap, i) => (
                                    <div key={i} className="p-6 bg-[#EF4444]/5 rounded-2xl border border-[#EF4444]/10 space-y-4">
                                        <div className="flex justify-between items-start">
                                            <h4 className="text-sm font-black text-rose-400">{gap.skill}</h4>
                                            <span className="text-xs font-black text-rose-500">{gap.level}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-rose-500 rounded-full" style={{ width: `${gap.level}%` }}></div>
                                        </div>
                                        <p className="text-[10px] font-bold text-slate-400 italic">"{gap.tip}"</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 🗺️ Roadmap */}
                        <div className="glass-premium-blue p-8 rounded-[2.5rem] border-white/5 space-y-6">
                            <h3 className="text-xs font-black text-[#22D3EE] uppercase tracking-widest flex items-center gap-2">
                                <Route size={16} /> Career Trajectory
                            </h3>
                            <div className="relative pl-8 space-y-8 before:absolute before:inset-0 before:ml-[39px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#22D3EE] before:to-transparent">
                                {[
                                    { phase: "Phase 1: Foundation (Current)", focus: "Data Structures & Core Systems", active: true },
                                    { phase: "Phase 2: Architectural Mastery", focus: "Distributed Systems & Cloud", active: false },
                                    { phase: "Phase 3: FAANG Readiness", focus: "Hard Level DP & Leadership Principles", active: false }
                                ].map((step, i) => (
                                    <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                        <div className={`flex items-center justify-center w-8 h-8 rounded-full border-4 border-[#0B0F1A] ${step.active ? 'bg-[#22D3EE] text-[#0B0F1A]' : 'bg-slate-700 text-slate-400'} shrink-0 absolute left-[-40px] md:relative md:left-0 z-10 shadow-lg shadow-[#22D3EE]/20`}>
                                            {step.active ? <Zap size={14} /> : <CheckCircle2 size={14} />}
                                        </div>
                                        <div className={`w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-2xl border ${step.active ? 'bg-[#22D3EE]/10 border-[#22D3EE]/20' : 'bg-white/5 border-white/5'} ml-6 md:ml-0 md:group-odd:mr-6 md:group-even:ml-6`}>
                                            <h4 className={`text-sm font-black ${step.active ? 'text-[#22D3EE]' : 'text-slate-300'}`}>{step.phase}</h4>
                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{step.focus}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: 💬 Chat AI */}
                    <div className="xl:col-span-5 flex flex-col h-[800px] glass-premium-blue rounded-[3rem] border-[#8B5CF6]/20 overflow-hidden">
                        <div className="p-6 border-b border-white/5 flex items-center gap-4 bg-[#8B5CF6]/5">
                            <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6]">
                                <Brain size={24} />
                            </div>
                            <div>
                                <h3 className="text-sm font-black text-white uppercase tracking-widest">Neural Mentor</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Online & Processing</span>
                                </div>
                            </div>
                        </div>

                        <div 
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
                        >
                            <AnimatePresence initial={false}>
                                {messages.map((msg) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`max-w-[85%] p-5 rounded-3xl ${
                                            msg.role === 'user' 
                                            ? 'bg-[#8B5CF6] text-white rounded-tr-sm' 
                                            : 'bg-white/5 border border-white/5 text-slate-300 rounded-tl-sm'
                                        }`}>
                                            <p className="text-sm leading-relaxed font-medium">{msg.content}</p>
                                        </div>
                                    </motion.div>
                                ))}
                                {isThinking && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex justify-start"
                                    >
                                        <div className="bg-white/5 border border-white/5 p-5 rounded-3xl rounded-tl-sm flex items-center gap-2">
                                            <div className="w-2 h-2 bg-[#8B5CF6] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <div className="w-2 h-2 bg-[#8B5CF6] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <div className="w-2 h-2 bg-[#8B5CF6] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="p-6 border-t border-white/5 bg-[#0B0F1A]/50">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Query your mentor..."
                                    className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl pl-6 pr-16 text-white font-medium focus:border-[#8B5CF6]/50 focus:bg-white/10 outline-none transition-all placeholder:text-slate-600"
                                />
                                <button 
                                    onClick={handleSend}
                                    disabled={!inputValue.trim() || isThinking}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-[#8B5CF6] text-white flex items-center justify-center hover:bg-[#7C3AED] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send size={18} className="ml-1" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AiAssistantPage;
