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
  return getCustomArgument("http.public.port");
}

function getLogLevelsFromArgs() {
  return getCustomArgument("logging.levels");
}



const port = parseInt(process.env.HAPIAPI_HTTPPUBLICPORT || getPortFromNodeArgs() || 1337, 10);
const logLevels = (process.env.HAPIAPI_LOGGINGLEVELS || getLogLevelsFromArgs() || "debug,info,warn,error,fatal").split(",");

const internals = {
  "http": {
    "public": {
      "port": port
    }
  },
  "logging": {
    "levels": logLevels
  }};

module.exports = internals;
