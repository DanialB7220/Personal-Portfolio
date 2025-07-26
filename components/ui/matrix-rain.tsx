"use client";

import { useEffect, useRef } from "react";

interface MatrixRainProps {
  className?: string;
  density?: number;
  speed?: number;
  color?: string;
}

export function MatrixRain({ 
  className = "", 
  density = 0.8, 
  speed = 50,
  color = "#6366f1"
}: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    const chars = "01";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(0);

    const draw = () => {
      ctx.fillStyle = "rgba(15, 15, 35, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = color;
      ctx.font = `${fontSize}px 'Courier New', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.globalAlpha = Math.random() * 0.7 + 0.3;
        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > density) {
          drops[i] = 0;
        } else {
          drops[i]++;
        }
      }
    };

    const interval = setInterval(draw, speed);

    window.addEventListener("resize", resizeCanvas);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [density, speed, color]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 opacity-20 ${className}`}
    />
  );
} 