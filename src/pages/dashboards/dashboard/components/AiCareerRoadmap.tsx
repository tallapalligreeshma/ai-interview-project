import { CheckCircle2, Circle, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AiCareerRoadmap = () => {
    const steps = [
        { id: 1, title: "Strengthen DSA Fundamentals", level: "Beginner", status: "completed" },
        { id: 2, title: "Practice Coding Problems", level: "Medium", status: "current" },
        { id: 3, title: "Learn System Design Basics", level: "Advanced", status: "upcoming" },
        { id: 4, title: "Build Real Projects", level: "Hands-on", status: "upcoming" },
        { id: 5, title: "Practice Mock Interviews", level: "Expert", status: "upcoming" },
        { id: 6, title: "Apply to Companies", level: "Career", status: "upcoming" },
    ];

    const progressValue = 35; // Example progress

    return (
        <Card className="bg-white dark:bg-slate-900 border-neutral-100 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden">
            <CardHeader className="p-6 pb-2">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-primary/10 text-primary rounded-xl">
                            <MapPin size={20} />
                        </div>
                        <CardTitle className="text-xl font-bold tracking-tight">Your AI Career Roadmap</CardTitle>
                    </div>
                    <Button className="bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl shadow-lg shadow-primary/20 flex items-center gap-2 group">
                        <Sparkles size={16} className="group-hover:animate-pulse" />
                        Generate My AI Roadmap
                    </Button>
                </div>
                
                <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-end">
                        <span className="text-sm font-bold text-neutral-600 dark:text-slate-400">Preparation Progress</span>
                        <span className="text-lg font-black text-primary">{progressValue}%</span>
                    </div>
                    <Progress value={progressValue} className="h-2.5 bg-neutral-100 dark:bg-slate-800" />
                </div>
            </CardHeader>

            <CardContent className="p-6 pt-2">
                <div className="relative space-y-0">
                    {/* Vertical Line */}
                    <div className="absolute left-[15px] top-6 bottom-6 w-0.5 bg-neutral-100 dark:bg-slate-800" />

                    {steps.map((step) => (
                        <div key={step.id} className="relative pl-10 pb-8 last:pb-0 group">
                            {/* Status Icon */}
                            <div className={`absolute left-0 top-0.5 z-10 p-1 rounded-full transition-all duration-300 ${
                                step.status === 'completed' 
                                ? 'bg-green-500 text-white' 
                                : step.status === 'current'
                                ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-125'
                                : 'bg-neutral-100 dark:bg-slate-800 text-neutral-300'
                            }`}>
                                {step.status === 'completed' ? <CheckCircle2 size={16} /> : <Circle size={16} className={step.status === 'current' ? 'fill-current' : ''} />}
                            </div>

                            <div className={`flex flex-col transition-all duration-300 ${
                                step.status === 'upcoming' ? 'opacity-50 grayscale' : 'opacity-100'
                            }`}>
                                <div className="flex items-center gap-3 mb-1">
                                    <h4 className={`text-[15px] font-bold ${
                                        step.status === 'current' ? 'text-primary' : 'text-neutral-800 dark:text-white'
                                    }`}>
                                        Step {step.id} → {step.title}
                                    </h4>
                                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                                        step.status === 'completed' 
                                        ? 'border-green-200 text-green-600' 
                                        : 'border-neutral-200 text-neutral-500 dark:border-slate-700'
                                    }`}>
                                        {step.level}
                                    </span>
                                </div>
                                <p className="text-xs text-neutral-500 dark:text-slate-400">
                                    {step.status === 'completed' 
                                        ? 'Great job! You have mastered the fundamentals.' 
                                        : step.status === 'current'
                                        ? 'Recommended: Solve 5 LeetCode medium problems today.'
                                        : 'Locked. Master current step to unlock.'}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default AiCareerRoadmap;
