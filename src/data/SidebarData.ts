import {
  LayoutDashboard,
  Mic2,
  Video,
  BrainCircuit,
  LineChart,
  Target
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
      title: "AI Coach",
      url: "/ai-assistant",
      icon: BrainCircuit,
    },
    {
      title: "Intelligence Analysis",
      url: "/performance",
      icon: LineChart,
    },
    {
      title: "Weakness Tracker",
      url: "/weakness-tracker",
      icon: Target,
    }
  ],
};
