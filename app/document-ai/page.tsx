"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PerformanceOptimizedBackground } from "@/components/ui/performance-optimized-background";
import { AIChat } from "@/components/ui/ai-chat";
import { aiService, testAPIKey } from "@/lib/ai-service";
import { 
  Upload, 
  FileText, 
  File, 
  Trash2, 
  Brain, 
  Sparkles,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Zap,
  Search,
  Database
} from "lucide-react";

interface UploadedDocument {
  id: string;
  name: string;
  size: number;
  type: string;
  content: string;
  uploadDate: Date;
  status: 'processing' | 'ready' | 'error';
}

export default function DocumentAIPage() {
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<UploadedDocument | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [apiTestResult, setApiTestResult] = useState<{ success: boolean; message: string; details?: string } | null>(null);

  const handleRAGQuery = async (message: string) => {
    if (!selectedDocument) {
      return "Please select a document first to ask questions about it.";
    }
    
    try {
      return await aiService.ragQuery(
        selectedDocument.content, 
        selectedDocument.name, 
        message
      );
    } catch (error) {
      console.error('RAG Query Error:', error);
      return "I encountered an error while processing your question. Please try again or check that the API key is properly configured.";
    }
  };

  const testAPI = async () => {
    try {
      const result = await testAPIKey();
      setApiTestResult(result);
      console.log('API Test Result:', result);
    } catch (error) {
      setApiTestResult({
        success: false,
        message: 'Test failed with error',
        details: error instanceof Error ? error.message : String(error)
      });
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFiles = async (files: File[]) => {
    for (const file of files) {
      // Check if file is a supported text-based format
      const supportedTypes = [
        'text/plain',
        'text/markdown',
        'text/csv',
        'application/json',
        'application/xml',
        'text/html',
        'text/css',
        'text/javascript',
        'application/javascript'
      ];
      
      const isSupported = supportedTypes.includes(file.type) || 
                         file.name.endsWith('.txt') || 
                         file.name.endsWith('.md') || 
                         file.name.endsWith('.json') ||
                         file.name.endsWith('.csv') ||
                         file.name.endsWith('.xml') ||
                         file.name.endsWith('.html') ||
                         file.name.endsWith('.css') ||
                         file.name.endsWith('.js');

      if (isSupported) {
        const newDoc: UploadedDocument = {
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: file.size,
          type: file.type,
          content: '',
          uploadDate: new Date(),
          status: 'processing'
        };

        setDocuments(prev => [...prev, newDoc]);

        // Process the document
        try {
          const text = await file.text();
          
          // Check if content is not empty
          if (text.trim().length === 0) {
            throw new Error('Document is empty');
          }
          
          setDocuments(prev => 
            prev.map(doc => 
              doc.id === newDoc.id 
                ? { ...doc, content: text, status: 'ready' }
                : doc
            )
          );
        } catch (error) {
          console.error('File processing error:', error);
          setDocuments(prev => 
            prev.map(doc => 
              doc.id === newDoc.id 
                ? { ...doc, status: 'error' }
                : doc
            )
          );
        }
      } else {
        console.warn(`Unsupported file type: ${file.type} - ${file.name}`);
      }
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const removeDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
    if (selectedDocument?.id === id) {
      setSelectedDocument(null);
      setShowChat(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <PerformanceOptimizedBackground enableParticles={true} particleCount={6} />
      
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Brain className="w-12 h-12 text-primary" />
              <h1 className="text-4xl md:text-6xl font-bold text-white">
                Document AI
              </h1>
              <Sparkles className="w-8 h-8 text-accent" />
            </div>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Upload any document and have intelligent conversations with it. 
              Powered by advanced <span className="text-primary font-medium">RAG (Retrieval-Augmented Generation)</span> technology.
            </p>
          </motion.div>

          {/* Features Overview */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            {[
              {
                icon: <Upload className="w-8 h-8" />,
                title: "Smart Upload",
                description: "Drag & drop documents (PDF, DOCX, TXT) with automatic text extraction",
                color: "text-blue-400"
              },
              {
                icon: <Search className="w-8 h-8" />,
                title: "AI-Powered Search", 
                description: "Ask natural language questions and get precise answers from your documents",
                color: "text-green-400"
              },
              {
                icon: <MessageSquare className="w-8 h-8" />,
                title: "Interactive Chat",
                description: "Have dynamic conversations about document content with context awareness",
                color: "text-purple-400"
              }
                         ].map((feature) => (
              <Card key={feature.title} className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className={`${feature.color} mb-4 flex justify-center`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Document Upload Area */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-3">
                  <Database className="w-6 h-6 text-primary" />
                  Document Library
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Upload Zone */}
                <div
                  className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300 ${
                    isDragging 
                      ? 'border-primary bg-primary/10' 
                      : 'border-white/20 hover:border-white/40'
                  }`}
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onDragEnter={() => setIsDragging(true)}
                  onDragLeave={() => setIsDragging(false)}
                >
                  <Upload className="w-16 h-16 text-white/50 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Drop documents here or click to upload
                  </h3>
                  <p className="text-white/60 mb-6">
                    Supported formats: TXT, MD, JSON, CSV, XML, HTML, CSS, JS
                  </p>
                  <Button
                    onClick={() => document.getElementById('file-input')?.click()}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Choose Files
                  </Button>
                  <input
                    id="file-input"
                    type="file"
                    multiple
                    accept=".txt,.md,.json,.csv,.xml,.html,.css,.js"
                    className="hidden"
                    onChange={(e) => handleFiles(Array.from(e.target.files || []))}
                  />
                </div>

                {/* API Test Section */}
                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-semibold text-blue-400">API Configuration Test</h4>
                    <Button
                      onClick={testAPI}
                      variant="outline"
                      size="sm"
                      className="border-blue-500/50 text-blue-400 hover:bg-blue-500/20"
                    >
                      Test API Key
                    </Button>
                  </div>
                  
                  {apiTestResult && (
                    <div className={`p-3 rounded border ${
                      apiTestResult.success 
                        ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                        : 'bg-red-500/10 border-red-500/30 text-red-400'
                    }`}>
                      <p className="text-sm font-medium">{apiTestResult.message}</p>
                      {apiTestResult.details && (
                        <details className="mt-2">
                          <summary className="cursor-pointer text-xs opacity-80">View Details</summary>
                          <pre className="mt-2 text-xs bg-black/20 p-2 rounded overflow-x-auto">
                            {JSON.stringify(apiTestResult.details, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                  )}
                  
                  <p className="text-xs text-blue-300/80 mt-2">
                    If the test fails, check your .env.local file and restart the server.
                  </p>
                </div>

                {/* Document List */}
                {documents.length > 0 && (
                  <div className="mt-8">
                    <h4 className="text-lg font-semibold text-white mb-4">Uploaded Documents</h4>
                    <div className="space-y-3">
                      {documents.map((doc) => (
                        <div
                          key={doc.id}
                          className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                            selectedDocument?.id === doc.id
                              ? 'bg-primary/20 border-primary'
                              : 'bg-white/5 border-white/10 hover:bg-white/10'
                          }`}
                          onClick={() => {
                            if (doc.status === 'ready') {
                              setSelectedDocument(doc);
                              setShowChat(true);
                            }
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <File className="w-8 h-8 text-primary" />
                            <div>
                              <p className="font-medium text-white">{doc.name}</p>
                              <p className="text-sm text-white/60">
                                {formatFileSize(doc.size)} • {doc.uploadDate.toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {doc.status === 'processing' && (
                              <Badge variant="outline" className="border-yellow-500 text-yellow-500">
                                <Zap className="w-3 h-3 mr-1" />
                                Processing
                              </Badge>
                            )}
                            {doc.status === 'ready' && (
                              <Badge variant="outline" className="border-green-500 text-green-500">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Ready
                              </Badge>
                            )}
                            {doc.status === 'error' && (
                              <Badge variant="outline" className="border-red-500 text-red-500">
                                <AlertCircle className="w-3 h-3 mr-1" />
                                Error
                              </Badge>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeDocument(doc.id);
                              }}
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* RAG Chat Interface */}
          {selectedDocument && showChat && (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center gap-3">
                    <MessageSquare className="w-6 h-6 text-primary" />
                                         Chat with &quot;{selectedDocument.name}&quot;
                  </CardTitle>
                  <p className="text-white/60">
                    Ask questions about the document content and get intelligent answers
                  </p>
                </CardHeader>
                <CardContent>
                  <AIChat
                    title="Document Q&A Assistant"
                    placeholder={`Ask questions about "${selectedDocument.name}"...`}
                    theme="primary"
                    aiFunction={handleRAGQuery}
                    suggestedQuestions={[
                      "What is the main topic of this document?",
                      "Can you summarize the key points?",
                      "What are the most important sections?",
                      "Are there any specific recommendations?",
                      "What data or statistics are mentioned?",
                      "Who are the main people or organizations mentioned?"
                    ]}
                  />
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Technical Info */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center"
          >
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-white mb-4">
                  How It Works
                </h3>
                <div className="grid md:grid-cols-4 gap-6 text-sm">
                  {[
                    { step: "1", title: "Upload", description: "Document text extraction and preprocessing" },
                    { step: "2", title: "Process", description: "Text chunking and semantic analysis" },
                    { step: "3", title: "Index", description: "Vector embeddings and knowledge base creation" },
                    { step: "4", title: "Query", description: "RAG-powered conversational AI responses" }
                  ].map((item) => (
                    <div key={item.step} className="text-center">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold mx-auto mb-3">
                        {item.step}
                      </div>
                      <h4 className="font-semibold text-white mb-2">{item.title}</h4>
                      <p className="text-white/60">{item.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 