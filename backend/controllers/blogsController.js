const Blog = require("../models/Blog");
const slugify = require("../utils/slugify");

const BLOG_CATEGORIES = new Set(["Game Theories", "Games", "State of the Art", "Research", "Studies", "CS/DSA"]);
const BLOG_STATUSES = new Set(["draft", "published"]);

function validationError(message) {
  const error = new Error(message);
  error.status = 400;
  return error;
}

function validateBlog(body, partial = false) {
  if (!partial && (!body.title || !body.category || !body.content)) {
    throw validationError("title, category, and content are required");
  }
  if (body.category && !BLOG_CATEGORIES.has(body.category)) throw validationError("Invalid blog category");
  if (body.status && !BLOG_STATUSES.has(body.status)) throw validationError("status must be draft or published");
}

async function listBlogs(req, res, next) {
  try {
    const limit = Math.min(Number(req.query.limit) || 20, 100);
    const offset = Number(req.query.offset) || 0;
    const filter = { status: "published" };

    if (req.query.category) filter.category = req.query.category;
    if (req.query.tag) filter.tags = req.query.tag;

    const blogs = await Blog.find(filter).sort({ created_at: -1 }).skip(offset).limit(limit).lean();
    return res.json({ blogs });
  } catch (error) {
    return next(error);
  }
}

async function getBlogBySlug(req, res, next) {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, status: "published" }).lean();
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    return res.json({ blog });
  } catch (error) {
    return next(error);
  }
}

async function createBlog(req, res, next) {
  try {
    validateBlog(req.body);
    const slug = await slugify(req.body.title, Blog);
    const blog = await Blog.create({
      title: req.body.title,
      slug,
      category: req.body.category,
      topic: req.body.topic,
      header_image_url: req.body.header_image_url,
      content: req.body.content,
      tags: Array.isArray(req.body.tags) ? req.body.tags : [],
      external_links: Array.isArray(req.body.external_links) ? req.body.external_links : [],
      read_time_mins: req.body.read_time_mins,
      status: req.body.status || "draft",
      author: {
        user_id: req.user.id,
        display_name: req.user.display_name,
        soc_id: req.user.soc_id,
      },
    });

    return res.status(201).json({ blog });
  } catch (error) {
    return next(error);
  }
}

async function updateBlog(req, res, next) {
  try {
    validateBlog(req.body, true);
    const existing = await Blog.findById(req.params.id);
    if (!existing) return res.status(404).json({ error: "Blog not found" });
    if (existing.author.user_id.toString() !== req.user.id) return res.status(403).json({ error: "Only the author can update this blog" });

    const update = { ...req.body, updated_at: Date.now() };
    if (req.body.title) update.slug = await slugify(req.body.title, Blog);

    const blog = await Blog.findByIdAndUpdate(req.params.id, { $set: update }, { new: true, runValidators: true });
    return res.json({ blog });
  } catch (error) {
    return next(error);
  }
}

async function togglePublish(req, res, next) {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    if (blog.author.user_id.toString() !== req.user.id) return res.status(403).json({ error: "Only the author can publish this blog" });

    blog.status = blog.status === "published" ? "draft" : "published";
    blog.updated_at = Date.now();
    await blog.save();
    return res.json({ blog });
  } catch (error) {
    return next(error);
  }
}

async function deleteBlog(req, res, next) {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    if (blog.author.user_id.toString() !== req.user.id) return res.status(403).json({ error: "Only the author can delete this blog" });

    await Blog.findByIdAndDelete(req.params.id);
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}

module.exports = { listBlogs, getBlogBySlug, createBlog, updateBlog, togglePublish, deleteBlog };
