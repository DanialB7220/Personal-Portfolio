"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface SkillData {
  skill: string;
  level: number;
  color: string;
}

interface SkillRadarProps {
  skills: SkillData[];
  size?: number;
  className?: string;
}

export function SkillRadar({ skills, size = 300, className = "" }: SkillRadarProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [animationProgress, setAnimationProgress] = useState(0);

  const center = size / 2;
  const radius = size / 2 - 40;
  const angleStep = (2 * Math.PI) / skills.length;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationProgress(1);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const getPolygonPoints = (levelRatio: number) => {
    return skills
      .map((_, index) => {
        const angle = index * angleStep - Math.PI / 2;
        const x = center + Math.cos(angle) * radius * levelRatio;
        const y = center + Math.sin(angle) * radius * levelRatio;
        return `${x},${y}`;
      })
      .join(" ");
  };

  const getSkillPosition = (index: number, level: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const skillRadius = (radius * level * animationProgress) / 100;
    const x = center + Math.cos(angle) * skillRadius;
    const y = center + Math.sin(angle) * skillRadius;
    return { x, y };
  };

  const getLabelPosition = (index: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const labelRadius = radius + 20;
    const x = center + Math.cos(angle) * labelRadius;
    const y = center + Math.sin(angle) * labelRadius;
    return { x, y };
  };

  return (
    <div className={`relative ${className}`}>
      <svg
        ref={svgRef}
        width={size}
        height={size}
        className="overflow-visible"
      >
        {/* Grid circles */}
        {[0.2, 0.4, 0.6, 0.8, 1].map((ratio, index) => (
          <circle
            key={index}
            cx={center}
            cy={center}
            r={radius * ratio}
            fill="none"
            stroke="rgba(99, 102, 241, 0.1)"
            strokeWidth="1"
          />
        ))}

        {/* Grid lines */}
        {skills.map((_, index) => {
          const angle = index * angleStep - Math.PI / 2;
          const endX = center + Math.cos(angle) * radius;
          const endY = center + Math.sin(angle) * radius;
          return (
            <line
              key={index}
              x1={center}
              y1={center}
              x2={endX}
              y2={endY}
              stroke="rgba(99, 102, 241, 0.1)"
              strokeWidth="1"
            />
          );
        })}

        {/* Skill area */}
        <motion.polygon
          points={getPolygonPoints(1)}
          fill="rgba(99, 102, 241, 0.1)"
          stroke="rgba(99, 102, 241, 0.3)"
          strokeWidth="2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: animationProgress, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        />

        {/* Skill points */}
        {skills.map((skill, index) => {
          const { x, y } = getSkillPosition(index, skill.level);
          const isHovered = hoveredSkill === skill.skill;
          
          return (
            <motion.g key={skill.skill}>
              <motion.circle
                cx={x}
                cy={y}
                r={isHovered ? 8 : 5}
                fill={skill.color}
                stroke="white"
                strokeWidth="2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.8 }}
                onMouseEnter={() => setHoveredSkill(skill.skill)}
                onMouseLeave={() => setHoveredSkill(null)}
                className="cursor-pointer filter drop-shadow-lg"
                whileHover={{ scale: 1.2 }}
              />
              
              {/* Hover tooltip */}
              {isHovered && (
                <motion.g
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <rect
                    x={x - 30}
                    y={y - 35}
                    width="60"
                    height="20"
                    fill="rgba(0, 0, 0, 0.8)"
                    rx="4"
                  />
                  <text
                    x={x}
                    y={y - 22}
                    textAnchor="middle"
                    fill="white"
                    fontSize="10"
                    fontWeight="bold"
                  >
                    {skill.level}%
                  </text>
                </motion.g>
              )}
            </motion.g>
          );
        })}

        {/* Skill labels */}
        {skills.map((skill, index) => {
          const { x, y } = getLabelPosition(index);
          return (
            <motion.text
              key={`label-${skill.skill}`}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="currentColor"
              fontSize="12"
              fontWeight="500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 1 }}
              className={hoveredSkill === skill.skill ? "fill-primary" : "fill-current"}
            >
              {skill.skill}
            </motion.text>
          );
        })}
      </svg>
    </div>
  );
} 