const greetings = [
  {
    "language": "en",
    "greeting": "Hi there"
  }, {
    "language": "fr",
    "greeting": "Bonjour"
  }
];
const greetingsHandlers = require("../../../src/handlers/greetingsHandlers")(greetings);

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
    let actualGreetings;
    function reply(passedValue) {
      actualGreetings = passedValue;
    }

    // Act
    greetingsHandlers.getGreetings(request, reply);

    // Assert
    expect(actualGreetings).to.be.an.instanceof(Array);
    expect(actualGreetings.length).to.equal(2);
    expect(actualGreetings[0].language).to.equal("en");
    expect(actualGreetings[0].url).to.equal("http://myTestHost/greetings/en");
    done();
  });

  it("getGreetingsLanguage returns a single greeting", done => {
    // Arrange
    const request = {
      "info": {
        "host": "myTestHost"
      },
      "params": {
        "lang": "en"
      }
    };
    let greeting;
    function reply(passedValue) {
      greeting = passedValue;
    }

    // Act
    greetingsHandlers.getGreetingsLanguage(request, reply);

    // Assert
    expect(greeting).to.be.an.instanceof(Object);
    expect(greeting.language).to.equal("en");
    expect(greeting.url).to.equal("http://myTestHost/greetings/en");
    done();
  });

  it("getGreetingsLanguage returns not found", done => {
    // Arrange
    const request = {
      "info": {
        "host": "myTestHost"
      },
      "params": {
        "lang": "foobar"
      }
    };
    let greeting;
    let code;
    function reply(passedValue) {
      greeting = passedValue;
      return {"code": passedCode => {
        code = passedCode;
      }};
    }

    // Act
    greetingsHandlers.getGreetingsLanguage(request, reply);

    // Assert
    expect(code).to.equal(404);
    expect(greeting).to.be.an.instanceof(Object);
    expect(greeting.statusCode).to.equal(404);
    expect(greeting.documentation_url).to.equal("http://docs.hapiseed.apiary.io/");
    expect(greeting.error).to.equal("Not Found");
    done();
  });
});
