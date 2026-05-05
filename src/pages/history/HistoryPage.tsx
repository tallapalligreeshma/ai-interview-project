import { 
    History, Filter, Download, 
    ChevronRight, Zap, Code2, Layout, 
    Shield, BarChart,
    Sparkles,
    Target,
    Activity,
    Award,
    Brain,
    Crown,
    ArrowRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const HistoryPage = () => {
    const navigate = useNavigate();
    const [filterType, setFilterType] = useState("Filter by Category");
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const historyData = [
        { 
            id: '1', 
            role: "Java Full Stack Developer", 
            date: "APR 18, 2024", 
            score: 88, 
            type: "TECHNICAL SIMULATION", 
            status: "HIRE-READY CANDIDATE", 
            icon: Code2,
            insight: "Excellent grasp of Spring Boot and SQL optimization. Focus on sharpening System Design (HLD/LLD) to reach Architect level.",
            tag: "HIGH PERFORMANCE RATING",
            color: "text-emerald-400",
            glow: "bg-emerald-500/20"
        },
        { 
            id: '2', 
            role: "Senior Frontend Engineer", 
            date: "APR 15, 2024", 
            score: 92, 
            type: "CODING ASSESSMENT", 
            status: "HIRE-READY CANDIDATE", 
            icon: Layout,
            insight: "Perfect solution for the Dynamic Programming problem. Communication was clear and structured.",
            tag: "ELITE-LEVEL PERFORMANCE",
            color: "text-[#22D3EE]",
            glow: "bg-[#22D3EE]/20"
        },
        { 
            id: '3', 
            role: "Backend Intern", 
            date: "APR 14, 2024", 
            score: 45, 
            type: "HR SCREENING", 
            status: "NOT INTERVIEW READY", 
            icon: Shield,
            insight: "Need to improve 'Tell me about yourself' structure. Technical fundamentals in OOPS are currently weak.",
            tag: "PERFORMANCE REVIEW REQUIRED",
            color: "text-rose-400",
            glow: "bg-rose-500/20"
        },
        { 
            id: '4', 
            role: "Data Analyst", 
            date: "APR 12, 2024", 
            score: 75, 
            type: "APTITUDE SIMULATION", 
            status: "POTENTIAL HIRE", 
            icon: BarChart,
            insight: "Analytical skills are strong, but speed could be improved. Practice 15-minute time-boxed aptitude tests.",
            tag: "STABLE PERFORMANCE LEVEL",
            color: "text-amber-400",
            glow: "bg-amber-500/20"
        }
    ];

    const filteredData = filterType === "Filter by Category" 
        ? historyData 
        : historyData.filter(d => d.type.includes(filterType.toUpperCase()));

    const filterOptions = ["Filter by Category", "Technical", "Coding", "HR", "Aptitude"];

    return (
        <div className="flex-1 w-full min-h-screen bg-[#0B0F1A] text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden page-fade-in p-6 lg:p-10">
            {/* Background Ambient Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#6366F1]/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[700px] h-[700px] bg-[#8B5CF6]/10 rounded-full blur-[150px]" />
            </div>

            <div className="relative z-10 w-full space-y-12">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 border-b border-white/5 pb-10">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl glass-premium-blue flex items-center justify-center text-[#6366F1] shadow-xl border border-white/5">
                                <History size={20} />
                            </div>
                            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">
                                Intelligence Bank
                            </p>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic uppercase">
                            Performance <span className="text-gradient-cyan">Logs</span>
                        </h1>
                        <p className="text-slate-500 font-medium max-w-2xl text-sm lg:text-base leading-relaxed">
                            Analyze your past AI-powered interview diagnostics. Review feedback, track weaknesses, and monitor your improvement over time.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 glass-premium-blue p-2 rounded-[1.5rem] border border-white/5 shadow-2xl">
                        <div className="px-6 flex items-center gap-4 border-r border-white/5">
                            <Filter size={16} className="text-[#6366F1]" />
                            <select 
                                className="bg-transparent border-none focus:ring-0 text-[10px] font-black uppercase tracking-widest text-slate-300 cursor-pointer py-3 outline-none min-w-[180px]"
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                            >
                                {filterOptions.map(opt => <option key={opt} value={opt} className="bg-[#111827] text-white">{opt}</option>)}
                            </select>
                        </div>
                        <Button variant="ghost" className="h-12 px-6 rounded-xl font-black uppercase tracking-widest text-[9px] gap-3 text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                            <Download size={16} /> Export Intelligence
                        </Button>
                    </div>
                </div>

                {/* History Feed */}
                <div className="grid grid-cols-1 gap-6">
                    {filteredData.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Card className={cn(
                                "group relative overflow-hidden transition-all duration-500 rounded-[2.5rem] border-white/5 glass-premium-blue hover:border-white/10 shadow-2xl",
                                selectedId === item.id ? 'ring-2 ring-[#6366F1]/50' : ''
                            )}>
                                <CardContent className="p-8 md:p-10 relative z-10">
                                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                                        
                                        {/* Candidate & Role Info */}
                                        <div className="flex items-center gap-8 flex-1">
                                            <div className={cn(
                                                "w-20 h-20 rounded-2xl flex items-center justify-center text-white transition-all duration-500 shadow-2xl border border-white/10 relative overflow-hidden group-hover:scale-110",
                                                item.glow
                                            )}>
                                                <div className={cn("absolute inset-0 opacity-20", item.glow)} />
                                                <item.icon size={36} className={cn("relative z-10", item.color)} />
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex flex-wrap items-center gap-3">
                                                    <Badge className="bg-white/5 text-slate-400 border border-white/5 font-black text-[9px] px-3 py-1 uppercase tracking-widest rounded-lg">
                                                        {item.type}
                                                    </Badge>
                                                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                                        <Activity size={12} className="text-[#6366F1]" /> {item.date}
                                                    </span>
                                                </div>
                                                <h3 className="text-2xl font-black text-white tracking-tight italic group-hover:text-gradient-cyan transition-all">{item.role}</h3>
                                                <div className="flex items-center gap-4">
                                                    <Badge className={cn(
                                                        "px-3 py-1 rounded-lg font-black uppercase text-[8px] tracking-widest bg-white/5 border border-white/5",
                                                        item.color
                                                    )}>
                                                        {item.status}
                                                    </Badge>
                                                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{item.tag}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Stats & Actions */}
                                        <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-16">
                                            <div className="text-center md:text-right space-y-1">
                                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">Neural Score</p>
                                                <div className={cn("text-6xl font-black tracking-tighter italic", item.color)}>
                                                    {item.score}<span className="text-xl ml-1">%</span>
                                                </div>
                                            </div>

                                            <div className="flex gap-4 w-full md:w-auto">
                                                <Button 
                                                    onClick={() => setSelectedId(selectedId === item.id ? null : item.id)}
                                                    className="flex-1 md:flex-none h-16 px-8 rounded-2xl bg-white text-slate-950 hover:bg-[#6366F1] hover:text-white font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl flex items-center gap-4 smooth-transition"
                                                >
                                                    {selectedId === item.id ? 'Close' : 'View Intelligence'} {selectedId === item.id ? <ArrowRight size={18} className="rotate-90"/> : <Sparkles size={18} />}
                                                </Button>
                                                <Button variant="outline" className="w-16 h-16 p-0 rounded-2xl border border-white/5 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 smooth-transition">
                                                    <Download size={20} />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Expandable Insight Panel */}
                                    <AnimatePresence>
                                        {selectedId === item.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="mt-10 pt-10 border-t border-white/5 space-y-8">
                                                    <div className="p-8 bg-white/[0.02] rounded-[2rem] border border-white/5 relative overflow-hidden group/insight">
                                                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover/insight:scale-125 transition-transform duration-1000">
                                                            <Brain size={120} className="text-[#6366F1]" />
                                                        </div>
                                                        <div className="flex items-center gap-3 mb-4 relative z-10">
                                                            <Zap size={18} className="text-[#6366F1] fill-[#6366F1]" />
                                                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Neural Performance Diagnostic</h4>
                                                        </div>
                                                        <p className="text-lg font-bold text-slate-300 leading-relaxed italic max-w-4xl relative z-10">
                                                            "{item.insight}"
                                                        </p>
                                                    </div>
                                                    
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                        <div className="p-6 bg-white/[0.02] rounded-2xl border border-white/5 flex items-center gap-4">
                                                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[#6366F1] border border-white/5 shadow-inner"><Target size={20}/></div>
                                                            <div>
                                                                <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">Core Vector</div>
                                                                <div className="text-[11px] font-black text-white uppercase tracking-tight">{item.type}</div>
                                                            </div>
                                                        </div>
                                                        <div className="p-6 bg-white/[0.02] rounded-2xl border border-white/5 flex items-center gap-4">
                                                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-emerald-400 border border-white/5 shadow-inner"><Award size={20}/></div>
                                                            <div>
                                                                <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">Sync Status</div>
                                                                <div className="text-[11px] font-black text-white uppercase tracking-tight">{item.status}</div>
                                                            </div>
                                                        </div>
                                                        <Button 
                                                            onClick={() => navigate('/interview/result')}
                                                            className="h-full rounded-2xl bg-[#6366F1]/10 text-[#6366F1] font-black uppercase tracking-widest text-[9px] gap-3 border border-[#6366F1]/20 hover:bg-[#6366F1] hover:text-white smooth-transition"
                                                        >
                                                            Full Diagnostics Breakdown <ChevronRight size={16}/>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredData.length === 0 && (
                    <div className="text-center py-32 px-10 glass-premium-blue rounded-[3rem] border-2 border-dashed border-white/5">
                        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner border border-white/5">
                            <History size={40} className="text-slate-600" />
                        </div>
                        <h3 className="text-3xl font-black text-white mb-3 tracking-tight italic uppercase">Logs Empty</h3>
                        <p className="text-sm font-medium text-slate-500 max-w-sm mx-auto leading-relaxed">Your performance journey starts with your first session. Initialize a simulation to populate your history.</p>
                        <Button className="mt-10 rounded-2xl h-16 px-12 bg-white text-slate-950 font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl hover:bg-[#6366F1] hover:text-white smooth-transition" onClick={() => navigate('/interview')}>Initialize Simulation <Zap size={16} className="ml-2"/></Button>
                    </div>
                )}

                {/* Pro Call to Action */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="mt-20">
                    <Card className="bg-[#111827]/40 border border-white/5 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-4xl group">
                        <div className="absolute top-0 right-0 w-[500px] h-full bg-[#6366F1]/20 blur-[120px] -mr-40" />
                        <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
                            <div className="space-y-6 text-center md:text-left">
                                <div className="inline-flex items-center gap-3 px-5 py-1.5 bg-white/5 rounded-full backdrop-blur-md border border-white/10">
                                    <Crown size={14} className="text-amber-400 fill-amber-400" />
                                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white">Elite Intelligence Suite</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight italic uppercase">Sync with <span className="text-gradient-cyan">Global Benchmarks</span></h2>
                                <p className="text-slate-500 font-medium max-w-2xl text-base leading-relaxed">
                                    Analyze how your neural scores align with candidates hired at top companies like Google, Meta, and Amazon.
                                    Unlock cross-platform performance insights.
                                </p>
                            </div>
                            <Button className="h-16 px-10 rounded-2xl bg-white text-slate-950 hover:bg-[#22D3EE] hover:text-white smooth-transition font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl whitespace-nowrap">
                                Unlock Neural Benchmarks
                            </Button>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};

export default HistoryPage;
