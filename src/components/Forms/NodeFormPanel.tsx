// components/Forms/NodeFormPanel.jsx

import React from "react";
import { useFlowStore } from "@/context/WorkFlowContext"; // To check for selected node

const NodeFormPanel = () => {
  const { selectedNodeId } = useFlowStore();

  // The real panel will dynamically render a form here.
  return (
    <div className="p-2 border border-dashed border-gray-400 rounded bg-white h-1/2">
      <p className="font-medium text-sm">Node Configuration Panel</p>
      {selectedNodeId ? (
        <p className="text-sm mt-2 text-blue-600">
          Selected Node ID: **{selectedNodeId}**
        </p>
      ) : (
        <p className="text-sm mt-2 text-gray-500 italic">
          Select a node on the canvas to configure it.
        </p>
      )}
      {/* The individual node forms (TaskForm, ApprovalForm, etc.) will go here */}
    </div>
  );
};

export default NodeFormPanel;
