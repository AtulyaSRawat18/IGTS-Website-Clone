const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  tagline: { type: String },
  description: { type: String },
  game_type: {
    type: String,
    enum: ["Zero-Sum", "Cooperative", "Auction", "Coordination"],
  },
  difficulty: { type: String, enum: ["Beginner", "Intermediate", "Advanced"] },
  play_url: { type: String },
  thumbnail_url: { type: String },
  tags: [{ type: String }],
  created_by: {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    display_name: { type: String },
  },
  is_active: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

GameSchema.index({ slug: 1 });
GameSchema.index({ is_active: 1, game_type: 1 });

module.exports = mongoose.model("Game", GameSchema);
