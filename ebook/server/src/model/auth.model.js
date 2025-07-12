const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db/connectPostgres");
const { hashPassword } = require("../lib/bcrypt/bcrypt");

class Auth extends Model {}

Auth.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "user",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hasSubscription: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    subscriptionPlan: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Auth",
    tableName: "Auths",
    timestamps: true,
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          await hashPassword(user.password);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          await hashPassword(user.password);
        }
      },
    },
  }
);

module.exports = Auth;
