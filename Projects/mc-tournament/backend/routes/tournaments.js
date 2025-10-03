// Join a tournament after payment
router.post("/:id/join", async (req, res) => {
  try {
    const { playerId, paymentStatus } = req.body;

    // Payment verification step here
    if (paymentStatus !== "success") {
      return res.status(400).json({ error: "Payment not completed" });
    }

    const tournament = await Tournament.findById(req.params.id);
    if (!tournament)
      return res.status(404).json({ error: "Tournament not found" });

    // Avoid duplicate joins
    if (tournament.players.includes(playerId)) {
      return res.status(400).json({ error: "Already joined" });
    }

    tournament.players.push(playerId);
    await tournament.save();

    res.json({ message: "Successfully joined tournament", tournament });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
