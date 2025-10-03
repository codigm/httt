// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Tournaments from "./pages/Tournaments";
import Register from "./pages/register";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import AuthPage from "./pages/AuthPage";
import Pay from "./pages/Pay";
import Leaderboard from "./pages/Leaderboard";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLayout from "./layouts/AdminLayout";
import ManageModes from "./pages/ManageModes"; // ✅ Layout wrapper for admin pages
import PracticeCard from "./components/PracticeCard";

import "./pages/Leaderboard.css";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Public routes (always show Navbar) */}
        <Route
          path="/"
          element={
            <div className="app-container">
              <Navbar />
              <div className="main-content" style={{ paddingTop: "4.5rem" }}>
                <Home />
              </div>
            </div>
          }
        />
        <Route
          path="/tournaments"
          element={
            <div className="app-container">
              <Navbar />
              <div className="main-content" style={{ paddingTop: "4.5rem" }}>
                <Tournaments />
              </div>
            </div>
          }
        />
        <Route
          path="/register"
          element={
            <div className="app-container">
              <Navbar />
              <div className="main-content" style={{ paddingTop: "4.5rem" }}>
                <Register />
              </div>
            </div>
          }
        />
        <Route
          path="/auth"
          element={
            <div className="app-container">
              <Navbar />
              <div className="main-content" style={{ paddingTop: "4.5rem" }}>
                <AuthPage />
              </div>
            </div>
          }
        />
        <Route
          path="/pay/:tournamentId"
          element={
            <div className="app-container">
              <Navbar />
              <div className="main-content" style={{ paddingTop: "4.5rem" }}>
                <Pay />
              </div>
            </div>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <div className="app-container">
              <Navbar />
              <div className="main-content" style={{ paddingTop: "4.5rem" }}>
                <Leaderboard />
              </div>
            </div>
          }
        />
        {/* ✅ NEW PRACTICE ROUTE */}
        <Route
          path="/PracticeCard"
          element={
            <div className="app-container">
              <Navbar />
              <div className="main-content" style={{ paddingTop: "4.5rem" }}>
                <PracticeCard />
              </div>
            </div>
          }
        />

        {/* ✅ Admin routes (NO Navbar, use AdminLayout instead) */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="tournaments" element={<Tournaments />} />
          <Route path="modes" element={<ManageModes />} />

          {/* You can add more admin routes here, e.g. */}
          {/* <Route path="tournaments" element={<AdminTournaments />} /> */}
          {/* <Route path="modes" element={<AdminModes />} /> */}
        </Route>

        {/* Not found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
