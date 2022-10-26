'use strict';

const express = require('express');
const app = express();
const port = 3000;

let requestCounter = 0;

app.use(express.static('public'));

/**
app.get('/', (req, res) => {
  res.send('Hello World!')
  requestCounter = 0;
});
*/

app.get('/catinfo',(req, res) => {
    const cat = {
        name: "Frank",
        birthdate: "2010-12-25",
        weight: 15,
      };
    res.json(cat);
})

app.get('/test',(req, res) => {
    requestCounter++;
    console.log('trying the test page.');
    res.send('<h1>Hello Test</h1><p>' + requestCounter + '</p>');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});