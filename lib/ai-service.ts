interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatResponse {
  choices: Array<{
    message: {
      content: string;
    };
    finish_reason: string;
  }>;
}

class AIService {
  private apiKey: string;
  private baseUrl = "https://llm.chutes.ai/v1/chat/completions";
  
  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_CHUTES_API_KEY || "";
    
    if (!this.apiKey) {
      console.error("NEXT_PUBLIC_CHUTES_API_KEY not found in environment variables");
      console.warn("Please add NEXT_PUBLIC_CHUTES_API_KEY to your .env.local file");
    }
  }

  private async makeRequest(messages: ChatMessage[], maxTokens: number = 1024): Promise<string> {
    try {
      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "deepseek-ai/DeepSeek-V3-0324",
          "messages": messages,
          "stream": false,
          "max_tokens": maxTokens,
          "temperature": 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data: ChatResponse = await response.json();
      return data.choices[0]?.message?.content || "I apologize, but I couldn't process that request.";
    } catch (error) {
      console.error('AI Service Error:', error);
      return "I'm currently experiencing technical difficulties. Please try again later.";
    }
  }

  // Code Explainer & Tutor
  async explainCode(code: string, language: string, question?: string): Promise<string> {
    const systemPrompt = `You are an expert programming tutor explaining Danial Bhatti's code. 
    You should be encouraging, educational, and highlight Danial's technical skills.
    Focus on explaining concepts clearly and mentioning advanced techniques used.`;

    const userPrompt = question 
      ? `Explain this ${language} code and answer: "${question}"\n\nCode:\n${code}`
      : `Explain this ${language} code in a clear, educational way. Highlight any advanced techniques or best practices used:\n\nCode:\n${code}`;

    return this.makeRequest([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ], 800);
  }

  // Smart Career Story Assistant
  async tellCareerStory(question: string): Promise<string> {
    const systemPrompt = `You are Danial Bhatti's AI career assistant. You know about his experience:
    
    EDUCATION: B.S. Computer Science at Pace University's Honors College (3.62/4.0 GPA), Economics Minor
    
    INTERNSHIPS:
    1. KLYR Media (May-July 2025) - Software Engineer & AI Intern in NYC
       - Built ML models with Python, TensorFlow, scikit-learn
       - Full-stack development with React, Node.js, REST APIs
       - Data cleaning/visualization, 40% efficiency improvement
    
    2. StudyFetch (Feb-May 2025) - Software Engineer & AI Intern in NYC  
       - Built 3 AI-powered educational tools with MERN stack for 5000+ users
       - Created AI tutoring assistant with OpenAI LLMs, LangChain, RAG
       - RESTful APIs for user-generated content at scale
       - Worked with Department of Education, 20+ team members
    
    3. Total Construction Corp (Sept 2023-Feb 2024) - Software Engineer & Finance Intern in NYC
       - MERN stack implementations with non-technical stakeholders
       - 90% increase in client outreach efficiency through automation
       - JWT auth, Express middleware, role-based access
    
    LEADERSHIP:
    - Co-Founder & Treasurer of Software Engineering Club (Sept 2023-Present)
    - VP of Entrepreneurship at United Pakistani Students & Alumni Association
    - Organized 10+ technical workshops, 200% engagement increase
    
    SKILLS: React, Next.js, TypeScript, Python, Node.js, AI/ML, OpenAI API, LangChain, AWS, Docker
    
    Answer questions about Danial's background in a professional, engaging way that would impress recruiters.
    Be enthusiastic about his achievements and highlight his growth, leadership, and technical skills.`;

    return this.makeRequest([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: question }
    ], 1200);
  }

  // Live Tech Discussion AI
  async discussTech(question: string): Promise<string> {
    const systemPrompt = `You are Danial Bhatti's AI tech discussion partner. You know his expertise in:
    - Full-stack development (React, Next.js, Node.js, Python)
    - AI/ML (OpenAI API, LangChain, TensorFlow, RAG pipelines)
    - Cloud technologies (AWS, Docker, Vercel)
    - Modern development practices (TypeScript, Git, CI/CD)
    
    Discuss current tech trends, best practices, and architectural decisions from Danial's perspective.
    Show deep technical knowledge while being accessible. Reference his real experience when relevant.
    Be knowledgeable about cutting-edge developments in AI, web development, and software architecture.`;

    return this.makeRequest([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: question }
    ], 1000);
  }

  // Smart Contact/Inquiry System
  async handleInquiry(inquiry: string, context: 'recruiter' | 'student' | 'collaborator' | 'general'): Promise<string> {
    const systemPrompts = {
      recruiter: `You are Danial Bhatti's AI assistant helping recruiters. Focus on:
      - His technical skills and project impact
      - Leadership experience and team collaboration
      - Readiness for software engineering roles
      - His passion for AI/ML and innovation
      Be professional and highlight why he'd be a great hire.`,
      
      student: `You are Danial Bhatti's AI assistant helping fellow students. Focus on:
      - Learning resources and study tips
      - How to get started with his tech stack
      - Advice on internships and skill development
      - Encouragement and mentorship
      Be supportive and educational.`,
      
      collaborator: `You are Danial Bhatti's AI assistant for potential collaborators. Focus on:
      - His project interests and capabilities
      - Open source contributions and teamwork
      - Technical challenges he enjoys solving
      - How to connect for projects
      Be collaborative and technical.`,
      
      general: `You are Danial Bhatti's AI assistant for general inquiries. Be helpful, professional, 
      and route them to appropriate contact methods or information about his work.`
    };

    return this.makeRequest([
      { role: 'system', content: systemPrompts[context] },
      { role: 'user', content: inquiry }
    ], 800);
  }

  // General chat for any AI assistant needs
  async chat(message: string, context?: string): Promise<string> {
    const systemPrompt = context || `You are Danial Bhatti's AI assistant. Be helpful, professional, 
    and knowledgeable about his work, skills, and background. Always be encouraging and highlight his strengths.`;

    return this.makeRequest([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: message }
    ], 1000);
  }

  async ragQuery(documentContent: string, documentName: string, userQuestion: string): Promise<string> {
    try {
      const systemPrompt = `You are an expert document analysis assistant. You have been given a document titled "${documentName}" and need to answer questions about it based ONLY on the content provided. 

Guidelines:
- Only use information from the provided document content
- If the answer isn't in the document, say so clearly
- Provide specific quotes or references when possible
- Be concise but comprehensive
- If asked to summarize, focus on the most important points`;

      const contextualPrompt = `Document: "${documentName}"

Content:
${documentContent}

Question: ${userQuestion}

Please provide a detailed answer based solely on the document content above.`;

      const response = await fetch('https://api.chutes.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'deepseek-v3-0324',
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            {
              role: 'user',
              content: contextualPrompt
            }
          ],
          max_tokens: 1500,
          temperature: 0.3 // Lower temperature for more focused answers
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || 'Sorry, I could not analyze the document.';
    } catch (error) {
      console.error('RAG Query Error:', error);
      return 'Sorry, I encountered an error while analyzing the document.';
    }
  }
}

export const aiService = new AIService();
export type { ChatMessage }; 