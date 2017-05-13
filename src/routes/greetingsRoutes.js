const greetingsHandlers = require("../handlers/greetingsHandlers");
const greetingsRoot = "/greetings";


const greetingsRoute = {
  "method": "GET",
  "path": greetingsRoot,
  "handler": greetingsHandlers.getGreetings
};

const greetingsLanguageRoute = {
  "method": "GET",
  "path": `${greetingsRoot}/{lang}`,
  "handler": greetingsHandlers.getGreetingsLanguage
};


const routes = [
  greetingsRoute,
  greetingsLanguageRoute
];

module.exports = routes;
