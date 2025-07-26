"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface FloatingNavItem {
  name: string;
  link: string;
  icon?: React.ReactNode;
}

interface FloatingNavbarProps {
  navItems: FloatingNavItem[];
  className?: string;
}

export function FloatingNavbar({ navItems, className }: FloatingNavbarProps) {
  const [visible, setVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const threshold = 100;
      
      setVisible(scrolled < threshold || scrolled < 100);
      
      // Update active section
      const sections = navItems.map(item => item.link.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && scrolled >= section.offsetTop - 200) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "fixed top-6 inset-x-0 mx-auto z-50 max-w-fit",
          className
        )}
      >
        <div className="relative rounded-full border border-white/[0.2] bg-black/20 backdrop-blur-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] px-8 py-2">
          <div className="flex items-center justify-center space-x-4">
            {navItems.map((navItem) => (
              <motion.button
                key={navItem.link}
                onClick={() => scrollToSection(navItem.link)}
                className={cn(
                  "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  activeSection === navItem.link.replace('#', '') 
                    ? "text-white" 
                    : "text-neutral-300 hover:text-white"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {activeSection === navItem.link.replace('#', '') && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {navItem.icon}
                  {navItem.name}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
} 