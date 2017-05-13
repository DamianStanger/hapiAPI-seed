function siteIndex(request, reply) {
  const baseUrl = `http://${request.info.host}`;

  const responseObject = {
    "base_url": baseUrl,
    "greetings_url": `${baseUrl}/greetings`,
    "documentation_url": "http://docs.hapi-seed.apiary.io/"
  };

  return reply(responseObject);
}

function route404(request, reply) {
  return reply({
    "statusCode": 404,
    "error": "Not Found",
    "documentation_url": "http://docs.hapi-seed.apiary.io/"
  }).code(404);
}

const handlers = {
  siteIndex,
  route404
};

module.exports = handlers;
