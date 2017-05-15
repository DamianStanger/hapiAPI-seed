const greetingsHandlers = require("../../src/handlers/greetingsHandlers");

const Lab = require("lab");
const Code = require("code");

const lab = exports.lab = Lab.script();
const {expect} = Code;
const {describe, it} = lab;

describe("greetingsHandler => ", () => {
  it("getGreetings returns all the greetings", done => {
    // Arrange
    const request = {
      "info": {
        "host": "myTestHost"
      }
    };
    let greetings;
    function reply(passedValue) {
      greetings = passedValue;
    }

    // Act
    greetingsHandlers.getGreetings(request, reply);

    // Assert
    expect(greetings).to.be.an.instanceof(Array);
    expect(greetings.length).to.equal(2);
    expect(greetings[0].language).to.equal("en");
    expect(greetings[0].url).to.equal("http://myTestHost/greetings/en");
    done();
  });
});
