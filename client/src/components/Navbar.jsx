import "../css/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar-container">
      <div className="navbar-home">
        <Link className="navbar-link" to={"/"}>
          Home
        </Link>
      </div>
      <div className="navbar-links">
        <Link className="navbar-link" to={"/memory/new"}>
          New Memory
        </Link>
        <Link className="navbar-link" to={"/login"}>
          Login
        </Link>
        <Link className="navbar-link" to={"/register"}>
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
