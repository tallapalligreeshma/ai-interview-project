import {
    Sidebar,
    SidebarContent,
    SidebarHeader
} from "@/components/ui/sidebar"
import { data } from "@/data/SidebarData"
import { cn } from "@/lib/utils"
import { Link, useLocation } from "react-router-dom"
import { NavMain } from "./NavMain"

import { BrainCircuit } from "lucide-react"

export function AppSidebar() {
    const { pathname } = useLocation();
    const isAiDashboard = pathname === '/ai-interview-dashboard';

    return (
        <Sidebar className="transition-all duration-300 bg-[#0B0F1A]/80 backdrop-blur-2xl border-r border-[#6366F1]/20 text-white shadow-[4px_0_30px_rgba(99,102,241,0.1)] [&_[data-sidebar=sidebar]]:bg-transparent">
            <SidebarHeader className="p-0 border-b transition-colors duration-300 border-[#6366F1]/20 bg-[#0B0F1A]/40">
                <Link to="/ai-interview-dashboard" className={cn(
                    "sidebar-logo min-h-[90px] py-6 flex items-center gap-3 px-6 transition-all",
                    isAiDashboard ? "hover:bg-white/5" : "hover:bg-neutral-50 dark:hover:bg-slate-800/50"
                )}>
                    <div className="bg-gradient-to-tr from-[#6366F1] to-[#8B5CF6] p-2 rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.4)]">
                        <BrainCircuit className="text-white w-6 h-6" />
                    </div>
                    <div>
                        <h1 className={cn(
                            "text-base font-black tracking-tight leading-tight",
                            isAiDashboard ? "text-white" : "text-neutral-800 dark:text-white"
                        )}>
                            AI Interview Coach
                        </h1>
                        <p className={cn(
                            "text-[9px] uppercase font-black tracking-[0.05em] leading-tight mt-0.5",
                            isAiDashboard ? "text-[#9CA3AF]" : "text-neutral-400 dark:text-slate-500"
                        )}>
                            Get Hired Faster with AI Mock Interviews
                        </p>
                    </div>
                </Link>
            </SidebarHeader>
            
            <SidebarContent className={cn(`scrollbar-thin`)}>
                {/* Wrap NavMain in a div to enforce text color overrides if needed */}
                <div className={cn(isAiDashboard ? "[&_a]:text-slate-300 [&_a:hover]:text-white [&_svg]:text-slate-400 [&_.bg-neutral-100]:bg-[#6366F1]/10 [&_.bg-neutral-100]:text-[#22D3EE]" : "")}>
                    <NavMain items={data.navMain} />
                </div>
            </SidebarContent>
        </Sidebar>
    )
}