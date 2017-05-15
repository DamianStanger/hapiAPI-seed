const serverFactory = require("../../src/serverFactory");

const Lab = require("lab");
const Code = require("code");

const lab = exports.lab = Lab.script();
const {expect} = Code;
const {describe, it} = lab;

describe("end to end, index page => ", () =>
  it("returns the site root", done => {
    const request = {"url": "/"};
    const expectedJsonObj = {"base_url": "http://localhost.localdomain:1337", "greetings_url": "http://localhost.localdomain:1337/greetings", "documentation_url": "http://docs.hapiseed.apiary.io/"};

    serverFactory((error, server) => {
      expect(error).to.be.null();
      server.inject(request, (response) => {
        expect(response).to.be.a.object();
        expect(response.statusCode).to.equal(200);
        expect(JSON.parse(response.payload)).to.equal(expectedJsonObj);
      });
      done();
    });
  })
);
