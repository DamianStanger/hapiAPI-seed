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
const notFound = {
  "statusCode": 404,
  "error": "Not Found",
  "documentation_url": "http://docs.hapi-seed.apiary.io/"
};

const routes = [
  {
    "method": "GET",
    "path": greetingsRoot,

    handler(request, reply) {
      const baseUrl = `http://${request.info.host}`;
      return reply(greetings.map(greeting => {
        greeting.url = `${baseUrl}${greetingsRoot}/${greeting.language}`;
        return greeting;
      }));
    }
  }, {
    "method": "GET",
    "path": `${greetingsRoot}/{lang}`,

    handler(request, reply) {
      const baseUrl = `http://${request.info.host}`;

      const greeting = greetings.find((greet => greet.language === request.params.lang));
      if (!greeting) {
        return reply(notFound).code(404);
      }

      greeting.url = `${baseUrl}${greetingsRoot}/${greeting.language}`;
      return reply(greeting);
    }
  }
];

module.exports = routes;
