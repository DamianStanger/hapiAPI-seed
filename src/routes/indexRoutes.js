// Example of an api site index start point
// https://api.github.com/

const indexHandlers = require("../handlers/indexHandlers");

const siteIndex = {
  "method": "GET",
  "path": "/",
  "handler": indexHandlers.siteIndex
};

const route404 = {
  "method": "*",
  "path": "/{path*}",
  "handler": indexHandlers.route404
};

const routes = [
  siteIndex,
  route404,
  ...require("./greetingsRoutes")
];

module.exports = routes;
