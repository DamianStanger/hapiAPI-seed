/* eslint-disable no-process-env */

function getCustomArgument(argument) {
  const argumentsx = process.argv;
  for (let i = 0; i < argumentsx.length; i++) {
    if (argumentsx[i].split("=")[0] === argument) {
      return argumentsx[i].split("=")[1];
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



const port = parseInt(getPortFromNodeArgs() || process.env.HAPIAPI_HTTPPUBLICPORT || 80, 10);
const logLevels = (getLogLevelsFromArgs() || process.env.HAPIAPI_LOGGINGLEVELS || "debug,info,warn,error,fatal").split(",");

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
