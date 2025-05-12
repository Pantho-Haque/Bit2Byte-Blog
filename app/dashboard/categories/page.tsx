"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/toast-context";
import { IconPlus, IconEdit, IconTrash, IconDotsVertical } from "@tabler/icons-react";

export default function CategoriesPage() {
  // State for topics and subtopics
  const [topics, setTopics] = useState<any[]>([]);
  const [subtopics, setSubtopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // State for dialogs
  const [topicDialogOpen, setTopicDialogOpen] = useState(false);
  const [subtopicDialogOpen, setSubtopicDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // State for form inputs
  const [topicForm, setTopicForm] = useState({
    id: 0,
    topicName: "",
    noOfSubTopics: 0,
    serial: 0
  });
  
  const [subtopicForm, setSubtopicForm] = useState({
    id: 0,
    topicId: 0,
    subTopicName: "",
    serial: 0
  });

  // Fetch topics and subtopics when component mounts
  useEffect(() => {
    fetchTopics();
    fetchSubtopics();
  }, []);

  // Fetch topics (mock implementation)
  const fetchTopics = async () => {
    setLoading(true);
    try {
      // In a real implementation, this would be an API call
      // const response = await fetch('/api/v1/read_syllabus');
      
      // For demo, we'll use mock data
      setTimeout(() => {
        const mockTopics = [
          { id: 1, topicName: "C Programming", noOfSubTopics: 3, serial: 1 },
          { id: 2, topicName: "Web Development", noOfSubTopics: 3, serial: 2 },
          { id: 3, topicName: "Data Structures", noOfSubTopics: 3, serial: 3 },
          { id: 4, topicName: "Algorithms", noOfSubTopics: 3, serial: 4 },
        ];
        setTopics(mockTopics);
        setLoading(false);
      }, 500);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch topics. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  // Fetch subtopics (mock implementation)
  const fetchSubtopics = async () => {
    try {
      // In a real implementation, this would be an API call
      // const response = await fetch('/api/v1/read_subtopics');
      
      // For demo, we'll use mock data
      setTimeout(() => {
        const mockSubtopics = [
          { id: 101, topicId: 1, subTopicName: "Introduction to C", serial: 1 },
          { id: 102, topicId: 1, subTopicName: "Variables & Data Types", serial: 2 },
          { id: 103, topicId: 1, subTopicName: "Control Flow", serial: 3 },
          { id: 201, topicId: 2, subTopicName: "HTML Basics", serial: 1 },
          { id: 202, topicId: 2, subTopicName: "CSS Fundamentals", serial: 2 },
          { id: 203, topicId: 2, subTopicName: "JavaScript Essentials", serial: 3 },
          { id: 301, topicId: 3, subTopicName: "Arrays", serial: 1 },
          { id: 302, topicId: 3, subTopicName: "Linked Lists", serial: 2 },
          { id: 303, topicId: 3, subTopicName: "Trees", serial: 3 },
          { id: 401, topicId: 4, subTopicName: "Searching", serial: 1 },
          { id: 402, topicId: 4, subTopicName: "Sorting", serial: 2 },
          { id: 403, topicId: 4, subTopicName: "Graph Algorithms", serial: 3 },
        ];
        setSubtopics(mockSubtopics);
      }, 500);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch subtopics. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle saving a topic
  const saveTopic = async () => {
    try {
      if (!topicForm.topicName) {
        toast({
          title: "Error",
          description: "Topic name is required.",
          variant: "destructive",
        });
        return;
      }

      // In a real implementation, this would be an API call
      // const response = await fetch('/api/v1/save_topic', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(topicForm)
      // });
      
      // For demo, we'll simulate success
      if (isEditing) {
        // Update existing topic
        setTopics(topics.map(topic => 
          topic.id === topicForm.id ? { ...topicForm } : topic
        ));
        toast({
          title: "Success",
          description: "Topic updated successfully.",
        });
      } else {
        // Add new topic with a new ID
        const newId = Math.max(0, ...topics.map(t => t.id)) + 1;
        setTopics([...topics, { ...topicForm, id: newId }]);
        toast({
          title: "Success",
          description: "Topic added successfully.",
        });
      }
      
      // Reset form and close dialog
      setTopicForm({ id: 0, topicName: "", noOfSubTopics: 0, serial: 0 });
      setTopicDialogOpen(false);
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save topic. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle saving a subtopic
  const saveSubtopic = async () => {
    try {
      if (!subtopicForm.subTopicName || !subtopicForm.topicId) {
        toast({
          title: "Error",
          description: "Subtopic name and topic are required.",
          variant: "destructive",
        });
        return;
      }

      // In a real implementation, this would be an API call
      // const response = await fetch('/api/v1/save_sub_topic', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(subtopicForm)
      // });
      
      // For demo, we'll simulate success
      if (isEditing) {
        // Update existing subtopic
        setSubtopics(subtopics.map(subtopic => 
          subtopic.id === subtopicForm.id ? { ...subtopicForm } : subtopic
        ));
        toast({
          title: "Success",
          description: "Subtopic updated successfully.",
        });
      } else {
        // Add new subtopic with a new ID
        const newId = Math.max(0, ...subtopics.map(s => s.id)) + 1;
        setSubtopics([...subtopics, { ...subtopicForm, id: newId }]);
        
        // Update the topic's subtopic count
        setTopics(topics.map(topic => 
          topic.id === subtopicForm.topicId 
            ? { ...topic, noOfSubTopics: topic.noOfSubTopics + 1 } 
            : topic
        ));
        
        toast({
          title: "Success",
          description: "Subtopic added successfully.",
        });
      }
      
      // Reset form and close dialog
      setSubtopicForm({ id: 0, topicId: 0, subTopicName: "", serial: 0 });
      setSubtopicDialogOpen(false);
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save subtopic. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle deleting a topic
  const deleteTopic = async (id: number) => {
    try {
      // Check if topic has subtopics
      const hasSubtopics = subtopics.some(subtopic => subtopic.topicId === id);
      if (hasSubtopics) {
        toast({
          title: "Error",
          description: "Cannot delete topic with existing subtopics. Delete all subtopics first.",
          variant: "destructive",
        });
        return;
      }

      // In a real implementation, this would be an API call
      // const response = await fetch(`/api/v1/delete_topic?topic_id=${id}`, {
      //   method: 'POST'
      // });
      
      // For demo, we'll simulate success
      setTopics(topics.filter(topic => topic.id !== id));
      toast({
        title: "Success",
        description: "Topic deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete topic. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle deleting a subtopic
  const deleteSubtopic = async (id: number) => {
    try {
      // In a real implementation, this would be an API call
      // const response = await fetch(`/api/v1/delete_sub_topic?sub_topic_id=${id}`, {
      //   method: 'POST'
      // });
      
      // For demo, we'll simulate success
      const subtopicToDelete = subtopics.find(s => s.id === id);
      if (subtopicToDelete) {
        // Update the topic's subtopic count
        setTopics(topics.map(topic => 
          topic.id === subtopicToDelete.topicId 
            ? { ...topic, noOfSubTopics: Math.max(0, topic.noOfSubTopics - 1) } 
            : topic
        ));
        
        // Remove the subtopic
        setSubtopics(subtopics.filter(subtopic => subtopic.id !== id));
        
        toast({
          title: "Success",
          description: "Subtopic deleted successfully.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete subtopic. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Filter subtopics by topic ID
  const filterSubtopicsByTopic = (topicId: number) => {
    return subtopics.filter(subtopic => subtopic.topicId === topicId);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories Management</h1>
          <p className="text-muted-foreground">Manage topics and subtopics for blogs</p>
        </div>
      </div>
      
      <Separator />
      
      <Tabs defaultValue="topics" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="topics">Topics</TabsTrigger>
          <TabsTrigger value="subtopics">Subtopics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="topics">
          <Card className="border border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Topics</CardTitle>
                <CardDescription>Manage high-level blog categories</CardDescription>
              </div>
              <Dialog open={topicDialogOpen} onOpenChange={setTopicDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    onClick={() => {
                      setIsEditing(false);
                      setTopicForm({ id: 0, topicName: "", noOfSubTopics: 0, serial: topics.length + 1 });
                    }}
                  >
                    <IconPlus className="mr-2 h-4 w-4" />
                    Add Topic
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{isEditing ? "Edit Topic" : "Add New Topic"}</DialogTitle>
                    <DialogDescription>
                      {isEditing 
                        ? "Update the details of an existing topic" 
                        : "Create a new topic for organizing blogs"
                      }
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="topicName">Topic Name</Label>
                      <Input
                        id="topicName"
                        placeholder="e.g., Web Development"
                        value={topicForm.topicName}
                        onChange={(e) => setTopicForm({ ...topicForm, topicName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="topicSerial">Serial Number</Label>
                      <Input
                        id="topicSerial"
                        type="number"
                        placeholder="e.g., 1"
                        value={topicForm.serial || ""}
                        onChange={(e) => setTopicForm({ ...topicForm, serial: parseInt(e.target.value) || 0 })}
                      />
                      <p className="text-xs text-muted-foreground">
                        Used for ordering topics in the syllabus
                      </p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setTopicDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={saveTopic}>
                      {isEditing ? "Update Topic" : "Add Topic"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-20">Serial</TableHead>
                      <TableHead>Topic Name</TableHead>
                      <TableHead className="text-center">Subtopics</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center">
                          Loading topics...
                        </TableCell>
                      </TableRow>
                    ) : topics.length > 0 ? (
                      topics.sort((a, b) => a.serial - b.serial).map((topic) => (
                        <TableRow key={topic.id}>
                          <TableCell className="font-medium">{topic.serial}</TableCell>
                          <TableCell>{topic.topicName}</TableCell>
                          <TableCell className="text-center">{topic.noOfSubTopics}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="rounded-full p-0 h-8 w-8">
                                  <IconDotsVertical className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => {
                                  setIsEditing(true);
                                  setTopicForm({ ...topic });
                                  setTopicDialogOpen(true);
                                }}>
                                  <IconEdit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => deleteTopic(topic.id)}
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
                        <TableCell colSpan={4} className="h-24 text-center">
                          No topics found. Add your first topic.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="subtopics">
          <Card className="border border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Subtopics</CardTitle>
                <CardDescription>Manage subtopics within main categories</CardDescription>
              </div>
              <Dialog open={subtopicDialogOpen} onOpenChange={setSubtopicDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    onClick={() => {
                      setIsEditing(false);
                      setSubtopicForm({ id: 0, topicId: 0, subTopicName: "", serial: 1 });
                    }}
                    disabled={topics.length === 0}
                  >
                    <IconPlus className="mr-2 h-4 w-4" />
                    Add Subtopic
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{isEditing ? "Edit Subtopic" : "Add New Subtopic"}</DialogTitle>
                    <DialogDescription>
                      {isEditing 
                        ? "Update the details of an existing subtopic" 
                        : "Create a new subtopic within a main topic"
                      }
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="topicSelect">Parent Topic</Label>
                      <select
                        id="topicSelect"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={subtopicForm.topicId || ""}
                        onChange={(e) => setSubtopicForm({ 
                          ...subtopicForm, 
                          topicId: parseInt(e.target.value) || 0,
                          serial: filterSubtopicsByTopic(parseInt(e.target.value) || 0).length + 1
                        })}
                      >
                        <option value="">Select a topic</option>
                        {topics.map((topic) => (
                          <option key={topic.id} value={topic.id}>
                            {topic.topicName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subtopicName">Subtopic Name</Label>
                      <Input
                        id="subtopicName"
                        placeholder="e.g., JavaScript Basics"
                        value={subtopicForm.subTopicName}
                        onChange={(e) => setSubtopicForm({ ...subtopicForm, subTopicName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subtopicSerial">Serial Number</Label>
                      <Input
                        id="subtopicSerial"
                        type="number"
                        placeholder="e.g., 1"
                        value={subtopicForm.serial || ""}
                        onChange={(e) => setSubtopicForm({ ...subtopicForm, serial: parseInt(e.target.value) || 0 })}
                      />
                      <p className="text-xs text-muted-foreground">
                        Used for ordering subtopics within a topic
                      </p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setSubtopicDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={saveSubtopic}>
                      {isEditing ? "Update Subtopic" : "Add Subtopic"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Topic</TableHead>
                      <TableHead>Subtopic Name</TableHead>
                      <TableHead className="w-20">Serial</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center">
                          Loading subtopics...
                        </TableCell>
                      </TableRow>
                    ) : subtopics.length > 0 ? (
                      subtopics.map((subtopic) => {
                        const parentTopic = topics.find(t => t.id === subtopic.topicId);
                        return (
                          <TableRow key={subtopic.id}>
                            <TableCell>{parentTopic?.topicName || 'Unknown'}</TableCell>
                            <TableCell>{subtopic.subTopicName}</TableCell>
                            <TableCell>{subtopic.serial}</TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="rounded-full p-0 h-8 w-8">
                                    <IconDotsVertical className="h-4 w-4" />
                                    <span className="sr-only">Open menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => {
                                    setIsEditing(true);
                                    setSubtopicForm({ ...subtopic });
                                    setSubtopicDialogOpen(true);
                                  }}>
                                    <IconEdit className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => deleteSubtopic(subtopic.id)}
                                    className="text-red-600 dark:text-red-400"
                                  >
                                    <IconTrash className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center">
                          No subtopics found. Add your first subtopic.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}