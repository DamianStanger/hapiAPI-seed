const internals = require("../src/internals");

const Lab = require("lab");
const Code = require("code");

const lab = exports.lab = Lab.script();
const {expect} = Code;
const {describe, it} = lab;


describe("internals.js =>", () => {

  it("http public port should be 8050", done => {
    expect(internals.http.public.port).to.equal(8050);
    done();
  });
});
