import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, ArrowRight, Sparkles } from "lucide-react";

const AiInsightCard = () => {
    return (
        <Card className="bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent border-indigo-100 dark:border-indigo-900/30 rounded-3xl overflow-hidden shadow-sm">
            <CardContent className="p-6">
                <div className="flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-indigo-500 text-white shadow-lg shadow-indigo-500/20">
                        <Lightbulb size={24} />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">AI Coach Says</span>
                            <Sparkles size={12} className="text-yellow-500" />
                        </div>
                        <h4 className="text-lg font-bold text-neutral-800 dark:text-white mb-2">Focus on System Design today.</h4>
                        <p className="text-sm text-neutral-600 dark:text-slate-400 leading-relaxed mb-4">
                            Your recent JS performance is excellent, but your "Scalability" scores have dipped by 15%. 
                            Practicing Load Balancing scenarios will help you reach a "Senior" readiness level.
                        </p>
                        <button className="flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:gap-3 transition-all">
                            View Roadmap <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default AiInsightCard;
