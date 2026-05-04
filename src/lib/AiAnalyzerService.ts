/**
 * AI Service for Resume and Job Description Analysis.
 */

export interface AnalysisSection {
    title: string;
    items: string[];
    description?: string;
    score?: number;
}

export interface AnalysisResponse {
    summary: {
        experienceLevel: string;
        keyStrengths: string[];
    };
    likelyQuestions: { question: string; focus: string }[];
    redFlags: { issue: string; reason: string }[];
    skillGap: { missingSkill: string; impact: string }[];
    prepPlan: { study: string[]; practice: string[]; revise: string[] };
}

class AiAnalyzerService {
    private apiKey: string | null = null;
    private systemPrompt = `
You are an AI Resume & Interview Analyzer. Your job is to analyze a candidate’s resume and/or job description and generate highly targeted interview preparation insights.

### ANALYSIS TASKS
1. Extract: Skills, Technologies, Experience level, Projects.
2. Identify: Strength areas, Weak/missing skills, Risk areas (things interviewer will question).

### OUTPUT STRUCTURE
Return JSON format:
{
  "summary": { "experienceLevel": "...", "keyStrengths": ["...", "..."] },
  "likelyQuestions": [ { "question": "...", "focus": "..." } ],
  "redFlags": [ { "issue": "...", "reason": "..." } ],
  "skillGap": [ { "missingSkill": "...", "impact": "..." } ],
  "prepPlan": { "study": ["..."], "practice": ["..."], "revise": ["..."] }
}

### TONE
Analytical, Honest, Direct. Avoid basic questions. Focus on depth.
`;

    constructor() {
        this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || null;
    }

    async analyze(resume: string, jd: string): Promise<AnalysisResponse> {
        if (!this.apiKey) {
            return this.getMockAnalysis(resume, jd);
        }

        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: "gpt-4-turbo-preview",
                    messages: [
                        { role: "system", content: this.systemPrompt },
                        { role: "user", content: `RESUME:\n${resume}\n\nJOB DESCRIPTION:\n${jd}` }
                    ],
                    response_format: { type: "json_object" }
                })
            });
            const data = await response.json();
            return JSON.parse(data.choices[0].message.content);
        } catch (error) {
            console.error("Analysis Error:", error);
            return this.getMockAnalysis(resume, jd);
        }
    }

    private getMockAnalysis(resume: string, jd: string): AnalysisResponse {
        // Simplified mock logic based on keywords
        const isJunior = resume.toLowerCase().includes("fresher") || resume.toLowerCase().includes("intern");
        
        return {
            summary: {
                experienceLevel: isJunior ? "Entry Level / Junior" : "Mid-Senior Level",
                keyStrengths: ["Full Stack Development", "Problem Solving", "Cloud Infrastructure"]
            },
            likelyQuestions: [
                { question: "How did you manage state in your complex frontend projects?", focus: "Technical Depth" },
                { question: "Explain the scaling strategy for your recent backend implementation.", focus: "Systems Design" }
            ],
            redFlags: [
                { issue: "Vague Project Metrics", reason: "The resume mentions 'improved performance' but lacks numerical data (e.g., %, ms)." },
                { issue: "Skill-JD Mismatch", reason: "Job requires AWS expertise which is missing from current profile." }
            ],
            skillGap: [
                { missingSkill: "AWS / Cloud Native", impact: "High - Required for core infrastructure tasks." },
                { missingSkill: "System Design Patterns", impact: "Medium - Crucial for LLD/HLD rounds." }
            ],
            prepPlan: {
                study: ["AWS Lambda & S3", "Microservices Design Patterns"],
                practice: ["Whiteboard coding for Graphs", "STAR method for leadership"],
                revise: ["Database Indexing", "React Lifecycle Hooks"]
            }
        };
    }
}

export const aiAnalyzerService = new AiAnalyzerService();
