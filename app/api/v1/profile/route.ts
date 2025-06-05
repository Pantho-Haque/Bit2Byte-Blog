import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get the pathname to extract the email/username
    const pathname = request.nextUrl.pathname;
    const segments = pathname.split('/');
    const email = segments[segments.length - 1];

    // In a real implementation, you would fetch this data from your backend
    // For now, we'll mock the response based on the API documentation
    const userData = {
      name: "Abu Saeed",
      email: email.includes('@') ? email : `${email}@stud.kuet.ac.bd`,
      username: email.includes('@') ? email.split('@')[0] : email,
      photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      role: "ADMIN",
      joinedAt: "2022-01-15",
      contributions: 47,
      blogs: 12,
      events: 5
    };

    return NextResponse.json(
      {
        data: userData,
        message: "Success",
        success: true
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching user info:', error);
    return NextResponse.json(
      {
        message: "Failed to fetch user information",
        success: false
      },
      { status: 500 }
    );
  }
}
