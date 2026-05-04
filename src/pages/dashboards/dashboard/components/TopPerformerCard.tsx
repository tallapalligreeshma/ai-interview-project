import CommonLink from "@/components/shared/CommonLink";
import { Card, CardContent } from "@/components/ui/card";
import { Code2, Globe, Layout, Server, Zap } from "lucide-react";

export interface TopSkill {
  id: number;
  name: string;
  icon: any;
  category: string;
  score: number;
}

const topSkills: TopSkill[] = [
  {
    id: 1,
    name: "React Hooks",
    icon: Layout,
    category: "Frontend",
    score: 92,
  },
  {
    id: 2,
    name: "JavaScript Closures",
    icon: Code2,
    category: "Core JS",
    score: 88,
  },
  {
    id: 3,
    name: "System Design",
    icon: Globe,
    category: "Architecture",
    score: 85,
  },
  {
    id: 4,
    name: "Node.js Streams",
    icon: Server,
    category: "Backend",
    score: 82,
  },
  {
    id: 5,
    name: "Data Structures",
    icon: Zap,
    category: "Problem Solving",
    score: 78,
  },
  {
    id: 6,
    name: "Tailwind CSS",
    icon: Layout,
    category: "Styling",
    score: 95,
  },
];

interface TopSkillsCardType {
  listClasses: string
}

const getSkillLevel = (score: number) => {
  if (score >= 90) return { label: "Expert", color: "bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400" };
  if (score >= 80) return { label: "Intermediate", color: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400" };
  return { label: "Beginner", color: "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400" };
};

const TopSkillsCard = ({ listClasses }: TopSkillsCardType) => {
  return (
    <Card className="bg-white dark:bg-slate-900 rounded-3xl p-0 border border-neutral-100 dark:border-slate-800 shadow-sm h-full overflow-hidden">
      <CardContent className="p-0 flex flex-col h-full">
        <div className="flex items-center justify-between p-6 pb-2">
          <h6 className="font-bold text-lg text-neutral-800 dark:text-white">Top Skills</h6>
          <CommonLink />
        </div>

      <div className="p-6 pt-4 flex-1 overflow-hidden">
        <div className={`${listClasses}`}>
          {topSkills.map((skill, index) => {
            const level = getSkillLevel(skill.score);
            return (
              <div
                className="group flex flex-col gap-3 mb-6 last:mb-0 hover:bg-neutral-50 dark:hover:bg-slate-800/30 p-1 rounded-xl transition-all"
                key={index}
              >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                            <skill.icon size={20} />
                        </div>
                        <div className="grow">
                            <h6 className="text-[13px] mb-0 font-bold text-neutral-700 dark:text-slate-200">
                                {skill.name}
                            </h6>
                            <span className="text-[10px] text-neutral-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                                {skill.category}
                            </span>
                        </div>
                    </div>
                    <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${level.color}`}>
                        {level.label}
                    </div>
                </div>
                
                <div className="space-y-1.5 px-1">
                    <div className="flex items-center justify-between text-[10px] font-bold">
                        <span className="text-neutral-400">Proficiency</span>
                        <span className="text-neutral-700 dark:text-slate-300">{skill.score}%</span>
                    </div>
                    <div className="w-full h-2 bg-neutral-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div 
                            className="bg-primary h-full rounded-full transition-all duration-1000" 
                            style={{ width: `${skill.score}%` }}
                        />
                    </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </CardContent>
    </Card>
  );
};

export default TopSkillsCard;
