"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Pagination } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/toast-context";
import { 
  IconPlus, 
  IconEdit, 
  IconTrash, 
  IconDotsVertical, 
  IconCalendarEvent,
  IconPhoto,
  IconEye,
  IconUpload
} from "@tabler/icons-react";

// Define types for our event data
interface EventImage {
  image: string;
  text: string;
}

interface EventData {
  event_name: string;
  image: string;
  short_desc: string;
  date: string;
  venue: string;
  full_desc?: string;
  images_with_text?: EventImage[];
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [eventDialogOpen, setEventDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<EventData | null>(null);
  const { setSuccessMsg, setErrorMsg, setInfoMsg } = useToast();

  // Form state
  const [eventForm, setEventForm] = useState({
    eventName: "",
    shortDesc: "",
    date: "",
    venue: "",
    fullDesc: ""
  });

  // File inputs
  const [titleImage, setTitleImage] = useState<File | null>(null);
  const [titleImagePreview, setTitleImagePreview] = useState<string | null>(null);
  const [eventImages, setEventImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [imageCaptions, setImageCaptions] = useState<string[]>([]);

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, [currentPage]);

  // Fetch events implementation
  const fetchEvents = async () => {
    setLoading(true);
    try {
      // Real API call according to documentation
      const response = await fetch(`/api/v1/read_events?page=${currentPage}&item_per_page=10`);
      const data = await response.json();
      
      if (data.success) {
        setEvents(data.data.items);
        setTotalPages(data.data.total_pages);
      } else {
        setErrorMsg(data.message || "Failed to fetch events");
      }
      setLoading(false);
    } catch (error) {
      setErrorMsg("Failed to fetch events. Please try again.");
      setLoading(false);
    }
  };

  // Handle title image change
  const handleTitleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setTitleImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setTitleImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle event images change
  const handleEventImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setEventImages(prev => [...prev, ...filesArray]);
      
      // Create previews
      const newPreviewUrls: string[] = [];
      const newCaptions = [...imageCaptions];
      
      filesArray.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          newPreviewUrls.push(reader.result as string);
          if (newPreviewUrls.length === filesArray.length) {
            setImagePreviewUrls(prev => [...prev, ...newPreviewUrls]);
            
            // Add empty captions for new images
            newCaptions.push(...Array(filesArray.length).fill(""));
            setImageCaptions(newCaptions);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Handle removing an image
  const removeImage = (index: number) => {
    const newImages = [...eventImages];
    const newPreviews = [...imagePreviewUrls];
    const newCaptions = [...imageCaptions];
    
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    newCaptions.splice(index, 1);
    
    setEventImages(newImages);
    setImagePreviewUrls(newPreviews);
    setImageCaptions(newCaptions);
  };

  // Handle caption change
  const handleCaptionChange = (index: number, value: string) => {
    const newCaptions = [...imageCaptions];
    newCaptions[index] = value;
    setImageCaptions(newCaptions);
  };

  // Reset form
  const resetForm = () => {
    setEventForm({
      eventName: "",
      shortDesc: "",
      date: "",
      venue: "",
      fullDesc: ""
    });
    setTitleImage(null);
    setTitleImagePreview(null);
    setEventImages([]);
    setImagePreviewUrls([]);
    setImageCaptions([]);
  };

  // Handle creating/updating an event
  const saveEvent = async () => {
    try {
      // Validation
      if (!eventForm.eventName || !eventForm.shortDesc || !eventForm.date || !eventForm.venue) {
        setErrorMsg("Please fill in all required fields.");
        return;
      }

      if (!titleImage && !isEditing) {
        setErrorMsg("Please upload a title image.");
        return;
      }

      // Prepare form data according to API documentation
      const formData = new FormData();
      
      // Prepare event info
      const eventInfo = {
        event_name: eventForm.eventName,
        short_desc: eventForm.shortDesc,
        date: eventForm.date,
        venue: eventForm.venue,
        full_desc: eventForm.fullDesc
      };
      
      formData.append('info', JSON.stringify(eventInfo));
      
      // Add title image
      if (titleImage) {
        formData.append('title_image', titleImage);
      }
      
      // Add event images and captions
      eventImages.forEach((img) => {
        formData.append('images', img);
      });
      
      imageCaptions.forEach((caption) => {
        formData.append('captions', caption);
      });
      
      // Determine endpoint based on if we're editing
      const endpoint = isEditing ? '/api/v1/update_event' : '/api/v1/save_event';
      
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSuccessMsg(isEditing ? "Event updated successfully" : "Event created successfully");
        setEventDialogOpen(false);
        fetchEvents(); // Refresh the events list
        resetForm();
      } else {
        setErrorMsg(data.message || "Failed to save event");
      }
    } catch (error) {
      setErrorMsg("An unexpected error occurred. Please try again.");
    }
  };

  // Delete an event
  const deleteEvent = async (eventName: string) => {
    try {
      // API call to delete event according to documentation
      const response = await fetch(`/api/v1/delete_event?event_name=${eventName}`, {
        method: 'POST',
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSuccessMsg("Event deleted successfully");
        fetchEvents(); // Refresh events list
      } else {
        setErrorMsg(data.message || "Failed to delete event");
      }
    } catch (error) {
      setErrorMsg("An unexpected error occurred while deleting the event.");
    }
  };

  // View event details
  const viewEvent = async (eventName: string) => {
    try {
      // Call the API to get detailed event data
      const response = await fetch(`/api/v1/read_event?event_name=${eventName}`);
      const data = await response.json();
      
      if (data.success) {
        setCurrentEvent(data.data);
        setViewDialogOpen(true);
      } else {
        setErrorMsg(data.message || "Failed to fetch event details");
      }
    } catch (error) {
      setErrorMsg("An unexpected error occurred while fetching event details.");
    }
  };

  // Edit event function
  const editEvent = async (eventName: string) => {
    try {
      // Fetch the event details first
      const response = await fetch(`/api/v1/read_event?event_name=${eventName}`);
      const data = await response.json();
      
      if (data.success) {
        const eventData = data.data;
        
        // Set form state
        setEventForm({
          eventName: eventData.event_name,
          shortDesc: eventData.short_desc,
          date: eventData.date,
          venue: eventData.venue,
          fullDesc: eventData.full_desc || "",
        });
        
        // Set image preview if available
        if (eventData.image) {
          setTitleImagePreview(eventData.image);
        }
        
        // Set images and captions if available
        if (eventData.images_with_text && eventData.images_with_text.length > 0) {
          const previews = eventData.images_with_text.map((item: EventImage) => item.image);
          const captions = eventData.images_with_text.map((item: EventImage) => item.text);
          
          setImagePreviewUrls(previews);
          setImageCaptions(captions);
        }
        
        // Set editing mode
        setIsEditing(true);
        setEventDialogOpen(true);
      } else {
        setErrorMsg(data.message || "Failed to fetch event for editing");
      }
    } catch (error) {
      setErrorMsg("An unexpected error occurred while preparing for edit.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Events</h1>
          <p className="text-muted-foreground">Manage club events and activities</p>
        </div>
        <Button onClick={() => {
          resetForm();
          setIsEditing(false);
          setEventDialogOpen(true);
        }} className="gap-2">
          <IconPlus className="h-4 w-4" />
          Add Event
        </Button>
      </div>
      
      <Separator />
      
      <Card className="border border-border">
        <CardHeader>
          <CardTitle>All Events</CardTitle>
          <CardDescription>Browse and manage all events created for the club.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {Array(3).fill(0).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-md" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))}
            </div>
          ) : events.length === 0 ? (
            <div className="py-12 text-center">
              <IconCalendarEvent className="mx-auto h-12 w-12 text-muted-foreground/60" />
              <h3 className="mt-4 text-lg font-medium">No events found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Get started by creating your first event.
              </p>
              <Button onClick={() => {
                resetForm();
                setIsEditing(false);
                setEventDialogOpen(true);
              }} className="mt-6">Create Event</Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Event Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Venue</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map((event) => (
                    <TableRow key={event.event_name}>
                      <TableCell>
                        <div className="h-10 w-16 bg-muted rounded overflow-hidden">
                          {event.image ? (
                            <img 
                              src={event.image} 
                              alt={event.event_name} 
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <IconPhoto className="h-full w-full p-2 text-muted-foreground" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{event.event_name}</TableCell>
                      <TableCell>{event.date}</TableCell>
                      <TableCell>{event.venue}</TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {event.short_desc}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <IconDotsVertical className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => viewEvent(event.event_name)}>
                              <IconEye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => editEvent(event.event_name)}>
                              <IconEdit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => {
                                if (window.confirm(`Are you sure you want to delete the event "${event.event_name}"?`)) {
                                  deleteEvent(event.event_name);
                                }
                              }}
                              className="text-red-600"
                            >
                              <IconTrash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {totalPages > 1 && (
                <div className="flex justify-center mt-6">
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                      disabled={currentPage === 0}
                    >
                      Previous
                    </Button>
                    <span className="mx-4 flex items-center text-sm">
                      Page {currentPage + 1} of {totalPages}
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                      disabled={currentPage === totalPages - 1}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Create/Edit Event Dialog */}
      <Dialog open={eventDialogOpen} onOpenChange={setEventDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Event" : "Create New Event"}
            </DialogTitle>
            <DialogDescription>
              {isEditing 
                ? "Update the details for this event." 
                : "Add details about the event. All fields marked with * are required."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="eventName">
                  Event Name *
                </Label>
                <Input 
                  id="eventName"
                  value={eventForm.eventName}
                  onChange={(e) => setEventForm({...eventForm, eventName: e.target.value})}
                  placeholder="e.g., bit2console-2024"
                  disabled={isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">
                  Date *
                </Label>
                <Input 
                  id="date"
                  value={eventForm.date}
                  onChange={(e) => setEventForm({...eventForm, date: e.target.value})}
                  placeholder="dd/MM/yyyy"
                />
                <p className="text-xs text-muted-foreground">Format: dd/MM/yyyy</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="venue">
                Venue *
              </Label>
              <Input 
                id="venue"
                value={eventForm.venue}
                onChange={(e) => setEventForm({...eventForm, venue: e.target.value})}
                placeholder="e.g., Academic Building"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="shortDesc">
                Short Description *
              </Label>
              <Textarea 
                id="shortDesc"
                value={eventForm.shortDesc}
                onChange={(e) => setEventForm({...eventForm, shortDesc: e.target.value})}
                placeholder="Brief description of the event"
                rows={2}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fullDesc">
                Full Description
              </Label>
              <Textarea 
                id="fullDesc"
                value={eventForm.fullDesc}
                onChange={(e) => setEventForm({...eventForm, fullDesc: e.target.value})}
                placeholder="Detailed description of the event"
                rows={5}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Title Image {!isEditing && '*'}</Label>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleTitleImageChange} 
                    className="cursor-pointer"
                  />
                </div>
                {titleImagePreview && (
                  <div className="h-20 w-32 overflow-hidden rounded-md border">
                    <img 
                      src={titleImagePreview} 
                      alt="Preview" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Event Images</Label>
                <div>
                  <Input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleEventImagesChange} 
                    multiple 
                    className="hidden" 
                    id="eventImagesInput"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => document.getElementById('eventImagesInput')?.click()}
                    className="gap-2"
                  >
                    <IconUpload className="h-4 w-4" />
                    Upload Images
                  </Button>
                </div>
              </div>
              
              {imagePreviewUrls.length > 0 && (
                <div className="grid grid-cols-1 gap-4 mt-4">
                  {imagePreviewUrls.map((url, index) => (
                    <div key={index} className="flex gap-4 border rounded-md p-3">
                      <div className="h-20 w-32 overflow-hidden rounded-md flex-shrink-0">
                        <img src={url} alt="Preview" className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <Label>Caption</Label>
                        <Textarea 
                          value={imageCaptions[index] || ''} 
                          onChange={(e) => handleCaptionChange(index, e.target.value)}
                          placeholder="Caption for this image"
                          rows={2}
                          className="text-sm"
                        />
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => removeImage(index)}
                        className="h-8 w-8 flex-shrink-0"
                      >
                        <IconTrash className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEventDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveEvent}>
              {isEditing ? "Update Event" : "Create Event"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* View Event Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {currentEvent?.event_name}
            </DialogTitle>
            <DialogDescription>
              Event Details
            </DialogDescription>
          </DialogHeader>
          {currentEvent && (
            <div className="space-y-6 py-4">
              {currentEvent.image && (
                <div className="rounded-md overflow-hidden max-h-[400px]">
                  <img 
                    src={currentEvent.image} 
                    alt={currentEvent.event_name} 
                    className="w-full object-cover"
                  />
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium">Date</div>
                  <div>{currentEvent.date}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Venue</div>
                  <div>{currentEvent.venue}</div>
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium">Description</div>
                <div className="mt-1">{currentEvent.short_desc}</div>
              </div>
              
              {currentEvent.full_desc && (
                <div>
                  <div className="text-sm font-medium">Full Description</div>
                  <div className="mt-1 whitespace-pre-wrap">{currentEvent.full_desc}</div>
                </div>
              )}
              
              {currentEvent.images_with_text && currentEvent.images_with_text.length > 0 && (
                <div>
                  <div className="text-sm font-medium mb-4">Event Photos</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentEvent.images_with_text.map((item: EventImage, index: number) => (
                      <div key={index} className="space-y-2">
                        <div className="rounded-md overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={`Event photo ${index + 1}`} 
                            className="w-full h-40 object-cover"
                          />
                        </div>
                        {item.text && (
                          <p className="text-sm">{item.text}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
              Close
            </Button>
            {currentEvent && (
              <Button onClick={() => {
                setViewDialogOpen(false);
                editEvent(currentEvent.event_name);
              }}>
                Edit Event
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 