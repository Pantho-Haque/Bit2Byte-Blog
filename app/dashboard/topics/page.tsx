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
import { getSyllabus } from "@/lib/api/getMethods";
import { 
  saveTopic as saveTopicAPI, 
  updateTopic, 
  deleteTopic, 
  saveSubtopic as saveSubtopicAPI, 
  updateSubtopic, 
  deleteSubtopic 
} from "@/lib/api/postMethods";

export default function CategoriesPage() {
  // State for topics and subtopics
  const [topics, setTopics] = useState<any[]>([]);
  const [subtopics, setSubtopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToast, setSuccessMsg, setErrorMsg } = useToast();

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
  }, []);

  // Fetch topics (real API call)
  const fetchTopics = async () => {
    setLoading(true);
    try {
      const data = await getSyllabus();
      if (data && data.data) {
        setTopics(data.data.map((item: any) => ({
          id: item.id,
          topicName: item.topic_name,
          noOfSubTopics: item.no_of_sub_topics,
          serial: item.id // Using id as serial if not provided
        })));
        
        const allSubtopics = data.data.flatMap((item: any) =>
          item.sub_topics ? item.sub_topics.map((sub: any) => ({
            id: sub.id,
            topicId: item.id,
            subTopicName: sub.sub_topic_name,
            serial: sub.id // Using id as serial if not provided
          })) : []
        );
        setSubtopics(allSubtopics);
      }
      setLoading(false);
    } catch (error) {
      setErrorMsg("Failed to fetch topics. Please try again.");
      setLoading(false);
    }
  };

  // Handle saving a topic
  const saveTopic = async () => {
    try {
      if (!topicForm.topicName) {
        setErrorMsg("Topic name is required.");
        return;
      }
      
      const topicData = {
        id: topicForm.id,
        topic_name: topicForm.topicName,
        no_of_sub_topics: topicForm.noOfSubTopics,
        serial: topicForm.serial
      };
      
      let data;
      if (isEditing) {
        data = await updateTopic(topicData);
      } else {
        data = await saveTopicAPI(topicData);
      }
      
      if (!data.success) throw new Error(data.message || 'Failed to save topic');
      
      setSuccessMsg(isEditing ? "Topic updated successfully." : "Topic added successfully.");
      
      fetchTopics();
      setTopicForm({ id: 0, topicName: "", noOfSubTopics: 0, serial: 0 });
      setTopicDialogOpen(false);
      setIsEditing(false);
    } catch (error: any) {
      setErrorMsg(error.message || "Failed to save topic. Please try again.");
    }
  };

  // Handle saving a subtopic
  const saveSubtopic = async () => {
    try {
      if (!subtopicForm.subTopicName || !subtopicForm.topicId) {
        setErrorMsg("Subtopic name and topic are required.");
        return;
      }
      
      const subtopicData = {
        id: subtopicForm.id,
        sub_topic_name: subtopicForm.subTopicName,
        topic_id: subtopicForm.topicId,
        serial: subtopicForm.serial
      };
      
      let data;
      if (isEditing) {
        data = await updateSubtopic(subtopicData);
      } else {
        data = await saveSubtopicAPI(subtopicData);
      }
      
      if (!data.success) throw new Error(data.message || 'Failed to save subtopic');
      
      setSuccessMsg(isEditing ? "Subtopic updated successfully." : "Subtopic added successfully.");
      
      fetchTopics();
      setSubtopicForm({ id: 0, topicId: 0, subTopicName: "", serial: 0 });
      setSubtopicDialogOpen(false);
      setIsEditing(false);
    } catch (error: any) {
      setErrorMsg(error.message || "Failed to save subtopic. Please try again.");
    }
  };

  // Handle deleting a topic
  const handleDeleteTopic = async (id: number) => {
    try {
      const data = await deleteTopic(id);
      if (!data.success) throw new Error(data.message || 'Failed to delete topic');
      
      setSuccessMsg("Topic deleted successfully.");
      
      fetchTopics();
    } catch (error: any) {
      setErrorMsg(error.message || "Failed to delete topic. Please try again.");
    }
  };

  // Handle deleting a subtopic
  const handleDeleteSubtopic = async (id: number) => {
    try {
      const data = await deleteSubtopic(id);
      if (!data.success) throw new Error(data.message || 'Failed to delete subtopic');
      
      setSuccessMsg("Subtopic deleted successfully.");
      
      fetchTopics();
    } catch (error: any) {
      setErrorMsg(error.message || "Failed to delete subtopic. Please try again.");
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
                                  onClick={() => handleDeleteTopic(topic.id)}
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
                                    onClick={() => handleDeleteSubtopic(subtopic.id)}
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