import { 
    Calculator, 
    Target, 
    Brain, 
    Activity, 
    Timer, 
    Zap, 
    BookOpen,
    MessageSquare,
    CheckCircle2,
    Layers,
    PieChart,
    BarChart3,
    Clock,
    TrendingUp,
    Percent,
    Hash,
    Briefcase,
    FileText,
    Search,
    Type,
    ListChecks,
    RefreshCw,
    Sparkles
} from "lucide-react";

export interface AptitudeTopic {
    id: string;
    title: string;
    description: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    category: 'Quantitative' | 'Logical' | 'Verbal';
    icon: any;
}

export interface AptitudeQuestion {
    id: string;
    title: string;
    companies: string[];
    difficulty: 'Easy' | 'Medium' | 'Hard';
    category: string;
    level: 'Basics' | 'Intermediate' | 'Advanced';
    options: string[];
    correctOption: number;
    explanation: string;
}

export interface RoadmapStep {
    id: string;
    title: string;
    subtitle: string;
    goal: string;
    topics: string[];
    output: string;
    level: 'Basics' | 'Intermediate' | 'Advanced' | 'Practice';
}

export const roadmapSteps: RoadmapStep[] = [
    {
        id: 'basics',
        title: 'Basics',
        subtitle: 'Foundation Level',
        goal: 'Build strong calculation + core concepts',
        topics: ['Number System', 'Simplification', 'Percentages', 'Ratio & Proportion', 'Averages'],
        output: 'Solve easy questions in < 1 min',
        level: 'Basics'
    },
    {
        id: 'intermediate',
        title: 'Intermediate',
        subtitle: 'Application Level',
        goal: 'Apply concepts to real-world scenarios',
        topics: ['Profit & Loss', 'Time & Work', 'Speed & Distance', 'Mixtures & Alligation'],
        output: 'Solve moderate questions in 1–2 mins',
        level: 'Intermediate'
    },
    {
        id: 'advanced',
        title: 'Advanced',
        subtitle: 'Strategic Level',
        goal: 'Master complex and logical problems',
        topics: ['Data Interpretation', 'Probability', 'Permutations & Combinations'],
        output: 'Handle complex questions under pressure',
        level: 'Advanced'
    },
    {
        id: 'mock-tests',
        title: 'Mock Test',
        subtitle: 'Final Phase',
        goal: 'Strategy and full-length practice',
        topics: ['Full Length Mock Tests', 'Timer-based Speed Quiz', 'Performance Analysis'],
        output: 'Ready for final interview rounds',
        level: 'Practice'
    }
];

