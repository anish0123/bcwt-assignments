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
router.put('/', catController.updateCat);

//For DELETE
router.delete('/:catId', catController.deleteCat);

module.exports = router;