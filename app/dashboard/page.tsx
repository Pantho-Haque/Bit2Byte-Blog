"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconFileText,
  IconPlus,
  IconList,
  IconCategory,
  IconUsers,
  IconCalendarEvent,
  IconChartBar
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/theme-toggle";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Dashboard() {
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Blogs",
      href: "/dashboard/blogs",
      icon: (
        <IconFileText className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Create Blog",
      href: "/dashboard/blogs/create",
      icon: (
        <IconPlus className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Categories",
      href: "/dashboard/categories",
      icon: (
        <IconCategory className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Users",
      href: "/dashboard/users",
      icon: (
        <IconUsers className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Events",
      href: "/dashboard/events",
      icon: (
        <IconCalendarEvent className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Analytics",
      href: "/dashboard/analytics",
      icon: (
        <IconChartBar className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "/dashboard/profile",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "/auth",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-[100vw] flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-[90vh]"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <SidebarLink
              link={{
                label: "Admin User",
                href: "#",
                icon: (
                  <Image
                    src="https://img.icons8.com/?size=100&id=73&format=png&color=000000"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
            <ModeToggle />
          </div>
        </SidebarBody>
      </Sidebar>
      <DashboardContent />
    </div>
  );
}

const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Bit2Byte Admin
      </motion.span>
    </Link>
  );
};

const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

// Dashboard main content with stats and overview
const DashboardContent = () => {
  const stats = [
    { title: "Total Blogs", value: "154", change: "+12% from last month" },
    { title: "Active Users", value: "2.4K", change: "+8% from last month" },
    { title: "Page Views", value: "12.5K", change: "+24% from last month" },
    { title: "New Comments", value: "48", change: "+18% from last month" },
  ];

  const recentBlogs = [
    { title: "Understanding JavaScript Closures", author: "John Doe", date: "Apr 27, 2025", views: 245 },
    { title: "Getting Started with TypeScript", author: "Jane Smith", date: "Apr 25, 2025", views: 189 },
    { title: "React vs Angular in 2025", author: "Michael Brown", date: "Apr 22, 2025", views: 342 },
    { title: "CSS Grid Layout Tutorial", author: "Sarah Johnson", date: "Apr 18, 2025", views: 156 },
  ];

  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <div className="bg-white dark:bg-neutral-900 p-6 flex justify-between items-center border-b border-neutral-200 dark:border-neutral-700 sticky top-0 z-10">
        <h1 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100">Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-neutral-500 dark:text-neutral-400">April 29, 2025</span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">{stat.value}</div>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 border-none shadow-md">
            <CardHeader>
              <CardTitle>Recent Blogs</CardTitle>
              <CardDescription>Latest blog posts published on your platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBlogs.map((blog, index) => (
                  <div key={index} className="flex justify-between items-center border-b border-neutral-200 dark:border-neutral-700 pb-4 last:border-none">
                    <div>
                      <h3 className="font-medium text-neutral-800 dark:text-neutral-100">{blog.title}</h3>
                      <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                        <span>{blog.author}</span>
                        <span>•</span>
                        <span>{blog.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
                      <span className="text-sm">{blog.views} views</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">View All Blogs</Button>
            </CardFooter>
          </Card>
          
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and operations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                <IconPlus className="mr-2 h-4 w-4" />
                New Blog Post
              </Button>
              <Button variant="outline" className="w-full">
                <IconUsers className="mr-2 h-4 w-4" />
                Manage Users
              </Button>
              <Button variant="outline" className="w-full">
                <IconCalendarEvent className="mr-2 h-4 w-4" />
                Schedule Event
              </Button>
              <Button variant="outline" className="w-full">
                <IconCategory className="mr-2 h-4 w-4" />
                Manage Categories
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
