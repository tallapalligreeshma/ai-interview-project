import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
    Code2, 
    MessageSquare, 
    ChevronRight, 
    Zap, 
    Sparkles, 
    CheckCircle2, 
    ArrowLeft,
    Target,
    BookOpen,
    Layers,
    Cpu,
    Users,
    Activity
} from "lucide-react";
import { motion } from "framer-motion";

const InterviewRoundsPrep = () => {
    const navigate = useNavigate();
    const [selectedRoundId, setSelectedRoundId] = useState<string | null>(null);

    const rounds = [
        {
            id: 'theory',
            title: 'Technical Theory',
            icon: BookOpen,
            description: 'Master core concepts of your chosen role and industry standards.',
            questions: 20,
            duration: '45 min',
            color: 'blue',
            gradient: 'from-blue-500 to-indigo-600',
            theory: [
                { 
                    title: 'Core Fundamentals', 
                    items: ['OOPs Concepts', 'Database Management Systems', 'Operating Systems'],
                    icon: Cpu
                },
                { 
                    title: 'Web Technologies', 
                    items: ['HTTP/HTTPS Protocols', 'REST APIs', 'Security Best Practices'],
                    icon: Layers
                }
            ],
            practical: [
                { title: 'Scenario Analysis', difficulty: 'Medium', objective: 'Architecture decision making' },
                { title: 'Code Review Simulation', difficulty: 'Medium', objective: 'Identifying logic flaws' }
            ]
        },
        {
            id: 'coding',
            title: 'Technical Coding',
            icon: Code2,
            description: 'Solve real-world coding challenges and algorithmic problems.',
            questions: 3,
            duration: '60 min',
            color: 'purple',
            gradient: 'from-purple-500 to-pink-600',
            theory: [
                { 
                    title: 'Data Structures', 
                    items: ['Arrays & Strings', 'Linked Lists & Trees', 'Graphs & DP'],
                    icon: Activity
                },
                { 
                    title: 'Optimizations', 
                    items: ['Time Complexity', 'Space Complexity', 'Clean Code Principles'],
                    icon: Zap
                }
            ],
            practical: [
                { title: 'Array Manipulation', difficulty: 'Medium', tags: ['Two Pointers'] },
                { title: 'Tree Traversal', difficulty: 'Hard', tags: ['DFS/BFS'] }
            ]
        },
        {
            id: 'hr',
            title: 'HR Round',
            icon: MessageSquare,
            description: 'Refine your behavioral skills and professional communication.',
            questions: 10,
            duration: '20 min',
            color: 'green',
            gradient: 'from-green-400 to-emerald-600',
            theory: [
                { 
                    title: 'Behavioral Skills', 
                    items: ['STAR Method', 'Leadership Qualities', 'Team Collaboration'],
                    icon: Users
                },
                { 
                    title: 'Preparation', 
                    items: ['Company Research', 'Self Introduction', 'Salary Negotiation'],
                    icon: Target
                }
            ],
            practical: [
                { title: 'Tell me about yourself', objective: 'Personal Pitch' },
                { title: 'Handling Conflict', objective: 'Emotional Intelligence' }
            ]
        }
    ];


    const selectedRound = rounds.find(r => r.id === selectedRoundId);

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5, staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1 }
    };

    if (selectedRoundId && selectedRound) {
        return (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between">
                    <Button 
                        variant="ghost" 
                        onClick={() => setSelectedRoundId(null)}
                        className="group flex items-center gap-2 text-neutral-500 hover:text-primary transition-colors"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Rounds</span>
                    </Button>
                    <Badge className={`bg-${selectedRound.color}-500/10 text-${selectedRound.color}-500 border-0 uppercase font-black tracking-widest px-3 py-1`}>
                        Mastering {selectedRound.title}
                    </Badge>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                    {/* Theory Section */}
                    <Card className="bg-white dark:bg-slate-900 border-neutral-100 dark:border-slate-800 rounded-[2rem] overflow-hidden shadow-sm flex flex-col">
                        <div className={`p-8 bg-gradient-to-br ${selectedRound.gradient} text-white relative`}>
                            <div className="absolute top-0 right-0 p-6 opacity-10">
                                <BookOpen size={100} />
                            </div>
                            <div className="relative z-10 flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                                        <BookOpen size={24} />
                                    </div>
                                    <h2 className="text-2xl font-black">THEORY SECTION</h2>
                                </div>
                                <p className="text-white/80 font-medium">Master the foundational concepts and strategic patterns used by high-performance engineers.</p>
                            </div>
                        </div>
                        <CardContent className="p-8 flex-1">
                            <div className="space-y-8">
                                {selectedRound.theory.map((section, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <div className={`w-10 h-10 rounded-xl bg-${selectedRound.color}-500/10 text-${selectedRound.color}-500 flex items-center justify-center shrink-0`}>
                                            <section.icon size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-black text-neutral-800 dark:text-white uppercase tracking-wider mb-2">{section.title}</h4>
                                            <ul className="space-y-2">
                                                {section.items.map((item, i) => (
                                                    <li key={i} className="text-sm font-medium text-neutral-500 dark:text-slate-400 flex items-start gap-2">
                                                        <span className={`w-1.5 h-1.5 rounded-full bg-${selectedRound.color}-500 mt-1.5 shrink-0`} />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                                <div className="mt-8 p-6 bg-neutral-50 dark:bg-slate-800/40 rounded-[1.5rem] border border-dashed border-neutral-200 dark:border-slate-700 flex flex-col items-center text-center gap-3">
                                    <Zap size={24} className="text-amber-500 fill-amber-500" />
                                    <h5 className="text-sm font-black uppercase tracking-widest text-primary">Pro Tip</h5>
                                    <p className="text-xs font-bold text-neutral-400">"Focus on the 'Trade-offs' during the interview. There is never a perfect solution, only better compromises."</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Practical Section */}
                    <Card className="bg-white dark:bg-slate-900 border-neutral-100 dark:border-slate-800 rounded-[2rem] overflow-hidden shadow-sm flex flex-col">
                        <div className="p-8 border-b border-neutral-50 dark:border-slate-800">
                            <div className="flex items-center gap-3">
                                <div className={`p-3 bg-${selectedRound.color}-500/10 text-${selectedRound.color}-500 rounded-2xl`}>
                                    <Zap size={24} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-neutral-800 dark:text-white">PRACTICAL SECTION</h2>
                                    <p className="text-sm font-medium text-neutral-400">Apply your knowledge to real interview scenarios.</p>
                                </div>
                            </div>
                        </div>
                        <CardContent className="p-8 flex-1">
                            <div className="grid grid-cols-1 gap-4">
                                {selectedRound.practical.map((item: any, idx) => (
                                    <div key={idx} className="group p-6 bg-white dark:bg-slate-800 rounded-2xl border border-neutral-100 dark:border-slate-700 hover:border-primary/50 transition-all cursor-pointer relative overflow-hidden">
                                        <div className="flex items-center justify-between mb-3">
                                            <h4 className="text-lg font-black text-neutral-800 dark:text-white group-hover:text-primary transition-colors">{item.title}</h4>
                                            {item.difficulty && (
                                                <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 border-0 font-black uppercase tracking-widest text-[10px]">
                                                    {item.difficulty}
                                                </Badge>
                                            )}
                                        </div>
                                        
                                        {/* Dynamic Content based on round type */}
                                        {item.tags && (
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {item.tags.map((t: string) => (
                                                    <span key={t} className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest bg-neutral-50 dark:bg-slate-900 px-2 py-1 rounded-md">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {item.components && (
                                            <div className="space-y-2 mb-4">
                                                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-1">Key Components</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {item.components.map((c: string) => (
                                                        <span key={c} className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-1 rounded-md border border-primary/10">
                                                            {c}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {item.objective && (
                                            <div className="mb-4">
                                                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">Objective</p>
                                                <p className="text-sm font-bold text-neutral-700 dark:text-slate-300">{item.objective}</p>
                                            </div>
                                        )}

                                        {item.hint && (
                                            <div className="flex items-start gap-2 p-3 bg-white dark:bg-slate-900 rounded-xl border border-neutral-100 dark:border-slate-700/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                <Sparkles size={14} className="text-amber-500 mt-0.5 fill-current" />
                                                <p className="text-[10px] font-bold text-neutral-500 leading-relaxed italic">Hint: {item.hint}</p>
                                            </div>
                                        )}

                                        {item.tradeoffs && (
                                            <div className="flex items-start gap-2 p-3 bg-white dark:bg-slate-900 rounded-xl border border-neutral-100 dark:border-slate-700/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                <CheckCircle2 size={14} className="text-primary mt-0.5" />
                                                <p className="text-[10px] font-bold text-neutral-500 leading-relaxed italic">Trade-off focus: {item.tradeoffs}</p>
                                            </div>
                                        )}

                                        {item.focus && (
                                            <div className="flex items-start gap-2 p-3 bg-white dark:bg-slate-900 rounded-xl border border-neutral-100 dark:border-slate-700/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                <Sparkles size={14} className="text-primary mt-0.5" />
                                                <p className="text-[10px] font-bold text-neutral-500 leading-relaxed italic">Interviewer Focus: {item.focus}</p>
                                            </div>
                                        )}
                                        
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0 translate-x-4">
                                            <ChevronRight size={20} className="text-primary" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                        <div className="p-8 border-t border-neutral-50 dark:border-slate-800">
                            <Button className="w-full h-12 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-xs gap-2 shadow-lg shadow-primary/20">
                                Start Active Practice Round <ChevronRight size={16} />
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-neutral-100 dark:border-slate-800">
                <div className="space-y-2">
                    <h2 className="text-4xl font-black text-neutral-800 dark:text-white tracking-tighter">Interview <span className="text-primary">Rounds</span> Preparation</h2>
                    <p className="text-sm font-bold text-neutral-500">Comprehensive curriculum-based simulation for modern technical interviews.</p>
                </div>
                <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-2 pl-4 rounded-2xl border border-neutral-100 dark:border-slate-800 h-14">
                    <div className="flex flex-col px-4 border-r border-neutral-100 dark:border-slate-800">
                        <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Active Plan</span>
                        <span className="text-xs font-black text-primary uppercase">90-Min Full Mock</span>
                    </div>
                    <Button className="h-full px-6 bg-primary rounded-xl font-black uppercase tracking-widest text-[10px] border-0 shadow-lg shadow-primary/20 gap-2">
                        Initialize Session <Zap size={14} className="fill-current" />
                    </Button>
                </div>
            </div>

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-nowrap overflow-x-auto gap-6 pb-4 scrollbar-thin"
            >
                {rounds.map((round) => (
                    <motion.div key={round.id} variants={itemVariants} className="min-w-[320px] flex-1">
                        <Card 
                            onClick={() => {
                                if (round.id === 'aptitude') {
                                    navigate('/aptitude-practice');
                                } else {
                                    setSelectedRoundId(round.id);
                                }
                            }}
                            className="group relative h-full overflow-hidden border-0 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer"
                        >
                            <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${round.gradient}`} />
                            <div className="p-8 flex flex-col h-full items-center text-center">
                                <div className={`w-20 h-20 rounded-3xl mb-6 flex items-center justify-center text-white bg-gradient-to-br ${round.gradient} shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                                    <round.icon size={36} />
                                </div>
                                <h3 className="text-xl font-black text-neutral-800 dark:text-white mb-2 uppercase tracking-widest">{round.title}</h3>
                                <p className="text-sm font-medium text-neutral-500 dark:text-slate-400 mb-6 leading-relaxed px-4">
                                    {round.description}
                                </p>

                                <div className="flex items-center gap-6 mb-8 bg-neutral-50 dark:bg-slate-800/50 p-3 rounded-2xl w-full justify-center">
                                    <div className="flex flex-col items-center">
                                        <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Questions</span>
                                        <span className={`text-sm font-black text-${round.color}-500`}>{round.questions}</span>
                                    </div>
                                    <div className="w-px h-8 bg-neutral-200 dark:bg-slate-700" />
                                    <div className="flex flex-col items-center">
                                        <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Duration</span>
                                        <span className={`text-sm font-black text-${round.color}-500`}>{round.duration}</span>
                                    </div>
                                </div>

                                <Button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (round.id === 'aptitude') {
                                            navigate('/aptitude-practice');
                                        } else {
                                            navigate('/interview');
                                        }
                                    }}
                                    className={`w-full py-6 rounded-2xl bg-${round.color}-500 hover:bg-${round.color}-600 text-white font-black uppercase tracking-widest text-[10px] gap-2 shadow-lg shadow-${round.color}-500/20`}
                                >
                                    Start Practice Round <ChevronRight size={14} />
                                </Button>

                            </div>
                            
                            {/* Hover elements */}
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-10 transition-opacity">
                                <Sparkles size={60} />
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>

            
            <style>{`
                .glass-premium {
                    background: rgba(255, 255, 255, 0.7);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                }
            `}</style>
        </div>
    );
};

export default InterviewRoundsPrep;
