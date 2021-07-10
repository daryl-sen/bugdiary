const models = require("../models");
const fs = require("fs");
require("dotenv").config();

const getContent = (path) => {
  return JSON.parse(fs.readFileSync(path));
};

const createEntries = async (modelName, instance) => {
  try {
    const newEntry = await models[modelName].create({ ...instance });
    console.log(`Created #${newEntry.id} in '${modelName}'`);
  } catch (error) {
    console.log(error);
  }
};

// operatingMode = "reset" OR "regenerate" OR "reseed"
/*
  reset: drop all tables, recreate, and seed with precreated data
  regenerate: create seeds as a JSON file
  reseed: drop all tables, recreate, and reseed with regenerated seeds
*/

const operatingMode = process.argv.slice(2)[0];
let seedPath = operatingMode === "reseed" ? "regenerated" : "JSONseeds";

// register new models and their seed files below
const jsonData = {
  UserType: getContent(`./seeders/${seedPath}/UserType.json`),
  Status: getContent(`./seeders/${seedPath}/Status.json`),
  User: getContent(`./seeders/${seedPath}/User.json`),
  Preferences: getContent(`./seeders/${seedPath}/Preferences.json`),
  Diary: getContent(`./seeders/${seedPath}/Diary.json`),
  Version: getContent(`./seeders/${seedPath}/Version.json`),
  Location: getContent(`./seeders/${seedPath}/Location.json`),
  Type: getContent(`./seeders/${seedPath}/Type.json`),
  Tag: getContent(`./seeders/${seedPath}/Tag.json`),
  Issue: getContent(`./seeders/${seedPath}/Issue.json`),
  Comment: getContent(`./seeders/${seedPath}/Comment.json`),
  Upvote: getContent(`./seeders/${seedPath}/Upvote.json`),
};

// drops tables and reseeds them with premade seeds
async function seed() {
  await models.sequelize.sync({ force: true });

  for (const modelName in jsonData) {
    for (const instance of jsonData[modelName]) {
      await createEntries(modelName, instance);
    }
  }
}

// generates JSON seeds based on existing entries in the database
const regenerate = async () => {
  if (!fs.existsSync("./seeders/regenerated/")) {
    fs.mkdirSync("./seeders/regenerated/");
  }
  for (const modelName in jsonData) {
    const content = [];
    try {
      const allEntries = await models[modelName].findAll();
      for (const entry of allEntries) {
        content.push(entry.dataValues);
      }
    } catch (err) {
      console.log(err);
    }

    const jsonContent = JSON.stringify(content);
    fs.writeFileSync(`seeders/regenerated/${modelName}.json`, jsonContent);
  }
};

if (operatingMode === "regenerate") {
  regenerate();
} else {
  seed();
}
