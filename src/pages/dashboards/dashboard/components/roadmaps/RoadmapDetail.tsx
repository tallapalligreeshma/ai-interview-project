import { useState } from "react";
import type { Roadmap } from "@/data/roadmapData";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
    ArrowLeft, 
    CheckCircle2, 
    Flame, 
    Play, 
    CheckSquare,
    Trophy,
    ChevronRight,
    Clock,
    Zap
} from "lucide-react";

interface RoadmapDetailProps {
    roadmap: Roadmap;
    onBack: () => void;
}

const RoadmapDetail = ({ roadmap, onBack }: RoadmapDetailProps) => {
    // Local state for toggles (simulated persistence)
    const [localRoadmap, setLocalRoadmap] = useState(roadmap);

    const toggleVideo = (stepId: string, videoId: string) => {
        setLocalRoadmap(prev => ({
            ...prev,
            steps: prev.steps.map(step => 
                step.id === stepId 
                ? { ...step, videos: step.videos.map(v => v.id === videoId ? { ...v, completed: !v.completed } : v) }
                : step
            )
        }));
    };

    const toggleTask = (stepId: string, taskId: string) => {
        setLocalRoadmap(prev => ({
            ...prev,
            steps: prev.steps.map(step => 
                step.id === stepId 
                ? { ...step, tasks: step.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t) }
                : step
            )
        }));
    };

    const completedSteps = localRoadmap.steps.filter(s => s.status === 'completed').length;
    const totalSteps = localRoadmap.steps.length;

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            {/* Context Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-neutral-100 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" onClick={onBack} className="p-2 h-auto rounded-xl hover:bg-neutral-100 dark:hover:bg-slate-800">
                        <ArrowLeft size={20} />
                    </Button>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h2 className="text-2xl font-black text-neutral-900 dark:text-white">{localRoadmap.title}</h2>
                            <Badge className="bg-primary/10 text-primary border-0 text-[10px] font-black uppercase tracking-widest">{localRoadmap.level}</Badge>
                        </div>
                        <p className="text-sm text-neutral-500">{localRoadmap.description}</p>
                    </div>
                </div>
                <div className="flex items-center gap-6 pr-4">
                    <div className="text-center">
                        <div className="flex items-center gap-1 text-primary mb-1">
                            <Flame size={20} className="fill-current animate-pulse" />
                            <span className="text-xl font-black">4</span>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Streak</span>
                    </div>
                    <div className="h-10 w-px bg-neutral-100 dark:bg-slate-800" />
                    <div className="text-center">
                        <div className="text-xl font-black text-neutral-900 dark:text-white mb-1">
                            {completedSteps}/{totalSteps}
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Steps</span>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                
                {/* Timeline / Steps (Left Column) */}
                <div className="xl:col-span-8 space-y-8 pb-20">
                    <div className="relative pl-4">
                        {/* Timeline Connector Line */}
                        <div className="absolute left-[31px] top-6 bottom-6 w-0.5 bg-neutral-100 dark:bg-slate-800" />

                        {localRoadmap.steps.map((step, idx) => (
                            <div key={step.id} className="relative pl-12 pb-12 last:pb-0">
                                {/* Step Indicator */}
                                <div className={`absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center z-10 border-4 border-white dark:border-slate-950 transition-all duration-500 ${
                                    step.status === 'completed' 
                                    ? 'bg-green-500 text-white' 
                                    : step.status === 'current'
                                    ? 'bg-primary text-white shadow-xl shadow-primary/30 scale-110'
                                    : 'bg-neutral-100 dark:bg-slate-800 text-neutral-400'
                                }`}>
                                    {step.status === 'completed' ? <CheckCircle2 size={20} /> : <span className="text-sm font-black">{idx + 1}</span>}
                                </div>

                                <div className={`transition-all duration-500 ${step.status === 'upcoming' ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
                                    <div className="mb-6">
                                        <h3 className="text-xl font-black text-neutral-900 dark:text-white mb-1">{step.title}</h3>
                                        <p className="text-sm text-neutral-500">{step.subtitle}</p>
                                    </div>

                                    {/* Videos Grid */}
                                    {step.videos.length > 0 && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                            {step.videos.map(video => (
                                                <div key={video.id} className="group bg-white dark:bg-slate-900 rounded-2xl border border-neutral-100 dark:border-slate-800 overflow-hidden hover:shadow-lg transition-all">
                                                    <div className="relative aspect-video">
                                                        <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50">
                                                                <Play className="fill-white text-white ml-1" size={20} />
                                                            </div>
                                                        </div>
                                                        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-black px-2 py-1 rounded-lg flex items-center gap-1">
                                                            <Clock size={10} /> {video.duration}
                                                        </div>
                                                    </div>
                                                    <div className="p-4 flex items-center justify-between gap-4">
                                                        <span className="text-xs font-bold text-neutral-800 dark:text-white line-clamp-1">{video.title}</span>
                                                        <button 
                                                            onClick={() => toggleVideo(step.id, video.id)}
                                                            className={`shrink-0 p-1.5 rounded-lg transition-colors ${
                                                                video.completed 
                                                                ? 'bg-green-500 text-white' 
                                                                : 'bg-neutral-50 dark:bg-slate-800 text-neutral-400 hover:text-green-500'
                                                            }`}
                                                        >
                                                            <CheckCircle2 size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Tasks & Practice */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-neutral-50/50 dark:bg-slate-900/40 p-5 rounded-2xl border border-neutral-100/50 dark:border-slate-800/50">
                                            <div className="flex items-center gap-2 mb-4 text-primary">
                                                <CheckSquare size={18} />
                                                <span className="text-xs font-black uppercase tracking-widest">Tasks to Complete</span>
                                            </div>
                                            <div className="space-y-3">
                                                {step.tasks.map(task => (
                                                    <div 
                                                        key={task.id} 
                                                        onClick={() => toggleTask(step.id, task.id)}
                                                        className="flex items-center gap-3 cursor-pointer group"
                                                    >
                                                        <div className={`shrink-0 w-5 h-5 rounded border-2 transition-all flex items-center justify-center ${
                                                            task.completed 
                                                            ? 'bg-primary border-primary text-white' 
                                                            : 'border-neutral-300 dark:border-slate-700'
                                                        }`}>
                                                            {task.completed && <CheckCircle2 size={12} />}
                                                        </div>
                                                        <span className={`text-sm font-medium transition-colors ${
                                                            task.completed ? 'text-neutral-400 line-through' : 'text-neutral-700 dark:text-slate-300 group-hover:text-primary'
                                                        }`}>
                                                            {task.title}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {step.practice && (
                                            <div className="bg-primary/[0.03] dark:bg-primary/[0.02] p-5 rounded-2xl border border-primary/10">
                                                <div className="flex items-center gap-2 mb-4 text-blue-500">
                                                    <Trophy size={18} />
                                                    <span className="text-xs font-black uppercase tracking-widest">Real Company Practice</span>
                                                </div>
                                                <div className="space-y-3">
                                                    {step.practice.map((item, pIdx) => (
                                                        <div key={pIdx} className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-neutral-100 dark:border-slate-800 group hover:border-primary/50 transition-all cursor-pointer">
                                                            <span className="text-xs font-bold text-neutral-600 dark:text-slate-300">{item}</span>
                                                            <ChevronRight size={14} className="text-neutral-300 group-hover:text-primary transition-colors" />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Progress Sidebar (Right Column) */}
                <div className="xl:col-span-4 space-y-6 sticky top-24">
                    <Card className="bg-gradient-to-br from-neutral-900 to-slate-900 border-0 text-white rounded-3xl overflow-hidden shadow-2xl">
                        <CardContent className="p-8 space-y-6">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-white/10 rounded-xl">
                                    <Trophy size={24} className="text-amber-400" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-black tracking-tight">Milestones</h4>
                                    <p className="text-xs text-white/50 uppercase tracking-widest font-bold">Unlocks as you progress</p>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 opacity-100">
                                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center shrink-0 shadow-lg">
                                        🎯
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold">Solve 50 problems</p>
                                        <div className="h-1.5 w-full bg-white/10 rounded-full mt-1.5 overflow-hidden">
                                            <div className="h-full bg-green-500 w-[60%]" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 opacity-40">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                        🚀
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold">Complete roadmap</p>
                                        <p className="text-[10px] text-white/50 uppercase font-black">Interview Ready Badge</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 mt-4 border-t border-white/10">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-xs font-black uppercase text-white/50 tracking-widest">Total Mastery</span>
                                    <span className="text-2xl font-black text-primary">{localRoadmap.progress}%</span>
                                </div>
                                <Progress value={localRoadmap.progress} className="h-3 bg-white/10" indicatorClassName="bg-primary" />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="p-6 bg-primary/5 dark:bg-primary/10 rounded-3xl border border-primary/20 space-y-4 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform duration-1000">
                            <Zap size={80} className="text-primary fill-current" />
                        </div>
                        <h5 className="font-black text-xs uppercase tracking-widest text-primary flex items-center gap-2">
                            <Zap size={14} className="fill-current" />
                            AI Coach Tip
                        </h5>
                        <p className="text-sm font-bold text-neutral-800 dark:text-neutral-200 relative z-10 leading-relaxed">
                            "You are doing great on {localRoadmap.id === 'dsa-mastery' ? 'Arrays' : 'System Basics'}! Try completing 2 more medium problems today to maintain your streak."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoadmapDetail;
