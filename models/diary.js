"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Diary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Issue, Version, Type, Tag, Location }) {
      this.belongsTo(User, { foreignKey: "user_id", onDelete: "cascade" });
      this.hasMany(Issue, { foreignKey: "diary_id" });
      this.hasMany(Version, { foreignKey: "diary_id" });
      this.hasMany(Type, { foreignKey: "diary_id" });
      this.hasMany(Tag, { foreignKey: "diary_id" });
      this.hasMany(Location, { foreignKey: "diary_id" });
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
