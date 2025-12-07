import { type StartNodeData } from "@/types/workflow";
import { Handle, Position, type NodeProps } from "reactflow";

const StartNode = ({ data }: NodeProps<StartNodeData>) => {
  return (
    <div className="custom-node start-node">
      Start: {data.title}
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: "#555" }}
      />
    </div>
  );
};

export default StartNode;
