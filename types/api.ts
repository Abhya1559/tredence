import type { WorkflowNodeType, WorkflowNodeData } from "./workflow";

export interface SerializedWorkflowNode {
  id: string;
  type: WorkflowNodeType;
  data: WorkflowNodeData;
}

export interface SerializedWorkflowEdge {
  id: string;
  source: string;
  target: string;
}

export interface SerializedWorkflow {
  nodes: SerializedWorkflowNode[];
  edges: SerializedWorkflowEdge[];
}
