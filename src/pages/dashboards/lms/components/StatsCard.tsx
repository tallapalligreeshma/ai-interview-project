import { cn } from "@/lib/utils";
import { DollarSign, UsersRound, Youtube } from "lucide-react";

export interface StatCardData {
  id: number;
  title: string;
  value: string;
  difference: string;
  changeType: string;
  iconBgColor: string;
  textColor: string;
  gradientFrom: string;
  gradientTo: string;
  icon?: any;
}

const statsData: StatCardData[] = [
  {
    id: 1,
    title: "Total Students",
    value: "15,000",
    difference: "+2.5k",
    changeType: "Growth",
    icon: UsersRound,
    iconBgColor: "bg-[#6366F1]/10",
    textColor: "text-[#6366F1]",
    gradientFrom: "glass-premium-blue",
    gradientTo: "border-white/5",
  },
  {
    id: 2,
    title: "Total Courses",
    value: "420",
    difference: "+30",
    changeType: "Active",
    icon: Youtube,
    iconBgColor: "bg-[#8B5CF6]/10",
    textColor: "text-[#8B5CF6]",
    gradientFrom: "glass-premium-blue",
    gradientTo: "border-white/5",
  },
  {
    id: 3,
    title: "Overall Revenue",
    value: "$50,000",
    difference: "+1.5k",
    changeType: "Income",
    icon: DollarSign,
    iconBgColor: "bg-[#22D3EE]/10",
    textColor: "text-[#22D3EE]",
    gradientFrom: "glass-premium-blue",
    gradientTo: "border-white/5",
  },
];

const StatsCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {statsData.map(
        ({
          id,
          title,
          value,
          difference,
          changeType,
          icon: Icon,
          iconBgColor,
          textColor,
        }) => (
          <div
            key={id}
            className="group glass-premium-blue p-6 rounded-[1.5rem] border-white/5 hover:border-white/10 transform hover:-translate-y-1 smooth-transition shadow-xl relative overflow-hidden"
          >
            <div className={cn("absolute -top-10 -right-10 w-24 h-24 blur-2xl rounded-full opacity-0 group-hover:opacity-20 smooth-transition", iconBgColor)} />
            
            <div className="flex items-center gap-5 mb-6 relative z-10">
              <div className={cn("w-12 h-12 flex items-center justify-center rounded-xl shadow-inner border border-white/5", iconBgColor, textColor)}>
                {Icon && <Icon size={24} />}
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{title}</p>
              </div>
            </div>

            <div className="flex items-end justify-between relative z-10">
              <h3 className="text-3xl font-black text-white tracking-tight italic">{value}</h3>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                  {difference}
                </span>
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{changeType}</span>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default StatsCard;