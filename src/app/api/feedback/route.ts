import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/data-store";

export async function GET() {
  try {
    const feedbacks = store.getFeedbacks();
    return NextResponse.json({
      success: true,
      data: feedbacks,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Geri bildirimler yuklenemedi." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { success: false, error: "Ad, e-posta ve mesaj alanlari zorunludur." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, error: "Gecerli bir e-posta adresi giriniz." },
        { status: 400 }
      );
    }

    const newFeedback = store.addFeedback({
      name: body.name.trim(),
      email: body.email.trim(),
      type: body.type || "Feedback",
      message: body.message.trim(),
      rating: typeof body.rating === "number" ? Math.min(5, Math.max(1, body.rating)) : 5
    });

    return NextResponse.json(
      {
        success: true,
        message: "Mesajiniz basariyla iletildi. Tesekkur ederiz!",
        data: newFeedback,
        timestamp: new Date().toISOString()
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Geri bildirim kaydedilirken hata olustu." },
      { status: 400 }
    );
  }
}
