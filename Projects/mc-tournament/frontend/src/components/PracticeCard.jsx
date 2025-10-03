import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./PracticeCard.css";

export default function PracticeCard() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const serverIp = "r9-node4.crazynodes.in:19133";

  // ✅ Copy function
  const handleCopy = () => {
    navigator.clipboard.writeText(serverIp).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 sec
    });
  };

  return (
    <div className="practice-page">
      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      {/* Card */}
      <div className="practice-card">
        <div className="practice-card_badge">Practice PvP</div>
        <h3 className="practice-card_title">Warm-up Arena</h3>
        <p className="practice-card_text">
          Hop into the server and choose <strong>Practice</strong> from the
          in-game menu to spar, test kits, and warm up before the tournament.
        </p>

        {/* IP Box + Copy Button */}
        <div className="practice-card_ip">
          <input value={serverIp} readOnly />
          <button onClick={handleCopy}>{copied ? "Copied!" : "Copy IP"}</button>
        </div>

        <ul className="practice-card_steps">
          <li>1. Launch Minecraft and join the server.</li>
          <li>2. Open the lobby selector.</li>
          <li>
            3. Pick <strong>Practice</strong> mode and start dueling.
          </li>
        </ul>

        <div className="practice-card_footer">
          <span className="practice-card_hint">Free to use • No entry fee</span>
        </div>
      </div>
    </div>
  );
}
