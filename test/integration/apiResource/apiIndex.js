module.exports = function (server) {

  function get() {
    return server.inject({"url": "/"})
      .then(response => {
        const indexPayload = JSON.parse(response.payload);
        indexPayload.greetings = require("./apiGreetings")(server, indexPayload);
        indexPayload.statusCode = response.statusCode;
        indexPayload.get = get;
        return indexPayload;
      });
  }

  const indexResource = {
    "get": get
  };

  return indexResource;
};
