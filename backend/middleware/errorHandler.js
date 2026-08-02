function errorHandler(err, req, res, next) {
  if (err.code === "23505") {
    return res.status(409).json({ error: "A record with that value already exists" });
  }

  if (err.code === "23503") {
    return res.status(400).json({ error: "Related record does not exist" });
  }

  if (err.status) {
    return res.status(err.status).json({ error: err.message });
  }

  console.error(err.stack || err);
  return res.status(500).json({ error: "Internal server error" });
}

module.exports = errorHandler;
