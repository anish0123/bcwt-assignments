"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();

const getAllUsers = async (res) => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner's name as ownername (from wop_user table).
    const [rows] = await promisePool.query("SELECT * FROM wop_user");
    return rows;
  } catch (e) {
    res.status(500).send(e.message);
    console.error("error", e.message);
  }
};

const getUserById = async(res, userId) => {
  try {
    const[rows] = 
    await promisePool.query("SELECT * FROM wop_user WHERE user_id =?", [userId]);
    return rows[0];
  }catch(e) {
    res.status(500).send(e.message);
    console.error("error", e.message);
  }
};

const getUserLogin = async (user) => {
  try {
    console.log('getUserLogin',user);
    const [rows] = await promisePool.execute(
        'SELECT * FROM wop_user WHERE email = ?;',
        user);
    return rows;
  } catch (e) {
    console.log('error', e.message);
    res.status(500).send(e.message);
  }
};

const addUser = async(res, req) => {
  try{
    let query = `INSERT INTO wop_user values(?,?,?,?,?)`;
    return promisePool.query(query, [null, req.body.name, req.body.email, req.body.passwd,1]);
  } catch(e) {
    res.status(500).send(e.message);
    console.error("error", e.message);
  }
};
module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  getUserLogin
};