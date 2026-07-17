const Session = require("../models/Session");

async function attachUser(req, res, next) {
  try {
    const token = req.header("x-igts-token");

    if (!token) {
      req.user = null;
      return next();
    }

    const session = await Session.findOne({ token }).populate("user_id", "display_name role soc_id");

    if (!session) {
      req.user = null;
      return next();
    }

    if (session.expires_at < new Date()) {
      await Session.findOneAndDelete({ token });
      req.user = null;
      return next();
    }

    req.user = {
      id: session.user_id._id.toString(),
      display_name: session.user_id.display_name,
      soc_id: session.user_id.soc_id,
      role: session.role,
    };

    return next();
  } catch (error) {
    return next(error);
  }
}

function requireAuth(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: "Authentication required" });
  }

  return next();
}

function requireMember(req, res, next) {
  if (req.user?.role !== "member") {
    return res.status(403).json({ error: "Members only" });
  }

  return next();
}

module.exports = {
  attachUser,
  requireAuth,
  requireMember,
};
