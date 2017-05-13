/* eslint-disable no-console*/
/* eslint-disable no-process-env*/

const internals = require("../src/internals");

const Lab = require("lab");
const Code = require("code");

const lab = exports.lab = Lab.script();
const {expect} = Code;
const {describe, it, before, after} = lab;


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
      done();
    });

    after(done => {
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
      process.env.HAPIAPI_HTTPPUBLICPORT = 80;
      process.env.HAPIAPI_LOGGINGLEVELS = ["warn", "error", "fatal"];
      console.log(`111${process.env.HAPIAPI_HTTPPUBLICPORT}`);
      console.log(`111${process.env.HAPIAPI_LOGGINGLEVELS}`);
      done();
    });

    after(done => {
      process.env.HAPIAPI_HTTPPUBLICPORT = null;
      process.env.HAPIAPI_LOGGINGLEVELS = null;
      done();
    });

    it("http public port should be taken from node arguments", done => {
      console.log(`222${process.env.HAPIAPI_HTTPPUBLICPORT}`);
      console.log(`222${process.env.HAPIAPI_LOGGINGLEVELS}`);
      expect(internals.http.public.port).to.equal(80);
      done();
    });

    it("logging levels should be taken from node arguments", done => {
      console.log(`333${process.env.HAPIAPI_HTTPPUBLICPORT}`);
      console.log(`333${process.env.HAPIAPI_LOGGINGLEVELS}`);
      expect(internals.logging.levels).to.equal(["warn", "error", "fatal"]);
      done();
    });
  });

});
