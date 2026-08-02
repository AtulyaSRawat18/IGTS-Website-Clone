const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  display_name: { type: String, required: true },
  soc_id: { type: String },
  designation: { type: String },
  year: {
    type: String,
    enum: ["Core Committee", "Third Year", "Second Year", "First Year", "Alumni"],
  },
  bio: {
    type: String,
    maxlength: [300, "Bio cannot exceed 300 characters"],
  },
  pfp_url: { type: String },
  email: { type: String },
  show_email: { type: Boolean, default: false },
  linkedin_url: { type: String },
  personal_site: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Member", MemberSchema);
