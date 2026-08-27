"use client";

import React, { useState, useEffect } from "react";
import { X, Sparkles, AlertCircle } from "lucide-react";
import { Project, ProjectCategory, ProjectPriority, ProjectStatus } from "@/lib/types";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => Promise<boolean>;
  editingProject?: Project | null;
}

const CATEGORIES: ProjectCategory[] = [
  "Full-Stack",
  "AI & ML",
  "Cloud & DevOps",
  "Mobile",
  "Security",
  "Web3"
];

const STATUSES: ProjectStatus[] = ["Planning", "In Progress", "In Review", "Completed"];
const PRIORITIES: ProjectPriority[] = ["Low", "Medium", "High", "Critical"];

export function ProjectModal({ isOpen, onClose, onSave, editingProject }: ProjectModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<ProjectCategory>("Full-Stack");
  const [status, setStatus] = useState<ProjectStatus>("Planning");
  const [priority, setPriority] = useState<ProjectPriority>("Medium");
  const [progress, setProgress] = useState(25);
  const [tagsInput, setTagsInput] = useState("Next.js, TypeScript, Tailwind");
  const [lead, setLead] = useState("Yağız Kaan");
  const [dueDate, setDueDate] = useState("2026-10-01");
  const [githubUrl, setGithubUrl] = useState("https://github.com/Yagzk/new-repo");
  const [demoUrl, setDemoUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingProject) {
      setTitle(editingProject.title);
      setDescription(editingProject.description);
      setCategory(editingProject.category);
      setStatus(editingProject.status);
      setPriority(editingProject.priority);
      setProgress(editingProject.progress);
      setTagsInput(editingProject.tags.join(", "));
      setLead(editingProject.lead);
      setDueDate(editingProject.dueDate);
      setGithubUrl(editingProject.githubUrl || "");
      setDemoUrl(editingProject.demoUrl || "");
    } else {
      setTitle("");
      setDescription("");
      setCategory("Full-Stack");
      setStatus("Planning");
      setPriority("Medium");
      setProgress(20);
      setTagsInput("Next.js, TypeScript, Tailwind");
      setLead("Yağız Kaan");
      setDueDate("2026-10-15");
      setGithubUrl("https://github.com/Yagzk/");
      setDemoUrl("");
    }
    setError("");
  }, [editingProject, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError("Lütfen başlık ve açıklama alanlarını doldurunuz.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      title,
      description,
      category,
      status,
      priority,
      progress: Number(progress),
      tags,
      lead,
      dueDate,
      githubUrl: githubUrl.trim() || undefined,
      demoUrl: demoUrl.trim() || undefined
    };

    const success = await onSave(payload);
    setIsSubmitting(false);
    if (success) {
      onClose();
    } else {
      setError("Proje kaydedilirken bir hata oluştu.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl p-6 sm:p-8 my-8 text-zinc-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                {editingProject ? "Projeyi Düzenle" : "Yeni Proje Ekle"}
              </h2>
              <p className="text-xs text-zinc-400">
                REST API üzerinden canlı veri tabanına kaydedilir.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
          <div>
            <label className="block text-zinc-300 font-semibold mb-1.5">Proje Başlığı *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Örn: QuantumAuth - Modern Kimlik Doğrulama"
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-zinc-300 font-semibold mb-1.5">Açıklama *</label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Projenin amacı, kullanılan mimari ve hedefleri..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-zinc-300 font-semibold mb-1.5">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProjectCategory)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-cyan-500"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-zinc-300 font-semibold mb-1.5">Durum</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ProjectStatus)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-cyan-500"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-zinc-300 font-semibold mb-1.5">Öncelik</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as ProjectPriority)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-cyan-500"
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Progress Slider */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-zinc-300 font-semibold">İlerleme Oranı</label>
              <span className="font-mono text-cyan-400 font-bold">%{progress}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="w-full accent-cyan-400 bg-zinc-800 h-2 rounded-lg cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-zinc-300 font-semibold mb-1.5">Proje Lideri / Ekip</label>
              <input
                type="text"
                value={lead}
                onChange={(e) => setLead(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white"
              />
            </div>
            <div>
              <label className="block text-zinc-300 font-semibold mb-1.5">Hedef Teslim Tarihi</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-zinc-300 font-semibold mb-1.5">Teknoloji Etiketleri (virgülle ayırın)</label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="Next.js, TypeScript, PostgreSQL, Tailwind"
              className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-zinc-300 font-semibold mb-1.5">GitHub Depo URL</label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/..."
                className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white"
              />
            </div>
            <div>
              <label className="block text-zinc-300 font-semibold mb-1.5">Canlı Demo URL (Opsiyonel)</label>
              <input
                type="url"
                value={demoUrl}
                onChange={(e) => setDemoUrl(e.target.value)}
                placeholder="https://proje-demo.vercel.app"
                className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white"
              />
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-medium transition"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold shadow-lg shadow-cyan-500/20 transition active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? "Kaydediliyor..." : editingProject ? "Değişiklikleri Kaydet" : "Projeyi Oluştur"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
