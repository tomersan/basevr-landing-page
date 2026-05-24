import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate required fields
    const { fullName, company, phone, email } = data;
    if (!fullName || !company || !phone || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // TODO: Replace with your actual webhook URL
    // Examples:
    // - Zapier: https://hooks.zapier.com/hooks/catch/XXXX/XXXX
    // - Make: https://hook.eu1.make.com/XXXX
    // - Custom: https://your-api.com/leads
    const WEBHOOK_URL = process.env.WEBHOOK_URL;

    if (WEBHOOK_URL) {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          source: "BaseVR Landing Page",
          timestamp: new Date().toISOString(),
        }),
      });
    } else {
      // Log to console when no webhook is configured
      console.log("📩 New lead received:", {
        ...data,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
