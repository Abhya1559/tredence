import "./App.css";
import SideBar from "./components/Canvas/NodeSidebar";
import Nav from "./components/Navbar";

function App() {
  return (
    <>
      <Nav />
      <div className="min-h-screen bg-[radial-gradient(circle,rgba(0,0,0,0.15)_1px,transparent_1px)] bg-size-[22px_22px]">
        <SideBar />
      </div>
    </>
  );
}

export default App;
