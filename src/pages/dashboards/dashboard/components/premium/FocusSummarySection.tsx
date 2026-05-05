import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Play, Square } from "lucide-react";
import { Button } from "@/components/ui/button";

const FocusSummarySection = () => {
    const [isActive, setIsActive] = useState(false);
    const [seconds, setSeconds] = useState(1); // 00:00:01 as in screenshot

    useEffect(() => {
        let interval: any = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(sec => sec + 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    const formatTime = (totalSeconds: number) => {
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const progress = 62.5; // (2.5 / 4) * 100

    return (
        <div className="flex flex-col h-full bg-white rounded-[2.5rem] border border-slate-50 p-10 space-y-12">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 text-center">Focus Summary</h3>

            <div className="flex flex-col items-center lg:flex-row lg:justify-center gap-16">
                {/* Circular Progress */}
                <div className="relative w-48 h-48">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle
                            cx="96"
                            cy="96"
                            r="88"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="transparent"
                            className="text-slate-100"
                        />
                        <motion.circle
                            cx="96"
                            cy="96"
                            r="88"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="transparent"
                            strokeDasharray="552.92"
                            initial={{ strokeDashoffset: 552.92 }}
                            animate={{ strokeDashoffset: 552.92 - (552.92 * progress) / 100 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="text-indigo-600"
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-black text-slate-800 tracking-tighter">2.5</span>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">/ 4H Goal</span>
                    </div>
                </div>

                {/* Active Session Info */}
                <div className="flex flex-col items-center lg:items-start transition-all">
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-2">Active Session</p>
                    <div className="text-5xl font-black text-slate-800 tracking-tighter mb-8 tabular-nums">
                        {formatTime(seconds)}
                    </div>
                    <div className="flex items-center gap-3">
                        <Button 
                            onClick={() => setIsActive(!isActive)}
                            className={`h-14 px-8 rounded-2xl ${isActive ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-indigo-600 hover:bg-indigo-700 text-white'} shadow-xl shadow-indigo-500/20 font-black uppercase tracking-widest text-[10px] gap-3 transition-all active:scale-95`}
                        >
                            {isActive ? <><Square size={16} fill="currentColor" /> Stop</> : <><Play size={16} fill="currentColor" /> Start Focus</>}
                        </Button>
                        <Button variant="outline" className="h-14 w-14 rounded-2xl border-slate-100 text-slate-400 hover:bg-slate-50">
                            <Square size={20} />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Weekly Trends */}
            <div className="flex-1 flex flex-col justify-end">
                <div className="flex items-center justify-between mb-8">
                    <h5 className="text-[10px] font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                        Weekly Trends
                    </h5>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Target: 4H/DAY</div>
                </div>

                {/* Mock Bar Chart */}
                <div className="flex items-end justify-between gap-2 h-32 relative">
                    <div className="absolute inset-0 border-b border-dashed border-slate-100 top-2/3" />
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => {
                        const heights = ['60%', '80%', '40%', '90%', '70%', '30%', '50%'];
                        return (
                            <div key={i} className="flex flex-col items-center flex-1 gap-4">
                                <motion.div 
                                    initial={{ height: 0 }}
                                    animate={{ height: heights[i] }}
                                    transition={{ delay: i * 0.1, duration: 0.8 }}
                                    className={`w-full rounded-full ${i === 2 ? 'bg-indigo-600 shadow-lg shadow-indigo-500/30' : 'bg-slate-100'}`} 
                                />
                                <span className={`text-[10px] font-black ${i === 2 ? 'text-indigo-600' : 'text-slate-300'}`}>{day}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default FocusSummarySection;
