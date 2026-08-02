const JoinPage = require("../models/JoinPage");

async function listJoinSections(req, res, next) {
  try {
    const sections = await JoinPage.find({ is_active: true }).sort({ display_order: 1, created_at: 1 }).lean();
    return res.json({ sections });
  } catch (error) {
    return next(error);
  }
}

async function createJoinSection(req, res, next) {
  try {
    const section = await JoinPage.create({
      section_title: req.body.section_title,
      body_text: req.body.body_text,
      cta_label: req.body.cta_label,
      cta_url: req.body.cta_url,
      display_order: req.body.display_order || 0,
      created_by: {
        user_id: req.user.id,
        display_name: req.user.display_name,
      },
    });

    return res.status(201).json({ section });
  } catch (error) {
    return next(error);
  }
}

async function assertCreator(id, userId) {
  const section = await JoinPage.findById(id);
  if (!section) return { error: "not-found" };
  if (section.created_by.user_id?.toString() !== userId) return { error: "forbidden" };
  return { section };
}

async function updateJoinSection(req, res, next) {
  try {
    const check = await assertCreator(req.params.id, req.user.id);
    if (check.error === "not-found") return res.status(404).json({ error: "Join section not found" });
    if (check.error === "forbidden") return res.status(403).json({ error: "Only the creator can update this join section" });

    const section = await JoinPage.findByIdAndUpdate(
      req.params.id,
      { $set: { ...req.body, updated_at: Date.now() } },
      { new: true, runValidators: true },
    );

    return res.json({ section });
  } catch (error) {
    return next(error);
  }
}

async function toggleJoinSection(req, res, next) {
  try {
    const section = await JoinPage.findById(req.params.id);
    if (!section) return res.status(404).json({ error: "Join section not found" });

    section.is_active = !section.is_active;
    section.updated_at = Date.now();
    await section.save();
    return res.json({ section });
  } catch (error) {
    return next(error);
  }
}

async function deleteJoinSection(req, res, next) {
  try {
    const check = await assertCreator(req.params.id, req.user.id);
    if (check.error === "not-found") return res.status(404).json({ error: "Join section not found" });
    if (check.error === "forbidden") return res.status(403).json({ error: "Only the creator can delete this join section" });

    await JoinPage.findByIdAndDelete(req.params.id);
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}

module.exports = { listJoinSections, createJoinSection, updateJoinSection, toggleJoinSection, deleteJoinSection };
