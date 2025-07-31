const { DataTypes, Model } = require("sequelize");
const { postgres } = require("../config/db/connectPostgres.js");

class Page extends Model {}

Page.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    slug: { type: DataTypes.STRING, unique: true },
    category: DataTypes.STRING,
    html_preview: DataTypes.TEXT,
    css_preview: DataTypes.TEXT,
    components: DataTypes.JSONB,
    styles: DataTypes.JSONB,
    tailwind_classes: DataTypes.JSONB,
  },
  {
    sequelize: postgres,
    tableName: "Pages",
    modelName: "Page",
    timestamps: true,
  }
);

module.exports = { Page };
