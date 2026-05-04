import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from "@/layouts/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { aptitudeQuestions } from "@/data/aptitudeData";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Timer, 
    ChevronRight, 
    ChevronLeft, 
    CheckCircle2, 
    XCircle, 
    Trophy, 
    Zap, 
    RefreshCw,
    AlertCircle,
    ArrowLeft
} from "lucide-react";

export default function AptitudeMockTestPage() {
    const navigate = useNavigate();
    
    // For mock test, we take all questions or a subset
    const questions = useMemo(() => {
        // Shuffle and take a sample if needed, here we take all
        return [...aptitudeQuestions].sort(() => 0.5 - Math.random());
    }, []);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [timer, setTimer] = useState(600); // 10 minutes for mock test
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        if (isFinished) return;
        
        const interval = setInterval(() => {
            setTimer(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    handleFinish();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isFinished]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const currentQuestion = questions[currentIndex];
    const progress = ((currentIndex + 1) / questions.length) * 100;

    const handleOptionSelect = (optionIdx: number) => {
        if (isSubmitted) return;
        setSelectedOptions(prev => ({ ...prev, [currentIndex]: optionIdx }));
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            handleFinish();
        }
    };

    const handleFinish = () => {
        setIsFinished(true);
        setIsSubmitted(true);
    };

    const calculateScore = () => {
        let correct = 0;
        questions.forEach((q, idx) => {
            if (selectedOptions[idx] === q.correctOption - 1) {
                correct++;
            }
        });
        return {
            points: correct,
            total: questions.length,
            percentage: Math.round((correct / questions.length) * 100)
        };
    };

    const score = calculateScore();

    if (isFinished) {
        return (
            <div className="min-h-screen bg-neutral-50 dark:bg-[#0B0F1A] pb-20 flex flex-col items-center justify-center px-6">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-2xl w-full"
                >
                    <Card className="bg-white dark:bg-slate-900 border-neutral-100 dark:border-slate-800 rounded-[3rem] p-12 text-center shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-primary" />
                        
                        <div className="w-24 h-24 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-primary/5">
                            <Trophy size={48} />
                        </div>
                        
                        <h2 className="text-4xl font-black text-neutral-900 dark:text-white uppercase tracking-tight mb-2">Mock Test Results</h2>
                        <p className="text-neutral-500 font-medium mb-10">You've successfully completed the full-length aptitude assessment.</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-left">
                            <div className="p-6 bg-neutral-50 dark:bg-slate-800 rounded-3xl border border-neutral-100 dark:border-slate-700">
                                <p className="text-[10px] font-black uppercase text-neutral-400 mb-2">Final Score</p>
                                <p className="text-3xl font-black text-primary">{score.percentage}%</p>
                                <Progress value={score.percentage} className="h-1.5 mt-2" />
                            </div>
                            <div className="p-6 bg-neutral-50 dark:bg-slate-800 rounded-3xl border border-neutral-100 dark:border-slate-700">
                                <p className="text-[10px] font-black uppercase text-neutral-400 mb-2">Accuracy</p>
                                <p className="text-3xl font-black text-green-500">{score.points}/{score.total}</p>
                                <p className="text-[10px] font-bold text-neutral-500 mt-2 italic">Correct answers</p>
                            </div>
                            <div className="p-6 bg-neutral-50 dark:bg-slate-800 rounded-3xl border border-neutral-100 dark:border-slate-700">
                                <p className="text-[10px] font-black uppercase text-neutral-400 mb-2">Time Used</p>
                                <p className="text-3xl font-black text-neutral-800 dark:text-white">{formatTime(600 - timer)}</p>
                                <p className="text-[10px] font-bold text-neutral-500 mt-2 italic">Out of 10:00</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button 
                                onClick={() => navigate('/aptitude')}
                                className="flex-1 h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest gap-2 shadow-lg shadow-primary/20"
                            >
                                <ArrowLeft size={18} />
                                Back to Dashboard
                            </Button>
                            <Button 
                                onClick={() => window.location.reload()}
                                variant="outline"
                                className="flex-1 h-14 rounded-2xl font-black uppercase tracking-widest gap-2 border-neutral-200 dark:border-slate-700"
                            >
                                <RefreshCw size={18} />
                                Retry Test
                            </Button>
                        </div>
                    </Card>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-[#0B0F1A] pb-20">
            <div className="px-6 py-4 flex items-center justify-between border-b border-neutral-100 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-50">
                <div className="flex items-center gap-4 text-neutral-500">
                    <Button variant="ghost" size="icon" onClick={() => navigate('/aptitude')} className="rounded-xl">
                        <ArrowLeft size={18} />
                    </Button>
                    <span className="text-xs font-black uppercase tracking-widest hidden md:block">Full Length Mock Test</span>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3 px-4 py-2 bg-rose-500/10 text-rose-500 rounded-xl border border-rose-500/20">
                        <Timer size={20} className="animate-pulse" />
                        <span className="font-mono font-black text-xl">{formatTime(timer)}</span>
                    </div>
                    <Button 
                        onClick={handleFinish}
                        variant="destructive"
                        className="rounded-xl font-black uppercase text-[10px] tracking-widest px-6"
                    >
                        End Test
                    </Button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="mb-12 space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">
                        <span>Question {currentIndex + 1} of {questions.length}</span>
                        <span className="text-primary">{Math.round(progress)}% Complete</span>
                    </div>
                    <Progress value={progress} className="h-1.5 rounded-full" />
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                    >
                        <Card className="p-10 md:p-14 bg-white dark:bg-slate-900 border-neutral-100 dark:border-slate-800 rounded-[3rem] shadow-sm relative overflow-hidden">
                             <div className="flex items-start gap-5 mb-10">
                                <div className="p-4 bg-primary/10 text-primary rounded-2xl shrink-0">
                                    <Zap size={28} />
                                </div>
                                <h1 className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-white leading-tight">
                                    {currentQuestion.title}
                                </h1>
                             </div>

                             <div className="grid grid-cols-1 gap-4">
                                {currentQuestion.options.map((option, idx) => {
                                    const isSelected = selectedOptions[currentIndex] === idx;
                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => handleOptionSelect(idx)}
                                            className={`group p-6 rounded-[1.5rem] border-2 text-left transition-all flex items-center justify-between ${
                                                isSelected ? 'bg-primary/5 border-primary shadow-lg shadow-primary/5' :
                                                'bg-white dark:bg-slate-900 border-neutral-100 dark:border-slate-800 hover:border-neutral-200 dark:hover:border-slate-700'
                                            }`}
                                        >
                                            <div className="flex items-center gap-5">
                                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg transition-colors ${
                                                    isSelected ? 'bg-primary text-white' : 'bg-neutral-50 dark:bg-slate-800 text-neutral-400'
                                                }`}>
                                                    {String.fromCharCode(65 + idx)}
                                                </div>
                                                <span className={`text-lg font-bold transition-colors ${
                                                    isSelected ? 'text-neutral-900 dark:text-white' : 'text-neutral-500'
                                                }`}>
                                                    {option}
                                                </span>
                                            </div>
                                            {isSelected && <CheckCircle2 className="text-primary" size={24} />}
                                        </button>
                                    );
                                })}
                             </div>
                        </Card>

                        <div className="flex items-center justify-between">
                             <Button 
                                variant="ghost"
                                onClick={() => setCurrentIndex(prev => prev - 1)}
                                disabled={currentIndex === 0}
                                className="rounded-2xl h-14 px-8 font-black uppercase tracking-widest gap-2 text-neutral-500"
                             >
                                <ChevronLeft size={18} />
                                Previous
                             </Button>

                             <Button 
                                onClick={handleNext}
                                disabled={selectedOptions[currentIndex] === undefined}
                                className="bg-primary rounded-2xl h-14 px-12 font-black uppercase tracking-widest gap-2 shadow-xl shadow-primary/20"
                             >
                                {currentIndex === questions.length - 1 ? 'Submit Mock Test' : 'Next Question'}
                                <ChevronRight size={18} />
                             </Button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
