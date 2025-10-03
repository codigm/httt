// src/layouts/AdminLayout.jsx
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/auth");
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh", // full viewport
        background: "#121212",
        color: "white",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: 220,
          background: "#1f1f1f",
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 15,
          overflow: "auto", // sidebar can scroll too if needed
          minHeight: 0, // ✨ allow scrolling within flex child
        }}
      >
        <h2 style={{ color: "yellow" }}>Admin Panel</h2>
        <Link
          to="/admin/dashboard"
          style={{ color: "white", textDecoration: "none" }}
        >
          Dashboard
        </Link>
        <Link
          to="/admin/tournaments"
          style={{ color: "white", textDecoration: "none" }}
        >
          Tournaments
        </Link>
        <Link
          to="/admin/modes"
          style={{ color: "white", textDecoration: "none" }}
        >
          Modes
        </Link>
        <button
          onClick={handleLogout}
          style={{
            marginTop: "auto",
            padding: "8px 12px",
            border: "none",
            borderRadius: 6,
            background: "#e11d48",
            color: "white",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </aside>

      {/* Content area owns the scroll */}
      <main
        style={{
          flex: 1,
          padding: 20,
          overflow: "auto", // ✨ scrollbar shows here
          minHeight: 0, // ✨ critical for flex children
          minWidth: 0, // avoid overflow from long lines
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}
