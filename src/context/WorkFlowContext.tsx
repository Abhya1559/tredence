// /state/useFlowStore.tsx

import React, { createContext, useContext, useState, useCallback } from "react";
import {
  addEdge,
  useEdgesState,
  useNodesState,
  type Connection,
  type Node,
} from "reactflow";
import {
  initialNodes,
  initialEdges,
  type FlowContextType,
  type AllNodeData,
} from "../types/flow";

// Define the context with an initial null value. The Provider will set the actual value.
const FlowContext = createContext<FlowContextType | undefined>(undefined);

export const FlowProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // 1. Core React Flow state handlers
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  // 2. Custom Handlers (Actions)

  // Handler for connecting nodes (creating edges)
  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges]
  );

  // Handler for tracking which node is clicked/selected
  const setSelectedNode = useCallback((id: string | null) => {
    setSelectedNodeId(id);
  }, []);

  // Handler to update a node's data (used by configuration forms)
  const updateNodeData = useCallback(
    (id: string, data: Partial<AllNodeData>) => {
      setNodes((prevNodes) =>
        prevNodes.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              data: {
                ...node.data,
                ...data,
              },
            } as Node<AllNodeData>;
          }
          return node;
        })
      );
    },
    [setNodes]
  );

  // Handler to add a new node (used by the sidebar D&D logic)
  const addNode = useCallback(
    (newNode: Node<AllNodeData>) => {
      setNodes((prevNodes) => [...prevNodes, newNode]);
    },
    [setNodes]
  );

  // Combine state and actions into the context value
  const contextValue: FlowContextType = {
    nodes,
    edges,
    selectedNodeId,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setNodes,
    setEdges,
    setSelectedNode,
    updateNodeData,
    addNode,
  };

  return (
    <FlowContext.Provider value={contextValue}>{children}</FlowContext.Provider>
  );
};

// 3. Custom Hook to consume the context
export const useFlowStore = () => {
  const context = useContext(FlowContext);
  if (context === undefined) {
    throw new Error("useFlowStore must be used within a FlowProvider");
  }
  return context;
};
