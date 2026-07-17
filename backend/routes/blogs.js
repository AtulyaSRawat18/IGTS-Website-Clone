const express = require("express");
const controller = require("../controllers/blogsController");
const { requireMember } = require("../middleware/roleGuard");

const router = express.Router();

router.get("/", controller.listBlogs);
router.get("/:slug", controller.getBlogBySlug);
router.post("/", requireMember, controller.createBlog);
router.put("/:id", requireMember, controller.updateBlog);
router.patch("/:id/publish", requireMember, controller.togglePublish);
router.delete("/:id", requireMember, controller.deleteBlog);

module.exports = router;
