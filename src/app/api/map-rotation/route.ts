import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(
      `https://api.mozambiquehe.re/maprotation?version=2&auth=${process.env.AL_API_KEY}`,
      { next: { revalidate: 60 } } // Cache for 1 minute
    );
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch map rotation data" },
      { status: 500 }
    );
  }
}
