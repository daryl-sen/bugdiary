"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Issue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Diary, Comment, Upvote, Location, Type, Version, Tag }) {
      this.belongsTo(Diary, { foreignKey: "diary_id" });
      this.belongsTo(Location, { foreignKey: "location_id" });
      this.belongsTo(Type, { foreignKey: "type_id" });
      this.belongsTo(Version, { foreignKey: "version_id" });
      this.hasMany(Comment, { foreignKey: "issue_id" });
      this.hasMany(Upvote, { foreignKey: "issue_id" });
      this.belongsToMany(Tag, { through: "issue_tags", as: "tags" });
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
