"use client";
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconFileText, IconPlus, IconUsers, IconCalendarEvent, IconCategory, IconCoins } from "@tabler/icons-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function Dashboard() {
  const stats = [
    { title: "Total Blogs", value: "154", change: "+12% from last month", icon: <IconFileText className="h-5 w-5" /> },
    { title: "Active Users", value: "2.4K", change: "+8% from last month", icon: <IconUsers className="h-5 w-5" /> },
    { title: "Page Views", value: "12.5K", change: "+24% from last month", icon: <IconCalendarEvent className="h-5 w-5" /> },
    { title: "Categories", value: "18", change: "+3 from last month", icon: <IconCategory className="h-5 w-5" /> },
  ];

  const recentBlogs = [
    { title: "Understanding JavaScript Closures", author: "John Doe", date: "Apr 27, 2025", views: 245 },
    { title: "Getting Started with TypeScript", author: "Jane Smith", date: "Apr 25, 2025", views: 189 },
    { title: "React vs Angular in 2025", author: "Michael Brown", date: "Apr 22, 2025", views: 342 },
    { title: "CSS Grid Layout Tutorial", author: "Sarah Johnson", date: "Apr 18, 2025", views: 156 },
  ];

  const quickActions = [
    { title: "Create New Blog", href: "/dashboard/blogs/create", icon: <IconPlus className="h-4 w-4" />, primary: true },
    { title: "Manage Categories", href: "/dashboard/categories", icon: <IconCategory className="h-4 w-4" />, primary: false },
    { title: "View All Blogs", href: "/dashboard/blogs", icon: <IconFileText className="h-4 w-4" />, primary: false },
    { title: "Manage Events", href: "/dashboard/events", icon: <IconCalendarEvent className="h-4 w-4" />, primary: false },
    { title: "Manage Funds", href: "/dashboard/funds", icon: <IconCoins className="h-4 w-4" />, primary: false },
    { title: "Manage Users", href: "/dashboard/users", icon: <IconUsers className="h-4 w-4" />, primary: false },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the Bit2Byte Admin Dashboard</p>
      </div>
      
      <Separator />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className="h-8 w-8 bg-muted rounded-md flex items-center justify-center">
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border border-border">
          <CardHeader>
            <CardTitle>Recent Blogs</CardTitle>
            <CardDescription>Latest blog posts published on your platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBlogs.map((blog, index) => (
                <div key={index} className="flex justify-between items-center border-b border-border pb-4 last:border-none">
                  <div>
                    <h3 className="font-medium">{blog.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <span>{blog.author}</span>
                      <span>•</span>
                      <span>{blog.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-sm">{blog.views} views</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/dashboard/blogs">View All Blogs</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="border border-border">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {quickActions.map((action, index) => (
              <Button 
                key={index} 
                className="w-full justify-start gap-2" 
                variant={action.primary ? "default" : "outline"}
                asChild
              >
                <Link href={action.href}>
                  {action.icon}
                  {action.title}
                </Link>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
