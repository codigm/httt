import express from "express";
import crypto from "crypto";
import Participant from "../models/Player.js"; // ✅ import your Mongoose model

const router = express.Router();

// ✅ Verify Razorpay payment signature
router.post("/verify", async (req, res) => {
  try {
    const {
      tournamentId,
      userId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    // Create signature string
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    // Generate expected signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    // Validate signature
    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ error: "Invalid payment signature ❌" });
    }

    // Save participant in DB
    const participant = new Participant({
      tournamentId,
      userId,
      paymentId: razorpay_payment_id,
      status: "joined",
    });

    await participant.save();

    res.json({ message: "✅ Tournament joined successfully!" });
  } catch (err) {
    console.error("❌ Payment verification error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Export router
export default router;
