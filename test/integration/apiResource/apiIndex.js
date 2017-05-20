module.exports = function (server) {
  return {
    "get": () => {
      return server.inject({"url": "/"})
        .then(response => {
          const indexPayload = JSON.parse(response.payload);
          indexPayload.greetings = require("./apiGreetings")(server, indexPayload);
          indexPayload.statusCode = response.statusCode;
          return indexPayload;
        });
    }
  };
};
