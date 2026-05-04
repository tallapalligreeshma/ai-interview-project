import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumb from "@/layouts/Breadcrumb";
import { Button } from "@/components/ui/button";
import { ChevronLeft, BookOpen, Sparkles, Brain, Cpu, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function TopicDetail() {
  const { topic } = useParams();
  const navigate = useNavigate();

  return (
    <div className="flex-1 w-full min-h-screen bg-[#0B0F1A] text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden page-fade-in pb-24">
        {/* Background Ambient Gradients */}
        <div className="fixed inset-0 z-0 pointer-events-none">
            <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#6366F1]/10 rounded-full blur-[150px]" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[700px] h-[700px] bg-[#22D3EE]/10 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 px-6 py-6 lg:px-12 space-y-12 max-w-[1800px] mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/5 pb-10">
                <div className="space-y-4">
                    <Breadcrumb title={`Sector: ${topic}`} text="Aptitude Architecture" />
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter italic uppercase">
                        Neural <span className="text-gradient-cyan">Knowledge</span> Node
                    </h1>
                </div>
                <Button 
                    onClick={() => navigate('/aptitude')}
                    variant="ghost" 
                    className="h-12 px-8 rounded-xl bg-white/[0.03] border border-white/5 text-slate-400 font-black uppercase text-[10px] tracking-widest hover:text-white hover:border-[#6366F1]/30 smooth-transition"
                >
                    <ArrowLeft size={16} className="mr-3" /> Back to Dashboard
                </Button>
            </div>
            
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-5xl mx-auto pt-20 text-center space-y-12"
            >
                <div className="relative inline-block group">
                    <div className="w-32 h-32 bg-[#6366F1]/10 text-[#6366F1] rounded-[2.5rem] flex items-center justify-center mx-auto border border-[#6366F1]/20 shadow-4xl group-hover:rotate-12 smooth-transition relative overflow-hidden">
                        <BookOpen size={60} />
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                    </div>
                    <div className="absolute inset-0 blur-3xl bg-[#6366F1]/10 rounded-full -z-10 animate-pulse" />
                </div>

                <div className="space-y-6">
                    <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 rounded-full border border-white/10 italic">
                        <Sparkles size={14} className="text-amber-400 fill-amber-400 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Advanced Heuristics Loading</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none">
                        Analyzing <br /> <span className="text-gradient-cyan">{topic}</span> Patterns
                    </h2>
                    <p className="text-xl font-bold italic text-slate-500 max-w-3xl mx-auto leading-relaxed">
                        "Detailed study materials, recursive formulas, and strategic logic shortcuts for <span className="text-[#6366F1]">{topic}</span> are currently being synchronized by our Neural Coach network."
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10">
                    {[
                        { icon: Brain, label: "Cognitive Logic", desc: "Foundational rules and properties." },
                        { icon: Zap, label: "Speed Heuristics", desc: "Shortcuts for millisecond calculation." },
                        { icon: Cpu, label: "Pattern Recognition", desc: "Corporate-specific question types." }
                    ].map((item, i) => (
                        <div key={i} className="glass-premium-blue p-8 rounded-[2.5rem] border-white/5 space-y-4 hover:border-[#6366F1]/30 smooth-transition shadow-4xl group">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500 group-hover:text-[#6366F1] group-hover:scale-110 smooth-transition border border-white/10 shadow-inner">
                                <item.icon size={24} />
                            </div>
                            <div className="text-left space-y-1">
                                <h4 className="text-sm font-black text-white uppercase italic tracking-tighter">{item.label}</h4>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="pt-10 flex flex-col items-center gap-6">
                    <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em] italic">Stream Status: Calibrating Heuristics...</div>
                    <div className="w-64 h-1.5 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5 shadow-inner">
                        <motion.div 
                            animate={{ x: [-200, 200] }} 
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            className="w-20 h-full bg-gradient-to-r from-transparent via-[#6366F1] to-transparent" 
                        />
                    </div>
                </div>
            </motion.div>
        </div>

        <style>{`
            .page-fade-in { animation: fadeIn 0.8s ease-out; }
            @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            .text-gradient-cyan {
                background: linear-gradient(to right, #6366F1, #22D3EE);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
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
        `}</style>
    </div>
  );
}

