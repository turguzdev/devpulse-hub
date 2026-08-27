"use client";

import React from "react";
import { FolderGit2, CheckCircle2, Flame, Star, RefreshCw, ArrowUpRight, TrendingUp } from "lucide-react";
import { StatsResponse, ProjectCategory } from "@/lib/types";

interface HeroStatsProps {
  stats: StatsResponse | null;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onRefresh: () => void;
  isLoading: boolean;
}

const CATEGORIES: (ProjectCategory | "All")[] = [
  "All",
  "Full-Stack",
  "AI & ML",
  "Cloud & DevOps",
  "Mobile",
  "Security",
  "Web3"
];

export function HeroStats({ stats, selectedCategory, onSelectCategory, onRefresh, isLoading }: HeroStatsProps) {
  const total = stats?.totalProjects || 0;
  const completed = stats?.completedProjects || 0;
  const inProgress = stats?.inProgressProjects || 0;
  const totalStars = stats?.totalStars || 0;
  const avgProgress = stats?.averageProgress || 0;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-gradient-to-b from-zinc-900/90 via-zinc-950 to-zinc-950 p-6 sm:p-8 shadow-2xl mb-8">
      {/* Decorative Glow */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Title & Actions */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-zinc-800/70">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Next.js 15 App Router & API Engine</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Geliştirici Projeleri & <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">Full-Stack Yönetim Paneli</span>
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 leading-relaxed">
            Frontend ve backend mimarisini tek çatı altında buluşturan, gerçek zamanlı API endpoints, analitik veriler ve etkileşimli CRUD operasyonlarına sahip modern platform.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-medium transition active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-cyan-400" : ""}`} />
            <span>Verileri Yenile</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {/* Card 1 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-medium">Toplam Projeler</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
              <FolderGit2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-white">{total}</span>
            <span className="text-xs text-zinc-500 font-medium">aktif havuz</span>
          </div>
          <div className="mt-2 text-[11px] text-zinc-400 flex items-center gap-1">
            <span className="text-emerald-400 font-semibold">%100</span> REST API senkronize
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-medium">Geliştirme Sürecinde</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <Flame className="w-4 h-4 animate-bounce" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-blue-400">{inProgress}</span>
            <span className="text-xs text-zinc-500 font-medium">işlemde</span>
          </div>
          <div className="mt-2 text-[11px] text-zinc-400">
            Ort. İlerleme: <span className="text-white font-semibold">%{avgProgress}</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-medium">Tamamlanan</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-emerald-400">{completed}</span>
            <span className="text-xs text-zinc-500 font-medium">başarılı</span>
          </div>
          <div className="mt-2 text-[11px] text-zinc-400">
            Tamamlanma Oranı: <span className="text-emerald-400 font-semibold">%{total > 0 ? Math.round((completed / total) * 100) : 0}</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-medium">Topluluk Yıldızları</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-amber-300">{totalStars}</span>
            <span className="text-xs text-zinc-500 font-medium">star</span>
          </div>
          <div className="mt-2 text-[11px] text-zinc-400">
            GitHub & Açık Kaynak
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 mt-6 pt-4 border-t border-zinc-800/60 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider mr-1 whitespace-nowrap">Kategori:</span>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition ${
              selectedCategory === cat
                ? "bg-white text-zinc-950 font-bold shadow-md"
                : "bg-zinc-900/80 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 border border-zinc-800/60"
            }`}
          >
            {cat === "All" ? "Tüm Kategoriler" : cat}
          </button>
        ))}
      </div>
    </div>
  );
}