export const aptitudeTopics: AptitudeTopic[] = [
    // --- EASY LEVEL ---
    // Quantitative
    { id: 'percentages', title: 'Percentages', category: 'Quantitative', difficulty: 'Easy', description: 'Base change and profit basics.', icon: Percent },
    { id: 'profit-loss-easy', title: 'Profit & Loss', category: 'Quantitative', difficulty: 'Easy', description: 'Simple buy/sell scenarios.', icon: Target },
    { id: 'si', title: 'Simple Interest', category: 'Quantitative', difficulty: 'Easy', description: 'Basic interest calculations.', icon: TrendingUp },
    { id: 'averages', title: 'Average', category: 'Quantitative', difficulty: 'Easy', description: 'Combined averages basics.', icon: BarChart3 },
    { id: 'ratio', title: 'Ratio & Proportion', category: 'Quantitative', difficulty: 'Easy', description: 'Basic distribution problems.', icon: Layers },
    { id: 'num-sys-easy', title: 'Number System (basics)', category: 'Quantitative', difficulty: 'Easy', description: 'Divisibility and basic properties.', icon: Hash },
    { id: 'simplification', title: 'Simplification', category: 'Quantitative', difficulty: 'Easy', description: 'BODMAS and basic fractions.', icon: Zap },
    
    // Logical
    { id: 'num-series-easy', title: 'Number Series (basic)', category: 'Logical', difficulty: 'Easy', description: 'Simple linear patterns.', icon: Timer },
    { id: 'coding-easy', title: 'Coding-Decoding (simple)', category: 'Logical', difficulty: 'Easy', description: 'Letter shifts and symbol coding.', icon: Brain },
    { id: 'odd-one', title: 'Odd One Out', category: 'Logical', difficulty: 'Easy', description: 'Identifying outliers in sets.', icon: Search },
    { id: 'direction-easy', title: 'Direction Sense (basic)', category: 'Logical', difficulty: 'Easy', description: 'Basic North-South-East-West.', icon: Target },
    
    // Verbal
    { id: 'synonyms', title: 'Synonyms & Antonyms', category: 'Verbal', difficulty: 'Easy', description: 'Core vocabulary foundations.', icon: MessageSquare },
    { id: 'sentence-corr-easy', title: 'Sentence Correction (basic)', category: 'Verbal', difficulty: 'Easy', description: 'Basic grammar & tense rules.', icon: FileText },
    { id: 'fib', title: 'Fill in the Blanks', category: 'Verbal', difficulty: 'Easy', description: 'Contextual word placement.', icon: Type },
    { id: 'rc-easy', title: 'Reading Comprehension (short)', category: 'Verbal', difficulty: 'Easy', description: 'Short passages with direct facts.', icon: BookOpen },

    // --- MEDIUM LEVEL ---
    // Quantitative
    { id: 'time-work', title: 'Time & Work', category: 'Quantitative', difficulty: 'Medium', description: 'Efficiency and man-day problems.', icon: Activity },
    { id: 'speed-dist', title: 'Time, Speed & Distance', category: 'Quantitative', difficulty: 'Medium', description: 'Relative speed and train problems.', icon: Timer },
    { id: 'ci', title: 'Compound Interest', category: 'Quantitative', difficulty: 'Medium', description: 'Multi-year interest cycles.', icon: TrendingUp },
    { id: 'mixtures', title: 'Mixtures & Alligation', category: 'Quantitative', difficulty: 'Medium', description: 'Ratio mixing techniques.', icon: BarChart3 },
    { id: 'pnc-basic', title: 'Permutation & Combination (basic)', category: 'Quantitative', difficulty: 'Medium', description: 'Basic arrangements and selections.', icon: Layers },
    { id: 'prob-basic', title: 'Probability (basic)', category: 'Quantitative', difficulty: 'Medium', description: 'Dices, coins, and cards basics.', icon: Brain },
    { id: 'linear-eq', title: 'Linear Equations', category: 'Quantitative', difficulty: 'Medium', description: 'Solving for variables.', icon: Calculator },

    // Logical
    { id: 'blood-rel', title: 'Blood Relations', category: 'Logical', difficulty: 'Medium', description: 'Family tree structures.', icon: Briefcase },
    { id: 'seating-basic', title: 'Seating Arrangement (basic)', category: 'Logical', difficulty: 'Medium', description: 'Linear and circular basics.', icon: Layers },
    { id: 'syllogism', title: 'Syllogism', category: 'Logical', difficulty: 'Medium', description: 'Logical Venn diagrams.', icon: Brain },
    { id: 'coding-complex', title: 'Coding-Decoding (complex)', category: 'Logical', difficulty: 'Medium', description: 'Layered patterns and rules.', icon: Hash },
    { id: 'puzzle-basic', title: 'Puzzle (2–3 variables)', category: 'Logical', difficulty: 'Medium', description: 'Medium grid-based puzzles.', icon: Search },

    // Verbal
    { id: 'para-jumbles', title: 'Para Jumbles', category: 'Verbal', difficulty: 'Medium', description: 'Logical sentence ordering.', icon: ListChecks },
    { id: 'error-detection', title: 'Error Detection', category: 'Verbal', difficulty: 'Medium', description: 'Spotting grammatical nuances.', icon: CheckCircle2 },
    { id: 'rc-mod', title: 'Reading Comprehension (moderate)', category: 'Verbal', difficulty: 'Medium', description: 'Intermediate length and inference.', icon: BookOpen },
    { id: 'sentence-imp', title: 'Sentence Improvement', category: 'Verbal', difficulty: 'Medium', description: 'Refining syntax and flow.', icon: Sparkles },

    // --- HARD LEVEL ---
    // Quantitative
    { id: 'prob-adv', title: 'Probability (advanced)', category: 'Quantitative', difficulty: 'Hard', description: 'Conditional and complex events.', icon: Brain },
    { id: 'pnc-adv', title: 'Permutation & Combination (advanced)', category: 'Quantitative', difficulty: 'Hard', description: 'Constraints and circular arrangements.', icon: Layers },
    { id: 'di', title: 'Data Interpretation', category: 'Quantitative', difficulty: 'Hard', description: 'Graphs, caselets and complex tables.', icon: PieChart },
    { id: 'algebra', title: 'Algebra (quadratic, inequalities)', category: 'Quantitative', difficulty: 'Hard', description: 'Higher order math problems.', icon: Calculator },
    { id: 'geometry', title: 'Geometry & Mensuration', category: 'Quantitative', difficulty: 'Hard', description: 'Area, volume, and shapes.', icon: Target },
    { id: 'time-work-adv', title: 'Time & Work (advanced)', category: 'Quantitative', difficulty: 'Hard', description: 'Complex alternate days and pipes.', icon: Activity },

    // Logical
    { id: 'seating-complex', title: 'Seating Arrangement (complex)', category: 'Logical', difficulty: 'Hard', description: 'Multi-layer circular/floor setups.', icon: Layers },
    { id: 'puzzle-hard', title: 'High-level puzzles (5+ variables)', category: 'Logical', difficulty: 'Hard', description: 'Complex constraint management.', icon: Search },
    { id: 'log-deduction', title: 'Logical Deduction sets', category: 'Logical', difficulty: 'Hard', description: 'Advanced reasoning chains.', icon: Brain },
    { id: 'input-output', title: 'Input-Output', category: 'Logical', difficulty: 'Hard', description: 'Sequential processing rules.', icon: RefreshCw },
    { id: 'critical-reasoning', title: 'Critical Reasoning', category: 'Logical', difficulty: 'Hard', description: 'Evaluation and inference logic.', icon: Target },

    // Verbal
    { id: 'rc-hard', title: 'Reading Comprehension (long)', category: 'Verbal', difficulty: 'Hard', description: 'Long philosophical/technical text.', icon: BookOpen },
    { id: 'v-critical', title: 'Critical Reasoning', category: 'Verbal', difficulty: 'Hard', description: 'Assumptions and main points.', icon: Target },
    { id: 'para-completion', title: 'Para Completion', category: 'Verbal', difficulty: 'Hard', description: 'Advanced contextual concluding.', icon: Sparkles },
    { id: 'adv-grammar', title: 'Advanced Grammar', category: 'Verbal', difficulty: 'Hard', description: 'High-level syntactic nuances.', icon: FileText }
];

