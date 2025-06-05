'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useTheme } from 'next-themes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarDays, FileText, Star, Trophy, User } from 'lucide-react';

interface UserProfileProps {
  userData: {
    name: string;
    email: string;
    username: string;
    photo: string;
    role: string;
    joinedAt: string;
    contributions: number;
    blogs: number;
    events: number;
  };
}

export function ProfileCard({ userData }: UserProfileProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only show the UI after mounting to ensure theme is correctly detected
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const roleColors = {
    ADMIN: 'bg-red-500 hover:bg-red-600',
    MENTOR: 'bg-blue-500 hover:bg-blue-600',
    TA: 'bg-green-500 hover:bg-green-600',
    ALUMNI: 'bg-purple-500 hover:bg-purple-600',
    USER: 'bg-gray-500 hover:bg-gray-600',
  };
  
  const roleColor = userData.role in roleColors 
    ? roleColors[userData.role as keyof typeof roleColors] 
    : 'bg-gray-500 hover:bg-gray-600';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      <Card className="border-0 shadow-lg overflow-hidden backdrop-blur-sm bg-opacity-40 bg-background">
        <div className="relative h-48 bg-gradient-to-r from-primary/30 to-secondary/30">
          <motion.div 
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 1 }}
          >
            <svg 
              className="w-full h-full" 
              viewBox="0 0 100 100" 
              preserveAspectRatio="none"
            >
              {[...Array(20)].map((_, i) => (
                <line 
                  key={i} 
                  x1={Math.random() * 100} 
                  y1="0" 
                  x2={Math.random() * 100} 
                  y2="100" 
                  stroke={theme === 'dark' ? 'white' : 'black'} 
                  strokeWidth="0.1" 
                  strokeOpacity="0.3" 
                />
              ))}
            </svg>
          </motion.div>
        </div>
        
        <div className="relative flex flex-col md:flex-row">
          <div className="md:w-1/3 p-6">
            <div className="relative -mt-20 flex justify-center md:justify-start">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
                  <AvatarImage src={userData.photo} alt={userData.name} />
                  <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </motion.div>
            </div>
            
            <div className="text-center md:text-left mt-4">
              <h2 className="text-2xl font-bold">{userData.name}</h2>
              <p className="text-muted-foreground">@{userData.username}</p>
              <div className="my-3">
                <Badge className={`${roleColor} text-white`}>{userData.role}</Badge>
              </div>
              <p className="text-sm flex items-center justify-center md:justify-start gap-1 text-muted-foreground">
                <CalendarDays className="h-4 w-4" />
                Joined {new Date(userData.joinedAt).toLocaleDateString()}
              </p>
              <p className="text-sm mt-1">{userData.email}</p>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-6">
              <motion.div
                whileHover={{ y: -5 }}
                className="flex flex-col items-center p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors"
              >
                <Star className="h-5 w-5 text-primary" />
                <span className="font-bold mt-1">{userData.contributions}</span>
                <span className="text-xs text-muted-foreground">Contributions</span>
              </motion.div>
              
              <motion.div
                whileHover={{ y: -5 }}
                className="flex flex-col items-center p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors"
              >
                <FileText className="h-5 w-5 text-primary" />
                <span className="font-bold mt-1">{userData.blogs}</span>
                <span className="text-xs text-muted-foreground">Blogs</span>
              </motion.div>
              
              <motion.div
                whileHover={{ y: -5 }}
                className="flex flex-col items-center p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors"
              >
                <Trophy className="h-5 w-5 text-primary" />
                <span className="font-bold mt-1">{userData.events}</span>
                <span className="text-xs text-muted-foreground">Events</span>
              </motion.div>
            </div>
          </div>
          
          <div className="md:w-2/3 p-6">
            <Tabs defaultValue="activities" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="activities" className="flex-1">Activities</TabsTrigger>
                <TabsTrigger value="blogs" className="flex-1">Blogs</TabsTrigger>
                <TabsTrigger value="events" className="flex-1">Events</TabsTrigger>
              </TabsList>
              
              <TabsContent value="activities" className="mt-4">
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-4 rounded-lg border border-border bg-background/50 hover:bg-background/80 transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-2 rounded-full">
                          {i === 0 ? (
                            <FileText className="h-5 w-5 text-primary" />
                          ) : i === 1 ? (
                            <Trophy className="h-5 w-5 text-primary" />
                          ) : (
                            <Star className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium">
                            {i === 0 
                              ? "Published a new blog post" 
                              : i === 1 
                                ? "Participated in an event" 
                                : "Earned a new badge"}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {i === 0 
                              ? "Introduction to React Hooks" 
                              : i === 1 
                                ? "Bit2Console 2024" 
                                : "Top Contributor"}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(Date.now() - i * 86400000 * 5).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="blogs" className="mt-4">
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-4 rounded-lg border border-border bg-background/50 hover:bg-background/80 transition-all"
                    >
                      <h3 className="font-medium">
                        {["Introduction to React Hooks", "Understanding Algorithms", "Web Development Best Practices"][i]}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {["A comprehensive guide to React Hooks", "Exploring fundamental algorithms", "Tips for modern web development"][i]}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-muted-foreground">
                          {new Date(Date.now() - i * 86400000 * 10).toLocaleDateString()}
                        </p>
                        <Badge variant="secondary">
                          {["React", "Algorithms", "Web Dev"][i]}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="events" className="mt-4">
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-4 rounded-lg border border-border bg-background/50 hover:bg-background/80 transition-all"
                    >
                      <h3 className="font-medium">
                        {["Bit2Console 2024", "Web Development Workshop", "Code Retreat"][i]}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {["Annual coding competition", "Hands-on web development session", "Full day of pair programming"][i]}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-muted-foreground">
                          {new Date(Date.now() - i * 86400000 * 15).toLocaleDateString()}
                        </p>
                        <Badge variant="outline">
                          {["Competition", "Workshop", "Practice"][i]}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </Card>
    </motion.div>
  );
} 