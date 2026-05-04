import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

export interface InterviewRoundCardProps {
    id: string;
    title: string;
    desc: string;
    color: string;
    icon?: any;
    questions?: number;
    time?: string;
    onSelect: (id: string, title: string) => void;
}

const InterviewRoundCard = ({ id, title, desc, color, icon: Icon, onSelect }: InterviewRoundCardProps) => {
    const gradients: Record<string, string> = {
        orange: "from-orange-500 to-amber-600",
        blue: "from-blue-600 to-indigo-700",
        purple: "from-purple-600 to-fuchsia-700",
        green: "from-emerald-600 to-teal-700",
        default: "from-slate-600 to-slate-800"
    };

    // Safe fallback if icon is somehow undefined/missing
    const SafeIcon = Icon || HelpCircle;
    const gradient = gradients[color] || gradients.default;

    return (
        <Card 
            onClick={() => onSelect(id, title)}
            className={`relative group h-[340px] border-none rounded-[3rem] overflow-hidden cursor-pointer shadow-xl transition-all duration-500 hover:-translate-y-4`}
        >
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90 group-hover:scale-110 transition-transform duration-700`} />
            <CardContent className="relative z-10 h-full p-8 flex flex-col items-center text-center justify-between text-white">
                <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-2xl border border-white/20 group-hover:rotate-12 transition-transform duration-500">
                    <SafeIcon size={40} />
                </div>
                <div className="space-y-3">
                    <h3 className="text-xl font-black uppercase tracking-widest leading-tight">{title}</h3>
                    <div className="h-[2px] w-12 bg-white/30 mx-auto rounded-full" />
                    <p className="text-[9px] font-black uppercase tracking-[0.15em] text-white/80 leading-relaxed max-w-[180px]">
                        {desc}
                    </p>
                </div>
                <Button className="w-full bg-white text-slate-900 rounded-2xl h-14 font-black uppercase tracking-widest text-xs">
                    Start Session
                </Button>
            </CardContent>
        </Card>
    );
};

export default InterviewRoundCard;
