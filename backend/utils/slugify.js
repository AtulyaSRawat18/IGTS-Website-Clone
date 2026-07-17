const slugify = async (text, Model) => {
  let slug = String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  if (!slug) {
    slug = `item-${Date.now()}`;
  }

  let exists = await Model.findOne({ slug });
  let counter = 2;

  while (exists) {
    const candidate = `${slug}-${counter}`;
    exists = await Model.findOne({ slug: candidate });
    if (!exists) {
      slug = candidate;
      break;
    }
    counter += 1;
  }

  return slug;
};

module.exports = slugify;
