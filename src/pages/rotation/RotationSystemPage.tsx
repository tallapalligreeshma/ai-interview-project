import { motion } from "framer-motion";
import { 
    RefreshCcw, 
    ArrowRight, 
    Zap, 
    Users, 
    Code, 
    Activity,
    ShieldCheck
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const RotationSystemPage = () => {
    const navigate = useNavigate();

    const rotationModes = [
        { 
            id: 'technical', 
            title: 'Technical Core', 
            desc: 'Deep focus on DSA, System Design, and Language Internals.',
            icon: Code,
            status: 'Active',
            color: 'text-[#6366F1]',
            bg: 'bg-[#6366F1]/10'
        },
        { 
            id: 'hr', 
            title: 'HR Behavioral', 
            desc: 'Situational leadership and emotional intelligence metrics.',
            icon: Users,
            status: 'Upcoming',
            color: 'text-[#10B981]',
            bg: 'bg-[#10B981]/10'
        },
        { 
            id: 'mixed', 
            title: 'Mixed Mode', 
            desc: 'A seamless blend of technical logic and soft skills.',
            icon: RefreshCcw,
            status: 'Locked',
            color: 'text-[#8B5CF6]',
            bg: 'bg-[#8B5CF6]/10'
        },
        { 
            id: 'pressure', 
            title: 'Pressure Phase', 
            desc: 'High-speed challenges with restricted diagnostic time.',
            icon: Zap,
            status: 'Locked',
            color: 'text-[#F59E0B]',
            bg: 'bg-[#F59E0B]/10'
        }
    ];

    const timelineSteps = [
        { time: "Day 01", mode: "Technical Core", score: "88%", status: "completed" },
        { time: "Day 02", mode: "Logic Rotation", score: "92%", status: "completed" },
        { time: "Today", mode: "Technical Core", score: "---", status: "active" },
        { time: "Tomorrow", mode: "HR Behavioral", score: "---", status: "upcoming" },
        { time: "Day 05", mode: "Mixed Reality", score: "---", status: "locked" }
    ];

    return (
        <div className="flex-1 w-full min-h-screen bg-[#0B0F1A] text-slate-200 font-sans p-6 lg:p-12 overflow-x-hidden">
            {/* Ambient Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#6366F1]/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[700px] h-[700px] bg-[#8B5CF6]/5 rounded-full blur-[150px]" />
            </div>

            <main className="relative z-10 max-w-[1200px] mx-auto space-y-12">
                
                {/* 🔄 1. CURRENT MODE DISPLAY */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-premium-blue p-12 rounded-[3rem] border-white/5 relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-12 opacity-10">
                        <RefreshCcw size={120} className="animate-spin-slow text-[#6366F1]" />
                    </div>
                    <div className="space-y-8 relative z-10">
                        <div className="space-y-2">
                            <span className="text-[10px] font-black text-[#6366F1] uppercase tracking-[0.3em] flex items-center gap-2">
                                <Activity size={14} /> Active USP Engine Round
                            </span>
                            <h1 className="text-5xl font-black text-white tracking-tight">Technical Mastery</h1>
                        </div>
                        <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
                            The Rotation System is currently focusing on your <span className="text-white font-bold">Structural Logic</span> and <span className="text-white font-bold">API Design</span> patterns based on your recent performance gaps.
                        </p>
                        <div className="flex gap-4">
                            <div className="px-6 py-3 bg-[#6366F1]/10 rounded-2xl border border-[#6366F1]/20 text-[#6366F1] text-xs font-black uppercase tracking-widest">
                                Complexity: Level 4
                            </div>
                            <div className="px-6 py-3 bg-white/5 rounded-2xl border border-white/5 text-slate-400 text-xs font-black uppercase tracking-widest">
                                Estimated: 45 Mins
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* 🔄 2. NEXT MODE PREVIEW */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }} 
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-1 space-y-6"
                    >
                        <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest px-4">Neural Sequence Preview</h3>
                        <div className="space-y-4">
                            {rotationModes.map((mode, i) => (
                                <div key={i} className={`p-6 rounded-[2rem] border transition-all ${mode.status === 'Active' ? 'glass-premium-blue border-[#6366F1]/30' : 'bg-white/5 border-white/5 opacity-50'}`}>
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl ${mode.bg} ${mode.color} flex items-center justify-center`}>
                                            <mode.icon size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-black text-white">{mode.title}</h4>
                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{mode.status}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* 📅 3. ROTATION TIMELINE */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }} 
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="lg:col-span-2 glass-premium-blue p-10 rounded-[2.5rem] border-white/5"
                    >
                        <h3 className="text-xs font-black text-white mb-10 uppercase tracking-widest flex items-center gap-2">
                            <Zap size={18} className="text-[#F59E0B]" /> Intelligence Rotation Timeline
                        </h3>
                        <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-white/5">
                            {timelineSteps.map((step, i) => (
                                <div key={i} className="relative flex items-center justify-between pl-10 group">
                                    <div className={`absolute left-0 w-6 h-6 rounded-full border-4 border-[#0B0F1A] shadow-xl transition-all ${
                                        step.status === 'completed' ? 'bg-[#10B981]' : 
                                        step.status === 'active' ? 'bg-[#6366F1] scale-125' : 
                                        'bg-slate-800'
                                    }`} />
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{step.time}</p>
                                                <h4 className={`text-lg font-bold ${step.status === 'active' ? 'text-white' : 'text-slate-400'}`}>{step.mode}</h4>
                                            </div>
                                            {step.score !== '---' && (
                                                <div className="text-lg font-black text-[#10B981]">{step.score}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 🚀 4. START SESSION BUTTON */}
                        <button 
                            onClick={() => navigate('/interview')}
                            className="w-full mt-12 h-20 rounded-3xl bg-white text-[#0B0F1A] hover:bg-white/90 font-black uppercase tracking-[0.3em] text-xs transition-all hover:scale-[1.02] active:scale-95 shadow-2xl flex items-center justify-center gap-3"
                        >
                            Engage Rotation Protocol <ArrowRight size={20} />
                        </button>
                    </motion.div>
                </div>

                <div className="p-10 glass-premium-blue rounded-[2.5rem] border-[#22D3EE]/20 flex items-center gap-8">
                    <div className="w-16 h-16 rounded-2xl bg-[#22D3EE]/10 text-[#22D3EE] flex items-center justify-center shrink-0">
                        <ShieldCheck size={32} />
                    </div>
                    <div>
                        <h4 className="text-lg font-black text-white">USP Strategy: Dynamic Recalibration</h4>
                        <p className="text-sm text-slate-400 mt-1">Our rotation engine adjusts difficulty and topics every 24 hours to ensure zero cognitive stagnation.</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default RotationSystemPage;
