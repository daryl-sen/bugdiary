# Setup

1. Run `npm i` to install dependencies. If you run into a node-gyp issue, delete `node_modules` and `package-lock.json` and then try again
2. Run `cp .env.example .env` to copy the environment variables, and customize it to your needs
3. Run `node construct` to run the `./construct.js` script to setup the project config
4. Run `node ./seeders` to seed the database
5. Run `npm run build` to build the React app
6. Open `localhost:3000` in the browser to observe the project running
