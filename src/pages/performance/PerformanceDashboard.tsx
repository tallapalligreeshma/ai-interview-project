import Chart from "react-apexcharts";
import { motion } from "framer-motion";
import { 
    TrendingUp, 
    Award, 
    Clock, 
    Target, 
    ArrowUpRight, 
    History,
    Filter,
    Download,
    Activity,
    Brain,
    Zap,
    ChevronRight,
    RefreshCw
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Breadcrumb from "@/layouts/Breadcrumb";
import { aiService } from "@/lib/AiService";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const PerformanceDashboard = () => {
    // Chart Config: Score Trend
    const lineChartOptions: any = {
        chart: {
            fontFamily: 'inherit',
            toolbar: { show: false },
            zoom: { enabled: false },
            background: 'transparent',
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
            }
        },
        theme: { mode: 'dark' },
        colors: ['#6366F1'],
        stroke: { curve: 'smooth', width: 4, lineCap: 'round' },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.4,
                opacityTo: 0.05,
                stops: [0, 90, 100]
            }
        },
        xaxis: {
            categories: ['Session 1', 'Session 2', 'Session 3', 'Session 4', 'Session 5', 'Session 6', 'Session 7'],
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { style: { colors: '#94a3b8', fontWeight: 600, fontSize: '10px' } }
        },
        yaxis: {
            labels: { style: { colors: '#94a3b8', fontWeight: 600, fontSize: '10px' } }
        },
        grid: {
            borderColor: 'rgba(255,255,255,0.05)',
            strokeDashArray: 4,
            padding: { left: 20, right: 20 }
        },
        tooltip: { 
            theme: 'dark',
            style: { fontSize: '12px', fontFamily: 'inherit' },
            y: { formatter: (val: number) => `${val}% Intelligence` }
        },
        markers: {
            size: 6,
            colors: ['#6366F1'],
            strokeColors: '#0B0F1A',
            strokeWidth: 3,
            hover: { size: 8 }
        }
    };

    const lineChartSeries = [{
        name: 'Neural Quality',
        data: [65, 72, 68, 85, 82, 90, 88]
    }];

    // Chart Config: Skills Radar
    const radarChartOptions: any = {
        chart: {
            fontFamily: 'inherit',
            toolbar: { show: false },
            background: 'transparent'
        },
        theme: { mode: 'dark' },
        colors: ['#22D3EE'],
        xaxis: {
            categories: ['Technical', 'Comm.', 'Logic', 'Behavioral', 'Velocity'],
            labels: { style: { colors: '#94a3b8', fontWeight: 900, fontSize: '10px' } }
        },
        yaxis: { show: false },
        stroke: { width: 3, colors: ['#22D3EE'] },
        fill: { opacity: 0.2, colors: ['#22D3EE'] },
        markers: { size: 4, colors: ['#22D3EE'], strokeWidth: 2, strokeColors: '#0B0F1A' },
        grid: { show: false },
        plotOptions: {
            radar: {
                polygons: {
                    strokeColors: 'rgba(255,255,255,0.05)',
                    fill: { colors: ['transparent'] }
                }
            }
        }
    };

    const radarChartSeries = [{
        name: 'Skill Amplitude',
        data: [90, 75, 85, 70, 80]
    }];

    const history = [
        { role: 'Java Architect', date: 'Apr 24, 2026', score: 88, status: 'Elite' },
        { role: 'Frontend Lead', date: 'Apr 20, 2026', score: 92, status: 'Legendary' },
        { role: 'System Design', date: 'Apr 15, 2026', score: 75, status: 'Advanced' },
        { role: 'HR Behavioral', date: 'Apr 12, 2026', score: 85, status: 'Elite' },
    ];

    const stats = [
        { label: 'Avg IQ Score', value: '82%', icon: Award, color: 'text-[#6366F1]', bg: 'bg-[#6366F1]/10', border: 'border-[#6366F1]/20' },
        { label: 'Total Syncs', value: '24', icon: Target, color: 'text-[#22D3EE]', bg: 'bg-[#22D3EE]/10', border: 'border-[#22D3EE]/20' },
        { label: 'Neural Hours', value: '18.5', icon: Clock, color: 'text-[#8B5CF6]', bg: 'bg-[#8B5CF6]/10', border: 'border-[#8B5CF6]/20' },
        { label: 'Evolution Rate', value: '+12.5%', icon: TrendingUp, color: 'text-[#F59E0B]', bg: 'bg-[#F59E0B]/10', border: 'border-[#F59E0B]/20' },
    ];

    const [aiAnalysis, setAiAnalysis] = useState<any>(null);
    const [isLoadingAi, setIsLoadingAi] = useState(true);

    useEffect(() => {
        const fetchAiPerformance = async () => {
            try {
                const data = await aiService.generateModuleResponse("performance", {
                    scores: [65, 72, 68, 85, 82, 90, 88],
                    history: history
                });
                setAiAnalysis(data);
            } catch (error) {
                console.error("AI Performance Error:", error);
            } finally {
                setIsLoadingAi(false);
            }
        };
        fetchAiPerformance();
    }, []);

    return (
        <div className="flex-1 w-full min-h-screen bg-[#0B0F1A] text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden page-fade-in p-4 md:p-6">
            {/* Background Ambient Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#6366F1]/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[700px] h-[700px] bg-[#8B5CF6]/10 rounded-full blur-[150px]" />
            </div>

            <div className="relative z-10 w-full space-y-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/5 pb-10">
                    <div className="space-y-4">
                        <Breadcrumb title="Neural Analytics" text="Intelligence Platform" />
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter italic uppercase">
                            Performance <span className="text-gradient-cyan">Diagnostics</span>
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                         <Button variant="outline" className="h-12 px-6 rounded-xl glass-premium-blue border-white/5 font-black uppercase text-[10px] tracking-widest gap-2 hover:bg-white/10 transition-all">
                            <Download size={14} /> Export Intel
                        </Button>
                        <Button className="h-12 px-8 rounded-xl bg-[#6366F1] text-white font-black uppercase text-[10px] tracking-widest shadow-[0_10px_20px_rgba(99,102,241,0.2)] hover:scale-105 transition-all">
                            Refresh Stream
                        </Button>
                    </div>
                </div>
                
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="group glass-premium-blue p-8 rounded-[2.5rem] border-white/5 hover:border-[#6366F1]/40 transform hover:-translate-y-2 smooth-transition cursor-default overflow-hidden relative shadow-2xl">
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#6366F1]/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="flex flex-col gap-6 relative z-10">
                                <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center border ${stat.border} group-hover:scale-110 smooth-transition shadow-inner`}>
                                    <stat.icon size={28} />
                                </div>
                                <div>
                                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{stat.label}</h3>
                                    <div className="text-4xl font-black text-white mt-1 tracking-tighter italic group-hover:text-gradient-cyan smooth-transition">{stat.value}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <Card className="lg:col-span-8 glass-premium-blue border-white/5 rounded-[3rem] shadow-4xl overflow-hidden flex flex-col p-2">
                        <div className="p-8 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-[#6366F1]/10 flex items-center justify-center border border-[#6366F1]/20">
                                    <Activity size={20} className="text-[#6366F1]" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-white uppercase tracking-widest italic">Neural Growth Vector</h3>
                                    <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-widest">Temporal Intelligence Evolution</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" className="text-slate-600 hover:text-white"><Filter size={20}/></Button>
                        </div>
                        <div className="flex-1 p-6 min-h-[400px]">
                            <Chart 
                                options={lineChartOptions} 
                                series={lineChartSeries} 
                                type="area" 
                                height="100%" 
                            />
                        </div>
                    </Card>

                    <Card className="lg:col-span-4 glass-premium-blue border-white/5 rounded-[3rem] shadow-4xl overflow-hidden flex flex-col p-2">
                        <div className="p-8 border-b border-white/5 flex items-center gap-4">
                             <div className="w-10 h-10 rounded-xl bg-[#22D3EE]/10 flex items-center justify-center border border-[#22D3EE]/20">
                                <Target size={20} className="text-[#22D3EE]" />
                            </div>
                            <div>
                                <h3 className="text-sm font-black text-white uppercase tracking-widest italic">Skill Amplitude</h3>
                                <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-widest">Multi-dimensional Scan</p>
                            </div>
                        </div>
                        <div className="flex-1 p-8 flex items-center justify-center min-h-[400px]">
                            <Chart 
                                options={radarChartOptions} 
                                series={radarChartSeries} 
                                type="radar" 
                                height="100%" 
                                width="100%"
                            />
                        </div>
                    </Card>
                </div>

                {/* Strengths & Weaknesses */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <Card className="glass-premium-blue border-white/5 rounded-[3rem] shadow-4xl overflow-hidden p-2">
                        <div className="p-8 border-b border-white/5 bg-[#10B981]/5 flex items-center gap-4">
                             <div className="w-10 h-10 rounded-xl bg-[#10B981]/10 flex items-center justify-center border border-[#10B981]/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                                <Award size={20} className="text-[#10B981]" />
                             </div>
                             <h3 className="text-sm font-black text-white uppercase tracking-widest italic">AI Verified Strengths</h3>
                        </div>
                        <CardContent className="p-8 space-y-6">
                            {(aiAnalysis?.strengths || [
                                "Elite System Architecture Logic",
                                "High-Velocity Communication Flow",
                                "Structured Technical Extraction"
                            ]).map((item: string, idx: number) => (
                                <div key={idx} className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/[0.05] smooth-transition group">
                                    <div className="flex items-center gap-6">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-black text-xs border border-emerald-500/20 group-hover:scale-110 smooth-transition">
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <p className="font-bold text-white text-base tracking-tight italic">"{item}"</p>
                                            <p className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.2em] mt-1">Verified Trace</p>
                                        </div>
                                    </div>
                                    <Badge className="bg-emerald-500/10 text-emerald-500 border-none font-black text-[9px] px-3 py-1 animate-pulse">ACTIVE</Badge>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="glass-premium-blue border-white/5 rounded-[3rem] shadow-4xl overflow-hidden p-2">
                        <div className="p-8 border-b border-white/5 bg-[#EF4444]/5 flex items-center gap-4">
                             <div className="w-10 h-10 rounded-xl bg-[#EF4444]/10 flex items-center justify-center border border-[#EF4444]/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                                <TrendingUp className="rotate-180 text-[#EF4444]" size={20} />
                             </div>
                             <h3 className="text-sm font-black text-white uppercase tracking-widest italic">Diagnostic Gaps</h3>
                        </div>
                        <CardContent className="p-8 space-y-6">
                            {(aiAnalysis?.weakAreas || [
                                { skill: "Dynamic Logic", reason: "Focus on recursive optimization patterns." },
                                { skill: "Cloud Scale", reason: "Load balancing vectors need synchronization." }
                            ]).map((item: any, idx: number) => (
                                <div key={idx} className="flex items-center justify-between p-6 bg-[#EF4444]/5 border border-[#EF4444]/10 rounded-3xl group hover:bg-[#EF4444]/10 smooth-transition">
                                    <div className="space-y-1">
                                        <p className="font-bold text-rose-400 text-base tracking-tight italic">{item.skill}</p>
                                        <p className="text-[11px] font-medium text-slate-400 leading-relaxed italic pr-10">"{item.reason}"</p>
                                    </div>
                                    <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500 border border-rose-500/20 group-hover:scale-110 smooth-transition">
                                         <Target size={22} />
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* 3-Day Improvement Plan */}
                {aiAnalysis && (
                    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="w-full">
                        <div className="glass-premium-blue text-white rounded-[4rem] p-12 lg:p-16 overflow-hidden relative shadow-4xl border border-white/5 group">
                            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#6366F1]/10 blur-[150px] -mr-64 -mt-64" />
                            <div className="relative z-10 flex flex-col lg:flex-row gap-16 items-start">
                                <div className="space-y-6 max-w-sm">
                                    <div className="w-16 h-16 rounded-3xl bg-[#6366F1]/20 flex items-center justify-center border border-[#6366F1]/30">
                                        <Brain size={32} className="text-[#6366F1]" />
                                    </div>
                                    <div className="space-y-2">
                                        <Badge className="bg-[#6366F1]/20 text-[#22D3EE] border-none font-black text-[10px] uppercase tracking-[0.3em] px-5 py-2 rounded-full">Neural Recovery</Badge>
                                        <h3 className="text-4xl font-black tracking-tighter leading-none italic uppercase">3-Day Sync <br/> <span className="text-gradient-cyan">Blueprint</span></h3>
                                    </div>
                                    <p className="text-sm font-bold text-slate-500 leading-relaxed italic">
                                        "Follow this automated roadmap to bridge verified skill gaps before your next neural session."
                                    </p>
                                    <Button className="w-full h-14 rounded-2xl bg-white text-slate-950 font-black uppercase text-[10px] tracking-widest hover:bg-[#6366F1] hover:text-white smooth-transition">
                                        Activate Daily Plan
                                    </Button>
                                </div>
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                                    {aiAnalysis.improvementPlan_3Day?.map((plan: string, i: number) => (
                                        <div key={i} className="p-10 bg-white/[0.02] border border-white/5 rounded-[3rem] space-y-8 hover:bg-white/[0.06] smooth-transition group/card shadow-inner">
                                            <div className="flex items-center justify-between">
                                                <div className="w-12 h-12 rounded-2xl bg-[#6366F1] text-white flex items-center justify-center font-black text-xs shadow-lg shadow-primary/30 group-hover/card:scale-110 smooth-transition italic">
                                                    D_0{i+1}
                                                </div>
                                                <Zap size={18} className="text-[#22D3EE] opacity-30 group-hover/card:opacity-100 smooth-transition" />
                                            </div>
                                            <p className="text-base font-bold text-slate-300 leading-relaxed italic tracking-tight group-hover/card:text-white smooth-transition">
                                                "{plan}"
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* History and detailed table */}
                <Card className="glass-premium-blue border-white/5 rounded-[3.5rem] shadow-4xl overflow-hidden p-2">
                    <div className="p-10 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/[0.01]">
                        <div className="flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-[#6366F1]/10 flex items-center justify-center border border-[#6366F1]/20">
                                <History className="text-[#6366F1]" size={28} />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-xl font-black text-white uppercase tracking-tighter italic">Neural History</h3>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Chronological Session Archive</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="relative group hidden md:block">
                                <Filter size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-[#6366F1] smooth-transition" />
                                <input placeholder="Filter roles..." className="h-12 pl-12 pr-6 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-bold text-white focus:outline-none focus:border-[#6366F1]/50 smooth-transition w-64" />
                            </div>
                            <Button variant="outline" className="h-12 px-6 rounded-xl border-white/10 glass-premium-blue font-black uppercase tracking-widest text-[10px] gap-3 text-slate-400 hover:text-white">
                                <Download size={14} /> Full Report
                            </Button>
                        </div>
                    </div>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto scrollbar-thin">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white/[0.01] border-b border-white/5">
                                        <th className="px-10 py-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Neural Vector</th>
                                        <th className="px-10 py-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Sync Timestamp</th>
                                        <th className="px-10 py-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Diagnostic Score</th>
                                        <th className="px-10 py-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Rank Status</th>
                                        <th className="px-10 py-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Operation</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {history.map((item, idx) => (
                                        <tr key={idx} className="group hover:bg-white/[0.03] transition-all duration-300">
                                            <td className="px-10 py-8">
                                                <div className="font-black text-white text-lg italic tracking-tight group-hover:text-[#22D3EE] smooth-transition uppercase">{item.role}</div>
                                            </td>
                                            <td className="px-10 py-8">
                                                <div className="font-bold text-slate-500 text-xs uppercase tracking-widest">{item.date}</div>
                                            </td>
                                            <td className="px-10 py-8">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-32 h-2.5 bg-white/5 rounded-full overflow-hidden p-[2px] shadow-inner">
                                                        <motion.div 
                                                            initial={{ width: 0 }}
                                                            whileInView={{ width: `${item.score}%` }}
                                                            transition={{ duration: 1.5, ease: "circOut" }}
                                                            className="h-full bg-gradient-to-r from-[#6366F1] to-[#22D3EE] rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]" 
                                                        />
                                                    </div>
                                                    <span className="font-black text-white text-sm italic">{item.score}%</span>
                                                </div>
                                            </td>
                                            <td className="px-10 py-8">
                                                <Badge className="bg-[#6366F1]/10 text-[#6366F1] border-none font-black uppercase tracking-[0.2em] text-[9px] px-4 py-2 rounded-lg italic">
                                                    {item.status}
                                                </Badge>
                                            </td>
                                            <td className="px-10 py-8">
                                                <Button variant="ghost" className="text-slate-600 hover:text-white transition-all font-black uppercase tracking-widest text-[10px] p-0 flex items-center gap-2 group/btn">
                                                    Diagnostic Detail <ChevronRight size={14} className="group-hover/btn:translate-x-1 smooth-transition" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
                
                {/* Bottom CTA */}
                <div className="pt-10 pb-20 flex justify-center">
                    <Button onClick={() => navigate('/interview')} className="h-20 px-16 rounded-[2.5rem] bg-white text-slate-950 font-black uppercase tracking-[0.3em] text-sm hover:bg-[#6366F1] hover:text-white shadow-4xl smooth-transition gap-4">
                        <RefreshCw size={24} /> Initialize New Neural Sync
                    </Button>
                </div>
            </div>
            
            <style>{`
                .page-fade-in { animation: fadeIn 0.8s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                .text-gradient-cyan {
                    background: linear-gradient(to right, #6366F1, #22D3EE);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            `}</style>
        </div>
    );
};

export default PerformanceDashboard;
