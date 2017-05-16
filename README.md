# hapi-seed, basic structure, linting and tests

This is a seed project designed to get you up and running with a hapi 
based node api. Grunt tasks are configured to run linting and tests (Lab and Dredd).


### Install dependencies: 
`npm install`

### Install grunt on your system 
`npm install -g grunt grunt-cli`

### Run linting and unit/e2e tests 
`grunt`

### Run it! 
`node src/app.js`
`grunt start`

## Docs
API documentation can be found in the blueprint file `hapiseed-blueprint.apib`
and can be found online at http://hapiseed.apiary.io

## Tests
There are 3 levels of testing within the project
* Unit tests
* End to end tests
* API tests

Unit and e2e both use Code and Lab as the testing framework. 

As you would expect 
the unit tests focus on the single unit of code being the function within a module with most all dependencies mocked out.

End to end tests again use Code and Lab and make use of Labs inject() functionality to test a fully functional api in memory.

The API tests use Dredd and need a running instance of the API in order for the tests to be run.

### Unit and e2e tests (with Lab)
`grunt test`
`./node_modules/.bin/lab`

### API tests (with Dredd)
`node src/app.js &`
`./node_modules/dredd/bin/dredd src/hapiseed-blueprint.apib http://localhost:1337`

### Run all tests
`npm test`
`grunt testAll`