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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,

} from "@/components/ui/pagination";
import { getAllBlogs, getSyllabus, getFilteredBlog } from "@/lib/api/getMethods";
import { deleteBlog } from "@/lib/api/postMethods";

// Add a debug component to show topics data
const DebugInfo = ({ data, label }: { data: any, label: string }) => {
  return (
    <div className="text-xs text-muted-foreground border p-2 my-2 rounded overflow-auto max-h-32">
      <div className="font-bold">{label}:</div>
      <pre className="whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [blogs, setBlogs] = useState<any[]>([]);
  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const { addToast } = useToast();

  const itemsPerPage = 10;

  // Add this function to generate pagination items
  const generatePagination = (currentPage: number, totalPages: number) => {
    // For very few pages, show all
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i);
    }

    // For current page near the beginning
    if (currentPage <= 2) {
      return [0, 1, 2, 3, 'ellipsis', totalPages - 1];
    }

    // For current page near the end
    if (currentPage >= totalPages - 3) {
      return [0, 'ellipsis', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1];
    }

    // For current page in the middle
    return [0, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages - 1];
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  // Fetch topics from API
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const data = await getSyllabus();
        console.log("Syllabus data:", JSON.stringify(data));
        if (data && data.data) {
          const topicsData = data.data.map((item: any) => ({
            id: item.id,
            name: item.topic_name
          }));
          console.log("Topics fetched:", topicsData);
          setTopics(topicsData);
        } else {
          console.log("No topics data found in response");
        }
      } catch (error) {
        console.log("Error fetching topics:", error);
      }
    };
    fetchTopics();
  }, []);

  // Fetch blogs when page loads or when filters change
  useEffect(() => {
    fetchBlogs();
  }, [currentPage, selectedTopic]);

  // Fetch blogs from API
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      let data;
      if (selectedTopic !== "all") {
        data = await getFilteredBlog(selectedTopic, null);
      } else {
        data = await getAllBlogs(currentPage, itemsPerPage);
      }
      
      console.log("Blog data response:", JSON.stringify(data));
      
      if (data && data.data) {
        const items = data.data.items || data.data;
        console.log("Blog items:", items);
        
        // Log the topic_id or topicId from each blog for debugging
        if (items && items.length > 0) {
          console.log("Sample blog topic IDs:", items.map((blog: any) => ({ 
            id: blog.id,
            topic_id: blog.topic_id,
            topicId: blog.topicId
          })));
        }
        
        setBlogs(items);
        setTotalPages(data.data.totalPages || 1);
      } else {
        setBlogs([]);
        setTotalPages(1);
      }
      setLoading(false);
    } catch (error) {
      console.log("Error fetching blogs:", error);
      setLoading(false);
    }
  };

  // Handle blog deletion
  const handleDeleteBlog = async (id: number) => {
    try {
      const data = await deleteBlog(id);
      if (data.success) {
        console.log(data);
        setBlogs(blogs.filter(blog => blog.id !== id));
      } else {
        throw new Error(data.message || 'Failed to delete blog');
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  // Format date
  const formatDate = (timestamp: string | number) => {
    // Handle different timestamp formats
    const date = typeof timestamp === 'string' 
      ? new Date(timestamp) 
      : new Date(timestamp);
    
    return date.toLocaleDateString('en-US', {
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

  // Helper function to get the topic name from ID
  const getTopicName = (topicId: string | number | undefined) => {
    if (!topicId) return 'Unknown';
    
    // Try different conversions and comparisons for matching
    const topic = topics.find(t => {
      return t.id === topicId || 
             t.id === Number(topicId) || 
             String(t.id) === String(topicId);
    });
    
    console.log(`Looking for topic ID: ${topicId}, found:`, topic ? JSON.stringify(topic) : 'null');
    
    return topic ? topic.name : 'Unknown';
  };

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
                  <TableHead className="hidden sm:table-cell">Created</TableHead>
                  <TableHead className="hidden sm:table-cell">Updated</TableHead>
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
                      <TableCell className="hidden sm:table-cell">
                        <Skeleton className="h-4 w-[80px]" />
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
                          {getTopicName(blog.topic_id || blog.topicId)}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center gap-2">
                          {blog.author_image && (
                            <div className="h-6 w-6 rounded-full overflow-hidden">
                              <img 
                                src={blog.author_image} 
                                alt={blog.written_by || 'Author'} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                          )}
                          <span>{blog.written_by || 'Unknown'}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {blog.creation_time ? formatDate(blog.creation_time) : 'N/A'}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {blog.last_updated ? formatDate(blog.last_updated) : 'N/A'}
                      </TableCell>
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
                              <Link href={`/pub/blogpost/${blog.id}`}>
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
          
          {/* Always show pagination for testing */}
          <div className="mt-4 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={currentPage === 0 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                
                {generatePagination(currentPage, totalPages).map((page, i) => (
                  page === 'ellipsis' ? (
                    <PaginationItem key={`ellipsis-${i}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={`page-${page}`}>
                      <PaginationLink 
                        onClick={() => handlePageChange(page as number)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {(page as number) + 1}
                      </PaginationLink>
                    </PaginationItem>
                  )
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={currentPage === totalPages - 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
          <div className="text-center text-xs text-muted-foreground mt-2">
            Page {currentPage + 1} of {totalPages} (Debug)
          </div>
        </CardContent>
        {/* Debug information - remove in production */}
        <div className="p-4 border-t">
          <details>
            <summary className="text-sm cursor-pointer font-medium">Debug Information</summary>
            <DebugInfo data={topics} label="Topics Data" />
            {blogs.length > 0 && (
              <DebugInfo data={blogs[0]} label="Sample Blog Data" />
            )}
          </details>
          <div className="mt-2">
            <div className="text-xs text-muted-foreground">
              API BASE_URL: {process.env.NEXT_PUBLIC_BASE_URL || "not set"}
            </div>
            <div className="text-xs text-muted-foreground">
              Field mapping debug: In blogs we look for 'topic_id' or 'topicId', and match against topic 'id' field
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}