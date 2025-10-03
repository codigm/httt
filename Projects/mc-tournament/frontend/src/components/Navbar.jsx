import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  const handleNavClick = (path) => {
    navigate(path);
  };

  return (
    <nav
      role="navigation"
      aria-label="Main Navigation"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        zIndex: 9999, // ⬆️ Ensures navbar stays on top
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        backgroundColor: "#121212",
        color: "#fff",
        borderBottom: "1px solid #333",
        boxSizing: "border-box",
      }}
    >
      {/* Left: Navigation Buttons */}
      <div style={{ display: "flex", gap: "1rem" }}>
        <button
          onClick={() => handleNavClick("/")}
          style={{
            background: "none",
            border: "none",
            color: window.location.pathname === "/" ? "#00ffae" : "#fff",
            cursor: "pointer",
            fontSize: "1rem",
            outline: "none",
          }}
        >
          Home
        </button>
        <button
          onClick={() => handleNavClick("/tournaments")}
          style={{
            background: "none",
            border: "none",
            color:
              window.location.pathname === "/tournaments" ? "#00ffae" : "#fff",
            cursor: "pointer",
            fontSize: "1rem",
            outline: "none",
          }}
        >
          Tournaments
        </button>
        <button
          onClick={() => handleNavClick("/leaderboard")}
          style={{
            background: "none",
            border: "none",
            color:
              window.location.pathname === "/leaderboard" ? "#00ffae" : "#fff",
            cursor: "pointer",
            fontSize: "1rem",
            outline: "none",
          }}
        >
          Leaderboard
        </button>
        <a
          href="https://discord.gg/ZqJMQR8P"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#7289da",
            textDecoration: "none",
            alignSelf: "center",
          }}
        >
          Discord
        </a>
      </div>

      {/* Center: Minecraft Server IP */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          fontWeight: "bold",
          fontSize: "1rem",
          color: "#00ffae",
        }}
      >
        Server IP: r9-node4.crazynodes.in:19133
      </div>

      {/* Right: Auth Controls */}
      <div>
        {!user ? (
          <button
            onClick={() => handleNavClick("/auth")}
            style={{
              background: "none",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              fontSize: "1rem",
              outline: "none",
            }}
          >
            Login
          </button>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ fontSize: "0.9rem", color: "#ccc" }}>
              {user.displayName || user.email}
            </span>
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt="User Avatar"
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                }}
              />
            )}
            <button
              onClick={handleSignOut}
              style={{
                background: "#e63946",
                color: "#fff",
                border: "none",
                padding: "0.4rem 0.8rem",
                borderRadius: "4px",
                cursor: "pointer",
                outline: "none",
              }}
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
