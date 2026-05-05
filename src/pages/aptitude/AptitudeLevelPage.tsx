import * as React from 'react';
import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumb from "@/layouts/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QuestionCard } from "./components/QuestionCard";
import { TopicCard } from "./components/TopicCard";
import { 
    aptitudeTopics, 
    aptitudeQuestions, 
    roadmapSteps 
} from "@/data/aptitudeData";
import { 
    ChevronLeft, 
    Zap, 
    BookOpen,
    Loader2,
    Target,
    HelpCircle
} from "lucide-react";
import { AptitudeBasicsNotesTemplate } from "./components/AptitudeBasicsNotesTemplate";
// @ts-ignore
import html2pdf from 'html2pdf.js';

export default function AptitudeLevelPage() {
    const { level } = useParams();
    const navigate = useNavigate();
    const [isDownloading, setIsDownloading] = React.useState(false);
    const pdfRef = React.useRef<HTMLDivElement>(null);

    const handleDownloadPDF = async () => {
        setIsDownloading(true);
        try {
            const element = document.createElement('div');
            // Full High-Fidelity HTML with absolute HEX colors
            element.innerHTML = `
                <div style="padding: 50px; font-family: 'Inter', sans-serif; color: #1e293b; background: white; max-width: 800px; margin: auto;">
                    <header style="text-align: center; border-bottom: 5px solid #2563eb; padding-bottom: 25px; margin-bottom: 40px;">
                        <h1 style="color: #2563eb; font-size: 36px; font-weight: 900; text-transform: uppercase; margin: 0;">Aptitude Basics</h1>
                        <p style="color: #64748b; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; margin-top: 10px;">Complete Mastery Study Notes</p>
                    </header>

                    <div style="margin-bottom: 30px; font-size: 14px; line-height: 1.6;">
                        <p><strong>📌 Overview:</strong> This document contains detailed formulas, short tricks, and concept notes for foundation topics. Follow the sequence step-by-step.</p>
                    </div>

                    <div style="display: grid; gap: 30px;">
                        <!-- 1. Number System -->
                        <section>
                            <h2 style="font-size: 18px; font-weight: 900; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; text-transform: uppercase; margin-bottom: 15px;">🧠 1. Number System</h2>
                            <div style="background: #f8fafc; border: 1px solid #f1f5f9; padding: 15px; border-radius: 12px;">
                                <p style="margin-bottom: 10px;"><strong>📘 Concepts:</strong> Natural/Whole numbers, Integers, Prime/Composite, Divisibility Rules.</p>
                                <p style="font-size: 12px; color: #64748b;">⚡ <strong>Short Tricks:</strong> Div by 3/9 (Sum of digits), Div by 2 (Even last digit).</p>
                            </div>
                        </section>

                        <!-- 2. Simplification -->
                        <section>
                            <h2 style="font-size: 18px; font-weight: 900; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; text-transform: uppercase; margin-bottom: 15px;">📊 2. Simplification</h2>
                            <div style="background: #f8fafc; border: 1px solid #f1f5f9; padding: 15px; border-radius: 12px;">
                                <p><strong>📌 Key Rule:</strong> Always follow <strong>BODMAS</strong> (Bracket, Order, Div, Mult, Add, Sub).</p>
                                <p style="font-size: 12px; color: #64748b; margin-top: 5px;">⚡ <strong>Trick:</strong> Convert fractions to decimals; use approximation.</p>
                            </div>
                        </section>

                        <!-- 3. Percentages -->
                        <section>
                            <h2 style="font-size: 18px; font-weight: 900; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; text-transform: uppercase; margin-bottom: 15px;">📈 3. Percentages</h2>
                            <div style="background: #f8fafc; border: 1px solid #f1f5f9; padding: 15px; border-radius: 12px;">
                                <p><strong>Formulas:</strong> % = (Val/Total)*100 | Inc/Dec % = (Change/Original)*100</p>
                                <p style="font-size: 12px; color: #64748b; margin-top: 5px;">⚡ <strong>Trick:</strong> 10% = Div/10 | 25% = Div/4 | 50% = Half.</p>
                            </div>
                        </section>

                        <!-- 4. Ratio & Proportion -->
                        <section>
                            <h2 style="font-size: 18px; font-weight: 900; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; text-transform: uppercase; margin-bottom: 15px;">🔢 4. Ratio & Proportion</h2>
                            <div style="background: #f8fafc; border: 1px solid #f1f5f9; padding: 15px; border-radius: 12px;">
                                <p><strong>Ratio:</strong> a:b = a/b. If a:b=c:d → <strong>ad = bc</strong></p>
                                <p style="font-size: 12px; color: #64748b; margin-top: 5px;">⚡ <strong>Trick:</strong> Simplify ratio first; use cross multiplication.</p>
                            </div>
                        </section>

                        <!-- 5. Averages -->
                        <section>
                            <h2 style="font-size: 18px; font-weight: 900; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; text-transform: uppercase; margin-bottom: 15px;">📊 5. Averages</h2>
                            <div style="background: #f8fafc; border: 1px solid #f1f5f9; padding: 15px; border-radius: 12px;">
                                <p><strong>Formula:</strong> Average = Sum of values / Number of values</p>
                                <p style="font-size: 12px; color: #64748b; margin-top: 5px;">⚡ <strong>Trick:</strong> Assume average to reduce calculations.</p>
                            </div>
                        </section>

                        <!-- 6. SI & CI -->
                        <section>
                            <h2 style="font-size: 18px; font-weight: 900; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; text-transform: uppercase; margin-bottom: 15px;">💰 6. Simple & Compound Interest</h2>
                            <div style="display: grid; grid-template-cols: 1fr 1fr; gap: 15px;">
                                <div style="background: #f8fafc; padding: 12px; border-radius: 12px;">
                                    <p style="font-size: 12px; color: #2563eb; font-weight: 900;">Simple Intent</p>
                                    <p style="font-size: 11px;">(P * R * T) / 100</p>
                                </div>
                                <div style="background: #f8fafc; padding: 12px; border-radius: 12px;">
                                    <p style="font-size: 12px; color: #2563eb; font-weight: 900;">Compound Intent</p>
                                    <p style="font-size: 11px;">P(1+R/100)^T - P</p>
                                </div>
                            </div>
                        </section>

                        <!-- 🎯 Study Flow -->
                        <section style="background: #f0fdf4; border-left: 6px solid #22c55e; padding: 20px; border-radius: 15px;">
                            <h2 style="color: #22c55e; font-size: 16px; font-weight: 900; margin-bottom: 10px;">🎯 STUDY FLOW (VERY IMPORTANT)</h2>
                            <p style="font-size: 12px; font-weight: 700; color: #166534;">Number System → Simplification → Percentages → Ratio → Average → SI → CI</p>
                        </section>

                        <!-- 🚀 Final Tip -->
                        <div style="background: #1e293b; padding: 25px; border-radius: 20px; color: white;">
                             <h2 style="color: #2563eb; font-size: 16px; font-weight: 900; margin-bottom: 15px;">🚀 FINAL TIP</h2>
                             <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 11px; font-weight: 700; text-transform: uppercase;">
                                <p style="color: #4ade80;">✔ Learn formulas first</p>
                                <p style="color: #4ade80;">✔ Practice 20–30 daily</p>
                                <p style="color: #4ade80;">✔ Focus on speed</p>
                                <p style="color: #4ade80;">✔ Revise shortcuts</p>
                             </div>
                        </div>
                    </div>

                    <footer style="margin-top: 50px; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 20px; color: #94a3b8; font-size: 10px; text-transform: uppercase;">
                        Generated by AI Interview Coach • Mastery Assets
                    </footer>
                </div>
            `;

            const opt = {
                margin: 0.5,
                filename: `Aptitude_${level}_Notes.pdf`,
                image: { type: 'jpeg', quality: 0.98 } as const,
                html2canvas: { scale: 2, useCORS: true, logging: false },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' as any }
            };

            await html2pdf().set(opt).from(element).save();
        } catch (error) {
            console.error('PDF Generation failed:', error);
        } finally {
            setIsDownloading(false);
        }
    };

    const levelData = useMemo(() => {
        const normalizedLevel = level?.charAt(0).toUpperCase() + (level?.slice(1).toLowerCase() || "");
        return roadmapSteps.find(s => s.title === normalizedLevel || s.level === normalizedLevel);
    }, [level]);

    const filteredTopics = useMemo(() => {
        const normalizedLevel = level?.toLowerCase();
        let targetDifficulty: 'Easy' | 'Medium' | 'Hard' = 'Easy';
        if (normalizedLevel === 'intermediate') targetDifficulty = 'Medium';
        else if (normalizedLevel === 'advanced') targetDifficulty = 'Hard';
        
        return aptitudeTopics.filter(t => t.difficulty === targetDifficulty);
    }, [level]);

    const filteredQuestions = useMemo(() => {
        const normalizedLevel = level?.charAt(0).toUpperCase() + (level?.slice(1).toLowerCase() || "");
        return aptitudeQuestions.filter(q => q.level === normalizedLevel);
    }, [level]);

    if (!levelData) {
        return <div className="p-20 text-center">Level not found</div>;
    }

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-[#0B0F1A] pb-20">
            <div className="px-6 py-4 flex items-center justify-between">
                <Breadcrumb title={levelData.title} text="Aptitude" />
                <Button 
                    variant="ghost" 
                    onClick={() => navigate('/aptitude')}
                    className="rounded-xl gap-2 text-neutral-500 hover:text-primary"
                >
                    <ChevronLeft size={18} />
                    Back to Roadmap
                </Button>
            </div>

            <div className="max-w-7xl mx-auto px-6 space-y-12 pt-6">
                {/* Header Section */}
                <header className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-neutral-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-5">
                        <Zap size={140} />
                    </div>
                    <div className="relative z-10 max-w-3xl space-y-4">
                        <Badge className="bg-primary/10 text-primary border-0 font-black uppercase tracking-widest px-3 py-1">
                            {levelData.subtitle}
                        </Badge>
                        <h1 className="text-4xl font-black text-neutral-900 dark:text-white uppercase tracking-tight">
                            {levelData.title} Mastery
                        </h1>
                        <p className="text-lg font-medium text-neutral-500 leading-relaxed">
                            {levelData.goal}. Focusing on <span className="text-primary font-bold italic">{levelData.topics.join(', ')}</span>.
                        </p>
                    </div>
                </header>

                {/* 1. Learn Section */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-100 text-amber-600 rounded-xl">
                            <BookOpen size={24} />
                        </div>
                        <h2 className="text-2xl font-black uppercase tracking-tight text-neutral-900 dark:text-white">Learn Concepts</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="p-8 bg-white dark:bg-slate-900 border-neutral-100 dark:border-slate-800 rounded-3xl space-y-4">
                            <h3 className="text-lg font-black uppercase">Study Materials</h3>
                            <p className="text-sm text-neutral-500 leading-relaxed">
                                Detailed formulas, short-tricks, and concept notes are available for all {levelData.title} topics. Follow the structured sequence for best results.
                            </p>
                            <Button 
                                onClick={handleDownloadPDF}
                                disabled={isDownloading}
                                variant="outline" 
                                className="rounded-xl font-bold uppercase text-[10px] tracking-widest gap-2"
                            >
                                {isDownloading ? <Loader2 size={14} className="animate-spin" /> : <Zap size={14} className="fill-current" />}
                                {isDownloading ? 'Generating...' : 'Download PDF Notes'}
                            </Button>
                        </Card>
                        <Card className="p-8 bg-neutral-900 text-white rounded-3xl space-y-4 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-10">
                                <Target size={80} />
                            </div>
                            <h3 className="text-lg font-black uppercase text-primary">Daily Challenge</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Complete 5 easy and 2 moderate questions today to keep your streak alive!
                            </p>
                            <Button className="bg-primary hover:bg-white hover:text-primary text-white rounded-xl font-bold uppercase text-[10px] tracking-widest">
                                Start Challenge
                            </Button>
                        </Card>
                    </div>
                </section>

                {/* 2. Practice (Topic-wise) */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
                            <Target size={24} />
                        </div>
                        <h2 className="text-2xl font-black uppercase tracking-tight text-neutral-900 dark:text-white">Practice Topics</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {filteredTopics.map(topic => (
                            <TopicCard key={topic.id} topic={topic} />
                        ))}
                    </div>
                </section>

                {/* 3. Questions Section */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 text-primary rounded-xl">
                                <HelpCircle size={24} />
                            </div>
                            <h2 className="text-2xl font-black uppercase tracking-tight text-neutral-900 dark:text-white">Questions & Answers</h2>
                        </div>
                        <Badge variant="outline" className="border-neutral-200 dark:border-slate-800 uppercase font-black text-[10px] px-3">
                            {filteredQuestions.length} Questions
                        </Badge>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {filteredQuestions.map(question => (
                            <QuestionCard key={question.id} question={question} />
                        ))}
                    </div>
                </section>
            </div>

            {/* Hidden PDF Template */}
            <div className="hidden">
                <div id="pdf-content">
                    <AptitudeBasicsNotesTemplate ref={pdfRef} />
                </div>
            </div>
        </div>
    );
}
