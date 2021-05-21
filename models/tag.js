"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Diary, Issue, IssueTags }) {
      this.belongsTo(Diary, { foreignKey: "diary_id", onDelete: "cascade" });
      this.belongsToMany(Issue, { through: IssueTags, as: "issue" });
    }
  }
  Tag.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 30],
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Tag",
      tableName: "tag",
      timestamps: false,
    }
  );
  return Tag;
};
