const { default: Page } = require("../model/pages.model");

exports.createPage = async (req, res, next) => {
  const {
    title,
    slug,
    category,
    html_preview,
    css_preview,
    components,
    styles,
  } = req.body;

  try {
    const [page, created] = await Page.upsert(
      {
        title,
        slug,
        category,
        html_preview,
        css_preview,
        components,
        styles,
      },
      { returning: true }
    );

    res
      .status(200)
      .json({ message: created ? "Created" : "Updated", data: page });
  } catch (err) {
    console.error("Save error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getPage = async (req, res, next) => {
  try {
    const page = await Page.findOne({ where: { slug: req.params.slug } });
    if (!page) return res.status(200).json({});
    res.status(200).json(page);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
