'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, 
  Medal, 
  Award, 
  Star, 
  LightbulbIcon,
  Clover
} from 'lucide-react';

interface Achievement {
  id: number;
  title: string;
  description: string;
  date: string;
  type: 'event' | 'badge' | 'project' | 'award' | 'certification';
  icon: React.ReactNode;
}

export function AchievementTimeline() {
  const achievements: Achievement[] = [
    {
      id: 1,
      title: "First Place - Bit2Console 2023",
      description: "Won first place in the annual coding competition",
      date: "2023-05-15",
      type: "event",
      icon: <Trophy className="h-5 w-5" />
    },
    {
      id: 2,
      title: "Top Contributor Badge",
      description: "Awarded for exceptional contributions to the club",
      date: "2023-07-22",
      type: "badge",
      icon: <Medal className="h-5 w-5" />
    },
    {
      id: 3,
      title: "Club Website Project Lead",
      description: "Led the development of the club's official website",
      date: "2023-09-10",
      type: "project",
      icon: <LightbulbIcon className="h-5 w-5" />
    },
    {
      id: 4,
      title: "Outstanding Member Award",
      description: "Recognized for dedication and commitment to the club",
      date: "2023-12-05",
      type: "award",
      icon: <Award className="h-5 w-5" />
    },
    {
      id: 5,
      title: "Web Development Workshop Facilitator",
      description: "Successfully conducted a workshop on modern web development",
      date: "2024-02-18",
      type: "certification",
      icon: <Star className="h-5 w-5" />
    }
  ];

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  const typeColors = {
    event: 'bg-blue-500/10 text-blue-500',
    badge: 'bg-purple-500/10 text-purple-500',
    project: 'bg-green-500/10 text-green-500',
    award: 'bg-amber-500/10 text-amber-500',
    certification: 'bg-rose-500/10 text-rose-500'
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto mt-8"
    >
      <Card className="p-6 border-0 shadow-lg overflow-hidden backdrop-blur-sm bg-opacity-40 bg-background">
        <div className="mb-6">
          <h2 className="text-xl font-bold">Achievement Timeline</h2>
          <p className="text-sm text-muted-foreground">Your journey with the club</p>
        </div>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-[28px] top-0 bottom-0 w-[2px] bg-primary/20"></div>

          <div className="space-y-8">
            {achievements.map((achievement, index) => (
              <motion.div 
                key={achievement.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: isInView ? 1 : 0, 
                  x: isInView ? 0 : -20 
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: isInView ? index * 0.2 : 0 
                }}
                className="relative pl-14"
              >
                {/* Timeline dot */}
                <motion.div 
                  className="absolute left-0 w-[14px] h-[14px] rounded-full bg-primary border-4 border-background"
                  style={{ top: '8px' }}
                  initial={{ scale: 0 }}
                  animate={{ scale: isInView ? 1 : 0 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: isInView ? index * 0.2 + 0.2 : 0,
                    type: "spring"
                  }}
                />

                {/* Icon */}
                <div className={`absolute left-5 w-8 h-8 rounded-full flex items-center justify-center ${typeColors[achievement.type].split(' ')[0]}`}>
                  <motion.div
                    initial={{ rotate: -45 }}
                    animate={{ rotate: isInView ? 0 : -45 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: isInView ? index * 0.2 + 0.1 : 0 
                    }}
                    className={typeColors[achievement.type].split(' ')[1]}
                  >
                    {achievement.icon}
                  </motion.div>
                </div>

                <div className="bg-background/50 hover:bg-background/80 p-4 rounded-lg border border-border transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <h3 className="font-medium">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        {new Date(achievement.date).toLocaleDateString()}
                      </Badge>
                      <Badge className={typeColors[achievement.type]}>
                        {achievement.type.charAt(0).toUpperCase() + achievement.type.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
} 