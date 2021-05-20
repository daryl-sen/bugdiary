"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Diary, Issue }) {
      this.belongsTo(Diary, { foreignKey: "diary_id", onDelete: "cascade" });
      this.hasMany(Issue, { foreignKey: "location_id" });
    }
  }
  Location.init(
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
      modelName: "Location",
      tableName: "location",
    }
  );
  return Location;
};
