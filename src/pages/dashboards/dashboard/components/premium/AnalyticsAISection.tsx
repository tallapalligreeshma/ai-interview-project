import { motion } from "framer-motion";
import { Flame, Clock, Brain, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const AnalyticsAISection = () => {
    return (
        <div className="flex flex-col h-full space-y-8">
            {/* Status & Quote */}
            <div className="space-y-6">
                <div className="flex justify-end">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-100/50">
                        <TrendingUp size={14} className="text-amber-500" />
                        <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest">Needs Catch-up 💪</span>
                    </div>
                </div>

                <div className="relative p-6 pt-10">
                    <div className="absolute top-0 left-0 text-6xl text-slate-100 font-serif opacity-50 select-none">"</div>
                    <p className="text-xl font-black text-slate-800 leading-tight italic font-heading relative z-10">
                        "Consistency is what transforms average into excellence."
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 mt-4 uppercase tracking-widest">— Unknown</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="space-y-4">
                <div className="p-6 bg-white rounded-[2rem] border border-slate-50 shadow-sm flex items-center justify-between group hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-orange-50 text-orange-500 rounded-2xl group-hover:scale-110 transition-transform">
                            <Flame size={20} fill="currentColor" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Current Streak</p>
                            <p className="text-lg font-black text-slate-800">4 Days</p>
                        </div>
                    </div>
                    <TrendingUp size={18} className="text-green-500" />
                </div>

                <div className="p-6 bg-white rounded-[2rem] border border-slate-50 shadow-sm flex items-center justify-between group hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 text-blue-500 rounded-2xl group-hover:scale-110 transition-transform">
                            <Clock size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Weekly Hours</p>
                            <p className="text-lg font-black text-slate-800">18.5 / 28h</p>
                        </div>
                    </div>
                    <TrendingUp size={18} className="text-slate-200" />
                </div>
            </div>

            {/* AI Coach Card */}
            <div className="flex-1 flex flex-col justify-end">
                <motion.div 
                    whileHover={{ y: -5 }}
                    className="p-8 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-[2.5rem] shadow-2xl shadow-indigo-600/30 text-white relative overflow-hidden"
                >
                    <div className="absolute -right-4 -top-4 opacity-10">
                        <Brain size={120} />
                    </div>
                    
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
                            <Sparkles size={16} fill="white" />
                        </div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80">AI Hub Coach</h4>
                    </div>

                    <p className="text-sm font-bold leading-relaxed mb-8 relative z-10">
                        You're 45 mins away from your daily goal — finish the DP session!
                    </p>

                    <Button className="w-full h-12 bg-white text-indigo-600 hover:bg-slate-50 font-black uppercase tracking-widest text-[10px] rounded-2xl shadow-xl shadow-black/10">
                        Finish Session
                    </Button>
                </motion.div>
            </div>
        </div>
    );
};

export default AnalyticsAISection;
