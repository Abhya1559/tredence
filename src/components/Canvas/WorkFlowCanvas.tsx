// components/FlowCanvas/FlowCanvas.tsx

import React, { useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  useReactFlow,
  type Node,
  type OnNodeClick,
} from "reactflow";
import "reactflow/dist/style.css";

// 2. Import all custom node components
import StartNode from "@/components/Nodes/StarterNode";
import TaskNode from "@/components/Nodes/TaskNodes";
import ApprovalNode from "@/components/Nodes/ApprovalNodes";
import AutomatedStepNode from "@/components/Nodes/AutomatedNode";
import EndNode from "@/components/Nodes/EndNode";

// Import your custom state store and necessary types
import { useFlowStore } from "@/context/WorkFlowContext";
import type { AllNodeData } from "@/types/flow";

// Map the string node types to the actual components
const nodeTypes = {
  StartNode: StartNode,
  TaskNode: TaskNode,
  ApprovalNode: ApprovalNode,
  AutomatedStepNode: AutomatedStepNode,
  EndNode: EndNode,
};

// Helper function to initialize data for the new nodes
const getInitialNodeData = (type: string): AllNodeData => {
  switch (type) {
    case "StartNode":
      return { title: "Workflow Start", metadata: [] } as AllNodeData;
    case "TaskNode":
      return {
        title: "New Task",
        description: "",
        assignee: "",
        dueDate: "",
        customFields: [],
      } as AllNodeData;
    case "ApprovalNode":
      return {
        title: "Awaiting Approval",
        approverRole: "Manager",
        autoApproveThreshold: 100,
      } as AllNodeData;
    case "AutomatedStepNode":
      return {
        title: "System Action",
        actionId: "",
        actionParams: {},
      } as AllNodeData;
    case "EndNode":
      return { title: "Workflow Complete", summaryFlag: false } as AllNodeData;
    default:
      // Fallback is necessary for type safety when using a switch statement without exhaustive checking
      throw new Error(`Unknown node type: ${type}`);
  }
};

const FlowCanvas: React.FC = () => {
  // Explicitly define as React Functional Component
  // Access the flow instance for projection
  const reactFlowInstance = useReactFlow();

  // 3. Connect to the State Store (useFlowStore)
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    setSelectedNode,
    onConnect: handleConnect,
    addNode,
  } = useFlowStore();

  const onConnect = handleConnect;

  // --- Drag and Drop Handlers ---

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      // 1. Get the type string from the sidebar item
      const type = event.dataTransfer.getData("application/reactflow");
      console.log(type);
      // Check if the type is a known node type before proceeding
      if (!type || !nodeTypes[type as keyof typeof nodeTypes]) {
        console.error(`Attempted to drop unknown node type: ${type}`);
        return;
      }

      // 2. Calculate position relative to the flow canvas (accounting for zoom/pan)
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      // 3. Create the new node object
      const newNode: Node<AllNodeData> = {
        id: Date.now().toString(),
        type,
        position,
        data: getInitialNodeData(type),
      };
      addNode(newNode);
      setSelectedNode(newNode.id);
    },
    [reactFlowInstance, addNode, setSelectedNode]
  );
  // --- End Drag and Drop Handlers ---

  const onNodeClick: OnNodeClick = useCallback(
    (event: any, node: any) => {
      event.stopPropagation();
      setSelectedNode(node.id);
    },
    [setSelectedNode]
  );

  // Handler for clicking the canvas background (deselecting)
  const onPaneClick = () => {
    setSelectedNode(null);
  };

  return (
    <div style={{ flexGrow: 1, height: "100%", width: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect} // Handler for drawing new edges
        onNodeClick={onNodeClick} // <-- Cleaned up type error
        onPaneClick={onPaneClick} // Handler to deselect node
        nodeTypes={nodeTypes} // Registers your custom components
        // --- D&D Integration ---
        onDragOver={onDragOver}
        onDrop={onDrop}
        // --- End D&D Integration ---

        fitView // Ensures the flow fits within the view on load
        // defaultZoom={1}
      />
    </div>
  );
};

// The FlowCanvasWrapper must remain to wrap FlowCanvas in the ReactFlowProvider.
const FlowCanvasWrapper: React.FC = () => (
  <ReactFlowProvider>
    <FlowCanvas />
  </ReactFlowProvider>
);

export default FlowCanvasWrapper;
