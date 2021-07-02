"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Issue }) {
      this.hasMany(Issue, { foreignKey: "status_id" });
    }
  }
  Status.init(
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
      modelName: "Status",
      tableName: "status",
      timestamps: false
    }
  );
  return Status;
};
