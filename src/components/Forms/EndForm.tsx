// components/Forms/EndForm.tsx

import React, { useCallback } from "react";
import { useFlowStore } from "@/context/WorkFlowContext";
import type { EndNodeData } from "@/types/flow";

interface EndFormProps {
  nodeId: string;
  nodeData: EndNodeData;
}

const EndForm: React.FC<EndFormProps> = ({ nodeId, nodeData }) => {
  const { updateNodeData } = useFlowStore();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value, type, checked } = e.target;

      // Handle checkbox for boolean value
      const updatedValue = type === "checkbox" ? checked : value;

      updateNodeData(nodeId, { [name]: updatedValue });
    },
    [nodeId, updateNodeData]
  );

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Completion Message Title
        </label>
        <input
          type="text"
          name="title"
          value={nodeData.title || ""}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
        />
      </div>

      <div className="flex items-center space-x-2 border p-3 rounded-md bg-green-50">
        <input
          type="checkbox"
          name="summaryFlag"
          checked={nodeData.summaryFlag || false}
          onChange={handleChange}
          className="h-4 w-4 text-green-600 border-gray-300 rounded"
        />
        <label className="text-sm font-medium text-gray-700">
          Generate Final Summary Report
        </label>
      </div>
      <p className="text-xs text-gray-500">
        Checking this generates a comprehensive output log upon workflow
        completion.
      </p>
    </div>
  );
};

export default EndForm;
