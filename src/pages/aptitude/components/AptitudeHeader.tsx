
import { Button } from "@/components/ui/button";
import { Timer, Zap, Map, Sparkles } from "lucide-react";


export default function AptitudeHeader() {
  return (
    <div className="flex flex-col gap-8 glass-premium-blue p-10 lg:p-14 rounded-[3.5rem] border-white/5 shadow-4xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 smooth-transition">
            <Zap size={200} className="text-[#6366F1]" />
        </div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#22D3EE]/10 blur-3xl rounded-full" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
            <div className="space-y-4 max-w-2xl">
                <div className="inline-flex items-center gap-3 px-6 py-2 bg-[#6366F1]/10 rounded-full text-[#22D3EE] font-black text-[10px] uppercase tracking-[0.3em] border border-[#6366F1]/20">
                    <Sparkles size={16} /> Cognitive Extraction Ready
                </div>
                <div className="space-y-2">
                    <h1 className="text-5xl lg:text-6xl font-black text-white tracking-tighter italic uppercase">
                        Aptitude <span className="text-gradient-cyan">Diagnostics</span>
                    </h1>
                    <p className="text-lg font-bold text-slate-400 italic">
                        "Learn, practice, and decode high-frequency aptitude vectors."
                    </p>
                </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
                <Button className="rounded-2xl px-10 bg-white text-slate-950 hover:bg-[#6366F1] hover:text-white font-black uppercase tracking-[0.2em] h-16 shadow-4xl smooth-transition gap-3 group/btn">
                    <Zap size={20} className="fill-current group-hover:animate-pulse" />
                    Initialize Sync
                </Button>
                <Button variant="outline" className="rounded-2xl px-8 border-white/10 glass-premium-blue text-white font-black uppercase tracking-widest h-16 gap-3 hover:bg-white/10 smooth-transition">
                    <Timer size={20} className="text-[#22D3EE]" />
                    Practice Stream
                </Button>
                <Button variant="ghost" className="rounded-2xl px-6 text-[#6366F1] hover:bg-[#6366F1]/10 font-black uppercase tracking-widest h-16 gap-3 smooth-transition">
                    <Map size={20} />
                    Blueprint
                </Button>
            </div>
        </div>
        
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
