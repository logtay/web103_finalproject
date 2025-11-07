import "./App.css";
import { Link, useRoutes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="header">
        <Link to="/">Memories</Link>
        <Link to="/memory/new">Add Memory</Link>
    </div>
    </div>
  );
}

export default App;
