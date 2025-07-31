const { Model, DataTypes } = require("sequelize");
const { postgres } = require("../config/db/connectPostgres");

class Template extends Model {}

Template.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    preview: {
      type: DataTypes.TEXT,
      allowNull: false,
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
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    sequelize: postgres,
    timestamps: true,
  }
);

module.exports = Template;
