"use strict";
const { Model } = require("sequelize");
// use a shorter uuid than what uuidv4 generates for users
const { nanoid } = require("../helpers/nanoid-custom");

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
      uuid: {
        type: DataTypes.STRING,
        unique: true,
        defaultValue: nanoid,
      },
      display_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bio: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "app_user", // 'user' is reserved in postgres
      indexes: [
        {
          unique: true,
          fields: ["uuid"],
        },
      ],
    }
  );
  return User;
};
