import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import paymentRoutes from "./routes/payments.js"; // Razorpay payment routes
import playersRoute from "./routes/players.js"; // Your players backend file

dotenv.config();
const app = express();
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/payments", paymentRoutes); // Razorpay payment API
app.use("/api/players", playersRoute); // Players API

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
