// components/Forms/AutomatedStepForm.tsx

import React, { useState, useEffect, useCallback } from "react";
import { useFlowStore } from "@/context/WorkFlowContext";
import type { AutomatedStepData } from "@/types/flow";
import { getMockAutomations } from "@/api/automation"; // Assuming you create this mock API file

interface AutomationAction {
  id: string;
  name: string;
  description: string;
  params: { name: string; type: "string" | "number" | "email" }[];
}

interface AutomatedStepFormProps {
  nodeId: string;
  nodeData: AutomatedStepData;
}

const AutomatedStepForm: React.FC<AutomatedStepFormProps> = ({
  nodeId,
  nodeData,
}) => {
  const { updateNodeData } = useFlowStore();
  const [actions, setActions] = useState<AutomationAction[]>([]);
  const [loading, setLoading] = useState(true);

  // --- 1. Fetch Dynamic Actions from Mock API ---
  useEffect(() => {
    // In a real app, this would be an actual API call (e.g., fetch('/api/v1/automations'))
    getMockAutomations().then((data: any) => {
      setActions(data);
      setLoading(false);

      // Initialize actionParams if an action is already selected but params are missing
      if (nodeData.actionId && !nodeData.actionParams) {
        const initialAction = data.find((a: any) => a.id === nodeData.actionId);
        if (initialAction) {
          const initialParams = initialAction.params.reduce(
            (acc: any, param: any) => {
              acc[param.name] = ""; // Initialize required parameters to empty string
              return acc;
            },
            {} as { [key: string]: string }
          );
          updateNodeData(nodeId, { actionParams: initialParams });
        }
      }
    });
  }, [nodeId, nodeData.actionId, nodeData.actionParams, updateNodeData]);

  // --- 2. Handlers ---

  // Handler for basic field updates (Title)
  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateNodeData(nodeId, { title: e.target.value });
    },
    [nodeId, updateNodeData]
  );

  // Handler for changing the selected automation action
  const handleActionSelect = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedActionId = e.target.value;
      const selectedAction = actions.find((a) => a.id === selectedActionId);

      const newParams = selectedAction
        ? selectedAction.params.reduce((acc, param) => {
            acc[param.name] = ""; // Reset parameters for the new action
            return acc;
          }, {} as { [key: string]: string })
        : {};

      updateNodeData(nodeId, {
        actionId: selectedActionId,
        actionParams: newParams,
      });
    },
    [nodeId, actions, updateNodeData]
  );

  // Handler for updating dynamic action parameters
  const handleParamChange = useCallback(
    (paramName: string, value: string) => {
      updateNodeData(nodeId, {
        actionParams: {
          ...nodeData.actionParams,
          [paramName]: value,
        },
      });
    },
    [nodeId, nodeData.actionParams, updateNodeData]
  );

  const selectedAction = actions.find((a) => a.id === nodeData.actionId);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Step Title
        </label>
        <input
          type="text"
          name="title"
          value={nodeData.title || ""}
          onChange={handleTitleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
        />
      </div>

      <h4 className="text-md font-semibold pt-2 border-t mt-4">
        Automation Action
      </h4>

      {/* Action Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Select Service
        </label>
        {loading ? (
          <p className="text-sm text-gray-500 italic">Loading actions...</p>
        ) : (
          <select
            name="actionId"
            value={nodeData.actionId || ""}
            onChange={handleActionSelect}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
          >
            <option value="">-- Choose an action --</option>
            {actions.map((action) => (
              <option key={action.id} value={action.id}>
                {action.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Dynamic Parameters Rendering (KEY REQUIREMENT) */}
      {selectedAction && (
        <div className="bg-blue-50 p-3 rounded-md border border-blue-200 space-y-3">
          <p className="text-xs font-semibold text-blue-700">
            Parameters for: {selectedAction.name}
          </p>

          {selectedAction.params.map((param) => (
            <div key={param.name}>
              <label className="block text-xs font-medium text-gray-700">
                {param.name}
              </label>
              <input
                type={param.type === "email" ? "email" : param.type}
                placeholder={`Enter ${param.name}`}
                value={nodeData.actionParams[param.name] || ""}
                onChange={(e) => handleParamChange(param.name, e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-1 text-xs"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutomatedStepForm;
