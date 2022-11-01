'use strict';
const express = require('express');
const app = express();
const port = 3000;

//For GET
app.get('/cat', (req, res) => {
  res.send('From this endpoint you can get cats.')
});
//For GET
app.get('/cat/:catId', (req, res) => {
  console.log(req.params);
  res.send('From this endpoint you can get cat with id ' + req.params.catId);
});


//For POST
app.post('/cat', (req,res) => {
  console.log(req);
  res.send('With this endpoint you can add cats.')
});

//For PUT
app.put('/cat', (req,res) => {
  res.send('With this endpoint you can update cats.')
});

//For DELETE
app.delete('/cat', (req,res) => {
  res.send('With this endpoint you can delete cats.')
});

//FOR getting user
app.get('/user', (req, res) => {
  res.send('From this endpoint you can get users.')
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
