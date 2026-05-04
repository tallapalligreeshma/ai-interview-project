import { motion } from "framer-motion";
import { Users, TrendingUp, Award, Briefcase } from "lucide-react";

const stats = [
  {
    label: "Interviews Completed",
    value: "10,000+",
    icon: Users,
    color: "cyan",
  },
  {
    label: "Success Improvement",
    value: "85%",
    icon: TrendingUp,
    color: "green",
  },
  {
    label: "Top Talent Hired",
    value: "1,200+",
    icon: Award,
    color: "purple",
  },
  {
    label: "Partner Companies",
    value: "450+",
    icon: Briefcase,
    color: "blue",
  },
];

const PremiumStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative group h-[160px]"
        >
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-xl bg-${stat.color}-500/10 text-${stat.color}-400`}>
                <stat.icon size={20} />
              </div>
              <div className="flex gap-1">
                {[1, 2, 3].map((i) => (
                    <div key={i} className={`w-1 h-3 rounded-full bg-${stat.color}-400/20`} />
                ))}
              </div>
            </div>
            
            <div>
              <div className="text-3xl font-black text-white tracking-tight mb-1">
                {stat.value}
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
            
            {/* Background Glow */}
            <div className={`absolute -bottom-10 -right-10 w-24 h-24 bg-${stat.color}-500/10 blur-2xl rounded-full`} />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PremiumStats;
