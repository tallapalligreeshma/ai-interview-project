
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timer, Brain, Layers, ChevronRight } from "lucide-react";

export default function PracticeSection() {
  const options = [
    { title: 'Topic-wise Practice', desc: 'Focus on one subject at a time.', icon: Layers, color: 'blue' },
    { title: 'Mixed Quiz', desc: 'Random questions to test versatility.', icon: Brain, color: 'purple' },
    { title: 'Timed Test', desc: 'Simulate real exam pressure.', icon: Timer, color: 'rose' }
  ];

  return (
    <section className="space-y-6">
        <h2 className="text-2xl font-black text-neutral-900 dark:text-white flex items-center gap-2 uppercase tracking-tight">
            <span className="p-1.5 bg-primary/10 text-primary rounded-lg">🎯</span>
            Practice Modes
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {options.map((option, idx) => (
                <Card key={idx} className="p-8 bg-white dark:bg-slate-900 border-neutral-100 dark:border-slate-800 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer">
                    <div className="flex flex-col items-center text-center">
                        <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center bg-slate-50 dark:bg-slate-800 text-slate-600 transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:rotate-6 group-hover:scale-110`}>
                            <option.icon size={32} />
                        </div>
                        <h3 className="text-xl font-black text-neutral-900 dark:text-white mb-2">{option.title}</h3>
                        <p className="text-sm font-medium text-neutral-500 mb-8 leading-relaxed px-4">
                            {option.desc}
                        </p>
                        <Button variant="outline" className="rounded-xl px-6 border-neutral-100 dark:border-slate-800 font-black uppercase text-[10px] tracking-widest h-10 group-hover:border-primary group-hover:text-primary transition-all gap-2">
                            Select Mode
                            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                </Card>
            ))}
        </div>
    </section>
  );
}
