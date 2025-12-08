
This is a comprehensive README for your **React Flow Workflow Designer**.

----------

# 🚀 Workflow Designer: React Flow and TypeScript

This project is a modern, web-based tool for designing, validating, and simulating business process workflows. It is built on a robust front-end stack using **React Flow** for the graphical interface and **TypeScript** for type safety, managed by a centralized React Context store.

## 🏛️ Architecture

The application follows a standard component-based architecture with a clear separation of concerns, heavily relying on the **Flux/Context pattern** for state management.

**Layer**

**Components**

**Responsibility**

**Presentation**

`App.tsx`, `SideBar.tsx`, `WorkflowSandbox.tsx`

Defines the main application layout and UI components.

**Flow/Canvas**

`WorkFLowCanvas.tsx`, `DraggableNodeItem.tsx`

Manages the **React Flow** instance, handles Drag-and-Drop (D&D), and renders the nodes.

**State Management**

`useFlowStore.tsx` (Context)

Centralized, immutable store for all **nodes** and **edges**. Exposes actions (`addNode`, `updateNodeData`, etc.) to components.

**Configuration**

`NodeFormPanel.tsx`, `TaskForm.tsx`, etc.

Acts as a **router** to display the correct configuration form based on the currently selected node type.

**Logic/API**

`simulate.ts`, `automations.ts`

Contains business logic (validation) and mock API interfaces for simulation and dynamic form data.

----------

## ▶️ How to Run

### Prerequisites

-   Node.js (LTS recommended)
    
-   npm or yarn
    

### Steps

1.  **Clone the repository:**
    
    Bash
    
    ```
    git clone [https://github.com/Abhya1559/tredence]
    cd [Tredence HR WorkFlow]
    
    ```
    
2.  **Install dependencies:**
    
    Bash
    
    ```
    npm install
    # or
    yarn install
    
    ```
    
3.  **Start the development server:**
    
    Bash
    
    ```
    npm run dev
    # or
    yarn dev
    
    ```
    
4.  The application will be available at `http://localhost:5173` (or the port specified by your toolchain).
    

----------

## 💡 Design Decisions

### 1. State Management: React Context (`useFlowStore`)

-   **Decision:** Use **React Context** combined with React Flow's state hooks (`useNodesState`, `useEdgesState`).
    
-   **Rationale:** Provides a single source of truth for all node and edge data, accessible by every component (Sidebar, Canvas, Sandbox). This avoids Prop Drilling and ensures actions like drag-and-drop or form edits instantly update the entire flow graph.
    

### 2. Node Customization and Forms

-   **Decision:** Use a **`NodeFormPanel` router** with type assertions.
    
-   **Rationale:** Instead of bloating the main canvas code, all node-specific configuration logic is segregated into dedicated form components (`TaskForm`, `StartForm`, etc.). The router reads the selected node's `type` and casts its generic `data` object to the specific required interface (e.g., `TaskNodeData`), providing strong **type safety** during configuration.
    

### 3. Drag-and-Drop Fix (D&D)

-   **Decision:** Implemented a **surgical DOM bypass fix** for the Start Node in `SideBar.tsx`.
    
-   **Rationale:** A specific event conflict between the third-party sidebar component (`react-pro-sidebar`) and the standard HTML `onDragStart` event caused the Start Node payload to be lost. The fix involves manually defining the Start Node's draggable element and using `event.stopPropagation()` to guarantee the payload is set.
    

### 4. Validation

-   **Decision:** Use **`useMemo`** in `WorkflowSandbox.tsx` for real-time validation.
    
-   **Rationale:** Validation logic (`valid: true/false`) is executed only when dependencies (`nodes`, `edges`) change. This prevents unnecessary re-runs and ensures the button state and status message are always synchronized with the current flow structure.
    

----------

## ✅ Project Completion Status

**Feature**

**Status**

**Notes**

**Core Canvas**

**Complete**

React Flow instance, pan/zoom, basic styling.

**Drag & Drop**

**Complete**

All five custom node types can be dragged and successfully dropped onto the canvas.

**Connect Edges**

**Complete**

Users can draw connections between nodes.

**Node Deletion**

**Complete**

Implemented keyboard listener for `Delete`/`Backspace`.

**Validation**

**Complete**

Real-time checks for Start Node count, End Node presence, and basic connectivity.

**Simulation**

**Complete**

Mock API (`simulateWorkflow`) is integrated and runs successfully when the flow is valid.

**Configuration Forms**

**Partial**

Full forms implemented for Start, Task, Approval, Automated Step, and End nodes.

**Dynamic Data**

**Complete**

`TaskForm` and `StartForm` support dynamic addition/removal of custom key/value fields.

**API Integration**

**Complete**

`AutomatedStepForm` dynamically loads action parameters from a mock API response.

----------

## 💡 Future Enhancements (With More Time)

If development time allowed, the following high-impact features would be added:

1.  **Visual Node Status:** Update the appearance of nodes on the canvas (e.g., green border for **Success**, red for **Error**) to visually represent the step-by-step execution during simulation.
    
2.  **Undo/Redo Functionality:** Integrate the `reactflow` history hooks or implement a deep copy/history stack within the `useFlowStore` to support unlimited undo/redo operations.
    
3.  **Split/Merge Handles:** Implement conditional routing logic on Task and Approval nodes (e.g., allow one output handle for **Success** and one for **Failure**) to create more complex branching paths in the workflow graph.
    
4.  **Save/Load Flow:** Implement persistence to local storage or a mock backend service to allow users to save their current workflow definition (`nodes` and `edges` JSON) and reload it later.
