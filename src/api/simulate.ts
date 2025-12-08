// api/simulate.ts

interface NodeData {
  title: string;
  [key: string]: any;
}

interface WorkflowNode {
  id: string;
  type: string;
  data: NodeData;
  [key: string]: any;
}

interface WorkflowGraph {
  nodes: WorkflowNode[];
  edges: any[];
}

interface SimulationLogEntry {
  step: number;
  type: string;
  message: string;
}

interface SimulationResult {
  success: boolean;
  log: SimulationLogEntry[];
}

export const simulateWorkflow = (
  workflowGraph: WorkflowGraph
): Promise<SimulationResult> => {
  const startNodeTitle =
    workflowGraph.nodes.find((n) => n.type === "StartNode")?.data.title ||
    "Untitled Workflow";

  const log: SimulationLogEntry[] = [
    {
      step: 1,
      type: "START",
      message: `Workflow started: "${startNodeTitle}"`,
    },
    {
      step: 2,
      type: "TASK",
      message: `Task 'Collect Documents' assigned to HR Admin (Due: 2025-12-15).`,
    },
    {
      step: 3,
      type: "APPROVAL",
      message: `Waiting for 'Manager' approval. Auto-approve threshold is 80%.`,
    },
    {
      step: 4,
      type: "SYSTEM",
      message: `Automated step: Email sent to recipient using SendGrid.`,
    },
    {
      step: 5,
      type: "END",
      message: `Workflow completed successfully. Summary generated.`,
    },
  ];
  return Promise.resolve({
    success: true,
    log: log,
  });
};
