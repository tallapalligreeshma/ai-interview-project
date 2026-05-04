import { 
    Code, 
    Briefcase,
    LineChart,
    Play,
    Settings,
    History,
    Mic,
    House,
    Layout,
    Server,
    Layers,
    BarChart,
    Brain,
    Cpu,
    Palette,
    Terminal,
    Cloud,
    Shield,
    Smartphone,
    Database,
    Search,
    PenTool,
    Rocket,
    Globe,
    Zap,
    Users
} from "lucide-react";

// Define the Role type
export type Role = {
    id: string;
    title: string;
    department: string;
    category: string; // Tech, Non-Tech
    description: string;
    skills: string[];
    questionsCount: number;
    icon: any; // Lucide icon
}

export const rolesData: Role[] = [
    // IT Roles
    { id: '1', title: 'Java Developer', department: 'IT / Software', category: 'Tech', description: 'Build scalable applications using Java, Spring Boot, and Microservices.', skills: ['Java', 'Spring Boot', 'Hibernate', 'Microservices'], questionsCount: 85, icon: Code },
    { id: '2', title: 'Frontend Developer', department: 'IT / Software', category: 'Tech', description: 'Create responsive and interactive user interfaces using modern frameworks.', skills: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'], questionsCount: 120, icon: Layout },
    { id: '4', title: 'Full Stack Developer', department: 'IT / Software', category: 'Tech', description: 'Design and develop complete end-to-end solutions for web applications.', skills: ['MERN Stack', 'Next.js', 'PostgreSQL', 'Docker'], questionsCount: 150, icon: Layers },
    { id: '8', title: 'QA Tester', department: 'Security & Testing', category: 'Tech', description: 'Ensure software quality through automated and manual testing processes.', skills: ['Selenium', 'Cypress', 'Jira', 'Postman'], questionsCount: 80, icon: Shield },
    { id: 'sql-dev', title: 'SQL Developer', department: 'Database', category: 'Tech', description: 'Design, implement, and optimize complex database systems and queries.', skills: ['SQL Server', 'PostgreSQL', 'T-SQL', 'Optimization'], questionsCount: 75, icon: Database },
    { id: 'dotnet-dev', title: '.NET Developer', department: 'IT / Software', category: 'Tech', description: 'Build robust Windows and web applications using C# and .NET framework.', skills: ['C#', '.NET Core', 'ASP.NET', 'Azure'], questionsCount: 90, icon: Terminal },
    { id: '5', title: 'Android Developer', department: 'IT / Software', category: 'Tech', description: 'Develop high-performance mobile applications for the Android ecosystem.', skills: ['Kotlin', 'Java', 'Android SDK', 'Firebase'], questionsCount: 95, icon: Smartphone },
    { id: '6', title: 'DevOps Engineer', department: 'IT / Software', category: 'Tech', description: 'Streamline development and operations using automation and CI/CD.', skills: ['Docker', 'Kubernetes', 'AWS', 'Jenkins'], questionsCount: 85, icon: Cloud },
    { id: 'ai-intern', title: 'AI Stack Intern', department: 'Data & AI', category: 'Tech', description: 'Explore the full stack of AI development from models to deployment.', skills: ['Python', 'PyTorch', 'Next.js', 'LangChain'], questionsCount: 70, icon: Brain },
    { id: 'backend-dev', title: 'Backend Developer', department: 'IT / Software', category: 'Tech', description: 'Architect robust server-side logic and scalable database systems.', skills: ['Node.js', 'Python', 'PostgreSQL', 'Redis'], questionsCount: 130, icon: Server },
    { id: 'python-dev', title: 'Python Developer', department: 'IT / Software', category: 'Tech', description: 'Develop high-performance backends and automation scripts using Python.', skills: ['Python', 'Django', 'FastAPI', 'PostgreSQL'], questionsCount: 110, icon: Terminal },
    { id: 'ml-intern', title: 'Machine Learning Intern', department: 'Data & AI', category: 'Tech', description: 'Implement and train predictive models for real-world applications.', skills: ['Scikit-learn', 'TensorFlow', 'Python', 'NumPy'], questionsCount: 65, icon: Cpu },
    { id: 'swe-trainee', title: 'Software Engineer Trainee', department: 'IT / Software', category: 'Tech', description: 'Start your journey into professional software engineering and development.', skills: ['Algorithms', 'Data Structures', 'Git', 'Clean Code'], questionsCount: 100, icon: Rocket },

    // Non-IT Roles
    { id: '10', title: 'Data Analyst', department: 'Data & AI', category: 'Tech', description: 'Extract insights from data to drive strategic business decisions.', skills: ['Excel', 'SQL', 'Tableau', 'Power BI'], questionsCount: 90, icon: BarChart },
    { id: '17', title: 'Business Analyst', department: 'Business', category: 'Non-Tech', description: 'Analyze business processes and requirements to bridge IT and business.', skills: ['Requirements Gathering', 'Agile', 'Jira', 'UML'], questionsCount: 75, icon: LineChart },
    { id: 'system-eng', title: 'System Engineer', department: 'IT Infrastructure', category: 'Non-Tech', description: 'Design and manage complex IT systems and infrastructure.', skills: ['Networking', 'Linux', 'Security', 'Hardware'], questionsCount: 80, icon: Settings },
    { id: 'it-support', title: 'IT Support', department: 'HR & Support', category: 'Non-Tech', description: 'Provide technical assistance and resolve hardware/software issues.', skills: ['Troubleshooting', 'Customer Service', 'Windows', 'Basic Networking'], questionsCount: 65, icon: Users },
];
