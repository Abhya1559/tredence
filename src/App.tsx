// App.tsx

import "./App.css";
import Nav from "./components/Navbar";
import SideBar from "./components/Canvas/NodeSidebar";
import FlowCanvas from "./components/Canvas/WorkFlowCanvas"; // Assuming you renamed the component and moved it to /components/Canvas
import NodeFormPanel from "./components/Forms/NodeFormPanel";
import WorkflowSandbox from "./components/Sandbox/WorkflowSandbox";

import { FlowProvider } from "./context/WorkFlowContext";

function App() {
  return (
    // 1. Wrap the entire flow area with the FlowProvider
    <FlowProvider>
      <div className="flex flex-col min-h-screen bg-[radial-gradient(circle,rgba(0,0,0,0.15)_1px,transparent_1px)] bg-size-[22px_22px]">
        {/* Navigation Bar (fixed at top) */}
        <Nav />

        {/* Main Layout: SideBar | FlowCanvas | Config/Sandbox Panel */}
        <div className="flex flex-1 overflow-hidden">
          {/* 2. Left Sidebar (Node Palette) */}
          <SideBar />

          {/* 3. Central Canvas Area (Takes up most of the space) */}
          <div className="flex-1 min-h-full">
            {/* Note: The background is typically applied to the canvas itself */}
            <FlowCanvas />
          </div>

          {/* 4. Right Panel (Config Forms and Testing) */}
          <div className="w-80 border-l border-gray-300 p-4 bg-gray-50 flex flex-col overflow-y-auto">
            <h3 className="text-lg font-semibold mb-3">Node Configuration</h3>
            <NodeFormPanel />

            <hr className="my-4" />

            <h3 className="text-lg font-semibold mb-3">🧪Workflow Testing</h3>
            <WorkflowSandbox />
          </div>
        </div>
      </div>
    </FlowProvider>
  );
}

export default App;
