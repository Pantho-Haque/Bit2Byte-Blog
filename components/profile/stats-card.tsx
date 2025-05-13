'use client';

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { 
  Trophy, 
  FileText, 
  Calendar, 
  CircleCheck,
  GraduationCap
} from "lucide-react";

interface Stat {
  label: string;
  value: number;
  icon: React.ReactNode;
}

export function StatsCard() {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mock stats data
  const stats: Stat[] = [
    { label: "Blogs", value: 12, icon: <FileText className="h-4 w-4" /> },
    { label: "Events", value: 5, icon: <Calendar className="h-4 w-4" /> },
    { label: "Achievements", value: 8, icon: <Trophy className="h-4 w-4" /> },
    { label: "Tasks", value: 24, icon: <CircleCheck className="h-4 w-4" /> },
    { label: "Courses", value: 6, icon: <GraduationCap className="h-4 w-4" /> },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Calculate mouse position relative to card center
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;
    
    // Calculate rotation (limit to ±10 degrees)
    const rotateYValue = ((e.clientX - cardCenterX) / (rect.width / 2)) * 5;
    const rotateXValue = ((e.clientY - cardCenterY) / (rect.height / 2)) * 5;
    
    setRotateX(-rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    // Smoothly reset rotation when mouse leaves
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="w-full max-w-4xl mx-auto mt-8"
      style={{
        perspective: "1000px",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="w-full"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <Card className="p-6 border-0 shadow-lg overflow-hidden backdrop-blur-sm bg-opacity-40 bg-background">
          <div className="mb-4">
            <h2 className="text-xl font-bold">Statistics Overview</h2>
            <p className="text-sm text-muted-foreground">Your activity in the club</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-all"
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
                }}
              >
                <div className="bg-primary/10 p-2 rounded-full mb-2">
                  {stat.icon}
                </div>
                <span className="text-2xl font-bold">{stat.value}</span>
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </motion.div>
            ))}
          </div>

          <div className="absolute inset-0 rounded-lg pointer-events-none">
            {/* Add subtle reflective effect */}
            <div 
              className="absolute inset-0 rounded-lg" 
              style={{
                background: `linear-gradient(
                  105deg, 
                  transparent 20%, 
                  rgba(255, 255, 255, 0.05) 40%, 
                  rgba(255, 255, 255, 0) 60%
                )`,
                transform: `rotate(${rotateY * 2}deg)`,
                opacity: Math.abs(rotateY) * 0.05 + 0.1,
                transition: "opacity 0.1s ease-out, transform 0.1s ease-out",
              }}
            />
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
} 