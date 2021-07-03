"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Preferences extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User, {
        foreignKey: "user_id",
        onDelete: "cascade",
      });
    }
  }
  Preferences.init(
    {
      default_view: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "cards",
      },
      nightmode_start: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "20:00",
      },
      nightmode_end: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "07:00",
      },
      nightmode_override: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Preferences",
      tableName: "preferences",
    }
  );
  return Preferences;
};
