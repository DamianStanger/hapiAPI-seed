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
    expect(greeting.links.documentation).to.equal("http://docs.hapiseed.apiary.io/");
    expect(greeting.errors.length).to.equal(1);
    expect(greeting.errors[0].status).to.equal(404);
    expect(greeting.errors[0].title).to.equal("Resource not found");
    done();
  });

  it("setGreeting creates and returns the new greeting", done => {
    // Arrange
    const request = {
      "info": {
        "host": "myTestHost"
      },
      "params": {
        "lang": "foobar"
      },
      "payload": {
        "language": "oz",
        "greeting": "guday."
      }
    };
    function reply(passedValue) {
      return {
        "code"(code) {
          passedValue.status = code;
          return passedValue;
        }
      };
    }

    // Act
    const replyValue = greetingsHandlers.setGreetings(request, reply);

    // Assert
    expect(replyValue).to.be.an.instanceof(Object);
    expect(replyValue.status).to.equal(202);
    expect(replyValue.language).to.equal("oz");
    done();
  });

  it("putGreeting returns not implemented", done => {
    // Arrange
    const request = {};
    let boom;
    function reply(passedValue) {
      boom = passedValue;
    }

    // Act
    greetingsHandlers.putGreeting(request, reply);

    // Assert
    expect(boom).to.be.an.instanceof(Object);
    expect(boom.isBoom).to.be.true();
    expect(boom.output.statusCode).to.equal(501);
    expect(boom.output.payload.error).to.equal("Not Implemented");
    expect(boom.output.payload.message).to.equal("Still working on this");
    done();
  });
});
