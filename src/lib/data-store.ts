import { Project, ActivityLog, FeedbackItem, StatsResponse, ProjectCategory, ProjectPriority } from "./types";

// Initial Mock Seed Data
const initialProjects: Project[] = [
  {
    id: "proj-001",
    title: "NexusAI - Neural Assistant & LLM Studio",
    description: "Next-gen yapay zeka aracı ile kod analizi, otomatik test oluşturma ve bağlam odaklı agent entegrasyon platformu.",
    category: "AI & ML",
    status: "In Progress",
    priority: "Critical",
    progress: 78,
    tags: ["Next.js", "Python", "FastAPI", "OpenAI", "Vector DB"],
    githubUrl: "https://github.com/Yagzk/nexus-ai-studio",
    demoUrl: "https://nexus-ai-demo.vercel.app",
    stars: 142,
    lead: "Yağız Kaan",
    dueDate: "2026-09-15",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "proj-002",
    title: "PulseGuard - Cloud Security Scanner",
    description: "Multi-cloud ortamlarda güvenlik açıkları, IAM konfigürasyon hataları ve zero-day zafiyetlerini gerçek zamanlı tarayan otomasyon sistemi.",
    category: "Security",
    status: "In Review",
    priority: "High",
    progress: 92,
    tags: ["Go", "Kubernetes", "AWS", "Terraform", "eBPF"],
    githubUrl: "https://github.com/Yagzk/pulseguard-scanner",
    demoUrl: "https://pulseguard-demo.io",
    stars: 89,
    lead: "Siber Güvenlik Ekibi",
    dueDate: "2026-09-01",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "proj-003",
    title: "DevStream - Microservices Telemetry Hub",
    description: "Dağıtık sistemler için yüksek performanslı OpenTelemetry collector, trace görselleştirme ve yapay zeka destekli anomali tespiti.",
    category: "Cloud & DevOps",
    status: "Completed",
    priority: "High",
    progress: 100,
    tags: ["Rust", "ClickHouse", "React", "Docker", "Grafana"],
    githubUrl: "https://github.com/Yagzk/devstream-hub",
    demoUrl: "https://devstream.io",
    stars: 215,
    lead: "DevOps Core",
    dueDate: "2026-08-20",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 35).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString()
  },
  {
    id: "proj-004",
    title: "OmniPay - Global Web3 Settlement Engine",
    description: "Sınır ötesi ödemeler için sıfır komisyonlu, multi-chain destekli akıllı sözleşme altyapısı ve kurumsal ödeme ağ geçidi.",
    category: "Web3",
    status: "In Progress",
    priority: "Medium",
    progress: 45,
    tags: ["Solidity", "TypeScript", "Ethers.js", "Polygon", "Tailwind"],
    githubUrl: "https://github.com/Yagzk/omnipay-protocol",
    stars: 64,
    lead: "Blockchain Labs",
    dueDate: "2026-10-30",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "proj-005",
    title: "AeroTrack - IoT Fleet & Telematics App",
    description: "Otonom araç filoları ve lojistik operasyonları için anlık rota optimizasyonu, sensör telemetrisi ve telematik mobil uygulaması.",
    category: "Mobile",
    status: "Planning",
    priority: "Medium",
    progress: 25,
    tags: ["React Native", "Expo", "Node.js", "MQTT", "PostgreSQL"],
    githubUrl: "https://github.com/Yagzk/aerotrack-mobile",
    stars: 38,
    lead: "Mobil Ürün Grubu",
    dueDate: "2026-11-15",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "proj-006",
    title: "KaanPulse - Full-Stack SaaS Boilerplate",
    description: "Next.js 15, Auth.js, Stripe, Drizzle ORM ve Tailwind CSS ile donatılmış modern kurumsal SaaS başlangıç kiti ve yönetim paneli.",
    category: "Full-Stack",
    status: "Completed",
    priority: "High",
    progress: 100,
    tags: ["Next.js", "React", "TypeScript", "Stripe", "PostgreSQL"],
    githubUrl: "https://github.com/Yagzk/kaan-pulse-starter",
    demoUrl: "https://kaanpulse.vercel.app",
    stars: 310,
    lead: "Yağız Kaan",
    dueDate: "2026-08-10",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 40).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString()
  }
];

