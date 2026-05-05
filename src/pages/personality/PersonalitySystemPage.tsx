import { motion } from "framer-motion";
import { 
    UserCircle2, 
    Sparkles, 
    Flame, 
    Smile, 
    BrainCircuit,
    ArrowRight
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PersonalitySystemPage = () => {
    const navigate = useNavigate();
    const [selectedInterviewer, setSelectedInterviewer] = useState<any>(null);

    const personas = [
        { 
            id: 'ruthless', 
            name: 'The Pragmatist', 
            role: 'Senior Architect',
            trait: 'Extremely critical of code performance and edge cases.',
            icon: Flame,
            color: 'text-rose-500',
            bg: 'bg-rose-500/10',
            difficulty: 'Hard',
            tone: 'Direct & Blunt'
        },
        { 
            id: 'mentor', 
            name: 'The Mentor', 
            role: 'VP of Engineering',
            trait: 'Focuses on design patterns, scalability, and growth mindset.',
            icon: Smile,
            color: 'text-[#10B981]',
            bg: 'bg-[#10B981]/10',
            difficulty: 'Medium',
            tone: 'Encouraging but Thorough'
        },
        { 
            id: 'creative', 
            name: 'The Visionary', 
            role: 'Product Lead',
            trait: 'Evaluates product thinking and user-centric problem solving.',
            icon: Sparkles,
            color: 'text-[#22D3EE]',
            bg: 'bg-[#22D3EE]/10',
            difficulty: 'Easy',
            tone: 'Open-ended & Collaborative'
        },
        { 
            id: 'stoic', 
            name: 'The Stoic', 
            role: 'CTO',
            trait: 'Minimalist questioning. Watches how you handle silence and pressure.',
            icon: UserCircle2,
            color: 'text-[#6366F1]',
            bg: 'bg-[#6366F1]/10',
            difficulty: 'Insane',
            tone: 'Deeply Analytical'
        }
    ];

    return (
        <div className="flex-1 w-full min-h-screen bg-[#0B0F1A] text-slate-200 font-sans p-6 lg:p-12 overflow-x-hidden">
            {/* Ambient Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#8B5CF6]/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[700px] h-[700px] bg-[#6366F1]/5 rounded-full blur-[150px]" />
            </div>

            <main className="relative z-10 max-w-[1200px] mx-auto space-y-12">
                
                <div className="text-center space-y-4 py-10">
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] font-black text-[#6366F1] uppercase tracking-[0.5em]">Neural Persona Selection</motion.span>
                    <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-6xl font-black text-white tracking-tight">Personality System</motion.h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-slate-400 font-medium text-lg max-w-2xl mx-auto">
                        Simulate interviews with diverse corporate personas to master different communication dynamics and pressure levels.
                    </motion.p>
                </div>

                {/* 🎭 1. SELECT INTERVIEWER TYPE */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {personas.map((persona, i) => (
                        <motion.button 
                            key={persona.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => setSelectedInterviewer(persona)}
                            className={`p-8 rounded-[2.5rem] border transition-all text-left flex flex-col gap-6 group relative overflow-hidden ${selectedInterviewer?.id === persona.id ? 'glass-premium-blue border-[#6366F1]/50' : 'bg-white/5 border-white/5 hover:border-white/20'}`}
                        >
                            <div className={`w-16 h-16 rounded-2xl ${persona.bg} ${persona.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                <persona.icon size={32} />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-black text-white">{persona.name}</h3>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{persona.role}</p>
                            </div>
                            <div className="pt-4 border-t border-white/5 text-[10px] font-bold text-slate-400 leading-relaxed italic">
                                "{persona.trait}"
                            </div>
                            {selectedInterviewer?.id === persona.id && (
                                <div className="absolute top-6 right-6">
                                    <div className="w-3 h-3 bg-[#6366F1] rounded-full animate-pulse" />
                                </div>
                            )}
                        </motion.button>
                    ))}
                </div>

                {/* 🎭 2. PREVIEW PANEL */}
                {selectedInterviewer && (
                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-premium-blue p-12 rounded-[3rem] border-white/5 grid grid-cols-1 lg:grid-cols-3 gap-12"
                    >
                        <div className="lg:col-span-2 space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-black text-white tracking-tight">Persona Profile: {selectedInterviewer.name}</h2>
                                <p className="text-slate-400 text-lg leading-relaxed">
                                    Prepare for a session that mirrors high-stakes corporate interactions. This persona will test your <span className="text-white font-bold">Mental Resilience</span> and <span className="text-white font-bold">Technical Precision</span>.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Difficulty</p>
                                    <p className="text-sm font-bold text-white">{selectedInterviewer.difficulty}</p>
                                </div>
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Tone</p>
                                    <p className="text-sm font-bold text-white">{selectedInterviewer.tone}</p>
                                </div>
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Focus</p>
                                    <p className="text-sm font-bold text-white">Efficiency</p>
                                </div>
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Est. Duration</p>
                                    <p className="text-sm font-bold text-white">25 Mins</p>
                                </div>
                            </div>

                            {/* 🎭 3. START BUTTON */}
                            <button 
                                onClick={() => navigate('/interview')}
                                className="w-full h-20 rounded-3xl bg-[#6366F1] hover:bg-[#4F46E5] text-white font-black uppercase tracking-[0.3em] text-xs transition-all hover:scale-[1.02] active:scale-95 shadow-2xl shadow-[#6366F1]/20 flex items-center justify-center gap-3"
                            >
                                Initiate Simulation <ArrowRight size={20} />
                            </button>
                        </div>

                        <div className="lg:col-span-1 glass-premium-blue p-8 rounded-[2.5rem] border-white/5 relative overflow-hidden flex flex-col items-center justify-center text-center gap-6">
                            <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-[#6366F1] to-transparent pointer-events-none" />
                            <div className="w-32 h-32 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#6366F1] relative z-10">
                                <BrainCircuit size={64} className="animate-pulse" />
                            </div>
                            <div className="relative z-10">
                                <h4 className="text-lg font-black text-white">AI Persona Match: 98%</h4>
                                <p className="text-xs text-slate-500 font-bold mt-1">Neural link stabilized for {selectedInterviewer.name}</p>
                            </div>
                            <div className="flex flex-col gap-2 w-full relative z-10">
                                <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase">
                                    <span>Sync</span> <span>Stable</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div initial={{ width: 0 }} animate={{ width: '98%' }} className="h-full bg-[#6366F1]" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </main>
        </div>
    );
};

export default PersonalitySystemPage;
