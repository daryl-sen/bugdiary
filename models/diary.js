"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Diary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Issue, Version, Type, IssueTag, Tag, Location }) {
      this.belongsTo(User);
    }
  }
  Diary.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
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
