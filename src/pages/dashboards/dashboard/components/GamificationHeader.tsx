import { Flame, Trophy, Star, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const GamificationHeader = () => {
    return (
        <div className="glass-light dark:glass-dark rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8 mb-6 transition-all duration-300">
            <div className="flex items-center gap-5 md:border-r border-neutral-100 dark:border-slate-800 pr-0 md:pr-10 w-full md:w-auto justify-center md:justify-start">
                <div className="relative group">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white shadow-xl group-hover:rotate-6 transition-transform">
                        <Trophy size={32} />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-black px-1.5 py-0.5 rounded-lg shadow-lg border-2 border-white dark:border-slate-900">
                        TOP 5%
                    </div>
                </div>
                <div>
                    <div className="text-xs font-black text-neutral-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Assessment Level</div>
                    <div className="flex items-center gap-3">
                        <span className="text-3xl font-black text-neutral-800 dark:text-white">Level 4</span>
                        <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider">
                            Intermediate
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full px-2 sm:px-4">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <Star size={18} className="text-yellow-500 fill-yellow-500 animate-pulse" />
                        <span className="text-sm font-black text-neutral-700 dark:text-slate-300 tracking-tight">Experience Progress</span>
                    </div>
                    <span className="text-[11px] font-black text-neutral-500 dark:text-slate-400 tabular-nums">2,450 / 3,000 XP</span>
                </div>
                <div className="h-4 rounded-full bg-neutral-100 dark:bg-slate-800/50 overflow-hidden p-1 shadow-inner">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "81%" }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                        className="h-full bg-gradient-to-r from-primary to-blue-400 rounded-full shadow-[0_0_12px_rgba(37,99,235,0.4)]"
                    />
                </div>
                <div className="flex items-center justify-between mt-3 px-1">
                    <span className="text-[10px] font-black text-neutral-400 dark:text-slate-500 uppercase tracking-widest">350 XP to Level 5</span>
                    <div className="flex items-center gap-1.5 text-primary text-[10px] font-black cursor-pointer hover:gap-2 transition-all uppercase tracking-widest">
                        View Achievements <ChevronRight size={12} />
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-8 md:border-l border-neutral-100 dark:border-slate-800 pl-0 md:pl-10 w-full md:w-auto justify-center">
                <div className="text-center group cursor-help">
                    <motion.div 
                        animate={{ 
                            scale: [1, 1.15, 1],
                            rotate: [-5, 5, -5]
                        }} 
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="flex items-center justify-center mb-1"
                    >
                        <Flame size={48} className="text-orange-500 fill-orange-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.6)]" />
                    </motion.div>
                    <div className="text-3xl font-black text-neutral-800 dark:text-white leading-none tabular-nums">12</div>
                    <div className="text-[10px] font-black text-neutral-400 dark:text-slate-500 uppercase tracking-[0.2em] mt-2">Practice Streak</div>
                </div>
            </div>
        </div>
    );
};

export default GamificationHeader;
