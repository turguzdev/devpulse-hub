import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ProjectPriority, ProjectStatus } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("tr-TR", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).format(date);
  } catch {
    return dateString;
  }
}

export function getStatusBadgeStyle(status: ProjectStatus): { bg: string; text: string; border: string; dot: string } {
  switch (status) {
    case "Completed":
      return { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20", dot: "bg-emerald-400" };
    case "In Progress":
      return { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20", dot: "bg-blue-400 animate-pulse" };
    case "In Review":
      return { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20", dot: "bg-amber-400" };
    case "Planning":
      return { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20", dot: "bg-purple-400" };
    default:
      return { bg: "bg-zinc-500/10", text: "text-zinc-400", border: "border-zinc-500/20", dot: "bg-zinc-400" };
  }
}

export function getPriorityBadgeStyle(priority: ProjectPriority): { bg: string; text: string } {
  switch (priority) {
    case "Critical":
      return { bg: "bg-rose-500/15 border-rose-500/30 text-rose-400", text: "text-rose-400" };
    case "High":
      return { bg: "bg-orange-500/15 border-orange-500/30 text-orange-400", text: "text-orange-400" };
    case "Medium":
      return { bg: "bg-amber-500/15 border-amber-500/30 text-amber-400", text: "text-amber-400" };
    case "Low":
      return { bg: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400", text: "text-emerald-400" };
    default:
      return { bg: "bg-zinc-500/15 border-zinc-500/30 text-zinc-400", text: "text-zinc-400" };
  }
}
