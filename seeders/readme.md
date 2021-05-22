# Read Me

Not using sequelize cli seeder because it doesn't support models with associations/relationships

## Generated seeds

Seeds are generated as a JSON file using Mockaroo, which are called by the seed.js script.

## Running

Call `node seeders/seed <model name>` from the root directory. The model name argument is optional. 'seed.js' will seed the specified model, or all models if no model name is given. If the given model name is not valid, an error message will be logged to the console and no operations will be run.
