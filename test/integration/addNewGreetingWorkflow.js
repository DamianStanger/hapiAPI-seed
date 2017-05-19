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

let indexJson;

describe("Integration - Add new greetings workflow => ", () =>
  it("Navigates the api to add a new greeting", done => {

    serverFactory()
      .then(({server}) => {
        server.inject({"url": "/"})
          .then(response => {
            expect(response).to.be.a.object();
            expect(response.statusCode).to.equal(200);
            indexJson = JSON.parse(response.payload);
            return server.inject({"url": indexJson.greetings_url});
          })
          .then(response => {
            expect(response).to.be.a.object();
            expect(response.statusCode).to.equal(200);
            return server.inject({
              "method": "POST",
              "url": indexJson.greetings_url,
              "payload": "{\"language\": \"us\", \"greeting\": \"Howdy there!\"}"
            });
          })
          .then(response => {
            expect(response.statusCode).to.be.equal(202);
            const usGreeting = JSON.parse(response.payload);
            expect(usGreeting).to.equal({"language": "us", "greeting": "Howdy there!", "url": "http://localhost.localdomain:1337/greetings/us"});
          })
          .then(done)
          .catch(err => done(err));
      });
  })
);
