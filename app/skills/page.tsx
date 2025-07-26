"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HolographicCard } from "@/components/ui/holographic-card";
import { SkillRadar } from "@/components/ui/skill-radar";
import { PerformanceOptimizedBackground } from "@/components/ui/performance-optimized-background";
import { AIChat } from "@/components/ui/ai-chat";
import { aiService } from "@/lib/ai-service";
import { 
  Terminal, 
  Code, 
  Zap, 
  Database, 
  Cloud, 
  Brain, 
  Sparkles,
  Play,
  Copy,
  Check,
  Award,
  TrendingUp,
  Target,
  Cpu,
  MessageSquare,
  Lightbulb
} from "lucide-react";

const skillCategories = {
  "Frontend": {
    icon: <Sparkles className="w-5 h-5" />,
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "React", level: 95, experience: "4+ years", projects: 12, description: "Advanced hooks, context, performance optimization" },
      { name: "Next.js", level: 90, experience: "3+ years", projects: 8, description: "SSR, SSG, API routes, deployment optimization" },
      { name: "TypeScript", level: 88, experience: "3+ years", projects: 10, description: "Advanced types, generics, utility types" },
      { name: "Tailwind CSS", level: 95, experience: "3+ years", projects: 15, description: "Custom components, responsive design, optimization" },
      { name: "Vue.js", level: 75, experience: "3+ years", projects: 3, description: "Composition API, Vuex, component architecture" }
    ]
  },
  "Backend": {
    icon: <Database className="w-5 h-5" />,
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "Node.js", level: 88, experience: "4+ years", projects: 15, description: "Express, Koa, microservices, performance tuning" },
      { name: "Python", level: 92, experience: "5+ years", projects: 20, description: "Django, FastAPI, data processing, automation" },
      { name: "PostgreSQL", level: 85, experience: "3+ years", projects: 8, description: "Complex queries, optimization, database design" },
      { name: "MongoDB", level: 82, experience: "3+ years", projects: 10, description: "Aggregation, indexing, schema design" },
      { name: "Redis", level: 78, experience: "3+ years", projects: 5, description: "Caching, session management, pub/sub" }
    ]
  },
  "AI/ML": {
    icon: <Brain className="w-5 h-5" />,
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "OpenAI API", level: 92, experience: "3+ years", projects: 8, description: "GPT integration, model deployment, fine-tuning" },
      { name: "Prompt Engineering", level: 95, experience: "3+ years", projects: 10, description: "Advanced prompting, chain-of-thought, few-shot learning" },
      { name: "TensorFlow", level: 80, experience: "3+ years", projects: 6, description: "Neural networks, model training, deployment" },
      { name: "LangChain", level: 88, experience: "3+ years", projects: 5, description: "RAG, vector databases, chain composition" },
      { name: "Pandas", level: 85, experience: "4+ years", projects: 12, description: "Data manipulation, analysis, visualization" },
      { name: "scikit-learn", level: 82, experience: "3+ years", projects: 8, description: "Classification, regression, clustering" }
    ]
  },
  "Cloud & DevOps": {
    icon: <Cloud className="w-5 h-5" />,
    color: "from-orange-500 to-red-500",
    skills: [
      { name: "AWS", level: 75, experience: "3+ years", projects: 6, description: "EC2, S3, Lambda, RDS, deployment" },
      { name: "Docker", level: 82, experience: "3+ years", projects: 10, description: "Containerization, multi-stage builds, orchestration" },
      { name: "Vercel", level: 90, experience: "3+ years", projects: 12, description: "Deployment, optimization, serverless functions" },
      { name: "Git", level: 95, experience: "5+ years", projects: 25, description: "Advanced workflows, branching strategies, automation" },
      { name: "CI/CD", level: 78, experience: "3+ years", projects: 4, description: "GitHub Actions, automated testing, deployment" }
    ]
  }
};

