import type { ApprovalNodeData } from "@/types/workflow";
import { Handle, Position, type NodeProps } from "reactflow";

const ApprovalNode = ({ data }: NodeProps<ApprovalNodeData>) => (
  <div className="custom-node approval-node">
    <Handle type="target" position={Position.Top} />
    Approval: {data.title}
    <p>Role: {data.approverRole}</p>
    <p>Threshold: {data.autoApproveThreshold}%</p>
    <Handle type="source" position={Position.Bottom} />
  </div>
);
export default ApprovalNode;
