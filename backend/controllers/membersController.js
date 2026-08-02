const Member = require("../models/Member");

function badRequest(message) {
  const error = new Error(message);
  error.status = 400;
  return error;
}

function publicMember(member) {
  if (!member) return null;
  const output = member.toObject ? member.toObject() : { ...member };
  if (!output.show_email) delete output.email;
  return output;
}

async function listMembers(req, res, next) {
  try {
    const filter = {};
    if (req.query.year) filter.year = req.query.year;
    if (req.query.designation) filter.designation = req.query.designation;

    const members = await Member.find(filter).sort({ created_at: -1 });
    return res.json({ members: members.map(publicMember) });
  } catch (error) {
    return next(error);
  }
}

async function getMember(req, res, next) {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ error: "Member not found" });
    return res.json({ member: publicMember(member) });
  } catch (error) {
    return next(error);
  }
}

function validate(body) {
  if (!body.display_name) throw badRequest("display_name is required");
  if (body.bio && body.bio.length > 300) throw badRequest("bio must be 300 characters or fewer");
}

async function createMember(req, res, next) {
  try {
    validate(req.body);
    const member = await Member.create({
      user_id: req.user.id,
      display_name: req.body.display_name,
      soc_id: req.user.soc_id,
      designation: req.body.designation,
      year: req.body.year,
      bio: req.body.bio,
      pfp_url: req.body.pfp_url,
      email: req.body.email,
      show_email: req.body.show_email || false,
      linkedin_url: req.body.linkedin_url,
      personal_site: req.body.personal_site,
    });

    return res.status(201).json({ member });
  } catch (error) {
    return next(error);
  }
}

async function updateMember(req, res, next) {
  try {
    if (req.body.bio && req.body.bio.length > 300) throw badRequest("bio must be 300 characters or fewer");
    const existing = await Member.findById(req.params.id);
    if (!existing) return res.status(404).json({ error: "Member not found" });
    if (existing.user_id.toString() !== req.user.id) return res.status(403).json({ error: "Only the profile owner can update this member profile" });

    const member = await Member.findByIdAndUpdate(
      req.params.id,
      { $set: { ...req.body, updated_at: Date.now() } },
      { new: true, runValidators: true },
    );

    return res.json({ member });
  } catch (error) {
    return next(error);
  }
}

async function deleteMember(req, res, next) {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ error: "Member not found" });
    if (member.user_id.toString() !== req.user.id) return res.status(403).json({ error: "Only the profile owner can delete this member profile" });

    await Member.findByIdAndDelete(req.params.id);
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}

module.exports = { listMembers, getMember, createMember, updateMember, deleteMember };
