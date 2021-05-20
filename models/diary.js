"use strict";
const { Model } = require("sequelize");
// use a shorter uuid than what uuidv4 generates for users
const { nanoid } = require("../helpers/nanoid-custom");

module.exports = (sequelize, DataTypes) => {
  class Diary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Issue, Version, Type, Tag, Location }) {
      this.belongsTo(User, { foreignKey: "user_id", allowNull: true });
      this.hasMany(Issue, { foreignKey: "diary_id" });
      this.hasMany(Version, { foreignKey: "diary_id" });
      this.hasMany(Type, { foreignKey: "diary_id" });
      this.hasMany(Tag, { foreignKey: "diary_id" });
      this.hasMany(Location, { foreignKey: "diary_id" });
    }
  }
  Diary.init(
    {
      uuid: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: nanoid,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 100],
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 500],
        },
      },
      passcode: {
        type: DataTypes.STRING,
        allowNull: true, // only required for diaries with no user_id
      },
    },
    {
      sequelize,
      modelName: "Diary",
      tableName: "diary",
      indexes: [
        {
          unique: true,
          fields: ["uuid"],
        },
      ],
    }
  );
  return Diary;
};
