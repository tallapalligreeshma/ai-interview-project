/**
 * AiService.ts
 * Advanced AI Interview Preparation and Evaluation System 'Brain'.
 * Version: 5.1 (Refined Module Specs)
 */

export interface AiResponse {
    content: string;
    [key: string]: any;
}

export class AiService {
    private apiKey: string | null = null;
    private backendUrl: string | null = null;

    constructor() {
        this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || null;
        this.backendUrl = import.meta.env.VITE_AI_BACKEND_URL || null;
    }

    /**
     * Master Response Generator
     * Logic aligned with the refined multi-module AI spec.
     */
    async generateModuleResponse(module: string, context: any): Promise<any> {
        let systemPrompt = this.getModuleSystemPrompt(module);

        // Replace placeholders in systemPrompt with context values
        if (context) {
            Object.keys(context).forEach(key => {
                const regex = new RegExp(`{${key}}`, "g");
                systemPrompt = systemPrompt.replace(regex, context[key]);
            });
        }

        // Security Path: Use Backend Proxy if URL is configured
        if (this.backendUrl) {
            try {
                const response = await fetch(`${this.backendUrl}/api/ai/generate`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ systemPrompt, userContext: context })
                });
                return await response.json();
            } catch (error) {
                console.error(`Backend Proxy Error [${module}]:`, error);
                return this.getMockModuleResponse(module, context);
            }
        }

        // Direct Path: Use Client Key (Fallback for Dev)
        if (!this.apiKey) {
            return this.getMockModuleResponse(module, context);
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
                        { role: "system", content: systemPrompt },
                        { role: "user", content: JSON.stringify(context) }
                    ],
                    response_format: { type: "json_object" }
                })
            });
            const data = await response.json();
            return JSON.parse(data.choices[0].message.content);
        } catch (error) {
            console.error(`AI Error in module [${module}]:`, error);
            return this.getMockModuleResponse(module, context);
        }
    }

    private getModuleSystemPrompt(module: string): string {
        const base = "Act as an advanced AI Interview System. Keep answers clear, structured, and professional. Use simple professional English. Avoid long paragraphs. Return ONLY JSON.";
        
        const prompts: any = {
            "roles": `${base} Module: Roles. Generate 10 entry-level IT roles for freshers. JSON: { roles: [{ title, description }] }`,
            "questions": `You are an expert technical interviewer. Generate 5 high-quality interview questions for the Role: {role} and Category: {category}. 
            If category is 'coding', generate real-world coding problems with constraints. 
            If category is 'technical', focus on core concepts and system design.
            If category is 'behavioral', focus on situation-based HR questions.
            Experience Level: Fresher. 
            Guidelines: 
            - Questions must be relevant to the selected role.
            - Keep them simple and beginner-friendly.
            - Avoid very advanced or confusing topics.
            - Do not include answers.
            - Questions should feel like real interview questions.
            - Make questions slightly progressive in difficulty. 
            Return ONLY JSON: { questions: [{ question, difficulty }] }`,
            "technical_mock": `${base} You are a technical interviewer for {role}. Ask theoretical questions on Core concepts, OOP, DBMS, OS, and Networking. After each answer: Score it (0-100), give improvement suggestions, and ask a follow-up question. Use real-world analogies. Return ONLY JSON: { question, difficulty, followUp: true }`,
            "evaluation": `You are an expert interviewer. Evaluate the candidate's answer. Provide evaluation in this exact JSON format: 
            { 
                "score": number (out of 10), 
                "strengths": ["point 1", "point 2"], 
                "improvements": ["point 1", "point 2"], 
                "thoughtAnalysis": "Analyze the candidate's current thought process based on their answer. Identify where their logic is strong and where it fails.",
                "howToThink": "Provide a step-by-step logical guide on how to approach this specific question correctly. Focus on the mental framework, not just the code/text.",
                "idealAnswer": "Provide the complete, high-quality ideal answer that a top-tier candidate would give.",
                "suggestion": "One clear actionable tip for the future."
            }`,
            "aptitude": `${base} You are an aptitude test evaluator. Ask logical reasoning, quantitative, and problem-solving questions. Mix easy to medium difficulty. Provide 4 options (MCQ). Wait for answer. Give correct answer + explanation. Track score. JSON: { question, options: [4 strings], correct_answer, explanation }`,
            "coding": `${base} You are a coding interviewer. Ask coding problems starting with basic and increasing difficulty. Evaluate: Correctness, Time complexity, Optimization. Suggest better approach if needed. JSON: { problem_statement, constraints, test_cases, initial_code }`,
            "hr": `${base} You are an HR interviewer. Ask behavioral questions: Tell me about yourself, Strengths & weaknesses, Why should we hire you. Evaluate: Communication clarity, Confidence, Structure. Give feedback (Concise, Confidence). JSON: { question, feedback_focus }`,
            "practice": `${base} Module: Practice. Always explain logic with real-world real-time examples. JSON: { questions: [{ question, explanation, answer }] }`,
            "aptitude_hub_gen": `${base} You are an aptitude practice system. Generate questions based on Topic: {topic}, Subtopic: {subtopic}, Difficulty: {difficulty}, and Mode: {mode} (most repeated / company-wise / mixed). Focus on real interview-level repeated questions. Return ONLY JSON: { questions: [{ question, options: [4 strings], correct_answer, explanation, frequency: "e.g., Asked 10 times", companies: ["Google", "TCS"] }] }`,
            "resume_driven_questions": `${base} You are an AI interviewer analyzing candidate resume for {role}. Resume: {resume_data}. Ask questions based on Projects, Skills, and Experience. Check if answers are genuine. JSON: { questions: [{ question, difficulty, focus_area }] }`,
            "mock_test": `${base} Module: Mock Test. For Aptitude, generate topic-wise MCQs. For HR, use real behavioral questions. For Coding, use real-world logic problems. JSON: { test: { mcq: [{q, small_options:[], a}], coding: [{q, a}], hr: [{q, a}] } }`,
            "final_summary": `${base} Module: Final Summary. Based on full performance: Give Overall Score (0-100), Status: Hire Ready / Not Ready, Breakdown (Technical, Communication, Problem-solving). JSON: { overallScore, status, breakdown: { technical, communication, problemSolving }, feedback }`,
        };

        return prompts[module] || base;
    }

    private getMockModuleResponse(module: string, context: any): any {
        const mocks: any = {
            "roles": {
                roles: [
                    { title: "Junior Web Developer", description: "Build and maintain websites." },
                    { title: "Associate Software Engineer", description: "Develop and test software components." },
                    { title: "UI/UX Designer", description: "Design user-friendly interfaces." },
                    { title: "QA Tester", description: "Ensure software quality and bug-free performance." },
                    { title: "Cloud Support Associate", description: "Assist with cloud infrastructure management." },
                    { title: "Data Analyst", description: "Analyze data for business insights." },
                    { title: "Network Support Engineer", description: "Maintain and troubleshoot IT networks." },
                    { title: "Cybersecurity Analyst", description: "Monitor and protect system security." },
                    { title: "Full Stack Intern", description: "Learn and work on both frontend and backend." },
                    { title: "Technical Support Executive", description: "Provide technical assistance to users." }
                ]
            },
            "questions": {
                questions: [
                    { question: "What is the difference between var, let, and const?", difficulty: "Easy" },
                    { question: "Explain the event loop in JavaScript.", difficulty: "Medium" },
                    { question: "How does React's Virtual DOM work?", difficulty: "Medium" },
                    { question: "Design a simple API using Node.js.", difficulty: "Hard" },
                    { question: "How do you optimize a React app's performance?", difficulty: "Hard" }
                ]
            },
            "dashboard": {
                welcomeMessage: `Welcome back, ${context.name || 'Candidate'}!`,
                progressSummary: "You have completed 12 mocks with an average score of 78%.",
                nextRecommendedAction: "Complete the 'System Design' deep-dive session.",
                improvementSuggestion: "Try to use more 'Star Method' examples in your behavioral answers."
            },
            "technical_mock": {
                question: "Explain the difference between a Process and a Thread.",
                difficulty: "Medium",
                expectedKeyPoints: ["Memory Space", "Context Switching", "Overhead"]
            },
            "evaluation": {
                score: 8,
                strength: ["Great technical accuracy"],
                mistake: ["Missed context switching overhead details"],
                improvedAnswer: "A process is an instance of a program..."
            },
            "voice_interview": {
                confidenceScore: 7,
                fluencyFeedback: "Solid pace, some filler words.",
                mistake: "Used 'um' repeatedly.",
                improvedVersion: "Essentially, processes are isolated while threads share resources."
            },
            "video_interview": {
                expressionScore: 9,
                communicationScore: 8,
                confidenceFeedback: "Strong facial focus.",
                improvementTip: "Maintain steady eye contact during complex explanations."
            },
            "hire_decision": {
                decision: "Hire",
                confidencePercentage: 85,
                strengths: ["Strong fundamentals", "Clear communication"],
                weaknesses: ["Needs more edge-case awareness"],
                improvementSuggestions: ["Study distributed locking"],
                finalFeedback: "Exceeded expectations on logic. Ready for Senior interviews."
            },
            "ai_assistant": {
                response: "To improve your Java performance, focus on Garbage Collection tuning and using efficient data structures like ConcurrentHashMap."
            },
            "practice": {
                questions: [
                    { question: "What is an Index in SQL?", explanation: "An index is a pointer to the data in a table.", answer: "A data structure that improves data retrieval speed." }
                ]
            },
            "performance": {
                strengths: ["High logical accuracy", "Consistent pace"],
                weakAreas: [{ skill: "System Design", reason: "Scalability patterns need review." }],
                improvementPlan_3Day: ["Day 1: Study CAP Theorem", "Day 2: Mock Load Balancing", "Day 3: Final Design Review"],
                suggestedTopics: ["Docker", "Kubernetes", "Microservices"]
            },
            "aptitude_hub_gen": {
                questions: [
                    { 
                        question: "A mixture contains milk and water in the ratio 5:1. On adding 5 liters of water, the ratio becomes 5:2. The quantity of milk in the mixture is:", 
                        options: ["16 liters", "25 liters", "22.75 liters", "32.5 liters"], 
                        correct_answer: "25 liters", 
                        explanation: "Initially, let milk and water be 5x and x. Adding 5L water: 5x / (x+5) = 5/2. Solving gives x=5. Milk = 5*5 = 25.",
                        frequency: "Asked 15+ times",
                        companies: ["TCS", "Accenture"]
                    },
                    { 
                        question: "Pointing to a man, a woman said, 'His mother is the only daughter of my mother.' How is the woman related to the man?", 
                        options: ["Mother", "Grandmother", "Sister", "Daughter"], 
                        correct_answer: "Mother", 
                        explanation: "Only daughter of my mother = ME. So, his mother is ME. The woman is the man's mother.",
                        frequency: "High Frequency",
                        companies: ["Goldman Sachs", "Infosys"]
                    },
                    { 
                        question: "If 5 computers can build 5 apps in 5 minutes, how many minutes will it take for 100 computers to build 100 apps?", 
                        options: ["100 minutes", "5 minutes", "1 minute", "20 minutes"], 
                        correct_answer: "5 minutes", 
                        explanation: "One computer builds one app in 5 minutes. So 100 computers will build 100 apps in the same 5 minutes.",
                        frequency: "Trick Question Pattern",
                        companies: ["Google", "Amazon"]
                    }
                ]
            },
            "final_summary": {
                overallScore: 82,
                status: "Hire Ready",
                breakdown: { technical: 85, communication: 78, problemSolving: 82 },
                feedback: "Exceptional logic flow and consistency. Accuracy is in the top 3%. Recommended next step: Advanced System Design patterns."
            }
        };

        return mocks[module] || { error: "Module not found" };
    }

    // Standard high-level triggers
    async evaluateAnswer(question: string, answer: string): Promise<any> {
        return this.generateModuleResponse("evaluation", { question, answer });
    }

    async analyzeVoiceResponse(speechText: string): Promise<any> {
        return this.generateModuleResponse("voice_interview", { speech_text: speechText });
    }
}

export const aiService = new AiService();
