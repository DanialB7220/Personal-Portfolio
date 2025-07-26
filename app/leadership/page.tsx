"use client";

import { motion } from "framer-motion";
import { HolographicCard } from "@/components/ui/holographic-card";
import { PerformanceOptimizedBackground } from "@/components/ui/performance-optimized-background";
import { Badge } from "@/components/ui/badge";
import { 
  Code, 
  Users, 
  TrendingUp, 
  Sparkles, 
  Rocket, 
  Target, 
  Brain, 
  Building, 
  Globe,
  Award,
  Calendar,
  MapPin,
  ExternalLink
} from "lucide-react";
import Link from "next/link";

export default function LeadershipPage() {
  return (
    <div className="min-h-screen relative">
      <PerformanceOptimizedBackground enableParticles={true} particleCount={6} />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 gradient-text">
            <Users className="inline mr-4 mb-2" />
            Leadership & Impact
          </h1>
          <p className="text-2xl text-white max-w-4xl mx-auto leading-relaxed">
            Beyond coding - building communities, leading initiatives, and making a difference in the tech world
          </p>
        </div>

        {/* Leadership Roles */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">🚀 Current Leadership Roles</h2>
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Software Engineering Club */}
            <div>
              <HolographicCard className="h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-br from-accent/30 to-purple-500/30 rounded-full">
                    <Code className="w-10 h-10 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white">Software Engineering Club</h3>
                    <p className="text-xl text-accent font-semibold">Treasurer & Co-Founder</p>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Sept 2023 - Present
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        Pace University
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <p className="text-white opacity-90 text-lg leading-relaxed">
                    Co-founded my university's first Software Engineering Club to promote hands-on coding, 
                    project collaboration, and peer mentorship among students.
                  </p>
                  
                  {/* Key Metrics */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-primary/20 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-primary mb-1">50+</div>
                      <div className="text-sm text-white opacity-80">Active Members</div>
                    </div>
                    <div className="bg-accent/20 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-accent mb-1">15+</div>
                      <div className="text-sm text-white opacity-80">Workshops Organized</div>
                    </div>
                    <div className="bg-purple-500/20 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-purple-400 mb-1">200%</div>
                      <div className="text-sm text-white opacity-80">Engagement Growth</div>
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-3">🎯 Key Achievements</h4>
                    <ul className="space-y-3">
                      {[
                        "Organized 15+ technical workshops on web development, Git, AI tools, and career prep",
                        "Built a thriving community of 50+ passionate student developers",
                        "Managed club finances and coordinated events with $5,000+ budget",
                        "Mentored 30+ fellow students in programming fundamentals and career guidance",
                        "Established partnerships with tech companies for guest speakers and internship opportunities",
                        "Created study groups that improved members' programming skills by 40% on average"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Sparkles className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                          <span className="text-sm text-white opacity-90 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </HolographicCard>
            </div>

            {/* UPSA VP Role */}
            <div>
              <HolographicCard className="h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-br from-primary/30 to-green-500/30 rounded-full">
                    <TrendingUp className="w-10 h-10 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white">United Pakistani Students & Alumni Association</h3>
                    <p className="text-xl text-primary font-semibold">Vice President of Entrepreneurship</p>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Current Role
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        Multi-University
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <p className="text-white opacity-90 text-lg leading-relaxed">
                    Leading entrepreneurship initiatives and fostering innovation within the Pakistani student 
                    community at universities across the region.
                  </p>
                  
                  {/* UPSA Link */}
                  <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Globe className="w-6 h-6 text-primary" />
                      <span className="font-semibold text-white text-lg">Visit UPSA</span>
                      <ExternalLink className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-sm text-white opacity-80 mb-3">
                      Learn more about our mission and initiatives
                    </p>
                    <Link 
                      href="https://unitedpsa.org" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:text-accent transition-colors underline font-medium"
                    >
                      unitedpsa.org →
                    </Link>
                  </div>

                  {/* Responsibilities */}
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-3">💼 Key Responsibilities</h4>
                    <ul className="space-y-3">
                      {[
                        "Develop and execute entrepreneurship programs for 200+ student members",
                        "Connect students with successful business mentors and industry professionals",
                        "Organize startup pitch competitions and networking events across multiple universities",
                        "Bridge cultural heritage with modern business innovation and technology",
                        "Coordinate with university career centers to provide entrepreneurship resources",
                        "Lead workshops on business planning, startup funding, and tech entrepreneurship"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Rocket className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                          <span className="text-sm text-white opacity-90 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </HolographicCard>
            </div>
          </div>
        </div>

        {/* Leadership Philosophy */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">💡 Leadership Philosophy</h2>
          
          <HolographicCard>
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-4">What Drives My Leadership</h3>
              <p className="text-white opacity-80 max-w-3xl mx-auto text-lg">
                My approach to leadership combines technical expertise with genuine care for community growth and innovation
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Brain className="w-10 h-10" />,
                  title: "Innovation & Learning",
                  description: "Constantly exploring emerging technologies like AI, blockchain, and quantum computing to stay ahead of the curve and share knowledge with others.",
                  color: "text-purple-400"
                },
                {
                  icon: <Building className="w-10 h-10" />,
                  title: "Community Building",
                  description: "Building bridges between technology and community, creating inclusive spaces where diverse minds can collaborate, learn, and grow together.",
                  color: "text-primary"
                },
                {
                  icon: <Target className="w-10 h-10" />,
                  title: "Impact-Driven Solutions",
                  description: "Every initiative should serve a purpose. I focus on creating programs and opportunities that solve real problems and improve lives in meaningful ways.",
                  color: "text-accent"
                }
              ].map((value, index) => (
                <div key={value.title} className="text-center">
                  <div className={`mx-auto mb-4 ${value.color}`}>
                    {value.icon}
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-3">{value.title}</h4>
                  <p className="text-sm text-white opacity-80 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </HolographicCard>
        </div>

        {/* Impact & Recognition */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">🏆 Impact & Recognition</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Community Growth",
                metric: "300+",
                description: "Students directly impacted across both organizations",
                icon: <Users className="w-6 h-6" />,
                color: "bg-blue-500/20 border-blue-500/30"
              },
              {
                title: "Events Organized",
                metric: "25+",
                description: "Workshops, networking events, and competitions hosted",
                icon: <Calendar className="w-6 h-6" />,
                color: "bg-green-500/20 border-green-500/30"
              },
              {
                title: "Partnerships Created",
                metric: "10+",
                description: "Collaborations with companies and educational institutions",
                icon: <Building className="w-6 h-6" />,
                color: "bg-purple-500/20 border-purple-500/30"
              },
              {
                title: "Mentorship Hours",
                metric: "100+",
                description: "One-on-one mentoring sessions with fellow students",
                icon: <Brain className="w-6 h-6" />,
                color: "bg-orange-500/20 border-orange-500/30"
              },
              {
                title: "Budget Managed",
                metric: "$15K+",
                description: "Combined financial oversight across organizations",
                icon: <TrendingUp className="w-6 h-6" />,
                color: "bg-pink-500/20 border-pink-500/30"
              },
              {
                title: "Recognition",
                metric: "Multiple",
                description: "University awards for outstanding leadership and impact",
                icon: <Award className="w-6 h-6" />,
                color: "bg-yellow-500/20 border-yellow-500/30"
              }
            ].map((item, index) => (
              <HolographicCard key={item.title} className={`text-center ${item.color}`}>
                <div className="text-primary mb-3 flex justify-center">
                  {item.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-2">{item.metric}</div>
                <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                <p className="text-sm text-white opacity-80">{item.description}</p>
              </HolographicCard>
            ))}
          </div>
        </div>

        {/* Future Vision */}
        <div className="text-center">
          <HolographicCard className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">🚀 Future Vision</h2>
            <p className="text-xl text-white opacity-90 leading-relaxed mb-6">
              My leadership journey is just beginning. I envision expanding these initiatives to create 
              even greater impact in the tech community, bridging the gap between education and industry, 
              and empowering the next generation of diverse tech leaders.
            </p>
            <div className="flex justify-center gap-4">
              <Badge className="bg-primary/20 text-primary border-primary/30">Tech Education</Badge>
              <Badge className="bg-accent/20 text-accent border-accent/30">Community Impact</Badge>
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Innovation</Badge>
            </div>
          </HolographicCard>
        </div>
      </div>
    </div>
  );
} 