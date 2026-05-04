import { Card } from "@/components/ui/card";
import { Award, CheckCircle, Flame, Mic, XCircle, ArrowRight, Brain, Target, Zap } from "lucide-react";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CardData {
  title: string;
  value: string;
  icon: React.ElementType;
  iconBg: string;
  accentColor: string;
  growth: string;
  description: string;
  interactive?: boolean;
};

const cardsDatas: CardData[] = [
  {
    title: "Interviews Taken",
    value: "128",
    icon: Mic,
    iconBg: "bg-indigo-500/10",
    accentColor: "text-indigo-400",
    growth: "+12",
    description: "This month",
  },
  {
    title: "Average Score",
    value: "82%",
    icon: Award,
    iconBg: "bg-violet-500/10",
    accentColor: "text-violet-400",
    growth: "+5%",
    description: "Vs last month",
    interactive: true,
  },
  {
    title: "Strong Skills",
    value: "React, JS",
    icon: CheckCircle,
    iconBg: "bg-emerald-500/10",
    accentColor: "text-emerald-400",
    growth: "Top 10%",
    description: "Based on feedback",
    interactive: true,
  },
  {
    title: "Practice Streak",
    value: "7 Days",
    icon: Flame,
    iconBg: "bg-amber-500/10",
    accentColor: "text-amber-400",
    growth: "7 Day Flame",
    description: "Personal Best",
  },
];

const StatCard = () => {
  const renderModalContent = (title: string) => {
    if (title === "Weak Skills") {
       // ... simplified for brevity or could be modularized
    }
    return <p className="text-slate-400 text-sm font-body">Detailed insights for {title} coming soon to your neural link.</p>;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full perspective-800">
      {cardsDatas.map((card, index) => (
        <Dialog key={index}>
          <DialogTrigger asChild>
            <Card
              className={`group relative overflow-hidden glass-premium p-8 rounded-[2.5rem] border-white/5 transition-all duration-500 tilt-hover ${card.interactive ? 'cursor-pointer' : ''}`}
            >
              <div className="flex flex-col h-full relative z-10">
                <div className="flex items-start justify-between mb-8">
                  <div className={`p-4 ${card.iconBg} ${card.accentColor} rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                    <card.icon size={28} />
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1 font-heading">{card.title}</p>
                    <h3 className="text-4xl font-black text-white tracking-tighter font-heading">{card.value}</h3>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className={`px-4 py-1.5 rounded-full bg-white/5 ${card.accentColor} text-[10px] font-black uppercase tracking-widest`}>
                    {card.growth}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight italic font-body">{card.description}</span>
                </div>
              </div>
              
              {/* Decorative background glow */}
              <div className={`absolute -right-4 -bottom-4 w-24 h-24 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${card.iconBg.replace('bg-', 'bg-')}`} />
            </Card>
          </DialogTrigger>
          
          {card.interactive && (
            <DialogContent className="sm:max-w-[425px] rounded-[3rem] border-white/10 glass-premium shadow-2xl text-white">
              <DialogHeader>
                <DialogTitle className="text-3xl font-black flex items-center gap-4 font-heading text-white">
                  <div className={`w-12 h-12 ${card.iconBg} rounded-2xl flex items-center justify-center ${card.accentColor}`}>
                    <card.icon size={24} />
                  </div>
                  {card.title}
                </DialogTitle>
              </DialogHeader>
              <div className="py-8">
                {renderModalContent(card.title)}
              </div>
            </DialogContent>
          )}
        </Dialog>
      ))}
    </div>
  );
};

export default StatCard;
