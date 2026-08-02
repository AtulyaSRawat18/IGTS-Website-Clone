const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  display_name: { type: String, required: true },
  role: { type: String, required: true, enum: ["visitor", "member"] },
  soc_id: { type: String, unique: true, sparse: true },
  generated_password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
