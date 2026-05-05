import { motion, AnimatePresence } from "framer-motion";
import {
    Target,
    ShieldAlert,
    TrendingUp,
    Zap,
    ArrowRight,
    Activity,
    ChevronRight,
    Brain,
    CheckCircle2,
    AlertTriangle
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactApexChart from "react-apexcharts";


const WeaknessTrackerPage = () => {
    const navigate = useNavigate();
    const [selectedWeakness, setSelectedWeakness] = useState<any>(null);

    const weaknesses = [
        {
            id: 1,
            skill: "System Design (HLD/LLD)",
            mastery: 52,
            trend: "declining",
            priority: "Critical",
            practiceCount: 3,
            color: "text-rose-500",
            bg: "bg-rose-500/10",
            border: "border-rose-500/20",
            barColor: "bg-rose-500",
            tip: "Focus on CAP Theorem, sharding strategies, and database indexing. Practice designing Twitter/Uber clone architecture.",
            relatedTopics: ["Load Balancing", "Microservices", "API Gateway", "CDN"]
        },
        {
            id: 2,
            skill: "Recursion & Dynamic Programming",
            mastery: 58,
            trend: "stable",
            priority: "High",
            practiceCount: 8,
            color: "text-[#F59E0B]",
            bg: "bg-[#F59E0B]/10",
            border: "border-[#F59E0B]/20",
            barColor: "bg-[#F59E0B]",
            tip: "Master memoization patterns. Start with Fibonacci, then move to Knapsack problem and Longest Common Sequence.",
            relatedTopics: ["Memoization", "Backtracking", "Tree DP", "Knapsack"]
        },
        {
            id: 3,
            skill: "Pipes & Cisterns (Aptitude)",
            mastery: 65,
            trend: "improving",
            priority: "Medium",
            practiceCount: 12,
            color: "text-[#22D3EE]",
            bg: "bg-[#22D3EE]/10",
            border: "border-[#22D3EE]/20",
            barColor: "bg-[#22D3EE]",
            tip: "Apply the LCM method for time & work problems. Practice 10 questions daily for one week.",
            relatedTopics: ["Time & Work", "Speed & Distance", "Percentages", "Ratios"]
        },
        {
            id: 4,
            skill: "React Advanced Patterns",
            mastery: 70,
            trend: "improving",
            priority: "Medium",
            practiceCount: 15,
            color: "text-[#8B5CF6]",
            bg: "bg-[#8B5CF6]/10",
            border: "border-[#8B5CF6]/20",
            barColor: "bg-[#8B5CF6]",
            tip: "Study React Concurrent Mode, Suspense, and Error Boundaries. Build a mini Redux clone from scratch.",
            relatedTopics: ["Context API", "Custom Hooks", "Suspense", "Error Boundaries"]
        }
    ];

    const radarOptions: any = {
        chart: { type: "radar", toolbar: { show: false }, background: "transparent" },
        colors: ["#EF4444"],
        stroke: { width: 2, colors: ["#EF4444"] },
        fill: { opacity: 0.15, colors: ["#EF4444"] },
        markers: { size: 4, colors: ["#EF4444"], strokeColors: "#0B0F1A", strokeWidth: 2 },
        yaxis: { show: false, min: 0, max: 100 },
        xaxis: {
            categories: ["System Design", "Recursion/DP", "Aptitude", "React", "SQL", "OS Concepts"],
            labels: { style: { colors: "#9CA3AF", fontSize: "10px", fontWeight: "700" } }
        },
        plotOptions: {
            radar: { polygons: { strokeColors: "rgba(255,255,255,0.05)", connectorColors: "rgba(255,255,255,0.05)" } }
        },
        theme: { mode: "dark" }
    };

    const radarSeries = [{ name: "Weak Zones", data: [52, 58, 65, 70, 45, 60] }];

    const barOptions: any = {
        chart: { type: "bar", toolbar: { show: false }, background: "transparent" },
        colors: ["#6366F1", "#22D3EE", "#F59E0B", "#EF4444"],
        xaxis: {
            categories: ["System Design", "Recursion", "Aptitude", "React"],
            labels: { style: { colors: "#9CA3AF", fontWeight: "700", fontSize: "10px" } },
            axisBorder: { show: false },
            axisTicks: { show: false }
        },
        yaxis: { labels: { style: { colors: "#9CA3AF", fontWeight: "600" } }, min: 0, max: 100 },
        grid: { borderColor: "rgba(255,255,255,0.03)", strokeDashArray: 4 },
        plotOptions: { bar: { borderRadius: 8, distributed: true } },
        legend: { show: false },
        theme: { mode: "dark" },
        tooltip: { theme: "dark", y: { formatter: (val: number) => `${val}% Mastery` } }
    };

    const barSeries = [{ name: "Mastery", data: [52, 58, 65, 70] }];

    return (
        <div className="flex-1 w-full min-h-screen bg-[#0B0F1A] text-slate-200 font-sans p-4 md:p-6 overflow-x-hidden">
            {/* Ambient Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#EF4444]/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[700px] h-[700px] bg-[#6366F1]/5 rounded-full blur-[150px]" />
            </div>

            <main className="relative z-10 w-full space-y-12">

                {/* 🔴 1. HEADER */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 border-b border-white/5 pb-10">
                    <div className="space-y-3">
                        <span className="text-[10px] font-black text-rose-500 uppercase tracking-[0.4em] flex items-center gap-2">
                            <ShieldAlert size={14} /> Critical Diagnostic System
                        </span>
                        <h1 className="text-5xl lg:text-6xl font-black text-white tracking-tight italic uppercase">
                            WEAKNESS <span className="text-rose-500">TRACKER</span>
                        </h1>
                        <p className="text-slate-500 text-sm font-medium max-w-xl leading-relaxed">
                            Real-time neural scan of your performance gaps. Fix weak zones before they cost you an offer.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <div className="px-6 py-3 glass-premium-blue rounded-2xl border border-white/5 text-center">
                            <div className="text-3xl font-black text-rose-500">4</div>
                            <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">Critical Gaps</div>
                        </div>
                        <div className="px-6 py-3 glass-premium-blue rounded-2xl border border-white/5 text-center">
                            <div className="text-3xl font-black text-[#F59E0B]">61%</div>
                            <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">Avg Mastery</div>
                        </div>
                    </div>
                </motion.div>

                {/* 🔴 2. MAIN LAYOUT: LIST + CHARTS */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">

                    {/* LEFT: WEAKNESS LIST */}
                    <div className="xl:col-span-7 space-y-6">
                        <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest px-2 flex items-center gap-2">
                            <AlertTriangle size={14} className="text-rose-500" /> Top Vulnerability Signals
                        </h3>
                        {weaknesses.map((w, i) => (
                            <motion.button
                                key={w.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                onClick={() => setSelectedWeakness(selectedWeakness?.id === w.id ? null : w)}
                                className={`w-full text-left p-8 rounded-[2.5rem] border transition-all group ${selectedWeakness?.id === w.id ? `glass-premium-blue ${w.border}` : 'bg-white/5 border-white/5 hover:border-white/10'}`}
                            >
                                <div className="flex items-center justify-between gap-6">
                                    <div className="flex items-center gap-6 flex-1">
                                        <div className={`w-16 h-16 rounded-2xl ${w.bg} ${w.color} flex items-center justify-center border ${w.border} shrink-0 group-hover:scale-110 transition-transform`}>
                                            <Target size={28} />
                                        </div>
                                        <div className="flex-1 space-y-3">
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-lg font-black text-white">{w.skill}</h4>
                                                <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${w.bg} ${w.color} border ${w.border}`}>
                                                    {w.priority}
                                                </span>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                                    <span>Mastery</span>
                                                    <span className={w.color}>{w.mastery}%</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${w.mastery}%` }}
                                                        transition={{ duration: 1, delay: i * 0.1 }}
                                                        className={`h-full ${w.barColor}`}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <ChevronRight className={`shrink-0 text-slate-600 transition-transform ${selectedWeakness?.id === w.id ? 'rotate-90' : ''}`} size={20} />
                                </div>

                                {/* 🔴 3. EXPANDED: AI TIP + RELATED TOPICS */}
                                <AnimatePresence>
                                    {selectedWeakness?.id === w.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="mt-8 pt-8 border-t border-white/5 space-y-6">
                                                <div className={`p-6 ${w.bg} rounded-2xl border ${w.border} space-y-3`}>
                                                    <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${w.color}`}>
                                                        <Zap size={14} /> AI Recovery Protocol
                                                    </div>
                                                    <p className="text-sm font-bold text-white leading-relaxed">
                                                        {w.tip}
                                                    </p>
                                                </div>
                                                <div className="flex flex-wrap gap-3">
                                                    {w.relatedTopics.map((topic, ti) => (
                                                        <span key={ti} className="px-4 py-2 bg-white/5 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest border border-white/5">
                                                            {topic}
                                                        </span>
                                                    ))}
                                                </div>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); navigate('/practice'); }}
                                                    className={`w-full h-14 rounded-2xl ${w.bg} border ${w.border} ${w.color} font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:opacity-80 transition-all`}
                                                >
                                                    Start Targeted Practice <ArrowRight size={16} />
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        ))}
                    </div>

                    {/* RIGHT: CHARTS */}
                    <div className="xl:col-span-5 space-y-8">

                        {/* Weak Zones Radar */}
                        <div className="glass-premium-blue p-8 rounded-[2.5rem] border-white/5 space-y-6">
                            <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                                <Activity size={16} className="text-rose-500" /> Vulnerability Radar
                            </h3>
                            <div className="h-[280px]">
                                <ReactApexChart options={radarOptions} series={radarSeries} type="radar" height="100%" />
                            </div>
                        </div>

                        {/* Mastery Bar */}
                        <div className="glass-premium-blue p-8 rounded-[2.5rem] border-white/5 space-y-6">
                            <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                                <TrendingUp size={16} className="text-[#6366F1]" /> Mastery Comparison
                            </h3>
                            <div className="h-[200px]">
                                <ReactApexChart options={barOptions} series={barSeries} type="bar" height="100%" />
                            </div>
                        </div>

                        {/* AI Coaching CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="glass-premium-blue p-8 rounded-[2.5rem] border-[#6366F1]/20 space-y-6"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-[#6366F1]/10 text-[#6366F1] flex items-center justify-center">
                                    <Brain size={28} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-black text-white">AI Coach Recommendation</h4>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Based on your gap analysis</p>
                                </div>
                            </div>
                            <p className="text-sm font-bold text-slate-300 leading-relaxed italic border-l-2 border-[#6366F1] pl-4">
                                "Your critical gap in System Design will block your FAANG interviews. Dedicate 45 minutes today to HLD exercises — it's your #1 ROI."
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => navigate('/ai-assistant')}
                                    className="h-12 rounded-2xl bg-[#6366F1]/10 border border-[#6366F1]/20 text-[#6366F1] font-black uppercase text-[9px] tracking-widest hover:bg-[#6366F1] hover:text-white transition-all"
                                >
                                    Ask AI Coach
                                </button>
                                <button
                                    onClick={() => navigate('/interview')}
                                    className="h-12 rounded-2xl bg-white text-[#0B0F1A] font-black uppercase text-[9px] tracking-widest hover:bg-white/90 transition-all shadow-lg"
                                >
                                    Quick Practice
                                </button>
                            </div>
                        </motion.div>

                        {/* Completion Banner */}
                        <div className="p-6 glass-premium-blue rounded-[2rem] border-[#10B981]/20 flex items-center gap-6">
                            <CheckCircle2 className="text-[#10B981] shrink-0" size={28} />
                            <div>
                                <h5 className="text-sm font-black text-white">Progress Tracking Active</h5>
                                <p className="text-[10px] text-slate-500 font-bold mt-0.5">2 weaknesses improved this week vs last week</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default WeaknessTrackerPage;
