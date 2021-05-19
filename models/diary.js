"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Diary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Diary.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      user_id: DataTypes.INTEGER,
      passcode: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Diary",
      tableName: "diary",
    }
  );
  return Diary;
};
