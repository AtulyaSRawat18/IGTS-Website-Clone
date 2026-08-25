// Run with: npm run seed:articles
// Adds or updates published Ledger articles without deleting existing content.

require("dotenv").config();
const mongoose = require("mongoose");
const Blog = require("./models/Blog");
const User = require("./models/User");
const showcaseArticles = require("./data/showcaseArticles");

const seedShowcaseArticles = async () => {
  await mongoose.connect(process.env.MONGODB_URI);

  const admin = await User.findOneAndUpdate(
    { soc_id: "IGTS-001" },
    {
      $setOnInsert: {
        display_name: "IGTS Admin",
        role: "member",
        generated_password: "igts-admin-001",
      },
    },
    { new: true, upsert: true },
  );

  for (const article of showcaseArticles) {
    await Blog.findOneAndUpdate(
      { slug: article.slug },
      {
        $set: {
          ...article,
          status: "published",
          author: {
            user_id: admin._id,
            display_name: admin.display_name,
            soc_id: admin.soc_id,
          },
          updated_at: Date.now(),
        },
        $setOnInsert: {
          created_at: Date.now(),
        },
      },
      { upsert: true, new: true, runValidators: true },
    );
  }

  console.log(`Seeded ${showcaseArticles.length} showcase articles`);
  process.exit(0);
};

seedShowcaseArticles().catch((err) => {
  console.error(err);
  process.exit(1);
});
