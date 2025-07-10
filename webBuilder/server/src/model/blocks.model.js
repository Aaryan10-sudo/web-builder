const { Model, DataTypes } = require("sequelize");
const { postgres } = require("../../config/db/connectPostgres");

class Blocks extends Model {}

Blocks.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    label: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: postgres,
    modelName: "Blocks",
    tableName: "blocks",
    timestamps: false,
  }
);

module.exports = Blocks;
