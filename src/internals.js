/* eslint-disable no-process-env */

function getCustomArgument(argument) {
  const argumentsx = process.argv;
  for (const arg in argumentsx) {
    if (arg.split("=")[0] === argument) {
      return arg.split("=")[1];
    }
  }
  return null;
}

function getPortFromNodeArgs() {
  return getCustomArgument("port");
}

function getLogLevelFromArgs() {
  return getCustomArgument("loglevel");
}



const port = parseInt(process.env.PORT || getPortFromNodeArgs() || 1337, 10);
const logLevel = process.env.LOGLEVEL || getLogLevelFromArgs() || "debug";

const internals = {
  "http": {
    "public": {
      "port": port
    }
  },
  "logging": {
    "levels": logLevel
  }};

module.exports = internals;
