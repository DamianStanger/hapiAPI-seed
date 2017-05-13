const Hapi = require("hapi");
const internals = require("./internals");
const routes = require("./routes/indexRoutes");

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
}, err => {

  if (err) {
    throw err;
  }

  server.start(error => {
    if (error) {
      server.log(["fatal"], `API Server failed to start: ${error}.`);
      throw error;
    }

    const connections = server.connections.length === 0 ? [server] : server.connections;
    let msg = "Started the server. Registered ports:";
    connections.forEach(connection => {
      msg += ` ${connection.info.port}[${connection.settings.labels}]`;
    });
    server.log(["info"], msg);
  });
});
