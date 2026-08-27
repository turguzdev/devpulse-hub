export type ProjectCategory = 'Full-Stack' | 'AI & ML' | 'Cloud & DevOps' | 'Mobile' | 'Security' | 'Web3';

export type ProjectStatus = 'Planning' | 'In Progress' | 'In Review' | 'Completed';

export type ProjectPriority = 'Low' | 'Medium' | 'High' | 'Critical';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  status: ProjectStatus;
  priority: ProjectPriority;
  progress: number; // 0 - 100
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  stars: number;
  lead: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityLog {
  id: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'STATUS_CHANGE' | 'FEEDBACK';
  projectId?: string;
  projectTitle?: string;
  details: string;
  timestamp: string;
}

export interface FeedbackItem {
  id: string;
  name: string;
  email: string;
  type: 'Feedback' | 'Bug Report' | 'Feature Request' | 'General';
  message: string;
  rating: number;
  createdAt: string;
}

export interface StatsResponse {
  totalProjects: number;
  completedProjects: number;
  inProgressProjects: number;
  planningProjects: number;
  inReviewProjects: number;
  totalStars: number;
  averageProgress: number;
  categoryBreakdown: Record<ProjectCategory, number>;
  priorityBreakdown: Record<ProjectPriority, number>;
  recentActivities: ActivityLog[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}
