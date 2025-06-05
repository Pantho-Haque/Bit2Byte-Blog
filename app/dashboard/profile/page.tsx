'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ProfileCard } from '@/components/profile/profile-card';
import { StatsCard } from '@/components/profile/stats-card';
import { AchievementTimeline } from '@/components/profile/achievement-timeline';
import { ProfileSettings } from '@/components/profile/profile-settings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export default function ProfilePage({ params }: { params: { id: string } }) {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        // In a real app, you would fetch from your API
        // const response = await fetch(`/api/v1/profile/${params.id}`);
        // const data = await response.json();
        
        // For now, we'll use mock data
        setTimeout(() => {
          const mockUserData = {
            name: "Abu Saeed",
            email: `${params.id}@stud.kuet.ac.bd`,
            username: params.id,
            photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${params.id}`,
            role: "ADMIN",
            joinedAt: "2022-01-15",
            contributions: 47,
            blogs: 12,
            events: 5
          };
          
          setUserData(mockUserData);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [params.id]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 w-full min-h-screen bg-transparent">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList className="rounded-lg">
              <TabsTrigger value="overview" className="px-4 py-2">Overview</TabsTrigger>
              <TabsTrigger value="achievements" className="px-4 py-2">Achievements</TabsTrigger>
              <TabsTrigger value="settings" className="px-4 py-2">Settings</TabsTrigger>
            </TabsList>

            {/* <div className="hidden sm:block">
              <Button variant="outline">
                {userData?.username === params.id ? "Your Profile" : "View Profile"}
              </Button>
            </div> */}
          </div>

          <Separator className="mb-6" />

          <TabsContent value="overview" className="space-y-4">
            {userData && (
              <>
                <ProfileCard userData={userData} />
                <StatsCard />
              </>
            )}
          </TabsContent>
          
          <TabsContent value="achievements" className="space-y-4">
            <AchievementTimeline />
          </TabsContent>
          
          <TabsContent value="settings">
            {userData && <ProfileSettings userData={userData} />}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
