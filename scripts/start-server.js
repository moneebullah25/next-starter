const child_process = require("child_process");

const { loadEnvironmentVariables } = require("./load-env");

function getArgs() {
  const args = process.argv.slice(2);
  const argsMap = {};

  for (const arg of args) {
    const [name, value] = arg.split("=");
    argsMap[name] = value;
  }

  return argsMap;
}

function start() {
  const args = getArgs();

  loadEnvironmentVariables();

  const child = child_process.spawn("next", [args["--command"]], {
    cwd: process.cwd(),
    env: process.env,
    stdio: "inherit"
  });

  child.on("close", (code) => {
    if (code) {
      process.exit(code);
    }
  });
}

start();
