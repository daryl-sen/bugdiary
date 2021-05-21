"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class IssueTags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {}
  }
  IssueTags.init(
    {},
    {
      sequelize,
      modelName: "IssueTags",
      tableName: "issue_tags",
    }
  );
  return IssueTags;
};
