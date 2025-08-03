import { Link, useNavigate } from "react-router-dom";


export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>
      {isLoggedIn && (
        <>
          <Link to="/my-sessions">My Sessions</Link>
          <Link to="/editor">Create Session</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
      {!isLoggedIn && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
