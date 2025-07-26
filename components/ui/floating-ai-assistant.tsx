"use client";

import { AIChat } from "@/components/ui/ai-chat";
import { aiService } from "@/lib/ai-service";

// Global AI Assistant Handler
const handleGlobalAI = async (message: string) => {
  return await aiService.chat(message, 
    `You are Danial Bhatti's personal AI assistant. Help visitors navigate his portfolio, 
    answer questions about his work, and provide helpful information. Always be professional, 
    enthusiastic about his skills, and guide users to relevant sections of his website.
    
    You can help with:
    - Information about Danial's experience, skills, and projects
    - Navigation guidance (e.g., "Check out the Skills page" or "Visit the Projects section")
    - Career questions and professional background
    - Technical discussions about his work
    - Contact information and how to reach him
    
    Be friendly, helpful, and always highlight Danial's strengths and achievements.`
  );
};

export function FloatingAIAssistant() {
  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      <AIChat
        title="Portfolio Assistant"
        placeholder="Ask about Danial's work, skills, or navigate the site..."
        variant="floating"
        theme="primary"
        aiFunction={handleGlobalAI}
        suggestedQuestions={[
          "Tell me about Danial's experience",
          "What are his strongest technical skills?",
          "Show me his best projects",
          "How can I contact him?",
          "What makes him a great developer?",
          "What internships has he completed?",
          "Tell me about his AI/ML expertise",
          "How can I navigate this portfolio?"
        ]}
      />
    </div>
  );
} 