import { useAuth } from "../Hooks/useAuth";
import { Link } from "react-router-dom";
import { useState } from "react";

function Header() {
  const { user, loginWithGoogle, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <header>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark sticky-top border-bottom border-bottom-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="https://whereswally.netlify.app/">
            Wheres Wally?
          </a>
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggle}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
            id="navbarNav"
          >
            <ul className="navbar-nav ms-auto">
              {user ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/create-game">
                      Create Game
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/my-games">
                      My Games
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/settings">
                      Settings
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-link nav-link" onClick={logout}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link disabled">Create Game</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link disabled">My Games</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link disabled">Settings</Link>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-link nav-link"
                      onClick={loginWithGoogle}
                    >
                      Login with Google
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
