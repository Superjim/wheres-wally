import { useAuth } from "../Hooks/useAuth";
import { Link } from "react-router-dom";

function Header() {
  const { user, loginWithGoogle, logout } = useAuth();

  return (
    <header>
      <nav>
        {user ? (
          <>
            <button onClick={logout}>Logout</button>
            <Link to="/settings">Settings</Link>
            <Link to="/my-games">My Games</Link>
          </>
        ) : (
          <button onClick={loginWithGoogle}>Login with Google</button>
        )}
      </nav>
    </header>
  );
}

export default Header;
