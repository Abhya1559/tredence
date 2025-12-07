// components/Nodes/TaskNode.tsx
import { Handle, Position } from "reactflow";
import type { NodeProps } from "reactflow";
import { type TaskNodeData } from "@/types/workflow";

const TaskNode = ({ data }: NodeProps<TaskNodeData>) => {
  return (
    <div className="custom-node task-node">
      <Handle type="target" position={Position.Top} />
      <div className="node-header">Task:{data.title}</div>
      <div className="node-body">
        <p>Assignee: {data.assignee || "Unassigned"}</p>
        <p>Due: {data.dueDate}</p>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};
export default TaskNode;
