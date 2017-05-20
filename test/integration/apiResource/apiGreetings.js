module.exports = function (server, indexPayload) {
  return {
    "get": () => {
      return server.inject({"url": indexPayload.greetings_url})
        .then(getResponse => {
          const greetingsPayload = JSON.parse(getResponse.payload);
          greetingsPayload.statusCode = getResponse.statusCode;

          greetingsPayload.post = payload => {
            return server.inject({"method": "POST", "url": indexPayload.greetings_url, "payload": JSON.stringify(payload)})
              .then(postResponse => {
                const greetingPayload = JSON.parse(postResponse.payload);
                greetingPayload.statusCode = postResponse.statusCode;

                return greetingPayload;
              });
          };

          return greetingsPayload;
        });

    }
  };
};
