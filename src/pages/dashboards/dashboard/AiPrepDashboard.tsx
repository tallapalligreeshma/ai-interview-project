import { motion } from "framer-motion";
import { 
    Play, 
    Code, 
    Users, 
    MonitorPlay, 
    Sparkles, 
    TrendingUp, 
    AlertTriangle,
    Award,
    Clock,
    ChevronRight,
    BrainCircuit,
    Activity,
    Target,
    Zap,
    Flame,
    Trophy,
    CheckCircle2
} from "lucide-react";
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const AiPrepDashboard = () => {
    // Animation Variants
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

    // Chart Data
    const lineChartOptions: ApexOptions = {
        chart: {
            type: 'line',
            toolbar: { show: false },
            background: 'transparent',
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
            }
        },
        stroke: { curve: 'smooth', width: 3 },
        colors: ['#8B5CF6'], // Purple
        xaxis: {
            categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            labels: { style: { colors: '#94a3b8' } },
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        yaxis: {
            labels: { style: { colors: '#94a3b8' } },
            min: 50,
            max: 100,
        },
        grid: {
            borderColor: 'rgba(255,255,255,0.05)',
            strokeDashArray: 4,
        },
        theme: { mode: 'dark' },
        tooltip: {
            theme: 'dark',
            y: { formatter: (val) => `${val}%` }
        }
    };

    const lineChartSeries = [{
        name: 'Readiness Score',
        data: [65, 68, 74, 72, 80, 85, 88]
    }];

    const barChartOptions: ApexOptions = {
        chart: {
            type: 'bar',
            toolbar: { show: false },
            background: 'transparent',
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: false,
                columnWidth: '50%',
            }
        },
        dataLabels: { enabled: false },
        colors: ['#22D3EE'], // Cyan
        xaxis: {
            categories: ['DSA', 'System Design', 'React', 'Node.js', 'HR'],
            labels: { style: { colors: '#94a3b8' } },
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        yaxis: {
            labels: { style: { colors: '#94a3b8' } },
            max: 100,
        },
        grid: {
            borderColor: 'rgba(255,255,255,0.05)',
            strokeDashArray: 4,
        },
        theme: { mode: 'dark' },
        tooltip: {
            theme: 'dark',
        }
    };

    const barChartSeries = [{
        name: 'Skill Level',
        data: [75, 60, 90, 85, 95]
    }];

    return (
        <div className="flex-1 w-full min-h-screen bg-[#0B0F1A] text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden page-fade-in">
            {/* Background Ambient Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#6366F1]/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[700px] h-[700px] bg-[#8B5CF6]/10 rounded-full blur-[150px]" />
            </div>

            <main className="relative z-10 w-full pb-20 p-6 lg:p-10">
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full space-y-10"
                >
                    {/* Welcome Section */}
                    <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8">
                        <div>
                            <h1 className="text-4xl font-black text-white tracking-tighter italic">
                                Ready for <span className="text-gradient-cyan">Your Next Big Move?</span>
                            </h1>
                            <p className="text-slate-400 mt-2 font-medium">
                                AI is analyzing your growth trajectory. You're <span className="text-white font-bold">12% closer</span> to your dream role today.
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Button className="rounded-xl glass-premium-blue border-white/10 text-white font-bold px-8 h-12 hover:bg-[#6366F1]/20 smooth-transition">
                                View Roadmap
                            </Button>
                            <Button className="rounded-xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-black uppercase tracking-wider px-8 h-12 shadow-lg shadow-indigo-500/25 hover:scale-105 smooth-transition">
                                Start Daily Task
                            </Button>
                        </div>
                    </motion.div>

                    {/* A. HERO METRIC CARDS */}
                    <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Overall Readiness", value: "88%", icon: Target, color: "text-[#6366F1]", bg: "bg-[#6366F1]/10", border: "border-[#6366F1]/30" },
                            { title: "Technical Skill", value: "82%", icon: Code, color: "text-[#22D3EE]", bg: "bg-[#22D3EE]/10", border: "border-[#22D3EE]/30" },
                            { title: "Communication", value: "95%", icon: Users, color: "text-[#8B5CF6]", bg: "bg-[#8B5CF6]/10", border: "border-[#8B5CF6]/30" },
                            { title: "Confidence Level", value: "High", icon: Zap, color: "text-[#F59E0B]", bg: "bg-[#F59E0B]/10", border: "border-[#F59E0B]/30" }
                        ].map((metric, i) => (
                            <div key={i} className="group glass-premium-blue p-8 rounded-[2rem] border-white/5 hover:border-[#6366F1]/40 transform hover:-translate-y-2 smooth-transition cursor-default overflow-hidden relative">
                                <div className={`absolute -bottom-10 -right-10 w-32 h-32 ${metric.bg} blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                                <div className="flex flex-col gap-6 relative z-10">
                                    <div className={`w-14 h-14 rounded-2xl ${metric.bg} ${metric.color} flex items-center justify-center border ${metric.border} group-hover:scale-110 smooth-transition shadow-inner`}>
                                        <metric.icon size={28} />
                                    </div>
                                    <div>
                                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{metric.title}</h3>
                                        <div className="text-4xl font-black text-white mt-1 tracking-tight group-hover:text-gradient-cyan smooth-transition">{metric.value}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* B. PERFORMANCE ANALYTICS SECTION */}
                        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="p-8 rounded-[2rem] glass-premium-blue border-white/5 relative group hover:border-[#6366F1]/30 smooth-transition overflow-hidden">
                                    <h3 className="text-xs font-black text-white mb-6 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Activity size={18} className="text-[#6366F1]" /> Readiness Growth
                                    </h3>
                                    <div className="h-[280px] w-full">
                                        <ReactApexChart options={lineChartOptions} series={lineChartSeries} type="line" height="100%" />
                                    </div>
                                </div>
                                <div className="p-8 rounded-[2rem] glass-premium-blue border-white/5 relative group hover:border-[#6366F1]/30 smooth-transition overflow-hidden">
                                    <h3 className="text-xs font-black text-white mb-6 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Trophy size={18} className="text-[#22D3EE]" /> Domain Analysis
                                    </h3>
                                    <div className="h-[280px] w-full">
                                        <ReactApexChart options={barChartOptions} series={barChartSeries} type="bar" height="100%" />
                                    </div>
                                </div>
                            </div>

                            {/* C. QUICK ACTION PANEL */}
                            <div className="p-8 rounded-[2rem] glass-premium-blue border-white/5 shadow-2xl relative overflow-hidden group">
                                <h3 className="text-xs font-black text-white mb-8 uppercase tracking-[0.2em]">Prep Accelerators</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                                    {[
                                        { title: "AI Interview", icon: BrainCircuit, gradient: "from-[#6366F1] to-[#8B5CF6]" },
                                        { title: "Coding Lab", icon: Code, gradient: "from-[#22D3EE] to-[#3B82F6]" },
                                        { title: "Behavioral", icon: Users, gradient: "from-[#8B5CF6] to-[#D946EF]" },
                                        { title: "Mock Engine", icon: MonitorPlay, gradient: "from-[#F59E0B] to-[#EF4444]" }
                                    ].map((action, i) => (
                                        <button key={i} className={`p-6 rounded-[1.5rem] bg-gradient-to-br ${action.gradient} border border-white/10 shadow-lg hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] hover:-translate-y-2 smooth-transition flex flex-col items-center justify-center gap-4 group text-white relative overflow-hidden`}>
                                            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 smooth-transition" />
                                            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:scale-110 smooth-transition">
                                                <action.icon size={28} className="drop-shadow-md" />
                                            </div>
                                            <span className="text-[11px] font-black uppercase tracking-widest text-center leading-tight">{action.title}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* E. WEAKNESS DETECTION PANEL */}
                                <div className="p-8 rounded-[2rem] glass-premium-blue border-[#EF4444]/20 relative overflow-hidden group hover:border-[#EF4444]/40 smooth-transition">
                                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#EF4444]/10 blur-[60px] rounded-full opacity-30 group-hover:opacity-100 smooth-transition" />
                                    <h3 className="text-xs font-black text-[#EF4444] mb-8 flex items-center gap-2 uppercase tracking-[0.2em]">
                                        <AlertTriangle size={20} /> Skill Gaps Identified
                                    </h3>
                                    <div className="space-y-6 relative z-10">
                                        {[
                                            { skill: "System Design", level: 60, freq: "High" },
                                            { skill: "Dynamic Programming", level: 65, freq: "Medium" },
                                            { skill: "Behavioral (STAR)", level: 70, freq: "Low" }
                                        ].map((item, i) => (
                                            <div key={i} className="space-y-3">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-white font-bold">{item.skill}</span>
                                                    <span className="text-[#EF4444] text-[9px] font-black uppercase px-2.5 py-1 bg-[#EF4444]/10 rounded-lg border border-[#EF4444]/30">{item.freq} Impact</span>
                                                </div>
                                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-[1px]">
                                                    <div className="h-full bg-gradient-to-r from-[#EF4444] to-[#F43F5E] rounded-full shadow-[0_0_10px_rgba(239,68,68,0.4)]" style={{ width: `${item.level}%` }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* F. INTERVIEW ROTATION STATUS */}
                                <div className="p-8 rounded-[2rem] glass-premium-blue border-white/5 relative group hover:border-[#6366F1]/30 smooth-transition">
                                    <h3 className="text-xs font-black text-white mb-8 uppercase tracking-[0.2em]">Current Rotation</h3>
                                    <div className="flex items-center justify-between p-5 bg-white/[0.03] rounded-2xl border border-white/5 shadow-inner">
                                        <div>
                                            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black mb-2">Simulating</p>
                                            <p className="text-xl font-bold text-white flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-[#6366F1]/20 flex items-center justify-center">
                                                    <Code size={20} className="text-[#6366F1]" />
                                                </div>
                                                Technical Round
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black mb-2">Intensity</p>
                                            <div className="flex items-center gap-1.5 justify-end">
                                                <div className="w-2.5 h-6 bg-[#6366F1] rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                                                <div className="w-2.5 h-6 bg-[#6366F1] rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                                                <div className="w-2.5 h-6 bg-white/10 rounded-full" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-8 flex items-center justify-between text-xs">
                                        <span className="text-slate-500 font-bold uppercase tracking-widest">Queue Status</span>
                                        <span className="text-[#8B5CF6] font-black uppercase tracking-widest flex items-center gap-2">
                                            <Users size={16} /> HR behavioral next
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column */}
                        <motion.div variants={itemVariants} className="space-y-8">
                            {/* D. AI INSIGHTS PANEL */}
                            <div className="p-8 rounded-[2rem] glass-premium-blue border-[#6366F1]/30 relative overflow-hidden group shadow-[0_0_40px_rgba(99,102,241,0.1)]">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-[#6366F1]/10 blur-[70px] rounded-full smooth-transition group-hover:bg-[#6366F1]/20" />
                                <h3 className="text-xs font-black text-[#6366F1] mb-8 flex items-center gap-2 uppercase tracking-[0.2em]">
                                    <Sparkles size={20} className="animate-pulse" /> Live Coaching
                                </h3>
                                <div className="space-y-5">
                                    {[
                                        "Improve React fundamentals today. Focus on useEffect dependencies.",
                                        "Your communication score is improving! Keep up the structured answers.",
                                        "Focus on recursion practice. We noticed a slight delay in your last test."
                                    ].map((insight, i) => (
                                        <div key={i} className="flex gap-4 p-5 bg-white/[0.03] rounded-2xl border border-white/5 hover:bg-white/[0.08] smooth-transition group/item">
                                            <div className="w-10 h-10 rounded-xl bg-[#6366F1]/20 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:scale-110 smooth-transition shadow-inner">
                                                <BrainCircuit size={18} className="text-[#6366F1]" />
                                            </div>
                                            <p className="text-sm text-slate-300 leading-relaxed font-medium">{insight}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* G. ACHIEVEMENTS PANEL */}
                            <div className="p-8 rounded-[2rem] glass-premium-blue border-white/5 relative group overflow-hidden hover:border-[#F59E0B]/30 smooth-transition">
                                <h3 className="text-xs font-black text-white mb-8 flex items-center justify-between uppercase tracking-[0.2em]">
                                    <span>Trophies</span>
                                    <span className="text-[10px] font-black text-[#F59E0B] bg-[#F59E0B]/10 px-3 py-1.5 rounded-xl border border-[#F59E0B]/30 flex items-center gap-2 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                                        <Flame size={14} className="animate-pulse" /> 5 Day Streak
                                    </span>
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { title: "Fast Learner", icon: Zap, color: "text-[#F59E0B]", bg: "bg-[#F59E0B]/10" },
                                        { title: "High Pressure", icon: Target, color: "text-[#EF4444]", bg: "bg-[#EF4444]/10" },
                                        { title: "Consistent", icon: Activity, color: "text-[#10B981]", bg: "bg-[#10B981]/10" },
                                        { title: "Top 10%", icon: Trophy, color: "text-[#8B5CF6]", bg: "bg-[#8B5CF6]/10" }
                                    ].map((badge, i) => (
                                        <div key={i} className="p-5 bg-white/5 rounded-[1.5rem] border border-white/5 flex flex-col items-center justify-center text-center gap-3 hover:bg-white/10 smooth-transition group/badge">
                                            <div className={`w-14 h-14 rounded-full ${badge.bg} ${badge.color} flex items-center justify-center group-hover/badge:scale-110 group-hover/badge:shadow-[0_0_20px_currentColor] smooth-transition shadow-inner`}>
                                                <badge.icon size={26} />
                                            </div>
                                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover/badge:text-white smooth-transition">{badge.title}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* H. RECENT INTERVIEW HISTORY */}
                            <div className="p-8 rounded-[2rem] glass-premium-blue border-white/5 hover:border-[#6366F1]/30 smooth-transition">
                                <h3 className="text-xs font-black text-white mb-8 uppercase tracking-[0.2em]">Simulation History</h3>
                                <div className="space-y-4">
                                    {[
                                        { type: "Technical Mock", score: 85, time: "2 hours ago", status: "good", color: "text-[#10B981]" },
                                        { type: "HR Behavioral", score: 92, time: "Yesterday", status: "excellent", color: "text-[#6366F1]" },
                                        { type: "System Design", score: 68, time: "3 days ago", status: "needs_work", color: "text-[#F59E0B]" }
                                    ].map((history, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-white/[0.03] rounded-2xl border border-white/5 group hover:bg-white/[0.08] smooth-transition cursor-pointer">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-[#6366F1]/20 smooth-transition shadow-inner">
                                                    <Clock size={18} className="text-slate-400 group-hover:text-white smooth-transition" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-white group-hover:text-[#22D3EE] smooth-transition">{history.type}</p>
                                                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{history.time}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className={`text-lg font-black ${history.color} drop-shadow-sm`}>
                                                    {history.score}%
                                                </span>
                                                <ChevronRight size={18} className="text-slate-600 group-hover:text-white smooth-transition" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full mt-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#6366F1] hover:text-white hover:bg-[#6366F1] smooth-transition rounded-2xl border border-[#6366F1]/30 bg-[#6366F1]/10">
                                    Full Performance Analysis
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default AiPrepDashboard;
