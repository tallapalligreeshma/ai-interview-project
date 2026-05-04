import * as React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Zap, Brain, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnswerAccordionProps {
    isOpen: boolean;
    explanation: string;
    correctOption: number;
}

export function AnswerAccordion({ isOpen, explanation, correctOption }: AnswerAccordionProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden border-t border-white/5 bg-white/[0.01]"
                >
                    <div className="p-8 space-y-6 relative">
                        <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none">
                            <Brain size={120} className="text-[#6366F1]" />
                        </div>

                        <div className="flex items-center gap-3 text-emerald-400">
                            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-inner">
                                <CheckCircle2 size={16} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">Cognitive Solution Decoded</span>
                        </div>
                        
                        <div className="p-6 bg-black/40 rounded-3xl border border-white/5 shadow-inner relative overflow-hidden group">
                            <div className="absolute top-0 right-0 px-4 py-2 bg-emerald-500/10 text-emerald-400 border-l border-b border-white/5 rounded-bl-xl text-[10px] font-black uppercase tracking-widest italic">
                               Option Vector {correctOption}
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-[#6366F1]">
                                    <Sparkles size={14} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Logic Breakdown</span>
                                </div>
                                <p className="text-sm font-bold text-slate-300 leading-relaxed italic pr-10">
                                    "{explanation}"
                                </p>
                            </div>
                        </div>

                        <button className="w-full flex items-center justify-center gap-3 py-4 bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] hover:border-[#6366F1]/30 rounded-2xl transition-all group/help relative overflow-hidden shadow-inner">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#6366F1]/5 to-transparent -translate-x-full group-hover/help:translate-x-full transition-transform duration-1000" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover/help:text-white smooth-transition relative z-10 italic">
                                Neural Logic Insufficient? Consult Coach AI
                            </span>
                            <Zap size={14} className="text-[#F59E0B] group-hover/help:scale-125 smooth-transition relative z-10 fill-current" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
