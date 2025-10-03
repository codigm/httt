import React, { useEffect, useState } from "react";
import "./Leaderboard.css";

const mockPlayers = [
  {
    username: "Marlowww",
    avatar: "https://i.pravatar.cc/48?img=12",
    rank: 1,
    title: "Combat Grandmaster",
    points: 405,
    kills: 120,
    deaths: 30,
    tiers: ["HT1"],
  },
  {
    username: "ItzRealMe",
    avatar: "https://i.pravatar.cc/48?img=5",
    rank: 2,
    title: "Combat Master",
    points: 330,
    kills: 100,
    deaths: 50,
    tiers: ["HT1"],
  },
];

const Leaderboard = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    setPlayers(mockPlayers);
    console.log("Players loaded:", mockPlayers);
  }, []);

  return (
    <div className="leaderboard">
      <h2>🏆 Leaderboard</h2>
      <div className="leaderboard-table">
        <div className="leaderboard-header">
          <div className="header-item">#</div>
          <div className="header-item">Player</div>
          <div className="header-item">Rank</div>
          <div className="header-item">Points</div>
          <div className="header-item">Kills</div>
          <div className="header-item">Deaths</div>
          <div className="header-item">Tiers</div>
        </div>

        {players.map((p) => (
          <div className="leaderboard-row" key={p.username}>
            <div className="rank">
              <span className={`rank-badge rank-${p.rank}`}>{p.rank}.</span>
            </div>
            <div className="player">
              <img
                className="avatar"
                src={p.avatar}
                alt={p.username}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/avatars/default.png";
                }}
              />
              <div className="player-info">
                <div className="player-name">{p.username}</div>
                <div className="player-title">{p.title}</div>
              </div>
            </div>
            <div className="points">{p.points}</div>
            <div className="kills">{p.kills}</div>
            <div className="deaths">{p.deaths}</div>
            <div className="tiers">
              {p.tiers.map((tier, idx) => (
                <span key={idx} className={`tier-badge tier-${tier}`}>
                  {tier}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
