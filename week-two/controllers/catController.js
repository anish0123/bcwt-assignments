'use strict';
// catController
const catModel = require('../models/catModel');

//For getting whole array of cats
const getCats = async (req, res) => {
    const cats = await catModel.getAllCats();
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
const createCat = (req, res) => {
    console.log(req.body);
    res.send("adding a cat");
};
const deleteCat = (req, res) => {};

module.exports = {
    getCat,
    getCats,
    modifyCat,
    createCat,
    deleteCat,
};