'use strict';
// catRoute
const express = require('express');
const router = express.Router();
const multer = require('multer');
const {body} = require('express-validator');
const catController = require('../controllers/catController');

const fileFilter= (req, file, cb) =>{
    const acceptedTypes = ['image/jpeg','image/png','image/gif'];
    if(acceptedTypes.includes(file.mimetype)) {
        //To accept the file pass `true`, like so:
        cb(null,true);
    } else{
         //To reject the file pass `false`, like so:
        cb(null, false);
    }

    console.log(file);
    
};

const upload = multer({dest: 'uploads/',fileFilter});

//For GET
router.get('/', catController.getCats)
.get('/:catId', catController.getCat)
.post('/', 
upload.single('cat'),
body('name').isAlphanumeric(),
body('birthdate').isDate(),
body('weight').isFloat({min: 0.1, max: 30}),
body('owner').isInt({min: 1}),
catController.createCat)
.put('/', catController.updateCat)
.put('/:catId', catController.updateCat)
.delete('/:catId', catController.deleteCat);

module.exports = router;