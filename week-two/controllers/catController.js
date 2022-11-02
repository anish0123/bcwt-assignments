'use strict';
// catController
const catModel = require('../models/catModel');

const cats = catModel.cats;

//For getting whole array of cats
const getCats = (req, res) => {
res.json(cats);
};

//For getting a single cat and letting user know if there is none
const getCat = (req, res) => {
    //choose only one object with matching id
   const cat =  cats.filter(cat => cat.id == req.params.catId)[0];
    if(cat) {
        res.json(cat);
    } else {
        res.sendStatus(404);
    } 
};
const modifyCat = (req, res) => {};
const createCat = (req, res) => {};
const deleteCat = (req, res) => {};

module.exports = {
    getCat,
    getCats,
    modifyCat,
    createCat,
    deleteCat,
};