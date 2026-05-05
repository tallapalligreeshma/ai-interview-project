import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bot, X, Sparkles, Activity, Zap, Cpu, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


const AiCoachWidget = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-10 right-10 z-[100] flex flex-col items-end gap-5 font-sans pointer-events-none">
            <AnimatePresence>
                {!isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="glass-premium-blue p-4 rounded-[2rem] shadow-4xl border-white/10 flex items-center gap-4 cursor-pointer hover:border-[#6366F1]/30 hover:-translate-y-1 transition-all group pointer-events-auto"
                        onClick={() => setIsOpen(true)}
                    >
                        <div className="relative">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6366F1] to-[#22D3EE] flex items-center justify-center text-white shadow-[0_10px_20px_rgba(99,102,241,0.3)] group-hover:rotate-6 transition-transform">
                                <Bot size={28} className="animate-pulse" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-4 border-[#0B0F1A] rounded-full"></div>
                            <div className="absolute inset-0 bg-[#6366F1]/20 blur-xl rounded-full -z-10 group-hover:opacity-100 opacity-50 transition-opacity" />
                        </div>
                        <div className="pr-2">
                            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#6366F1] italic flex items-center gap-2">
                                Neural Sync Ready <Sparkles size={12} className="text-amber-400 fill-amber-400" />
                            </div>
                            <div className="text-sm font-black text-white italic tracking-tighter uppercase">
                                Talk to Coach AI
                            </div>
                        </div>
                    </motion.div>
                )}

                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 50, transformOrigin: "bottom right" }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 50 }}
                        className="glass-premium-blue w-96 rounded-[3rem] shadow-4xl border-white/10 overflow-hidden pointer-events-auto"
                    >
                        {/* Widget Header */}
                        <div className="bg-gradient-to-r from-[#6366F1]/20 to-[#22D3EE]/20 p-6 flex items-center justify-between border-b border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                                <Cpu size={100} className="text-[#6366F1]" />
                            </div>
                            <div className="flex items-center gap-4 relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white shadow-inner">
                                    <Bot size={24} className="text-[#6366F1]" />
                                </div>
                                <div className="space-y-0.5">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] italic block">Neural Architect</span>
                                    <span className="font-black text-white italic tracking-tighter uppercase">Coach Sync Hub</span>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:bg-white/5 rounded-2xl border border-transparent hover:border-white/5" onClick={() => setIsOpen(false)}>
                                <X size={20} />
                            </Button>
                        </div>
                        
                        {/* Chat Body */}
                        <div className="p-8 h-80 overflow-y-auto bg-black/20 flex flex-col gap-6 custom-scrollbar">
                            <div className="flex flex-col gap-1 max-w-[85%]">
                                <div className="glass-premium-blue p-5 rounded-[2rem] rounded-tl-none border-white/10 shadow-inner text-sm font-bold italic leading-relaxed text-slate-300">
                                    "Neural synchronization complete. I am your AI Coach. Ready to calibrate your interview vectors?"
                                </div>
                                <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest ml-1 mt-1">Sync: 14:22 PM</span>
                            </div>
                            
                            <div className="flex flex-col gap-3 mt-2">
                                <div className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] italic mb-1">Injection Suggestions</div>
                                {[
                                    { text: "Explain Closure Vectors", icon: Zap },
                                    { text: "System Architecture Hub", icon: Cpu },
                                    { text: "Practice Logic Stream", icon: Activity }
                                ].map((btn, i) => (
                                    <Button key={i} variant="outline" className="justify-start text-[10px] font-black uppercase tracking-widest h-11 rounded-2xl border-white/5 bg-white/[0.02] hover:bg-[#6366F1]/10 hover:text-[#6366F1] hover:border-[#6366F1]/30 transition-all group/btn">
                                        <btn.icon size={14} className="mr-3 text-slate-500 group-hover/btn:text-[#6366F1] smooth-transition" /> "{btn.text}"
                                    </Button>
                                ))}
                            </div>
                        </div>
                        
                        {/* Input Area */}
                        <div className="p-6 border-t border-white/5 bg-[#0B0F1A]/80 flex gap-4">
                            <div className="flex-1 relative">
                                <input 
                                    type="text" 
                                    placeholder="Calibrate message..." 
                                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-xs font-bold italic focus:ring-1 ring-[#6366F1]/30 outline-none text-white placeholder:text-slate-600 smooth-transition"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#6366F1] animate-pulse" />
                                </div>
                            </div>
                            <Button className="h-12 w-12 rounded-2xl shrink-0 bg-white text-[#0B0F1A] hover:bg-[#6366F1] hover:text-white shadow-4xl smooth-transition">
                                <Send size={20} className="italic" />
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                .glass-premium-blue {
                    background: rgba(17, 24, 39, 0.7);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
                .shadow-4xl {
                    box-shadow: 0 20px 50px -20px rgba(0, 0, 0, 0.5), 0 0 1px 1px rgba(255, 255, 255, 0.05) inset;
                }
                .smooth-transition {
                    transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(99, 102, 241, 0.2);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(99, 102, 241, 0.4);
                }
            `}</style>
        </div>
    );
};

export default AiCoachWidget;

