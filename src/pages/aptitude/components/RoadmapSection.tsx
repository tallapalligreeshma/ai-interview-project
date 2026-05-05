
import { roadmapSteps } from "@/data/aptitudeData";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
    CheckCircle2, 
    Circle, 
    Target, 
    Zap, 
    Trophy,
    BookOpen,
    Activity,
    Sparkles,
    ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function RoadmapSection() {
  const navigate = useNavigate();

  const getIcon = (level: string) => {
    switch(level) {
        case 'Basics': return <BookOpen size={20} />;
        case 'Intermediate': return <Activity size={20} />;
        case 'Advanced': return <Zap size={20} />;
        case 'Practice': return <Trophy size={20} />;
        default: return <Target size={20} />;
    }
  };

  const handleLevelClick = (level: string) => {
    if (level === 'Practice') {
        navigate('/aptitude/mock-tests');
    } else {
        navigate(`/aptitude/${level.toLowerCase()}`);
    }
  };

  return (
    <section className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-2">
                <h2 className="text-3xl font-black text-white flex items-center gap-4 uppercase tracking-tighter italic">
                    <div className="w-12 h-12 rounded-2xl bg-[#6366F1]/10 flex items-center justify-center border border-[#6366F1]/20">
                        <Map size={24} className="text-[#6366F1]" />
                    </div>
                    Neural <span className="text-gradient-cyan">Blueprint</span>
                </h2>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-16">Cognitive progression roadmap</p>
            </div>
            
            <div className="flex items-center gap-4 glass-premium-blue px-6 py-3 rounded-2xl border-white/5 shadow-inner">
                <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                        <div key={i} className={cn(
                            "w-10 h-10 rounded-full border-2 border-[#0B0F1A] flex items-center justify-center text-[10px] font-black smooth-transition",
                            i === 1 ? "bg-[#6366F1] text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]" : "bg-white/5 text-slate-500"
                        )}>
                            0{i}
                        </div>
                    ))}
                </div>
                <div className="w-[1px] h-8 bg-white/10 mx-2" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#22D3EE]">Mastery Protocol</span>
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {roadmapSteps.map((step, idx) => (
                <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="h-full"
                >
                    <div 
                        onClick={() => handleLevelClick(step.level)}
                        className="group relative h-full glass-premium-blue border-white/5 rounded-[2.5rem] p-8 shadow-4xl hover:border-[#6366F1]/30 smooth-transition cursor-pointer overflow-hidden flex flex-col"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] group-hover:scale-110 smooth-transition">
                            {getIcon(step.level)}
                        </div>

                        <div className="space-y-6 flex-1 relative z-10">
                            {/* Step Indicator */}
                            <div className="flex items-center justify-between">
                                <div className={cn(
                                    "w-14 h-14 rounded-2xl flex items-center justify-center border smooth-transition shadow-inner group-hover:scale-110",
                                    idx === 0 
                                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                                        : "bg-white/5 text-slate-500 border-white/5"
                                )}>
                                    {idx === 0 ? <CheckCircle2 size={28} /> : <Circle size={28} />}
                                </div>
                                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest italic group-hover:text-[#6366F1] smooth-transition">Vector_0{idx + 1}</span>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic leading-none group-hover:text-gradient-cyan smooth-transition">
                                    {step.title}
                                </h3>
                                <div className="text-[10px] font-black text-[#6366F1] uppercase tracking-[0.3em] flex items-center gap-2">
                                    <Sparkles size={12} />
                                    {step.subtitle}
                                </div>
                            </div>

                            <p className="text-sm font-bold text-slate-400 leading-relaxed italic pr-4">
                                "{step.goal}"
                            </p>

                            <div className="flex flex-wrap gap-2 pt-4">
                                {step.topics.slice(0, 3).map((topic, i) => (
                                    <span key={i} className="px-3 py-1.5 bg-white/[0.03] rounded-xl text-[9px] font-black text-slate-500 border border-white/5 uppercase tracking-widest italic hover:text-white hover:bg-white/10 smooth-transition">
                                        {topic}
                                    </span>
                                ))}
                                {step.topics.length > 3 && (
                                    <span className="text-[9px] font-black text-[#22D3EE] uppercase tracking-widest pt-1.5 italic">+{step.topics.length - 3} Units</span>
                                )}
                            </div>
                        </div>

                        <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between group-hover:border-white/10 smooth-transition relative z-10">
                            <div className="space-y-1">
                                <div className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Expected Output</div>
                                <span className="text-xs font-black text-[#22D3EE] uppercase tracking-tighter italic">
                                    {step.output}
                                </span>
                            </div>
                            <div className="w-12 h-12 bg-white/5 group-hover:bg-[#6366F1] text-slate-500 group-hover:text-white rounded-2xl flex items-center justify-center smooth-transition border border-white/5 shadow-inner">
                                <ChevronRight size={24} className="group-hover:translate-x-1 smooth-transition" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
        
        <style>{`
            .text-gradient-cyan {
                background: linear-gradient(to right, #6366F1, #22D3EE);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
        `}</style>
    </section>
  );
}

// Helper component for icon
function Map(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
      <line x1="9" x2="9" y1="3" y2="18" />
      <line x1="15" x2="15" y1="6" y2="21" />
    </svg>
  )
}
