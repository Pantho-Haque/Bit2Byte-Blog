import { NextResponse } from 'next/server';

// Sample event data with additional image gallery
const eventsData = {
  'bit2console-2024': {
    event_name: 'bit2console-2024',
    image: '/images/events/bit2console-2024.jpg',
    short_desc: 'Annual tech event featuring workshops, competitions, and guest lectures from industry professionals',
    date: '25/02/2025',
    venue: 'Academic Building',
    images_with_text: [
      {
        image: '/images/events/bit2console-2024_0.jpg',
        text: 'Attendees participating in the coding challenge'
      },
      {
        image: '/images/events/bit2console-2024_1.png',
        text: 'Keynote session on future tech trends'
      },
      {
        image: '/images/events/bit2console-2024_2.jpg',
        text: 'Interactive workshop sessions'
      }
    ]
  },
  'code-athon-2024': {
    event_name: 'code-athon-2024',
    image: '/images/events/code-athon-2024.jpg',
    short_desc: 'A 24-hour coding marathon where participants build innovative solutions to real-world problems',
    date: '15/05/2024',
    venue: 'Tech Center',
    images_with_text: [
      {
        image: '/images/events/code-athon-2024_0.jpg',
        text: 'Teams collaborating on projects'
      },
      {
        image: '/images/events/code-athon-2024_1.jpg',
        text: 'Judges evaluating final submissions'
      }
    ]
  },
  'web-dev-workshop': {
    event_name: 'web-dev-workshop',
    image: '/images/events/web-dev-workshop.jpg',
    short_desc: 'Hands-on workshop covering modern web development techniques with React and Next.js',
    date: '10/03/2024',
    venue: 'Innovation Lab',
    images_with_text: [
      {
        image: '/images/events/web-dev-workshop_0.jpg',
        text: 'Instructor demonstrating Next.js features'
      },
      {
        image: '/images/events/web-dev-workshop_1.jpg',
        text: 'Participants building their first React app'
      }
    ]
  },
  'ai-summit': {
    event_name: 'ai-summit',
    image: '/images/events/ai-summit.jpg',
    short_desc: 'Exploring the latest advancements in artificial intelligence and machine learning',
    date: '30/06/2024',
    venue: 'Conference Hall',
    images_with_text: [
      {
        image: '/images/events/ai-summit_0.jpg',
        text: 'Panel discussion on AI ethics'
      },
      {
        image: '/images/events/ai-summit_1.jpg',
        text: 'Demonstration of machine learning models'
      }
    ]
  },
  'blockchain-basics': {
    event_name: 'blockchain-basics',
    image: '/images/events/blockchain-basics.jpg',
    short_desc: 'Introduction to blockchain technology and its applications beyond cryptocurrencies',
    date: '12/08/2024',
    venue: 'Lecture Hall 2',
    images_with_text: [
      {
        image: '/images/events/blockchain-basics_0.jpg',
        text: 'Speaker explaining blockchain fundamentals'
      },
      {
        image: '/images/events/blockchain-basics_1.jpg',
        text: 'Hands-on session with blockchain tools'
      }
    ]
  }
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const eventName = searchParams.get('event_name');
  
  if (!eventName || !eventsData[eventName as keyof typeof eventsData]) {
    return NextResponse.json({
      data: null,
      message: 'Event not found',
      success: false,
    }, { status: 404 });
  }
  
  // Return the event data
  return NextResponse.json({
    data: eventsData[eventName as keyof typeof eventsData],
    message: 'Read successful',
    success: true,
  });
}