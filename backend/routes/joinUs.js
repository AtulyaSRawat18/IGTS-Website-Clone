const express = require("express");
const controller = require("../controllers/joinUsController");
const { requireMember } = require("../middleware/roleGuard");

const router = express.Router();

router.get("/", controller.listJoinSections);
router.post("/", requireMember, controller.createJoinSection);
router.put("/:id", requireMember, controller.updateJoinSection);
router.patch("/:id/toggle", requireMember, controller.toggleJoinSection);
router.delete("/:id", requireMember, controller.deleteJoinSection);

module.exports = router;
