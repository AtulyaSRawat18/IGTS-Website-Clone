require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const connectDB = require("./db");
const auth = require("./routes/auth");
const blogs = require("./routes/blogs");
const members = require("./routes/members");
const games = require("./routes/games");
const joinUs = require("./routes/joinUs");
const { attachUser } = require("./middleware/roleGuard");
const errorHandler = require("./middleware/errorHandler");

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
  : true;

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());
app.use(attachUser);

app.get("/", (req, res) => {
  res.json({ service: "igts-backend", status: "ok" });
});

app.get("/api/health", (req, res) => {
  res.json({
    service: "igts-backend",
    status: "ok",
    database: mongoose.connection.readyState === 1 ? "connected" : "connecting",
  });
});

app.use("/api/auth", auth);
app.use("/api/blogs", blogs);
app.use("/api/members", members);
app.use("/api/games", games);
app.use("/api/join", joinUs);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`IGTS backend listening on port ${PORT}`);
});

module.exports = app;
