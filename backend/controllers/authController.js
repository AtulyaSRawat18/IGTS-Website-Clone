const User = require("../models/User");
const Session = require("../models/Session");
const { generateToken, expiresAt } = require("../utils/tokenGen");

async function visitorLogin(req, res, next) {
  try {
    const user = await User.findOne({ role: "visitor" });

    if (!user) {
      return res.status(500).json({ error: "Visitor user is not seeded" });
    }

    const token = generateToken();
    const expiry = expiresAt("visitor");

    await Session.create({
      user_id: user._id,
      token,
      role: "visitor",
      expires_at: expiry,
    });

    return res.json({
      token,
      role: "visitor",
      display_name: user.display_name,
      expires_at: expiry.toISOString(),
    });
  } catch (error) {
    return next(error);
  }
}

async function memberLogin(req, res, next) {
  try {
    const { soc_id, password } = req.body;

    if (!soc_id || !password) {
      return res.status(400).json({ error: "soc_id and password are required" });
    }

    const user = await User.findOne({
      soc_id,
      generated_password: password,
      role: "member",
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    await Session.findOneAndDelete({ user_id: user._id });

    const token = generateToken();
    const expiry = expiresAt("member");

    await Session.create({
      user_id: user._id,
      token,
      role: "member",
      expires_at: expiry,
    });

    return res.json({
      token,
      role: "member",
      display_name: user.display_name,
      soc_id: user.soc_id,
      user_id: user._id.toString(),
      expires_at: expiry.toISOString(),
    });
  } catch (error) {
    return next(error);
  }
}

async function logout(req, res, next) {
  try {
    const token = req.header("x-igts-token");

    if (!token) {
      return res.status(401).json({ error: "Authentication required" });
    }

    await Session.findOneAndDelete({ token });
    return res.json({ message: "Logged out" });
  } catch (error) {
    return next(error);
  }
}

async function me(req, res, next) {
  try {
    const token = req.header("x-igts-token");

    if (!token) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const session = await Session.findOne({ token }).populate("user_id", "display_name role soc_id");

    if (!session) {
      return res.status(401).json({ error: "Authentication required" });
    }

    if (session.expires_at < new Date()) {
      await Session.findOneAndDelete({ token });
      return res.status(401).json({ error: "Session expired" });
    }

    return res.json({
      user_id: session.user_id._id.toString(),
      display_name: session.user_id.display_name,
      soc_id: session.user_id.soc_id,
      role: session.role,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  visitorLogin,
  memberLogin,
  logout,
  me,
};
