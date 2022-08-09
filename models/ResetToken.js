const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

class ResetToken extends Model {}

ResetToken.init(
  {
    user_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "reset_token",
  }
);

module.exports = ResetToken;
