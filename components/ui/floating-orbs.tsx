"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

interface Orb {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
}

interface FloatingOrbsProps {
  count?: number;
  className?: string;
}

export function FloatingOrbs({ count = 8, className = "" }: FloatingOrbsProps) {
  const [orbs, setOrbs] = useState<Orb[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const colors = useMemo(() => [
    "rgba(99, 102, 241, 0.6)",
    "rgba(139, 92, 246, 0.6)", 
    "rgba(6, 182, 212, 0.6)",
    "rgba(16, 185, 129, 0.6)",
    "rgba(245, 158, 11, 0.6)",
    "rgba(239, 68, 68, 0.6)",
  ], []);

  useEffect(() => {
    const newOrbs: Orb[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 60 + 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 0.5 + 0.2,
    }));
    setOrbs(newOrbs);
  }, [count, colors]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
      {orbs.map((orb) => {
        const attractionStrength = 0.1;
        const repulsionDistance = 15;
        
        const dx = mousePosition.x - orb.x;
        const dy = mousePosition.y - orb.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        let newX = orb.x;
        let newY = orb.y;
        
        if (distance < repulsionDistance) {
          // Repulsion effect when mouse is very close
          newX = orb.x - (dx / distance) * attractionStrength * 5;
          newY = orb.y - (dy / distance) * attractionStrength * 5;
        } else {
          // Gentle attraction
          newX = orb.x + dx * attractionStrength * 0.02;
          newY = orb.y + dy * attractionStrength * 0.02;
        }

        return (
          <motion.div
            key={orb.id}
            className="absolute rounded-full blur-sm"
            style={{
              width: orb.size,
              height: orb.size,
              background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            }}
            animate={{
              x: `${newX}vw`,
              y: `${newY}vh`,
              scale: [1, 1.2, 1],
            }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
              scale: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />
        );
      })}
    </div>
  );
} 