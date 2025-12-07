import type { AutomatedStepData } from "@/types/workflow";
import { Handle, Position, type NodeProps } from "reactflow";

const AutomatedStepNode = ({ data }: NodeProps<AutomatedStepData>) => {
  return (
    <div className="custom-node automated-node">
      <Handle type="target" position={Position.Top} />
      Automated: {data.title}
      <p>Action: {data.actionId}</p>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};
export default AutomatedStepNode;
