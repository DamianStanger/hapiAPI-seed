const Joi = require("joi");

const greetingsRoot = "/greetings";
const greetings = [
  {
    "language": "en",
    "greeting": "Hi there"
  }, {
    "language": "fr",
    "greeting": "Bonjour"
  }
];
const greetingsHandlers = require("../handlers/greetingsHandlers")(greetings);

const greetingsRouteGet = {
  "method": "GET",
  "path": greetingsRoot,
  "handler": greetingsHandlers.getGreetings
};

const greetingsRoutePost = {
  "method": "POST",
  "path": greetingsRoot,
  "handler": greetingsHandlers.setGreetings,
  "config": {
    "validate": {
      "options": {
        "stripUnknown": true
      },
      "payload": Joi.object().required().keys({
        "language": Joi.string().required(),
        "greeting": Joi.string().required()
      })
    }}
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
