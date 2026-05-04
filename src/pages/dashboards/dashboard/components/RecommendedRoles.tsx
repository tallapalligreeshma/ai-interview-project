import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { 
    Code, 
    Layout, 
    Server, 
    Layers, 
    BarChart, 
    Brain, 
    Cpu, 
    Palette, 
    Terminal, 
    Cloud, 
    ArrowRight
} from "lucide-react";

interface Role2026 {
    id: string;
    title: string;
    category: string;
    difficulty: "Easy" | "Medium" | "Hard";
    icon: any;
}

const RecommendedRoles = () => {
    const navigate = useNavigate();
    const roles: Role2026[] = [
        { id: '1', title: 'Software Developer', category: 'IT', difficulty: 'Medium', icon: Code },
        { id: '2', title: 'Frontend Developer', category: 'IT', difficulty: 'Easy', icon: Layout },
        { id: '3', title: 'Backend Developer', category: 'IT', difficulty: 'Hard', icon: Server },
        { id: '4', title: 'Full Stack Developer', category: 'IT', difficulty: 'Hard', icon: Layers },
        { id: '5', title: 'Data Analyst', category: 'Data', difficulty: 'Easy', icon: BarChart },
        { id: '6', title: 'Data Scientist', category: 'Data', difficulty: 'Hard', icon: Brain },
        { id: '7', title: 'Machine Learning Engineer', category: 'Data', difficulty: 'Hard', icon: Cpu },
        { id: '8', title: 'UI/UX Designer', category: 'Design', difficulty: 'Medium', icon: Palette },
        { id: '9', title: 'DevOps Engineer', category: 'Cloud', difficulty: 'Hard', icon: Terminal },
        { id: '10', title: 'Cloud Engineer', category: 'Cloud', difficulty: 'Medium', icon: Cloud },
    ];

    const [selectedRole, setSelectedRole] = useState<Role2026 | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Easy': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800';
            case 'Medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
            case 'Hard': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
            default: return 'bg-blue-100 text-blue-700';
        }
    };

    const handleStartPrep = (role: Role2026) => {
        setSelectedRole(role);
        setIsModalOpen(true);
    };

    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                        <span className="p-1.5 bg-primary/10 text-primary rounded-lg uppercase text-[10px] font-black tracking-widest">Recommended</span>
                        Recommended Roles for 2026
                    </h2>
                    <p className="text-sm text-neutral-500 dark:text-slate-400 mt-1">High-demand roles tailored for freshers in the coming year</p>
                </div>
                <Button variant="ghost" className="text-primary font-bold text-xs uppercase tracking-wider group">
                    View All <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {roles.map((role) => (
                    <Card key={role.id} className="group glass-premium-blue border-white/5 hover:border-[#6366F1]/40 cursor-pointer overflow-hidden transform hover:-translate-y-2 smooth-transition">
                        <CardHeader className="p-5 pb-2">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-[#6366F1]/10 rounded-2xl group-hover:bg-[#6366F1]/20 group-hover:text-[#22D3EE] transition-all duration-300">
                                    <role.icon size={22} className="smooth-transition group-hover:scale-110" />
                                </div>
                                <Badge variant="outline" className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border-none", getDifficultyColor(role.difficulty))}>
                                    {role.difficulty}
                                </Badge>
                            </div>
                            <CardTitle className="text-[16px] font-bold tracking-tight leading-tight mb-1 text-white group-hover:text-[#22D3EE] transition-colors">
                                {role.title}
                            </CardTitle>
                            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">{role.category}</p>
                        </CardHeader>
                        <CardFooter className="p-5 pt-4 border-t border-white/5">
                            <Button 
                                onClick={() => handleStartPrep(role)}
                                className="w-full text-[10px] font-black uppercase tracking-[0.15em] bg-[#6366F1]/20 text-white hover:bg-[#6366F1] border border-[#6366F1]/30 rounded-xl h-10 transition-all shadow-[0_0_15px_rgba(99,102,241,0.1)]"
                            >
                                Start Prep
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            {selectedRole?.icon && <selectedRole.icon size={20} className="text-primary" />}
                            {selectedRole?.title}
                        </DialogTitle>
                        <DialogDescription className="pt-2">
                           Preparing your personalized AI-driven study path for the <span className="font-bold text-neutral-900 dark:text-white">{selectedRole?.title}</span> role.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-6 flex flex-col items-center justify-center space-y-4">
                        <div className="relative w-12 h-12">
                            <div className="absolute inset-0 rounded-full border-2 border-primary/20 border-t-primary animate-spin"></div>
                        </div>
                        <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Analyzing industry trends for 2026...</p>
                    </div>
                    <DialogFooter>
                        <Button 
                            className="w-full" 
                            onClick={() => {
                                setIsModalOpen(false);
                                if (selectedRole) {
                                    navigate(`/interview/${selectedRole.title.toLowerCase().replace(/\s+/g, '-')}`);
                                }
                            }}
                        >
                            Continue to Practice
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>
    );
};

export default RecommendedRoles;
