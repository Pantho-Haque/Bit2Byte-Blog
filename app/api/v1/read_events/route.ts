import { NextResponse } from 'next/server';

// Sample events data
const eventsData = [
  {
    event_name: 'bit2console-2024',
    image: '/images/events/bit2console-2024.jpg',
    short_desc: 'Annual tech event featuring workshops, competitions, and guest lectures from industry professionals',
    date: '25/02/2025',
    venue: 'Academic Building',
  },
  {
    event_name: 'code-athon-2024',
    image: '/images/events/code-athon-2024.jpg',
    short_desc: 'A 24-hour coding marathon where participants build innovative solutions to real-world problems',
    date: '15/05/2024',
    venue: 'Tech Center',
  },
  {
    event_name: 'web-dev-workshop',
    image: '/images/events/web-dev-workshop.jpg',
    short_desc: 'Hands-on workshop covering modern web development techniques with React and Next.js',
    date: '10/03/2024',
    venue: 'Innovation Lab',
  },
  {
    event_name: 'ai-summit',
    image: '/images/events/ai-summit.jpg',
    short_desc: 'Exploring the latest advancements in artificial intelligence and machine learning',
    date: '30/06/2024',
    venue: 'Conference Hall',
  },
  {
    event_name: 'blockchain-basics',
    image: '/images/events/blockchain-basics.jpg',
    short_desc: 'Introduction to blockchain technology and its applications beyond cryptocurrencies',
    date: '12/08/2024',
    venue: 'Lecture Hall 2',
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '0');
  const itemsPerPage = parseInt(searchParams.get('items_per_page') || '10');
  
  // Calculate pagination
  const startIdx = page * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const paginatedEvents = eventsData.slice(startIdx, endIdx);
  
  // Simulate API response
  return NextResponse.json({
    data: {
      item_count: eventsData.length,
      page_no: page,
      items: paginatedEvents,
      total_pages: Math.ceil(eventsData.length / itemsPerPage),
    },
    message: 'Data read successful',
    success: true,
  });
}