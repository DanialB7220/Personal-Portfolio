import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FloatingAIAssistant } from "@/components/ui/floating-ai-assistant";
import { Home, User, Code, Mail, Users } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Danial Bhatti - Full-Stack Developer & AI Engineer",
  description: "Computer Science student at Pace University with expertise in React, Next.js, Python, AI/ML, and cloud technologies. Experienced in building scalable web applications and AI-powered solutions.",
  keywords: "Danial Bhatti, Full-Stack Developer, AI Engineer, React, Next.js, Python, Machine Learning, Web Development, Software Engineer",
  authors: [{ name: "Danial Bhatti" }],
  creator: "Danial Bhatti",
  openGraph: {
    title: "Danial Bhatti - Full-Stack Developer & AI Engineer",
    description: "Computer Science student at Pace University with expertise in React, Next.js, Python, AI/ML, and cloud technologies.",
    url: "https://danial-bhatti.vercel.app",
    siteName: "Danial Bhatti Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Danial Bhatti - Full-Stack Developer & AI Engineer",
    description: "Computer Science student at Pace University with expertise in React, Next.js, Python, AI/ML, and cloud technologies.",
  },
};

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/skills", label: "Skills", icon: User },
  { href: "/projects", label: "Projects", icon: Code },
  { href: "/leadership", label: "Leadership", icon: Users },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {/* Fixed Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="text-xl font-bold gradient-text">
                Danial Bhatti
              </Link>
              
              <div className="flex items-center gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Button key={item.href} variant="ghost" asChild className="hidden sm:flex">
                      <Link href={item.href} className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        {item.label}
                      </Link>
                    </Button>
                  );
                })}
                
                <Button variant="outline" asChild className="ml-2">
                  <Link href="mailto:daao165@gmail.com">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="pt-16">
          {children}
        </main>

        {/* Global Floating AI Assistant */}
        <FloatingAIAssistant />
      </body>
    </html>
  );
}
