"use client";

import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { motion } from "framer-motion";

interface ResumeDownloadProps {
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "default" | "lg";
  showIcon?: boolean;
  children?: React.ReactNode;
}

export function ResumeDownload({ 
  className = "", 
  variant = "default", 
  size = "default",
  showIcon = true,
  children 
}: ResumeDownloadProps) {
  const handleDownload = () => {
    // Create a temporary link element to trigger download
    const link = document.createElement('a');
    link.href = '/Danial A.Bhatti  - Resume.pdf';
    link.download = 'Danial_Bhatti_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Button
        onClick={handleDownload}
        variant={variant}
        size={size}
        className={`${className} ${variant === "default" ? "bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90" : ""}`}
      >
        {showIcon && <Download className="w-4 h-4 mr-2" />}
        {children || "Download Resume"}
      </Button>
    </motion.div>
  );
}

// Alternative component with file icon
export function ResumeDownloadWithFileIcon({ 
  className = "", 
  variant = "outline", 
  size = "default" 
}: ResumeDownloadProps) {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Danial A.Bhatti  - Resume.pdf';
    link.download = 'Danial_Bhatti_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Button
        onClick={handleDownload}
        variant={variant}
        size={size}
        className={`${className} border-white/20 text-white hover:bg-white/10`}
      >
        <FileText className="w-4 h-4 mr-2" />
        Resume
      </Button>
    </motion.div>
  );
}
