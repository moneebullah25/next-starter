const dotenv = require("dotenv");
const { expand } = require("dotenv-expand");

const cwd = process.cwd();
const envFiles = [`${cwd}/.env`];

function loadEnvironmentVariables() {
  for (const envFile of envFiles) {
    const env = dotenv.config({
      path: envFile
    });

    expand(env);
  }
}

module.exports.loadEnvironmentVariables = loadEnvironmentVariables;
