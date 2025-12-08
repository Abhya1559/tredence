// components/Forms/NodeFormPanel.tsx (FINAL VERSION)

import { useFlowStore } from "@/context/WorkFlowContext";
import React from "react";
// Import all necessary node data types
import type {
  TaskNodeData,
  StartNodeData,
  ApprovalNodeData,
  AutomatedStepData,
  EndNodeData,
} from "@/types/flow";

// Import all configuration forms
import TaskForm from "./TaskForm";
import StartForm from "./StartForm";
import ApprovalForm from "./ApprovalForm";
import AutomatedStepForm from "./AutomatedForm";
import EndForm from "./EndForm";

const NodeFormPanel: React.FC = () => {
  const { selectedNodeId, nodes } = useFlowStore();

  const selectedNode = selectedNodeId
    ? nodes.find((n) => n.id === selectedNodeId)
    : null;

  // --- Form Renderer ---
  const renderForm = () => {
    if (!selectedNode) {
      return (
        <p className="text-sm mt-2 text-gray-500 italic">
          Select a node on the canvas to configure it.
        </p>
      );
    }

    // Router: Determine which configuration form to render based on the node's type
    switch (selectedNode.type) {
      case "StartNode":
        return (
          <StartForm
            nodeId={selectedNode.id}
            nodeData={selectedNode.data as StartNodeData}
          />
        );

      case "TaskNode":
        return (
          <TaskForm
            nodeId={selectedNode.id}
            nodeData={selectedNode.data as TaskNodeData}
          />
        );

      case "ApprovalNode":
        return (
          <ApprovalForm
            nodeId={selectedNode.id}
            nodeData={selectedNode.data as ApprovalNodeData}
          />
        );

      case "AutomatedStepNode":
        return (
          <AutomatedStepForm
            nodeId={selectedNode.id}
            nodeData={selectedNode.data as AutomatedStepData}
          />
        );

      case "EndNode":
        return (
          <EndForm
            nodeId={selectedNode.id}
            nodeData={selectedNode.data as EndNodeData}
          />
        );

      default:
        return (
          <p className="text-sm mt-2 text-red-500">
            Error: Unknown node type selected.
          </p>
        );
    }
  };

  return (
    <div className="p-2 border border-dashed border-gray-400 rounded bg-white h-full overflow-y-auto">
      <h3 className="font-medium text-lg mb-4">Node Configuration Panel</h3>

      {renderForm()}
    </div>
  );
};

export default NodeFormPanel;
