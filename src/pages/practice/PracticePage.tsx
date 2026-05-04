import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
    BookOpen, 
    Code2, 
    Brain, 
    MessageSquare, 
    Star,
    Search,
    Bookmark,
    RefreshCw,
    Sparkles,
    ShieldCheck
} from "lucide-react";
import { aiService } from "@/lib/AiService";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "react-toastify";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PracticePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("theory");
    const [searchQuery, setSearchQuery] = useState("");
    const [aiQuestions, setAiQuestions] = useState<any[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);

    const weakTopic = location.state?.weakTopic;

    useEffect(() => {
        if (weakTopic) {
            setSearchQuery(weakTopic);
            // Auto-select tab based on topic name (simplified logic)
            if (["Operating Systems", "DBMS", "OOPs"].some(t => weakTopic.includes(t))) {
                setActiveTab("theory");
            } else if (["Two Sum", "Cache", "Tree"].some(t => weakTopic.includes(t))) {
                setActiveTab("coding");
            }
        }
    }, [weakTopic]);

    const practiceData = {
        theory: [
            { title: "OOPs Principles", desc: "Understanding Encapsulation, Polymorphism, Inheritance.", difficulty: "Easy", questions: 45 },
            { title: "Database Normalization", desc: "Master 1NF, 2NF, 3NF and BCNF concepts.", difficulty: "Medium", questions: 30 },
            { title: "Operating Systems", desc: "Process scheduling and memory management.", difficulty: "Hard", questions: 50 },
            { title: "React Lifecycle", desc: "Hooks, Fiber, and Virtual DOM deep-dive.", difficulty: "Medium", questions: 25 },
        ],
        coding: [
            { title: "Two Sum Problem", desc: "Find indices that add up to a specific target.", difficulty: "Easy", solved: "85K" },
            { title: "Lru Cache", desc: "Implement Least Recently Used cache logic.", difficulty: "Medium", solved: "42K" },
            { title: "Merge K Sorted Lists", desc: "Advanced divide and conquer with heaps.", difficulty: "Hard", solved: "12K" },
        ],
        aptitude: [
            { title: "Time & Work", desc: "Pipes and cisterns, efficiency ratios.", difficulty: "Medium", duration: "10m" },
            { title: "Probability", desc: "Permutations, combinations and deck logic.", difficulty: "Hard", duration: "15m" },
            { title: "Number Systems", desc: "Divisibility rules and remainder theorems.", difficulty: "Easy", duration: "8m" },
        ],
        hr: [
            { title: "Tell me about yourself", desc: "Perfect your 90-second personal pitch.", duration: "5m" },
            { title: "Handling Conflicts", desc: "STAR method for difficult team scenarios.", duration: "10m" },
            { title: "Why should we hire you?", desc: "Connecting your value to business needs.", duration: "8m" },
        ]
    };

    const handleGeneratePractice = async (topic: string) => {
        setIsGenerating(true);
        setAiQuestions([]);
        try {
            const data = await aiService.generateModuleResponse("practice", { role: "Developer", topic });
            setAiQuestions(data.questions || []);
        } catch (error) {
            toast.error("Generation failed.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="flex flex-col gap-8 p-4 lg:p-8 max-w-[1600px] mx-auto w-full animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h2 className="text-4xl font-black text-neutral-900 dark:text-white tracking-tight">Practice <span className="text-primary">Library</span></h2>
                    <p className="text-neutral-500 font-medium font-medium">Over 2,000+ hand-picked questions to sharpen your skills.</p>
                </div>
                <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-neutral-100 dark:border-slate-800 shadow-sm w-full md:w-96">
                    <Search className="ml-3 text-neutral-400" size={18} />
                    <Input 
                        placeholder="Search questions..." 
                        className="border-none focus:ring-0 text-sm" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {weakTopic && (
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center gap-3"
                >
                    <div className="p-2 bg-amber-500 text-white rounded-lg">
                        <Star size={16} className="fill-current" />
                    </div>
                    <div>
                        <p className="text-xs font-black uppercase text-amber-600 tracking-widest">Recommended for You</p>
                        <p className="text-sm font-bold text-neutral-700 dark:text-slate-300">Focusing on your weak area: <span className="text-amber-600 italic">"{weakTopic}"</span></p>
                    </div>
                </motion.div>
            )}

            <Tabs value={activeTab} className="w-full" onValueChange={setActiveTab}>
                <TabsList className="bg-transparent border-b border-neutral-100 dark:border-slate-800 h-16 w-full justify-start gap-8 rounded-none px-0 mb-8 overflow-x-auto overflow-y-hidden">
                    {[
                        { id: "theory", title: "Theory", icon: BookOpen },
                        { id: "coding", title: "Coding", icon: Code2 },
                        { id: "aptitude", title: "Aptitude", icon: Brain },
                        { id: "hr", title: "HR Bank", icon: MessageSquare }
                    ].map((tab) => (
                        <TabsTrigger 
                            key={tab.id}
                            value={tab.id} 
                            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-4 data-[state=active]:border-primary border-transparent rounded-none px-2 h-full text-sm font-black uppercase tracking-widest gap-2 text-neutral-400 data-[state=active]:text-primary transition-all"
                        >
                            <tab.icon size={18} /> {tab.title}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <TabsContent value={activeTab} className="mt-0 outline-none">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                {(practiceData as any)[activeTab].map((item: any, idx: number) => (
                                    <Card key={idx} className="bg-white dark:bg-slate-900 border-neutral-100 dark:border-slate-800 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all group overflow-hidden">
                                        <CardContent className="p-8 flex flex-col h-full">
                                            <div className="flex items-center justify-between mb-4">
                                                {item.difficulty && (
                                                    <Badge className={`border-0 font-black uppercase tracking-widest text-[9px] px-3 py-1 ${
                                                        item.difficulty === 'Easy' ? 'bg-green-500/10 text-green-500' :
                                                        item.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-500' :
                                                        'bg-rose-500/10 text-rose-500'
                                                    }`}>
                                                        {item.difficulty}
                                                    </Badge>
                                                )}
                                                {item.duration && (
                                                    <Badge className="bg-neutral-100 dark:bg-slate-800 text-neutral-500 border-0 font-black uppercase tracking-widest text-[9px] px-3 py-1">
                                                        {item.duration}
                                                    </Badge>
                                                )}
                                                <Button variant="ghost" size="icon" className="text-neutral-300 hover:text-primary rounded-xl">
                                                    <Bookmark size={18} />
                                                </Button>
                                            </div>

                                            <h3 className="text-xl font-black text-neutral-800 dark:text-white mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                                            <p className="text-sm font-medium text-neutral-500 dark:text-slate-400 mb-8 leading-relaxed">
                                                {item.desc}
                                            </p>

                                            <div className="mt-auto flex items-center justify-between pt-6 border-t border-neutral-50 dark:border-slate-800">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                                                        {item.questions ? "Questions" : "Solved By"}
                                                    </span>
                                                    <span className="text-sm font-black text-neutral-800 dark:text-white">
                                                        {item.questions || item.solved || "Unlimited"}
                                                    </span>
                                                </div>
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button 
                                                                onClick={() => handleGeneratePractice(item.title)}
                                                                className="rounded-2xl bg-neutral-100 dark:bg-slate-800 hover:bg-primary hover:text-white text-neutral-600 font-black uppercase tracking-widest text-[10px] h-10 px-6 gap-2 border-0 shadow-none transition-all"
                                                            >
                                                                View AI Guide <Sparkles size={14} />
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="max-w-3xl bg-white dark:bg-slate-950 border-none rounded-[3rem] p-0 overflow-hidden">
                                                            <div className="p-10 border-b border-neutral-100 dark:border-slate-800 flex items-center justify-between">
                                                                <div className="flex items-center gap-4">
                                                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                                                                        <BookOpen size={24} />
                                                                    </div>
                                                                    <div>
                                                                        <h3 className="text-xl font-black uppercase tracking-tight dark:text-white">{item.title} Study Guide</h3>
                                                                        <p className="text-[10px] font-black text-primary uppercase tracking-widest">AI Generated • v4.3</p>
                                                                    </div>
                                                                </div>
                                                                {isGenerating && <RefreshCw size={20} className="animate-spin text-primary" />}
                                                            </div>
                                                            <div className="p-10 max-h-[70vh] overflow-y-auto space-y-8 scrollbar-thin">
                                                                {isGenerating ? (
                                                                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                                                                        <div className="w-16 h-1 bg-primary/20 rounded-full overflow-hidden">
                                                                            <motion.div initial={{ x: -100 }} animate={{ x: 100 }} transition={{ repeat: Infinity, duration: 1 }} className="w-1/2 h-full bg-primary" />
                                                                        </div>
                                                                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Generating hand-picked challenges...</p>
                                                                    </div>
                                                                ) : (
                                                                    aiQuestions.map((q, qi) => (
                                                                        <div key={qi} className="space-y-4">
                                                                            <div className="flex items-start gap-4">
                                                                                <span className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-[10px] shrink-0 mt-1">{qi+1}</span>
                                                                                <h4 className="text-lg font-bold dark:text-white leading-tight">{q.question}</h4>
                                                                            </div>
                                                                            <div className="p-6 bg-primary/5 border border-primary/10 rounded-2xl space-y-3">
                                                                                <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest">
                                                                                    <ShieldCheck size={14} /> Expert Explanation
                                                                                </div>
                                                                                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed italic">
                                                                                    {q.explanation}
                                                                                </p>
                                                                                <div className="pt-3 border-t border-primary/10">
                                                                                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Optimal Answer Phrase</p>
                                                                                    <p className="text-sm font-bold text-slate-800 dark:text-white italic">"{q.answer}"</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))
                                                                )}
                                                            </div>
                                                        </DialogContent>
                                                    </Dialog>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                    </motion.div>
                </AnimatePresence>
            </Tabs>
        </div>
    );
};

export default PracticePage;
