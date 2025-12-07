import React from "react";

interface DraggableNodeItemProps {
  nodeType: string;
  label: string;
  icon: React.ReactElement;
}

const DraggableNodeItem: React.FC<DraggableNodeItemProps> = ({
  nodeType,
  label,
  icon,
}) => {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    type: string
  ) => {
    event.dataTransfer.setData("application/reactflow", type);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    // The div is made draggable and passes the nodeType string
    <div
      onDragStart={(event) => onDragStart(event, nodeType)}
      draggable
      style={{ cursor: "grab" }}
      className="p-1 my-1 mx-2 border border-dashed border-gray-400 rounded transition hover:bg-gray-100"
    >
      <div className="flex items-center space-x-2 text-gray-700 font-medium text-sm">
        {icon}
        <span>{label}</span>
      </div>
    </div>
  );
};

export default DraggableNodeItem;
