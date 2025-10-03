import express from "express";
import Player from "../models/Player.js";
import Tournament from "../models/Tournament.js";

const router = express.Router();

// ✅ Register (join) a player after successful payment
router.post("/", async (req, res) => {
  try {
    const { name, userId, tournamentId, paymentStatus } = req.body;

    // 1. Validate fields
    if (!name || !userId || !tournamentId || !paymentStatus) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // 2. Payment check
    if (paymentStatus !== "success") {
      return res.status(400).json({ error: "Payment not completed" });
    }

    // 3. Tournament exists check
    const tournament = await Tournament.findById(tournamentId);
    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }

    // (Optional) Capacity check
    if (
      tournament.maxPlayers &&
      tournament.currentPlayers >= tournament.maxPlayers
    ) {
      return res.status(400).json({ error: "Tournament is full" });
    }

    // 4. Duplicate join check
    const alreadyJoined = await Player.findOne({ userId, tournamentId });
    if (alreadyJoined) {
      return res.status(400).json({ error: "Already joined this tournament" });
    }

    // 5. Save player
    const player = new Player({ name, userId, tournamentId });
    await player.save();

    // (Optional) Increment tournament player count
    tournament.currentPlayers = (tournament.currentPlayers || 0) + 1;
    await tournament.save();

    res.status(201).json({
      message: "Player joined tournament successfully",
      player,
    });
  } catch (err) {
    console.error("❌ Player registration error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get all players for a tournament
router.get("/:tournamentId", async (req, res) => {
  try {
    const players = await Player.find({
      tournamentId: req.params.tournamentId,
    });
    res.json({ players });
  } catch (err) {
    console.error("❌ Fetch players error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
