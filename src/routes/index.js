// Example of an api site index start point
// https://api.github.com/

const siteIndex = {
  "method": "GET",
  "path": "/",

  handler(request, reply) {
    const baseUrl = `http://${request.info.host}`;

    const responseObject = {
      "base_url": baseUrl,
      "greetings_url": `${baseUrl}/greetings`,
      "documentation_url": "http://docs.hapi-seed.apiary.io/"
    };

    reply(responseObject);
  }
};

const route404 = {
  "method": "*",
  "path": "/{path*}",

  handler(request, reply) {
    reply({
      "statusCode": 404,
      "error": "Not Found",
      "documentation_url": "http://docs.hapi-seed.apiary.io/"
    }).code(404);
  }
};

const routes = [
  siteIndex,
  route404,
  ...require("./greetings")
];

module.exports = routes;
