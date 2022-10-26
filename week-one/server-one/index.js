'use strict';

const { response } = require('express');
const express = require('express');
const app = express();
const port = 3000;

let requestCounter = 0;

app.use(express.static('public'));
app.set('view engine', 'pug');

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
    //Example of using pug
    res.render('test',{
        title: "Pug test page",
        header1: "Pug Test Page",
        header2: "Counter",
        exampleText: "Page requested " + requestCounter + " times.",
    });
    //basic html as string
    //res.send('<h1>Hello Test</h1><p>' + requestCounter + '</p>');

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});