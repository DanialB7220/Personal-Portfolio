"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HolographicCard } from "@/components/ui/holographic-card";
import { PerformanceOptimizedBackground } from "@/components/ui/performance-optimized-background";
import { 
  Search, 
  Filter, 
  Github, 
  ExternalLink, 
  Calendar,
  Star,
  GitFork,
  Code,
  Sparkles,
  ArrowLeft,
  Globe,
  Play,
  Download
} from "lucide-react";
import Link from "next/link";

const projects = [
  {
    id: "aisaas",
    title: "AiSaas Platform",
    description: "Comprehensive AI-powered SaaS platform with intelligent automation, subscription management, and OpenAI integration for next-generation business solutions.",
    longDescription: "A full-stack AI SaaS platform that revolutionizes business automation. Features include AI-powered document processing, intelligent chatbots, automated workflow generation, and comprehensive analytics. Built with modern architecture focusing on scalability and performance.",
    category: "AI/ML",
    featured: true,
    status: "Production",
    tech: ["Next.js 14", "TypeScript", "OpenAI API", "Stripe", "Tailwind CSS", "Prisma", "PostgreSQL", "Vercel"],
    github: "https://github.com/DanialB7220/AiSaas",
    demo: "https://aisaas-demo.vercel.app",
    image: "/projects/aisaas.png",
    features: [
      "AI-powered document analysis and summarization",
      "Real-time chat with context-aware responses", 
      "Subscription management with Stripe integration",
      "Advanced analytics dashboard",
      "Multi-tenant architecture",
      "API rate limiting and usage tracking"
    ],
    challenges: "Implementing efficient token usage optimization and building a scalable multi-tenant architecture.",
    learnings: "Deep understanding of OpenAI API optimization, payment processing, and building production-ready SaaS applications.",
    metrics: {
      users: "1,200+",
      uptime: "99.9%",
      response_time: "< 200ms"
    }
  },
  {
    id: "studyfetch",
    title: "StudyFetch AI",
    description: "Revolutionary AI-powered educational platform that transforms how students learn with personalized study materials and intelligent tutoring systems.",
    longDescription: "An innovative educational technology platform that leverages AI to create personalized learning experiences. Features include AI-generated flashcards, adaptive learning paths, collaborative study tools, and real-time progress tracking.",
    category: "AI/ML", 
    featured: true,
    status: "Production",
    tech: ["React", "Node.js", "MongoDB", "OpenAI", "Socket.io", "Express", "AWS", "Docker"],
    github: "https://github.com/DanialB7220/StudyFetch",
    demo: "https://studyfetch-ai.herokuapp.com",
    image: "/projects/studyfetch.png",
    features: [
      "AI-generated personalized study materials",
      "Adaptive learning algorithm",
      "Real-time collaborative study sessions",
      "Progress tracking and analytics",
      "Spaced repetition algorithm",
      "Multi-format content support"
    ],
    challenges: "Creating an effective adaptive learning algorithm and managing real-time collaboration features.",
    learnings: "Advanced React patterns, real-time data synchronization, and educational technology principles.",
    metrics: {
      users: "5,000+",
      study_sessions: "25,000+",
      retention_rate: "78%"
    }
  },
  {
    id: "ticketing",
    title: "Event Ticketing System",
    description: "Full-stack event management platform with real-time booking, secure payments, and advanced analytics for event organizers and attendees.",
    longDescription: "A comprehensive event management solution with features for both organizers and attendees. Includes real-time seat selection, QR code generation, payment processing, and detailed analytics dashboard.",
    category: "Full-Stack",
    featured: false,
    status: "Production",
    tech: ["MERN Stack", "Stripe Connect", "JWT", "Redux", "Socket.io", "Node.js", "MongoDB"],
    github: "https://github.com/kaane5662/ticketing-platform",
    demo: "https://eventix-tickets.netlify.app",
    image: "/projects/ticketing.png",
    features: [
      "Real-time seat selection",
      "QR code ticket generation",
      "Stripe Connect payment processing",
      "Event analytics dashboard",
      "Multi-event management",
      "Mobile-responsive design"
    ],
    challenges: "Implementing real-time seat reservations and handling concurrent booking requests.",
    learnings: "Payment gateway integration, real-time systems, and complex state management.",
    metrics: {
      events: "150+",
      tickets_sold: "12,000+",
      revenue_processed: "$85,000+"
    }
  },
  {
    id: "medical-ai",
    title: "Medical AI Assistant",
    description: "Intelligent medical diagnostic assistant powered by machine learning algorithms for healthcare professionals and medical research.",
    longDescription: "An advanced AI system designed to assist healthcare professionals with diagnostic procedures. Features medical image analysis, symptom checking, and integration with medical databases while maintaining HIPAA compliance.",
    category: "AI/ML",
    featured: false,
    status: "Beta",
    tech: ["Python", "TensorFlow", "React", "FastAPI", "PostgreSQL", "Docker", "OpenCV"],
    github: "https://github.com/kaane5662/medical-ai",
    demo: "#",
    image: "/projects/medical.png",
    features: [
      "Medical image analysis",
      "Symptom-based diagnosis assistance",
      "HIPAA-compliant architecture",
      "Integration with medical databases",
      "Confidence scoring system",
      "Audit trail functionality"
    ],
    challenges: "Ensuring medical accuracy and maintaining strict privacy compliance.",
    learnings: "Healthcare technology requirements, medical data processing, and regulatory compliance.",
    metrics: {
      accuracy: "94.2%",
      processing_time: "< 3s",
      cases_analyzed: "1,500+"
    }
  },
  {
    id: "ml-analytics",
    title: "ML Analytics Suite",
    description: "Comprehensive machine learning project collection featuring predictive models, data visualization, and automated insights generation.",
    longDescription: "A collection of machine learning projects showcasing various algorithms and techniques. Includes predictive analytics, data preprocessing pipelines, model comparison tools, and automated reporting systems.",
    category: "AI/ML",
    featured: false,
    status: "Active",
    tech: ["Python", "scikit-learn", "Pandas", "Matplotlib", "Jupyter", "TensorFlow", "Plotly"],
    github: "https://github.com/DanialB7220/ML-Project",
    demo: "https://ml-analytics-dashboard.streamlit.app",
    image: "/projects/ml.png",
    features: [
      "Multiple ML algorithm implementations",
      "Interactive data visualizations",
      "Automated model comparison",
      "Feature importance analysis",
      "Cross-validation pipelines",
      "Deployment-ready models"
    ],
    challenges: "Optimizing model performance and creating intuitive visualizations for complex data.",
    learnings: "Advanced ML techniques, data visualization, and model deployment strategies.",
    metrics: {
      models: "15+",
      datasets: "8",
      accuracy_improvement: "23%"
    }
  },
  {
    id: "ecommerce",
    title: "Modern E-commerce Platform",
    description: "Feature-rich e-commerce platform with modern UI/UX, advanced search, inventory management, and seamless checkout experience.",
    longDescription: "A full-featured e-commerce solution with advanced product management, intelligent search, inventory tracking, and multiple payment gateway integrations. Built with scalability and performance in mind.",
    category: "Full-Stack",
    featured: false,
    status: "Production",
    tech: ["Django", "React", "PostgreSQL", "Redis", "Celery", "Elasticsearch", "AWS S3"],
    github: "https://github.com/DanialB7220/Ecommerce",
    demo: "https://modern-ecommerce-demo.herokuapp.com",
    image: "/projects/ecommerce.png",
    features: [
      "Advanced product search and filtering",
      "Real-time inventory management",
      "Multiple payment gateway support",
      "Order tracking system",
      "Admin analytics dashboard",
      "Mobile-optimized checkout"
    ],
    challenges: "Implementing efficient search functionality and managing complex product relationships.",
    learnings: "E-commerce best practices, search optimization, and payment processing.",
    metrics: {
      products: "2,500+",
      orders: "800+",
      conversion_rate: "3.2%"
    }
  }
];

