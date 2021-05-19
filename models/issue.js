"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Issue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Issue.init(
    {
      reference: DataTypes.STRING,
      details: DataTypes.TEXT,
      status: DataTypes.STRING,
      reporter_name: DataTypes.STRING,
      reporter_email: DataTypes.STRING,
      report_date: DataTypes.DATE,
      resolve_date: DataTypes.DATE,
      priority: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Issue",
      tableName: "issue",
    }
  );
  return Issue;
};
