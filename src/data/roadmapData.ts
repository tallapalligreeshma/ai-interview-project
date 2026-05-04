import { 
    Code2, 
    Monitor, 
    Briefcase, 
    Zap
} from "lucide-react";

export interface RoadmapTask {
    id: string;
    title: string;
    completed: boolean;
}

export interface RoadmapVideo {
    id: string;
    title: string;
    duration: string;
    completed: boolean;
    thumbnail: string;
}

export interface RoadmapStep {
    id: string;
    title: string;
    subtitle: string;
    status: 'completed' | 'current' | 'upcoming';
    videos: RoadmapVideo[];
    tasks: RoadmapTask[];
    practice?: string[];
}

export interface Roadmap {
    id: string;
    title: string;
    category: string;
    duration: string;
    level: string;
    description: string;
    includes: string[];
    icon: any;
    color: string;
    progress: number;
    steps: RoadmapStep[];
}

export const roadmapData: Roadmap[] = [
    {
        id: 'dsa-mastery',
        title: 'DSA Mastery Roadmap',
        category: 'Technical',
        duration: '30–45 Days',
        level: 'Beginner → Advanced',
        description: 'Master data structures and algorithms from scratch with high-frequency interview questions.',
        includes: ['Arrays', 'Trees', 'Graphs', 'Dynamic Programming'],
        icon: Code2,
        color: 'from-blue-500 to-indigo-600',
        progress: 40,
        steps: [
            {
                id: 'step-1',
                title: 'Step 1: Foundations',
                subtitle: 'Master basic patterns and complexity analysis.',
                status: 'completed',
                videos: [
                    { id: 'v1', title: 'Arrays Basics', duration: '12 min', completed: true, thumbnail: 'https://img.youtube.com/vi/dpYVp9U-J7o/0.jpg' },
                    { id: 'v2', title: 'Time Complexity (Big-O)', duration: '18 min', completed: true, thumbnail: 'https://img.youtube.com/vi/V6mKVRU1evU/0.jpg' }
                ],
                tasks: [
                    { id: 't1', title: 'Solve 5 easy problems', completed: true }
                ],
                practice: ['Amazon frequency: Easy', 'Google frequency: Easy']
            },
            {
                id: 'step-2',
                title: 'Step 2: Core Problem Solving',
                subtitle: 'Learn Sliding Window and Two Pointer techniques.',
                status: 'current',
                videos: [
                    { id: 'v3', title: 'Sliding Window Explained', duration: '15 min', completed: false, thumbnail: 'https://img.youtube.com/vi/4m8E-i-6LqM/0.jpg' },
                    { id: 'v4', title: 'Two Pointers Pattern', duration: '10 min', completed: false, thumbnail: 'https://img.youtube.com/vi/9S6vV-1bXfM/0.jpg' }
                ],
                tasks: [
                    { id: 't2', title: 'Solve 5 medium problems', completed: false },
                    { id: 't3', title: 'Complete 2 timed problems', completed: false }
                ]
            },
            {
                id: 'step-3',
                title: 'Step 3: Advanced Topics',
                subtitle: 'Dive into Trees, Graphs and DP.',
                status: 'upcoming',
                videos: [
                    { id: 'v5', title: 'Trees & Graphs Introduction', duration: '25 min', completed: false, thumbnail: 'https://img.youtube.com/vi/jpsPjF5-9t8/0.jpg' },
                    { id: 'v6', title: 'Intro to Dynamic Programming', duration: '30 min', completed: false, thumbnail: 'https://img.youtube.com/vi/vYquumk4nWw/0.jpg' }
                ],
                tasks: [
                    { id: 't4', title: 'Solve 3 hard problems', completed: false },
                    { id: 't5', title: 'Revise mistakes in DP', completed: false }
                ]
            }
        ]
    },
    {
        id: 'system-design',
        title: 'System Design Roadmap',
        category: 'Architecture',
        duration: '15–20 Days',
        level: 'Intermediate',
        description: 'Learn how to design scalable systems for millions of users.',
        includes: ['Scalability', 'Caching', 'Database Design', 'Load Balancing'],
        icon: Monitor,
        color: 'from-purple-500 to-pink-600',
        progress: 10,
        steps: [
            {
                id: 'sd-step-1',
                title: 'Step 4: System Design Basics',
                subtitle: 'Foundational architecture concepts.',
                status: 'upcoming',
                videos: [
                    { id: 'v7', title: 'System Design Introduction', duration: '20 min', completed: false, thumbnail: 'https://img.youtube.com/vi/m8Icp_MC7S0/0.jpg' },
                    { id: 'v8', title: 'Load Balancing & Caching', duration: '22 min', completed: false, thumbnail: 'https://img.youtube.com/vi/mI6XG7U-fFE/0.jpg' }
                ],
                tasks: [
                    { id: 't6', title: 'Design URL Shortener', completed: false },
                    { id: 't7', title: 'Design Chat System', completed: false }
                ]
            }
        ]
    },
    {
        id: 'full-sde',
        title: 'Full SDE Interview Prep',
        category: 'Full Prep',
        duration: '60 Days',
        level: 'All-in-One',
        description: 'The ultimate preparation path covering everything you need for Big Tech.',
        includes: ['DSA', 'System Design', 'Mock Interviews', 'HR Prepping'],
        icon: Briefcase,
        color: 'from-orange-400 to-red-500',
        progress: 5,
        steps: [
            {
                id: 'fs-step-1',
                title: 'Step 5: Mock Interviews',
                subtitle: 'Simulate real interview environments.',
                status: 'upcoming',
                videos: [],
                tasks: [
                    { id: 't8', title: 'Complete 2 mock interviews', completed: false },
                    { id: 't9', title: 'Practice explaining solutions clearly', completed: false }
                ]
            }
        ]
    },
    {
        id: 'crash-plan',
        title: '30-Day Crash Plan',
        category: 'Fast-Track',
        duration: '30 Days',
        level: 'Advanced Review',
        description: 'Intensive fast-track for interviews coming up in the next month.',
        includes: ['High-Frequency DSA', 'System Design Patterns', 'Mock Blitz'],
        icon: Zap,
        color: 'from-green-400 to-emerald-600',
        progress: 0,
        steps: []
    }
];
