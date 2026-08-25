// Run with: npm run seed:games
// Adds or updates public showcase games without deleting existing users or content.

require("dotenv").config();
const mongoose = require("mongoose");
const Game = require("./models/Game");
const User = require("./models/User");
const showcaseGames = require("./data/showcaseGames");

const seedShowcaseGames = async () => {
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

  for (const game of showcaseGames) {
    await Game.findOneAndUpdate(
      { slug: game.slug },
      {
        $set: {
          ...game,
          created_by: {
            user_id: admin._id,
            display_name: admin.display_name,
          },
          is_active: true,
          updated_at: Date.now(),
        },
        $setOnInsert: {
          created_at: Date.now(),
        },
      },
      { upsert: true, new: true, runValidators: true },
    );
  }

  console.log(`Seeded ${showcaseGames.length} showcase games`);
  process.exit(0);
};

seedShowcaseGames().catch((err) => {
  console.error(err);
  process.exit(1);
});
