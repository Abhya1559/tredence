import type { EndNodeData } from "@/types/workflow";
import { Handle, Position, type NodeProps } from "reactflow";

const EndNode = ({ data }: NodeProps<EndNodeData>) => {
  return (
    <div className="custom-node end-node">
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: "#555" }}
      />
      End: {data.title}
    </div>
  );
};
export default EndNode;
