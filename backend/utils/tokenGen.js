const crypto = require("crypto");

function generateToken() {
  return crypto.randomBytes(48).toString("hex");
}

function expiresAt(role) {
  const expires = new Date();

  if (role === "member") {
    expires.setDate(expires.getDate() + 7);
    return expires;
  }

  expires.setHours(expires.getHours() + 24);
  return expires;
}

module.exports = {
  generateToken,
  expiresAt,
};
