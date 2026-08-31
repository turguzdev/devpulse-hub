"use client";

import React, { useState, useEffect, useCallback } from "react";
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  LayoutGrid, 
  List, 
  Plus, 
  Sparkles, 
  FolderGit2, 
  CheckCircle,
  AlertTriangle,
  Info,
  Layers
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { HeroStats } from "@/components/HeroStats";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectModal } from "@/components/ProjectModal";
import { ProjectDetailsModal } from "@/components/ProjectDetailsModal";
import { AnalyticsView } from "@/components/AnalyticsView";
import { ApiPlayground } from "@/components/ApiPlayground";
import { FeedbackHub } from "@/components/FeedbackHub";
import { Project, ProjectStatus, StatsResponse } from "@/lib/types";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"projects" | "analytics" | "api" | "feedback">("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [detailsProject, setDetailsProject] = useState<Project | null>(null);

  // Toast Notification
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== "All") params.set("category", selectedCategory);
      if (selectedStatus !== "All") params.set("status", selectedStatus);
      if (searchQuery.trim()) params.set("search", searchQuery.trim());
      if (sortBy) params.set("sort", sortBy);

      const [projRes, statsRes] = await Promise.all([
        fetch(`/api/projects?${params.toString()}`),
        fetch("/api/stats")
      ]);

      const projData = await projRes.json();
      const statsData = await statsRes.json();

      if (projData.success) {
        setProjects(projData.data);
      }
      if (statsData.success) {
        setStats(statsData.data);
      }
    } catch (error) {
      showToast("Veriler yüklenirken bir bağlantı hatası oluştu.", "error");
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory, selectedStatus, searchQuery, sortBy]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handle Create or Update
  const handleSaveProject = async (payload: any): Promise<boolean> => {
    try {
      let res;
      if (editingProject) {
        res = await fetch(`/api/projects/${editingProject.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      } else {
        res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      }

      const data = await res.json();
      if (data.success) {
        showToast(
          editingProject ? "Proje başarıyla güncellendi." : "Yeni proje başarıyla oluşturuldu!",
          "success"
        );
        loadData();
        return true;
      } else {
        showToast(data.error || "İşlem başarısız oldu.", "error");
        return false;
      }
    } catch {
      showToast("Sunucu ile iletişim kurulamadı.", "error");
      return false;
    }
  };

  // Handle Delete
  const handleDeleteProject = async (id: string) => {
    if (!window.confirm("Bu projeyi silmek istediğinize emin misiniz?")) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showToast("Proje başarıyla silindi.", "info");
        loadData();
      } else {
        showToast(data.error || "Silme başarısız oldu.", "error");
      }
    } catch {
      showToast("Silme isteği sırasında hata oluştu.", "error");
    }
  };

  // Handle Quick Status Change
  const handleStatusChange = async (id: string, newStatus: ProjectStatus) => {
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Durum '${newStatus}' olarak güncellendi.`, "success");
        loadData();
      }
    } catch {
      showToast("Durum güncellemesi başarısız oldu.", "error");
    }
  };

  // Handle Star
  const handleStar = async (id: string, currentStars: number) => {
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stars: currentStars + 1 })
      });
      const data = await res.json();
      if (data.success) {
        setProjects(prev =>
          prev.map(p => (p.id === id ? { ...p, stars: p.stars + 1 } : p))
        );
        showToast("Projeye 1 yıldız eklendi! ⭐", "success");
      }
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-cyan-500 selection:text-black">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-2xl text-xs font-semibold border backdrop-blur-md transition-all animate-bounce ${
          toast.type === "success" 
            ? "bg-emerald-950/90 border-emerald-500/40 text-emerald-300"
            : toast.type === "error"
            ? "bg-rose-950/90 border-rose-500/40 text-rose-300"
            : "bg-blue-950/90 border-blue-500/40 text-blue-300"
        }`}>
          {toast.type === "success" && <CheckCircle className="w-4 h-4 text-emerald-400" />}
          {toast.type === "error" && <AlertTriangle className="w-4 h-4 text-rose-400" />}
          {toast.type === "info" && <Info className="w-4 h-4 text-blue-400" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenNewProject={() => {
          setEditingProject(null);
          setIsModalOpen(true);
        }}
        totalProjects={stats?.totalProjects || projects.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab 1: Projects Catalog */}
        {activeTab === "projects" && (
          <div>
            {/* Hero & Statistics */}
            <HeroStats
              stats={stats}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onRefresh={loadData}
              isLoading={isLoading}
            />

            {/* Filter and Search Bar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 mb-6">
              {/* Search Box */}
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Proje adı, teknoloji (Next.js, Go...), sorumlu veya açıklama ara..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-cyan-500 transition"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2 text-xs">
                <Filter className="w-3.5 h-3.5 text-zinc-500 hidden sm:block" />
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 focus:outline-none focus:border-cyan-500"
                >
                  <option value="All">Tüm Durumlar</option>
                  <option value="Planning">Planning</option>
                  <option value="In Progress">In Progress</option>
                  <option value="In Review">In Review</option>
                  <option value="Completed">Completed</option>
                </select>

                {/* Sort dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 focus:outline-none focus:border-cyan-500"
                >
                  <option value="newest">En Yeniler</option>
                  <option value="stars">En Çok Yıldız Alan</option>
                  <option value="progress">İlerleme Oranına Göre</option>
                  <option value="due">Teslim Tarihine Göre</option>
                </select>

                {/* Grid / List Switch */}
                <div className="hidden sm:flex items-center bg-zinc-950 p-1 rounded-xl border border-zinc-800">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded-lg transition ${
                      viewMode === "grid" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"
                    }`}
                    title="Grid Görünümü"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded-lg transition ${
                      viewMode === "list" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"
                    }`}
                    title="Liste Görünümü"
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Projects Grid / List */}
            {isLoading && projects.length === 0 ? (
              <div className="py-20 text-center text-zinc-500 text-xs">
                <div className="w-8 h-8 mx-auto border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mb-3" />
                <span>Projeler yükleniyor...</span>
              </div>
            ) : projects.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-zinc-900/40 border border-zinc-800/80">
                <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center mx-auto mb-3 text-zinc-400">
                  <FolderGit2 className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-1">Eşleşen Proje Bulunamadı</h3>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto mb-4">
                  Arama kriterlerinizi değiştirebilir veya yeni bir proje oluşturabilirsiniz.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                    setSelectedStatus("All");
                  }}
                  className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-200 font-semibold transition"
                >
                  Filtreleri Sıfırla
                </button>
              </div>
            ) : (
              <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onEdit={(p) => {
                      setEditingProject(p);
                      setIsModalOpen(true);
                    }}
                    onDelete={handleDeleteProject}
                    onStatusChange={handleStatusChange}
                    onStar={handleStar}
                    onViewDetails={(p) => setDetailsProject(p)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Analytics & Telemetry */}
        {activeTab === "analytics" && (
          <AnalyticsView
            stats={stats}
            onRefresh={loadData}
            isLoading={isLoading}
          />
        )}

        {/* Tab 3: API Playground */}
        {activeTab === "api" && (
          <ApiPlayground />
        )}

        {/* Tab 4: Feedback & Support */}
        {activeTab === "feedback" && (
          <FeedbackHub />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/70 bg-zinc-950 py-8 text-center text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-zinc-300">DevPulse Hub</span>
            <span>— Next.js 15 Full-Stack Developer Architecture</span>
          </div>
          <div className="flex items-center gap-4 text-zinc-400">
            <a href="https://github.com/turguzdev" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition">
              GitHub / turguzdev
            </a>
            <span>•</span>
            <span>REST API Ready</span>
            <span>•</span>
            <span>Tailwind CSS v4</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProject(null);
        }}
        onSave={handleSaveProject}
        editingProject={editingProject}
      />

      <ProjectDetailsModal
        project={detailsProject}
        onClose={() => setDetailsProject(null)}
        onEdit={(p) => {
          setDetailsProject(null);
          setEditingProject(p);
          setIsModalOpen(true);
        }}
      />
    </div>
  );
}