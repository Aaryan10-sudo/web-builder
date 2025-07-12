const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db/connectPostgres");

class Subscription extends Model {}

Subscription.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("Yearly", "Monthly"),
      allowNull: false,
    },
    pricing: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    features: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: false,
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    discountType: {
      type: DataTypes.ENUM("Percentage", "Flat"),
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize: sequelize,
    modelName: "Subscription",
    tableName: "subscriptions",
    timestamps: true,
    hooks: {
      beforeValidate(subscription) {
        if (subscription.discount && !subscription.discountType) {
          throw new Error(
            "Discount type is required when discount is provided"
          );
        }
      },
    },
  }
);

module.exports = Subscription;
