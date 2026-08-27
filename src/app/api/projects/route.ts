import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/data-store";
import { ProjectCategory, ProjectPriority, ProjectStatus } from "@/lib/types";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category") || undefined;
    const status = searchParams.get("status") || undefined;
    const search = searchParams.get("search") || undefined;
    const sort = searchParams.get("sort") || undefined;

    const projects = store.getProjects({ category, status, search, sort });

    return NextResponse.json({
      success: true,
      count: projects.length,
      data: projects,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Projeler listelenirken hata olustu." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.title || !body.description || !body.category) {
      return NextResponse.json(
        { success: false, error: "Baslik, aciklama ve kategori alanlari zorunludur." },
        { status: 400 }
      );
    }

    const validCategories: ProjectCategory[] = ['Full-Stack', 'AI & ML', 'Cloud & DevOps', 'Mobile', 'Security', 'Web3'];
    if (!validCategories.includes(body.category)) {
      return NextResponse.json(
        { success: false, error: "Gecersiz kategori secildi." },
        { status: 400 }
      );
    }

    const newProject = store.addProject({
      title: body.title.trim(),
      description: body.description.trim(),
      category: body.category as ProjectCategory,
      status: (body.status as ProjectStatus) || "Planning",
      priority: (body.priority as ProjectPriority) || "Medium",
      progress: typeof body.progress === "number" ? Math.min(100, Math.max(0, body.progress)) : 0,
      tags: Array.isArray(body.tags) ? body.tags.map((t: string) => t.trim()).filter(Boolean) : [],
      githubUrl: body.githubUrl?.trim() || undefined,
      demoUrl: body.demoUrl?.trim() || undefined,
      lead: body.lead?.trim() || "Dev Team",
      dueDate: body.dueDate || new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString().split("T")[0],
      stars: body.stars || 0
    });

    return NextResponse.json(
      {
        success: true,
        message: "Proje basariyla olusturuldu.",
        data: newProject,
        timestamp: new Date().toISOString()
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Gecersiz istek govdesi (JSON format hatasi)." },
      { status: 400 }
    );
  }
}
