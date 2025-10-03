import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HeroSection.css";

function parseDateSafe(d) {
  const t = new Date(d).getTime();
  return Number.isNaN(t) ? null : t;
}

const HeroSection = () => {
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const navigate = useNavigate();

  // Pick tournament with nearest deadline
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tournaments")) || [];
    if (!saved.length) return;

    const sorted = [...saved]
      .map((t) => ({ ...t, ts: parseDateSafe(t.date) }))
      .filter((t) => t.ts)
      .sort((a, b) => a.ts - b.ts);

    setSelected(sorted[0] || null);
  }, []);

  // Countdown only if status = "Upcoming"
  useEffect(() => {
    if (!selected || selected.status !== "Upcoming" || !selected.ts) {
      setTimeLeft(null);
      return;
    }

    const tick = () => {
      const diff = selected.ts - Date.now();
      if (diff <= 0) {
        setTimeLeft(null);
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      setTimeLeft({ days, hours, minutes });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [selected]);

  const handleJoinClick = () => {
    if (selected?.id) navigate(`/pay/${selected.id}`);
    else navigate("/tournaments");
  };

  return (
    <div className="hero-container">
      <div className="overlay" />
      <div className="content">
        {/* Tournament Section */}
        {selected ? (
          <>
            <h1>{selected.name}</h1>
            <p>
              Competition Status:{" "}
              <span className={selected.status?.toLowerCase() || "active"}>
                {selected.status}
              </span>
            </p>
            <p>
              Submission Due:{" "}
              <strong>
                {selected.ts
                  ? new Date(selected.ts).toLocaleString(undefined, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })
                  : "-"}
              </strong>
            </p>
            <p>
              Prize Pool:{" "}
              <strong>{selected.prize ? `₹${selected.prize}` : "-"}</strong>
            </p>

            {selected.status === "Upcoming" && timeLeft && (
              <div className="timer">
                ⏳ {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
              </div>
            )}

            <button className="join-btn" onClick={handleJoinClick}>
              Join the Competition
            </button>
          </>
        ) : (
          <>
            <h1>No tournaments available</h1>
            <button
              className="join-btn"
              onClick={() => navigate("/tournaments")}
            >
              View Tournaments
            </button>
          </>
        )}

        {/* 🚀 Practice Section */}
        <div className="practice-section">
          <h2>Want to Improve Your Skills?</h2>
          <p>Join practice matches anytime and sharpen your gameplay.</p>
          <button
            className="practice-btn"
            onClick={() => navigate("/PracticeCard")}
          >
            Start Practicing
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