const codeExamples = {
  "React": {
    title: "Custom Hook with TypeScript",
    language: "typescript",
    code: `import { useState, useEffect, useCallback } from 'react';

interface UseAsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  execute: (asyncFn: () => Promise<T>) => Promise<void>;
}

export function useAsync<T>(): UseAsyncState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async (asyncFn: () => Promise<T>) => {
    try {
      setLoading(true);
      setError(null);
      const result = await asyncFn();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, execute };
}`
  },
  "Python": {
    title: "AI-Powered Data Processor",
    language: "python",
    code: `import asyncio
from typing import List, Dict, Any
import openai
import pandas as pd

class AIDataProcessor:
    def __init__(self, api_key: str):
        self.client = openai.AsyncOpenAI(api_key=api_key)
        
    async def analyze_sentiment(self, texts: List[str]) -> List[Dict[str, Any]]:
        """Analyze sentiment of multiple texts concurrently"""
        tasks = [self._process_single_text(text) for text in texts]
        results = await asyncio.gather(*tasks)
        return results
    
    async def _process_single_text(self, text: str) -> Dict[str, Any]:
        response = await self.client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Analyze sentiment: positive, negative, or neutral"},
                {"role": "user", "content": text}
            ],
            max_tokens=50
        )
        
        return {
            "text": text,
            "sentiment": response.choices[0].message.content,
            "confidence": 0.95  # Would implement actual confidence scoring
        }`
  },
  "Node.js": {
    title: "Scalable API with Rate Limiting",
    language: "javascript",
    code: `const express = require('express');
const Redis = require('ioredis');
const rateLimit = require('express-rate-limit');

class APIServer {
  constructor() {
    this.app = express();
    this.redis = new Redis(process.env.REDIS_URL);
    this.setupMiddleware();
    this.setupRoutes();
  }

  setupMiddleware() {
    // Advanced rate limiting with Redis
    const limiter = rateLimit({
      store: new RedisStore({
        sendCommand: (...args) => this.redis.call(...args),
      }),
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // requests per windowMs
      message: 'Too many requests, please try again later.',
    });

    this.app.use(limiter);
    this.app.use(express.json({ limit: '10mb' }));
  }

  setupRoutes() {
    this.app.post('/api/process', async (req, res) => {
      try {
        const { data } = req.body;
        const result = await this.processData(data);
        
        // Cache result for 5 minutes
        await this.redis.setex(
          \`cache:\${JSON.stringify(data)}\`,
          300,
          JSON.stringify(result)
        );
        
        res.json({ success: true, data: result });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
  }
}`
  },
  "LangChain": {
    title: "AI Document QA with RAG Pipeline",
    language: "javascript",
    code: `import { OpenAI } from "langchain/llms/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

class DocumentQASystem {
  constructor(apiKey) {
    this.llm = new OpenAI({ 
      openAIApiKey: apiKey,
      temperature: 0.7,
      maxTokens: 500
    });
    this.vectorStore = null;
    this.qaChain = null;
  }

  async loadDocument(filePath) {
    // Load and split PDF document
    const loader = new PDFLoader(filePath);
    const docs = await loader.load();
    
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    
    const splitDocs = await textSplitter.splitDocuments(docs);
    
    // Create vector store from documents
    this.vectorStore = await HNSWLib.fromDocuments(
      splitDocs,
      new OpenAIEmbeddings()
    );
    
    // Create conversational retrieval chain
    this.qaChain = ConversationalRetrievalQAChain.fromLLM(
      this.llm,
      this.vectorStore.asRetriever(),
      {
        returnSourceDocuments: true,
        verbose: true,
      }
    );
  }

  async askQuestion(question, chatHistory = []) {
    if (!this.qaChain) {
      throw new Error("Document not loaded. Call loadDocument first.");
    }

    const response = await this.qaChain.call({
      question,
      chat_history: chatHistory,
    });

    return {
      answer: response.text,
      sources: response.sourceDocuments,
      confidence: this.calculateConfidence(response)
    };
  }

  calculateConfidence(response) {
    // Simple confidence scoring based on source relevance
    const avgScore = response.sourceDocuments
      .reduce((sum, doc) => sum + (doc.metadata.score || 0), 0) 
      / response.sourceDocuments.length;
    
    return Math.min(avgScore * 100, 95);
  }
}`
  }
};

const certifications = [
  {
    name: "Microsoft Office 365 Specialist",
    issuer: "Microsoft",
    date: "2024",
    category: "Productivity",
    badge: <Award className="w-5 h-5" />
  },
  {
    name: "Amplify Me Financial Accelerator",
    issuer: "Amplify Me",
    date: "2024",
    category: "Financial Technology",
    badge: <TrendingUp className="w-5 h-5" />
  }
];

const achievements = [
  { title: "Code Optimization Expert", description: "Improved application performance by 40% through advanced optimization techniques", icon: <Zap className="w-5 h-5" /> },
  { title: "AI Integration Specialist", description: "Successfully integrated AI solutions in 8+ production applications", icon: <Brain className="w-5 h-5" /> },
  { title: "Full-Stack Architect", description: "Designed and built scalable architectures handling 10k+ concurrent users", icon: <Cpu className="w-5 h-5" /> },
  { title: "Team Leadership", description: "Led development teams and mentored 20+ junior developers", icon: <Target className="w-5 h-5" /> }
];

