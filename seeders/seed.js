const models = require("../models");
const fs = require("fs");

const getContent = (path) => {
  return JSON.parse(fs.readFileSync(path));
};

const createEntries = async (modelName, instance) => {
  try {
    await models[modelName].create({ ...instance });
  } catch (error) {
    console.log(error);
  }
};

const jsonData = {
  UserType: getContent("./seeders/JSONseeds/userTypes.json"),
  User: getContent("./seeders/JSONseeds/users.json"),
  Diary: getContent("./seeders/JSONseeds/diaries.json"),
  Version: getContent("./seeders/JSONseeds/versions.json"),
  Location: getContent("./seeders/JSONseeds/locations.json"),
  Issue: getContent("./seeders/JSONseeds/issues.json"),
  Type: getContent("./seeders/JSONseeds/types.json"),
  Tag: getContent("./seeders/JSONseeds/tags.json"),
  Comment: getContent("./seeders/JSONseeds/comments.json"),
  Upvote: getContent("./seeders/JSONseeds/upvotes.json"),
};

for (const modelName in jsonData) {
  for (const instance of jsonData[modelName]) {
    createEntries(modelName, instance);
  }
}
console.log("Creating seeds...");
