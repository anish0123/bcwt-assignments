'use strict';
// catController
const catModel = require('../models/catModel');
const {validationResult} = require('express-validator');
const {makeThumbnail, getCoordinates} = require('../utils/image');

//For getting whole array of cats
const getCats = async (req, res) => {
    const cats = await catModel.getAllCats(res);
    res.json(cats);
};

//For getting a single cat and letting user know if there is none
const getCat = async (req, res) => {
    //choose only one object with matching id
   const cat =  await catModel.getCatById(res, req.params.catId);
    if(cat) {
        res.json(cat);
    } else {
        res.sendStatus(404);
    } 
};



const createCat = async (req, res) => {
    const errors = validationResult(req);
    console.log('validation errors', errors);
    //File is empty or missing ( not passing multer's fileFilter in route)

    if(!req.file){
        res.status(400).json({message: 'cat file not found'})

    }else if(errors.isEmpty()) {
        const cat = req.body;

        //TODO: fix fileName in thumbnails
        await makeThumbnail(req.file.path, req.file.filename);
        //TODO: use image.js/getCoord to extract exif-data/gps coords and add
        //to the cat object as cat.coords property in array format
        cat.coords = JSON.stringify(await getCoordinates(req.file.path));
        const userId = req.user.user_id;
        cat.owner = userId;
        cat.filename = req.file.filename;
        console.log(cat);
        const addCat = await catModel.addCat(res, cat);
        
        res.status(201).json({message: 'cat created', catId: addCat});
    }else {
        res.status(400).json({message: 'cat creation failed', errors: errors.array()
    });
    }
    
};
const deleteCat = async (req, res) => {
    const deleteCat = await catModel.deleteCatById(res, req.params.catId, req.user);
    if(deleteCat){
        res.status(201).json({message:"Cat data deleted"});
    } else {
        res.sendStatus(401).json({message: "cat cant be deleted"});
    } 
};
const updateCat = async (req, res) => {
    const cat = req.body;
    if(req.params.catId) {
        cat.id = req.params.catId;
     }
     if(req.params.owner == cat.owner) {
        const updateCat = await catModel.updateCat(res, cat, req.user.user_id);
        if(updateCat){
            res.status(201).json({message: "Cat data updated"});
        } else {
            res.sendStatus(404);
        } 
     }else{
        res.status(201).json({message: "Cat data cannot be updated"});
     }
    
    
};


module.exports = {
    getCat,
    getCats,
    createCat,
    deleteCat,
    updateCat
};