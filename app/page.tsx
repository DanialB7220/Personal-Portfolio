"use client";

import { Button } from "@/components/ui/button"

import { Badge } from "@/components/ui/badge"
import { HolographicCard } from "@/components/ui/holographic-card"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { PerformanceOptimizedBackground } from "@/components/ui/performance-optimized-background"
import { TypingAnimation } from "@/components/ui/typing-animation"
import { SkillRadar } from "@/components/ui/skill-radar"
import { AIChat } from "@/components/ui/ai-chat"
import { aiService } from "@/lib/ai-service"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"
import { 
  Github, 
  Linkedin, 
  Mail, 
  ChevronDown,
  Rocket,
  Sparkles,
  Trophy,
  Coffee,
  TrendingUp,
  Award,
  Target,
  Brain,
  Building,
  Zap,
  Code,
  MessageSquareText,
  Users
} from "lucide-react"

export default function Home() {
  const [showCareerAssistant, setShowCareerAssistant] = useState(false);
  const [showSmartContact, setShowSmartContact] = useState(false);
  const [contactContext, setContactContext] = useState<'recruiter' | 'student' | 'collaborator' | 'general'>('general');

  const typingTexts = [
    "Full-Stack Developer 🚀",
    "AI/ML Engineer 🤖", 
    "Software Architect 🏗️",
    "Innovation Driver 💡",
    "Code Wizard 🧙‍♂️",
    "Tech Enthusiast 🔥"
  ];

  const handleCareerStory = async (message: string) => {
    return await aiService.tellCareerStory(message);
  };

  const handleSmartContact = async (message: string) => {
    return await aiService.handleInquiry(message, contactContext);
  };

  const radarSkills = [
    { skill: "React", level: 95, color: "#61dafb" },
    { skill: "Python", level: 92, color: "#3776ab" },
    { skill: "Node.js", level: 88, color: "#339933" },
    { skill: "AI/ML", level: 85, color: "#ff6b35" },
    { skill: "TypeScript", level: 88, color: "#3178c6" },
    { skill: "AWS", level: 75, color: "#ff9900" },
  ];

  const experience = [
    {
      company: "KLYR Media",
      role: "Software Engineer & AI Intern",
      period: "May 2025 - July 2025",
      location: "New York, NY",
      type: "Internship",
      icon: <Zap className="w-6 h-6" />,
      highlights: [
        "Collaborated with engineers and product leads to build and test machine learning models using Python, TensorFlow, and scikit-learn",
        "Supported full-stack development for internal tools utilizing React, Node.js, and REST APIs, enhancing team productivity",
        "Conducted data cleaning and visualization, contributing to scalable AI solutions tailored for client needs in cloud environments which improved efficiency by 40%"
      ],
    },
    {
      company: "StudyFetch",
      role: "Software Engineer & AI Intern", 
      period: "February 2025 - May 2025",
      location: "New York, NY",
      type: "Internship",
      icon: <Brain className="w-6 h-6" />,
      highlights: [
        "Developed and deployed 3 full-stack AI-powered educational tools using the MERN stack, improving learning engagement for over 5000+ student users",
        "Built a generative AI tutoring assistant using OpenAI LLMs with prompt engineering and embeddings, deployed via LangChain and RAG pipelines",
        "Created RESTful APIs to manage user-generated study content, enabling efficient CRUD operations at scale",
        "Collaborated with the Department of Education and cross-functional teams of 20+ members"
      ],
    },
    {
      company: "Total Construction Corporation",
      role: "Software Engineer & Finance Intern",
      period: "September 2023 - February 2024", 
      location: "New York, NY",
      type: "Internship",
      icon: <Building className="w-6 h-6" />,
      highlights: [
        "Collaborated with non-technical stakeholders to gather requirements and translate them into full-stack implementations using MERN",
        "Increased client outreach efficiency by 90% through tailored web integrations and automation",
        "Implemented form validation, user auth, and role-based access in admin portals using JWT and Express middleware"
      ],
    }
  ];

  const achievements = [
    { 
      title: "Software Engineering Club", 
      subtitle: "Treasurer & Co-Founder", 
      period: "Sept 2023 - Present",
      description: "Co-founded the university's first Software Engineering Club to promote hands-on coding, project collaboration, and peer mentorship. Organized 10+ technical workshops and coding sessions on web development, Git, and AI tools, increasing engagement by 200%.",
      icon: <Award className="w-5 h-5" />
    }
  ];

  const realStats = [
    { label: "Years Experience", value: 4, suffix: "+", icon: <Trophy className="w-5 h-5" /> },
    { label: "Projects Built", value: 25, suffix: "+", icon: <Code className="w-5 h-5" /> },
    { label: "Technologies", value: 20, suffix: "+", icon: <Zap className="w-5 h-5" /> },
    { label: "Coffee Consumed", value: 1337, suffix: "+", icon: <Coffee className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <PerformanceOptimizedBackground enableParticles={true} particleCount={8} />
      
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Clean typography */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white">
              Danial Bhatti
            </h1>
            <div className="text-xl md:text-2xl lg:text-3xl text-primary font-medium mb-8">
              <TypingAnimation
                texts={typingTexts}
                speed={100}
                className="text-primary"
              />
            </div>
          </motion.div>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Computer Science student and software engineer passionate about building{" "}
            <span className="text-primary font-medium">AI-powered solutions</span> and{" "}
            <span className="text-accent font-medium">scalable web applications</span> that solve real-world problems.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4"
            >
              <Link href="/projects">
                View Projects
              </Link>
            </Button>

            <Button
              variant="outline"
              asChild
              size="lg"
              className="border-white/20 text-white hover:bg-white/10 px-8 py-4"
            >
              <Link href="/skills">
                Skills & Experience
              </Link>
            </Button>

            <Button
              variant="ghost"
              asChild
              size="lg"
              className="text-white hover:bg-white/10 px-8 py-4"
            >
              <Link href="https://github.com/DanialB7220" target="_blank">
                GitHub
              </Link>
            </Button>
          </motion.div>

          {/* Real Stats Section */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          >
            {realStats.map((stat) => (
              <motion.div
                key={stat.label}
                className="relative group"
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                <HolographicCard className="text-center p-6">
                  <motion.div 
                    className="flex justify-center mb-3 text-primary"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
                    {stat.icon}
                  </motion.div>
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                    <AnimatedCounter from={0} to={stat.value} suffix={stat.suffix} />
          </div>
                  <div className="text-sm text-white">{stat.label}</div>
                </HolographicCard>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown 
                className="mx-auto h-10 w-10 text-white cursor-pointer hover:text-primary transition-colors"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section with Radar Chart */}
      <section id="about" className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-8 gradient-text">
              About Me
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-white leading-relaxed mb-12">
                I&apos;m a passionate software developer currently pursuing a <span className="text-primary font-semibold">B.S. in Computer Science Minor in Economics </span> 
                 at <span className="text-accent font-semibold">Pace University&apos;s Honors College</span>. My journey combines technical excellence 
                with creative problem-solving, focusing on building solutions that push the boundaries of what&apos;s possible.
              </p>

              {/* Interactive Skill Radar */}
              <div className="flex flex-col lg:flex-row items-center justify-center gap-12 mb-12">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <SkillRadar skills={radarSkills} size={400} />
                </motion.div>
                
                <div className="grid md:grid-cols-1 gap-6 max-w-md">
                  {[
                    { icon: <Target className="w-8 h-8" />, title: "Mission-Driven", desc: "Creating technology that makes a meaningful impact on people's lives and businesses.", color: "text-primary" },
                    { icon: <Brain className="w-8 h-8" />, title: "AI-Focused", desc: "Leveraging artificial intelligence to solve complex problems and enhance user experiences.", color: "text-accent" },
                    { icon: <TrendingUp className="w-8 h-8" />, title: "Growth-Oriented", desc: "Continuously learning and adapting to emerging technologies and industry trends.", color: "text-purple-400" }
                  ].map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                      viewport={{ once: true }}
                    >
                      <HolographicCard>
                        <div className="flex items-center gap-4">
                          <div className={`${item.color}`}>
                            {item.icon}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-1 text-white">{item.title}</h3>
                            <p className="text-sm text-white opacity-80">{item.desc}</p>
                          </div>
                        </div>
                      </HolographicCard>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Achievements Section */}
              <div className="grid md:grid-cols-1 gap-6 max-w-4xl mx-auto">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <HolographicCard>
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full text-primary">
                          {achievement.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                            <div>
                              <h3 className="text-xl font-bold text-white">{achievement.title}</h3>
                              <p className="text-lg font-medium text-primary">{achievement.subtitle}</p>
                            </div>
                            <Badge variant="outline" className="text-xs self-start">
                              {achievement.period}
                            </Badge>
                          </div>
                          <p className="text-white leading-relaxed opacity-90">{achievement.description}</p>
                        </div>
                      </div>
                    </HolographicCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* All Three Internships */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-white drop-shadow-lg">
              Professional Experience
            </h2>
            <p className="text-xl text-white max-w-3xl mx-auto opacity-90">
              My journey through three impactful internships in software development and AI
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {experience.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <HolographicCard>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full text-primary">
                      {exp.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-primary">{exp.company}</h3>
                      <h4 className="text-lg font-semibold text-white">{exp.role}</h4>
                      <p className="text-sm text-white opacity-80">{exp.period} • {exp.location}</p>
                    </div>
                    <Badge variant="outline">{exp.type}</Badge>
                  </div>

                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm leading-relaxed text-white opacity-90">{highlight}</span>
                      </li>
                    ))}
              </ul>
                </HolographicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Smart Career Story Assistant */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 relative" style={{ zIndex: 100 }}>
                      <h2 className="text-6xl md:text-7xl font-bold mb-10 text-white drop-shadow-lg flex items-center justify-center gap-4">
            <MessageSquareText className="w-16 h-16 text-blue-400" />
            🤖 Ask AI About My Journey
          </h2>
          <p className="text-2xl text-white max-w-4xl mx-auto mb-10 font-medium">
            🚀 Have questions about my experience, skills, or career path? My AI assistant knows everything about my background and can provide detailed, personalized answers to help you understand what makes me a great fit for your team!
          </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
              {[
                {
                  icon: <Users className="w-6 h-6" />,
                  title: "For Recruiters",
                  description: "Learn about my technical skills, project impact, and team collaboration experience",
                  color: "text-primary"
                },
                {
                  icon: <Code className="w-6 h-6" />,
                  title: "Technical Deep Dive",
                  description: "Discuss my architecture decisions, tech stack choices, and development philosophy",
                  color: "text-accent"
                },
                {
                  icon: <Rocket className="w-6 h-6" />,
                  title: "Career Growth",
                  description: "Understand my learning journey, achievements, and future aspirations",
                  color: "text-purple-400"
                }
              ].map((item) => (
                <div key={item.title} className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 border-2 border-white/20 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                  <div className={`${item.color} mb-4 flex justify-center`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-white text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>

                      <button 
            onClick={() => setShowCareerAssistant(!showCareerAssistant)}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white text-2xl px-16 py-8 rounded-2xl shadow-2xl hover:scale-105 transition-all duration-300 font-bold border-2 border-white/30"
          >
            <Brain className="inline w-8 h-8 mr-4" />
            {showCareerAssistant ? "🔄 Hide Career Assistant" : "✨ Start Conversation"}
            <Sparkles className="inline w-8 h-8 ml-4" />
          </button>
        </div>

                  {showCareerAssistant && (
          <div className="max-w-4xl mx-auto relative" style={{ zIndex: 99 }}>
              <AIChat
                title="Career Story Assistant"
                placeholder="Ask about my experience, projects, skills, or anything else..."
                theme="primary"
                aiFunction={handleCareerStory}
                suggestedQuestions={[
                  "What makes Danial a good fit for a software engineering role?",
                  "Tell me about his most impactful projects",
                  "How has he grown as a developer?",
                  "What leadership experience does he have?",
                  "What are his technical strengths?",
                  "How does he approach problem-solving?",
                  "What makes him passionate about AI/ML?",
                  "Tell me about his internship experiences"
                ]}
              />
                      </div>
        )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-white drop-shadow-lg">
              Let&apos;s Build Something Amazing
            </h2>
            <p className="text-xl text-white mb-12 leading-relaxed opacity-90">
              Ready to collaborate on innovative projects? Let&apos;s connect and create something extraordinary together.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  icon: <Mail className="w-12 h-12" />,
                  title: "Email Me",
                  description: "Get in touch for collaborations and opportunities",
                  link: "mailto:daao165@gmail.com",
                  text: "Send Message",
                  color: "text-primary"
                },
                {
                  icon: <Github className="w-12 h-12" />,
                  title: "GitHub",
                  description: "Explore my code and contribute to projects",
                  link: "https://github.com/DanialB7220",
                  text: "View Profile",
                  color: "text-accent"
                },
                {
                  icon: <Linkedin className="w-12 h-12" />,
                  title: "LinkedIn",
                  description: "Connect professionally and network",
                  link: "https://www.linkedin.com/in/danial-bhatti-7b9a9728a/",
                  text: "Connect",
                  color: "text-purple-400"
                }
              ].map((contact, index) => (
                <motion.div
                  key={contact.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <HolographicCard className="text-center group h-full">
                    <motion.div 
                      className={`mx-auto mb-4 ${contact.color} group-hover:scale-110 transition-transform`}
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      {contact.icon}
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-2 text-white">{contact.title}</h3>
                    <p className="text-white mb-4 opacity-80">{contact.description}</p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button asChild className="w-full bg-gradient-to-r from-primary to-accent" variant={index === 0 ? "default" : "outline"}>
                        <Link href={contact.link} target={index > 0 ? "_blank" : undefined}>
                          {contact.text}
                        </Link>
                      </Button>
                    </motion.div>
                  </HolographicCard>
                </motion.div>
              ))}
            </div>

            {/* Smart Contact System - Always Visible */}
            <div className="mb-12 relative">
              <div 
                className="bg-gradient-to-r from-blue-600/40 via-purple-600/40 to-pink-600/40 rounded-2xl p-10 border-4 border-blue-500/60 shadow-2xl backdrop-blur-sm"
                style={{ zIndex: 100 }}
              >
                <h3 className="text-5xl font-bold text-white mb-8 flex items-center justify-center gap-4 drop-shadow-lg">
                  <Brain className="w-12 h-12 text-blue-400" />
                  🤖 Smart Inquiry Assistant
                </h3>
                <p className="text-white text-xl text-center mb-10 max-w-3xl mx-auto font-medium">
                  🚀 Not sure what to ask? My AI assistant provides instant, personalized responses based on your needs!
                </p>

                <div className="grid md:grid-cols-4 gap-6 mb-10">
                  {[
                                         { key: 'recruiter', label: "👔 I'm a Recruiter", icon: <Users className="w-6 h-6" />, color: 'bg-blue-600' },
                     { key: 'student', label: "🎓 I'm a Student", icon: <Brain className="w-6 h-6" />, color: 'bg-green-600' },
                     { key: 'collaborator', label: "🤝 Let's Collaborate", icon: <Code className="w-6 h-6" />, color: 'bg-purple-600' },
                    { key: 'general', label: '💬 General Inquiry', icon: <MessageSquareText className="w-6 h-6" />, color: 'bg-orange-600' }
                  ].map((type) => (
                    <button
                      key={type.key}
                      onClick={() => setContactContext(type.key as 'recruiter' | 'student' | 'collaborator' | 'general')}
                      className={`
                        p-6 rounded-xl border-2 flex flex-col gap-3 items-center text-center transition-all duration-300 font-semibold
                        ${contactContext === type.key 
                          ? `${type.color} text-white border-white/50 shadow-xl scale-105 ring-4 ring-white/30` 
                          : 'bg-white/10 text-white border-white/30 hover:bg-white/20 hover:border-white/50 hover:scale-102'
                        }
                      `}
                    >
                      {type.icon}
                      <span className="text-sm">{type.label}</span>
                    </button>
                  ))}
                </div>

                <div className="text-center">
                  <button 
                    onClick={() => setShowSmartContact(!showSmartContact)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-2xl px-16 py-6 rounded-2xl shadow-2xl hover:scale-105 transition-all duration-300 font-bold border-2 border-white/30"
                  >
                    <MessageSquareText className="inline w-8 h-8 mr-4" />
                    {showSmartContact ? "🔄 Hide AI Assistant" : "✨ Start Smart Inquiry"}
                    <Sparkles className="inline w-8 h-8 ml-4" />
                  </button>
                </div>
              </div>

              {showSmartContact && (
                <div className="mt-8 relative" style={{ zIndex: 99 }}>
                  <AIChat
                    title={`Smart Inquiry Assistant - ${contactContext.charAt(0).toUpperCase() + contactContext.slice(1)}`}
                    placeholder="Ask about opportunities, collaboration, advice, or anything else..."
                    theme="primary"
                    aiFunction={handleSmartContact}
                    suggestedQuestions={
                      contactContext === 'recruiter' ? [
                        "Is Danial available for full-time positions?",
                        "What are his salary expectations?",
                        "What type of role is he looking for?",
                        "Can you tell me about his availability for interviews?",
                        "What makes him stand out as a candidate?"
                      ] : contactContext === 'student' ? [
                        "How can I get started with web development?",
                        "What resources do you recommend for learning AI/ML?",
                        "How can I improve my coding skills?",
                        "Any advice for landing internships?",
                        "What should I focus on as a CS student?"
                      ] : contactContext === 'collaborator' ? [
                        "What kind of projects is Danial interested in?",
                        "How can we collaborate on open source projects?",
                        "Is he available for freelance work?",
                        "What technologies does he want to explore?",
                        "How can we connect for a project?"
                      ] : [
                        "Tell me more about Danial's background",
                        "What are his main interests?",
                        "How can I get in touch?",
                        "What kind of opportunities interest him?",
                        "Can you share his contact information?"
                      ]
                    }
                  />
                </div>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
              className="pt-8 border-t border-white/10"
            >
              <p className="text-sm text-white flex items-center justify-center gap-2 opacity-70">
                <span>© 2025 Danial Bhatti. Crafted with</span>
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-red-500"
                >
                  ❤️
                </motion.span>
                <span>using Next.js, TypeScript, Tailwind CSS, and Framer Motion.</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
