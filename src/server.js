const serverFactory = require("./serverFactory");

serverFactory()
  .then(({err, server}) => {
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
