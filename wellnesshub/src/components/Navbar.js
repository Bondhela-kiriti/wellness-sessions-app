import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // clear JWT
    navigate("/login"); // redirect to login
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <nav
      style={{
        background: "#222",
        color: "white",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h3>Wellness App</h3>
      <div>
        <Link to="/dashboard" style={linkStyle}>
          Dashboard
        </Link>
        {isLoggedIn && (
          <>
            <Link to="/my-sessions" style={linkStyle}>
              My Sessions
            </Link>
            <Link to="/editor" style={linkStyle}>
              Editor
            </Link>
            <button
              onClick={handleLogout}
              style={{
                marginLeft: "15px",
                padding: "6px 12px",
                background: "#f44336",
                border: "none",
                color: "white",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            >
              Logout
            </button>
          </>
        )}
        {!isLoggedIn && (
          <>
            <Link to="/login" style={linkStyle}>
              Login
            </Link>
            <Link to="/register" style={linkStyle}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

const linkStyle = {
  margin: "0 10px",
  textDecoration: "none",
  color: "white",
};
