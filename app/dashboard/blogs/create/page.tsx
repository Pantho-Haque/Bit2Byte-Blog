"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IconDeviceFloppy, IconUpload, IconEye, IconMarkdown, IconArrowLeft } from "@tabler/icons-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import MarkdownPreview from "@/components/dashboard/MarkdownPreview";
import { useToast } from "@/components/ui/toast-context";
import Link from "next/link";

export default function CreateBlogPage() {
  const [blogTitle, setBlogTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedSubtopic, setSelectedSubtopic] = useState("");
  const [markdownContent, setMarkdownContent] = useState("");
  const [blogImage, setBlogImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [topics, setTopics] = useState<any[]>([]);
  const [subtopics, setSubtopics] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();

  // Fetch topics on page load
  useEffect(() => {
    fetchTopics();
  }, []);

  // Fetch subtopics when a topic is selected
  useEffect(() => {
    if (selectedTopic) {
      fetchSubtopics(parseInt(selectedTopic));
    } else {
      setSubtopics([]);
    }
  }, [selectedTopic]);

  // Mock fetch topics function (to be replaced with actual API call)
  const fetchTopics = async () => {
    try {
      // In a real implementation, this would be an API call
      // const response = await fetch('/api/v1/read_syllabus');
      // const data = await response.json();
      
      // For demo, we'll use mock data
      setTimeout(() => {
        setTopics([
          { id: 1, topicName: "C Programming", serial: 1 },
          { id: 2, topicName: "Web Development", serial: 2 },
          { id: 3, topicName: "Data Structures", serial: 3 },
          { id: 4, topicName: "Algorithms", serial: 4 },
        ]);
      }, 500);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch topics. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Mock fetch subtopics function (to be replaced with actual API call)
  const fetchSubtopics = async (topicId: number) => {
    try {
      // In a real implementation, this would be an API call
      // const response = await fetch(`/api/v1/read_topic?id=${topicId}`);
      // const data = await response.json();
      
      // For demo, we'll use mock data
      const mockSubtopics = {
        1: [
          { id: 101, subTopicName: "Introduction to C", serial: 1 },
          { id: 102, subTopicName: "Variables & Data Types", serial: 2 },
          { id: 103, subTopicName: "Control Flow", serial: 3 },
        ],
        2: [
          { id: 201, subTopicName: "HTML Basics", serial: 1 },
          { id: 202, subTopicName: "CSS Fundamentals", serial: 2 },
          { id: 203, subTopicName: "JavaScript Essentials", serial: 3 },
        ],
        3: [
          { id: 301, subTopicName: "Arrays", serial: 1 },
          { id: 302, subTopicName: "Linked Lists", serial: 2 },
          { id: 303, subTopicName: "Trees", serial: 3 },
        ],
        4: [
          { id: 401, subTopicName: "Searching", serial: 1 },
          { id: 402, subTopicName: "Sorting", serial: 2 },
          { id: 403, subTopicName: "Graph Algorithms", serial: 3 },
        ],
      };
      
      setTimeout(() => {
        setSubtopics(mockSubtopics[topicId as keyof typeof mockSubtopics] || []);
      }, 300);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch subtopics. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setBlogImage(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Save blog draft
  const saveDraft = async () => {
    if (!blogTitle) {
      toast({
        title: "Error",
        description: "Please enter a blog title.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Success",
      description: "Your blog draft has been saved successfully.",
    });
  };

  // Publish blog
  const publishBlog = async () => {
    try {
      // Validation
      if (!blogTitle || !shortDesc || !selectedTopic || !selectedSubtopic || !markdownContent) {
        toast({
          title: "Error",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        return;
      }

      setIsSubmitting(true);

      // In a real implementation, this would be API calls
      // First save blog info
      // const blogInfo = {
      //   id: Date.now(), // Generate a temporary ID (backend will assign a real one)
      //   topic_id: parseInt(selectedTopic),
      //   sub_topic_id: parseInt(selectedSubtopic),
      //   title: blogTitle,
      //   written_by: "admin", // Should come from authentication
      //   short_desc: shortDesc,
      //   approved_by: "admin", // Should come from authentication
      // };
      //
      // const formData = new FormData();
      // formData.append('blog_info', JSON.stringify(blogInfo));
      // if (blogImage) {
      //   formData.append('image', blogImage);
      // }
      //
      // const response = await fetch('/api/v1/save_blog_info', {
      //   method: 'POST',
      //   body: formData
      // });
      // const data = await response.json();
      //
      // Then save blog content
      // const contentResponse = await fetch('/api/v1/save_blog_details', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     id: data.data.id,
      //     content: markdownContent
      //   })
      // });

      // For demo, we'll simulate a delay
      setTimeout(() => {
        setIsSubmitting(false);
        toast({
          title: "Success",
          description: "Your blog has been published successfully!",
        });
      }, 1500);
    } catch (error) {
      setIsSubmitting(false);
      toast({
        title: "Error",
        description: "Failed to publish blog. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Blog</h1>
          <p className="text-muted-foreground">Create a new blog post with markdown support</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/blogs">
              <IconArrowLeft className="mr-2 h-4 w-4" />
              Back to Blogs
            </Link>
          </Button>
          <Button 
            variant="outline" 
            onClick={saveDraft} 
            disabled={isSubmitting || !blogTitle}
          >
            <IconDeviceFloppy className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button 
            onClick={publishBlog}
            disabled={isSubmitting}
            className="relative"
          >
            {isSubmitting ? (
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              <IconUpload className="mr-2 h-4 w-4" />
            )}
            {isSubmitting ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border border-border">
          <CardHeader>
            <CardTitle>Blog Content</CardTitle>
            <CardDescription>Write your blog content in Markdown format</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="write" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="write" className="flex items-center">
                  <IconMarkdown className="mr-2 h-4 w-4" />
                  Write
                </TabsTrigger>
                <TabsTrigger value="preview" className="flex items-center">
                  <IconEye className="mr-2 h-4 w-4" />
                  Preview
                </TabsTrigger>
              </TabsList>
              <TabsContent value="write">
                <Textarea
                  placeholder="Write your blog content in Markdown format..."
                  className="min-h-[500px] font-mono resize-none"
                  value={markdownContent}
                  onChange={(e) => setMarkdownContent(e.target.value)}
                />
              </TabsContent>
              <TabsContent value="preview" className="min-h-[500px] border rounded-md p-4 prose prose-sm dark:prose-invert max-w-none overflow-auto">
                <MarkdownPreview content={markdownContent} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border border-border">
            <CardHeader>
              <CardTitle>Blog Details</CardTitle>
              <CardDescription>Basic information about your blog</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Blog Title<span className="text-red-500">*</span></Label>
                <Input 
                  id="title"
                  placeholder="Enter blog title"
                  value={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="shortDesc">Short Description<span className="text-red-500">*</span></Label>
                <Textarea
                  id="shortDesc"
                  placeholder="Brief description of your blog (150 characters max)"
                  maxLength={150}
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground text-right">
                  {shortDesc.length}/150
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="topic">Topic<span className="text-red-500">*</span></Label>
                <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                  <SelectTrigger id="topic">
                    <SelectValue placeholder="Select a topic" />
                  </SelectTrigger>
                  <SelectContent>
                    {topics.map((topic) => (
                      <SelectItem key={topic.id} value={topic.id.toString()}>
                        {topic.topicName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subtopic">Subtopic<span className="text-red-500">*</span></Label>
                <Select 
                  value={selectedSubtopic} 
                  onValueChange={setSelectedSubtopic}
                  disabled={!selectedTopic || subtopics.length === 0}
                >
                  <SelectTrigger id="subtopic">
                    <SelectValue placeholder={selectedTopic ? (subtopics.length > 0 ? "Select a subtopic" : "No subtopics available") : "Select a topic first"} />
                  </SelectTrigger>
                  <SelectContent>
                    {subtopics.map((subtopic) => (
                      <SelectItem key={subtopic.id} value={subtopic.id.toString()}>
                        {subtopic.subTopicName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="image">Featured Image</Label>
                <div className="grid w-full items-center gap-1.5">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="cursor-pointer"
                  />
                  {imagePreview && (
                    <div className="mt-2 relative rounded-md overflow-hidden border border-border aspect-video">
                      <img 
                        src={imagePreview} 
                        alt="Blog preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Recommended size: 1200x630px
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-border">
            <CardHeader>
              <CardTitle>Publishing Information</CardTitle>
              <CardDescription>Information about publication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Author</p>
                <p className="text-sm text-muted-foreground">Admin User</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Approver</p>
                <p className="text-sm text-muted-foreground">Admin User</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Creation Date</p>
                <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}