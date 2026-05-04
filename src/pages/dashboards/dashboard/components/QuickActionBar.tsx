import { Button } from "@/components/ui/button";
import { Code2, Cpu, Users, Zap } from "lucide-react";

const QuickActionBar = () => {
    const actions = [
        { label: "Practice JS", icon: <Zap size={16} />, color: "text-yellow-500", bg: "bg-yellow-500/10" },
        { label: "Practice DSA", icon: <Code2 size={16} />, color: "text-blue-500", bg: "bg-blue-500/10" },
        { label: "HR Questions", icon: <Users size={16} />, color: "text-purple-500", bg: "bg-purple-500/10" },
        { label: "System Design", icon: <Cpu size={16} />, color: "text-green-500", bg: "bg-green-500/10" },
    ];

    return (
        <div className="flex flex-wrap items-center justify-center gap-4 py-2">
            {actions.map((action, idx) => (
                <Button 
                    key={idx}
                    variant="outline" 
                    className="h-10 rounded-xl border-dashed border-neutral-300 dark:border-slate-700 hover:border-primary hover:bg-primary/5 transition-all flex items-center gap-2 group"
                >
                    <div className={`p-1.5 rounded-lg ${action.bg} ${action.color} group-hover:scale-110 transition-transform`}>
                        {action.icon}
                    </div>
                    <span className="text-xs font-bold text-neutral-600 dark:text-slate-300 group-hover:text-primary transition-colors">
                        {action.label}
                    </span>
                </Button>
            ))}
        </div>
    );
};

export default QuickActionBar;
