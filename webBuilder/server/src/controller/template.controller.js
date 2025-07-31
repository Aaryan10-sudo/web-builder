const Template = require("../../models/template.model");

exports.createTemplateController = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await Template.create(data);
    res.status(200).json({
      success: true,
      message: "Template created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllTemplateController = async (req, res, next) => {
  try {
    const result = await Template.findAll();
    res.status(200).json({
      success: true,
      message: "Templates fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getTemplateContentByRoute = async (req, res, next) => {
  const route = req.query.route;
  try {
    const result = await Template.findOne({
      where: {
        "content.route": route,
      },
    });

    if (!result) {
      return res.status(404).json({ message: "Template not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching template by route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateTemplateContentByRoute = async (req, res, next) => {
  const route = req.query.route;
  const newHtmlContent = req.body.html; // The html comes from the request body

  // Basic validation
  if (!route || !newHtmlContent) {
    return res
      .status(400)
      .json({ message: "Route and HTML content are required." });
  }

  try {
    // 1. READ: Find the template first using the correct JSON query syntax.
    // This assumes your `content` column is of type JSON or JSONB in PostgreSQL.
    const template = await Template.findOne({
      where: {
        // The correct way to query a nested field in a JSONB column
        "content.route": route,
        // For other DBs or plain JSON, you might need a more complex query.
        // This syntax is generally supported for PG JSONB.
      },
    });

    if (!template) {
      return res
        .status(404)
        .json({ message: "Template not found for the specified route." });
    }

    // 2. MODIFY: Update the 'html' property of the content object in memory.
    template.content.html = newHtmlContent;

    // IMPORTANT: Mark the 'content' field as changed for Sequelize.
    // When you modify a nested property of a JSON object, Sequelize
    // doesn't detect the change automatically. This line tells it to save the column.
    template.changed("content", true);

    // 3. WRITE: Save the entire updated template object back to the database.
    const updatedTemplate = await template.save();

    res.status(200).json({
      message: "Template content updated successfully",
      template: updatedTemplate,
    });
  } catch (error) {
    console.error("Error updating template content by route:", error);
    res.status(500).json({
      message: "An internal server error occurred.",
      error: error.message,
    });
  }
};
