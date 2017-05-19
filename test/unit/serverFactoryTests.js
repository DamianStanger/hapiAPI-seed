const serverFactory = require("../../src/serverFactory");

const Lab = require("lab");
const Code = require("code");

const lab = exports.lab = Lab.script();
const {expect} = Code;
const {describe, it} = lab;

describe("", () => {
  it("", done => {
    serverFactory()
      .then(({error, server}) => {
        expect(error).to.be.null();
        expect(server).to.be.object();
        done();
      });
  });
});
