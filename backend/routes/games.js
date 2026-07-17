const express = require("express");
const controller = require("../controllers/gamesController");
const { requireMember } = require("../middleware/roleGuard");

const router = express.Router();

router.get("/", controller.listGames);
router.get("/:slug", controller.getGame);
router.post("/", requireMember, controller.createGame);
router.put("/:id", requireMember, controller.updateGame);
router.patch("/:id/toggle", requireMember, controller.toggleGame);
router.delete("/:id", requireMember, controller.deleteGame);

module.exports = router;
