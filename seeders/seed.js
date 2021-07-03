const models = require("../models");
const fs = require("fs");
require("dotenv").config();

const getContent = (path) => {
  return JSON.parse(fs.readFileSync(path));
};

const createEntries = async (modelName, instance) => {
  // console.log(`processing ${JSON.stringify(instance)}\n\n`);
  try {
    const newEntry = await models[modelName].create({ ...instance });
    console.log(`Created #${newEntry.id} in '${modelName}'`);
  } catch (error) {
    console.log(error);
  }
};

// register new model and seeds below

const jsonData = {
  UserType: getContent("./seeders/JSONseeds/userTypes.json"),
  Status: getContent("./seeders/JSONseeds/statuses.json"),
  User: getContent("./seeders/JSONseeds/users.json"),
  Preferences: getContent("./seeders/JSONseeds/preferences.json"),
  Diary: getContent("./seeders/JSONseeds/diaries.json"),
  Version: getContent("./seeders/JSONseeds/versions.json"),
  Location: getContent("./seeders/JSONseeds/locations.json"),
  Type: getContent("./seeders/JSONseeds/types.json"),
  Tag: getContent("./seeders/JSONseeds/tags.json"),
  Issue: getContent("./seeders/JSONseeds/issues.json"),
  Comment: getContent("./seeders/JSONseeds/comments.json"),
  Upvote: getContent("./seeders/JSONseeds/upvotes.json"),
};

const targetModel = process.argv.slice(2)[0];

async function run() {
  if (process.env.RESETDB === "true") {
    await models.sequelize.sync({ force: true });
  } else {
    await models.sequelize.sync({ alter: true });
  }

  if (!targetModel) {
    for (const modelName in jsonData) {
      for (const instance of jsonData[modelName]) {
        await createEntries(modelName, instance);
      }
    }
  } else {
    if (targetModel in models) {
      for (const instance of jsonData[targetModel]) {
        await createEntries(targetModel, instance);
      }
    } else {
      console.log(`The model you specified does not exist. ("${targetModel}")`);
    }
  }
}

run();
