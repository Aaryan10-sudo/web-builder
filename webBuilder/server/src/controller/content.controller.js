const Content = require("../model/content.model");
const { JSDOM } = require("jsdom");

function extractTagClasses(html) {
  if (!html || typeof html !== "string") {
    return {};
  }
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const tags = ["h1", "h2", "h3", "p", "button", "section", "div", "span"];
  const css = {};

  tags.forEach((tag) => {
    document.querySelectorAll(tag).forEach((el) => {
      const className = el.getAttribute("class") || "";
      if (className) {
        css[tag] = css[tag] || [];
        css[tag].push(...className.split(" ").filter(Boolean));
      }
    });
  });

  Object.keys(css).forEach((tag) => {
    css[tag] = [...new Set(css[tag])];
  });

  return css;
}

exports.createContent = async (req, res) => {
  try {
    const { title, contents } = req.body;
    const contentCss = extractTagClasses(contents);

    const content = await Content.create({ title, contents, contentCss });
    res.status(201).json({ success: true, data: content });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getContent = async (req, res, next) => {
  try {
    const content = await Content.findByPk(req.params.id);
    if (!content) {
      return res.status(404).json({
        status: false,
        message: "Content not found",
      });
    }
    res.status(200).json({
      status: true,
      message: "Content fetched successfully",
      data: {
        content,
      },
    });
  } catch (error) {
    res.status(500).json({});
  }
};

exports.getAllContents = async (req, res, next) => {
  try {
    const contents = await Content.findAll();
    res.status(200).json({
      status: true,
      message: "Contents fetched successfully",
      data: {
        contents,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateContent = async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updatedContent = await Content.update(req.body, {
      where: { id: req.params.id },
      data: data,
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "Content Updated Successfully",
      data: updatedContent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
