// components/FlowCanvas/FlowCanvas.tsx

import React, { useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  useReactFlow,
  type Node,
  type OnNodeClick,
} from "reactflow";
import "reactflow/dist/style.css";

import StartNode from "@/components/Nodes/StarterNode";
import TaskNode from "@/components/Nodes/TaskNodes";
import ApprovalNode from "@/components/Nodes/ApprovalNodes";
import AutomatedStepNode from "@/components/Nodes/AutomatedNode";
import EndNode from "@/components/Nodes/EndNode";

import { useFlowStore } from "@/context/WorkFlowContext";
import type { AllNodeData } from "@/types/flow";

const nodeTypes = {
  StartNode: StartNode,
  TaskNode: TaskNode,
  ApprovalNode: ApprovalNode,
  AutomatedStepNode: AutomatedStepNode,
  EndNode: EndNode,
};

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
      throw new Error(`Unknown node type: ${type}`);
  }
};

const FlowCanvas: React.FC = () => {
  const reactFlowInstance = useReactFlow();

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

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      console.log(type);

      if (!type || !nodeTypes[type as keyof typeof nodeTypes]) {
        console.error(`Attempted to drop unknown node type: ${type}`);
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

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

  const onNodeClick: OnNodeClick = useCallback(
    (event: any, node: any) => {
      event.stopPropagation();
      setSelectedNode(node.id);
    },
    [setSelectedNode]
  );

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
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        onDragOver={onDragOver}
        onDrop={onDrop}
        fitView
      />
    </div>
  );
};

const FlowCanvasWrapper: React.FC = () => (
  <ReactFlowProvider>
    <FlowCanvas />
  </ReactFlowProvider>
);

export default FlowCanvasWrapper;
