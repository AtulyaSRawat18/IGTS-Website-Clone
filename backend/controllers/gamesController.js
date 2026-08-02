const Game = require("../models/Game");
const slugify = require("../utils/slugify");

function badRequest(message) {
  const error = new Error(message);
  error.status = 400;
  return error;
}

async function listGames(req, res, next) {
  try {
    const filter = { is_active: true };
    if (req.query.game_type) filter.game_type = req.query.game_type;
    if (req.query.difficulty) filter.difficulty = req.query.difficulty;

    const games = await Game.find(filter).sort({ created_at: -1 }).lean();
    return res.json({ games });
  } catch (error) {
    return next(error);
  }
}

async function getGame(req, res, next) {
  try {
    const game = await Game.findOne({ slug: req.params.slug, is_active: true }).lean();
    if (!game) return res.status(404).json({ error: "Game not found" });
    return res.json({ game });
  } catch (error) {
    return next(error);
  }
}

async function createGame(req, res, next) {
  try {
    if (!req.body.name) throw badRequest("name is required");
    const slug = await slugify(req.body.name, Game);
    const game = await Game.create({
      name: req.body.name,
      slug,
      tagline: req.body.tagline,
      description: req.body.description,
      game_type: req.body.game_type,
      difficulty: req.body.difficulty,
      play_url: req.body.play_url,
      thumbnail_url: req.body.thumbnail_url,
      tags: Array.isArray(req.body.tags) ? req.body.tags : [],
      created_by: {
        user_id: req.user.id,
        display_name: req.user.display_name,
      },
    });

    return res.status(201).json({ game });
  } catch (error) {
    return next(error);
  }
}

async function assertCreator(id, userId) {
  const game = await Game.findById(id);
  if (!game) return { error: "not-found" };
  if (game.created_by.user_id.toString() !== userId) return { error: "forbidden" };
  return { game };
}

async function updateGame(req, res, next) {
  try {
    const check = await assertCreator(req.params.id, req.user.id);
    if (check.error === "not-found") return res.status(404).json({ error: "Game not found" });
    if (check.error === "forbidden") return res.status(403).json({ error: "Only the creator can update this game" });

    const update = { ...req.body, updated_at: Date.now() };
    if (req.body.name) update.slug = await slugify(req.body.name, Game);

    const game = await Game.findByIdAndUpdate(req.params.id, { $set: update }, { new: true, runValidators: true });
    return res.json({ game });
  } catch (error) {
    return next(error);
  }
}

async function toggleGame(req, res, next) {
  try {
    const check = await assertCreator(req.params.id, req.user.id);
    if (check.error === "not-found") return res.status(404).json({ error: "Game not found" });
    if (check.error === "forbidden") return res.status(403).json({ error: "Only the creator can toggle this game" });

    check.game.is_active = !check.game.is_active;
    check.game.updated_at = Date.now();
    await check.game.save();
    return res.json({ game: check.game });
  } catch (error) {
    return next(error);
  }
}

async function deleteGame(req, res, next) {
  try {
    const check = await assertCreator(req.params.id, req.user.id);
    if (check.error === "not-found") return res.status(404).json({ error: "Game not found" });
    if (check.error === "forbidden") return res.status(403).json({ error: "Only the creator can delete this game" });

    await Game.findByIdAndDelete(req.params.id);
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}

module.exports = { listGames, getGame, createGame, updateGame, toggleGame, deleteGame };
