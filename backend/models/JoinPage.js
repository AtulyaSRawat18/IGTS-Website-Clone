const mongoose = require("mongoose");

const JoinPageSchema = new mongoose.Schema({
  section_title: { type: String },
  body_text: { type: String },
  cta_label: { type: String },
  cta_url: { type: String },
  is_active: { type: Boolean, default: true },
  display_order: { type: Number, default: 0 },
  created_by: {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    display_name: { type: String },
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("JoinPage", JoinPageSchema);
