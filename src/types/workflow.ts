// types/workflow.ts

interface CustomField {
  key: string;
  value: string;
}

export interface StartNodeData {
  title: string;
  metadata: CustomField[]; // For optional key-value pairs
}

export interface TaskNodeData {
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  customFields: CustomField[];
}

export interface ApprovalNodeData {
  title: string;
  approverRole: "Manager" | "HRBP" | "Director" | string;
  autoApproveThreshold: number; // e.g., 50 (in percentage)
}

export interface AutomatedStepData {
  title: string;
  actionId: string; // e.g., 'send_email'
  actionParams: Record<string, string>; // e.g., { to: 'user.email', subject: 'Welcome' }
}

export interface EndNodeData {
  title: string; // The end message
  summaryFlag: boolean; // Boolean toggle
}
