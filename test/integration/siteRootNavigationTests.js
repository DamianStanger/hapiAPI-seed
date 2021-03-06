/* eslint-disable no-process-env */
/* eslint-disable prefer-reflect */
/* eslint-disable dot-notation */

delete process.env["PORT"];
const serverFactory = require("../../src/serverFactory");

const Lab = require("lab");
const Code = require("code");

const lab = exports.lab = Lab.script();
const {expect} = Code;
const {describe, it} = lab;

describe("Integration - site root navigation tests => ", () =>
  it("returns the site root", done => {
    const request = {"url": "/"};
    const expectedJsonObj =
      {
        "links": {
          "self": "http://localhost.localdomain:1337",
          "greetings": "http://localhost.localdomain:1337/greetings",
          "documentation": "http://docs.hapiseed.apiary.io/"
        }
      };

    serverFactory()
      .then(({error, server}) => {
        expect(error).to.be.null();
        server.inject(request, response => {
          expect(response).to.be.a.object();
          expect(response.statusCode).to.equal(200);
          expect(JSON.parse(response.payload)).to.equal(expectedJsonObj);
          done();
        });
      })
      .catch(error => done(error));
  })
);
