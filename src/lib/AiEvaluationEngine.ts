import { AnalysisResponse } from "./AiAnalyzerService";

export interface ResumeData {
  text?: string;
  parsedJSON?: any;
}

export interface CandidateProfile {
  technicalSkills: string[];
  toolsAndFrameworks: string[];
  projects: string[];
  experienceLevel: string;
  weakAreas: string[];
}

export interface QuestionType {
  id: string;
  type: "technical" | "project" | "problem-solving" | "behavioral";
  content: string;
  focus: string;
}

export interface AnswerEvaluation {
  technicalCorrectness: number; // out of 40
  clarity: number; // out of 20
  depthOfKnowledge: number; // out of 20
  communication: number; // out of 20
  totalScore: number; // out of 100
  feedback: string;
}

export interface InterviewSession {
  resume: ResumeData;
  profile: CandidateProfile;
  questions: QuestionType[];
  answers: { questionId: string; answerText: string }[];
  evaluations: Record<string, AnswerEvaluation>;
}

export interface FinalResult {
  score: number;
  decision: "Hire" | "Maybe Hire" | "Not Hire";
  feedback: string;
  improvements: string[];
}

export class AiEvaluationEngine {
  private apiKey: string | null = null;
  
  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || null;
  }

  // STEP 1: RESUME ANALYSIS MODULE
  public async analyzeResume(resume: ResumeData): Promise<CandidateProfile> {
    if (!this.apiKey) {
      return this.mockResumeProfile();
    }
    
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4-turbo",
          messages: [
            { 
              role: "system", 
              content: "Extract Candidate Profile from Resume. Return JSON: { technicalSkills: string[], toolsAndFrameworks: string[], projects: string[], experienceLevel: string, weakAreas: string[] }" 
            },
            { role: "user", content: `Resume: ${JSON.stringify(resume)}` }
          ],
          response_format: { type: "json_object" }
        })
      });
      const data = await response.json();
      return JSON.parse(data.choices[0].message.content) as CandidateProfile;
    } catch (e) {
      console.error(e);
      return this.mockResumeProfile();
    }
  }

  // STEP 2: QUESTION GENERATION ENGINE
  public async generateQuestions(profile: CandidateProfile): Promise<QuestionType[]> {
    if (!this.apiKey) {
      return this.mockQuestions();
    }
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4-turbo",
          messages: [
            { 
              role: "system", 
              content: `Generate 4 interview questions based on candidate profile. One of each type: technical, project, problem-solving, behavioral. 
              Return JSON: { questions: [{ id, type, content, focus }] }` 
            },
            { role: "user", content: `Profile: ${JSON.stringify(profile)}` }
          ],
          response_format: { type: "json_object" }
        })
      });
      const data = await response.json();
      return JSON.parse(data.choices[0].message.content).questions as QuestionType[];
    } catch (e) {
      console.error(e);
      return this.mockQuestions();
    }
  }

  // STEP 4: AI EVALUATION ENGINE
  public async evaluateAnswer(question: QuestionType, answerText: string): Promise<AnswerEvaluation> {
    if (!this.apiKey) {
      return this.mockEvaluation();
    }
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4-turbo",
          messages: [
             { 
              role: "system", 
              content: `Evaluate the user's answer. Weights: Technical Correctness (40), Clarity (20), Depth (20), Communication (20).
              Return JSON: { technicalCorrectness, clarity, depthOfKnowledge, communication, totalScore, feedback }` 
            },
            { role: "user", content: `Question: ${question.content}\nFocus: ${question.focus}\nAnswer: ${answerText}` }
          ],
          response_format: { type: "json_object" }
        })
      });
      const data = await response.json();
      return JSON.parse(data.choices[0].message.content) as AnswerEvaluation;
    } catch (e) {
      console.error(e);
      return this.mockEvaluation();
    }
  }

  // STEP 5 & 6: FINAL RESULT AND IMPROVEMENT ENGINE
  public async generateFinalResult(session: InterviewSession): Promise<FinalResult> {
    const evals = Object.values(session.evaluations);
    if (evals.length === 0) return this.mockFinalResult();

    const avgScore = Math.round(evals.reduce((sum, e) => sum + e.totalScore, 0) / evals.length);
    
    let decision: FinalResult["decision"] = "Not Hire";
    if (avgScore >= 80) decision = "Hire";
    else if (avgScore >= 50) decision = "Maybe Hire";

    if (!this.apiKey) {
      return {
        ...this.mockFinalResult(),
        score: avgScore,
        decision
      };
    }

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4-turbo",
          messages: [
            { 
              role: "system", 
              content: `You are the Final Result Engine and Improvement Engine.
              Create a personalized improvement plan.
              Return JSON matching the required final structure: 
              { score, decision, feedback, improvements: [] }`
            },
            { role: "user", content: `Session Data: ${JSON.stringify({ 
                evaluations: session.evaluations, 
                profile: session.profile,
                calculatedStatus: { score: avgScore, decision }
              })}` 
            }
          ],
          response_format: { type: "json_object" }
        })
      });
      const data = await response.json();
      return JSON.parse(data.choices[0].message.content) as FinalResult;
    } catch (e) {
      console.error(e);
      return { ...this.mockFinalResult(), score: avgScore, decision };
    }
  }

  // MOCK METHODS FOR DEVELOPMENT WITHOUT API_KEY OR OFFLINE MODE
  private mockResumeProfile(): CandidateProfile {
    return {
      technicalSkills: ["Java", "Spring Boot", "MySQL", "React"],
      toolsAndFrameworks: ["Git", "Docker", "AWS"],
      projects: ["AI Chatbot", "E-commerce system", "Portfolio Website"],
      experienceLevel: "Mid-Level Software Engineer",
      weakAreas: ["System Design", "Advanced Security (JWT/OAuth)"]
    };
  }

  private mockQuestions(): QuestionType[] {
    return [
      { id: "q1", type: "technical", content: "What is Dependency Injection and how does Spring Boot implement it?", focus: "Core Spring Boot Knowledge" },
      { id: "q2", type: "project", content: "Can you explain the architecture of your AI Chatbot project and any scalability challenges you faced?", focus: "Architectural Decisions" },
      { id: "q3", type: "problem-solving", content: "How would you optimize a slow database query in your E-commerce system?", focus: "Database Optimization" },
      { id: "q4", type: "behavioral", content: "Tell me about a time you disagreed with a team member on a technical decision.", focus: "Conflict Resolution" }
    ];
  }

  private mockEvaluation(): AnswerEvaluation {
    return {
      technicalCorrectness: 32,
      clarity: 15,
      depthOfKnowledge: 14,
      communication: 17,
      totalScore: 78,
      feedback: "Good explanation of Dependency Injection, but lacked details on how Spring handles bean scopes."
    };
  }

  private mockFinalResult(): FinalResult {
    return {
      score: 78,
      decision: "Maybe Hire",
      feedback: "Good technical knowledge but lacks depth in system design",
      improvements: [
        "Improve Spring Boot advanced concepts",
        "Learn System Design basics",
        "Practice explaining projects clearly"
      ]
    };
  }
}

export const aiEvaluationEngine = new AiEvaluationEngine();
