import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    ChevronLeft, 
    Rocket, 
    MessageSquare, 
    Laptop, 
    CheckCircle2,
    Play,
    Download,
    Star,
    Zap,
    History,
    FileText,
    Video,
    Github,
    ExternalLink,
    Code2,
    Code as BrainCircuit,
    Star as Sparkles,
    Timer,
    ChevronDown,
    Star as BarChart3
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { rolesData } from "@/data/rolesData";

const RoleDetails = () => {
    const { roleId } = useParams();
    const navigate = useNavigate();

    // Find the current role
    const role = useMemo(() => rolesData.find(r => r.id === roleId), [roleId]);

    if (!role) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
                <Rocket size={64} className="text-neutral-300 mb-4" />
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Role Not Found</h2>
                <p className="text-slate-500 mb-6">The role you are looking for does not exist or has been moved.</p>
                <Button onClick={() => navigate('/roles')}>Back to All Roles</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-20">
            {/* 🟦 TOP NAVIGATION & BREADCRUMB */}
            <div className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => navigate('/roles')}
                            className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-all active:scale-95"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-400">
                            <span>Roles</span>
                            <span>/</span>
                            <span className="text-slate-900">{role.title}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-indigo-50 text-indigo-600 border-indigo-100 px-3 py-1 font-bold">
                            Level: Beginner → Advanced
                        </Badge>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-8">
                {/* 🟦 HERO SECTION */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 rounded-[2rem] p-8 md:p-12 mb-8 text-white shadow-2xl shadow-indigo-200"
                >
                    <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
                        <Sparkles size={400} />
                    </div>
                    
                    <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                                    {React.createElement(role.icon, { size: 32, className: "text-white" })}
                                </div>
                                <Badge className="bg-white/20 text-white backdrop-blur-sm border-0 font-bold px-4 py-1.5 uppercase text-[10px] tracking-widest">
                                    {role.category}
                                </Badge>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">{role.title}</h1>
                            <p className="text-lg text-indigo-50/80 mb-8 leading-relaxed max-w-xl">
                                Become a full-fledged {role.title.toLowerCase()}. Master the core systems, algorithms, and architectures used by top engineering teams worldwide.
                            </p>
                            <div className="flex flex-wrap gap-2 mb-8">
                                {role.skills.map(skill => (
                                    <Badge key={skill} className="bg-white/10 text-white border-white/20 hover:bg-white/20 transition-colors">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                            <div className="flex items-center gap-4">
                                <Button 
                                    onClick={() => navigate(`/interview/${role.title.toLowerCase().replace(/\s+/g, '-')}`)}
                                    className="bg-white text-indigo-700 hover:bg-neutral-50 px-8 py-6 rounded-2xl font-black text-base shadow-xl group"
                                >
                                    Start Preparation
                                    <Rocket size={18} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </Button>
                                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-6 py-6 rounded-2xl font-bold backdrop-blur-sm">
                                    <Download size={18} className="mr-2" />
                                    Roadmap
                                </Button>
                            </div>
                        </div>
                        
                        <div className="hidden md:flex flex-col items-center justify-center">
                            <div className="flex gap-4">
                                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 text-center border border-white/20 w-32 h-32 flex flex-col justify-center">
                                    <span className="text-3xl font-black block">{role.questionsCount}</span>
                                    <span className="text-[10px] uppercase font-bold text-indigo-200">Questions</span>
                                </div>
                                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 text-center border border-white/20 w-32 h-32 flex flex-col justify-center">
                                    <span className="text-3xl font-black block">68%</span>
                                    <span className="text-[10px] uppercase font-bold text-indigo-200">Readiness</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* 🟦 2-COLUMN LAYOUT */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* LEFT COLUMN (70%) */}
                    <div className="lg:col-span-8 space-y-10">
                        
                        {/* 🛣️ ROADMAP SECTION */}
                        <section className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm relative overflow-hidden">
                            <div className="absolute top-8 right-8 text-slate-50">
                                <Rocket size={120} />
                            </div>
                            <div className="flex items-center gap-3 mb-10">
                                <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                                    <Star size={20} />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">AI-Optimized Roadmap</h3>
                            </div>
                            
                            <div className="space-y-0 relative ml-4">
                                <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-slate-100" />
                                {[
                                    { title: 'Programming Language', desc: 'Master core syntax and paradigms.', status: 'completed' },
                                    { title: 'DSA', desc: 'Algorithms & Data structures essentials.', status: 'active' },
                                    { title: 'OOP', desc: 'Object Oriented Programming principles.', status: 'pending' },
                                    { title: 'DBMS + SQL', desc: 'Database management and query optimization.', status: 'pending' },
                                    { title: 'Web Development', desc: 'HTML, CSS, JS & Client-side architecture.', status: 'pending' },
                                    { title: 'Spring Boot', desc: 'Framework excellence & Microservices.', status: 'pending' },
                                    { title: 'Projects', desc: 'Real-world deployment & System design.', status: 'pending' },
                                ].map((step, idx) => (
                                    <motion.div 
                                        key={idx}
                                        whileHover={{ x: 8 }}
                                        className="relative flex gap-8 pb-10 last:pb-0 group"
                                    >
                                        <div className={`z-10 w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border-4 border-white transition-all shadow-md ${
                                            step.status === 'completed' ? 'bg-emerald-500 text-white' :
                                            step.status === 'active' ? 'bg-indigo-600 text-white scale-110 shadow-xl shadow-indigo-100 ring-4 ring-indigo-50' :
                                            'bg-white text-slate-300 border-slate-100'
                                        }`}>
                                            {step.status === 'completed' ? <CheckCircle2 size={18} /> : (idx + 1)}
                                        </div>
                                        <div className="pt-1 flex-1">
                                            <h4 className={`text-lg font-bold group-hover:text-indigo-600 transition-colors ${step.status === 'pending' ? 'text-slate-400' : 'text-slate-800'}`}>
                                                {step.title}
                                            </h4>
                                            <p className="text-sm text-slate-500 max-w-lg mt-1">{step.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* 🚀 FRESHER BOOSTER */}
                        <section className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-[2rem] p-8 text-white shadow-xl shadow-amber-100 relative overflow-hidden">
                            <div className="absolute bottom-0 right-0 p-4 opacity-20 rotate-12">
                                <Rocket size={150} />
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                                        <Zap size={24} className="fill-white" />
                                    </div>
                                    <h3 className="text-2xl font-black">Fresher Booster 🔥</h3>
                                </div>
                                
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="bg-white/15 backdrop-blur-lg p-6 rounded-3xl border border-white/20">
                                        <Timer className="mb-3" />
                                        <h4 className="font-bold mb-2">7-Day Blitz</h4>
                                        <p className="text-xs text-orange-50 leading-relaxed">A focused 8-hour daily plan to crack core rounds in one week.</p>
                                    </div>
                                    <div className="bg-white/15 backdrop-blur-lg p-6 rounded-3xl border border-white/20">
                                        <FileText className="mb-3" />
                                        <h4 className="font-bold mb-2">Resume Tips</h4>
                                        <p className="text-xs text-orange-50 leading-relaxed">ATS-friendly templates and keyword strategies for tech roles.</p>
                                    </div>
                                    <div className="bg-white/15 backdrop-blur-lg p-6 rounded-3xl border border-white/20">
                                        <MessageSquare className="mb-3" />
                                        <h4 className="font-bold mb-2">Comms Hack</h4>
                                        <p className="text-xs text-orange-50 leading-relaxed">Templates and scripts to answer "Tell me about yourself" perfectly.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* ❓ HIGH PROBABILITY QUESTIONS */}
                        <section id="questions">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                                    <MessageSquare className="text-indigo-600" />
                                    Question Bank
                                </h3>
                                <Badge variant="outline" className="text-slate-400 px-4 py-1">Standard Set</Badge>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { q: 'Explain the difference between HashMap and HashSet.', a: 'HashMap stores key-value pairs, while HashSet stores unique elements. HashSet internally uses HashMap.' },
                                    { q: 'What is Dependency Injection in Spring Boot?', a: 'DI is a design pattern where the container provides dependencies to an object at runtime.' },
                                    { q: 'How does SQL indexing improve query performance?', a: 'Indexing creates a sorted structure that allows the DB to find rows without scanning the whole table.' },
                                ].map((item, idx) => (
                                    <div key={idx} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm group hover:border-indigo-200 transition-colors">
                                        <button className="w-full text-left p-6 flex items-center justify-between gap-4 font-bold text-slate-800">
                                            <span>{item.q}</span>
                                            <ChevronDown size={18} className="text-slate-400 group-hover:text-indigo-500 transition-all" />
                                        </button>
                                        <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-50 pt-4 bg-slate-50/30">
                                            <Badge className="bg-blue-50 text-blue-600 border-0 mb-3">Answer</Badge>
                                            <p>{item.a}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 💻 PRACTICAL CODING */}
                        <section>
                            <div className="flex items-center gap-2 mb-6">
                                <Code2 className="text-indigo-600" />
                                <h3 className="text-2xl font-black text-slate-900">Practical Coding</h3>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                {[
                                    { title: 'Two Sum', diff: 'Easy', color: 'text-emerald-500 bg-emerald-50' },
                                    { title: 'Reverse Linked List', diff: 'Medium', color: 'text-amber-500 bg-amber-50' },
                                    { title: 'Merge K Sorted Lists', diff: 'Hard', color: 'text-rose-500 bg-rose-50' },
                                    { title: 'Valid Parentheses', diff: 'Easy', color: 'text-emerald-500 bg-emerald-50' },
                                ].map((item, idx) => (
                                    <div key={idx} className="bg-white p-5 rounded-3xl border border-slate-200 hover:shadow-lg transition-all flex items-center justify-between group">
                                        <div>
                                            <Badge className={`border-0 mb-2 ${item.color}`}>{item.diff}</Badge>
                                            <h4 className="font-bold text-slate-800 group-hover:text-indigo-600">{item.title}</h4>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button size="sm" variant="ghost" className="rounded-xl h-9 hover:bg-slate-100">
                                                <ExternalLink size={14} />
                                            </Button>
                                            <Button 
                                                size="sm" 
                                                onClick={() => navigate('/coding')}
                                                className="bg-indigo-600 text-white rounded-xl h-9"
                                            >
                                                Solve
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 🏢 COMPANY PREPARATION */}
                        <section>
                            <div className="flex items-center gap-2 mb-6">
                                <History className="text-indigo-600" />
                                <h3 className="text-2xl font-black text-slate-900">Company Tracks</h3>
                            </div>
                            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm">
                                <div className="flex gap-4 border-b border-slate-100 mb-8 overflow-x-auto no-scrollbar pb-1">
                                    {['TCS', 'Infosys', 'Wipro', 'Accenture'].map((c, i) => (
                                        <button key={c} className={`px-6 py-3 font-black text-sm whitespace-nowrap transition-all border-b-2 rounded-t-xl hover:bg-slate-50 ${i === 0 ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50' : 'border-transparent text-slate-400'}`}>
                                            {c}
                                        </button>
                                    ))}
                                </div>
                                <div className="space-y-4">
                                    <div className="flex gap-4 p-5 rounded-3xl bg-slate-50/50 border border-slate-100 hover:border-indigo-100 transition-all">
                                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center font-black text-indigo-600 shrink-0">1</div>
                                        <div>
                                            <h5 className="font-bold mb-1">TR Round Essentials</h5>
                                            <p className="text-xs text-slate-500">Most asked pseudo-code and logical puzzles specifically for TCS NQT.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 p-5 rounded-3xl bg-slate-50/50 border border-slate-100 hover:border-indigo-100 transition-all">
                                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center font-black text-indigo-600 shrink-0">2</div>
                                        <div>
                                            <h5 className="font-bold mb-1">Behavioral Scenarios</h5>
                                            <p className="text-xs text-slate-500">How to handle the HR round with values-aligned answers.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 🧩 MINI PROJECTS */}
                        <section>
                            <div className="flex items-center gap-2 mb-6">
                                <Laptop className="text-indigo-600" />
                                <h3 className="text-2xl font-black text-slate-900">Portfolio Projects</h3>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                {[
                                    { name: 'Student Management', tech: 'Spring Boot, MySQL', status: 'Intermediate' },
                                    { name: 'Full-Stack ToDo App', tech: 'React, Node.js', status: 'Beginner' },
                                ].map((proj, idx) => (
                                    <div key={idx} className="bg-white p-6 rounded-[2rem] border border-slate-200 hover:shadow-xl transition-all group">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                                                <Laptop size={24} />
                                            </div>
                                            <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors">
                                                <Github size={20} />
                                            </button>
                                        </div>
                                        <h4 className="text-lg font-black text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">{proj.name}</h4>
                                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-6">{proj.tech}</p>
                                        <Button variant="outline" className="w-full rounded-2xl font-bold border-slate-100 text-slate-600">
                                            View Project Case Study
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 🎥 YOUTUBE RESOURCES */}
                        <section>
                            <div className="flex items-center gap-2 mb-6">
                                <Video className="text-indigo-600" />
                                <h3 className="text-2xl font-black text-slate-900">Curated Learning</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[1, 2].map((i) => (
                                    <div key={i} className="bg-white rounded-[2rem] overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all">
                                        <div className="aspect-video bg-slate-900 relative flex items-center justify-center group cursor-pointer">
                                            <div className="absolute inset-0 bg-indigo-900/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform">
                                                <Play className="fill-white" />
                                            </div>
                                            <span className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded font-black">18:45</span>
                                        </div>
                                        <div className="p-5">
                                            <h4 className="font-bold text-slate-800 line-clamp-2">Complete System Design for Freshers - Masterclass</h4>
                                            <div className="flex items-center gap-2 mt-4">
                                                <div className="w-6 h-6 rounded-full bg-slate-100" />
                                                <span className="text-[10px] font-black uppercase text-slate-400">TechMaster AI</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                    </div>

                    {/* RIGHT SIDE (30%) - STICKY PANEL */}
                    <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
                        
                        {/* 🤖 AI MOCK INTERVIEW CARD */}
                        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-xl overflow-hidden relative">
                            <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-50 rounded-full blur-3xl opacity-50" />
                            
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-6">
                                    <BrainCircuit className="text-indigo-600" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500">AI Intelligence</span>
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-2 leading-tight">AI Mock Interview</h3>
                                <p className="text-sm text-slate-500 mb-8">Personalized adaptive session for {role.title} prep.</p>
                                
                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl">
                                        <div className="flex items-center gap-3">
                                            <Timer size={18} className="text-slate-400" />
                                            <span className="text-xs font-bold text-slate-600">Duration</span>
                                        </div>
                                        <span className="text-sm font-black text-slate-900">30 Mins</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl">
                                        <div className="flex items-center gap-3">
                                            <Zap size={18} className="text-slate-400" />
                                            <span className="text-xs font-bold text-slate-600">Difficulty</span>
                                        </div>
                                        <span className="text-sm font-black text-indigo-600">Dynamic</span>
                                    </div>
                                </div>
                                
                                <Button 
                                    onClick={() => navigate(`/interview/${role.title.toLowerCase().replace(/\s+/g, '-')}`)}
                                    className="w-full h-14 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-black rounded-2xl shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                                >
                                    Start Interview
                                    <Play size={16} className="fill-white" />
                                </Button>
                            </div>
                        </div>

                        {/* 📊 PROGRESS TRACKING */}
                        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm">
                            <h4 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                                <BarChart3 size={20} className="text-indigo-500" />
                                Preparation Progress
                            </h4>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Roadmap Steps</span>
                                        <span className="text-sm font-black text-indigo-600">3/7</span>
                                    </div>
                                    <Progress value={43} className="h-2 bg-indigo-50" />
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Question Bank</span>
                                        <span className="text-sm font-black text-indigo-600">20/85</span>
                                    </div>
                                    <Progress value={24} className="h-2 bg-indigo-50" />
                                </div>
                                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                    <span className="text-2xl font-black text-slate-900">40%</span>
                                    <span className="text-[10px] font-black uppercase text-emerald-500">Overall Readiness</span>
                                </div>
                            </div>
                        </div>

                        {/* 💡 AI SUGGESTION CARD */}
                        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[2.5rem] p-6 text-white shadow-xl shadow-indigo-100">
                            <div className="flex gap-4 items-start">
                                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center shrink-0">
                                    <Sparkles size={18} />
                                </div>
                                <div>
                                    <h5 className="font-bold mb-1">AI Recommendation</h5>
                                    <p className="text-xs text-indigo-100/90 leading-relaxed">
                                        "Your foundational Java score is excellent (92%). I recommend focusing on **Advanced DSA (Graphs)** next to reach elite status."
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="px-4 py-2 text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                            AI-Generated Preparation Plan
                        </div>
                    </aside>

                </div>
            </div>
        </div>
    );
};

export default RoleDetails;
