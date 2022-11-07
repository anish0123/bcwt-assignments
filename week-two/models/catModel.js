"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();

const getAllCats = async (res) => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner's name as ownername (from wop_user table).
    const [rows] = await promisePool.query("SELECT * FROM wop_cat");
    return rows;
  } catch (e) {
    res.status(500).send(e.message);
    console.error("error", e.message);
  }
};

const getCatById = async (res, catId) => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner's name as ownername (from wop_user table).
    const [rows] = 
      await promisePool.query("SELECT * FROM wop_cat WHERE cat_id = ?",[catId]);
    return rows[0];
  } catch (e) {
    res.status(500).send(e.message);
    console.error("error", e.message);
  }
};

// Picture is not being displayed after being uploaded.
const addCat = async(res, req) => {
  try{
    console.log(req.body);
    let query = `INSERT INTO wop_cat(cat_id,name,birthdate,weight,owner,filename) values(?,?,?,?,?,?)`;
    return promisePool.query(query, [null, req.body.name,req.body.birthdate, req.body.weight, req.body.owner,req.file.path]);
  } catch(e) {
    res.status(500).send(e.message);
    console.error("error", e.message);
  }
};
module.exports = {
  getAllCats,
  getCatById,
  addCat
};