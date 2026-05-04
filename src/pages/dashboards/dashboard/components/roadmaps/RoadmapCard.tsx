import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Roadmap } from "@/data/roadmapData";
import { ArrowRight, Clock, Star } from "lucide-react";

interface RoadmapCardProps {
    roadmap: Roadmap;
    onSelect: (id: string) => void;
}

const RoadmapCard = ({ roadmap, onSelect }: RoadmapCardProps) => {
    return (
        <Card className="group overflow-hidden glass-premium-blue border-white/5 hover:border-white/10 hover:shadow-[0_0_40px_rgba(99,102,241,0.2)] smooth-transition cursor-pointer flex flex-col h-full rounded-[2rem]">
            <div className={`h-1.5 w-full bg-gradient-to-r ${roadmap.color}`} />
            <CardHeader className="p-8 pb-4 text-center relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${roadmap.color} opacity-0 group-hover:opacity-10 blur-2xl rounded-full smooth-transition`} />
                
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${roadmap.color} text-white flex items-center justify-center shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 smooth-transition border border-white/10`}>
                    <roadmap.icon size={32} />
                </div>
                
                <div className="flex justify-center gap-2 mb-4">
                    <Badge variant="secondary" className="bg-white/5 text-slate-500 text-[10px] font-black uppercase tracking-widest border border-white/5 px-4 py-1 rounded-full">
                        {roadmap.level}
                    </Badge>
                </div>
                
                <CardTitle className="text-2xl font-black text-white leading-tight tracking-tight italic">
                    {roadmap.title}
                </CardTitle>
            </CardHeader>

            <CardContent className="p-8 pt-0 flex-1 space-y-6 relative z-10">
                <p className="text-sm text-slate-400 leading-relaxed font-medium line-clamp-2">
                    {roadmap.description}
                </p>
                
                <div className="flex flex-wrap gap-3">
                    {roadmap.includes.slice(0, 3).map(item => (
                        <span key={item} className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
                            <Star size={12} className="text-amber-400" /> {item}
                        </span>
                    ))}
                    {roadmap.includes.length > 3 && (
                        <span className="text-[10px] font-black text-[#6366F1] uppercase tracking-widest px-3 py-1.5">+{roadmap.includes.length - 3}</span>
                    )}
                </div>

                <div className="space-y-3 pt-6 border-t border-white/5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <Clock size={16} className="text-[#6366F1]" />
                            {roadmap.duration}
                        </div>
                        <div className="text-[10px] font-black text-[#22D3EE] uppercase tracking-[0.2em]">
                            {roadmap.progress}% Sync
                        </div>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden p-[1px]">
                        <div 
                            className={`h-full bg-gradient-to-r ${roadmap.color} rounded-full smooth-transition shadow-[0_0_10px_rgba(99,102,241,0.3)]`} 
                            style={{ width: `${roadmap.progress}%` }} 
                        />
                    </div>
                </div>
            </CardContent>

            <CardFooter className="p-8 pt-0">
                <Button 
                    onClick={() => onSelect(roadmap.id)}
                    className="w-full bg-white text-slate-950 hover:bg-[#6366F1] hover:text-white font-black uppercase tracking-[0.2em] rounded-2xl h-14 flex items-center justify-center gap-3 group/btn smooth-transition shadow-xl text-[10px]"
                >
                    Deploy Roadmap
                    <ArrowRight size={20} className="group-hover/btn:translate-x-2 smooth-transition" />
                </Button>
            </CardFooter>
        </Card>
    );
};

export default RoadmapCard;
