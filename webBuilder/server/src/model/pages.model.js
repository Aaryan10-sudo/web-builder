import { DataTypes, Model } from "sequelize";
import { postgres } from "../../config/db/connectPostgres.js";

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
  },
  {
    sequelize: postgres,
    tableName: "pages",
    timestamps: true,
  }
);
export default Page;
