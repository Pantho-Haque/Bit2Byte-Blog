"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
import { IconPlus, IconEdit, IconTrash, IconDotsVertical, IconLink, IconExternalLink } from "@tabler/icons-react";
import { Skeleton } from "@/components/ui/skeleton";

interface LinkData {
  title: string;
  url: string;
}

export default function LinksPage() {
  const [links, setLinks] = useState<LinkData[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [linkForm, setLinkForm] = useState<LinkData>({ title: "", url: "" });
  const { setSuccessMsg, setErrorMsg } = useToast();
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [viewingLink, setViewingLink] = useState<LinkData | null>(null);
  const [viewLoading, setViewLoading] = useState(false);

  // Fetch links on component mount
  useEffect(() => {
    const fetchLinks = async () => {
      setLoading(true);
      
      // Note: API doesn't have a dedicated endpoint to fetch all links
      // We'll show mock data for now
      // In a real implementation, you'd need to create a backend endpoint to list all links
      try {
        // Mock data for demonstration
        const mockLinks = [
          { title: "registration-form", url: "https://forms.google.com/registration" },
          { title: "club-drive", url: "https://drive.google.com/bit2byte-club" },
          { title: "event-photos", url: "https://photos.google.com/bit2byte-events" },
        ];
        
        setLinks(mockLinks);
        
        // Uncomment and adapt when backend supports fetching all links
        // const response = await fetch(`/api/v1/list_links`);
        // const data = await response.json();
        // if (data.success) {
        //   setLinks(data.data || []);
        // } else {
        //   setErrorMsg(data.message || "Failed to fetch links");
        // }
      } catch (error) {
        setErrorMsg("Error connecting to the server");
        console.error("Error fetching links:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLinks();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (linkForm.title.trim() === "" || linkForm.url.trim() === "") {
      setErrorMsg("Please fill in all required fields");
      return;
    }

    setLoading(true);
    
    try {
      if (isEditing) {
        // Call update API endpoint
        const response = await fetch("/api/v1/update_link", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(linkForm)
        });
        
        const data = await response.json();
        
        if (data.success) {
          // Update the link in the local state
          setLinks(links.map(link => 
            link.title === linkForm.title ? linkForm : link
          ));
          
          setSuccessMsg(`Link "${linkForm.title}" updated successfully`);
        } else {
          setErrorMsg(data.message || "Failed to update link");
        }
      } else {
        // Check if title already exists
        if (links.some(link => link.title === linkForm.title)) {
          setErrorMsg("A link with this title already exists");
          setLoading(false);
          return;
        }
        
        // Call save API endpoint
        const response = await fetch("/api/v1/save_link", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(linkForm)
        });
        
        const data = await response.json();
        
        if (data.success) {
          // Add the new link to the local state
          setLinks([...links, linkForm]);
          
          setSuccessMsg(`Link "${linkForm.title}" created successfully`);
        } else {
          setErrorMsg(data.message || "Failed to save link");
        }
      }
    } catch (error) {
      setErrorMsg("Failed to save link");
      console.error("Error saving link:", error);
    } finally {
      setLoading(false);
      setDialogOpen(false);
      setLinkForm({ title: "", url: "" });
      setIsEditing(false);
    }
  };

  const handleEditLink = (title: string) => {
    const linkToEdit = links.find(link => link.title === title);
    if (linkToEdit) {
      setLinkForm(linkToEdit);
      setIsEditing(true);
      setDialogOpen(true);
    }
  };

  const handleViewLink = async (title: string) => {
    setViewLoading(true);
    setViewingLink(null);
    
    try {
      const response = await fetch(`/api/v1/read_link?title=${title}`);
      const data = await response.json();
      
      if (data.success) {
        setViewingLink(data.data);
        setViewDialogOpen(true);
      } else {
        setErrorMsg(data.message || "Failed to fetch link details");
      }
    } catch (error) {
      setErrorMsg("Error fetching link details");
      console.error("Error fetching link details:", error);
    } finally {
      setViewLoading(false);
    }
  };

  const handleDeleteLink = async (title: string) => {
    if (!window.confirm(`Are you sure you want to delete the link "${title}"?`)) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Call delete API endpoint
      const response = await fetch(`/api/v1/delete_link?title=${title}`, {
        method: "POST"
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Remove the link from the local state
        setLinks(links.filter(link => link.title !== title));
        
        setSuccessMsg(`Link "${title}" deleted successfully`);
      } else {
        setErrorMsg(data.message || "Failed to delete link");
      }
    } catch (error) {
      setErrorMsg("Failed to delete link");
      console.error("Error deleting link:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setLinkForm({ title: "", url: "" });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Links</h1>
          <p className="text-muted-foreground">Manage redirects and important links for your website</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => {
                resetForm();
                setDialogOpen(true);
              }}
            >
              <IconPlus className="mr-2 h-4 w-4" />
              Add Link
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Link" : "Add New Link"}</DialogTitle>
              <DialogDescription>
                {isEditing 
                  ? "Update the title and URL for this link." 
                  : "Add a new redirectable link to your website."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Link Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., registration-form"
                    value={linkForm.title}
                    onChange={(e) => setLinkForm({ ...linkForm, title: e.target.value })}
                    disabled={isEditing}
                    required
                  />
                  {isEditing && (
                    <p className="text-xs text-muted-foreground">
                      The title cannot be changed once created.
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="url">URL</Label>
                  <Input
                    id="url"
                    placeholder="https://example.com/your-link"
                    value={linkForm.url}
                    onChange={(e) => setLinkForm({ ...linkForm, url: e.target.value })}
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => {
                    resetForm();
                    setDialogOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {isEditing ? "Update Link" : "Save Link"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <Separator />
      
      <Card>
        <CardHeader>
          <CardTitle>All Links</CardTitle>
          <CardDescription>
            Manage all your website&apos;s redirectable links
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              {Array(3).fill(null).map((_, index) => (
                <div key={`skeleton-${index}`} className="flex items-center space-x-4 py-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Title</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {links.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="h-24 text-center">
                        No links found. Create your first link.
                      </TableCell>
                    </TableRow>
                  ) : (
                    links.map((link) => (
                      <TableRow key={link.title}>
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-2">
                            <IconLink className="h-4 w-4 text-muted-foreground" />
                            <span>{link.title}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <a 
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center hover:underline text-blue-600 dark:text-blue-400"
                          >
                            {link.url}
                            <IconExternalLink className="ml-1 h-3 w-3" />
                          </a>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <IconDotsVertical className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewLink(link.title)}>
                                <IconExternalLink className="mr-2 h-4 w-4" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEditLink(link.title)}>
                                <IconEdit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDeleteLink(link.title)}
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
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* View Link Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Link Details</DialogTitle>
            <DialogDescription>
              View details of the selected link
            </DialogDescription>
          </DialogHeader>
          
          {viewLoading ? (
            <div className="py-6 space-y-4">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[300px]" />
            </div>
          ) : viewingLink ? (
            <div className="py-6 space-y-4">
              <div>
                <Label className="text-muted-foreground">Title</Label>
                <p className="font-medium">{viewingLink.title}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">URL</Label>
                <p className="font-medium break-all">
                  <a 
                    href={viewingLink.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                  >
                    {viewingLink.url}
                    <IconExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </p>
              </div>
            </div>
          ) : (
            <div className="py-6 text-center text-muted-foreground">
              No link data available
            </div>
          )}
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setViewDialogOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 