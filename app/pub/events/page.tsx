'use client';

import { useState, useEffect } from 'react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

interface Event {
  event_name: string;
  image: string;
  short_desc: string;
  date: string;
  venue: string;
}

interface EventsResponse {
  data: {
    item_count: number;
    page_no: number;
    items: Event[];
    total_pages: number;
  };
  message: string;
  success: boolean;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<'date-asc' | 'date-desc' | 'name'>('date-desc');
  const [category, setCategory] = useState<'all' | 'upcoming' | 'past'>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/v1/read_events?page=${currentPage - 1}`);
        const data: EventsResponse = await response.json();
        
        if (data.success) {
          setEvents(data.data.items);
          setTotalPages(data.data.total_pages);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('Failed to fetch events');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [currentPage]);

  const filteredEvents = events
    .filter(event => {
      // Filter by search term
      if (search && !event.event_name.toLowerCase().includes(search.toLowerCase()) && 
          !event.short_desc.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      
      // Filter by category
      if (category === 'upcoming' || category === 'past') {
        const eventDate = new Date(event.date.split('/').reverse().join('-'));
        const today = new Date();
        
        if (category === 'upcoming' && eventDate < today) {
          return false;
        }
        
        if (category === 'past' && eventDate >= today) {
          return false;
        }
      }
      
      return true;
    })
    .sort((a, b) => {
      // Sort by selected option
      const dateA = new Date(a.date.split('/').reverse().join('-'));
      const dateB = new Date(b.date.split('/').reverse().join('-'));
      
      if (sortBy === 'date-asc') {
        return dateA.getTime() - dateB.getTime();
      } else if (sortBy === 'date-desc') {
        return dateB.getTime() - dateA.getTime();
      } else {
        return a.event_name.localeCompare(b.event_name);
      }
    });

  return (
    <div className="min-h-screen pb-16">
      <div className="bg-gradient-to-b from-primary/20 to-background pt-24 pb-10">
        <MaxWidthWrapper>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight mb-4">Events</h1>
            <p className="text-muted-foreground mx-auto max-w-2xl mb-8">
              Check out our latest events and workshops to enhance your learning journey
            </p>
          </motion.div>
        </MaxWidthWrapper>
      </div>

      <MaxWidthWrapper className="mt-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-desc">Newest first</SelectItem>
                <SelectItem value="date-asc">Oldest first</SelectItem>
                <SelectItem value="name">Name (A-Z)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="all" className="mb-8" onValueChange={(value) => setCategory(value as any)}>
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
              <TabsTrigger value="all">All Events</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>
          </Tabs>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden border border-border/40">
                  <div className="h-48 bg-muted animate-pulse" />
                  <CardHeader>
                    <div className="h-6 bg-muted animate-pulse mb-2 w-3/4 rounded-md" />
                    <div className="h-4 bg-muted animate-pulse w-1/2 rounded-md" />
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-muted animate-pulse mb-2 rounded-md" />
                    <div className="h-4 bg-muted animate-pulse mb-2 w-5/6 rounded-md" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="text-center p-8">
              <p className="text-red-500">{error}</p>
              <Button 
                onClick={() => window.location.reload()}
                variant="outline" 
                className="mt-4"
              >
                Try again
              </Button>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center p-8">
              <p className="text-muted-foreground">No events found matching your criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event, idx) => (
                <motion.div
                  key={event.event_name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                >
                  <EventCard event={event} />
                </motion.div>
              ))}
            </div>
          )}

          {!loading && !error && totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <nav aria-label="Pagination">
                <ul className="inline-flex items-center -space-x-px">
                  <li>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      className="rounded-l-lg"
                    >
                      Previous
                    </Button>
                  </li>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <li key={i}>
                      <Button
                        variant={currentPage === i + 1 ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(i + 1)}
                        className="rounded-none"
                      >
                        {i + 1}
                      </Button>
                    </li>
                  ))}
                  <li>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      className="rounded-r-lg"
                    >
                      Next
                    </Button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </motion.div>
      </MaxWidthWrapper>
    </div>
  );
}

function EventCard({ event }: { event: Event }) {
  // Format the date
  const formatDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split('/');
    const date = new Date(`${year}-${month}-${day}`);
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  // Check if event is upcoming
  const isUpcoming = () => {
    const [day, month, year] = event.date.split('/');
    const eventDate = new Date(`${year}-${month}-${day}`);
    return eventDate > new Date();
  };

  return (
    <Link href={`/pub/event/${event.event_name}`} passHref>
      <Card className="overflow-hidden h-full border border-border/40 transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:-translate-y-1 cursor-pointer">
        <div className="relative h-48 w-full">
          <Image
            src={event.image}
            alt={event.event_name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {isUpcoming() && (
            <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
              Upcoming
            </div>
          )}
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="line-clamp-1">{event.event_name}</CardTitle>
          <CardDescription className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(event.date)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground line-clamp-2">
            {event.short_desc}
          </p>
        </CardContent>
        <CardFooter className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" /> {event.venue}
        </CardFooter>
      </Card>
    </Link>
  );
}