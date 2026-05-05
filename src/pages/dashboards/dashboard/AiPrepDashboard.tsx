import { motion } from "framer-motion";
import { 
    Code, 
    Users, 
    MonitorPlay, 
    Sparkles, 
    Clock,
    BrainCircuit,
    Activity,
    Target,
    Zap,
    Trophy
} from "lucide-react";
import ReactApexChart from 'react-apexcharts';

import { animate } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CountUp = ({ value, suffix = "" }: { value: string, suffix?: string }) => {
    const numericValue = parseInt(value);
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (isNaN(numericValue)) return;
        const controls = animate(0, numericValue, {
            duration: 2,
            ease: "easeOut",
            onUpdate: (latest) => setDisplayValue(Math.round(latest))
        });
        return controls.stop;
    }, [numericValue]);

    if (isNaN(numericValue)) return <span>{value}</span>;
    return <span>{displayValue}{suffix}</span>;
};

const AiPrepDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState<any>({
        total_score: 82,
        sessions: 3,
        last_score: 85,
        history: [
            { type: "Technical Mock", score: 85, time: "2 hours ago", status: "good", color: "text-[#10B981]" },
            { type: "HR Behavioral", score: 92, time: "Yesterday", status: "excellent", color: "text-[#6366F1]" },
            { type: "System Design", score: 68, time: "3 days ago", status: "needs_work", color: "text-[#F59E0B]" }
        ]
    });

    useEffect(() => {
        try {
            const localStats = JSON.parse(localStorage.getItem('interview_stats') || 'null');
            if (localStats && localStats.history) {
                setStats({
                    ...localStats,
                    history: localStats.history.slice(-3).reverse().map((h: any) => ({
                        type: h.role || 'Mock Session',
                        score: h.score || 0,
                        time: h.date || 'Recent',
                        status: (h.score || 0) > 80 ? 'excellent' : 'good',
                        color: (h.score || 0) > 80 ? 'text-[#10B981]' : 'text-[#6366F1]'
                    }))
                });
            }
        } catch (e) {
            console.error("Failed to parse interview stats", e);
        }
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                duration: 0.5, 
                staggerChildren: 0.1 
            }
        }
    };
    
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const lineChartOptions: any = {
        chart: {
            type: 'line',
            toolbar: { show: false },
            background: 'transparent',
            animations: { enabled: true, easing: 'easeinout', speed: 800 }
        },
        stroke: { curve: 'smooth', width: 3 },
        colors: ['#8B5CF6'],
        xaxis: {
            categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            labels: { style: { colors: '#94a3b8' } },
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        yaxis: { labels: { style: { colors: '#94a3b8' } }, min: 50, max: 100 },
        grid: { borderColor: 'rgba(255,255,255,0.05)', strokeDashArray: 4 },
        theme: { mode: 'dark' },
        tooltip: { theme: 'dark', y: { formatter: (val: any) => `${val}%` } }
    };

    const lineChartSeries = [{ name: 'Readiness Score', data: [65, 68, 74, 72, 80, 85, 82] }];

    const barChartOptions: any = {
        chart: { type: 'bar', toolbar: { show: false }, background: 'transparent' },
        plotOptions: { bar: { borderRadius: 4, horizontal: false, columnWidth: '50%' } },
        dataLabels: { enabled: false },
        colors: ['#22D3EE'],
        xaxis: {
            categories: ['DSA', 'System Design', 'React', 'Node.js', 'HR'],
            labels: { style: { colors: '#94a3b8' } },
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        yaxis: { labels: { style: { colors: '#94a3b8' } }, max: 100 },
        grid: { borderColor: 'rgba(255,255,255,0.05)', strokeDashArray: 4 },
        theme: { mode: 'dark' },
        tooltip: { theme: 'dark' }
    };

    const barChartSeries = [{ name: 'Skill Level', data: [75, 60, 90, 85, 95] }];

    return (
        <div className="flex-1 w-full min-h-screen bg-[#0B0F1A] text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden page-fade-in">
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#6366F1]/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[700px] h-[700px] bg-[#8B5CF6]/10 rounded-full blur-[150px]" />
            </div>

            <main className="relative z-10 w-full pb-20 p-6 lg:p-10">
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full space-y-10">
                    
                    {/* 1. TOP SECTION: WELCOME + PRIMARY ACTIONS */}
                    {(() => {
                        const user = (() => {
                            try {
                                return JSON.parse(localStorage.getItem('user') || '{}');
                            } catch (e) {
                                return {};
                            }
                        })();
                        const displayName = user.email ? user.email.split('@')[0] : 'Greeshma';
                        return (
                            <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-10">
                                <div className="space-y-2">
                                    <h1 className="text-5xl font-black text-white tracking-tighter italic">
                                        Welcome back, <span className="text-gradient-cyan uppercase">{displayName} 👋</span>
                                    </h1>
                                    <p className="text-slate-400 font-medium text-lg">
                                        Your intelligence synchronization is at <span className="text-white font-bold">88%</span>. Ready for your next challenge?
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Button 
                                        onClick={() => navigate('/history')}
                                        className="rounded-2xl glass-premium-blue border-white/10 text-white font-bold px-10 h-14 hover:bg-[#6366F1]/20 transition-all active:scale-95"
                                    >
                                        Simulation History
                                    </Button>
                                    <Button 
                                        onClick={() => navigate('/interview')}
                                        className="rounded-2xl bg-gradient-to-r from-[#6366F1] to-[#22D3EE] text-[#0B0F1A] font-black uppercase tracking-[0.2em] px-10 h-14 shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:scale-105 transition-all active:scale-95 text-xs"
                                    >
                                        Start Mock Interview
                                    </Button>
                                </div>
                            </motion.div>
                        );
                    })()}

                    {/* 2. STATS CARDS: HIGH VISIBILITY */}
                    <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Average Score", value: `${Math.round(stats.total_score / (stats.sessions || 1))}%`, icon: Target, color: "text-[#6366F1]", bg: "bg-[#6366F1]/10", border: "border-[#6366F1]/30" },
                            { title: "Last Performance", value: `${stats.last_score || 0}%`, icon: Activity, color: "text-[#22D3EE]", bg: "bg-[#22D3EE]/10", border: "border-[#22D3EE]/30" },
                            { title: "Progress (Sessions)", value: `${stats.sessions || 0}`, icon: Trophy, color: "text-[#8B5CF6]", bg: "bg-[#8B5CF6]/10", border: "border-[#8B5CF6]/30" },
                            { title: "Strength Level", value: "Advanced", icon: Zap, color: "text-[#F59E0B]", bg: "bg-[#F59E0B]/10", border: "border-[#F59E0B]/30" }
                        ].map((metric, i) => (
                            <div key={i} className="group glass-premium-blue p-8 rounded-[2.5rem] border-white/5 hover:border-[#6366F1]/40 transform hover:-translate-y-2 smooth-transition cursor-default relative overflow-hidden">
                                <div className="flex flex-col gap-6 relative z-10">
                                    <div className={`w-16 h-16 rounded-3xl ${metric.bg} ${metric.color} flex items-center justify-center border ${metric.border} group-hover:scale-110 smooth-transition shadow-inner`}>
                                        <metric.icon size={32} />
                                    </div>
                                    <div>
                                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{metric.title}</h3>
                                        <div className="text-5xl font-black text-white mt-1 tracking-tight group-hover:text-gradient-cyan smooth-transition">
                                            <CountUp value={metric.value} suffix={metric.value.includes('%') ? '%' : ''} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* 3. PERFORMANCE OVERVIEW: PROFESSIONAL CHARTS */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="p-10 rounded-[3rem] glass-premium-blue border-white/5 relative group hover:border-[#6366F1]/30 smooth-transition overflow-hidden">
                                    <h3 className="text-xs font-black text-white mb-8 uppercase tracking-[0.2em] flex items-center gap-3">
                                        <Activity size={20} className="text-[#6366F1]" /> Performance Overview
                                    </h3>
                                    <div className="h-[280px] w-full">
                                        <ReactApexChart options={lineChartOptions} series={lineChartSeries} type="line" height="100%" />
                                    </div>
                                </div>
                                <div className="p-10 rounded-[3rem] glass-premium-blue border-white/5 relative group hover:border-[#6366F1]/30 smooth-transition overflow-hidden">
                                    <h3 className="text-xs font-black text-white mb-8 uppercase tracking-[0.2em] flex items-center gap-3">
                                        <Trophy size={20} className="text-[#22D3EE]" /> Intelligence Domains
                                    </h3>
                                    <div className="h-[280px] w-full">
                                        <ReactApexChart options={barChartOptions} series={barChartSeries} type="bar" height="100%" />
                                    </div>
                                </div>
                            </div>

                            {/* 4. QUICK ACTIONS: ACCELERATORS */}
                            <div className="p-10 rounded-[3rem] glass-premium-blue border-white/5 shadow-2xl relative overflow-hidden group">
                                <h3 className="text-xs font-black text-white mb-10 uppercase tracking-[0.2em]">Intelligence Accelerators</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                                    {[
                                        { title: "AI Interview", icon: BrainCircuit, gradient: "from-[#6366F1] to-[#8B5CF6]", route: "/interview" },
                                        { title: "Video Simulation", icon: MonitorPlay, gradient: "from-[#22D3EE] to-[#3B82F6]", route: "/video-interview" },
                                        { title: "Practice Hub", icon: Code, gradient: "from-[#8B5CF6] to-[#D946EF]", route: "/practice" },
                                        { title: "Career Insights", icon: Users, gradient: "from-[#F59E0B] to-[#EF4444]", route: "/roles" }
                                    ].map((action, i) => (
                                        <button 
                                            key={i} 
                                            onClick={() => navigate(action.route)}
                                            className={`p-8 rounded-[2rem] bg-gradient-to-br ${action.gradient} border border-white/10 shadow-xl hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] hover:-translate-y-3 smooth-transition flex flex-col items-center justify-center gap-5 group text-white relative overflow-hidden`}
                                        >
                                            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:scale-125 smooth-transition">
                                                <action.icon size={32} className="drop-shadow-lg" />
                                            </div>
                                            <span className="text-[12px] font-black uppercase tracking-widest text-center leading-tight">{action.title}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* RIGHT COLUMN: COACHING & HISTORY */}
                        <motion.div variants={itemVariants} className="space-y-8">
                            <div className="p-10 rounded-[3rem] glass-premium-blue border-[#6366F1]/30 relative overflow-hidden group shadow-[0_0_50px_rgba(99,102,241,0.1)]">
                                <h3 className="text-xs font-black text-[#6366F1] mb-8 flex items-center gap-3 uppercase tracking-[0.2em]">
                                    <Sparkles size={24} className="animate-pulse" /> Neural Coaching
                                </h3>
                                <div className="space-y-6">
                                    {[
                                        "Optimize your React hooks logic.",
                                        "Communication depth is increasing.",
                                        "System Design scaling needs work."
                                    ].map((insight, i) => (
                                        <div key={i} className="flex gap-5 p-6 bg-white/[0.03] rounded-[2rem] border border-white/5 hover:bg-white/[0.08] smooth-transition group/item">
                                            <div className="w-12 h-12 rounded-2xl bg-[#6366F1]/20 flex items-center justify-center shrink-0 group-hover/item:scale-110 smooth-transition">
                                                <BrainCircuit size={22} className="text-[#6366F1]" />
                                            </div>
                                            <p className="text-sm text-slate-300 leading-relaxed font-bold italic">{insight}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-10 rounded-[3rem] glass-premium-blue border-white/5 hover:border-[#6366F1]/30 smooth-transition">
                                <h3 className="text-xs font-black text-white mb-8 uppercase tracking-[0.2em]">Simulation History</h3>
                                <div className="space-y-5">
                                    {stats.history.map((history: any, i: number) => (
                                        <div key={i} className="flex items-center justify-between p-5 bg-white/[0.03] rounded-2xl border border-white/5 group hover:bg-white/[0.08] smooth-transition cursor-pointer">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-[#6366F1]/20 smooth-transition">
                                                    <Clock size={20} className="text-slate-400 group-hover:text-white smooth-transition" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-white group-hover:text-[#22D3EE] smooth-transition">{history.type}</p>
                                                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{history.time}</p>
                                                </div>
                                            </div>
                                            <span className={`text-xl font-black ${history.color} drop-shadow-sm`}>
                                                {history.score}%
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default AiPrepDashboard;
