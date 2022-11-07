'use strict';
// catController
const catModel = require('../models/catModel');

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


const modifyCat = (req, res) => {};
const createCat = async (req, res) => {
    const addCat = await catModel.addCat(res, req);
    if(addCat) {
        res.json(addCat);
    }else {
        res.sendStatus(404);
    }
};
const deleteCat = async (req, res) => {
    const deleteCat = await catModel.deleteCat(res, req.params.catId);
    if(deleteCat){
        res.send("Cat data deleted");
    } else {
        res.sendStatus(404);
    } 
};

module.exports = {
    getCat,
    getCats,
    modifyCat,
    createCat,
    deleteCat,
};