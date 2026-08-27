import { NextResponse } from "next/server";

const startTime = Date.now();

export async function GET() {
  const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);

  return NextResponse.json({
    status: "healthy",
    uptime: `${uptimeSeconds}s`,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    version: "1.0.0",
    engine: "Next.js App Router (Node.js 22)"
  });
}
