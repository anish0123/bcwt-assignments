"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();

const getAllCats = async (res) => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner's name as ownername (from wop_user table).
    const [rows] = await promisePool.query("SELECT wop_cat.cat_id, wop_cat.name, wop_cat.weight, wop_cat.owner, wop_cat.birthdate, wop_cat.filename, wop_user.name as ownername FROM wop_cat Left join wop_user on wop_cat.owner = wop_user.user_id");
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
const addCat = async(res, cat) => {
  try{
    console.log(cat);
    let query = `INSERT INTO wop_cat(cat_id,name,birthdate,weight,owner,filename,coords) values(?,?,?,?,?,?,?)`;
    return promisePool.query(query, [null,cat.name,cat.birthdate, cat.weight, cat.owner,cat.filename, cat.coords]);
  } catch(e) {
    res.status(500).send(e.message);
    console.error("error", e.message);
  }
};

const deleteCat = async (res, catId) => {
  try{
    let query = `DELETE FROM wop_cat WHERE cat_id=?`;
    return promisePool.query(query,[catId]);
  }catch(e) {
    res.status(500).send(e.message);
    console.error("error", e.message);
}
};

const deleteCatById = async (res, catId, owner) => {
  try{
    console.log(owner.role);
    if(owner.role == 0) {
      let query = `DELETE FROM wop_cat WHERE cat_id= ?`;
    return promisePool.query(query,[catId]);
    } else {
      let query = `DELETE FROM wop_cat WHERE cat_id= ? AND owner= ?`;
    return promisePool.query(query,[catId, owner.user_id]);
    }
  }catch(e) {
    res.status(500).send(e.message);
    console.error("error", e.message);
}
};
const updateCat = async(res,cat, owner) => {
  try{
    let query = `UPDATE wop_cat SET name = ?, birthdate = ?, weight = ?, owner = ? WHERE cat_id = ? AND owner=?`;
    return promisePool.query(query, [cat.name, cat.birthdate, cat.weight, owner, cat.id, owner]);
  }catch(e) {
    res.status(500).send(e.message);
    console.error("error", e.message);
  }
};

module.exports = {
  getAllCats,
  getCatById,
  addCat,
  deleteCatById,
  updateCat
};