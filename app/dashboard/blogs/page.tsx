"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/toast-context";
import { IconPlus, IconSearch, IconEdit, IconTrash, IconEye, IconDotsVertical, IconFileText } from "@tabler/icons-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination } from "@/components/ui/pagination";
import { toast } from "@/components/ui/use-toast";

// Mock data for topics while waiting for API integration
const mockTopics = [
  { id: 1, name: "C Programming" },
  { id: 2, name: "Web Development" },
  { id: 3, name: "Data Structures" },
  { id: 4, name: "Algorithms" },
];

export default function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [blogs, setBlogs] = useState<any[]>([]);
  const [topics, setTopics] = useState<any[]>(mockTopics);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const { addToast } = useToast();

  const itemsPerPage = 10;

  // Fetch blogs when page loads or when filters change
  useEffect(() => {
    fetchBlogs();
  }, [currentPage, selectedTopic]);

  // Fetch blogs from API
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      // In a real implementation, this would be an API call
      // Example: const response = await fetch(`/api/v1/read_blogs?page=${currentPage}&item_per_page=${itemsPerPage}`);
      
      // For demo, we'll use a timeout to simulate API call
      setTimeout(() => {
        // Mock blog data
        const mockData = {
          data: {
            itemCount: 15,
            pageNo: currentPage,
            items: Array(10).fill(null).map((_, i) => ({
              id: i + 1 + (currentPage * itemsPerPage),
              topicId: Math.floor(Math.random() * 4) + 1,
              subTopicId: Math.floor(Math.random() * 3) + 1,
              title: `Blog Post ${i + 1 + (currentPage * itemsPerPage)}`,
              image: null,
              lastUpdated: Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
              creationTime: Date.now() - Math.floor(Math.random() * 60) * 24 * 60 * 60 * 1000,
              writtenBy: "Admin User",
              shortDesc: `This is the short description for blog post ${i + 1 + (currentPage * itemsPerPage)}`,
              approvedBy: "Admin User",
              views: Math.floor(Math.random() * 300) + 50
            })),
            totalPages: 2
          },
          message: "Success"
        };

        setBlogs(mockData.data.items);
        setTotalPages(mockData.data.totalPages);
        setLoading(false);
      }, 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch blogs. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  // Handle blog deletion
  const handleDeleteBlog = async (id: number) => {
    try {
      // In a real implementation, this would be an API call
      // const response = await fetch(`/api/v1/delete_blog?blog_id=${id}`, {
      //   method: 'POST',
      // });
      // const data = await response.json();
      
      // For demo, we'll simulate success
      toast({
        title: "Success",
        description: `Blog #${id} has been deleted successfully.`,
      });
      
      // Remove the blog from the list
      setBlogs(blogs.filter(blog => blog.id !== id));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete blog. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Format date
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Filter blogs by search term
  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.shortDesc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Management</h1>
          <p className="text-muted-foreground">View, edit and manage all blogs</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/blogs/create">
            <IconPlus className="mr-2 h-4 w-4" />
            New Blog
          </Link>
        </Button>
      </div>
      
      <Separator />
      
      <Card>
        <CardHeader>
          <CardTitle>All Blogs</CardTitle>
          <CardDescription>
            {loading ? (
              <Skeleton className="h-5 w-40" />
            ) : (
              `Showing ${filteredBlogs.length} blogs`
            )}
          </CardDescription>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <IconSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search blogs..."
                className="pl-8"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <Select 
              value={selectedTopic} 
              onValueChange={(value) => {
                setSelectedTopic(value);
                setCurrentPage(0);
              }}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="All topics" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All topics</SelectItem>
                {topics.map((topic) => (
                  <SelectItem key={topic.id} value={topic.id.toString()}>
                    {topic.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">Topic</TableHead>
                  <TableHead className="hidden lg:table-cell">Author</TableHead>
                  <TableHead className="hidden sm:table-cell">Updated</TableHead>
                  <TableHead className="hidden sm:table-cell text-right">Views</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  // Loading skeletons
                  Array(5).fill(null).map((_, index) => (
                    <TableRow key={`skeleton-${index}`}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Skeleton className="h-10 w-10 rounded" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-[200px]" />
                            <Skeleton className="h-3 w-[160px]" />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Skeleton className="h-4 w-[100px]" />
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <Skeleton className="h-4 w-[100px]" />
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Skeleton className="h-4 w-[80px]" />
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-right">
                        <Skeleton className="h-4 w-[50px] ml-auto" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-8 w-8 rounded-full" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : filteredBlogs.length > 0 ? (
                  filteredBlogs.map((blog) => (
                    <TableRow key={blog.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded overflow-hidden bg-muted hidden sm:flex items-center justify-center">
                            {blog.image ? (
                              <img 
                                src={blog.image} 
                                alt={blog.title} 
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <IconFileText className="h-5 w-5 text-muted-foreground" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{blog.title}</div>
                            <div className="text-sm text-muted-foreground truncate max-w-[200px] sm:max-w-[300px]">
                              {blog.shortDesc}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="outline" className="bg-muted/50">
                          {topics.find(t => t.id === blog.topicId)?.name || 'Unknown'}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">{blog.writtenBy}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {formatDate(blog.lastUpdated)}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-right">{blog.views || 0}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="rounded-full p-0 h-8 w-8">
                              <IconDotsVertical className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/blog/${blog.id}`}>
                                <IconEye className="mr-2 h-4 w-4" />
                                View
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/blogs/edit/${blog.id}`}>
                                <IconEdit className="mr-2 h-4 w-4" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteBlog(blog.id)}
                              className="text-red-600 dark:text-red-400"
                            >
                              <IconTrash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No blogs found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {!loading && totalPages > 1 && (
            <div className="mt-4 flex justify-center">
              <Pagination 
                totalPages={totalPages} 
                currentPage={currentPage} 
                onPageChange={setCurrentPage} 
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}