'use strict';
// catController
const catModel = require('../models/catModel');
const {validationResult} = require('express-validator');

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
        const addCat = await catModel.addCat(res, req);
        res.status(201).json({message: 'cat created', catId: addCat});
    }else {
        res.status(400).json({message: 'cat creation failed', errors: errors.array()
    });
    }
    
};
const deleteCat = async (req, res) => {
    const deleteCat = await catModel.deleteCat(res, req.params.catId);
    if(deleteCat){
        res.status(201).json({message:"Cat data deleted"});
    } else {
        res.sendStatus(404);
    } 
};
const updateCat = async (req, res) => {
    const cat = req.body;
    if(req.params.catId) {
        cat.id = req.params.catId;
     }
    const updateCat = await catModel.updateCat(res, cat);
    if(updateCat){
        res.send("Cat data updated");
    } else {
        res.sendStatus(404);
    } 
};


module.exports = {
    getCat,
    getCats,
    createCat,
    deleteCat,
    updateCat
};