import "./App.css";
import { useState, useEffect } from "react";
import { useRoutes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ReadMemories from "./pages/ReadMemories";
import CreateMemory from "./pages/CreateMemory";
import MemoryDetail from "./pages/MemoryDetail";
import EditMemory from "./pages/EditMemory";
import Login from "./pages/Login";

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    async function getUser() {
      const response = await fetch("api/auth/login/success", {
        credentials: "include",
      });
      const json = await response.json();
      setUser(json.user);
    }
    getUser();
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", { credentials: "include" });
    setUser({});
  }

  let element = useRoutes([
    {
      path: "/",
      element: user && user.id ? <ReadMemories userId={user.id} /> : <Login />,
    },
    {
      path: "/memory/new",
      element: user && user.id ? <CreateMemory userId={user.id} /> : <Login />,
    },
    {
      path: "/memory/:id",
      element: user && user.id ? <MemoryDetail userId={user.id} /> : <Login />,
    },
    {
      path: "/memory/:id/edit",
      element: user && user.id ? <EditMemory userId={user.id} /> : <Login />,
    },
    {
      path: "/login",
      element: user && user.id ? <Navigate to="/" /> : <Login />,
    },
  ]);

  return (
    <div className="App">
      <Navbar isAuthenticated={user && user.id} logout={logout} user={user} />
      {element}
    </div>
  );
}

export default App;
