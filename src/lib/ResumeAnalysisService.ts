/**
 * Resume Analysis Module for AI Interview Preparation Platform.
 */

export interface ResumeAnalysisReport {
    skills: string[];
    skillLevels: Record<string, number>;
    missingSkills: string[];
    score: number;
    level: "Beginner" | "Intermediate" | "Advanced";
    status: "Ready" | "Not Ready" | "Needs Improvement";
    decision: "Hire Ready" | "Maybe Hire" | "Not Ready";
    questions: string[];
    improvements: string[];
}

export class ResumeAnalysisService {
    private apiKey: string | null = null;
    private systemPrompt = `
You are an expert AI Resume Analyst and Recruiter. Your task is to analyze resumes and generate a comprehensive evaluation report.

### ANALYSIS RULES
1. **Skill Extraction**: Identify programming languages, frameworks, tools, databases, and projects.
2. **Skill Level Analysis**: Rate each skill from 1 to 10 based on depth/experience shown in the resume.
3. **Skill Gap Analysis**: Find missing skills required for industry job readiness (e.g., System Design, Cloud, Security).
4. **Scoring Logic**:
    - Technical Skills (40%)
    - Projects (25%)
    - Experience (20%)
    - Communication (15%)
    - Output a total score between 0-100.
5. **Decision Rules**:
    - 80-100: "Hire Ready" (🟢)
    - 50-79: "Maybe Hire" (🟡)
    - <50: "Not Ready" (🔴)
6. **Question Generation**: Generate technical, project-based, and behavioral questions.
7. **Improvement Roadmap**: Provide specific topics, skills, and communication tips to improve.

### OUTPUT FORMAT
You MUST return valid JSON matching this structure:
{
  "skills": ["..."],
  "skillLevels": { "SkillName": 8, ... },
  "missingSkills": ["..."],
  "score": 72,
  "level": "Beginner|Intermediate|Advanced",
  "status": "Ready|Not Ready|Needs Improvement",
  "decision": "Hire Ready|Maybe Hire|Not Ready",
  "questions": ["..."],
  "improvements": ["..."]
}
`;

    constructor() {
        this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || null;
    }

    /**
     * Analyzes a resume string or JSON object and returns a full report.
     */
    async analyzeResume(resumeSource: string | object, jobDescription: string = ""): Promise<ResumeAnalysisReport> {
        const resumeText = typeof resumeSource === 'string' 
            ? resumeSource 
            : JSON.stringify(resumeSource);

        if (!this.apiKey) {
            console.warn("No API key found, returning mock analysis.");
            return this.getMockAnalysis(resumeText);
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
                        { role: "user", content: `RESUME CONTENT:\n${resumeText}\n\nTARGET JOB DESCRIPTION (Optional):\n${jobDescription}` }
                    ],
                    response_format: { type: "json_object" }
                })
            });

            if (!response.ok) {
                throw new Error(`Cloud API Error: ${response.statusText}`);
            }

            const data = await response.json();
            return JSON.parse(data.choices[0].message.content) as ResumeAnalysisReport;
        } catch (error) {
            console.error("Resume Analysis Error:", error);
            return this.getMockAnalysis(resumeText);
        }
    }

    /**
     * Fallback mock analysis logic for testing or missing API key.
     */
    private getMockAnalysis(resumeText: string): ResumeAnalysisReport {
        const lowerText = resumeText.toLowerCase();
        
        // Very basic keyword heuristic for mock
        const hasJava = lowerText.includes("java");
        const hasReact = lowerText.includes("react");
        const hasSpringBoot = lowerText.includes("spring");
        
        const score = hasJava && hasSpringBoot && hasReact ? 82 : (hasJava ? 65 : 45);
        
        let decision: ResumeAnalysisReport["decision"] = "Not Ready";
        if (score >= 80) decision = "Hire Ready";
        else if (score >= 50) decision = "Maybe Hire";

        return {
            skills: ["Java", "Spring Boot", "React", "MySQL"],
            skillLevels: {
                "Java": 8,
                "Spring Boot": 6,
                "React": 5,
                "MySQL": 7
            },
            missingSkills: ["System Design", "AWS", "Microservices"],
            score: score,
            level: score > 80 ? "Advanced" : (score > 50 ? "Intermediate" : "Beginner"),
            status: score > 80 ? "Ready" : (score > 50 ? "Needs Improvement" : "Not Ready"),
            decision: decision,
            questions: [
                "What is Dependency Injection in Spring Boot?",
                "How would you optimize a database query in MySQL?",
                "Tell me about a challenge you faced in your e-commerce project.",
                "How do you handle state management in React?"
            ],
            improvements: [
                "Learn System Design basics (HLD/LLD)",
                "Get hands-on experience with AWS Cloud",
                "Practice advanced Data Structures and Algorithms",
                "Work on explaining technical concepts more clearly during interviews"
            ]
        };
    }
}

export const resumeAnalysisService = new ResumeAnalysisService();
