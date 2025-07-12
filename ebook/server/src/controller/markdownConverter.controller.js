const fs = require("fs");
const fsp = require("fs").promises;
const path = require("path");
const pdfParse = require("pdf-parse");
const axios = require("axios");
const { uploadToCloudinary } = require("../utils/cloudinary");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

exports.convertPdfToMarkdown = async (req, res) => {
  const uploadedPath = req.file?.path;

  if (!uploadedPath) {
    return res.status(400).send("No PDF file uploaded.");
  }

  try {
    const pdfBuffer = fs.readFileSync(uploadedPath);
    const data = await pdfParse(pdfBuffer);

    if (!data.text || data.text.trim() === "") {
      return res.status(400).send("Could not extract text from PDF.");
    }

    let pdfText = data.text;
    const maxPromptLength = 30000;
    if (pdfText.length > maxPromptLength) {
      pdfText = pdfText.substring(0, maxPromptLength);
    }

    const prompt = `Convert the following text, extracted from a PDF, into clean and well-formatted markdown. Preserve headings, lists, code blocks, and general structure where possible:\n\n${pdfText}`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
      { contents: [{ parts: [{ text: prompt }] }] },
      { headers: { "Content-Type": "application/json" } }
    );

    const candidate = response?.data?.candidates?.[0];
    const markdownContent = candidate?.content?.parts?.[0]?.text;

    if (!markdownContent) {
      return res.status(500).send("Error: Failed to retrieve markdown.");
    }

    const tempDir = path.join(__dirname, "../temp_markdown");
    await fsp.mkdir(tempDir, { recursive: true });

    const baseName = path.parse(req.file.originalname).name;
    const filename = `${baseName}_${Date.now()}.md`;
    const filepath = path.join(tempDir, filename);

    await fsp.writeFile(filepath, markdownContent, "utf8");

    let cloudinaryUrl = null;
    try {
      cloudinaryUrl = await uploadToCloudinary(
        filepath,
        `markdown_files/${baseName}`
      );
    } catch (err) {
      console.error("Cloudinary upload failed:", err);
    }

    await fsp.unlink(filepath);
    await fsp.unlink(uploadedPath);

    res.status(200).json({
      markdown: markdownContent,
      cloudinary_url: cloudinaryUrl,
      message: cloudinaryUrl
        ? "Markdown uploaded to Cloudinary."
        : "Markdown created, but Cloudinary upload failed.",
    });
  } catch (err) {
    console.error("Conversion error:", err);
    res.status(500).send("Internal Server Error: PDF to Markdown failed.");
  }
};
