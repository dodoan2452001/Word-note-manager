import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("loggedInUser");

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <nav
      style={{
        padding: "1.5rem",
        background: "#007bff",
        fontSize: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: "#f1f1f1",
      }}
    >
      <div>
        <Link to="/" style={{ marginRight: "2rem", color: "#f1f1f1" }}>
          Từ vựng
        </Link>
        <Link to="/notes" style={{ color: "#f1f1f1" }}>
          Ghi Chú
        </Link>
      </div>

      {isLoggedIn && (
        <button
          onClick={handleLogout}
          style={{
            background: "#dc3545",
            color: "#fff",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Đăng xuất
        </button>
      )}
    </nav>
  );
}

export default Navbar;
