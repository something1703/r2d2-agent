// TypeScript types for R2D2 Agent

export interface GitHubIssue {
  id: number;
  number: number;
  title: string;
  body: string | null;
  state: 'open' | 'closed';
  html_url: string;
  created_at: string;
  updated_at: string;
  user: {
    login: string;
    avatar_url: string;
  };
  labels: Array<{
    id: number;
    name: string;
    color: string;
  }>;
}

export interface KestraSummaryEntry {
  id: string;
  createdAt: string;
  summary: {
    repositoryName?: string;
    totalIssues?: number;
    openIssues?: number;
    closedIssues?: number;
    recentActivity?: string;
    aiSummary?: string;
    recommendations?: string[];
    [key: string]: any; // Allow flexibility from Kestra
  };
}

export interface KestraExecutionResponse {
  id: string;
  namespace: string;
  flowId: string;
  state: {
    current: string;
    histories: any[];
  };
}

export interface ApiResponse<T = any> {
  ok: boolean;
  data?: T;
  error?: string;
}

export interface AutomationTrigger {
  type: 'manual' | 'scheduled' | 'kestra';
  triggeredAt: string;
  triggeredBy?: string;
  reason?: string;
}
