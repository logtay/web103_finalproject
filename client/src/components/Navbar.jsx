import "../css/Navbar.css";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";

const Navbar = ({ isAuthenticated, logout, user }) => {
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
        {isAuthenticated ? (
          <>
            <Link className="navbar-link" onClick={logout} to={"/login"}>
              Logout
            </Link>
            <Avatar user={user} />
          </>
        ) : (
          <Link className="navbar-link" to={"/login"}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
