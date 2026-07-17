const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/visitor", authController.visitorLogin);
router.post("/member", authController.memberLogin);
router.post("/logout", authController.logout);
router.get("/me", authController.me);

module.exports = router;
