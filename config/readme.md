# Creating a config.json

The config.json file helps Sequelize and the Sequelize CLI connect to a database. It contains sensitive information such as your database username and password, so it has been added to .gitignore.

A script is included in the root directory to help you generate a new config.json file based on your .env variables. From the root directory, run `node construct` to generate a config.json file.
