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

module.exports = {
  getAllUsers,
  getUserById
};