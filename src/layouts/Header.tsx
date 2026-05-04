import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ModeToggle } from "@/components/ModeToggle";
import ProfileDropdown from "@/components/shared/ProfileDropdown";
import NotificationDropdown from "@/components/shared/NotificationDropdown";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { BrainCircuit } from "lucide-react";

/**
 * Clean & Minimal Topbar
 * Displays only essential actions: Notification, Theme, and Profile/Logout.
 */
const Header = () => {
    const { pathname } = useLocation();
    const isAiDashboard = pathname === '/ai-interview-dashboard';

    return (
        <header className="sticky top-0 z-50 w-full transition-all duration-300 border-b bg-[#0B0F1A]/70 backdrop-blur-2xl border-[#6366F1]/20 shadow-[0_4px_30px_rgba(99,102,241,0.1)]">
            <div className="max-w-[1600px] mx-auto flex items-center justify-between h-20 px-6 lg:px-10">
                
                {/* Left: Logo & Sidebar Trigger */}
                <div className="flex items-center gap-6">
                    <SidebarTrigger className={cn(
                        "!p-0 h-auto w-auto !bg-transparent cursor-pointer transition-colors",
                        isAiDashboard ? "text-slate-300 hover:text-[#22D3EE]" : "text-slate-700 hover:text-primary dark:text-slate-200"
                    )} />
                    
                    <Link to="/" className="flex items-center gap-3 group">
                        <motion.div
                            whileHover={{ rotate: 180 }}
                            transition={{ duration: 0.5 }}
                            className="bg-gradient-to-tr from-[#6366F1] to-[#8B5CF6] p-2.5 rounded-2xl shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                        >
                            <BrainCircuit className="text-white w-6 h-6" />
                        </motion.div>
                        <span className={cn(
                            "text-xl font-black tracking-tight",
                            isAiDashboard ? "text-white" : "bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300"
                        )}>
                            AI Interview <span className={cn("font-black", isAiDashboard ? "text-[#22D3EE]" : "text-primary")}>Coach</span>
                        </span>
                    </Link>
                </div>

                {/* Right: Actions (Notification, Theme, Profile) */}
                <div className="flex items-center gap-4 lg:gap-6">
                    <NotificationDropdown />
                    
                    <div className="bg-slate-100 dark:bg-slate-800 p-1.5 rounded-full flex items-center gap-2 shadow-inner">
                        <ModeToggle />
                    </div>

                    <div className="h-10 w-[1px] bg-slate-200 dark:bg-slate-800 hidden sm:block" />
                    
                    <ProfileDropdown />
                </div>
            </div>
        </header>
    );
};

export default Header;