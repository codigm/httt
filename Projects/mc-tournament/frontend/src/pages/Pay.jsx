import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Pay.css"; // Import CSS file

export default function Pay() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [mode, setMode] = useState(null);

  useEffect(() => {
    // Load modes from localStorage
    const savedModes = JSON.parse(localStorage.getItem("modes")) || [];
    const modeId = searchParams.get("id");
    const modeName = searchParams.get("mode");

    let found = null;
    if (modeId) {
      found = savedModes.find((m) => m.id.toString() === modeId);
    } else if (modeName) {
      found = savedModes.find(
        (m) => m.name.toLowerCase() === modeName.toLowerCase()
      );
    }

    if (found) {
      setMode(found);
    } else {
      setMode({ name: "Unknown", price: 0, bgImage: "" });
    }
  }, [searchParams]);

  if (!mode) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <div
      className="pay-container"
      style={{ backgroundImage: `url(${mode.bgImage || "/default-bg.jpg"})` }}
    >
      <div className="overlay"></div>

      <div className="pay-card">
        <h1 className="title">Minecraft PvP Showdown - {mode.name} Mode</h1>
        <p className="mode-text">
          Mode: <span>{mode.name.toUpperCase()}</span>
        </p>
        <p className="price">💰 Amount: ₹{mode.price}</p>

        <div className="button-group">
          <button
            className="pay-btn"
            onClick={() =>
              window.open("https://discord.gg/khM4HVgZaz", "_blank")
            }
          >
            ✯Secure Your Spot
          </button>
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}
