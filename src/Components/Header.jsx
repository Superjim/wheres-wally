import { useAuth } from "../Hooks/useAuth";
import { Link } from "react-router-dom";

function Header() {
  const { user, login, logout } = useAuth();

  return (
    <header>
      <nav>
        {user ? (
          <>
            <button onClick={logout}>Logout</button>
            <Link to="/control-panel">Settings</Link>
          </>
        ) : (
          <button onClick={login}>Login</button>
        )}
      </nav>
    </header>
  );
}

export default Header;
