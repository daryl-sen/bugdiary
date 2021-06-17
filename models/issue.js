"use strict";
const { Model } = require("sequelize");
const { nanoidNum } = require("../helpers/nanoid-custom");

module.exports = (sequelize, DataTypes) => {
  class Issue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      Diary,
      Comment,
      Upvote,
      Location,
      Type,
      Version,
      Tag,
      IssueTags,
    }) {
      this.belongsTo(Diary, { foreignKey: "diary_id", onDelete: "cascade" });
      this.belongsTo(Location, {
        foreignKey: "location_id",
        onDelete: "cascade",
      });
      this.belongsTo(Type, { foreignKey: "type_id", onDelete: "cascade" });
      this.belongsTo(Version, {
        foreignKey: "version_id",
        onDelete: "cascade",
      });
      this.hasMany(Comment, { foreignKey: "issue_id" });
      this.hasMany(Upvote, { foreignKey: "issue_id" });
      this.belongsToMany(Tag, { through: IssueTags, as: "tag" });
    }
  }
  Issue.init(
    {
      uuid: {
        type: DataTypes.UUID,
        unique: true,
        defaultValue: DataTypes.UUIDV4,
      },
      reference: {
        type: DataTypes.STRING,
        defaultValue: nanoidNum,
      },
      details: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: { len: [1, 500] },
        notEmpty: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [["RESOLVED", "PENDING", "DELETED", "PRIORITIZED"]],
        },
        defaultValue: "PENDING",
      },
      reporter_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      reporter_email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      resolve_date: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
          isDate: true,
        },
      },
      private: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      priority: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
          notEmpty: true,
          isInt: true,
          min: 0,
          max: 10,
        },
      },
    },
    {
      sequelize,
      modelName: "Issue",
      tableName: "issue",
    }
  );
  return Issue;
};