export const aptitudeQuestions: AptitudeQuestion[] = [
    // --- EASY ---
    {
        id: 'q1',
        title: 'The ratio of two numbers is 3:4 and their HCF is 4. What is their LCM?',
        companies: ['TCS', 'Infosys'],
        difficulty: 'Easy',
        category: 'Quantitative',
        level: 'Basics',
        options: ['12', '16', '24', '48'],
        correctOption: 4,
        explanation: 'Numbers = 3x and 4x. HCF is x, so x=4. Numbers are 12 and 16. LCM(12, 16) = 48.'
    },
    {
        id: 'q2',
        title: 'Choose the synonym of "ABANDON":',
        companies: ['Accenture', 'Capgemini'],
        difficulty: 'Easy',
        category: 'Verbal',
        level: 'Basics',
        options: ['Keep', 'Forsake', 'Adopt', 'Stay'],
        correctOption: 2,
        explanation: '"Abandon" means to leave or give up. "Forsake" is its direct synonym.'
    },

    // --- MEDIUM ---
    {
        id: 'q3',
        title: 'A can do work in 15 days, B in 20 days. If they work together for 4 days, what fraction of work is left?',
        companies: ['TCS', 'Citibank'],
        difficulty: 'Medium',
        category: 'Quantitative',
        level: 'Intermediate',
        options: ['1/4', '7/15', '8/15', '11/15'],
        correctOption: 3,
        explanation: "(1/15 + 1/20) * 4 = (7/60) * 4 = 7/15 work done. Left = 1 - 7/15 = 8/15."
    },
    {
        id: 'q4',
        title: 'Pointing to a photograph, a man said, "I have no brother or sister but that man\'s father is my father\'s son." Whose photograph was it?',
        companies: ['Infosys', 'Wipro'],
        difficulty: 'Medium',
        category: 'Logical',
        level: 'Intermediate',
        options: ['His own', 'His son\'s', 'His father\'s', 'His nephew\'s'],
        correctOption: 2,
        explanation: '"My father\'s son" is the man himself (since he suggests no siblings). So "his father is ME". Thus the man in photo is his son.'
    },

    // --- HARD ---
    {
        id: 'q5',
        title: 'In how many ways can 5 people be seated in a row such that two particular people always sit together?',
        companies: ['Morgan Stanley', 'Goldman Sachs'],
        difficulty: 'Hard',
        category: 'Quantitative',
        level: 'Advanced',
        options: ['24', '48', '72', '120'],
        correctOption: 2,
        explanation: 'Treat 2 people as 1 unit. Total 4 units. Permutations = 4! * 2! = 24 * 2 = 48.'
    },
    {
        id: 'q6',
        title: 'Seven people A, B, C, D, E, F, G are sitting in a circle. D is next to G and C. B is next to F and A. E is next to G and F. Who is sitting next to A and E?',
        companies: ['Google', 'Adobe'],
        difficulty: 'Hard',
        category: 'Logical',
        level: 'Advanced',
        options: ['B', 'C', 'F', 'G'],
        correctOption: 3,
        explanation: 'Following the neighbors: C-D-G-E-F-B-A. The neighbor common to A and E is F (forming the circle B-A-C-D-G-E-F-B... no, wait). Analyzing circle: A-B-F-E-G-D-C-A. F is next to B and E. Wait. Let\'s re-check. E is next to G and F. F is next to B and E. So loop is G-E-F-B-A... G is next to E and D. Loop: C-D-G-E-F-B-A. A is next to B and C. F is sitting between B and E.'
    }
];

export const preparationTips = [
    { id: 1, text: 'Learn tables up to 20 and squares up to 30 for speed.' },
    { id: 2, text: 'Master the concept of "Unitary Method" for Time and Work.' },
    { id: 3, text: 'Visualize DI problems using charts before calculating.' },
    { id: 4, text: 'Practice 20-20-20 rule: 20 questions in 20 mins every day.' }
];

export type { AptitudeTopic, AptitudeQuestion, RoadmapStep };
