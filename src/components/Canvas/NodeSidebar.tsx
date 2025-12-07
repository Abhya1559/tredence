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
} from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
// import { FaCog } from "react-icons/fa";
import { useState } from "react";
interface MenuItemStyles {
  root?: ElementStyles;
  button?: ElementStyles;
  label?: ElementStyles;
  prefix?: ElementStyles;
  suffix?: ElementStyles;
  icon?: ElementStyles;
  subMenuContent?: ElementStyles;
  SubMenuExpandIcon?: ElementStyles;
}

type ElementStyles =
  | CSSObject
  | ((params: MenuItemStylesParams) => CSSObject | undefined);
export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);
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
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="text-gray-500 font-medium absolute top-3 right-2.5 cursor-pointer"
      >
        {collapsed ? (
          <FaArrowAltCircleRight size={15} />
        ) : (
          <FaTimesCircle size={15} />
        )}
      </button>

      <div className="mt-20">
        <Menu
          className="text-gray-500 font-medium"
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              // only apply styles on first level elements of the tree
              if (level === 0)
                return {
                  color: disabled ? "#f5d9ff" : "gray",
                  backgroundColor: active ? "#eecef9" : undefined,
                };
            },
          }}
        >
          <SubMenu label="General" icon={<FaLayerGroup />}>
            <MenuItem icon={<FaDatabase />}>Compilance</MenuItem>
            <MenuItem icon={<FaTools />}>Scheduler</MenuItem>
            <MenuItem icon={<FaChartPie />}>Analytics</MenuItem>
          </SubMenu>
        </Menu>
        <Menu
          className="text-gray-500 font-medium"
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              // only apply styles on first level elements of the tree
              if (level === 0)
                return {
                  color: disabled ? "#f5d9ff" : "gray",
                  backgroundColor: active ? "#eecef9" : undefined,
                };
            },
          }}
        >
          <SubMenu label="Resources" icon={<FaFolderOpen />}>
            <MenuItem icon={<FaTools />}>Integration</MenuItem>
            <MenuItem icon={<FaDatabase />}>Repository</MenuItem>
            <MenuItem icon={<FaCog />}>Workflows</MenuItem>
          </SubMenu>
        </Menu>
        <Menu
          className="text-gray-500 font-medium"
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              // only apply styles on first level elements of the tree
              if (level === 0)
                return {
                  color: disabled ? "#f5d9ff" : "gray",
                  backgroundColor: active ? "#eecef9" : undefined,
                };
            },
          }}
        >
          <SubMenu label="Charts" icon={<FaChartPie />}>
            <MenuItem icon={<FaUserFriends />}>Member</MenuItem>
            <MenuItem icon={<FaEnvelope />}>Inbox</MenuItem>
            <MenuItem icon={<FaChartPie />}>Messages</MenuItem>
          </SubMenu>
        </Menu>
      </div>
      <div>
        <Menu
          className="text-gray-500 font-medium absolute bottom-8 w-full"
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              // only apply styles on first level elements of the tree
              if (level === 0)
                return {
                  color: disabled ? "#f5d9ff" : "gray",
                  backgroundColor: active ? "#eecef9" : undefined,
                };
            },
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
