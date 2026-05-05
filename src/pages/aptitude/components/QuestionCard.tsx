import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { AptitudeQuestion } from "@/data/aptitudeData";
import { ChevronUp, Eye, Zap, Target } from "lucide-react";
import { AnswerAccordion } from "./AnswerAccordion";
import { cn } from "@/lib/utils";

export function QuestionCard({ question }: { question: AptitudeQuestion }) {
  const [showAnswer, setShowAnswer] = useState(false);

  const difficultyColors = {
    'Easy': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]',
    'Medium': 'text-amber-400 bg-amber-500/10 border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.2)]',
    'Hard': 'text-rose-400 bg-rose-500/10 border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.2)]'
  };

  return (
    <Card className="group glass-premium-blue border-white/5 rounded-[2.5rem] shadow-2xl hover:border-[#6366F1]/30 smooth-transition overflow-hidden flex flex-col p-2">
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#6366F1]/10 text-[#6366F1] flex items-center justify-center border border-[#6366F1]/20 shadow-inner group-hover:scale-110 smooth-transition">
                        <Target size={18} />
                    </div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                        {question.category}
                    </span>
                </div>
                <Badge className={cn("border-0 text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full italic", difficultyColors[question.difficulty])}>
                    {question.difficulty}
                </Badge>
            </div>
            
            <h3 className="text-xl font-black text-white leading-tight tracking-tighter italic group-hover:text-gradient-cyan smooth-transition">
                {question.title}
            </h3>
            
            <div className="flex flex-wrap gap-3">
                {question.companies.map(company => (
                    <span key={company} className="text-[10px] font-black text-slate-400 bg-white/[0.03] px-3 py-1.5 rounded-xl border border-white/5 uppercase tracking-widest italic hover:text-white hover:bg-white/10 smooth-transition">
                        {company}
                    </span>
                ))}
            </div>
            
            <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                <Button 
                    className="flex-1 bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] text-white font-black uppercase text-[10px] tracking-widest rounded-2xl h-14 gap-3 smooth-transition shadow-inner"
                    onClick={() => {}} 
                >
                    <Eye size={18} className="text-[#6366F1]" />
                    Vector View
                </Button>
                <Button 
                    onClick={() => setShowAnswer(!showAnswer)}
                    className={cn(
                        "flex-1 rounded-2xl h-14 font-black uppercase text-[10px] tracking-[0.2em] gap-3 smooth-transition",
                        showAnswer 
                            ? "bg-[#6366F1] text-white shadow-[0_10px_30px_rgba(99,102,241,0.3)]" 
                            : "bg-white text-slate-950 hover:bg-[#22D3EE] hover:text-white"
                    )}
                >
                    {showAnswer ? <ChevronUp size={18} /> : <Zap size={18} className="fill-current" />}
                    {showAnswer ? 'Retract' : 'Decode'}
                </Button>
            </div>
        </div>

        <AnswerAccordion 
            isOpen={showAnswer} 
            explanation={question.explanation} 
            correctOption={question.correctOption} 
        />
        
        <style>{`
            .text-gradient-cyan {
                background: linear-gradient(to right, #6366F1, #22D3EE);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
        `}</style>
    </Card>
  );
}
