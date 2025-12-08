// components/Forms/TaskForm.tsx

import React, { useCallback } from "react";
import { useFlowStore } from "@/context/WorkFlowContext";
import { type NodeProps } from "reactflow";
import type { TaskNodeData, CustomField } from "@/types/flow"; // Import your specific types
import { FaTrash, FaPlusCircle } from "react-icons/fa";

interface TaskFormProps {
  nodeId: string;
  nodeData: TaskNodeData;
}

const TaskForm: React.FC<TaskFormProps> = ({ nodeId, nodeData }) => {
  const { updateNodeData } = useFlowStore();

  // Helper function to update any simple string field (title, assignee, etc.)
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      updateNodeData(nodeId, { [name]: value });
    },
    [nodeId, updateNodeData]
  );

  // --- Dynamic Custom Fields Handlers ---

  // Handler for updating a key or value within a custom field
  const handleCustomFieldChange = useCallback(
    (index: number, field: keyof CustomField, value: string) => {
      const newFields = [...nodeData.customFields];
      newFields[index] = { ...newFields[index], [field]: value };
      updateNodeData(nodeId, { customFields: newFields });
    },
    [nodeId, nodeData.customFields, updateNodeData]
  );

  // Handler for adding a new empty custom field
  const handleAddField = useCallback(() => {
    const newField: CustomField = { key: "", value: "" };
    updateNodeData(nodeId, {
      customFields: [...nodeData.customFields, newField],
    });
  }, [nodeId, nodeData.customFields, updateNodeData]);

  // Handler for removing a custom field by index
  const handleRemoveField = useCallback(
    (index: number) => {
      const newFields = nodeData.customFields.filter((_, i) => i !== index);
      updateNodeData(nodeId, { customFields: newFields });
    },
    [nodeId, nodeData.customFields, updateNodeData]
  );

  return (
    <div className="space-y-4">
      {/* 1. Basic Node Configuration */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Task Title
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
          Assignee
        </label>
        <input
          type="text"
          name="assignee"
          value={nodeData.assignee || ""}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Due Date
        </label>
        <input
          type="date"
          name="dueDate"
          value={nodeData.dueDate || ""}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
        />
      </div>

      {/* 2. Dynamic Custom Fields Section */}
      <h4 className="text-md font-semibold pt-2 border-t mt-4">
        Custom Data Fields
      </h4>
      <p className="text-xs text-gray-500 mb-2">
        Define extra data needed for this task (Key: Value).
      </p>

      {nodeData.customFields.map((field, index) => (
        <div
          key={index}
          className="flex space-x-2 items-center bg-white p-2 border rounded-md"
        >
          <input
            type="text"
            placeholder="Key (e.g., Department)"
            value={field.key}
            onChange={(e) =>
              handleCustomFieldChange(index, "key", e.target.value)
            }
            className="w-1/2 border border-gray-300 rounded-md shadow-sm p-1 text-xs"
          />
          <input
            type="text"
            placeholder="Value"
            value={field.value}
            onChange={(e) =>
              handleCustomFieldChange(index, "value", e.target.value)
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
        <span>Add Field</span>
      </button>
    </div>
  );
};

export default TaskForm;
