const Boom = require("boom");
const {route404} = require("./indexHandlers");
const greetingsRoot = "/greetings";

function routes(greetingsRepo) {
  function getGreetings(request, reply) {
    const baseUrl = `http://${request.info.host}`;
    return reply(greetingsRepo.map(greeting => {
      greeting.url = `${baseUrl}${greetingsRoot}/${greeting.language}`;
      return greeting;
    }));
  }

  function setGreetings(request, reply) {
    const baseUrl = `http://${request.info.host}`;
    let greeting = greetingsRepo.find((greet => greet.language === request.params.lang));
    if (greeting) {
      greeting.url = `${baseUrl}${greetingsRoot}/${greeting.language}`;
      return reply(greeting).code(300);
    }

    greeting = JSON.parse(JSON.stringify(request.payload));
    greeting.url = `${baseUrl}${greetingsRoot}/${greeting.language}`;
    greetingsRepo.push(greeting);

    return reply(greeting).code(202);
  }

  function getGreetingsLanguage(request, reply) {
    const baseUrl = `http://${request.info.host}`;

    const greeting = greetingsRepo.find((greet => greet.language === request.params.lang));
    if (!greeting) {
      return route404(request, reply);
    }

    greeting.url = `${baseUrl}${greetingsRoot}/${greeting.language}`;
    return reply(greeting);
  }

  function putGreeting(request, reply) {
    const err = Boom.notImplemented("Still working on this");
    return reply(err);
  }

  return {
    getGreetings,
    setGreetings,
    getGreetingsLanguage,
    putGreeting
  };
}

module.exports = routes;
