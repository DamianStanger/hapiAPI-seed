# hapi-seed, basic structure, linting and tests

This is a seed project designed to get you up and running with a hapi 
based node api. Grunt tasks are configured to run linting and tests (Lab and Dredd).


### Install dependencies: 
`npm install`

### Install grunt on your system 
`npm install -g grunt grunt-cli`

### Run linting and all tests (unit, integration and dredd documentation tests)
`grunt`

### Run it! 
`node src/server.js` OR `grunt start` OR `npm start`

## Configuration 
### Via environment Variables
The port listened to by hapi is configurable 
`export HAPIAPI_HTTPPUBLICPORT=8888` (default 1337)
`export HAPIAPI_LOGGINGLEVELS=warn,error,fatal` (default `debug,info,warn,error,fatal`)

### Via node command line options (node arguments will trump env variables)
`node src/server.js http.public.port=8888 logging.levels=warn,error,fatal`

## API design
The api follows the design as advocated by in the http://jsonapi.org/ spec following a HATEOS style.
The root of the site returns an index page with links to all the other resources avaliable.

## Docs
API documentation can be found in the blueprint file `hapiseed-blueprint.apib`
and can be found online at [http://hapiseed.apiary.io]

## Tests
There are 3 levels of testing within the project
* Unit tests
* Integration tests
* API tests

Unit and Integration both use Code and Lab as the testing framework. 

As you would expect the unit tests focus on the single unit of code being the function 
within a module with most all dependencies mocked out.

Integration tests again use Code and Lab and make use of Labs inject() functionality to 
test a fully built api in memory with all dependencies in place.

The API tests use a combination of blueprint and dredd. You need a running instance of 
the API in order for the tests to be run.

### Unit and e2e tests (with Lab)
`grunt test` OR `./node_modules/.bin/lab`

### API tests (with Dredd)
Start the node app `node src/server.js &`
Then run dredd `./node_modules/dredd/bin/dredd src/hapiseed-blueprint.apib http://localhost:1337`

OR use the batch file `./runDredd.sh`

OR use grunt `grunt shell:dredd`
