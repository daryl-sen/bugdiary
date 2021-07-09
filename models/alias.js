"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Alias extends Model {
    static associate({ Diary }) {
      this.belongsTo(Diary, { foreignKey: "diary_id", onDelete: "cascade" });
    }
  }
  Alias.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Alias",
      tableName: "alias",
    }
  );
  return Alias;
};
