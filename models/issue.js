'use strict';
const {
  Model
} = require('sequelize');
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
  };
  Issue.init({
    reference: DataTypes.STRING,
    diary_id: DataTypes.INTEGER,
    details: DataTypes.TEXT,
    status: DataTypes.STRING,
    reporter_name: DataTypes.STRING,
    reporter_email: DataTypes.STRING,
    report_date: DataTypes.DATE,
    resolve_date: DataTypes.DATE,
    version_id: DataTypes.INTEGER,
    location_id: DataTypes.INTEGER,
    type_id: DataTypes.INTEGER,
    priority: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Issue',
  });
  return Issue;
};