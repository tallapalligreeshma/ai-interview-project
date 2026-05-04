import { motion } from "framer-motion";
import { 
    Bot, 
    Search, 
    Filter, 
    Code2, 
    ChevronRight, 
    Sparkles, 
    Zap, 
    Brain,
    MessageSquare,
    BookOpen,
    Terminal
} from "lucide-react";
import { useState } from "react";

const QuestionEnginePage = () => {
    const [selectedQuestion, setSelectedQuestion] = useState<any>(null);

    const questions = [
        { id: 1, title: "Optimize Large-Scale Distributed Cache", difficulty: "Hard", category: "System Design", company: "Google" },
        { id: 2, title: "Explain Javascript Event Loop & Microtasks", difficulty: "Medium", category: "Javascript", company: "Vercel" },
        { id: 3, title: "Database Sharding vs Partitioning Strategies", difficulty: "Hard", category: "Database", company: "AWS" },
        { id: 4, title: "React 18 Concurrent Mode Internals", difficulty: "Medium", category: "Frontend", company: "Meta" },
        { id: 5, title: "Implementing OAuth 2.0 PKCE Flow", difficulty: "Medium", category: "Security", company: "Stripe" }
    ];

    return (
        <div className="flex-1 w-full min-h-screen bg-[#0B0F1A] text-slate-200 font-sans p-6 lg:p-12 overflow-x-hidden">
            {/* Ambient Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#22D3EE]/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[700px] h-[700px] bg-[#6366F1]/5 rounded-full blur-[150px]" />
            </div>

            <main className="relative z-10 max-w-[1400px] mx-auto space-y-10">
                
                {/* 🤖 1. DYNAMIC QUESTION FEED (Header + Search) */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="space-y-2">
                        <h1 className="text-5xl font-black text-white tracking-tight italic">NEURAL <span className="text-[#22D3EE]">ENGINE</span></h1>
                        <p className="text-slate-500 font-black uppercase text-[10px] tracking-[0.4em]">Proprietary Question Core</p>
                    </div>
                    <div className="flex-1 max-w-xl w-full relative group">
                        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-slate-500 group-focus-within:text-[#22D3EE] transition-colors">
                            <Search size={20} />
                        </div>
                        <input 
                            type="text" 
                            placeholder="Query the logic database..." 
                            className="w-full h-16 bg-white/5 border border-white/5 rounded-2xl pl-16 pr-6 text-white font-medium focus:border-[#22D3EE]/30 outline-none transition-all placeholder:text-slate-700"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
                    
                    {/* 🤖 2. FILTER PANEL + FEED */}
                    <div className="xl:col-span-4 space-y-8">
                        <div className="glass-premium-blue p-8 rounded-[2.5rem] border-white/5 space-y-6">
                            <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                                <Filter size={16} className="text-[#6366F1]" /> Intelligence Filters
                            </h3>
                            <div className="space-y-4">
                                {['All Domains', 'System Architecture', 'Neural Logic', 'Frontend Engineering', 'Security Protocols'].map((cat, i) => (
                                    <button key={i} className={`w-full p-4 rounded-xl text-left text-xs font-black uppercase tracking-widest border transition-all ${i === 0 ? 'bg-[#6366F1]/10 border-[#6366F1]/20 text-[#6366F1]' : 'border-white/5 text-slate-500 hover:border-white/10'}`}>
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            {questions.map((q, i) => (
                                <motion.button 
                                    key={q.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    onClick={() => setSelectedQuestion(q)}
                                    className={`w-full p-6 rounded-[2rem] border text-left transition-all flex flex-col gap-3 group ${selectedQuestion?.id === q.id ? 'glass-premium-blue border-[#22D3EE]/30' : 'bg-white/5 border-white/5 hover:border-white/10'}`}
                                >
                                    <div className="flex justify-between items-start">
                                        <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${q.difficulty === 'Hard' ? 'bg-rose-500/10 text-rose-500' : 'bg-[#10B981]/10 text-[#10B981]'}`}>
                                            {q.difficulty}
                                        </span>
                                        <span className="text-[10px] font-bold text-slate-600">{q.company}</span>
                                    </div>
                                    <h4 className="text-sm font-bold text-white group-hover:text-[#22D3EE] transition-colors">{q.title}</h4>
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* 🤖 3. SOLUTION BREAKDOWN + AI CHAT */}
                    <div className="xl:col-span-8 space-y-8">
                        {selectedQuestion ? (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }} 
                                animate={{ opacity: 1, scale: 1 }}
                                className="space-y-8"
                            >
                                <div className="glass-premium-blue p-10 rounded-[3rem] border-white/5 space-y-8 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-10 opacity-5">
                                        <Code2 size={120} />
                                    </div>
                                    <div className="space-y-4 relative z-10">
                                        <h2 className="text-3xl font-black text-white tracking-tight">{selectedQuestion.title}</h2>
                                        <div className="flex gap-4">
                                            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                                                <Terminal size={14} /> {selectedQuestion.category}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                                                <BookOpen size={14} /> 12 Solutions
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6 relative z-10">
                                        <div className="p-8 bg-black/40 rounded-3xl border border-white/5 font-mono text-sm text-slate-400 leading-relaxed">
                                            <p className="text-[#10B981] mb-4">// Expert Solution Overview</p>
                                            "To implement a distributed cache, we must consider consistency models (Eventual vs Strong), eviction policies (LRU, LFU), and partition strategies. The primary challenge at scale is the thundering herd problem..."
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-6 bg-[#6366F1]/5 rounded-2xl border border-[#6366F1]/10">
                                                <h5 className="text-[10px] font-black text-[#6366F1] uppercase tracking-widest mb-2">Primary Key</h5>
                                                <p className="text-sm text-white font-bold">Partition Key Logic</p>
                                            </div>
                                            <div className="p-6 bg-[#22D3EE]/5 rounded-2xl border border-[#22D3EE]/10">
                                                <h5 className="text-[10px] font-black text-[#22D3EE] uppercase tracking-widest mb-2">Success Rate</h5>
                                                <p className="text-sm text-white font-bold">84% Precision</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 🤖 4. AI CHAT INTERACTION */}
                                <div className="glass-premium-blue p-8 rounded-[2.5rem] border-[#8B5CF6]/20 space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center text-[#8B5CF6]">
                                            <Bot size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-black text-white uppercase tracking-widest">Question Oracle</h4>
                                            <p className="text-[10px] font-bold text-slate-500">Ask about this logic path</p>
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <input 
                                            type="text" 
                                            placeholder="Ask for a detailed breakdown or code example..." 
                                            className="w-full h-16 bg-white/5 border border-white/5 rounded-2xl px-6 text-white font-medium focus:border-[#8B5CF6]/30 outline-none transition-all pr-20"
                                        />
                                        <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-[#8B5CF6] text-white flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-[#8B5CF6]/20">
                                            <ChevronRight size={20} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-40 border-2 border-dashed border-white/5 rounded-[3rem]">
                                <Brain size={64} className="text-slate-800" />
                                <div className="space-y-2">
                                    <h3 className="text-xl font-black text-slate-500">Select Question to Initiate Neural Link</h3>
                                    <p className="text-xs text-slate-600 font-bold uppercase tracking-widest">Awaiting Command Input</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default QuestionEnginePage;
