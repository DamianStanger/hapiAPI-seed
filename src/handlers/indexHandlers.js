function siteIndex(request, reply) {
  const baseUrl = `http://${request.info.host}`;

  const responseObject = {
    "links": {
      "self": baseUrl,
      "greetings": `${baseUrl}/greetings`,
      "documentation": "http://docs.hapiseed.apiary.io/"
    }
  };

  return reply(responseObject);
}

function route404(request, reply) {
  return reply(
    {
      "links": {
        "documentation": "http://docs.hapiseed.apiary.io/"
      },
      "errors": [{
        "status": 404,
        "title": "Resource not found"
      }]
    }).code(404);
}

const handlers = {
  siteIndex,
  route404
};

module.exports = handlers;
