import type { Node, Edge } from "reactflow";

export type WorkflowNodeType =
  | "start"
  | "task"
  | "approval"
  | "automated"
  | "end";

export interface WorkflowNodeData {
  // Common
  title?: string;

  // Start
  metadata?: Record<string, string>;

  // Task
  description?: string;
  assignee?: string;
  dueDate?: string;
  customFields?: Record<string, string>;

  // Approval
  approverRole?: string;
  autoApproveThreshold?: number;

  // Automated
  actionId?: string;
  actionParams?: Record<string, string>;

  // End
  endMessage?: string;
  summary?: boolean;

  // For validation display etc.
  hasError?: boolean;
}

export type AppNode = Node<WorkflowNodeData>;
export type AppEdge = Edge;

export interface WorkflowSimulationResponse {
  steps: string[];
}
