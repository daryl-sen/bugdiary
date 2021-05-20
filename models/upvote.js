"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Upvote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Issue, User }) {
      this.belongsTo(Issue, { foreignKey: "issue_id", onDelete: "cascade" });
      this.belongsTo(User, { foreignKey: "user_id", onDelete: "cascade" });
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
