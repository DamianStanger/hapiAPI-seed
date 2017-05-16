const greetingsHandlers = require("../handlers/greetingsHandlers");
const greetingsRoot = "/greetings";


const greetingsRouteGet = {
  "method": "GET",
  "path": greetingsRoot,
  "handler": greetingsHandlers.getGreetings
};

const greetingsRoutePost = {
  "method": "POST",
  "path": greetingsRoot,
  "handler": greetingsHandlers.setGreetings
};

const greetingsLanguageRoute = {
  "method": "GET",
  "path": `${greetingsRoot}/{lang}`,
  "handler": greetingsHandlers.getGreetingsLanguage
};


const routes = [
  greetingsRouteGet,
  greetingsRoutePost,
  greetingsLanguageRoute
];

module.exports = routes;