const categories = ["All", "AI/ML", "Full-Stack", "Web Apps", "Mobile"];
const statusOptions = ["All", "Production", "Beta", "Active", "Development"];

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.tech.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
      const matchesStatus = selectedStatus === "All" || project.status === selectedStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchQuery, selectedCategory, selectedStatus]);

  const featuredProjects = filteredProjects.filter(p => p.featured);
  const regularProjects = filteredProjects.filter(p => !p.featured);

  if (selectedProject) {
    return (
      <div className="min-h-screen relative">
        <PerformanceOptimizedBackground enableParticles={false} />
        
        <div className="container mx-auto px-4 py-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Button 
              variant="outline" 
              onClick={() => setSelectedProject(null)}
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Button>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <HolographicCard>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h1 className="text-4xl font-bold gradient-text mb-2">
                          {selectedProject.title}
                        </h1>
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary" className="bg-gradient-to-r from-primary/20 to-accent/20">
                            {selectedProject.category}
                          </Badge>
                          <Badge variant="outline">
                            {selectedProject.status}
                          </Badge>
                          {selectedProject.featured && (
                            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black">
                              <Sparkles className="w-3 h-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                      {selectedProject.longDescription}
                    </p>

                    <div className="flex gap-4 mb-8">
                      <Button asChild>
                        <Link href={selectedProject.github} target="_blank">
                          <Github className="w-4 h-4 mr-2" />
                          View Code
                        </Link>
                      </Button>
                      {selectedProject.demo !== "#" && (
                        <Button variant="outline" asChild>
                          <Link href={selectedProject.demo} target="_blank">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live Demo
                          </Link>
                        </Button>
                      )}
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-3">Key Features</h3>
                        <ul className="grid md:grid-cols-2 gap-2">
                          {selectedProject.features.map((feature, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center gap-2"
                            >
                              <div className="w-2 h-2 bg-primary rounded-full" />
                              <span>{feature}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-3">Technology Stack</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.tech.map((tech) => (
                            <Badge key={tech} variant="skill" className="text-sm">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-3">Challenges & Solutions</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {selectedProject.challenges}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-3">Key Learnings</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {selectedProject.learnings}
                        </p>
                      </div>
                    </div>
                  </HolographicCard>
                </motion.div>
              </div>

              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <HolographicCard>
                    <h3 className="text-xl font-semibold mb-4">Project Metrics</h3>
                    <div className="space-y-4">
                      {Object.entries(selectedProject.metrics).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-muted-foreground capitalize">
                            {key.replace('_', ' ')}
                          </span>
                          <span className="font-semibold">{value}</span>
                        </div>
                      ))}
                    </div>
                  </HolographicCard>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <HolographicCard>
                    <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <Link href={selectedProject.github} target="_blank">
                          <Code className="w-4 h-4 mr-2" />
                          Source Code
                        </Link>
                      </Button>
                      {selectedProject.demo !== "#" && (
                        <Button variant="outline" size="sm" className="w-full" asChild>
                          <Link href={selectedProject.demo} target="_blank">
                            <Play className="w-4 h-4 mr-2" />
                            Live Demo
                          </Link>
                        </Button>
                      )}
                      <Button variant="outline" size="sm" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Download Assets
                      </Button>
                    </div>
                  </HolographicCard>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <PerformanceOptimizedBackground enableParticles={true} particleCount={5} />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
            <Code className="inline mr-4 mb-2" />
            Project Portfolio
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Explore my collection of innovative projects showcasing technical expertise and creative problem-solving
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                placeholder="Search projects, technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full bg-background border border-input rounded-md px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 bg-card border border-border rounded-md text-sm"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 bg-card border border-border rounded-md text-sm"
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold mb-6 text-primary">Featured Projects</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedProject(project)}
                  className="cursor-pointer"
                >
                  <HolographicCard className="h-full">
                    <div className="relative">
                      <Badge className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black z-10">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                      
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="secondary">{project.category}</Badge>
                          <Badge variant="outline">{project.status}</Badge>
                        </div>
                        <p className="text-muted-foreground line-clamp-3">
                          {project.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.tech.slice(0, 4).map((tech) => (
                          <Badge key={tech} variant="skill" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.tech.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.tech.length - 4}
                          </Badge>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" asChild onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                          <Link href={project.github} target="_blank">
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </Link>
                        </Button>
                        <Button size="sm" className="flex-1">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </HolographicCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* All Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-6">All Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedProject(project)}
                className="cursor-pointer"
              >
                <HolographicCard className="h-full">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary">{project.category}</Badge>
                      <Badge variant="outline">{project.status}</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tech.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="skill" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.tech.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.tech.length - 3}
                      </Badge>
                    )}
                  </div>

                  <Button size="sm" className="w-full">
                    View Details
                  </Button>
                </HolographicCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground text-lg">
              No projects found matching your criteria.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
} 