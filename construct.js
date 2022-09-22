/*
This file constructs the config/config.json file using environment variables.
*/

require("dotenv").config();
const fs = require("fs");

// UPDATE 22/09/2022: Project has been deprecated, use SQLite database for demo

// const newData = {
//   development: {
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     host: process.env.DB_HOST,
//     dialect: process.env.DB_DIALECT,
//     define: {
//       underscored: true,
//     },
//   },
//   test: {
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     host: process.env.DB_HOST,
//     dialect: process.env.DB_DIALECT,
//     define: {
//       underscored: true,
//     },
//   },
//   production: {
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     host: process.env.DB_HOST,
//     dialect: process.env.DB_DIALECT,
//     define: {
//       underscored: true,
//     },
//   },
// };

const newData = {
  development: {
    database: "database_development",
    dialect: "sqlite",
    storage: "./database.sqlite",
  },
  test: {
    database: "database_development",
    dialect: "sqlite",
    storage: "./database.sqlite",
  },
  production: {
    database: "database_development",
    dialect: "sqlite",
    storage: "./database.sqlite",
  },
};

const data = JSON.stringify(newData);

try {
  fs.writeFileSync("./config/config.json", data);
  console.log("config.json file written.");
} catch (error) {
  console.log(error);
}
