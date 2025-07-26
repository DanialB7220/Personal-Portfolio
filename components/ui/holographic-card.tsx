"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HolographicCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export function HolographicCard({ children, className, intensity = 1 }: HolographicCardProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const rotateXValue = ((e.clientY - centerY) / rect.height) * -15 * intensity;
    const rotateYValue = ((e.clientX - centerX) / rect.width) * 15 * intensity;
    
    const glowX = ((e.clientX - rect.left) / rect.width) * 100;
    const glowY = ((e.clientY - rect.top) / rect.height) * 100;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
    setGlowPosition({ x: glowX, y: glowY });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlowPosition({ x: 50, y: 50 });
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn("relative group cursor-pointer", className)}
      style={{ perspective: "1000px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="relative w-full h-full rounded-2xl border border-white/20 backdrop-blur-xl overflow-hidden"
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
        {/* Holographic background */}
        <div 
          className="absolute inset-0 opacity-30 group-hover:opacity-60 transition-opacity duration-300"
          style={{
            background: `
              radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, 
                rgba(99, 102, 241, 0.4) 0%, 
                rgba(139, 92, 246, 0.3) 25%, 
                rgba(6, 182, 212, 0.2) 50%, 
                transparent 70%
              ),
              linear-gradient(135deg, 
                rgba(99, 102, 241, 0.1) 0%, 
                rgba(139, 92, 246, 0.1) 25%,
                rgba(6, 182, 212, 0.1) 50%,
                rgba(16, 185, 129, 0.1) 75%,
                rgba(245, 158, 11, 0.1) 100%
              )
            `
          }}
        />

        {/* Rainbow shimmer effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(
              ${(glowPosition.x + glowPosition.y) * 1.8}deg,
              transparent 30%,
              rgba(255, 255, 255, 0.1) 50%,
              transparent 70%
            )`
          }}
        />

        {/* Animated border */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div 
            className="absolute inset-0 rounded-2xl"
            style={{
              background: `conic-gradient(
                from ${(glowPosition.x + glowPosition.y) * 3.6}deg,
                #6366f1,
                #8b5cf6,
                #06b6d4,
                #10b981,
                #f59e0b,
                #ef4444,
                #6366f1
              )`,
              padding: '2px',
            }}
          >
            <div className="w-full h-full bg-card rounded-2xl" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 p-6 h-full">
          {children}
        </div>

        {/* Floating sparkles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
} 