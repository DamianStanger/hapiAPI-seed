const Hapi = require("hapi");
const internals = require("./internals");
const routes = require("./routes/indexRoutes");
const registerExtensions = require("./extensions/registerExtensions");

module.exports = function () {

  const server = new Hapi.Server();
  server.connection({"port": internals.http.public.port, "labels": "public"});
  server.route(routes);

  server.register({
    "register": require("good"),
    "options": {
      "reporters": {
        "myConsoleReporter": [
          {
            "module": "good-squeeze",
            "name": "Squeeze",
            "args": [{"log": "*", "response": "*", "request": "*", "error": "*", "color": true}]
          }, {
            "module": "good-console"
          },
          "stdout"
        ]
      }
    }
  });

  registerExtensions(server);

  return Promise.resolve({"error": null, server});
};
