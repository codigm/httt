// src/pages/AuthPage.jsx
import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import bgImage from "../assets/image.png"; // your background image
import "./AuthPage.css"; // import CSS file

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  // Load saved email if Remember Me was used
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const login = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);

      // Save email if Remember Me checked, else clear
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      // ✅ Check if this is the admin
      if (email === "admin@example.com") {
        localStorage.setItem("isAdmin", "true");
        navigate("/admin/dashboard");
      } else {
        localStorage.setItem("isUser", "true");
        navigate("/tournaments");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Please enter your email first to reset password.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent to your email!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div
      className="auth-container"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Dark overlay */}
      <div className="auth-overlay"></div>

      {/* Login Box */}
      <div className="auth-box">
        <h1>
          Professional <span style={{ color: "#ec4899" }}>Gamer</span>
        </h1>
        <p>Login to your account</p>

        <form onSubmit={login}>
          <input
            type="email"
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex items-center justify-between w-full text-sm mb-4">
            <label className="auth-remember">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
            <span
              onClick={handleForgotPassword}
              className="text-blue-400 hover:underline cursor-pointer"
            >
              Forgot password?
            </span>
          </div>

          <button type="submit">LOGIN</button>
        </form>

        <p style={{ marginTop: "1rem" }}>
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{ color: "#3b82f6", cursor: "pointer" }}
          >
            Sign up here.
          </span>
        </p>
      </div>
    </div>
  );
}
