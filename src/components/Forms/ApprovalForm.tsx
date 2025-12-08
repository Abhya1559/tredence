// components/Forms/ApprovalForm.tsx

import React, { useCallback } from "react";
import { useFlowStore } from "@/context/WorkFlowContext";
import type { ApprovalNodeData } from "@/types/flow";

interface ApprovalFormProps {
  nodeId: string;
  nodeData: ApprovalNodeData;
}

const ApprovalForm: React.FC<ApprovalFormProps> = ({ nodeId, nodeData }) => {
  const { updateNodeData } = useFlowStore();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;

      let updatedValue: string | number = value;

      // Convert number inputs correctly
      if (type === "number") {
        updatedValue = parseFloat(value) || 0;
      }

      updateNodeData(nodeId, { [name]: updatedValue });
    },
    [nodeId, updateNodeData]
  );

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Approval Step Title
        </label>
        <input
          type="text"
          name="title"
          value={nodeData.title || ""}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Approver Role
        </label>
        <select
          name="approverRole"
          value={nodeData.approverRole || "Manager"}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
        >
          <option value="Manager">Manager</option>
          <option value="Finance">Finance</option>
          <option value="Executive">Executive</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Auto-Approve Threshold (%)
        </label>
        <input
          type="number"
          name="autoApproveThreshold"
          value={nodeData.autoApproveThreshold || 0}
          onChange={handleChange}
          min="0"
          max="100"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
        />
        <p className="text-xs text-gray-500 mt-1">
          If approval score meets this percentage, the step is automatically
          approved.
        </p>
      </div>
    </div>
  );
};

export default ApprovalForm;
