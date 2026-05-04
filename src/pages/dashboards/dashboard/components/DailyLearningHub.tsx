import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  Clock, 
  Flame, 
  Play, 
  Pause, 
  Square, 
  TrendingUp, 
  Sparkles,
  Trophy,
  ArrowRight,
  Target,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DailyLearningHub = () => {
  // --- State for Today's Plan ---
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Arrays & Hashing Problems', time: '09:00 AM', duration: '45m', category: 'DSA', color: 'blue', completed: true },
    { id: 2, title: 'System Design - Scalability', time: '11:00 AM', duration: '60m', category: 'System Design', color: 'purple', completed: false },
    { id: 3, title: 'Mock HR Interview', time: '02:00 PM', duration: '30m', category: 'Behavioral', color: 'orange', completed: false },
    { id: 4, title: 'JavaScript Closures & Scopes', time: '04:00 PM', duration: '40m', category: 'JS', color: 'amber', completed: false },
    { id: 5, title: 'Revise Database Sharding', time: '06:00 PM', duration: '30m', category: 'System Design', color: 'purple', completed: false },
  ]);

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = (completedCount / tasks.length) * 100;

  // --- State for Timer & Hours ---
  const [timer, setTimer] = useState(0); // in seconds
  const [isTimerActive, setIsTimerActive] = useState(false);
  const dailyGoalHours = 4;
  const hoursStudied = 2.5 + (timer / 3600);
  const ringPercent = Math.min((hoursStudied / dailyGoalHours) * 100, 100);

  useEffect(() => {
    let interval: any = null;
    if (isTimerActive) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerActive]);

  const formatTimer = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // --- State for Quotes ---
  const quotes = useMemo(() => [
    { text: "Consistency is what transforms average into excellence.", author: "Unknown" },
    { text: "Your only limit is your mind.", author: "Mental Toughness" },
    { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
    { text: "Don't stop when you're tired. Stop when you're done.", author: "David Goggins" },
  ], []);

  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex(prev => (prev + 1) % quotes.length);
    }, 10000); // 10s rotation
    return () => clearInterval(interval);
  }, [quotes]);

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <Card className="border-0 bg-white dark:bg-slate-900 shadow-sm rounded-[2.5rem] overflow-hidden">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Panel: Today's Plan */}
          <div className="lg:col-span-4 p-8 border-b lg:border-b-0 lg:border-r border-neutral-100 dark:border-slate-800 flex flex-col gap-6">
            <div>
              <p className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-1">Monday, Oct 12</p>
              <h2 className="text-2xl font-black text-neutral-800 dark:text-white leading-tight">Good Morning, Alex 👋</h2>
            </div>

            <div className="space-y-3">
              {tasks.map((task) => (
                <motion.div 
                  key={task.id}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className={`group flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${
                    task.completed 
                    ? 'bg-emerald-50/50 border-emerald-100 dark:bg-emerald-500/5 dark:border-emerald-500/20' 
                    : 'bg-white dark:bg-slate-900 border-neutral-100 dark:border-slate-800'
                  }`}
                  onClick={() => toggleTask(task.id)}
                >
                  <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                    task.completed 
                    ? 'bg-emerald-500 border-emerald-500 text-white' 
                    : 'border-neutral-200 dark:border-slate-700'
                  }`}>
                    {task.completed && <CheckCircle2 size={14} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <h4 className={`text-sm font-bold ${task.completed ? 'text-emerald-700 dark:text-emerald-400 line-through' : 'text-neutral-800 dark:text-white'}`}>
                        {task.title}
                      </h4>
                      <Badge className="text-[10px] font-black uppercase tracking-widest bg-white dark:bg-slate-800 border-neutral-100 dark:border-slate-700 text-neutral-400 group-hover:bg-primary group-hover:text-white transition-colors">
                        {task.duration}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-neutral-400 flex items-center gap-1">
                        <Clock size={10} /> {task.time}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-neutral-200" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-primary">
                        {task.category}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto pt-4 border-t border-neutral-50 dark:border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black text-neutral-800 dark:text-white uppercase tracking-widest">Today's Progress</span>
                <span className="text-xs font-black text-primary">{completedCount} of {tasks.length} Completed</span>
              </div>
              <div className="h-2 w-full bg-neutral-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  className="h-full bg-primary rounded-full shadow-lg shadow-primary/20"
                />
              </div>
            </div>
          </div>

          {/* Middle Panel: Hours & Focus */}
          <div className="lg:col-span-5 p-8 border-b lg:border-b-0 lg:border-r border-neutral-100 dark:border-slate-800 bg-neutral-50/30 dark:bg-slate-900/40 flex flex-col items-center">
            <div className="w-full mb-8">
              <h3 className="text-sm font-black text-neutral-800 dark:text-white uppercase tracking-[0.2em] mb-6 text-center">Focus Summary</h3>
              <div className="flex flex-col md:flex-row items-center justify-center gap-10">
                {/* Circular Ring */}
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle 
                      cx="80" cy="80" r="70" 
                      fill="transparent" 
                      className="stroke-neutral-100 dark:stroke-slate-800" 
                      strokeWidth="12" 
                    />
                    <motion.circle 
                      cx="80" cy="80" r="70" 
                      fill="transparent" 
                      stroke="currentColor" 
                      className="text-primary"
                      strokeWidth="12" 
                      strokeDasharray={440}
                      initial={{ strokeDashoffset: 440 }}
                      animate={{ strokeDashoffset: 440 - (440 * ringPercent) / 100 }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-neutral-800 dark:text-white tracking-tighter">
                      {hoursStudied.toFixed(1)}
                    </span>
                    <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                      / {dailyGoalHours}h Goal
                    </span>
                  </div>
                  {isTimerActive && (
                    <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-ping pointer-events-none" />
                  )}
                </div>

                {/* Session Timer */}
                <div className="flex flex-col items-center md:items-start gap-4">
                  <div className="text-center md:text-left">
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-1 block">Active Session</span>
                    <span className="text-4xl font-black text-neutral-800 dark:text-white tracking-tighter tabular-nums font-mono">
                      {formatTimer(timer)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      onClick={() => setIsTimerActive(!isTimerActive)}
                      className={`h-11 px-6 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-lg transition-all ${
                        isTimerActive ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20' : 'bg-primary hover:bg-primary/90 text-white shadow-primary/20'
                      }`}
                    >
                      {isTimerActive ? <><Pause size={14} className="mr-2 fill-current" /> Pause</> : <><Play size={14} className="mr-2 fill-current" /> Start</>}
                    </Button>
                    <Button 
                      variant="ghost"
                      onClick={() => { setTimer(0); setIsTimerActive(false); }}
                      className="h-11 w-11 p-0 rounded-xl hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10 text-neutral-400 transition-all"
                    >
                      <Square size={16} className="fill-current" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Weekly Mini Chart */}
            <div className="w-full mt-auto">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black text-neutral-400 uppercase tracking-widest">Weekly Trends</span>
                <span className="text-[10px] font-bold text-neutral-400 uppercase">Target: 4h/Day</span>
              </div>
              <div className="flex items-end justify-between h-20 gap-2 relative">
                {/* 4h Goal Line */}
                <div className="absolute bottom-[60%] left-0 right-0 border-t border-dashed border-primary/30 z-0" />
                
                {[3.2, 4.5, 2.8, 4.0, 3.5, 3.8, 1.2].map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 relative z-10 group">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${(val / 5) * 100}%` }}
                      className={`w-full rounded-t-lg transition-all duration-300 ${
                        val >= 4 ? 'bg-primary shadow-lg shadow-primary/20' : 'bg-neutral-200 dark:bg-slate-700'
                      } group-hover:scale-x-110`}
                    />
                    <span className="text-[9px] font-black text-neutral-300 dark:text-slate-600 uppercase tracking-tighter">
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel: Motivation & Streak */}
          <div className="lg:col-span-3 p-8 flex flex-col gap-8 bg-white dark:bg-slate-900">
            {/* Status Badge */}
            <div className="flex justify-between items-start">
               <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                  <Target size={24} />
               </div>
               <Badge className={`px-4 py-1.5 rounded-full border-0 font-black uppercase tracking-widest text-[10px] ${
                 progressPercent >= 40 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/20'
               }`}>
                 {progressPercent >= 40 ? 'On Track 🎯' : 'Needs Catch-up 💪'}
               </Badge>
            </div>

            {/* Rotating Quote */}
            <div className="min-h-[80px]">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={quoteIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-2"
                >
                  <p className="text-xl font-black text-neutral-800 dark:text-white leading-tight tracking-tight italic">
                    "{quotes[quoteIndex].text}"
                  </p>
                  <p className="text-xs font-bold text-neutral-400">— {quotes[quoteIndex].author}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Streak & Metrics */}
            <div className="space-y-4">
              <div className="p-4 rounded-3xl bg-neutral-50 dark:bg-slate-800/50 border border-neutral-100 dark:border-slate-800 flex items-center justify-between group cursor-pointer hover:border-primary/30 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <Flame size={20} className="fill-current" />
                  </div>
                  <div>
                    <h5 className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-0.5">Current Streak</h5>
                    <p className="text-lg font-black text-neutral-800 dark:text-white leading-none">4 Days</p>
                  </div>
                </div>
                <TrendingUp size={16} className="text-emerald-500" />
              </div>

              <div className="p-4 rounded-3xl bg-neutral-50 dark:bg-slate-800/50 border border-neutral-100 dark:border-slate-800 flex items-center justify-between group cursor-pointer hover:border-primary/30 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <Trophy size={20} className="fill-current" />
                  </div>
                  <div>
                    <h5 className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-0.5">Weekly Hours</h5>
                    <p className="text-lg font-black text-neutral-800 dark:text-white leading-none">18.5 / 28h</p>
                  </div>
                </div>
                <ArrowRight size={16} className="text-neutral-300 -rotate-45" />
              </div>
            </div>

            {/* AI Tip Card */}
            <div className="mt-auto p-5 rounded-3xl bg-gradient-to-br from-primary to-indigo-600 text-white relative overflow-hidden group shadow-xl shadow-primary/20">
               <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-150 transition-transform duration-1000">
                  <Sparkles size={100} />
               </div>
               <div className="relative z-10">
                 <div className="flex items-center gap-2 mb-2">
                    <Zap size={14} className="text-yellow-300 fill-current" />
                    <span className="text-[10px] font-black uppercase tracking-widest">AI Hub Coach</span>
                 </div>
                 <p className="text-xs font-bold leading-relaxed mb-4">
                   You're 45 mins away from your daily goal — finish the DP session!
                 </p>
                 <Button className="w-full bg-white text-primary hover:bg-neutral-100 h-9 rounded-xl font-black uppercase tracking-widest text-[9px] shadow-lg">
                   Finish Session
                 </Button>
               </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyLearningHub;
