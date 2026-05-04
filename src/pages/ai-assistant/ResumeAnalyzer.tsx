import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    FileText, 
    Sparkles, 
    AlertCircle, 
    CheckCircle2, 
    BookOpen, 
    RefreshCcw, 
    ArrowRight,
    Brain,
    Target,
    ShieldCheck,
    History,
    TrendingUp,
    Star,
    XCircle,
    UserCircle2,
    Zap,
    Briefcase,
    Crown,
    UserCheck,
    ShieldAlert,
    Cpu,
    Shield,
    ChevronRight,
    Activity,
    LineChart
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Breadcrumb from "@/layouts/Breadcrumb";
import { resumeAnalysisService } from "@/lib/ResumeAnalysisService";
import type { ResumeAnalysisReport } from "@/lib/ResumeAnalysisService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as pdfjs from "pdfjs-dist";
import { cn } from "@/lib/utils";

// Initialize PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const ResumeAnalyzer = () => {
    const navigate = useNavigate();
    const [resume, setResume] = useState("");
    const [jd, setJd] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [results, setResults] = useState<ResumeAnalysisReport | null>(null);
    const [progress, setProgress] = useState(0);
    const [isParsingPdf, setIsParsingPdf] = useState(false);

    const extractTextFromPdf = async (file: File) => {
        setIsParsingPdf(true);
        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
            let fullText = "";

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const content = await page.getTextContent();
                const strings = content.items.map((item: any) => item.str);
                fullText += strings.join(" ") + "\n";
            }

            setResume(fullText);
            toast.success("Resume parsed from PDF successfully!");
        } catch (error) {
            console.error("PDF Parsing Error:", error);
            toast.error("Failed to parse PDF Resume.");
        } finally {
            setIsParsingPdf(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type === "application/pdf") {
            extractTextFromPdf(file);
        } else if (file) {
            toast.error("Please upload a valid PDF file.");
        }
    };

    // Interview Configuration States
    const [difficulty, setDifficulty] = useState<'Junior' | 'Mid' | 'Senior' | 'Lead'>('Mid');
    const [persona, setPersona] = useState<'Coach' | 'Realistic' | 'Elite'>('Realistic');

    const handleAnalyze = async () => {
        if (!resume.trim() || isAnalyzing) return;
        setIsAnalyzing(true);
        setResults(null);
        setProgress(5);

        const interval = setInterval(() => {
            setProgress(prev => (prev < 90 ? prev + Math.random() * 15 : prev));
        }, 800);

        try {
            const data = await resumeAnalysisService.analyzeResume(resume, jd);
            setResults(data);
            clearInterval(interval);
            setProgress(100);
            toast.success("Analysis Complete!");
        } catch (error) {
            clearInterval(interval);
            console.error(error);
            toast.error("Failed to analyze resume.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const resetAnalysis = () => {
        setResults(null);
        setProgress(0);
        setResume("");
        setJd("");
    };

    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-emerald-400";
        if (score >= 50) return "text-amber-400";
        return "text-rose-400";
    };

    const personas = [
        { id: 'Coach', title: 'Supportive Coach', icon: UserCircle2, desc: 'Encouraging & Constructive.', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
        { id: 'Realistic', title: 'Real Recruiter', icon: UserCheck, desc: 'Standard Industry Vibes.', color: 'text-[#6366F1]', bg: 'bg-[#6366F1]/10' },
        { id: 'Elite', title: 'Elite Interviewer', icon: Crown, desc: 'High Pressure & Architecture.', color: 'text-[#F59E0B]', bg: 'bg-[#F59E0B]/10' },
    ];

    const difficultyLevels = ['Junior', 'Mid', 'Senior', 'Lead'];

    return (
        <div className="flex-1 w-full min-h-screen bg-[#0B0F1A] text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden page-fade-in pb-24">
            {/* Background Ambient Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#6366F1]/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[700px] h-[700px] bg-[#22D3EE]/10 rounded-full blur-[150px]" />
            </div>

            <div className="relative z-10 px-6 py-6 lg:px-12 space-y-12 max-w-[1800px] mx-auto">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/5 pb-10">
                    <div className="space-y-4">
                        <Breadcrumb title="Neural Resume Diagnostic" text="AI Intelligence" />
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter italic uppercase">
                            Resume <span className="text-gradient-cyan">Optimization</span> Lab
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2 px-6 py-2 bg-white/5 rounded-full border border-white/10 shadow-inner">
                            <Activity size={14} className="text-[#6366F1]" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Heuristics Synchronized</span>
                        </div>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {!results && !isAnalyzing ? (
                        <motion.div 
                            key="input-view"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="max-w-7xl mx-auto w-full py-10 space-y-16"
                        >
                            <div className="text-center space-y-6">
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="inline-flex items-center gap-3 px-6 py-2 bg-[#6366F1]/10 text-[#22D3EE] rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-[#6366F1]/20 shadow-inner"
                                >
                                    <Sparkles size={14} className="animate-pulse" /> Advanced Neural Extraction v4.0
                                </motion.div>
                                <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter italic uppercase leading-none">
                                    AI <span className="text-gradient-cyan">Simulation</span> Hub
                                </h2>
                                <p className="text-slate-400 font-bold italic text-lg max-w-2xl mx-auto">
                                    "Inject your experience vectors and calibrate the simulation environment for mission-critical preparation."
                                </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                <Card className="glass-premium-blue rounded-[3.5rem] p-10 lg:p-12 shadow-4xl relative overflow-hidden group border-white/5">
                                    <div className="absolute top-0 right-0 p-10 opacity-[0.02] group-hover:scale-110 smooth-transition pointer-events-none text-[#6366F1]"><FileText size={250} /></div>
                                    
                                    <div className="flex items-center justify-between gap-6 mb-10 relative z-10">
                                        <div className="flex items-center gap-5">
                                            <div className="w-16 h-16 bg-[#6366F1]/10 text-[#6366F1] rounded-[1.5rem] flex items-center justify-center border border-[#6366F1]/20 shadow-inner group-hover:rotate-6 smooth-transition">
                                                <FileText size={32} />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">Experience Stream</h3>
                                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] italic">Resume Vector Input</p>
                                            </div>
                                        </div>
                                        <div className="relative group/upload">
                                            <input 
                                                type="file" 
                                                accept=".pdf" 
                                                onChange={handleFileChange} 
                                                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-20"
                                                title="Upload PDF Resume"
                                            />
                                            <Button variant="ghost" disabled={isParsingPdf} className="h-14 px-8 rounded-2xl bg-white/[0.03] border border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover/upload:text-white group-hover/upload:border-[#6366F1]/30 smooth-transition italic">
                                                {isParsingPdf ? <RefreshCcw size={16} className="animate-spin mr-3"/> : <Sparkles size={16} className="mr-3"/>} Inject PDF
                                            </Button>
                                        </div>
                                    </div>

                                    <Textarea 
                                        placeholder="Experience: Software Engineering Architect at TechCorp... Skills: Java, Distributed Systems, Neural Logic..."
                                        className="min-h-[450px] rounded-[2.5rem] p-10 bg-black/40 border-white/5 focus:border-[#6366F1]/30 outline-none resize-none smooth-transition text-base font-bold italic leading-relaxed text-slate-300 scrollbar-hide shadow-inner relative z-10"
                                        value={resume}
                                        onChange={(e) => setResume(e.target.value)}
                                    />
                                </Card>

                                <Card className="glass-premium-blue rounded-[3.5rem] p-10 lg:p-12 shadow-4xl relative overflow-hidden group border-white/5">
                                    <div className="absolute top-0 right-0 p-10 opacity-[0.02] group-hover:scale-110 smooth-transition pointer-events-none text-[#22D3EE]"><Briefcase size={250} /></div>
                                    
                                    <div className="flex items-center gap-5 mb-10 relative z-10">
                                        <div className="w-16 h-16 bg-[#22D3EE]/10 text-[#22D3EE] rounded-[1.5rem] flex items-center justify-center border border-[#22D3EE]/20 shadow-inner group-hover:rotate-6 smooth-transition">
                                            <Briefcase size={32} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">Target Parameters</h3>
                                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] italic">Optional Role Context</p>
                                        </div>
                                    </div>

                                    <Textarea 
                                        placeholder="Required: 5+ years in Scalable Infrastructure, Async Logic, and Heuristic Caching..."
                                        className="min-h-[450px] rounded-[2.5rem] p-10 bg-black/40 border-white/5 focus:border-[#22D3EE]/30 outline-none resize-none smooth-transition text-base font-bold italic leading-relaxed text-slate-300 scrollbar-hide shadow-inner relative z-10"
                                        value={jd}
                                        onChange={(e) => setJd(e.target.value)}
                                    />
                                </Card>
                            </div>

                            <div className="flex justify-center pt-8">
                                <Button 
                                    onClick={handleAnalyze}
                                    disabled={!resume.trim()}
                                    className="h-24 px-20 rounded-full bg-white text-slate-950 hover:bg-[#6366F1] hover:text-white font-black uppercase tracking-[0.4em] text-sm shadow-4xl transition-all active:scale-95 disabled:opacity-20 flex items-center gap-8 group"
                                >
                                    Initialize Diagnostic Scan <ArrowRight size={24} className="group-hover:translate-x-4 smooth-transition" />
                                </Button>
                            </div>
                        </motion.div>
                    ) : isAnalyzing ? (
                        <motion.div 
                            key="loading-view"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center min-h-[700px] space-y-16 text-center"
                        >
                            <div className="relative">
                                <motion.div 
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                    className="w-72 h-72 rounded-full border-2 border-t-[#6366F1] border-r-[#22D3EE]/20 border-b-white/5 border-l-transparent flex items-center justify-center shadow-4xl"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Brain size={100} className="text-[#6366F1] animate-pulse" />
                                </div>
                                <div className="absolute inset-0 bg-[#6366F1]/5 blur-3xl rounded-full" />
                            </div>
                            <div className="space-y-8 max-w-xl w-full relative z-10">
                                <h2 className="text-5xl font-black text-white tracking-[0.2em] uppercase italic leading-none">Neural Extraction</h2>
                                <div className="space-y-4">
                                    <div className="h-4 bg-white/5 rounded-full overflow-hidden border border-white/5 p-1 shadow-inner">
                                        <motion.div 
                                            initial={{ width: 0 }} 
                                            animate={{ width: `${progress}%` }} 
                                            className="h-full bg-gradient-to-r from-[#6366F1] to-[#22D3EE] rounded-full shadow-[0_0_20px_rgba(99,102,241,0.5)]" 
                                        />
                                    </div>
                                    <span className="text-[11px] font-black text-[#6366F1] uppercase tracking-[0.5em] animate-pulse italic">Decoding Experience Vectors v4.0.2</span>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        results && (
                            <motion.div 
                                key="results-view"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-12 pb-24"
                            >
                                <div className="flex flex-col md:flex-row justify-between items-center gap-8 glass-premium-blue p-10 rounded-[3rem] shadow-4xl border-white/5 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none"><Activity size={150} /></div>
                                    <div className="flex items-center gap-8 relative z-10">
                                         <Button onClick={resetAnalysis} variant="ghost" className="h-16 w-16 rounded-2xl flex items-center justify-center border border-white/10 bg-white/5 hover:bg-white/10 smooth-transition">
                                            <RefreshCcw size={24} className="text-slate-400" />
                                         </Button>
                                         <div className="space-y-1">
                                            <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter leading-none">Extraction Assessment</h2>
                                            <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em] italic">Diagnostic Report v4.0 Synchronized</p>
                                         </div>
                                    </div>
                                    <div className="flex items-center gap-6 relative z-10">
                                        <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-6 py-2.5 font-black uppercase text-[10px] tracking-[0.2em] rounded-full italic shadow-inner">Heuristics Stable</Badge>
                                        <Badge className="bg-[#6366F1]/10 text-[#6366F1] border border-[#6366F1]/20 px-6 py-2.5 font-black uppercase text-[10px] tracking-[0.2em] rounded-full italic shadow-inner">AI Core Active</Badge>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                                    
                                    {/* Evaluation Card */}
                                    <div className="lg:col-span-4 space-y-10">
                                        <Card className="glass-premium-blue rounded-[4rem] p-12 text-white shadow-4xl relative overflow-hidden flex flex-col items-center gap-10 group">
                                            <div className="absolute top-0 right-0 w-96 h-96 bg-[#6366F1]/15 blur-[120px] -mr-48 -mt-48 pointer-events-none" />
                                            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#22D3EE]/10 blur-[120px] -ml-48 -mb-48 pointer-events-none" />
                                            
                                            <div className="space-y-2 text-center relative z-10">
                                                <div className="text-[10px] font-black text-[#6366F1] uppercase tracking-[0.4em] italic flex items-center justify-center gap-2">
                                                    <Target size={14} /> Global Readiness Vector
                                                </div>
                                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className={cn("text-[10rem] font-black tracking-tighter leading-none italic group-hover:scale-105 smooth-transition", getScoreColor(results.score))}>
                                                    {results.score}<span className="text-4xl text-slate-700">%</span>
                                                </motion.div>
                                            </div>

                                            <div className="space-y-6 relative z-10 w-full">
                                                <div className="flex flex-col items-center gap-4">
                                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] italic">Neural Recommendation</span>
                                                    <div className={cn(
                                                        "px-10 py-5 rounded-[2rem] font-black uppercase tracking-[0.3em] shadow-4xl border-white/10 text-xs italic w-full text-center group-hover:rotate-1 smooth-transition",
                                                        results.decision === 'Hire Ready' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 
                                                        results.decision === 'Maybe Hire' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                                                    )}>
                                                        {results.decision} Protocol
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>

                                        {/* Configuration Card */}
                                        <Card className="glass-premium-blue rounded-[3.5rem] p-10 lg:p-12 shadow-4xl space-y-12 border-white/5 group relative overflow-hidden">
                                            <div className="absolute top-0 right-0 p-10 opacity-[0.02] group-hover:scale-110 smooth-transition pointer-events-none"><Cpu size={150} /></div>
                                            
                                            <div className="flex items-center gap-5 relative z-10">
                                                <div className="w-14 h-14 bg-[#6366F1]/10 text-[#6366F1] rounded-2xl flex items-center justify-center border border-[#6366F1]/20 shadow-inner">
                                                    <Target size={24} />
                                                </div>
                                                <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">Simulation Config</h3>
                                            </div>

                                            <div className="space-y-10 relative z-10">
                                                <div className="space-y-6">
                                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 italic">Target Difficulty Stream</label>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        {difficultyLevels.map(lvl => (
                                                            <button 
                                                                key={lvl} 
                                                                onClick={() => setDifficulty(lvl as any)}
                                                                className={cn(
                                                                    "h-14 rounded-2xl text-[10px] font-black uppercase tracking-widest italic smooth-transition border",
                                                                    difficulty === lvl 
                                                                        ? 'bg-white text-slate-950 border-white shadow-4xl' 
                                                                        : 'bg-white/[0.03] text-slate-500 border-white/5 hover:border-white/20'
                                                                )}
                                                            >
                                                                {lvl} Mode
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="space-y-6">
                                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 italic">Entity Persona Matrix</label>
                                                    <div className="flex flex-col gap-4">
                                                        {personas.map(p => (
                                                            <button 
                                                                key={p.id}
                                                                onClick={() => setPersona(p.id as any)}
                                                                className={cn(
                                                                    "p-6 rounded-[2rem] border-2 text-left transition-all flex items-center gap-5 relative overflow-hidden group/btn",
                                                                    persona === p.id 
                                                                        ? 'border-[#6366F1] bg-[#6366F1]/5 shadow-4xl' 
                                                                        : 'border-white/5 bg-transparent opacity-60 hover:opacity-100 hover:border-white/20'
                                                                )}
                                                            >
                                                                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center border shadow-inner smooth-transition group-hover/btn:scale-110", p.bg, p.color, persona === p.id ? 'border-white/10' : 'border-transparent')}>
                                                                    <p.icon size={24} />
                                                                </div>
                                                                <div>
                                                                    <div className="text-sm font-black text-white italic uppercase tracking-tight leading-none mb-1">{p.title}</div>
                                                                    <div className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] italic">{p.desc}</div>
                                                                </div>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>

                                    {/* Content Column */}
                                    <div className="lg:col-span-8 space-y-10">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                            <Card className="glass-premium-blue rounded-[3.5rem] p-10 lg:p-12 shadow-4xl relative overflow-hidden group border-white/5">
                                                <div className="absolute top-0 right-0 p-10 opacity-[0.02] group-hover:scale-110 smooth-transition pointer-events-none"><LineChart size={200} className="text-[#6366F1]" /></div>
                                                
                                                <div className="flex items-center gap-5 mb-12 relative z-10">
                                                    <div className="w-14 h-14 bg-[#6366F1]/10 text-[#6366F1] rounded-2xl flex items-center justify-center border border-[#6366F1]/20 shadow-inner">
                                                        <Star size={24} />
                                                    </div>
                                                    <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">Competency Matrix</h3>
                                                </div>
                                                <div className="space-y-8 relative z-10">
                                                    {Object.entries(results.skillLevels).map(([skill, level], i) => (
                                                        <div key={i} className="space-y-3 group/skill">
                                                            <div className="flex justify-between items-end px-1">
                                                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic group-hover/skill:text-white smooth-transition">{skill}</span>
                                                                <span className="text-[11px] font-black text-[#6366F1] italic">{level}<span className="text-slate-700 text-[9px] ml-1">/10</span></span>
                                                            </div>
                                                            <div className="h-2.5 bg-black/40 rounded-full overflow-hidden border border-white/5 p-[2px] shadow-inner">
                                                                <motion.div 
                                                                    initial={{ width: 0 }} 
                                                                    animate={{ width: `${level * 10}%` }} 
                                                                    className="h-full bg-gradient-to-r from-[#6366F1] to-[#22D3EE] rounded-full shadow-[0_0_10px_rgba(99,102,241,0.3)]" 
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </Card>

                                            <Card className="glass-premium-blue rounded-[3.5rem] p-10 lg:p-12 shadow-4xl overflow-hidden relative group border-white/5">
                                                 <div className="absolute top-0 right-0 p-10 opacity-[0.02] group-hover:scale-110 smooth-transition pointer-events-none"><ShieldAlert size={200} className="text-rose-400" /></div>
                                                 
                                                 <div className="flex items-center gap-5 mb-12 relative z-10">
                                                    <div className="w-14 h-14 bg-rose-500/10 text-rose-400 rounded-2xl flex items-center justify-center border border-rose-500/20 shadow-inner">
                                                        <ShieldAlert size={24} />
                                                    </div>
                                                    <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">Missing Vectors</h3>
                                                </div>
                                                <div className="flex flex-wrap gap-4 relative z-10">
                                                    {results.missingSkills.map((gap, i) => (
                                                        <div key={i} className="px-6 py-3.5 bg-white/[0.03] text-slate-400 border border-white/10 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-inner italic hover:text-white hover:border-rose-500/30 hover:bg-rose-500/5 smooth-transition group/gap">
                                                            <span className="text-rose-400 mr-2 group-hover/gap:animate-pulse">!</span> {gap}
                                                        </div>
                                                    ))}
                                                </div>
                                            </Card>
                                        </div>

                                        <Card className="bg-gradient-to-br from-[#6366F1] to-[#22D3EE] rounded-[4rem] p-16 lg:p-24 text-white shadow-4xl relative overflow-hidden flex flex-col lg:flex-row items-center gap-16 group">
                                            <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-10 pointer-events-none" />
                                            <div className="absolute inset-0 bg-black/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 smooth-transition" />
                                            
                                            <div className="flex-1 space-y-10 relative z-10 text-center lg:text-left">
                                                <div className="flex items-center justify-center lg:justify-start gap-4 text-[10px] font-black uppercase tracking-[0.5em] italic">
                                                    <Zap size={20} className="fill-current animate-pulse" /> Neural Protocol Locked
                                                </div>
                                                <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-[0.9] italic uppercase">Initialize <span className="text-slate-950">Neural Simulation</span> Stream.</h2>
                                                <p className="text-lg md:text-xl font-bold italic text-white/90 max-w-2xl leading-relaxed">
                                                    "Your experience vectors are successfully extracted. Launch the simulation to engage with the {difficulty} level {persona} AI matrix."
                                                </p>
                                                <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-6">
                                                    <Button 
                                                        onClick={() => {
                                                            localStorage.setItem('resume_interview_questions', JSON.stringify(results.questions));
                                                            localStorage.setItem('resume_analysis_report', JSON.stringify(results));
                                                            localStorage.setItem('interview_config', JSON.stringify({ difficulty, persona }));
                                                            navigate('/interview/live');
                                                        }}
                                                        className="h-24 px-16 rounded-full bg-white text-slate-950 hover:bg-slate-950 hover:text-white transition-all font-black uppercase tracking-[0.3em] shadow-4xl flex items-center gap-6 text-sm group/launch"
                                                    >
                                                        Initialize Live Sync <Zap size={24} className="group-launch:scale-125 smooth-transition fill-current" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="w-full lg:w-1/3 aspect-square bg-white/10 rounded-[4rem] backdrop-blur-2xl border border-white/20 flex flex-col items-center justify-center p-12 relative group/orb shadow-4xl">
                                                 <motion.div animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} className="bg-white rounded-[2.5rem] shadow-4xl p-10 relative z-10">
                                                    <Sparkles size={80} className="text-[#6366F1]" />
                                                 </motion.div>
                                                 <div className="absolute inset-0 bg-white/5 animate-pulse blur-3xl rounded-full" />
                                                 <div className="mt-12 text-center relative z-10">
                                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 italic">Core v4.0.2 Ready</span>
                                                 </div>
                                            </div>
                                        </Card>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    )}
                </AnimatePresence>
            </div>

            <style>{`
                .page-fade-in { animation: fadeIn 0.8s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                .text-gradient-cyan {
                    background: linear-gradient(to right, #6366F1, #22D3EE);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .glass-premium-blue {
                    background: rgba(17, 24, 39, 0.7);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
                .shadow-4xl {
                    box-shadow: 0 20px 50px -20px rgba(0, 0, 0, 0.5), 0 0 1px 1px rgba(255, 255, 255, 0.05) inset;
                }
                .smooth-transition {
                    transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
                }
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
};

export default ResumeAnalyzer;