const initialActivities: ActivityLog[] = [
  {
    id: "act-01",
    action: "STATUS_CHANGE",
    projectId: "proj-003",
    projectTitle: "DevStream - Microservices Telemetry Hub",
    details: "Proje 'In Review' aşamasından 'Completed' olarak güncellendi.",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString()
  },
  {
    id: "act-02",
    action: "UPDATE",
    projectId: "proj-001",
    projectTitle: "NexusAI - Neural Assistant & LLM Studio",
    details: "Vector DB optimizasyonu ve yeni LLM model desteği eklendi.",
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString()
  },
  {
    id: "act-03",
    action: "CREATE",
    projectId: "proj-005",
    projectTitle: "AeroTrack - IoT Fleet & Telematics App",
    details: "Yeni mobil telematik projesi planlama havuzuna eklendi.",
    timestamp: new Date(Date.now() - 1000 * 60 * 360).toISOString()
  }
];

const initialFeedback: FeedbackItem[] = [
  {
    id: "fb-01",
    name: "Ahmet Yılmaz",
    email: "ahmet@techlab.com",
    type: "Feature Request",
    message: "Harika bir platform! Projelerin CI/CD pipeline durumlarını da kart üzerinde canlı görebilsek çok faydalı olurdu.",
    rating: 5,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString()
  },
  {
    id: "fb-02",
    name: "Zeynep Kaya",
    email: "zeynep.k@devteam.io",
    type: "Feedback",
    message: "Arayüz tasarımı, animasyonlar ve API yanıt süreleri son derece akıcı ve profesyonel.",
    rating: 5,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString()
  }
];

// Global In-Memory Store
class DataStore {
  private projects: Project[] = [...initialProjects];
  private activities: ActivityLog[] = [...initialActivities];
  private feedbacks: FeedbackItem[] = [...initialFeedback];

