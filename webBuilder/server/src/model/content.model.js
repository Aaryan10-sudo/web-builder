const { Model, DataTypes } = require("sequelize");
const { postgres } = require("../../config/db/connectPostgres");
const Block = require("./blocks.model");

class Content extends Model {}

Content.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    blockId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: Block,
        key: "id",
      },
      onDelete: "CASCADE",
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    contents: {
      type: DataTypes.JSONB,
      allowNull: false,
    },

    contentCss: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    jsonContent: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  },
  {
    sequelize: postgres,
    modelName: "Content",
    tableName: "contents",
    timestamps: true,
    underscored: true,
  }
);

Content.belongsTo(Block, {
  foreignKey: "blockId",
  as: "block",
});

module.exports = Content;
