"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Issue, User }) {
      // define association here
      this.belongsTo(Issue, { foreignKey: "issue_id", onDelete: "cascade" });
      this.belongsTo(User, { foreignKey: "user_id", onDelete: "cascade" });
    }
  }
  Comment.init(
    {
      content: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Comment",
      tableName: "comment",
    }
  );
  return Comment;
};
