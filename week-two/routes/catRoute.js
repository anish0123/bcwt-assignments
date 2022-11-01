'use strict';
// catRoute
const express = require('express');
const router = express.Router();

//For GET
router.get('/', (req, res) => {
  res.send('From this endpoint you can get cats.')
});
//For GET
router.get('/:catId', (req, res) => {
  console.log(req.params);
  res.send('From this endpoint you can get cat with id ' + req.params.catId);
});


//For POST
router.post('/', (req,res) => {
  console.log(req);
  res.send('With this endpoint you can add cats.')
});

//For PUT
router.put('/', (req,res) => {
  res.send('With this endpoint you can update cats.')
});

//For DELETE
router.delete('/', (req,res) => {
  res.send('With this endpoint you can delete cats.')
});

module.exports = router;