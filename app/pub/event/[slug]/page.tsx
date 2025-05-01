'use client';

import { useState, useEffect } from 'react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, MapPin, Share2, BookmarkPlus, BookmarkCheck, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface EventImage {
  image: string;
  text: string;
}

interface Event {
  event_name: string;
  image: string;
  short_desc: string;
  date: string;
  venue: string;
  images_with_text: EventImage[];
}

interface EventResponse {
  data: Event;
  message: string;
  success: boolean;
}

export default function EventPage({ params }: { params: { slug: string } }) {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/v1/read_event?event_name=${params.slug}`);
        const data: EventResponse = await response.json();
        
        if (data.success) {
          setEvent(data.data);
          // Check if event is bookmarked (from localStorage)
          const bookmarkedEvents = JSON.parse(localStorage.getItem('bookmarkedEvents') || '[]');
          setBookmarked(bookmarkedEvents.includes(data.data.event_name));
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('Failed to fetch event details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [params.slug]);

  const toggleBookmark = () => {
    const bookmarkedEvents = JSON.parse(localStorage.getItem('bookmarkedEvents') || '[]');
    
    if (bookmarked) {
      // Remove from bookmarks
      const updatedBookmarks = bookmarkedEvents.filter((name: string) => name !== event?.event_name);
      localStorage.setItem('bookmarkedEvents', JSON.stringify(updatedBookmarks));
    } else {
      // Add to bookmarks
      bookmarkedEvents.push(event?.event_name);
      localStorage.setItem('bookmarkedEvents', JSON.stringify(bookmarkedEvents));
    }
    
    setBookmarked(!bookmarked);
  };

  const shareEvent = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event?.event_name || 'Event',
          text: event?.short_desc || 'Check out this event!',
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Format the date
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    const [day, month, year] = dateStr.split('/');
    const date = new Date(`${year}-${month}-${day}`);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  // Check if event is upcoming
  const isUpcoming = (dateStr?: string) => {
    if (!dateStr) return false;
    const [day, month, year] = dateStr.split('/');
    const eventDate = new Date(`${year}-${month}-${day}`);
    return eventDate > new Date();
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <MaxWidthWrapper>
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
            <div className="h-96 bg-muted rounded mb-8"></div>
            <div className="flex gap-2 mb-6">
              <div className="h-10 w-24 bg-muted rounded"></div>
              <div className="h-10 w-24 bg-muted rounded"></div>
            </div>
            <div className="h-4 bg-muted rounded w-full mb-2"></div>
            <div className="h-4 bg-muted rounded w-5/6 mb-2"></div>
            <div className="h-4 bg-muted rounded w-4/6 mb-6"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </MaxWidthWrapper>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <MaxWidthWrapper>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Error Loading Event</h2>
            <p className="text-muted-foreground mb-6">{error || 'Event not found'}</p>
            <Button asChild>
              <Link href="/pub/events">Back to Events</Link>
            </Button>
          </div>
        </MaxWidthWrapper>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16">
      {/* Hero section with event image */}
      <div className="w-full h-[40vh] sm:h-[50vh] relative bg-black">
        <Image
          src={event.image}
          alt={event.event_name}
          fill
          className="object-cover opacity-70"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <MaxWidthWrapper>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link 
                href="/pub/events" 
                className="inline-flex items-center text-sm mb-4 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-1" /> Back to events
              </Link>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
                {event.event_name}
              </h1>
              
              <div className="flex flex-wrap gap-3 mb-2">
                <span className="inline-flex items-center text-primary-foreground/90">
                  <Calendar className="h-4 w-4 mr-2" />
                  {formatDate(event.date)}
                </span>
                <span className="inline-flex items-center text-primary-foreground/90">
                  <MapPin className="h-4 w-4 mr-2" />
                  {event.venue}
                </span>
              </div>
              
              {isUpcoming(event.date) && (
                <div className="mt-4">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm">
                    Upcoming Event
                  </span>
                </div>
              )}
            </motion.div>
          </MaxWidthWrapper>
        </div>
      </div>

      <MaxWidthWrapper className="mt-8">
        <div className="flex flex-wrap sm:flex-nowrap gap-8">
          {/* Main content */}
          <div className="w-full sm:w-2/3">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">About the Event</h2>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={shareEvent}
                    title="Share event"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleBookmark}
                    title={bookmarked ? "Remove bookmark" : "Bookmark event"}
                    className={cn(
                      bookmarked && "text-primary border-primary hover:text-primary",
                    )}
                  >
                    {bookmarked ? (
                      <BookmarkCheck className="h-4 w-4" />
                    ) : (
                      <BookmarkPlus className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-8">
                {event.short_desc}
              </p>
              
              {event.images_with_text && event.images_with_text.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-xl font-medium mb-4">Event Highlights</h3>
                  
                  <Carousel className="w-full">
                    <CarouselContent>
                      {event.images_with_text.map((item, index) => (
                        <CarouselItem key={index}>
                          <div className="relative overflow-hidden rounded-xl aspect-video">
                            <Image
                              src={item.image}
                              alt={`Event photo ${index + 1}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                            />
                            {item.text && (
                              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                                <p className="text-white">{item.text}</p>
                              </div>
                            )}
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                  </Carousel>
                </div>
              )}
              
              <Separator className="my-8" />
              
              <Tabs defaultValue="details">
                <TabsList className="mb-4">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="venue">Venue</TabsTrigger>
                  <TabsTrigger value="organizers">Organizers</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-4">
                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="font-medium mb-2">Event Schedule</h4>
                      <p className="text-muted-foreground">
                        This event is scheduled for {formatDate(event.date)}. Please arrive 15 minutes early for registration.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="font-medium mb-2">What to Bring</h4>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        <li>Your ID card</li>
                        <li>Notebook and pen</li>
                        <li>Laptop (optional)</li>
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="venue">
                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="font-medium mb-2">Venue Details</h4>
                      <p className="text-muted-foreground mb-4">{event.venue}</p>
                      
                      <div className="rounded-lg overflow-hidden h-[300px] relative">
                        <div className="absolute inset-0 flex items-center justify-center bg-muted">
                          <p className="text-muted-foreground">Map view would be displayed here</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="organizers">
                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="font-medium mb-2">Event Organizers</h4>
                      <p className="text-muted-foreground mb-4">
                        This event is organized by the Bit2Byte Team.
                      </p>
                      <p className="text-muted-foreground">
                        For any questions, please contact us at <span className="text-primary">events@bit2byte.com</span>
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
          
          {/* Sidebar */}
          <div className="w-full sm:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="sticky top-24"
            >
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-medium mb-4">Event Information</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium">Date</h4>
                        <p className="text-muted-foreground">{formatDate(event.date)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium">Time</h4>
                        <p className="text-muted-foreground">10:00 AM - 4:00 PM</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium">Location</h4>
                        <p className="text-muted-foreground">{event.venue}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  {isUpcoming(event.date) ? (
                    <>
                      <h4 className="font-medium mb-4">Registration</h4>
                      <Button className="w-full mb-3">Register Now</Button>
                      <p className="text-xs text-center text-muted-foreground">
                        Registration closes 2 days before the event
                      </p>
                    </>
                  ) : (
                    <div className="bg-muted/50 p-4 rounded-lg text-center">
                      <p className="text-muted-foreground">This event has already taken place</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-4">Share Event</h3>
                  <div className="flex justify-around">
                    <Button variant="outline" size="icon" onClick={shareEvent} title="Share on Facebook">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                      </svg>
                    </Button>
                    <Button variant="outline" size="icon" onClick={shareEvent} title="Share on Twitter">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                      </svg>
                    </Button>
                    <Button variant="outline" size="icon" onClick={shareEvent} title="Share on LinkedIn">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                      </svg>
                    </Button>
                    <Button variant="outline" size="icon" onClick={shareEvent} title="Share via Email">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                      </svg>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}