module.exports = function (server) {
  return {
    "request": server.inject({"url": "/"})
      .then(response => {
        return JSON.parse(response.payload);
      })
  };
};
