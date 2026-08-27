"use client";

import React, { useState, useEffect } from "react";
import { Plus, Sparkles, Layers, BarChart3, Terminal, MessageSquareCode } from "lucide-react";
import { GithubIcon } from "@/components/Icons";

interface NavbarProps {
  activeTab: "projects" | "analytics" | "api" | "feedback";
  setActiveTab: (tab: "projects" | "analytics" | "api" | "feedback") => void;
  onOpenNewProject: () => void;
  totalProjects: number;
}

export function Navbar({ activeTab, setActiveTab, onOpenNewProject, totalProjects }: NavbarProps) {
  const [apiStatus, setApiStatus] = useState<"checking" | "online" | "offline">("checking");
  const [latency, setLatency] = useState<number | null>(null);

  const checkHealth = async () => {
    try {
      const start = performance.now();
      const res = await fetch("/api/health");
      const elapsed = Math.round(performance.now() - start);
      if (res.ok) {
        setApiStatus("online");
        setLatency(elapsed);
      } else {
        setApiStatus("offline");
      }
    } catch {
      setApiStatus("offline");
    }
  };

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-500 to-cyan-400 text-white shadow-lg shadow-indigo-500/25">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-100 to-zinc-400">
                  DevPulse<span className="text-cyan-400">.hub</span>
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full">
                  Full-Stack Next.js
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 hidden sm:block">Modern Developer Workspace & API Platform</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-zinc-900/90 p-1 rounded-xl border border-zinc-800">
            <button
              onClick={() => setActiveTab("projects")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === "projects"
                  ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-500/20"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Projeler</span>
              {totalProjects > 0 && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  activeTab === "projects" ? "bg-white/20 text-white" : "bg-zinc-800 text-zinc-300"
                }`}>
                  {totalProjects}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("analytics")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === "analytics"
                  ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-500/20"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Analitik & Metrikler</span>
            </button>

            <button
              onClick={() => setActiveTab("api")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === "api"
                  ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-500/20"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>API Playground</span>
              <span className="text-[9px] px-1 bg-emerald-500/20 text-emerald-300 rounded font-mono">REST</span>
            </button>

            <button
              onClick={() => setActiveTab("feedback")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === "feedback"
                  ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-500/20"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
              }`}
            >
              <MessageSquareCode className="w-3.5 h-3.5" />
              <span>Geri Bildirim</span>
            </button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5">
            {/* Live API Health Pill */}
            <div 
              title={apiStatus === "online" ? `Backend API Aktif (${latency}ms)` : "API Kontrol Ediliyor"}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-[11px] text-zinc-300 font-mono cursor-pointer hover:border-zinc-700 transition"
              onClick={checkHealth}
            >
              <span className={`w-2 h-2 rounded-full ${
                apiStatus === "online" ? "bg-emerald-400 shadow-[0_0_8px_#34d399]" : apiStatus === "checking" ? "bg-amber-400 animate-pulse" : "bg-rose-500"
              }`} />
              <span className="text-zinc-400">API:</span>
              <span className={apiStatus === "online" ? "text-emerald-400 font-semibold" : "text-zinc-400"}>
                {apiStatus === "online" ? `200 OK (${latency}ms)` : apiStatus}
              </span>
            </div>

            {/* GitHub Profile */}
            <a
              href="https://github.com/Yagzk"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 hover:bg-zinc-800/80 transition"
              title="GitHub Hesabı (Yagzk)"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            {/* New Project Button */}
            <button
              onClick={onOpenNewProject}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Yeni Proje</span>
            </button>
          </div>
        </div>

        {/* Mobile Sub Navigation */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-zinc-800/60 overflow-x-auto gap-1 text-xs">
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-2.5 py-1 rounded-lg ${activeTab === "projects" ? "bg-indigo-600 text-white" : "text-zinc-400"}`}
          >
            Projeler
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-2.5 py-1 rounded-lg ${activeTab === "analytics" ? "bg-indigo-600 text-white" : "text-zinc-400"}`}
          >
            Analitik
          </button>
          <button
            onClick={() => setActiveTab("api")}
            className={`px-2.5 py-1 rounded-lg ${activeTab === "api" ? "bg-indigo-600 text-white" : "text-zinc-400"}`}
          >
            API Tester
          </button>
          <button
            onClick={() => setActiveTab("feedback")}
            className={`px-2.5 py-1 rounded-lg ${activeTab === "feedback" ? "bg-indigo-600 text-white" : "text-zinc-400"}`}
          >
            Geri Bildirim
          </button>
        </div>
      </div>
    </header>
  );
}