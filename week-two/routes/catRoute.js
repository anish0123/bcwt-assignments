'use strict';
// catRoute
const express = require('express');
const router = express.Router();
const multer = require('multer');
const catController = require('../controllers/catController');

const upload = multer({dest: 'uploads/'});

//For GET
router.get('/', catController.getCats);

//For GET with ID
router.get('/:catId', catController.getCat);


//For POST
router.post('/', upload.single('cat'), catController.createCat);

//For PUT
router.put('/', (req,res) => {
  res.send('With this endpoint you can update cats.')
});

//For DELETE
router.delete('/', (req,res) => {
  res.send('With this endpoint you can delete cats.')
});

module.exports = router;