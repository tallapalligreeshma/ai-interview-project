import {
  LayoutDashboard,
  Mic2,
  Video,
  BrainCircuit,
  LineChart,
  Target,
  Clock,
  LogOut
} from "lucide-react";

export const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/ai-interview-dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "AI Interview",
      url: "/interview",
      icon: Mic2,
    },
    {
      title: "Video Interview",
      url: "/video-interview",
      icon: Video,
    },
    {
      title: "Practice Hub",
      url: "/practice",
      icon: BrainCircuit,
    },
    {
      title: "Intelligence Analysis",
      url: "/performance",
      icon: LineChart,
    },
    {
      title: "Simulation History",
      url: "/history",
      icon: Clock,
    },
    {
      title: "Weakness Tracker",
      url: "/weakness-tracker",
      icon: Target,
    },
    {
      title: "Logout System",
      url: "/auth/login",
      icon: LogOut,
    }
  ],
};
