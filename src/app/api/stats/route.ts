import { NextResponse } from "next/server";
import { store } from "@/lib/data-store";

export async function GET() {
  try {
    const stats = store.getStats();
    return NextResponse.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Istatistik verileri alinamadi." },
      { status: 500 }
    );
  }
}
