const errorJson = {
  "links": {
    "documentation": "http://docs.hapiseed.apiary.io/"
  },
  "errors": []
};

module.exports = server => {
  server.ext("onPreResponse", (request, reply) => {
    if (request.response.isBoom) {
      const err = request.response;
      const errResponse = JSON.parse(JSON.stringify(errorJson));
      errResponse.errors.push({
        "status": err.output.payload.statusCode,
        "error": err.output.payload.error,
        "type": (err.data && err.data.name) || err.output.payload.error,
        "message": err.output.payload.message
      });
      const statusCode = err.output.payload.statusCode;
      return reply(errResponse).code(statusCode);
    }
    return reply.continue();
  });
};
