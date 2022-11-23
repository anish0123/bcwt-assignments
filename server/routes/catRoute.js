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
body('name').isAlphanumeric().trim().escape(),
body('birthdate').isDate(),
body('weight').isFloat({min: 0.1, max: 30}),
catController.createCat)
.put('/', 
body('name').isAlphanumeric().trim().escape(),
body('birthdate').isDate(),
body('weight').isFloat({min: 0.1, max: 30}),
catController.updateCat) //TODO: add validators
.put('/:catId', 
body('name').isAlphanumeric().trim().escape(),
body('birthdate').isDate(),
body('weight').isFloat({min: 0.1, max: 30}),
catController.updateCat) //TODO: add validators
.delete('/:catId', catController.deleteCat);

module.exports = router;