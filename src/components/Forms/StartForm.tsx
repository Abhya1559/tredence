// components/Forms/StartForm.tsx

import React, { useCallback } from "react";
import { useFlowStore } from "@/context/WorkFlowContext";
import type { StartNodeData, CustomField } from "@/types/flow";
import { FaTrash, FaPlusCircle } from "react-icons/fa";

interface StartFormProps {
  nodeId: string;
  nodeData: StartNodeData;
}

const StartForm: React.FC<StartFormProps> = ({ nodeId, nodeData }) => {
  const { updateNodeData } = useFlowStore();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateNodeData(nodeId, { title: e.target.value });
    },
    [nodeId, updateNodeData]
  );

  const handleMetadataChange = useCallback(
    (index: number, field: keyof CustomField, value: string) => {
      const newMetadata = [...nodeData.metadata];
      newMetadata[index] = { ...newMetadata[index], [field]: value };
      updateNodeData(nodeId, { metadata: newMetadata });
    },
    [nodeId, nodeData.metadata, updateNodeData]
  );

  const handleAddField = useCallback(() => {
    const newField: CustomField = { key: "", value: "" };
    updateNodeData(nodeId, { metadata: [...nodeData.metadata, newField] });
  }, [nodeId, nodeData.metadata, updateNodeData]);

  const handleRemoveField = useCallback(
    (index: number) => {
      const newMetadata = nodeData.metadata.filter((_, i) => i !== index);
      updateNodeData(nodeId, { metadata: newMetadata });
    },
    [nodeId, nodeData.metadata, updateNodeData]
  );

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Workflow Title
        </label>
        <input
          type="text"
          name="title"
          value={nodeData.title || ""}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
        />
      </div>

      <h4 className="text-md font-semibold pt-2 border-t mt-4">
        Initial Workflow Metadata
      </h4>
      <p className="text-xs text-gray-500 mb-2">
        Data fields attached when the workflow starts.
      </p>

      {nodeData.metadata.map((field, index) => (
        <div
          key={index}
          className="flex space-x-2 items-center bg-white p-2 border rounded-md"
        >
          <input
            type="text"
            placeholder="Key"
            value={field.key}
            onChange={(e) => handleMetadataChange(index, "key", e.target.value)}
            className="w-1/2 border border-gray-300 rounded-md shadow-sm p-1 text-xs"
          />
          <input
            type="text"
            placeholder="Value"
            value={field.value}
            onChange={(e) =>
              handleMetadataChange(index, "value", e.target.value)
            }
            className="w-1/2 border border-gray-300 rounded-md shadow-sm p-1 text-xs"
          />
          <button
            onClick={() => handleRemoveField(index)}
            className="text-red-500 hover:text-red-700 p-1"
            title="Remove field"
          >
            <FaTrash size={12} />
          </button>
        </div>
      ))}

      <button
        onClick={handleAddField}
        className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800 transition"
      >
        <FaPlusCircle size={14} />
        <span>Add Metadata Field</span>
      </button>
    </div>
  );
};

export default StartForm;
