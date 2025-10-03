import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import dialogBg from "../assets/dialog.jpg";

export default function Tournaments() {
  const navigate = useNavigate();
  const [showModePopup, setShowModePopup] = useState(null); // selected tournament
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    // ✅ Load tournaments created in Admin Dashboard
    const saved = JSON.parse(localStorage.getItem("tournaments")) || [];
    // ✅ Sort by date (nearest first)
    const sorted = saved.sort((a, b) => new Date(a.date) - new Date(b.date));
    setTournaments(sorted);
  }, []);

  const handleModeSelect = (mode, id) => {
    setShowModePopup(null);
    navigate(`/pay/${id}?mode=${mode.toLowerCase()}`);
  };

  const buttonStyle = {
    padding: "12px 20px",
    margin: "8px",
    backgroundColor: "#22c55e",
    color: "white",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(34,197,94,0.6)",
    transition: "all 0.3s ease",
  };

  return (
    <div
      style={{
        width: "100%",
        padding: "20px",
        fontFamily: "Segoe UI, sans-serif",
        background: "#121212",
        minHeight: "100vh",
        overflowX: "hidden",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxSizing: "border-box",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#22c55e",
          fontSize: "2.5rem",
          fontWeight: "900",
          marginBottom: "30px",
          textShadow: "0 0 10px rgba(34,197,94,0.7)",
          width: "100%",
        }}
      >
        🏆 Upcoming Tournaments
      </h1>

      {/* Cards Wrapper */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        {tournaments.length === 0 && (
          <p style={{ color: "gray" }}>No tournaments available.</p>
        )}

        {tournaments.map((t) => (
          <div
            key={t.id}
            style={{
              width: "100%",
              maxWidth: "500px",
              position: "relative",
              borderRadius: "14px",
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
              cursor: t.status === "Open" ? "pointer" : "not-allowed",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onClick={() => {
              if (t.status !== "Open") return;
              if (t.modes && t.modes.length > 0) {
                setShowModePopup(t);
              } else {
                navigate(`/pay/${t.id}`);
              }
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.03)";
              e.currentTarget.style.boxShadow =
                "0 8px 30px rgba(34,197,94,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.6)";
            }}
          >
            {/* Background Image */}
            <div
              style={{
                backgroundImage: `url(${t.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "220px",
                filter: "brightness(0.7)",
              }}
            />

            {/* Overlay Info */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "20px",
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                color: "white",
              }}
            >
              <h2
                style={{
                  margin: "0 0 8px",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "#facc15",
                  textShadow: "0 2px 6px rgba(0,0,0,0.8)",
                }}
              >
                {t.name}
              </h2>

              <p>
                📅{" "}
                {t.date
                  ? new Date(t.date).toLocaleString(undefined, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })
                  : "No date"}
              </p>
              <p>💰 Winning Price: {t.prize}</p>

              <span
                style={{
                  display: "inline-block",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  background:
                    t.status === "Open"
                      ? "linear-gradient(90deg,#22c55e,#16a34a)"
                      : t.status === "Completed"
                      ? "linear-gradient(90deg,#f87171,#dc2626)"
                      : "linear-gradient(90deg,#facc15,#eab308)", // Upcoming
                  color: "#fff",
                  fontWeight: "bold",
                  marginTop: "10px",
                  fontSize: "0.9rem",
                  boxShadow: "0 3px 8px rgba(0,0,0,0.4)",
                }}
              >
                {t.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Mode Popup */}
      {showModePopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowModePopup(null)}
        >
          <div
            style={{
              backgroundImage: `url(${dialogBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              padding: "30px",
              borderRadius: "12px",
              width: "340px",
              maxWidth: "90vw",
              textAlign: "center",
              position: "relative",
              color: "white",
              boxShadow: "0 8px 20px rgba(0,0,0,0.6)",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
                zIndex: 0,
              }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: "900",
                  color: "#c084fc",
                  textShadow:
                    "0 0 10px rgba(192,132,252,1), 0 0 20px rgba(168,85,247,0.9)",
                  marginBottom: "20px",
                }}
              >
                Select Mode
              </h3>

              {showModePopup.modes.map((mode) => (
                <button
                  key={mode}
                  onClick={() => handleModeSelect(mode, showModePopup.id)}
                  style={buttonStyle}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#16a34a")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "#22c55e")
                  }
                >
                  {mode}
                </button>
              ))}

              <br />
              <button
                onClick={() => setShowModePopup(null)}
                style={{
                  marginTop: "15px",
                  padding: "12px 20px",
                  backgroundColor: "#e11d48",
                  color: "white",
                  fontWeight: "bold",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(225,29,72,0.6)",
                  transition: "0.3s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#be123c")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#e11d48")
                }
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
