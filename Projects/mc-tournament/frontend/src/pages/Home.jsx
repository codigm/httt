import React from "react";
import HeroSection from "../components/HeroSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <div
        style={{
          padding: "40px",
          textAlign: "center",
          backgroundColor: "#111",
          color: "#fff",
        }}
      >
        <h1>Welcome to the Minecraft PvP Tournament</h1>
        <p>Join the ultimate battle and win exciting prizes!</p>
      </div>
    </>
  );
}
