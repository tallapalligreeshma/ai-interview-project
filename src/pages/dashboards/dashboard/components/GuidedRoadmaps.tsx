import { useState } from "react";
import { roadmapData } from "@/data/roadmapData";
import RoadmapCard from "./roadmaps/RoadmapCard";
import RoadmapDetail from "./roadmaps/RoadmapDetail";
import { Sparkles, TrendingUp, Zap } from "lucide-react";

const GuidedRoadmaps = () => {
    const [selectedRoadmapId, setSelectedRoadmapId] = useState<string | null>(null);

    const selectedRoadmap = roadmapData.find(r => r.id === selectedRoadmapId);

    if (selectedRoadmapId && selectedRoadmap) {
        return (
            <RoadmapDetail 
                roadmap={selectedRoadmap} 
                onBack={() => setSelectedRoadmapId(null)} 
            />
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* AI Recommendation Header */}
            <div className="relative overflow-hidden bg-gradient-to-r from-primary to-indigo-600 rounded-3xl p-8 text-white shadow-2xl shadow-primary/20">
                <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
                    <Sparkles size={160} />
                </div>
                
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full w-fit">
                            <Zap size={14} className="fill-current text-amber-400" />
                            <span className="text-[10px] font-black uppercase tracking-widest italic">AI Recommended for You</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight max-w-2xl">
                            Start with <span className="underline decoration-amber-400 decoration-4 underline-offset-8">Arrays (DSA)</span> to boost your 65% score.
                        </h2>
                        <p className="text-white/80 font-medium max-w-xl">
                            Our AI Coach analyzed your profile. Mastering Arrays fundamentals today will help you bridge the gap to high-tier technical interviews.
                        </p>
                    </div>
                    
                    <div className="flex flex-col items-center bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 text-center min-w-[200px]">
                        <div className="text-4xl font-black mb-1 flex items-center gap-2">
                            65% 
                            <TrendingUp size={24} className="text-green-400" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest text-white/60">Current Readiness</span>
                        <div className="w-full h-1.5 bg-white/10 rounded-full mt-4 overflow-hidden">
                            <div className="h-full bg-amber-400 w-[65%]" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Roadmaps Grid */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-black text-neutral-900 dark:text-white uppercase tracking-tight">Personalized Learning Paths</h3>
                        <p className="text-sm text-neutral-500 font-medium pt-1">Choose a structured roadmap to accelerate your preparation</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
                    {roadmapData.map((roadmap) => (
                        <RoadmapCard 
                            key={roadmap.id} 
                            roadmap={roadmap} 
                            onSelect={setSelectedRoadmapId} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GuidedRoadmaps;
