module.exports = function (server, indexPayload) {

  function post(payload) {
    return server.inject({"method": "POST", "url": indexPayload.links.greetings, "payload": JSON.stringify(payload)})
      .then(postResponse => {
        const greetingPayload = JSON.parse(postResponse.payload);
        greetingPayload.statusCode = postResponse.statusCode;

        // eslint-disable-next-line
        greetingPayload.get = get;
        greetingPayload.post = post;

        return greetingPayload;
      });
  }

  function get() {
    return server.inject({"url": indexPayload.links.greetings})
      .then(getResponse => {
        const greetingsPayload = JSON.parse(getResponse.payload);
        greetingsPayload.statusCode = getResponse.statusCode;

        greetingsPayload.get = get;
        greetingsPayload.post = post;

        return greetingsPayload;
      });
  }


  const greetingResource = {
    get,
    post
  };

  return greetingResource;
};
