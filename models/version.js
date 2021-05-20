"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Version extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Issue, Diary }) {
      this.hasMany(Issue, { foreignKey: "version_id" });
      this.belongsTo(Diary, { foreignKey: "diary_id", onDelete: "cascade" });
    }
  }
  Version.init(
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
      modelName: "Version",
      tableName: "version",
    }
  );
  return Version;
};
