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
      this.belongsTo(Diary, { foreignKey: "diary_id", onDelete: "cascade" });
    }
  }
  Type.init(
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
      modelName: "Type",
      tableName: "type",
    }
  );
  return Type;
};
