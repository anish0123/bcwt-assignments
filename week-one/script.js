'use strict';

const _= require('lodash');

// never use 'var'
//const or let is preferred

//Exercise-1
console.log("Hello World, I'm Node.js");

//Exercise-2
let output = "Just testing nodemon, using lodast to convert " +
                "this camel case";

console.log(output);
output = _.camelCase(output);
console.log(output);
