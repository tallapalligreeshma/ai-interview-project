import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { 
    MessageSquare, 
    Calendar, 
    FileText, 
    Lightbulb,
    ChevronRight
} from "lucide-react";

const AiPracticeHub = () => {
    const tools = [
        {
            title: "Mock Interview",
            description: "Simulate real interview with AI questions and live feedback.",
            icon: MessageSquare,
            color: "text-blue-500",
            bg: "bg-blue-50 dark:bg-blue-900/10",
            action: "Start Now"
        },
        {
            title: "Daily Question",
            description: "Get one daily high-probability technical question for practice.",
            icon: Calendar,
            color: "text-amber-500",
            bg: "bg-amber-50 dark:bg-amber-900/10",
            action: "Practice"
        },
        {
            title: "Resume Q&A",
            description: "Generate deep-dive technical questions based on your resume.",
            icon: FileText,
            color: "text-emerald-500",
            bg: "bg-emerald-50 dark:bg-emerald-900/10",
            action: "Generate"
        },
        {
            title: "Skill Test",
            description: "Assess your DSA, SQL, or JavaScript skills with timed tests.",
            icon: Lightbulb,
            color: "text-purple-500",
            bg: "bg-purple-50 dark:bg-purple-900/10",
            action: "Take Test"
        }
    ];

    const handleAction = (title: string) => {
        alert(`${title} module is being initialized...`);
    };

    return (
        <section className="space-y-6 mt-12">
            <div>
                <h2 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                    <span className="p-1.5 bg-primary/10 text-primary rounded-lg uppercase text-[10px] font-black tracking-widest">Interactive</span>
                    AI Practice Hub
                </h2>
                <p className="text-sm text-neutral-500 dark:text-slate-400 mt-1">Hone your skills with our advanced AI-powered preparation tools</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {tools.map((tool, idx) => (
                    <Card 
                        key={idx} 
                        className="group glass-premium-blue border-white/5 hover:border-[#6366F1]/40 transition-all duration-500 cursor-pointer overflow-hidden transform hover:-translate-y-2 smooth-transition"
                        onClick={() => handleAction(tool.title)}
                    >
                        <CardHeader className="p-6">
                            <div className="flex justify-between items-start mb-5">
                                <div className={`p-4 rounded-2xl ${tool.bg} ${tool.color} group-hover:scale-110 group-hover:bg-[#6366F1]/20 transition-all duration-500 shadow-inner`}>
                                    <tool.icon size={26} className="smooth-transition" />
                                </div>
                                <div className="p-2 rounded-full bg-white/5 text-slate-500 group-hover:text-[#22D3EE] group-hover:bg-[#6366F1]/20 transition-all">
                                    <ChevronRight size={18} />
                                </div>
                            </div>
                            <CardTitle className="text-xl font-bold mb-2 text-white group-hover:text-[#22D3EE] transition-colors">
                                {tool.title}
                            </CardTitle>
                            <CardContent className="p-0">
                                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                                    {tool.description}
                                </p>
                                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#6366F1] group-hover:text-[#22D3EE] group-hover:underline underline-offset-4 transition-all">
                                    {tool.action}
                                </span>
                            </CardContent>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default AiPracticeHub;
