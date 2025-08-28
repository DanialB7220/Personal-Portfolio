"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

import { 
  Bot, 
  Send, 
  User, 
  Loader2, 
  Sparkles, 
  MessageCircle,
  X,
  Minimize2,
  Maximize2
} from "lucide-react";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIChatProps {
  title: string;
  placeholder?: string;
  className?: string;
  variant?: 'floating' | 'embedded' | 'modal';
  aiFunction: (message: string) => Promise<string>;
  suggestedQuestions?: string[];
  theme?: 'primary' | 'accent' | 'purple';
}

export function AIChat({
  title,
  placeholder = "Ask me anything...",
  className = "",
  variant = 'embedded',
  aiFunction,
  suggestedQuestions = [],
  theme = 'primary'
}: AIChatProps) {
  const [isOpen, setIsOpen] = useState(variant === 'embedded');
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const themeColors = {
    primary: {
      gradient: 'from-primary to-blue-600',
      bg: 'bg-primary/10',
      border: 'border-primary/30',
      text: 'text-primary'
    },
    accent: {
      gradient: 'from-accent to-purple-600', 
      bg: 'bg-accent/10',
      border: 'border-accent/30',
      text: 'text-accent'
    },
    purple: {
      gradient: 'from-purple-500 to-pink-600',
      bg: 'bg-purple-500/10', 
      border: 'border-purple-500/30',
      text: 'text-purple-400'
    }
  };

  const currentTheme = themeColors[theme];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async (message?: string) => {
    const messageToSend = message || inputValue.trim();
    if (!messageToSend || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await aiFunction(messageToSend);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI Chat Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm experiencing technical difficulties. Please try again later. If this persists, check that the API key is properly configured.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (variant === 'floating' && !isOpen) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-[9999]"
      >
        <Button
          onClick={() => setIsOpen(true)}
          className={`w-16 h-16 rounded-full bg-gradient-to-r ${currentTheme.gradient} shadow-2xl hover:shadow-xl border-2 border-white/20 hover:scale-110 transition-transform`}
          size="lg"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </motion.div>
    );
  }

  const chatContent = (
    <div className={`
      ${variant === 'floating' ? 'fixed bottom-20 right-6 w-80 h-[450px] z-[9998]' : 'w-full'}
      ${variant === 'modal' ? 'max-w-2xl mx-auto' : ''}
      ${isMinimized ? 'h-14' : variant === 'embedded' ? 'h-[500px]' : 'h-[600px]'}
      ${className}
    `}>
      <div className={`
        bg-card/95 backdrop-blur-sm rounded-xl border-2 ${currentTheme.border} 
        shadow-2xl h-full flex flex-col overflow-hidden
        ${variant === 'floating' ? 'animate-in slide-in-from-bottom-4' : ''}
      `}>
        {/* Header */}
        <div className={`
          bg-gradient-to-r ${currentTheme.gradient} p-4 flex items-center justify-between
          ${isMinimized ? 'rounded-xl' : 'rounded-t-xl'}
        `}>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bot className="w-6 h-6 text-white" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm">{title}</h3>
              <p className="text-white/80 text-xs">AI Assistant</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {variant === 'floating' && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white hover:bg-white/20 p-1 h-8 w-8"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 p-1 h-8 w-8"
                >
                  <X className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/50">
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <div className={`w-16 h-16 ${currentTheme.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Sparkles className={`w-8 h-8 ${currentTheme.text}`} />
                  </div>
                  <h4 className="text-white font-semibold mb-2">AI Assistant Ready!</h4>
                  <p className="text-white/60 text-sm mb-4">Ask me anything about Danial&apos;s work and experience.</p>
                  
                  {suggestedQuestions.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-white/40 text-xs">Try asking:</p>
                      {suggestedQuestions.slice(0, 3).map((question, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSend(question)}
                          className="block mx-auto text-xs bg-card/50 hover:bg-card/80 border-primary/30"
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.role === 'assistant' && (
                      <div className={`w-8 h-8 ${currentTheme.bg} rounded-full flex items-center justify-center flex-shrink-0 mt-1`}>
                        <Bot className={`w-4 h-4 ${currentTheme.text}`} />
                      </div>
                    )}
                    
                    <div className={`
                      max-w-[80%] rounded-2xl p-3 text-sm leading-relaxed
                      ${message.role === 'user' 
                        ? `bg-gradient-to-r ${currentTheme.gradient} text-white ml-auto` 
                        : 'bg-card/80 text-white border border-white/10'
                      }
                    `}>
                      <div className="whitespace-pre-wrap">{message.content}</div>
                      <div className={`text-xs mt-2 ${message.role === 'user' ? 'text-white/70' : 'text-white/50'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>

                    {message.role === 'user' && (
                      <div className="w-8 h-8 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className={`w-8 h-8 ${currentTheme.bg} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <Bot className={`w-4 h-4 ${currentTheme.text}`} />
                  </div>
                  <div className="bg-card/80 rounded-2xl p-3 border border-white/10">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-white/60" />
                      <span className="text-white/60 text-sm">Thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-card/30">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={placeholder}
                  className="flex-1 bg-slate-900/50 border border-white/20 rounded-lg px-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                  disabled={isLoading}
                />
                <Button
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim() || isLoading}
                  className={`bg-gradient-to-r ${currentTheme.gradient} hover:opacity-90 px-4`}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          {chatContent}
        </motion.div>
      )}
    </AnimatePresence>
  );
} 