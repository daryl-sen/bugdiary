"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Diary, Issue }) {
      this.belongsTo(Diary, { foreignKey: "diary_id" });
      this.belongsToMany(Issue, { through: "issue_tags", as: "tag_id" });
    }
  }
  Tag.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Tag",
      tableName: "tag",
    }
  );
  return Tag;
};
