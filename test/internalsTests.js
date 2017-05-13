/* eslint-disable no-process-env*/
/* eslint-disable prefer-reflect*/
/* eslint-disable dot-notation*/
/* eslint-disable no-console*/

const internalsModuleName = "../src/internals";
let internals = require(internalsModuleName);

const Lab = require("lab");
const Code = require("code");

const lab = exports.lab = Lab.script();
const {expect} = Code;
const {describe, it, before, after} = lab;

function resetTheInternalsModuleInTheRequiresCache() {
  delete require.cache[require.resolve(internalsModuleName)];
  internals = require(internalsModuleName);
}


describe("internals.js => ", () => {

  describe("When no environment variables and no node parameters are specified => ", () => {
    it("http public port should be taken from default value", done => {
      expect(internals.http.public.port).to.equal(1337);
      done();
    });

    it("logging levels should be taken from default value", done => {
      expect(internals.logging.levels).to.equal(["debug", "info", "warn", "error", "fatal"]);
      done();
    });
  });



  describe("When no environment variables but node parameters are specified => ", () => {

    before(done => {
      process.argv.push("http.public.port=8008");
      process.argv.push("logging.levels=info,warn,error,fatal");
      resetTheInternalsModuleInTheRequiresCache();
      done();
    });

    after(done => {
      // TODO remove the arguments from the argv array
      resetTheInternalsModuleInTheRequiresCache();
      done();
    });

    it("http public port should be taken from node arguments", done => {
      expect(internals.http.public.port).to.equal(8008);
      done();
    });

    it("logging levels should be taken from node arguments", done => {
      expect(internals.logging.levels).to.equal(["info", "warn", "error", "fatal"]);
      done();
    });
  });



  describe("When environment variables are set but no node parameters are specified => ", () => {

    before(done => {
      process.env.HAPIAPI_HTTPPUBLICPORT = "80";
      process.env.HAPIAPI_LOGGINGLEVELS = "warn,error,fatal";
      resetTheInternalsModuleInTheRequiresCache();
      done();
    });

    after(done => {
      delete process.env["HAPIAPI_HTTPPUBLICPORT"];
      delete process.env["HAPIAPI_LOGGINGLEVELS"];
      resetTheInternalsModuleInTheRequiresCache();
      done();
    });

    it("http public port should be taken from env variables", done => {
      expect(internals.http.public.port).to.equal(80);
      done();
    });

    it("logging levels should be taken from env variables", done => {
      expect(internals.logging.levels).to.equal(["warn", "error", "fatal"]);
      done();
    });
  });

});
