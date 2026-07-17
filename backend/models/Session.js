const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  token: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: ["visitor", "member"] },
  created_at: { type: Date, default: Date.now },
  expires_at: { type: Date, required: true },
});

SessionSchema.index({ token: 1 });
SessionSchema.index({ expires_at: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("Session", SessionSchema);
