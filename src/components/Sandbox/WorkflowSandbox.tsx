import React, { useState, useCallback, useMemo } from "react";
import { useFlowStore } from "@/context/WorkFlowContext";
import { simulateWorkflow } from "@/api/simulate";
// import type { AllNodeData } from "@/types/flow";

interface SimulationLogEntry {
  step: number;
  type: "START" | "TASK" | "APPROVAL" | "SYSTEM" | "END" | "ERROR" | string;
  message: string;
}

interface ValidationResult {
  valid: boolean;
  message: string;
}

const WorkflowSandbox: React.FC = () => {
  const [simulationLog, setSimulationLog] = useState<SimulationLogEntry[]>([]);
  const [status, setStatus] = useState<
    "ready" | "loading" | "success" | "error"
  >("ready");

  const { nodes, edges } = useFlowStore();

  const validationResult: ValidationResult = useMemo(() => {
    const startNodes = nodes.filter((n) => n.type === "StartNode");
    // if (startNodes.length === 0) {
    //   return {
    //     valid: false,
    //     message: "Validation Error: Workflow must contain a Start Node.",
    //   };
    // }
    if (startNodes.length > 1) {
      return {
        valid: false,
        message: "Validation Error: Workflow must contain only one Start Node.",
      };
    }

    // 2. Check for at least one End Node
    const endNodes = nodes.filter((n) => n.type === "EndNode");
    // if (endNodes.length === 0) {
    //   return {
    //     valid: false,
    //     message:
    //       "Validation Error: Workflow must contain at least one End Node.",
    //   };
    // }

    // 3. Simple Check for Disconnected Nodes
    const disconnectedNodes = nodes.filter((node) => {
      // Find if the node has any connections (as a source or target)
      const hasIncoming = edges.some((e) => e.target === node.id);
      const hasOutgoing = edges.some((e) => e.source === node.id);

      if (node.type === "StartNode") return !hasOutgoing; // Start must have outgoing
      if (node.type === "EndNode") return !hasIncoming; // End must have incoming

      // Other nodes must have both, or at least one of each (simplified for time)
      return !hasIncoming || !hasOutgoing;
    });

    if (disconnectedNodes.length > 0) {
      console.warn(
        "Disconnected nodes found:",
        disconnectedNodes.map((n) => n.id)
      );
      // You can decide if this should be a soft warning or a hard error:
      // return { valid: false, message: `Validation Error: ${disconnectedNodes.length} nodes are potentially disconnected.` };
    }

    return { valid: true, message: "Structure is valid." };
  }, [nodes, edges]);

  // --- 3. Simulation Handler ---
  const handleSimulate = useCallback(async () => {
    setSimulationLog([]);
    setStatus("loading");

    // Use the validated result from useMemo
    if (!validationResult.valid) {
      setSimulationLog([
        { step: 0, type: "ERROR", message: validationResult.message },
      ]);
      setStatus("error");
      return;
    }

    const workflowGraph = { nodes, edges };

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Call the mock API (simulateWorkflow must return Promise<{ success: boolean, log: SimulationLogEntry[] }>)
      const result = await simulateWorkflow(workflowGraph);

      if (result.success && result.log) {
        setSimulationLog(result.log);
        setStatus("success");
      } else {
        setSimulationLog([
          {
            step: 0,
            type: "API ERROR",
            message: "Simulation failed: No log returned.",
          },
        ]);
        setStatus("error");
      }
    } catch (error: any) {
      // Type the catch error
      console.error("Simulation API call failed:", error);
      setSimulationLog([
        {
          step: 0,
          type: "CRITICAL ERROR",
          message: `API error: ${error.message}`,
        },
      ]);
      setStatus("error");
    }
  }, [nodes, edges, validationResult]);

  // --- 4. UI Logic ---
  // Button State
  const getButtonState = () => {
    switch (status) {
      case "loading":
        return {
          text: "Simulating...",
          class: "bg-gray-500 cursor-not-allowed",
          disabled: true,
        };
      case "success":
        return {
          text: "Simulation Complete!",
          class: "bg-blue-600 hover:bg-blue-700",
          disabled: false,
        };
      case "error":
        return {
          text: "Fix Errors and Re-Simulate",
          class: "bg-red-600 hover:bg-red-700",
          disabled: false,
        };
      default:
        return {
          text: "Simulate Workflow",
          class: "bg-green-600 hover:bg-green-700",
          disabled: false,
        };
    }
  };

  const {
    text: buttonText,
    class: buttonClass,
    disabled: buttonDisabled,
  } = getButtonState();

  // Log Display Content
  const getLogContent = () => {
    if (status === "loading")
      return (
        <p className="text-gray-500 italic">
          Running simulation, please wait...
        </p>
      );
    if (simulationLog.length === 0 && status === "ready")
      return "Mock Execution Log: Waiting for simulation...";

    return (
      <ul className="space-y-1">
        {simulationLog.map((entry, index) => (
          <li
            key={index}
            className={`font-mono text-[10px] ${
              entry.type.includes("ERROR") ? "text-red-700 font-bold" : ""
            }`}
          >
            [{entry.step}] {entry.message}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="p-2 border border-dashed border-gray-400 rounded bg-white flex-1 flex flex-col">
      <p className="font-medium text-sm">Workflow Testing Sandbox</p>

      <button
        className={`mt-2 w-full py-1 px-4 text-white rounded transition ${buttonClass}`}
        onClick={handleSimulate}
        disabled={buttonDisabled}
      >
        {buttonText}
      </button>

      <p
        className={`mt-2 text-xs ${
          validationResult.valid ? "text-green-600" : "text-red-600"
        }`}
      >
        Status: {validationResult.message}
      </p>

      <div className="mt-2 p-2 border border-gray-200 h-full overflow-y-auto text-xs bg-gray-50">
        {getLogContent()}
      </div>
    </div>
  );
};

export default WorkflowSandbox;
