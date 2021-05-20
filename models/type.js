"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Issue, Diary }) {
      this.hasMany(Issue, { foreignKey: "type_id" });
      this.belongsTo(Diary, { foreignKey: "diary_id" });
    }
  }
  Type.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Type",
      tableName: "type",
    }
  );
  return Type;
};
