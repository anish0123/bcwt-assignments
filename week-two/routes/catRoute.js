'use strict';
// catRoute
const express = require('express');
const router = express.Router();
const multer = require('multer');
const catController = require('../controllers/catController');

const upload = multer({dest: 'uploads/'});

//For GET
router.get('/', catController.getCats)
.get('/:catId', catController.getCat)
.post('/', upload.single('cat'), catController.createCat)
.put('/', catController.updateCat)
.put('/:catId', catController.updateCat)
.delete('/:catId', catController.deleteCat);

module.exports = router;