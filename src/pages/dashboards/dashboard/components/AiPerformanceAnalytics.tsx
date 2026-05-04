import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart3, Lightbulb, Sparkles, TrendingUp } from "lucide-react";

const AiPerformanceAnalytics = () => {
    const skills = [
        { name: "DSA", value: 65, color: "bg-yellow-500" },
        { name: "System Design", value: 40, color: "bg-red-500" },
        { name: "Communication", value: 80, color: "bg-green-500" },
        { name: "Problem Solving", value: 70, color: "bg-green-500" },
        { name: "Aptitude", value: 75, color: "bg-green-500" },
    ];

    const insights = [
        { text: "Focus more on DSA for better job opportunities", type: "warning" },
        { text: "System Design is weak, practice low-level architecture", type: "error" },
        { text: "Your communication skills are strong 👍", type: "success" },
    ];

    return (
        <div className="space-y-6">
            <Card className="bg-white dark:bg-slate-900 border-neutral-100 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden h-full">
                <CardHeader className="p-6">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-primary/10 text-primary rounded-xl">
                            <BarChart3 size={20} />
                        </div>
                        <CardTitle className="text-xl font-bold tracking-tight">AI Interview Performance Analytics</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="p-6 pt-0 space-y-6">
                    <div className="space-y-5">
                        {skills.map((skill) => (
                            <div key={skill.name} className="space-y-2 group">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-bold text-neutral-700 dark:text-slate-300 group-hover:text-primary transition-colors">{skill.name}</span>
                                    <div className="flex items-center gap-2">
                                        <TrendingUp size={12} className={skill.value > 50 ? "text-green-500" : "text-red-500"} />
                                        <span className="font-black text-neutral-900 dark:text-white">{skill.value}%</span>
                                    </div>
                                </div>
                                <Progress 
                                    value={skill.value} 
                                    className="h-2.5 bg-neutral-100 dark:bg-slate-800" 
                                    indicatorClassName={skill.color}
                                />
                            </div>
                        ))}
                    </div>

                    {/* AI Insights Panel */}
                    <div className="pt-6 border-t border-neutral-100 dark:border-slate-800">
                        <div className="flex items-center gap-2 mb-4">
                            <Lightbulb size={18} className="text-amber-500" />
                            <h4 className="text-[15px] font-bold text-neutral-900 dark:text-white">AI Coach Insights</h4>
                        </div>
                        <div className="space-y-3">
                            {insights.map((insight, idx) => (
                                <div 
                                    key={idx} 
                                    className={`p-3 rounded-2xl flex gap-3 items-start transition-all hover:scale-[1.02] border ${
                                        insight.type === 'warning' 
                                        ? 'bg-amber-50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-900/30 text-amber-800 dark:text-amber-300' 
                                        : insight.type === 'error'
                                        ? 'bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-900/30 text-red-800 dark:text-red-300'
                                        : 'bg-green-50 dark:bg-green-900/10 border-green-100 dark:border-green-900/30 text-green-800 dark:text-green-300'
                                    }`}
                                >
                                    <div className="mt-1">
                                        <Sparkles size={14} className="opacity-70" />
                                    </div>
                                    <p className="text-xs font-bold leading-relaxed">{insight.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AiPerformanceAnalytics;
