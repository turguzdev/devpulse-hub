import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/data-store";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const project = store.getProjectById(id);

    if (!project) {
      return NextResponse.json(
        { success: false, error: "Proje bulunamadi." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: project,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Proje getirilirken hata olustu." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updated = store.updateProject(id, body);

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Guncellenecek proje bulunamadi." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Proje basariyla guncellendi.",
      data: updated,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Guncelleme sirasinda hata olustu." },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const success = store.deleteProject(id);

    if (!success) {
      return NextResponse.json(
        { success: false, error: "Silinecek proje bulunamadi." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Proje basariyla silindi.",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Silme islemi sirasinda hata olustu." },
      { status: 500 }
    );
  }
}
