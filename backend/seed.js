// Run once: node seed.js
// Seeds roles and users into MongoDB Atlas.

require("dotenv").config();
const mongoose = require("mongoose");
const Role = require("./models/Role");
const User = require("./models/User");

const seed = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  await Role.deleteMany({});
  await User.deleteMany({});

  await Role.insertMany([{ name: "visitor" }, { name: "member" }]);

  await User.insertMany([
    {
      display_name: "Visitor",
      role: "visitor",
      generated_password: "igts-visit-000",
    },
    {
      display_name: "IGTS Admin",
      role: "member",
      soc_id: "IGTS-001",
      generated_password: "igts-admin-001",
    },
    {
      display_name: "Member Alpha",
      role: "member",
      soc_id: "IGTS-002",
      generated_password: "igts-mem-002",
    },
    {
      display_name: "Member Beta",
      role: "member",
      soc_id: "IGTS-003",
      generated_password: "igts-mem-003",
    },
  ]);

  console.log("Seeded successfully");
  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
