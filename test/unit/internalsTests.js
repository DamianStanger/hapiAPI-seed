/* eslint-disable no-process-env*/
/* eslint-disable prefer-reflect*/
/* eslint-disable dot-notation*/

const internalsModuleName = "../../src/internals";
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

function removeArrayElement(array, element) {
  const index = array.indexOf(element);

  if (index !== -1) {
    array.splice(index, 1);
  }
}


const HTTPPUBLICPORT = "http.public.port=1111";
const LOGGINGLEVELS = "logging.levels=info,warn,error,fatal";
function setNodeParameters() {
  process.argv.push(HTTPPUBLICPORT);
  process.argv.push(LOGGINGLEVELS);
}
function removeNodeParameters() {
  removeArrayElement(process.argv, HTTPPUBLICPORT);
  removeArrayElement(process.argv, LOGGINGLEVELS);
}

function setEnvironmentVariables() {
  process.env.HAPIAPI_HTTPPUBLICPORT = "2222";
  process.env.HAPIAPI_LOGGINGLEVELS = "warn,error,fatal";
}
function removeEnvironmentVariables() {
  delete process.env["HAPIAPI_HTTPPUBLICPORT"];
  delete process.env["HAPIAPI_LOGGINGLEVELS"];
}



describe("internals.js => ", () => {

  describe("When no environment variables and no node parameters are specified => ", () => {
    it("http public port should be taken from default value", done => {
      expect(internals.http.public.port).to.equal(80);
      done();
    });

    it("logging levels should be taken from default value", done => {
      expect(internals.logging.levels).to.equal(["debug", "info", "warn", "error", "fatal"]);
      done();
    });
  });


  describe("When node parameters are specified => ", () => {

    before(done => {
      setNodeParameters();
      resetTheInternalsModuleInTheRequiresCache();
      done();
    });

    after(done => {
      removeNodeParameters();
      resetTheInternalsModuleInTheRequiresCache();
      done();
    });

    it("http public port should be taken from node arguments", done => {
      expect(internals.http.public.port).to.equal(1111);
      done();
    });

    it("logging levels should be taken from node arguments", done => {
      expect(internals.logging.levels).to.equal(["info", "warn", "error", "fatal"]);
      done();
    });
  });


  describe("When environment variables are specified => ", () => {

    before(done => {
      setEnvironmentVariables();
      resetTheInternalsModuleInTheRequiresCache();
      done();
    });

    after(done => {
      removeEnvironmentVariables();
      resetTheInternalsModuleInTheRequiresCache();
      done();
    });

    it("http public port should be taken from env variables", done => {
      expect(internals.http.public.port).to.equal(2222);
      done();
    });

    it("logging levels should be taken from env variables", done => {
      expect(internals.logging.levels).to.equal(["warn", "error", "fatal"]);
      done();
    });
  });



  describe("When both environment variables and node parameters are specified => ", () => {

    before(done => {
      setEnvironmentVariables();
      setNodeParameters();
      resetTheInternalsModuleInTheRequiresCache();
      done();
    });

    after(done => {
      removeEnvironmentVariables();
      removeNodeParameters();
      resetTheInternalsModuleInTheRequiresCache();
      done();
    });

    it("http public port should be taken from node arguments", done => {
      expect(internals.http.public.port).to.equal(1111);
      done();
    });

    it("logging levels should be taken from node arguments", done => {
      expect(internals.logging.levels).to.equal(["info", "warn", "error", "fatal"]);
      done();
    });
  });

});
