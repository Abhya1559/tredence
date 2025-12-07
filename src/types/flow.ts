// /types/flow.ts

import type {
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  Connection,
} from "reactflow";
import type {
  StartNodeData,
  TaskNodeData,
  ApprovalNodeData,
  AutomatedStepData,
  EndNodeData,
} from "./workflow"; // Import your specific node data types

// A union type for all possible node data structures
export type AllNodeData =
  | StartNodeData
  | TaskNodeData
  | ApprovalNodeData
  | AutomatedStepData
  | EndNodeData;

export interface FlowState {
  nodes: Node<AllNodeData>[];
  edges: Edge[];
  selectedNodeId: string | null;
}

export interface FlowActions {
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: (connection: Connection) => void;
  setNodes: React.Dispatch<React.SetStateAction<Node<AllNodeData>[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  setSelectedNode: (id: string | null) => void;
  /** Updates the data property of a specific node. */
  updateNodeData: (id: string, data: Partial<AllNodeData>) => void;
  /** Adds a new node to the flow */
  addNode: (node: Node<AllNodeData>) => void;
}

export type FlowContextType = FlowState & FlowActions;

// --- Initial Mock Data for testing (Optional) ---
export const initialNodes: Node<AllNodeData>[] = [
  {
    id: "start-1",
    type: "StartNode",
    position: { x: 250, y: 5 },
    data: { title: "New Employee Onboarding", metadata: [] } as StartNodeData,
  },
  // Add other initial nodes here for testing the canvas
];

export const initialEdges: Edge[] = [];
