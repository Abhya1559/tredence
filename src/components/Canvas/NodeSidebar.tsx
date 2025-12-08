import {
  Sidebar,
  Menu,
  SubMenu,
  MenuItem,
  type CSSObject,
  type MenuItemStylesParams,
  sidebarClasses,
} from "react-pro-sidebar";
import {
  FaLayerGroup,
  FaChartPie,
  FaTools,
  FaFolderOpen,
  FaUserFriends,
  FaEnvelope,
  FaDatabase,
  FaCog,
  FaUserShield,
  FaPlayCircle,
  FaTasks,
  FaCheckCircle,
  FaRobot,
  FaStopCircle,
} from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import React, { useState } from "react"; // Ensure React is imported
// Import the Draggable Node Component
import DraggableNodeItem from "@/components/Canvas/DraggableItem";

// ... (Type definitions remain unchanged) ...

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);

  // Custom Styles function remains unchanged to keep the design
  const getMenuItemStyles = (
    level: number,
    active: boolean,
    disabled: boolean
  ): CSSObject | undefined => {
    if (level === 0)
      return {
        color: disabled ? "#f5d9ff" : "gray",
        backgroundColor: active ? "#eecef9" : undefined,
      };
    return undefined;
  };

  // --- Start Node Isolation Handler ---
  // This function is manually defined here to replace the DraggableNodeItem call for the Start Node
  const onStartNodeDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("application/reactflow", "StartNode");
    event.dataTransfer.effectAllowed = "move";
    event.stopPropagation(); // Crucial: Prevent parent SubMenu handlers from canceling the drag
  };

  return (
    <Sidebar
      collapsed={collapsed}
      className="h-dvh shadow relative"
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          backgroundColor: "white",
        },
      }}
    >
      {/* Collapse Button (Design preserved) */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="text-gray-500 font-medium absolute top-20 right-2.5 cursor-pointer z-10"
      >
        {collapsed ? (
          <FaArrowAltCircleRight size={15} />
        ) : (
          <FaTimesCircle size={15} />
        )}
      </button>

      {/* TOP MENU SECTION */}
      <div className="mt-25">
        <Menu
          className="text-gray-500 font-medium"
          menuItemStyles={{
            button: (params) =>
              getMenuItemStyles(params.level, params.active, params.disabled),
          }}
        >
          <SubMenu label="General" icon={<FaLayerGroup />}>
            <MenuItem icon={<FaDatabase />}>Compilance</MenuItem>
            <MenuItem icon={<FaTools />}>Scheduler</MenuItem>
            <MenuItem icon={<FaChartPie />}>Analytics</MenuItem>
          </SubMenu>
        </Menu>

        {/* WORKFLOW NODE PALETTE - REPURPOSED RESOURCES SECTION */}
        <Menu
          className="text-gray-500 font-medium"
          menuItemStyles={{
            button: (params) =>
              getMenuItemStyles(params.level, params.active, params.disabled),
          }}
        >
          {/* SubMenu for Resources remains unchanged */}
          <SubMenu label="Resources" icon={<FaFolderOpen />}>
            <MenuItem icon={<FaTools />}>Integration</MenuItem>
            <MenuItem icon={<FaDatabase />}>Repository</MenuItem>

            <h4 className="text-xs font-semibold uppercase text-gray-400 p-2 pt-4">
              Workflow Palette
            </h4>

            {/* START NODE FIX: DIRECTLY DEFINED DRAGGABLE ELEMENT */}
            <div
              onDragStart={onStartNodeDragStart}
              draggable
              style={{ cursor: "grab" }}
              className="p-1 my-1 mx-2 border border-dashed border-gray-400 rounded transition hover:bg-gray-100"
            >
              <div className="flex items-center space-x-2 text-gray-700 font-medium text-sm">
                <FaPlayCircle size={14} className="text-green-600" />
                <span>Start Workflow</span>
              </div>
            </div>
            {/* END START NODE FIX */}

            {/* The rest of the nodes use the working DraggableNodeItem component: */}
            <DraggableNodeItem
              nodeType="TaskNode"
              label="Human Task"
              icon={<FaTasks size={14} className="text-blue-600" />}
            />
            <DraggableNodeItem
              nodeType="ApprovalNode"
              label="Manager Approval"
              icon={<FaCheckCircle size={14} className="text-yellow-600" />}
            />
            <DraggableNodeItem
              nodeType="AutomatedStepNode"
              label="Automated Step"
              icon={<FaRobot size={14} className="text-purple-600" />}
            />
            <DraggableNodeItem
              nodeType="EndNode"
              label="End Workflow"
              icon={<FaStopCircle size={14} className="text-red-600" />}
            />
          </SubMenu>
        </Menu>

        {/* ... (Charts Menu) ... */}
        <Menu
          className="text-gray-500 font-medium"
          menuItemStyles={{
            button: (params) =>
              getMenuItemStyles(params.level, params.active, params.disabled),
          }}
        >
          <SubMenu label="Charts" icon={<FaChartPie />}>
            <MenuItem icon={<FaUserFriends />}>Member</MenuItem>
            <MenuItem icon={<FaEnvelope />}>Inbox</MenuItem>
            <MenuItem icon={<FaChartPie />}>Messages</MenuItem>
          </SubMenu>
        </Menu>
      </div>

      {/* BOTTOM MENU SECTION (Design preserved) */}
      <div>
        <Menu
          className="text-gray-500 font-medium absolute bottom-8 w-full"
          menuItemStyles={{
            button: (params) =>
              getMenuItemStyles(params.level, params.active, params.disabled),
          }}
        >
          <SubMenu label="Setting" icon={<FaCog />}>
            <MenuItem icon={<FaUserFriends />}>User</MenuItem>
            <MenuItem icon={<FaEnvelope />}>Inbox</MenuItem>
            <MenuItem icon={<FaChartPie />}>Messages</MenuItem>
          </SubMenu>
          <SubMenu label="Help & Support" icon={<FaUserShield />}>
            <MenuItem icon={<FaUserFriends />}>Check Approval</MenuItem>
            <MenuItem icon={<FaEnvelope />}>Check Meeting</MenuItem>
            <MenuItem icon={<FaChartPie />}>Privacy & Policy</MenuItem>
          </SubMenu>
        </Menu>
      </div>
    </Sidebar>
  );
}
