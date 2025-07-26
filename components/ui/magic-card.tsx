"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";

interface MagicCardProps {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
  hover3d?: boolean;
}

export function MagicCard({ children, className, gradient = true, hover3d = true }: MagicCardProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hover3d) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateXValue = (e.clientY - centerY) / 10;
    const rotateYValue = (centerX - e.clientX) / 10;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      className={cn(
        "relative group cursor-pointer",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={cn(
          "relative w-full h-full rounded-2xl p-6 border border-white/10 backdrop-blur-md",
          gradient && "bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-transparent",
          "shadow-[0_8px_32px_rgba(0,0,0,0.3)] group-hover:shadow-[0_16px_48px_rgba(99,102,241,0.3)]",
          "transition-all duration-500"
        )}
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        }}
        animate={{
          rotateX,
          rotateY,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Animated border */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary via-accent to-primary animate-gradient bg-[length:400%_400%] blur-sm" />
          <div className="absolute inset-[1px] rounded-2xl bg-card" />
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
      </motion.div>
    </motion.div>
  );
} 