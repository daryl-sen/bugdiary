"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Comment, Upvote, Diary, UserType }) {
      this.belongsTo(UserType, {
        foreignKey: "user_type_id",
        onDelete: "cascade",
      });
      this.hasMany(Comment, { foreignKey: "user_id" });
      this.hasMany(Upvote, { foreignKey: "user_id" });
      this.hasMany(Diary, { foreignKey: "user_id" });
    }
  }
  User.init(
    {
      display_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      bio: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "User",
      tableName: "app_user", // 'user' is reserved in postgres
    }
  );
  return User;
};
