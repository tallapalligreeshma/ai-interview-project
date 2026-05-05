import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
    Code, 
    Users, 
    Sparkles, 
    TrendingUp, 
    AlertTriangle,
    Activity,
    Target,
    Zap,
    Flame,
    Trophy,
    CheckCircle2,
    Search,
    UserCircle,
    Brain
} from "lucide-react";
import ReactApexChart from 'react-apexcharts';



const AiDashboard = () => {
    const navigate = useNavigate();

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                duration: 0.6, 
                staggerChildren: 0.1 
            }
        }
    };
    
    const itemVariants: any = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    // Chart Data
    const lineChartOptions: any = {
        chart: {
            type: 'line',
            toolbar: { show: false },
            background: 'transparent',
            animations: { enabled: true, easing: 'easeinout', speed: 1000 },
            dropShadow: { enabled: true, top: 5, left: 0, blur: 10, opacity: 0.2, color: '#22D3EE' }
        },
        stroke: { curve: 'smooth', width: 4 },
        colors: ['#22D3EE'],
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                gradientToColors: ['#8B5CF6'],
                shadeIntensity: 1,
                type: 'horizontal',
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100]
            },
        },
        xaxis: {
            categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            labels: { style: { colors: '#9CA3AF', fontWeight: 600 } },
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        yaxis: {
            labels: { style: { colors: '#9CA3AF', fontWeight: 600 } },
            min: 50,
            max: 100,
        },
        grid: { borderColor: 'rgba(255,255,255,0.03)', strokeDashArray: 5 },
        theme: { mode: 'dark' },
        tooltip: { theme: 'dark', y: { formatter: (val: number) => `${val}%` } }
    };

    const lineChartSeries = [{
        name: 'Weekly Improvement',
        data: [62, 65, 72, 70, 78, 85, 88]
    }];

    const radarChartOptions: any = {
        chart: { type: 'radar', toolbar: { show: false }, background: 'transparent' },
        stroke: { width: 2, colors: ['#8B5CF6'] },
        fill: { opacity: 0.3, colors: ['#8B5CF6'] },
        markers: { size: 4, colors: ['#fff'], strokeColors: '#8B5CF6', strokeWidth: 2 },
        yaxis: { show: false, min: 0, max: 100 },
        xaxis: {
            categories: ['Technical', 'Logic', 'Comms', 'Confidence', 'HR'],
            labels: { style: { colors: '#9CA3AF', fontSize: '10px', fontWeight: 800 } }
        },
        plotOptions: {
            radar: { polygons: { strokeColors: 'rgba(255,255,255,0.05)', connectorColors: 'rgba(255,255,255,0.05)' } }
        },
        theme: { mode: 'dark' }
    };

    const radarChartSeries = [{ name: 'Skill level', data: [80, 70, 90, 85, 95] }];

    return (
        <div className="flex-1 w-full min-h-screen bg-[#0B0F1A] text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
            {/* Ambient Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#6366F1]/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[700px] h-[700px] bg-[#8B5CF6]/10 rounded-full blur-[150px]" />
            </div>

            <main className="relative z-10 w-full p-4 md:p-6 space-y-12">
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-12">
                    
                    {/* SECTION 1: HEADER (Profile + Role + Search) */}
                    <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-center gap-8 bg-[#111827]/40 backdrop-blur-xl border border-white/5 p-8 rounded-[2.5rem]">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-[#6366F1] to-[#22D3EE] shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                                <div className="w-full h-full rounded-full bg-[#0B0F1A] flex items-center justify-center overflow-hidden">
                                    <UserCircle size={48} className="text-slate-500" />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-3xl font-black text-white tracking-tight">Greeshma Tallapalli</h1>
                                <p className="text-[#22D3EE] font-black uppercase text-[10px] tracking-widest mt-1">Software Engineer @ AI Training Round</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="relative flex-1 md:w-80">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input 
                                    type="text" 
                                    placeholder="Search modules, skills, or history..." 
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-[#6366F1]/50 focus:bg-white/10 transition-all font-medium text-sm"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* SECTION 2: SCORE CARDS ROW */}
                    <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Overall Readiness", value: "88%", icon: Target, color: "text-[#6366F1]", bg: "bg-[#6366F1]/10" },
                            { title: "Technical Score", value: "82%", icon: Code, color: "text-[#22D3EE]", bg: "bg-[#22D3EE]/10" },
                            { title: "Communication", value: "94%", icon: Users, color: "text-[#8B5CF6]", bg: "bg-[#8B5CF6]/10" },
                            { title: "Confidence Meter", value: "High", icon: Zap, color: "text-[#F59E0B]", bg: "bg-[#F59E0B]/10" }
                        ].map((card, i) => (
                            <div key={i} className="glass-premium-blue p-8 rounded-[2rem] border-white/5 hover:border-white/10 transition-all group relative overflow-hidden">
                                <div className="flex flex-col gap-6 relative z-10">
                                    <div className={`w-14 h-14 rounded-2xl ${card.bg} ${card.color} flex items-center justify-center border border-white/5 shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                                        <card.icon size={28} />
                                    </div>
                                    <div>
                                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{card.title}</h3>
                                        <div className="text-4xl font-black text-white mt-1 tracking-tighter">{card.value}</div>
                                    </div>
                                </div>
                                <div className={`absolute -bottom-10 -right-10 w-32 h-32 ${card.bg} blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity`} />
                            </div>
                        ))}
                    </motion.div>

                    {/* SECTION 3: ANALYTICS GRAPH SECTION */}
                    <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="glass-premium-blue p-10 rounded-[2.5rem] border-white/5 flex flex-col gap-8">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                                    <TrendingUp size={18} className="text-[#22D3EE]" /> Weekly Progress
                                </h3>
                                <div className="text-[10px] font-black text-[#10B981] bg-[#10B981]/10 px-3 py-1 rounded-lg">+12% vs last week</div>
                            </div>
                            <div className="h-[300px] w-full">
                                <ReactApexChart options={lineChartOptions} series={lineChartSeries} type="line" height="100%" />
                            </div>
                        </div>
                        <div className="glass-premium-blue p-10 rounded-[2.5rem] border-white/5 flex flex-col gap-8">
                            <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                                <Activity size={18} className="text-[#8B5CF6]" /> Skill Trend Graph
                            </h3>
                            <div className="h-[300px] w-full flex items-center justify-center">
                                <ReactApexChart options={radarChartOptions} series={radarChartSeries} type="radar" height="100%" />
                            </div>
                        </div>
                    </motion.div>

                    {/* SECTION 4: QUICK ACTIONS */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest px-2 flex items-center gap-2">
                            <Zap size={16} className="text-[#F59E0B]" /> Accelerated Modules
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {[
                                { title: "Start AI Interview", desc: "Full simulation engine", icon: Brain, color: "from-[#6366F1] to-[#8B5CF6]", link: "/interview" },
                                { title: "Coding Round", desc: "DSA & Logic focus", icon: Code, color: "from-[#22D3EE] to-[#3B82F6]", link: "/coding" },
                                { title: "HR Round", desc: "Behavioral analytics", icon: Users, color: "from-[#F59E0B] to-[#EF4444]", link: "/voice-interview" }
                            ].map((action, i) => (
                                <button 
                                    key={i} 
                                    onClick={() => navigate(action.link)}
                                    className="group relative overflow-hidden p-8 rounded-[2rem] bg-white/5 border border-white/5 hover:border-white/10 transition-all text-left"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                                    <div className="relative z-10 space-y-4">
                                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                                            <action.icon size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-black text-white tracking-tight">{action.title}</h4>
                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{action.desc}</p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* SECTION 5 & 6: AI INSIGHTS & WEAKNESS SNAPSHOT */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <motion.div variants={itemVariants} className="lg:col-span-2 glass-premium-blue p-10 rounded-[2.5rem] border-[#8B5CF6]/30 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#8B5CF6]/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <h3 className="text-xs font-black text-[#8B5CF6] mb-8 flex items-center gap-2 uppercase tracking-widest">
                                <Sparkles size={18} className="animate-pulse" /> Neural Insights Panel
                            </h3>
                            <div className="space-y-6 relative z-10">
                                {[
                                    { text: "“Improve React fundamentals today. Focus on useEffect dependencies.”", icon: CheckCircle2, sub: "Based on last coding round" },
                                    { text: "“Weak in recursion. Practice Tree traversals for 30 mins.”", icon: AlertTriangle, sub: "Critical bottleneck detected" },
                                    { text: "“Communication score peaked! Your STAR method is maturing.”", icon: Zap, sub: "Excellence streak" }
                                ].map((insight, i) => (
                                    <div key={i} className="flex gap-6 p-6 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all group/item">
                                        <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6] group-hover/item:scale-110 transition-transform">
                                            <insight.icon size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white leading-relaxed">{insight.text}</p>
                                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">{insight.sub}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="glass-premium-blue p-10 rounded-[2.5rem] border-[#EF4444]/20 relative overflow-hidden">
                            <h3 className="text-xs font-black text-[#EF4444] mb-8 flex items-center gap-2 uppercase tracking-widest">
                                <Activity size={18} /> Weakness Snapshot
                            </h3>
                            <div className="space-y-8">
                                {[
                                    { skill: "System Design", level: 60, color: "bg-[#EF4444]" },
                                    { skill: "Recursion", level: 55, color: "bg-[#EF4444]" },
                                    { skill: "Pipes & Cisterns", level: 68, color: "bg-[#F59E0B]" }
                                ].map((w, i) => (
                                    <div key={i} className="space-y-3">
                                        <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                                            <span className="text-white">{w.skill}</span>
                                            <span className="text-slate-500">{w.level}% Mastery</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                animate={{ width: `${w.level}%` }}
                                                transition={{ duration: 1, delay: i * 0.1 }}
                                                className={`h-full ${w.color} shadow-[0_0_10px_rgba(239,68,68,0.3)]`} 
                                            />
                                        </div>
                                    </div>
                                ))}
                                <button onClick={() => navigate('/practice')} className="w-full mt-4 py-4 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/20 text-[10px] font-black text-[#EF4444] uppercase tracking-widest hover:bg-[#EF4444] hover:text-white transition-all">
                                    Targeted Practice
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* SECTION 7: ACHIEVEMENTS + STREAKS */}
                    <motion.div variants={itemVariants} className="glass-premium-blue p-10 rounded-[3rem] border-white/5 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#F59E0B]/5 to-transparent pointer-events-none" />
                        <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 rounded-3xl bg-[#F59E0B]/20 flex items-center justify-center text-[#F59E0B] shadow-[0_0_30px_rgba(245,158,11,0.2)] group-hover:scale-110 transition-transform">
                                    <Flame size={40} className="animate-pulse" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-white tracking-tight">5 Day Streak</h3>
                                    <p className="text-slate-500 font-bold text-sm">You are in the top 5% of active learners!</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                {[Trophy, Zap, Target].map((Icon, i) => (
                                    <div key={i} className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-500 hover:text-[#F59E0B] hover:bg-white/10 transition-all cursor-pointer">
                                        <Icon size={24} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                </motion.div>
            </main>
        </div>
    );
};

export default AiDashboard;

