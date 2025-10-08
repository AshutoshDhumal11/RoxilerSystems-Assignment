import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        {user ? (
          <>
            <span>Welcome, {user.name}!</span>
            {user.role === "SYSTEM_ADMIN" && <Link to="/admin">Admin</Link>}
            {user.role === "NORMAL_USER" && <Link to="/user">User</Link>}
            {user.role === "STORE_OWNER" && (
              <Link to="/store-owner">Store Owner</Link>
            )}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
