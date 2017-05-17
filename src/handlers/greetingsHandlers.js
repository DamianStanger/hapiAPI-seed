const {route404} = require("./indexHandlers");

const greetings = [
  {
    "language": "en",
    "greeting": "Hi there"
  }, {
    "language": "fr",
    "greeting": "Bonjour"
  }
];

const greetingsRoot = "/greetings";


function getGreetings(request, reply) {
  const baseUrl = `http://${request.info.host}`;
  return reply(greetings.map(greeting => {
    greeting.url = `${baseUrl}${greetingsRoot}/${greeting.language}`;
    return greeting;
  }));
}

function setGreetings(request, reply) {
  const baseUrl = `http://${request.info.host}`;
  let greeting = greetings.find((greet => greet.language === request.params.lang));
  if (greeting) {
    greeting.url = `${baseUrl}${greetingsRoot}/${greeting.language}`;
    return reply(greeting).code(300);
  }

  greeting = JSON.parse(JSON.stringify(request.payload));
  greeting.url = `${baseUrl}${greetingsRoot}/${greeting.language}`;
  greetings.push(greeting);

  return reply(greeting).code(202);
}

function getGreetingsLanguage(request, reply) {
  const baseUrl = `http://${request.info.host}`;

  const greeting = greetings.find((greet => greet.language === request.params.lang));
  if (!greeting) {
    return route404(request, reply);
  }

  greeting.url = `${baseUrl}${greetingsRoot}/${greeting.language}`;
  return reply(greeting);
}


const routes = {
  getGreetings,
  setGreetings,
  getGreetingsLanguage
};

module.exports = routes;
