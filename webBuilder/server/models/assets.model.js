const { Model, DataTypes } = require("sequelize");
const { postgres } = require("../config/db/connectPostgres");

class Assets extends Model {}

Assets.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: postgres,
  }
);

module.exports = Assets;
