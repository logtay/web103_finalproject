import "./App.css";
import { useRoutes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ReadMemories from "./pages/ReadMemories";
import CreateMemory from "./pages/CreateMemory";
import MemoryDetail from "./pages/MemoryDetail";
import EditMemory from "./pages/EditMemory";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  let element = useRoutes([
    { path: "/", element: <ReadMemories /> },
    { path: "/memory/new", element: <CreateMemory /> },
    { path: "/memory/:id", element: <MemoryDetail /> },
    { path: "/memory/:id/edit", element: <EditMemory /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
  ]);

  return (
    <div className="App">
      <Navbar />
      {element}
    </div>
  );
}

export default App;