export default function SkillsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Frontend");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [skillLevels, setSkillLevels] = useState<Record<string, number>>({});
  const [selectedCodeExample, setSelectedCodeExample] = useState<{skill: string, example: {title: string, language: string, code: string}} | null>(null);
  const [showTechDiscussion, setShowTechDiscussion] = useState(false);

  useEffect(() => {
    // Animate skill progress bars
    const timer = setTimeout(() => {
      const newLevels: Record<string, number> = {};
      Object.values(skillCategories).forEach(category => {
        category.skills.forEach(skill => {
          newLevels[skill.name] = skill.level;
        });
      });
      setSkillLevels(newLevels);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const radarSkills = [
    { skill: "React", level: 95, color: "#61dafb" },
    { skill: "Python", level: 92, color: "#3776ab" },
    { skill: "Node.js", level: 88, color: "#339933" },
    { skill: "OpenAI", level: 92, color: "#ff6b35" },
    { skill: "TypeScript", level: 88, color: "#3178c6" },
    { skill: "AWS", level: 75, color: "#ff9900" },
  ];

  const copyCode = (code: string, skillName: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(skillName);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleCodeExplanation = async (message: string) => {
    if (!selectedCodeExample) return "Please select a code example first.";
    
    return await aiService.explainCode(
      selectedCodeExample.example.code,
      selectedCodeExample.example.language,
      message
    );
  };

  const handleTechDiscussion = async (message: string) => {
    return await aiService.discussTech(message);
  };

  return (
    <div className="min-h-screen relative">
      <PerformanceOptimizedBackground enableParticles={true} particleCount={8} />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
            <Terminal className="inline mr-4 mb-2" />
            Technical Expertise
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            A comprehensive showcase of my technical skills, certifications, and hands-on coding experience
          </p>
        </motion.div>

        {/* Skill Radar Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <HolographicCard>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 text-white">Skill Overview</h2>
              <p className="text-white opacity-80">Interactive radar chart showing my core competencies</p>
            </div>
            <div className="flex justify-center">
              <SkillRadar skills={radarSkills} size={400} />
            </div>
          </HolographicCard>
        </motion.div>

        {/* Detailed Skills by Category */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-4 bg-card/50 backdrop-blur-sm h-12 w-full max-w-2xl">
                {Object.keys(skillCategories).map((category) => (
                  <TabsTrigger key={category} value={category} className="flex items-center gap-2">
                    {skillCategories[category as keyof typeof skillCategories].icon}
                    <span className="hidden sm:inline">{category}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {Object.entries(skillCategories).map(([category, data]) => (
              <TabsContent key={category} value={category}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data.skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="cursor-pointer">
                        <HolographicCard className="h-full">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
                            <Badge variant="secondary" className={`bg-gradient-to-r ${data.color} text-white`}>
                              {skill.level}%
                            </Badge>
                          </div>

                          <Progress 
                            value={skillLevels[skill.name] || 0} 
                            className="mb-4 h-3"
                          />

                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-white opacity-80">Experience:</span>
                              <span className="font-medium text-white">{skill.experience}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white opacity-80">Projects:</span>
                              <span className="font-medium text-white">{skill.projects}</span>
                            </div>
                            <p className="text-white opacity-80 text-xs mt-3">
                              {skill.description}
                            </p>
                          </div>

                          {codeExamples[skill.name as keyof typeof codeExamples] && (
                            <Button size="sm" className="w-full mt-4" variant="outline">
                              <Code className="w-4 h-4 mr-2" />
                              View Code Example
                            </Button>
                          )}
                        </HolographicCard>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        {/* Code Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-white">Live Code Examples</h2>
          <div className="grid gap-8">
            {Object.entries(codeExamples).map(([skill, example], index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="w-full"
              >
                <HolographicCard className="w-full">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-semibold text-white">{skill}</h3>
                      <p className="text-lg text-white opacity-80">{example.title}</p>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        size="default"
                        variant="outline"
                        onClick={() => copyCode(example.code, skill)}
                        className="bg-primary/10 hover:bg-primary/20"
                      >
                        {copiedCode === skill ? (
                          <>
                            <Check className="w-4 h-4 mr-2" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 mr-2" />
                            Copy Code
                          </>
                        )}
                      </Button>
                      <Button size="default" variant="outline" className="bg-accent/10 hover:bg-accent/20">
                        <Play className="w-4 h-4 mr-2" />
                        Run Example
                      </Button>
                      <Button 
                        size="default" 
                        variant="outline" 
                        className="bg-purple-500/10 hover:bg-purple-500/20"
                        onClick={() => setSelectedCodeExample({skill, example})}
                      >
                        <Brain className="w-4 h-4 mr-2" />
                        Ask AI
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-slate-950 rounded-lg border-2 border-primary/30 shadow-2xl">
                    <div className="flex items-center justify-between bg-slate-900 px-4 py-2 rounded-t-lg border-b border-primary/20">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-white text-sm font-mono ml-2">{example.language}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {example.language.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <div 
                      className="p-6 overflow-auto max-h-[500px] min-h-[400px]"
                      style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#6366f1 #1e293b'
                      }}
                    >
                      <pre className="text-sm leading-relaxed whitespace-pre overflow-x-auto">
                        <code className={`language-${example.language} text-green-400 font-mono block`}>
                          {example.code}
                        </code>
                      </pre>
                    </div>
                  </div>
                </HolographicCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI Code Explainer */}
        {selectedCodeExample && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  <Brain className="w-8 h-8 text-purple-400" />
                  AI Code Explainer & Tutor
                </h2>
                <p className="text-white/80 mt-2">
                  Ask questions about the <span className="text-purple-400 font-semibold">{selectedCodeExample.skill}</span> code example
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setSelectedCodeExample(null)}
                className="bg-red-500/10 hover:bg-red-500/20 border-red-500/30"
              >
                Close AI Tutor
              </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Selected Code Display */}
              <HolographicCard>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  {selectedCodeExample.skill} - {selectedCodeExample.example.title}
                </h3>
                <div className="bg-slate-950 rounded-lg border border-purple-500/30 max-h-[400px] overflow-auto">
                  <div className="bg-slate-900 px-4 py-2 border-b border-purple-500/20">
                    <span className="text-white text-sm font-mono">{selectedCodeExample.example.language}</span>
                  </div>
                  <pre className="p-4 text-sm overflow-x-auto">
                    <code className="text-green-400 font-mono whitespace-pre">
                      {selectedCodeExample.example.code}
                    </code>
                  </pre>
                </div>
              </HolographicCard>

              {/* AI Chat Interface */}
              <AIChat
                title="Code Tutor AI"
                placeholder="Ask about this code... (e.g., 'How does this hook work?')"
                theme="purple"
                aiFunction={handleCodeExplanation}
                suggestedQuestions={[
                  "Explain how this code works",
                  "What are the best practices shown here?",
                  "How could this code be improved?",
                  "What advanced techniques are used?"
                ]}
              />
            </div>
          </motion.div>
        )}

        {/* AI Tech Discussion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-3 mb-4">
              <MessageSquare className="w-8 h-8 text-accent" />
              Live Tech Discussion AI
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-6">
              Discuss current tech trends, best practices, and architectural decisions with an AI that knows my expertise
            </p>
            <Button 
              onClick={() => setShowTechDiscussion(!showTechDiscussion)}
              className="bg-gradient-to-r from-accent to-purple-600 hover:opacity-90"
              size="lg"
            >
              <Lightbulb className="w-5 h-5 mr-2" />
              {showTechDiscussion ? "Hide Tech Discussion" : "Start Tech Discussion"}
            </Button>
          </div>

          {showTechDiscussion && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AIChat
                title="Tech Discussion AI"
                placeholder="Ask about tech trends, architecture, AI developments..."
                theme="accent"
                aiFunction={handleTechDiscussion}
                suggestedQuestions={[
                  "What's your take on the latest AI developments?",
                  "How do you approach microservices architecture?",
                  "What are the best practices for React performance?",
                  "How do you see the future of web development?",
                  "What's the difference between RAG and fine-tuning?",
                  "How do you choose between SQL and NoSQL databases?"
                ]}
              />
            </motion.div>
          )}
        </motion.div>

        {/* Certifications & Achievements */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <HolographicCard>
              <h3 className="text-2xl font-bold mb-6 text-center text-white">Certifications</h3>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-lg bg-card/50"
                  >
                    <div className="text-primary">
                      {cert.badge}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">{cert.name}</h4>
                      <p className="text-sm text-white opacity-80">{cert.issuer} • {cert.date}</p>
                      <Badge variant="outline" className="text-xs mt-1">
                        {cert.category}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </HolographicCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <HolographicCard>
              <h3 className="text-2xl font-bold mb-6 text-center text-white">Key Achievements</h3>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-lg bg-card/50"
                  >
                    <div className="text-primary mt-1">
                      {achievement.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-white">{achievement.title}</h4>
                      <p className="text-sm text-white opacity-80">{achievement.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </HolographicCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 