import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from "@/layouts/Breadcrumb";
import AptitudeHeader from "./components/AptitudeHeader";
import RoadmapSection from "./components/RoadmapSection";
import { Button } from "@/components/ui/button";
import { TopicCard } from "./components/TopicCard";
import { QuestionCard } from "./components/QuestionCard";
import { 
    aptitudeTopics, 
    aptitudeQuestions, 
    preparationTips
} from "@/data/aptitudeData";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Search,
    ChevronDown,
    Trophy,
    CheckCircle2,
    Zap,
    Target,
    Activity,
    Brain,
    ChevronRight,
    Sparkles
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AptitudeDashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [companyFilter, setCompanyFilter] = useState("All Companies");
  const [difficultyFilter] = useState("All Difficulties");

  // Get unique companies for filter
  const allCompanies = useMemo(() => {
    const companies = new Set<string>();
    aptitudeQuestions.forEach(q => q.companies.forEach(c => companies.add(c)));
    return ["All Companies", ...Array.from(companies)];
  }, []);

  const filteredQuestions = useMemo(() => {
    return aptitudeQuestions.filter(q => {
        const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             q.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCompany = companyFilter === "All Companies" || q.companies.includes(companyFilter);
        const matchesDifficulty = difficultyFilter === "All Difficulties" || q.difficulty === difficultyFilter;
        return matchesSearch && matchesCompany && matchesDifficulty;
    });
  }, [searchQuery, companyFilter, difficultyFilter]);

  const filteredTopics = useMemo(() => {
    return aptitudeTopics.filter(t => 
        difficultyFilter === "All Difficulties" || t.difficulty === difficultyFilter
    );
  }, [difficultyFilter]);

  return (
    <div className="flex-1 w-full min-h-screen bg-[#0B0F1A] text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden page-fade-in pb-24">
        {/* Background Ambient Gradients */}
        <div className="fixed inset-0 z-0 pointer-events-none">
            <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#6366F1]/10 rounded-full blur-[150px]" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[700px] h-[700px] bg-[#22D3EE]/10 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 px-6 py-6 lg:px-12 space-y-12">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/5 pb-10">
                <div className="space-y-4">
                    <Breadcrumb title="Aptitude Diagnostics" text="Cognitive Rounds" />
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter italic uppercase">
                        Cognitive <span className="text-gradient-cyan">Accelerator</span>
                    </h1>
                </div>
                <div className="flex items-center gap-4">
                     <div className="hidden md:flex items-center gap-2 px-6 py-2 bg-white/5 rounded-full border border-white/10 shadow-inner">
                        <Activity size={14} className="text-[#6366F1]" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">System Ready</span>
                    </div>
                    <Button onClick={() => navigate('/ai-interview-dashboard')} className="h-12 px-8 rounded-xl bg-white text-slate-950 font-black uppercase text-[10px] tracking-widest hover:bg-[#6366F1] hover:text-white smooth-transition shadow-4xl">
                        Back to Command
                    </Button>
                </div>
            </div>
            
            <div className="max-w-[1600px] mx-auto space-y-20">
                {/* 1. HEADER SECTION */}
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                    <AptitudeHeader />
                </motion.div>

                {/* 2. ROADMAP SECTION */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }} 
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <RoadmapSection />
                </motion.div>

                {/* 3. PREVIOUSLY ASKED QUESTIONS SECTION */}
                <section className="space-y-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-black text-white flex items-center gap-4 uppercase tracking-tighter italic">
                                <div className="w-12 h-12 rounded-2xl bg-[#6366F1]/10 flex items-center justify-center border border-[#6366F1]/20">
                                    <Target className="text-[#6366F1]" size={24} />
                                </div>
                                Intelligence <span className="text-gradient-cyan">Logs</span>
                            </h2>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-16">High-frequency corporate patterns</p>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="relative w-full md:w-[320px] group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-[#6366F1] smooth-transition" size={18} />
                                <Input 
                                    placeholder="Search corporate entities..." 
                                    className="pl-12 rounded-2xl h-14 bg-white/[0.03] border-white/10 text-white placeholder:text-slate-600 focus:border-[#6366F1]/50 smooth-transition"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="rounded-2xl h-14 px-8 gap-3 border-white/10 glass-premium-blue text-[10px] font-black uppercase tracking-widest hover:border-[#6366F1]/30">
                                        <Trophy size={16} className="text-[#F59E0B]" />
                                        {companyFilter}
                                        <ChevronDown size={16} className="text-slate-500" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="rounded-2xl bg-[#0F172A] border-white/10 p-2 min-w-[200px] shadow-4xl backdrop-blur-xl">
                                    {allCompanies.map(c => (
                                        <DropdownMenuItem key={c} onClick={() => setCompanyFilter(c)} className="rounded-xl px-4 py-3 font-bold text-xs cursor-pointer text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                                            {c}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <AnimatePresence mode="popLayout">
                            {filteredQuestions.length > 0 ? (
                                filteredQuestions.map(question => (
                                    <motion.div layout key={question.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
                                        <QuestionCard question={question} />
                                    </motion.div>
                                ))
                            ) : (
                                <div className="col-span-full py-32 text-center glass-premium-blue rounded-[3rem] border border-dashed border-white/10">
                                    <Activity size={48} className="mx-auto text-slate-700 mb-6" />
                                    <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-xs">No corporate vectors identified</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </section>

                {/* 4. PRACTICE SECTION (TOPIC-WISE) */}
                <section className="space-y-12">
                    <div className="flex items-center justify-between">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-black text-white flex items-center gap-4 uppercase tracking-tighter italic">
                                <div className="w-12 h-12 rounded-2xl bg-[#22D3EE]/10 flex items-center justify-center border border-[#22D3EE]/20">
                                    <Brain className="text-[#22D3EE]" size={24} />
                                </div>
                                Cognitive <span className="text-gradient-cyan">Sectors</span>
                            </h2>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-16">Segmented skill extraction modules</p>
                        </div>
                        <Badge className="bg-[#6366F1]/10 text-[#6366F1] border-none rounded-xl px-5 py-2 font-black uppercase tracking-widest text-[10px] italic">
                            {aptitudeTopics.length} Operational Zones
                        </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredTopics.map(topic => (
                            <TopicCard key={topic.id} topic={topic} />
                        ))}
                    </div>
                </section>

                {/* FOOTER TIPS SECTION */}
                <section className="glass-premium-blue p-12 lg:p-20 rounded-[4rem] border-white/5 overflow-hidden relative shadow-4xl group">
                    <div className="absolute top-0 right-0 p-20 opacity-5 group-hover:scale-110 smooth-transition">
                        <Zap size={300} className="text-[#F59E0B]" />
                    </div>
                    <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-[#6366F1]/5 blur-[120px] rounded-full" />
                    
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-10">
                            <div className="space-y-4">
                                <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none italic text-white">
                                    Neural <span className="text-gradient-cyan">Optimization</span> <br />
                                    Strategic Guidance
                                </h3>
                                <p className="text-slate-500 font-bold text-sm leading-relaxed italic max-w-md">
                                    "Accelerate your solving velocity with verified cognitive heuristics from elite engineers."
                                </p>
                            </div>
                            <div className="space-y-4">
                                {preparationTips.map(tip => (
                                    <div key={tip.id} className="flex gap-6 p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.06] smooth-transition group/tip">
                                        <div className="shrink-0 w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 group-hover/tip:scale-110 smooth-transition shadow-inner">
                                            <CheckCircle2 size={20} />
                                        </div>
                                        <p className="text-sm font-bold text-slate-300 leading-relaxed italic group-hover/tip:text-white smooth-transition">
                                            "{tip.text}"
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="glass-premium-blue p-10 lg:p-14 rounded-[3.5rem] border border-white/10 space-y-10 shadow-inner relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-[#22D3EE]/10 blur-3xl -mr-20 -mt-20" />
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 bg-gradient-to-br from-[#6366F1] to-[#22D3EE] rounded-3xl flex items-center justify-center shadow-[0_20px_40px_rgba(99,102,241,0.3)]">
                                    <Sparkles size={36} className="text-white" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-2xl font-black uppercase tracking-tighter italic text-white">Coach Sync</h4>
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Real-time heuristics support</p>
                                </div>
                            </div>
                            <div className="p-8 bg-black/40 rounded-[2.5rem] border border-white/5 shadow-inner">
                                <p className="text-slate-400 font-medium italic text-sm leading-relaxed text-center">
                                    "Stuck on a specific pattern? Our Coach can extract the underlying logic in milliseconds."
                                </p>
                            </div>
                            <Button className="w-full h-16 rounded-[2rem] bg-white text-slate-950 hover:bg-[#6366F1] hover:text-white font-black uppercase tracking-[0.2em] text-[10px] gap-4 transition-all shadow-4xl group/btn">
                                Talk To Coach AI <ChevronRight size={18} className="group-hover/btn:translate-x-2 smooth-transition" />
                            </Button>
                        </div>
                    </div>
                </section>
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
}
