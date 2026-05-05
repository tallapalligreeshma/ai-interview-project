import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from "@/layouts/Breadcrumb";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
    Briefcase,
    ChevronRight,
    Sparkles,
    Zap,
    RefreshCw
} from "lucide-react";
import { aiService } from "@/lib/AiService";
import { rolesData } from "@/data/rolesData";

export default function JobRoles({ isEmbedded = false }: { isEmbedded?: boolean }) {
    const navigate = useNavigate();

    const [aiRoles, setAiRoles] = useState<any[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    
    const handleDiscoverRoles = async () => {
        setIsGenerating(true);
        try {
            const data = await aiService.generateModuleResponse("roles", { level: "Entry Level" });
            setAiRoles(data.roles || []);
        } catch (error) {
            console.error("AI Role Error:", error);
        } finally {
            setIsGenerating(false);
        }
    };
    




    return (
        <div className={`flex flex-col ${isEmbedded ? '' : 'min-h-screen bg-neutral-50 dark:bg-[#0B0F1A]'}`}>
            {!isEmbedded && (
                <div className="px-6 py-4">
                   <Breadcrumb title="Career Selection" text="Choose Your Role" />
                </div>
            )}
            
            <div className={`flex-1 ${isEmbedded ? '' : 'px-6 py-4'}`}>
                <div className="max-w-7xl mx-auto space-y-12">
                    
                    {/* Header */}
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-neutral-900 dark:text-white">
                            Choose Your <span className="premium-gradient-text">Career Path</span>
                        </h1>
                        <p className="text-neutral-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
                            Select a role to start your AI-powered behavioral and technical interview simulation. 
                            Tailored questions designed for 2026 industry standards.
                        </p>
                    </div>

                    {/* Roles Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 pb-20">
                        {rolesData.map((role) => (
                            <Card 
                                key={role.id}
                                onClick={() => navigate(`/interview/${role.title.toLowerCase().replace(/\s+/g, '-')}`)}
                                className="group cursor-pointer bg-white dark:bg-slate-900 border-neutral-100 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center gap-6 border-b-4 hover:border-b-primary"
                            >
                                <div className="w-20 h-20 rounded-3xl bg-neutral-50 dark:bg-slate-800 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:rotate-6 transition-all duration-500 shadow-inner">
                                    {role.icon ? React.createElement(role.icon, { size: 36 }) : <Briefcase size={36} />}
                                </div>
                                
                                <div className="space-y-1">
                                    <h3 className="text-lg font-black text-neutral-800 dark:text-white group-hover:text-primary transition-colors">
                                        {role.title}
                                    </h3>
                                    <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                                        {role.questionsCount}+ Questions
                                    </p>
                                </div>

                                <div className="mt-2 w-10 h-10 rounded-full bg-neutral-50 dark:bg-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ChevronRight size={20} className="text-primary" />
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* AI Discovery Section (Freshers) */}
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="pt-10">
                        <Card className="bg-slate-950 text-white rounded-[3rem] p-10 lg:p-14 border-none shadow-4xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -mr-40 -mt-40" />
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                                <div className="space-y-4 max-w-xl">
                                    <Badge className="bg-emerald-500/20 text-emerald-500 border-none px-4 py-1.5 font-black uppercase tracking-widest text-[9px]">Frontend v1.2 Release</Badge>
                                    <h2 className="text-4xl font-black tracking-tight leading-none italic">AI Role <span className="premium-gradient-text">Discovery</span></h2>
                                    <p className="text-sm font-medium text-slate-400 leading-relaxed italic">
                                        "Searching for the perfect fit? Let our AI analyze industry trends to suggest 10 high-growth roles for your career level."
                                    </p>
                                    <Button 
                                        onClick={handleDiscoverRoles}
                                        disabled={isGenerating}
                                        className="h-16 px-10 rounded-3xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/30 transition-all gap-3"
                                    >
                                        {isGenerating ? <RefreshCw className="animate-spin" size={20} /> : <Sparkles size={20} />} 
                                        {isGenerating ? "Analyzing Silicon Valley Data..." : "Run AI Career Neural Sync"}
                                    </Button>
                                </div>
                                <div className="flex-1 flex justify-center">
                                    <div className="w-24 h-24 rounded-[2rem] bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 group animate-pulse">
                                        <Zap size={50} className="fill-current" />
                                    </div>
                                </div>
                            </div>

                            {aiRoles.length > 0 && (
                                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                                    {aiRoles.map((role: any, i: number) => (
                                        <Card key={i} className="bg-white/5 border border-white/10 p-6 rounded-[2rem] text-left hover:bg-white/10 transition-all group">
                                            <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center mb-4 font-black text-xs group-hover:scale-110 transition-transform">{i+1}</div>
                                            <h4 className="text-sm font-black uppercase tracking-tight text-white mb-2">{role.title}</h4>
                                            <p className="text-[10px] font-medium text-slate-500 leading-relaxed">{role.description}</p>
                                        </Card>
                                    ))}
                                </motion.div>
                            )}
                        </Card>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
