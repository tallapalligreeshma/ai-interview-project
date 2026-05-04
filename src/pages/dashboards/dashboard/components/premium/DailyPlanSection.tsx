import React, { useState } from 'react';
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Clock, ChevronDown, Rocket, Code2, Monitor, MessageSquare, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Task {
    id: string;
    name: string;
    duration: number; // in mins
    completed: number; // in mins
    status: 'completed' | 'active' | 'pending';
    category: string;
}

const initialTasks: Task[] = [
    { id: '1', name: 'Arrays & Hashing Problems', duration: 45, completed: 45, status: 'completed', category: 'DSA' },
    { id: '2', name: 'System Design - Scalability', duration: 60, completed: 20, status: 'active', category: 'SYSTEM DESIGN' },
    { id: '3', name: 'Mock HR Interview', duration: 30, completed: 0, status: 'pending', category: 'BEHAVIORAL' },
    { id: '4', name: 'JavaScript Closures & Scopes', duration: 40, completed: 0, status: 'pending', category: 'JS' },
    { id: '5', name: 'Revise Database Sharding', duration: 30, completed: 0, status: 'pending', category: 'SYSTEM DESIGN' },
];

const DailyPlanSection = () => {
    const [tasks] = useState<Task[]>(initialTasks);
    const [role, setRole] = useState("Software Developer");

    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const totalTime = tasks.reduce((acc, t) => acc + t.duration, 0) / 60;
    const completedTime = tasks.reduce((acc, t) => acc + t.completed, 0) / 60;

    const getIcon = (category: string) => {
        switch(category) {
            case 'DSA': return <Code2 size={16} />;
            case 'SYSTEM DESIGN': return <Monitor size={16} />;
            case 'BEHAVIORAL': return <MessageSquare size={16} />;
            default: return <Zap size={16} />;
        }
    }

    return (
        <div className="flex flex-col h-full space-y-8">
            {/* Header */}
            <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Monday, Oct 12</p>
                <h2 className="text-3xl font-black text-slate-900 font-heading">Good Morning, Alex 👋</h2>
            </div>

            {/* Role Manager */}
            <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <Rocket size={18} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Optimizing for</p>
                        <p className="text-sm font-black text-slate-800">{role}</p>
                    </div>
                </div>
                <ChevronDown size={18} className="text-slate-300" />
            </div>

            {/* Task List */}
            <div className="flex-1 space-y-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Active Roadmap</p>
                <div className="space-y-3">
                    {tasks.map((task, idx) => (
                        <motion.div
                            key={task.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`p-4 rounded-3xl border transition-all ${
                                task.status === 'active' 
                                ? 'bg-indigo-50/50 border-indigo-200 shadow-lg shadow-indigo-500/5 ring-1 ring-indigo-100' 
                                : 'bg-white border-slate-50 hover:border-slate-200'
                            }`}
                        >
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className={`shrink-0 ${task.status === 'completed' ? 'text-green-500' : 'text-slate-200'}`}>
                                        {task.status === 'completed' ? <CheckCircle2 size={24} fill="currentColor" stroke="white" /> : <Circle size={24} />}
                                    </div>
                                    <div>
                                        <h4 className={`text-[13px] font-black leading-tight ${task.status === 'completed' ? 'text-slate-400 line-through decoration-2' : 'text-slate-800'}`}>
                                            {task.name}
                                        </h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] font-bold text-slate-400">09:00 AM</span>
                                            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-tighter flex items-center gap-1">
                                                • {task.category}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-[10px] font-black text-slate-400 bg-slate-50 px-2 py-1 rounded-lg uppercase">
                                    {task.duration}M
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Progress Footer */}
            <div className="pt-6 border-t border-slate-100">
                <div className="flex items-center justify-between mb-3">
                    <h5 className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Today's Progress</h5>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{completedTasks} of {tasks.length} Completed</span>
                </div>
                <Progress value={(completedTime / totalTime) * 100} className="h-2 rounded-full bg-slate-100" />
            </div>
        </div>
    );
};

export default DailyPlanSection;
