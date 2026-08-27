"use client";

import React, { useState } from "react";
import { 
  Star, 
  ExternalLink, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  Calendar, 
  User, 
  Tag, 
  ArrowRightCircle,
  Eye
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { Project, ProjectStatus } from "@/lib/types";
import { formatDate, getPriorityBadgeStyle, getStatusBadgeStyle } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, newStatus: ProjectStatus) => void;
  onStar: (id: string, currentStars: number) => void;
  onViewDetails: (project: Project) => void;
}

export function ProjectCard({
  project,
  onEdit,
  onDelete,
  onStatusChange,
  onStar,
  onViewDetails
}: ProjectCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isStarring, setIsStarring] = useState(false);

  const statusStyle = getStatusBadgeStyle(project.status);
  const priorityStyle = getPriorityBadgeStyle(project.priority);

  const handleStarClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isStarring) return;
    setIsStarring(true);
    await onStar(project.id, project.stars);
    setTimeout(() => setIsStarring(false), 500);
  };

  const nextStatusMap: Record<ProjectStatus, ProjectStatus> = {
    Planning: "In Progress",
    "In Progress": "In Review",
    "In Review": "Completed",
    Completed: "Planning"
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-zinc-800/90 bg-zinc-900/60 p-5 hover:border-zinc-700 hover:bg-zinc-900/90 transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/5">
      {/* Top Header info */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            {/* Status Pill */}
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
              {project.status}
            </span>

            {/* Priority Pill */}
            <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider border ${priorityStyle.bg}`}>
              {project.priority}
            </span>

            {/* Category */}
            <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-zinc-800 text-zinc-300 border border-zinc-700/50">
              {project.category}
            </span>
          </div>

          {/* Quick Menu */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
              title="İşlemler"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {menuOpen && (
              <>
                <div className="fixed inset-0 z-20" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 top-7 z-30 w-44 rounded-xl bg-zinc-950 border border-zinc-800 p-1.5 shadow-2xl space-y-0.5 text-xs">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onViewDetails(project);
                    }}
                    className="flex items-center gap-2 w-full px-2.5 py-1.5 rounded-lg text-zinc-300 hover:bg-zinc-800 transition"
                  >
                    <Eye className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Detayları İncele</span>
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onEdit(project);
                    }}
                    className="flex items-center gap-2 w-full px-2.5 py-1.5 rounded-lg text-zinc-300 hover:bg-zinc-800 transition"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-blue-400" />
                    <span>Düzenle</span>
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onStatusChange(project.id, nextStatusMap[project.status]);
                    }}
                    className="flex items-center gap-2 w-full px-2.5 py-1.5 rounded-lg text-zinc-300 hover:bg-zinc-800 transition"
                  >
                    <ArrowRightCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Sonraki Aşamaya Taşı</span>
                  </button>
                  <div className="my-1 border-t border-zinc-800" />
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onDelete(project.id);
                    }}
                    className="flex items-center gap-2 w-full px-2.5 py-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Projeyi Sil</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 
          onClick={() => onViewDetails(project)}
          className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 cursor-pointer transition line-clamp-1"
        >
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-zinc-400 text-xs sm:text-sm mt-2 line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap items-center gap-1.5 mt-3.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-mono bg-zinc-950 text-zinc-300 border border-zinc-800"
            >
              <Tag className="w-2.5 h-2.5 text-cyan-400/70" />
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Progress & Bottom Metadata */}
      <div className="mt-5 pt-4 border-t border-zinc-800/70">
        {/* Progress Bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-zinc-400 font-medium">İlerleme Oranı</span>
            <span className="font-bold text-zinc-200">%{project.progress}</span>
          </div>
          <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 transition-all duration-500"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        {/* Meta details & Actions */}
        <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1" title="Proje Lideri">
              <User className="w-3.5 h-3.5 text-zinc-500" />
              <span className="truncate max-w-[100px]">{project.lead}</span>
            </span>
            <span className="flex items-center gap-1 text-[11px]" title="Teslim Tarihi">
              <Calendar className="w-3 h-3 text-zinc-500" />
              {project.dueDate}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Stars Button */}
            <button
              onClick={handleStarClick}
              disabled={isStarring}
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-amber-300 text-xs font-semibold transition active:scale-90"
              title="Yıldız Ver"
            >
              <Star className="w-3.5 h-3.5 fill-amber-300" />
              <span>{project.stars}</span>
            </button>

            {/* GitHub */}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition"
                title="Kaynak Kod (GitHub)"
              >
                <GithubIcon className="w-3.5 h-3.5" />
              </a>
            )}

            {/* Live Demo */}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-600 hover:text-white transition"
                title="Canlı Demo"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}