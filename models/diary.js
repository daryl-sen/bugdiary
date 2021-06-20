"use strict";
const { Model } = require("sequelize");
// use a shorter uuid than what uuidv4 generates for users
const { nanoid } = require("../helpers/nanoid-custom");
const { generateExpiryDate } = require("../helpers/generateExpiryDate");
const bcrypt = require("bcrypt");

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

    static generateHash(password) {
      const saltRounds = 10;
      return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function (error, hash) {
          if (error) {
            reject(error);
          } else {
            resolve(hash);
          }
        });
      });
    }
  }
  Diary.init(
    {
      uuid: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
          len: [0, 500],
        },
      },
      passcode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      privacy: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "defaultPrivate",
      },
      expiry_date: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: generateExpiryDate,
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

  Diary.prototype.checkPassword = async function (password) {
    console.log(password);
    return await bcrypt.compare(password, this.passcode);
  };

  Diary.beforeCreate(async function (diary, options) {
    const hash = await Diary.generateHash(diary.passcode);
    diary.passcode = hash;
  });

  return Diary;
};
