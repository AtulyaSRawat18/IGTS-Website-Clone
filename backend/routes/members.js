const express = require("express");
const controller = require("../controllers/membersController");
const { requireMember } = require("../middleware/roleGuard");

const router = express.Router();

router.get("/", controller.listMembers);
router.get("/:id", controller.getMember);
router.post("/", requireMember, controller.createMember);
router.put("/:id", requireMember, controller.updateMember);
router.delete("/:id", requireMember, controller.deleteMember);

module.exports = router;
