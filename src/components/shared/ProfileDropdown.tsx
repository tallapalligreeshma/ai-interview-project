import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth, getUserProfile } from "@/firebase";
import { cn } from "@/lib/utils";
import { signOut } from "firebase/auth";
import { Loader2, LogOutIcon, Mail, Settings, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

interface UserProfile {
  username?: string;
}

const ProfileDropdown = () => {
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const handleLogout = () => {
    setTimeout(() => {
      setLoggingOut(true);
      signOut(auth).then(() => {
        navigate('/auth/login');
        toast.success('You logged out successfully.')
      }).catch((error) => {
        console.log(error);
      });
    }, 1000);
  }

  // Set User info
  useEffect(() => {
    if (user?.uid) {
      getUserProfile(user.uid).then((data) => {
        setProfile(data as UserProfile);
      });
    }
  }, [user]);

  if (loading) {
    return (
     <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50">
           <Loader2 className="h-11 w-11 animate-spin text-neutral-900" />
           <p className="mt-4 text-neutral-900 font-semibold animate-pulse text-xl">Loading...</p>
         </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>{`Error: ${error}`}</p>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full sm:w-10 sm:h-10 w-8 h-8 focus-visible:ring-0 border-0 cursor-pointer font-bold transition-all duration-300 bg-[#6366F1]/20 hover:bg-[#6366F1]/30 text-[#22D3EE] border-[#6366F1]/30 shadow-[0_0_10px_rgba(99,102,241,0.2)]"
        >
          {user?.photoURL ? (
            <img src={user.photoURL} className="rounded-full" />
          ) : (
            <>
              {profile?.username?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "U"}
            </>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="sm:w-[300px] min-w-[250px] right-[40px] absolute p-4 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 bg-[#111827]/90 backdrop-blur-2xl border border-[#6366F1]/30 text-white"
        side="bottom"
        align="end"
      >
        <div className="py-3 px-4 rounded-lg flex items-center justify-between bg-[#6366F1]/10 border border-[#6366F1]/20">
          <div>
            <h6 className="text-lg font-semibold mb-0 text-white">
              {profile?.username || user?.displayName || "User Name"}
            </h6>
            <span className="text-sm text-slate-400">
              Admin
            </span>
          </div>
        </div>

        <div className="max-h-[400px] overflow-y-auto scroll-sm pt-4">
          <ul className="flex flex-col gap-3">
            {[
              { to: "/view-profile", icon: User, label: "My Profile" },
              { to: "/email", icon: Mail, label: "Inbox" },
              { to: "/company", icon: Settings, label: "Settings" }
            ].map((item, i) => (
              <li key={i} className="flex">
                <Link
                  to={item.to}
                  className="flex items-center gap-3 w-full transition-colors text-slate-300 hover:text-[#22D3EE]"
                >
                  <item.icon className="w-5 h-5" /> {item.label}
                </Link>
              </li>
            ))}
            <li className="flex ms-[2px]">
              <Button
                variant="ghost"
                className={cn(
                  "!p-0 h-auto w-full justify-start font-normal !bg-transparent cursor-pointer flex items-center gap-3 text-[16px] transition-colors text-slate-300 hover:text-red-400",
                  loggingOut && "text-red-600"
                )}
                onClick={handleLogout}>
                <LogOutIcon className="size-5" />
                {loggingOut ? 'Logging out...' : "Logout"}
              </Button>
            </li>
          </ul>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
