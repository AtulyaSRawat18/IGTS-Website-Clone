const mongoose = require("mongoose");

const ExternalLinkSchema = new mongoose.Schema(
  {
    label: { type: String },
    url: { type: String },
  },
  { _id: false },
);

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: {
    type: String,
    required: true,
    enum: ["Game Theories", "Games", "State of the Art", "Research", "Studies", "CS/DSA"],
  },
  topic: { type: String },
  header_image_url: { type: String },
  content: { type: String, required: true },
  author: {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    display_name: { type: String, required: true },
    soc_id: { type: String },
  },
  status: { type: String, enum: ["draft", "published"], default: "draft" },
  tags: [{ type: String }],
  external_links: [ExternalLinkSchema],
  read_time_mins: { type: Number },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

BlogSchema.index({ status: 1, category: 1 });
BlogSchema.index({ "author.user_id": 1 });

module.exports = mongoose.model("Blog", BlogSchema);
