import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Layout, Server, ArrowRight, ShieldCheck } from "lucide-react";

const roles = [
  {
    title: "Frontend Developer",
    description: "Master React, Tailwind, and Design Systems.",
    icon: Layout,
    color: "cyan",
    difficulty: "Medium",
  },
  {
    title: "QA Tester",
    description: "Learn Automation, Selenium, and Jest.",
    icon: ShieldCheck,
    color: "purple",
    difficulty: "Easy",
  },
  {
    title: "Java Developer",
    description: "Deep dive into Spring Boot and Microservices.",
    icon: Server,
    color: "blue",
    difficulty: "Hard",
  },
];

const PremiumFeatureCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
      {roles.map((role, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -10 }}
          className="group"
        >
          <Card className="relative h-full bg-slate-900/40 backdrop-blur-xl border-white/5 overflow-hidden p-8 flex flex-col items-start gap-6 glow-border transition-all">
            <div className={`p-4 rounded-2xl bg-${role.color}-500/10 text-${role.color}-400 group-hover:scale-110 transition-transform duration-500`}>
              <role.icon size={32} />
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest border-white/10 text-slate-400">
                  {role.difficulty}
                </Badge>
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                {role.title}
              </h3>
              <p className="text-slate-400 font-medium leading-relaxed">
                {role.description}
              </p>
            </div>

            <div className="mt-auto pt-6 flex items-center justify-between w-full">
              <Button variant="ghost" className="text-white font-bold p-0 hover:bg-transparent group/btn">
                Start Prep 
                <ArrowRight size={18} className="ml-2 group-hover/btn:translate-x-2 transition-transform" />
              </Button>
              <div className="text-[10px] font-black text-white/5 uppercase tracking-[0.2em]">
                {role.title.split(' ')[0]}
              </div>
            </div>
            
            {/* Glossy overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default PremiumFeatureCards;
