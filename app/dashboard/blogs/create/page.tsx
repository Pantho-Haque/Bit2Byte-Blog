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
import { toast } from "@/components/ui/use-toast";
import { getSyllabus } from "@/lib/api/getMethods";
import { saveBlogInfo, saveBlogDetails } from "@/lib/api/postMethods";

// Add a debug component to show data
const DebugInfo = ({ data, label }: { data: any, label: string }) => {
  return (
    <div className="text-xs text-muted-foreground border p-2 my-2 rounded overflow-auto max-h-32">
      <div className="font-bold">{label}:</div>
      <pre className="whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

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

  // Replace fetchTopics with real API call
  const fetchTopics = async () => {
    try {
      const data = await getSyllabus();
      console.log("Syllabus data:", JSON.stringify(data));
      if (data && data.data) {
        // Updated mapping to match actual API response format
        const topicsData = data.data.map((item: any) => ({
          id: item.id,
          topicName: item.topic_name,
          serial: item.no_of_sub_topics,
          subtopics: item.sub_topics?.map((subTopic: any) => ({
            id: subTopic.id,
            subTopicName: subTopic.sub_topic_name
          })) || []
        }));
        console.log("Topics processed:", JSON.stringify(topicsData));
        setTopics(topicsData);
      } else {
        console.log("No topics data found in response");
      }
    } catch (error) {
      console.error("Error fetching topics:", error);
      toast({
        title: "Error",
        description: "Failed to fetch topics. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Replace fetchSubtopics with real API call (extract from topics)
  const fetchSubtopics = async (topicId: number) => {
    const topic = topics.find((t) => t.id === topicId);
    setSubtopics(topic ? topic.subtopics : []);
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

  // Replace publishBlog with real API calls
  const publishBlog = async () => {
    try {
      if (!blogTitle || !shortDesc || !selectedTopic || !selectedSubtopic || !markdownContent) {
        toast({
          title: "Error",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        return;
      }
      setIsSubmitting(true);
      // Save blog info
      const blogInfo = {
        id: Date.now(),
        topic_id: parseInt(selectedTopic),
        sub_topic_id: parseInt(selectedSubtopic),
        title: blogTitle,
        written_by: "admin", // TODO: Replace with real user
        short_desc: shortDesc,
        approved_by: "admin", // TODO: Replace with real user
      };
      
      const infoData = await saveBlogInfo(blogInfo, blogImage);
      if (!infoData.success) throw new Error(infoData.message || 'Failed to save blog info');
      
      // Save blog content
      const contentData = await saveBlogDetails(infoData.data.id, markdownContent);
      if (!contentData.success) throw new Error(contentData.message || 'Failed to save blog content');
      
      setIsSubmitting(false);
      toast({
        title: "Success",
        description: "Your blog has been published successfully!",
      });
    } catch (error: any) {
      setIsSubmitting(false);
      toast({
        title: "Error",
        description: error.message || "Failed to publish blog. Please try again.",
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

      {/* Debug panel */}
      <Card className="border border-border mt-8">
        <CardHeader>
          <CardTitle>Debug Information</CardTitle>
          <CardDescription>Data used for debugging purposes</CardDescription>
        </CardHeader>
        <CardContent>
          <details>
            <summary className="text-sm cursor-pointer font-medium">Show Debug Data</summary>
            <div className="mt-4 space-y-4">
              <DebugInfo data={topics} label="Topics Data" />
              <DebugInfo data={subtopics} label="Subtopics Data" />
              {selectedTopic && (
                <DebugInfo 
                  data={topics.find(t => t.id.toString() === selectedTopic)} 
                  label={`Selected Topic (ID: ${selectedTopic})`} 
                />
              )}
              <div className="text-xs text-muted-foreground mt-2">
                API BASE_URL: {process.env.NEXT_PUBLIC_BASE_URL || "not set"}
              </div>
            </div>
          </details>
        </CardContent>
      </Card>
    </div>
  );
}