/* eslint-disable no-process-env */
/* eslint-disable prefer-reflect */
/* eslint-disable dot-notation */

delete process.env["PORT"];
const serverFactory = require("../../src/serverFactory");
const apiIndex = require("./apiResource/apiIndex");

const Lab = require("lab");
const Code = require("code");
const lab = exports.lab = Lab.script();
const {expect} = Code;
const {describe, it} = lab;

describe("Integration - Add new greetings workflow =>", () => {

  it("Navigates the api to add a new greeting", done => {

    serverFactory()
      .then(({server}) => {
        return apiIndex(server).get()
          .then(index => {
            expect(index).to.be.a.object();
            expect(index.statusCode).to.equal(200);
            return index.greetings.get();
          })
          .then(greetings => {
            expect(greetings).to.be.a.array();
            expect(greetings.statusCode).to.equal(200);
            return greetings.post({"language": "us", "greeting": "Howdy there!"});
          })
          .then(greeting => {
            expect(greeting.statusCode).to.be.equal(202);
            expect(greeting.language).to.equal("us");
            expect(greeting.greeting).to.equal("Howdy there!");
            expect(greeting.url).to.equal("http://localhost.localdomain:1337/greetings/us");
          });
      })
      .then(done)
      .catch(done);
  });

  describe("Validation =>", () => {

    it("Fails when the greeting is missing", done => {
      serverFactory()
        .then(({server}) => {
          return apiIndex(server).get()
            .then(index => {
              return index.greetings.post({"language": "us"});
            })
            .then(failure => {
              expect(failure.statusCode).to.be.equal(400);
              expect(failure.errors[0].status).to.equal(400);
              expect(failure.errors[0].error).to.equal("Bad Request");
              expect(failure.errors[0].message).to.equal("child \"greeting\" fails because [\"greeting\" is required]");
            });
        })
        .then(done)
        .catch(done);
    });

    it("Fails when the language is missing", done => {
      serverFactory()
        .then(({server}) => {
          return apiIndex(server).get()
            .then(index => {
              return index.greetings.post({"greeting": "Howdy there!"});
            })
            .then(failure => {
              expect(failure.statusCode).to.be.equal(400);
              expect(failure.errors[0].status).to.equal(400);
              expect(failure.errors[0].error).to.equal("Bad Request");
              expect(failure.errors[0].message).to.equal("child \"language\" fails because [\"language\" is required]");
            });
        })
        .then(done)
        .catch(done);
    });

    it("Allows the inclusion of random payload keys, and strips them out", done => {
      serverFactory()
        .then(({server}) => {
          return apiIndex(server).get()
            .then(index => {
              return index.greetings.post({"language": "gr", "greeting": "Guten tag", "foo": "bar", "one": {"two": 2}});
            })
            .then(greeting => {
              expect(greeting.statusCode).to.be.equal(202);
              expect(greeting.language).to.equal("gr");
              expect(greeting.greeting).to.equal("Guten tag");
              expect(greeting.url).to.equal("http://localhost.localdomain:1337/greetings/gr");
              expect(greeting.foo).to.be.undefined();
              expect(greeting.one).to.be.undefined();
            });
        })
        .then(done)
        .catch(done);
    });

  });

});
