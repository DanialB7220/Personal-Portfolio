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
      console.warn("Chatbot will use fallback responses until API key is configured");
    }
  }

  private async makeRequest(messages: ChatMessage[], maxTokens: number = 1024): Promise<string> {
    // If no API key is configured, return fallback responses
    if (!this.apiKey) {
      console.log('No API key found, using fallback response');
      return this.getFallbackResponse(messages[messages.length - 1]?.content || "");
    }

    console.log('Making API request to:', this.baseUrl);
    console.log('API Key (first 10 chars):', this.apiKey.substring(0, 10) + '...');
    console.log('Request payload:', {
      model: "deepseek-ai/DeepSeek-V3-0324",
      messages: messages.length,
      max_tokens: maxTokens,
      temperature: 0.7
    });

    try {
      const requestBody = {
        "model": "deepseek-ai/DeepSeek-V3-0324",
        "messages": messages,
        "stream": false,
        "max_tokens": maxTokens,
        "temperature": 0.7
      };

      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`API request failed: ${response.status} - ${errorText}`);
      }

      const data: ChatResponse = await response.json();
      console.log('API Response data:', data);
      
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        console.error('Unexpected API response structure:', data);
        throw new Error('Invalid response structure from API');
      }

      const content = data.choices[0].message.content || "I apologize, but I couldn't process that request.";
      
      // Clean up any markdown formatting that might slip through
      return this.cleanMarkdown(content);
    } catch (error) {
      console.error('AI Service Error:', error);
      console.error('Error details:', {
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        apiKeyLength: this.apiKey.length,
        baseUrl: this.baseUrl
      });
      return this.getFallbackResponse(messages[messages.length - 1]?.content || "");
    }
  }

  private cleanMarkdown(text: string): string {
    // Remove markdown formatting
    return text
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold **text**
      .replace(/\*(.*?)\*/g, '$1') // Remove italic *text*
      .replace(/### (.*?)(\n|$)/g, '$1\n') // Remove ### headers
      .replace(/## (.*?)(\n|$)/g, '$1\n') // Remove ## headers
      .replace(/# (.*?)(\n|$)/g, '$1\n') // Remove # headers
      .replace(/`(.*?)`/g, '$1') // Remove code `text`
      .replace(/```[\s\S]*?```/g, '') // Remove code blocks
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links [text](url) -> text
      .replace(/^\s*[-*+]\s+/gm, '') // Remove bullet points
      .replace(/^\s*\d+\.\s+/gm, '') // Remove numbered lists
      .trim();
  }

  private getFallbackResponse(userMessage: string): string {
    const message = userMessage.toLowerCase();
    
    // Career story responses
    if (message.includes('experience') || message.includes('background') || message.includes('career')) {
      return `Hi! I'm Danial's AI assistant. I'd love to tell you about his experience, but I need to be properly configured first.

To get the full AI experience, please add your Chutes AI API key to the .env.local file:

1. Get a free API key from https://chutes.ai
2. Create a .env.local file in the project root
3. Add: NEXT_PUBLIC_CHUTES_API_KEY=your_api_key_here

For now, here's a quick overview: Danial is a Computer Science student at Pace University with 3 internships in software engineering and AI, including work at KLYR Media, StudyFetch, and Total Construction Corp. He's passionate about building AI-powered solutions and has experience with React, Python, Node.js, and machine learning.`;
    }
    
    // Technical questions
    if (message.includes('skill') || message.includes('tech') || message.includes('technology')) {
      return `I'd be happy to discuss Danial's technical skills! However, I need to be properly configured first.

To enable full AI responses, please:
1. Get a free API key from https://chutes.ai
2. Create a .env.local file in the project root  
3. Add: NEXT_PUBLIC_CHUTES_API_KEY=your_api_key_here

Danial's key skills include: React, Next.js, TypeScript, Python, Node.js, AI/ML, OpenAI API, LangChain, AWS, and Docker. He's built multiple full-stack applications and AI-powered tools.`;
    }
    
    // Project questions
    if (message.includes('project') || message.includes('work') || message.includes('build')) {
      return `I'd love to tell you about Danial's projects! But first, I need to be properly configured.

To get detailed project information, please:
1. Get a free API key from https://chutes.ai
2. Create a .env.local file in the project root
3. Add: NEXT_PUBLIC_CHUTES_API_KEY=your_api_key_here

Danial has built 25+ projects including AI-powered educational tools, full-stack web applications, and machine learning models. Check out his GitHub at github.com/DanialB7220 for more details!`;
    }
    
    // Contact questions
    if (message.includes('contact') || message.includes('email') || message.includes('reach')) {
      return `You can reach Danial at daao165@gmail.com or connect with him on LinkedIn at linkedin.com/in/danial-bhatti-7b9a9728a/. 

For the full AI experience with personalized responses, please configure the API key as mentioned above.`;
    }
    
    // Default response
    return `Hi! I'm Danial's AI assistant. I'd love to help you, but I need to be properly configured first.

To enable full AI responses, please:
1. Get a free API key from https://chutes.ai
2. Create a .env.local file in the project root
3. Add: NEXT_PUBLIC_CHUTES_API_KEY=your_api_key_here

Once configured, I'll be able to provide detailed, personalized answers about Danial's experience, skills, projects, and career journey!`;
  }

  // Code Explainer & Tutor
  async explainCode(code: string, language: string, question?: string): Promise<string> {
    const systemPrompt = `You are an expert programming tutor explaining Danial Bhatti's code. 
    You should be encouraging, educational, and highlight Danial's technical skills.
    Focus on explaining concepts clearly and mentioning advanced techniques used.
    
    IMPORTANT: Respond in plain text only. Do not use any markdown formatting like **, ###, or bullet points. Write in a conversational, natural way.`;

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
    Be enthusiastic about his achievements and highlight his growth, leadership, and technical skills.
    
    IMPORTANT: Respond in plain text only. Do not use any markdown formatting like **, ###, or bullet points. Write in a conversational, natural way.`;

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
    Be knowledgeable about cutting-edge developments in AI, web development, and software architecture.
    
    IMPORTANT: Respond in plain text only. Do not use any markdown formatting like **, ###, or bullet points. Write in a conversational, natural way.`;

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
      Be professional and highlight why he'd be a great hire.
      
      IMPORTANT: Respond in plain text only. Do not use any markdown formatting like **, ###, or bullet points. Write in a conversational, natural way.`,
      
      student: `You are Danial Bhatti's AI assistant helping fellow students. Focus on:
      - Learning resources and study tips
      - How to get started with his tech stack
      - Advice on internships and skill development
      - Encouragement and mentorship
      Be supportive and educational.
      
      IMPORTANT: Respond in plain text only. Do not use any markdown formatting like **, ###, or bullet points. Write in a conversational, natural way.`,
      
      collaborator: `You are Danial Bhatti's AI assistant for potential collaborators. Focus on:
      - His project interests and capabilities
      - Open source contributions and teamwork
      - Technical challenges he enjoys solving
      - How to connect for projects
      Be collaborative and technical.
      
      IMPORTANT: Respond in plain text only. Do not use any markdown formatting like **, ###, or bullet points. Write in a conversational, natural way.`,
      
      general: `You are Danial Bhatti's AI assistant for general inquiries. Be helpful, professional, 
      and route them to appropriate contact methods or information about his work.
      
      IMPORTANT: Respond in plain text only. Do not use any markdown formatting like **, ###, or bullet points. Write in a conversational, natural way.`
    };

    return this.makeRequest([
      { role: 'system', content: systemPrompts[context] },
      { role: 'user', content: inquiry }
    ], 800);
  }

  // General chat for any AI assistant needs
  async chat(message: string, context?: string): Promise<string> {
    const systemPrompt = context || `You are Danial Bhatti's AI assistant. Be helpful, professional, 
    and knowledgeable about his work, skills, and background. Always be encouraging and highlight his strengths.
    
    IMPORTANT: Respond in plain text only. Do not use any markdown formatting like **, ###, or bullet points. Write in a conversational, natural way.`;

    return this.makeRequest([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: message }
    ], 1000);
  }

  async ragQuery(documentContent: string, documentName: string, userQuestion: string): Promise<string> {
    console.log('RAG Query called:', { documentName, questionLength: userQuestion.length, contentLength: documentContent.length });
    
    // If no API key is configured, return fallback response
    if (!this.apiKey) {
      console.warn('No API key configured for RAG query');
      return `I'd love to analyze the document "${documentName}" for you, but I need to be properly configured first.

To enable document analysis, please:
1. Get a free API key from https://chutes.ai
2. Create a .env.local file in the project root
3. Add: NEXT_PUBLIC_CHUTES_API_KEY=your_api_key_here
4. Restart the development server

For now, I can tell you that this appears to be a document analysis request, but I need the API key to provide detailed insights.`;
    }

    // Check if document content is too large (API has limits)
    const maxContentLength = 5000000; // 5MB limit (very generous)
    if (documentContent.length > maxContentLength) {
      console.warn('Document content too large for RAG query:', documentContent.length);
      return `I couldn't analyze the document "${documentName}" because it's extremely large (${Math.round(documentContent.length / 1000)}KB). Please try with a smaller document or split it into smaller sections.`;
    }

    // For large documents, truncate to a reasonable size for analysis
    const maxTokensForAnalysis = 8000; // Roughly 32KB of text
    let contentToAnalyze = documentContent;
    if (documentContent.length > maxTokensForAnalysis * 4) {
      console.log('Document is large, truncating for analysis. Original size:', documentContent.length);
      contentToAnalyze = documentContent.substring(0, maxTokensForAnalysis * 4);
      console.log('Truncated to:', contentToAnalyze.length);
    }

    // Check if document content is empty
    if (!documentContent.trim()) {
      console.warn('Document content is empty');
      return `I couldn't analyze the document "${documentName}" because it appears to be empty. Please check the document content and try again.`;
    }

    try {
      const systemPrompt = `You are an expert document analysis assistant. You have been given a document titled "${documentName}" and need to answer questions about it based ONLY on the content provided. 

Guidelines:
- Only use information from the provided document content
- If the answer isn't in the document, say so clearly
- Provide specific quotes or references when possible
- Be concise but comprehensive
- If asked to summarize, focus on the most important points

IMPORTANT: Respond in plain text only. Do not use any markdown formatting like **, ###, or bullet points. Write in a conversational, natural way.`;

      const contextualPrompt = `Document: "${documentName}"

Content:
${contentToAnalyze}

Question: ${userQuestion}

Please provide a detailed answer based solely on the document content above.`;

      // Use the same base URL as other functions
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'deepseek-ai/DeepSeek-V3-0324',
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
        const errorText = await response.text();
        console.error('RAG API Error Response:', {
          status: response.status,
          statusText: response.statusText,
          errorText: errorText
        });
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('RAG API Success Response:', {
        hasChoices: !!data.choices,
        choicesLength: data.choices?.length,
        hasMessage: !!data.choices?.[0]?.message,
        contentLength: data.choices?.[0]?.message?.content?.length
      });
      
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        console.error('Unexpected RAG API response structure:', data);
        throw new Error('Invalid response structure from RAG API');
      }

      let content = data.choices[0].message.content || 'Sorry, I could not analyze the document.';
      
      // Add note if document was truncated
      if (contentToAnalyze.length < documentContent.length) {
        content += `\n\nNote: This analysis is based on the first ${Math.round(contentToAnalyze.length / 1000)}KB of the document. For a complete analysis of very large documents, consider splitting them into smaller sections.`;
      }
      
      return this.cleanMarkdown(content);
    } catch (error) {
      console.error('RAG Query Error:', error);
      console.error('Error details:', {
        documentName,
        questionLength: userQuestion.length,
        contentLength: documentContent.length,
        hasApiKey: !!this.apiKey,
        apiKeyLength: this.apiKey?.length || 0,
        error: error instanceof Error ? error.message : String(error)
      });
      
      // Provide more specific error messages based on the error type
      if (error instanceof Error) {
        if (error.message.includes('401') || error.message.includes('Unauthorized')) {
          return `I couldn't analyze the document "${documentName}" because the API key is invalid or expired. Please check your Chutes AI API key and make sure it's correct.`;
        } else if (error.message.includes('429') || error.message.includes('Too Many Requests')) {
          return `I couldn't analyze the document "${documentName}" because the API rate limit has been exceeded. Please try again in a few minutes.`;
        } else if (error.message.includes('500') || error.message.includes('Internal Server Error')) {
          return `I encountered a server error while analyzing the document "${documentName}". This is likely a temporary issue. Please try again in a few minutes.`;
        } else if (error.message.includes('fetch')) {
          return `I couldn't connect to the AI service while analyzing the document "${documentName}". Please check your internet connection and try again.`;
        }
      }
      
      return `I encountered an error while analyzing the document "${documentName}". Please check the browser console for more details and try again. If the problem persists, verify your API key is correct.`;
    }
  }
}

export const aiService = new AIService();
export type { ChatMessage };

// Test function to verify API key
export async function testAPIKey(): Promise<{ success: boolean; message: string; details?: string }> {
  const service = new AIService();
  
  if (!service['apiKey']) {
    return {
      success: false,
      message: 'No API key found. Please check your .env.local file.'
    };
  }

  try {
    console.log('Testing API key...');
    const response = await fetch(service['baseUrl'], {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${service['apiKey']}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'deepseek-ai/DeepSeek-V3-0324',
        messages: [{ role: 'user', content: 'Hello, this is a test message.' }],
        max_tokens: 50,
        temperature: 0.7
      })
    });

    console.log('Test response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        message: `API test failed: ${response.status}`,
        details: errorText
      };
    }

    const data = await response.json();
    return {
      success: true,
      message: 'API key is working correctly!',
      details: data
    };
  } catch (error) {
    return {
      success: false,
      message: 'API test failed with error',
      details: error instanceof Error ? error.message : String(error)
    };
  }
} 