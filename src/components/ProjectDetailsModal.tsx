"use client";

import React, { useState } from "react";
import { X, Code, ExternalLink, Star, Copy, Check } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { Project } from "@/lib/types";
import { formatDate, getPriorityBadgeStyle, getStatusBadgeStyle } from "@/lib/utils";

interface ProjectDetailsModalProps {
  project: Project | null;
  onClose: () => void;
  onEdit: (project: Project) => void;
}

export function ProjectDetailsModal({ project, onClose, onEdit }: ProjectDetailsModalProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "api">("overview");

  if (!project) return null;

  const statusStyle = getStatusBadgeStyle(project.status);
  const priorityStyle = getPriorityBadgeStyle(project.priority);

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(project, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl p-6 sm:p-8 my-8 text-zinc-100">
        {/* Top Header */}
        <div className="flex items-start justify-between pb-4 border-b border-zinc-800 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                {project.status}
              </span>
              <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold border ${priorityStyle.bg}`}>
                {project.priority} Öncelik
              </span>
              <span className="text-xs text-zinc-500 font-mono">ID: {project.id}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">{project.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch (Overview / API JSON) */}
        <div className="flex items-center gap-2 mt-4 pb-2 border-b border-zinc-800 text-xs">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              activeTab === "overview" ? "bg-indigo-600 text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            Genel Bakış
          </button>
          <button
            onClick={() => setActiveTab("api")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
              activeTab === "api" ? "bg-indigo-600 text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>JSON API Yanıtı</span>
          </button>
        </div>

        {/* Content */}
        {activeTab === "overview" ? (
          <div className="mt-4 space-y-5 text-xs sm:text-sm">
            <div>
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">Açıklama</h4>
              <p className="text-zinc-300 leading-relaxed bg-zinc-900/60 p-3.5 rounded-xl border border-zinc-800/80">
                {project.description}
              </p>
            </div>

            {/* Progress */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-semibold text-zinc-300">Geliştirme İlerlemesi</span>
                <span className="font-mono text-cyan-400 font-bold">%{project.progress} Tamamlandı</span>
              </div>
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-zinc-900/40 border border-zinc-800 text-xs">
              <div>
                <span className="text-zinc-500 block">Kategori</span>
                <span className="text-white font-semibold">{project.category}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Proje Sorumlusu</span>
                <span className="text-white font-semibold">{project.lead}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Hedef Tarih</span>
                <span className="text-white font-semibold">{project.dueDate}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Topluluk Yıldızı</span>
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  {project.stars} Star
                </span>
              </div>
              <div>
                <span className="text-zinc-500 block">Oluşturulma</span>
                <span className="text-zinc-300">{formatDate(project.createdAt)}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Son Güncelleme</span>
                <span className="text-zinc-300">{formatDate(project.updatedAt)}</span>
              </div>
            </div>

            {/* Tags */}
            <div>
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Teknoloji Yığını</h4>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-700/80 text-zinc-200 font-mono text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-medium transition"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub Deposuna Git</span>
                  <ExternalLink className="w-3 h-3 text-zinc-400" />
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-600/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-600 hover:text-white font-medium transition"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Canlı Demoyu Aç</span>
                </a>
              )}
            </div>
          </div>
        ) : (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-zinc-400 font-mono">GET /api/projects/{project.id}</span>
              <button
                onClick={handleCopyJson}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Kopyalandı!" : "JSON Kopyala"}</span>
              </button>
            </div>
            <pre className="max-h-72 overflow-y-auto p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-cyan-300 scrollbar-thin">
              {JSON.stringify(project, null, 2)}
            </pre>
          </div>
        )}

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-5 border-t border-zinc-800 mt-6 text-xs">
          <button
            onClick={() => {
              onClose();
              onEdit(project);
            }}
            className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 font-medium transition"
          >
            Bilgileri Düzenle
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
}