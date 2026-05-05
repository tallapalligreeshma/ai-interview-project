import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { AptitudeTopic } from "@/data/aptitudeData";
import { BookOpen, Clock, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { cn } from "@/lib/utils";

export function TopicCard({ topic }: { topic: AptitudeTopic }) {
  const navigate = useNavigate();
  
  const difficultyColors = {
    'Easy': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'Medium': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'Hard': 'bg-rose-500/10 text-rose-400 border-rose-500/20'
  };

  return (
    <div className="group relative p-[1px] rounded-[2.5rem] smooth-transition h-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#6366F1]/20 via-transparent to-[#22D3EE]/20 opacity-0 group-hover:opacity-100 smooth-transition" />
        
        <Card className="relative bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-[2.5rem] shadow-2xl group-hover:border-[#6366F1]/30 smooth-transition flex flex-col h-full overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 smooth-transition">
                <topic.icon size={80} />
            </div>

            <div className="p-8 flex flex-col flex-1 space-y-6 relative z-10">
                <div className="flex justify-between items-start">
                    <div className="p-4 bg-[#6366F1]/10 text-[#6366F1] rounded-2xl border border-[#6366F1]/20 group-hover:bg-[#6366F1] group-hover:text-white smooth-transition shadow-inner">
                        <topic.icon size={28} />
                    </div>
                    <Badge className={cn("border uppercase font-black tracking-widest text-[9px] px-3 py-1 rounded-lg", difficultyColors[topic.difficulty])}>
                        {topic.difficulty}
                    </Badge>
                </div>
                
                <div className="space-y-3">
                    <h3 className="text-2xl font-black text-white leading-tight tracking-tighter italic uppercase group-hover:text-gradient-cyan smooth-transition">
                        {topic.title}
                    </h3>

                    <p className="text-sm font-bold text-slate-400 line-clamp-2 leading-relaxed italic pr-4">
                        "{topic.description}"
                    </p>
                </div>

                <div className="flex items-center gap-6 text-[10px] font-black text-slate-500 uppercase tracking-widest mt-auto pt-6 border-t border-white/5">
                    <div className="flex items-center gap-2 group-hover:text-slate-300 smooth-transition">
                        <BookOpen size={14} className="text-[#6366F1]" />
                        24 Lessons
                    </div>
                    <div className="flex items-center gap-2 group-hover:text-slate-300 smooth-transition">
                        <Clock size={14} className="text-[#22D3EE]" />
                        2h 30m
                    </div>
                </div>
            </div>
            
            <div className="p-8 pt-0 mt-auto relative z-10">
                <Button 
                    onClick={() => navigate(`/aptitude/topic/${topic.id}`)}
                    className="w-full bg-white text-slate-950 hover:bg-[#6366F1] hover:text-white font-black uppercase text-[10px] tracking-[0.2em] rounded-2xl h-14 gap-3 smooth-transition shadow-4xl group-hover:scale-[1.02]"
                >
                    Initialize Sync
                    <Zap size={14} className="fill-current" />
                </Button>
            </div>
        </Card>
        
        <style>{`
            .text-gradient-cyan {
                background: linear-gradient(to right, #6366F1, #22D3EE);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
        `}</style>
    </div>
  );
}
