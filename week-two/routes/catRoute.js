'use strict';
// catRoute
const express = require('express');
const router = express.Router();
const catController = require('../controllers/catController');

//For GET
router.get('/', catController.getCats);

//For GET with ID
router.get('/:catId', catController.getCat);


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