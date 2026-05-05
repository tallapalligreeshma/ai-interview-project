import { motion } from "framer-motion";
import { 
    Trophy, Flame, Target, Zap, Shield, Crown, 
    Star, Award, CheckCircle2
} from "lucide-react";

const AchievementsPage = () => {
    const badges = [
        { title: "Fast Learner", desc: "Completed 5 modules in 24 hours.", icon: Zap, unlocked: true, date: "Apr 25", color: "text-[#F59E0B]", bg: "bg-[#F59E0B]/10", border: "border-[#F59E0B]/20" },
        { title: "Pressure Fighter", desc: "Scored 90%+ in a high-stress simulation.", icon: Shield, unlocked: true, date: "Apr 26", color: "text-[#EF4444]", bg: "bg-[#EF4444]/10", border: "border-[#EF4444]/20" },
        { title: "Code Architect", desc: "Optimized O(n^2) to O(n) in Live Test.", icon: Crown, unlocked: true, date: "Apr 27", color: "text-[#8B5CF6]", bg: "bg-[#8B5CF6]/10", border: "border-[#8B5CF6]/20" },
        { title: "HR Charmer", desc: "Perfect behavioral alignment score.", icon: Star, unlocked: false, requirement: "Score 100% in HR Mock", color: "text-[#22D3EE]", bg: "bg-[#22D3EE]/10", border: "border-[#22D3EE]/20" },
        { title: "Marathon Runner", desc: "Practice consistently for 30 days.", icon: Flame, unlocked: false, requirement: "30-Day Streak", color: "text-[#10B981]", bg: "bg-[#10B981]/10", border: "border-[#10B981]/20" },
        { title: "FAANG Benchmark", desc: "Clear a FAANG-level system design round.", icon: Target, unlocked: false, requirement: "Pass FAANG Simulation", color: "text-[#6366F1]", bg: "bg-[#6366F1]/10", border: "border-[#6366F1]/20" },
    ];

    return (
        <div className="flex-1 w-full min-h-screen bg-[#0B0F1A] text-slate-200 font-sans p-6 lg:p-12 overflow-x-hidden">
            {/* Ambient Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#F59E0B]/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[700px] h-[700px] bg-[#6366F1]/5 rounded-full blur-[150px]" />
            </div>

            <main className="relative z-10 max-w-[1400px] mx-auto space-y-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-white/5 pb-10">
                    <div className="space-y-2">
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight italic uppercase">
                            ACHIEVEMENTS <span className="text-[#F59E0B]">HUB</span>
                        </h1>
                        <p className="text-slate-500 font-black uppercase text-[10px] tracking-[0.4em]">Gamified Career Progression</p>
                    </div>
                </div>

                {/* Level Progress & Streak */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Level Progress */}
                    <div className="glass-premium-blue p-10 rounded-[3rem] border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
                            <Trophy size={160} />
                        </div>
                        <div className="relative z-10 space-y-6">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-2xl bg-[#6366F1] flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-[#6366F1]/30">
                                        4
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-white uppercase tracking-widest">Neural Architect</h3>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Current Rank</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-2xl font-black text-[#6366F1]">2,450</span>
                                    <span className="text-xs font-bold text-slate-500 ml-1 uppercase">XP</span>
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                                    <span>Progress to Level 5</span>
                                    <span>550 XP needed</span>
                                </div>
                                <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }} 
                                        animate={{ width: "75%" }} 
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        className="h-full bg-gradient-to-r from-[#6366F1] to-[#22D3EE]" 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Streak Counter */}
                    <div className="glass-premium-blue p-10 rounded-[3rem] border-[#F59E0B]/20 relative overflow-hidden flex items-center justify-between">
                        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#F59E0B]/20 blur-[60px] rounded-full" />
                        <div className="relative z-10 space-y-2">
                            <div className="flex items-center gap-3">
                                <Flame size={24} className="text-[#F59E0B] animate-pulse" />
                                <h3 className="text-sm font-black text-[#F59E0B] uppercase tracking-widest">Consistency Stream</h3>
                            </div>
                            <div className="text-7xl font-black text-white tracking-tighter">7<span className="text-2xl text-slate-500 ml-2">Days</span></div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Daily Practice Streak Active</p>
                        </div>
                        <div className="grid grid-cols-7 gap-2 relative z-10">
                            {[1, 2, 3, 4, 5, 6, 7].map((day, i) => (
                                <div key={i} className="flex flex-col items-center gap-2">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black ${i < 7 ? 'bg-[#F59E0B] text-white shadow-lg shadow-[#F59E0B]/20' : 'bg-white/5 text-slate-600'}`}>
                                        {i < 7 && <CheckCircle2 size={14} />}
                                    </div>
                                    <span className="text-[8px] font-black text-slate-500 uppercase">D{day}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Badges Grid */}
                <div className="space-y-6">
                    <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest px-2 flex items-center gap-2">
                        <Award size={16} /> Honor Badges
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {badges.map((badge, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={`glass-premium-blue p-8 rounded-[2.5rem] border ${badge.unlocked ? badge.border : 'border-white/5 opacity-60 grayscale'} relative overflow-hidden group`}
                            >
                                <div className="flex flex-col items-center text-center space-y-4 relative z-10">
                                    <div className={`w-20 h-20 rounded-full ${badge.bg} ${badge.color} flex items-center justify-center border ${badge.border} shadow-inner group-hover:scale-110 transition-transform`}>
                                        <badge.icon size={36} />
                                    </div>
                                    <div>
                                        <h4 className={`text-lg font-black ${badge.unlocked ? 'text-white' : 'text-slate-400'}`}>{badge.title}</h4>
                                        <p className="text-xs font-medium text-slate-500 mt-2 leading-relaxed">{badge.desc}</p>
                                    </div>
                                    {badge.unlocked ? (
                                        <span className={`text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full ${badge.bg} ${badge.color}`}>
                                            Unlocked {badge.date}
                                        </span>
                                    ) : (
                                        <div className="w-full pt-4 border-t border-white/5">
                                            <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest flex items-center justify-center gap-1">
                                                <Target size={12} /> {badge.requirement}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AchievementsPage;
