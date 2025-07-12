const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db/connectPostgres");

class Book extends Model {}

Book.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publishedYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    coverPage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    language: {
      type: String,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    modelName: "Book",
    tableName: "books",
    timestamps: true,
  }
);