  public getProjects(filter?: { category?: string; status?: string; search?: string; sort?: string }): Project[] {
    let result = [...this.projects];

    if (filter?.category && filter.category !== "All") {
      result = result.filter(p => p.category.toLowerCase() === filter.category?.toLowerCase());
    }

    if (filter?.status && filter.status !== "All") {
      result = result.filter(p => p.status.toLowerCase() === filter.status?.toLowerCase());
    }

    if (filter?.search) {
      const q = filter.search.toLowerCase().trim();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.lead.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    if (filter?.sort) {
      if (filter.sort === "stars") {
        result.sort((a, b) => b.stars - a.stars);
      } else if (filter.sort === "progress") {
        result.sort((a, b) => b.progress - a.progress);
      } else if (filter.sort === "newest") {
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      } else if (filter.sort === "due") {
        result.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
      }
    } else {
      // default newest first
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }

  public getProjectById(id: string): Project | undefined {
    return this.projects.find(p => p.id === id);
  }

  public addProject(data: Omit<Project, "id" | "createdAt" | "updatedAt" | "stars"> & { stars?: number }): Project {
    const newProject: Project = {
      ...data,
      id: "proj-" + Math.random().toString(36).substring(2, 8),
      stars: data.stars || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.projects.unshift(newProject);

    this.logActivity({
      action: "CREATE",
      projectId: newProject.id,
      projectTitle: newProject.title,
      details: `'${newProject.title}' projesi (${newProject.category}) oluşturuldu.`
    });

    return newProject;
  }

  public updateProject(id: string, updates: Partial<Project>): Project | null {
    const index = this.projects.findIndex(p => p.id === id);
    if (index === -1) return null;

    const oldProject = this.projects[index];
    const updatedProject: Project = {
      ...oldProject,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    this.projects[index] = updatedProject;

    const statusChanged = updates.status && updates.status !== oldProject.status;
    this.logActivity({
      action: statusChanged ? "STATUS_CHANGE" : "UPDATE",
      projectId: updatedProject.id,
      projectTitle: updatedProject.title,
      details: statusChanged 
        ? `Durum: '${oldProject.status}' -> '${updatedProject.status}' olarak güncellendi.`
        : `'${updatedProject.title}' proje detayları güncellendi.`
    });

    return updatedProject;
  }

  public deleteProject(id: string): boolean {
    const index = this.projects.findIndex(p => p.id === id);
    if (index === -1) return false;

    const deleted = this.projects.splice(index, 1)[0];
    this.logActivity({
      action: "DELETE",
      projectId: id,
      projectTitle: deleted.title,
      details: `'${deleted.title}' projesi silindi.`
    });

    return true;
  }

  public addFeedback(item: Omit<FeedbackItem, "id" | "createdAt">): FeedbackItem {
    const newFeedback: FeedbackItem = {
      ...item,
      id: "fb-" + Math.random().toString(36).substring(2, 8),
      createdAt: new Date().toISOString()
    };

    this.feedbacks.unshift(newFeedback);

    this.logActivity({
      action: "FEEDBACK",
      details: `${newFeedback.name} yeni ${newFeedback.type.toLowerCase()} gönderdi (Puan: ${newFeedback.rating}/5).`
    });

    return newFeedback;
  }

  public getFeedbacks(): FeedbackItem[] {
    return this.feedbacks;
  }

  public getStats(): StatsResponse {
    const totalProjects = this.projects.length;
    const completedProjects = this.projects.filter(p => p.status === "Completed").length;
    const inProgressProjects = this.projects.filter(p => p.status === "In Progress").length;
    const planningProjects = this.projects.filter(p => p.status === "Planning").length;
    const inReviewProjects = this.projects.filter(p => p.status === "In Review").length;
    const totalStars = this.projects.reduce((acc, curr) => acc + curr.stars, 0);
    const averageProgress = totalProjects > 0 
      ? Math.round(this.projects.reduce((acc, curr) => acc + curr.progress, 0) / totalProjects) 
      : 0;

    const categoryBreakdown: Record<ProjectCategory, number> = {
      'Full-Stack': 0,
      'AI & ML': 0,
      'Cloud & DevOps': 0,
      'Mobile': 0,
      'Security': 0,
      'Web3': 0
    };

    const priorityBreakdown: Record<ProjectPriority, number> = {
      'Critical': 0,
      'High': 0,
      'Medium': 0,
      'Low': 0
    };

    this.projects.forEach(p => {
      if (categoryBreakdown[p.category] !== undefined) categoryBreakdown[p.category]++;
      if (priorityBreakdown[p.priority] !== undefined) priorityBreakdown[p.priority]++;
    });

    return {
      totalProjects,
      completedProjects,
      inProgressProjects,
      planningProjects,
      inReviewProjects,
      totalStars,
      averageProgress,
      categoryBreakdown,
      priorityBreakdown,
      recentActivities: this.activities.slice(0, 8)
    };
  }

  private logActivity(activity: Omit<ActivityLog, "id" | "timestamp">) {
    const newLog: ActivityLog = {
      ...activity,
      id: "act-" + Math.random().toString(36).substring(2, 8),
      timestamp: new Date().toISOString()
    };
    this.activities.unshift(newLog);
    if (this.activities.length > 50) this.activities.pop();
  }
}

// Global Singleton for Hot Reload preservation in Next.js development
const globalForData = globalThis as unknown as { devPulseStore?: DataStore };

export const store = globalForData.devPulseStore || new DataStore();
if (process.env.NODE_ENV !== "production") globalForData.devPulseStore = store;
