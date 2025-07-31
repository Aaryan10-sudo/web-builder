const { JSDOM } = require("jsdom");
const { DOMParser } = require("xmldom");
const Blocks = require("../../models/blocks.model");
const Content = require("../../models/content.model");


function htmlToJson(node) {
  // If it's a text node
  if (node.nodeType === 3) {
    const text = node.nodeValue.trim();
    return text ? { text } : null;
  }

  // If it's an element node
  if (node.nodeType === 1) {
    const tag = node.tagName;
    const attributes = {};
    for (let i = 0; i < node.attributes.length; i++) {
      const attr = node.attributes[i];
      attributes[attr.name] = attr.value;
    }

    const children = [];
    for (let i = 0; i < node.childNodes.length; i++) {
      const childJson = htmlToJson(node.childNodes[i]);
      if (childJson) children.push(childJson);
    }

    return {
      tag,
      attributes,
      children,
    };
  }

  return null;
}

function parseHtmlToJson(html) {
  const wrappedHtml = `<body>${html}</body>`;
  const doc = new DOMParser().parseFromString(wrappedHtml, "text/html");
  const body = doc.getElementsByTagName("body")[0];

  const children = [];

  for (let i = 0; i < body.childNodes.length; i++) {
    const json = htmlToJson(body.childNodes[i]);
    if (json) children.push(json);
  }

  return children;
}

function extractTagClasses(html) {
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

exports.createBlockController = async (req, res, next) => {
  const data = req.body;

  try {
    const result = await Blocks.create(data);

    const html = data.content || data.html || "";

    const contentCss = extractTagClasses(html);
    const jsonContent = parseHtmlToJson(html);

    await Content.create({
      blockId: result.id,
      title: result.title,
      contents: html,
      contentCss: contentCss,
      jsonContent: jsonContent,
    });

    res.status(201).json({
      success: true,
      message: "Block and content created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.getAllBlockController = async (req, res, next) => {
  try {
    const data = await Blocks.findAll();
    res.json({
      success: true,
      message: "All blocks fetched successfully",
      data: data,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.updateBlockController = async (req, res, next) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    await Blocks.update({ content }, { where: { id } });
    await Content.update(
      { contents: content, contentCss: extractTagClasses(content) },
      { where: { blockId: id } }
    );
    res.json({ success: true, message: "Block updated successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Update failed.", error });
  }
};
