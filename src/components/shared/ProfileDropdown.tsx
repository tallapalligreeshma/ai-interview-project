import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { LogOutIcon, Mail, Settings, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProfileDropdown = () => {
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);
  
  // Get user from localStorage with error handling
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem('user') || '{}');
    } catch (e) {
      return {};
    }
  })();
  const displayName = user.email ? user.email.split('@')[0] : 'Candidate';

  const handleLogout = () => {
    setLoggingOut(true);
    setTimeout(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/auth/login');
      toast.success('Neural Link Terminated successfully.');
    }, 800);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full sm:w-10 sm:h-10 w-8 h-8 focus-visible:ring-0 border-0 cursor-pointer font-bold transition-all duration-300 bg-[#6366F1]/20 hover:bg-[#6366F1]/30 text-[#22D3EE] border-[#6366F1]/30 shadow-[0_0_10px_rgba(99,102,241,0.2)] flex items-center justify-center uppercase"
        >
          {displayName[0]}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="sm:w-[300px] min-w-[250px] right-[40px] absolute p-4 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 bg-[#111827]/90 backdrop-blur-2xl border border-[#6366F1]/30 text-white"
        side="bottom"
        align="end"
      >
        <div className="py-3 px-4 rounded-lg flex items-center justify-between bg-[#6366F1]/10 border border-[#6366F1]/20">
          <div>
            <h6 className="text-lg font-semibold mb-0 text-white capitalize">
              {displayName}
            </h6>
            <span className="text-sm text-slate-400">
              Pro Member
            </span>
          </div>
        </div>

        <div className="max-h-[400px] overflow-y-auto scroll-sm pt-4">
          <ul className="flex flex-col gap-3">
            {[
              { to: "/settings", icon: User, label: "My Profile" },
              { to: "/history", icon: Mail, label: "Interview History" },
              { to: "/settings", icon: Settings, label: "Settings" }
            ].map((item, i) => (
              <li key={i} className="flex">
                <Link
                  to={item.to}
                  className="flex items-center gap-3 w-full transition-colors text-slate-300 hover:text-[#22D3EE] py-1"
                >
                  <item.icon className="w-5 h-5" /> {item.label}
                </Link>
              </li>
            ))}
            <li className="flex mt-2 pt-4 border-t border-white/5">
              <Button
                variant="ghost"
                className={cn(
                  "!p-0 h-auto w-full justify-start font-normal !bg-transparent cursor-pointer flex items-center gap-3 text-[16px] transition-colors text-slate-300 hover:text-red-400",
                  loggingOut && "text-red-600"
                )}
                onClick={handleLogout}>
                <LogOutIcon className="size-5" />
                {loggingOut ? 'Logging out...' : "Logout System"}
              </Button>
            </li>
          </ul>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
