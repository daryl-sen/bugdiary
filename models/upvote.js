"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Upvote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({}) {
      this.belongsTo(Issue, { foreignKey: "issue_id" });
      this.belongsTo(User, { foreignKey: "user_id" });
    }
  }
  Upvote.init(
    {},
    {
      sequelize,
      modelName: "Upvote",
      tableName: "upvote",
    }
  );
  return Upvote;
};
