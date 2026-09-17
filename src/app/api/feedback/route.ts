import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Log the feedback submission for future notification hookup
    console.log("[Feedback Received]", {
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Thanks — we got it!",
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to process feedback" },
      { status: 400 }
    );
  }
}
