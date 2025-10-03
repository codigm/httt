import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // ✅ using setDoc instead of addDoc
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/image.png";
import "./AuthPage.css";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    playerName: "",
    ign: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.playerName ||
      !formData.ign ||
      !formData.email ||
      !formData.password
    ) {
      alert("Please fill in all fields");
      return;
    }

    try {
      // ✅ 1. Create Firebase Auth account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const uid = userCredential.user.uid;

      // ✅ 2. Save player profile in Firestore with UID as doc ID
      await setDoc(doc(db, "players", uid), {
        playerName: formData.playerName,
        ign: formData.ign,
        email: formData.email,
        uid: uid,
        createdAt: new Date(),
        freeEntry: true, // 👈 for first free entry
      });

      alert("Registration successful!");
      navigate("/auth");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div
      className="auth-container"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="auth-overlay"></div>

      <div className="auth-box">
        <h1 style={{ color: "#facc15" }}>Register</h1>
        <p>Create your account</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="playerName"
            placeholder="Player Name"
            value={formData.playerName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="ign"
            placeholder="In-game Name (IGN)"
            value={formData.ign}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <button
            type="submit"
            style={{ background: "#facc15", color: "#000" }}
          >
            Register
          </button>
        </form>

        <p style={{ marginTop: "1rem" }}>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/auth")}
            style={{ color: "#facc15", cursor: "pointer" }}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}
