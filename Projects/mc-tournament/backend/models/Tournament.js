import mongoose from "mongoose";

const TournamentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  prize: { type: String, required: true },
  entryFee: { type: Number, required: true }, // for payments
  description: { type: String },
  maxPlayers: { type: Number, default: 100 },
  currentPlayers: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ["upcoming", "ongoing", "completed"],
    default: "upcoming",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Tournament", TournamentSchema);
