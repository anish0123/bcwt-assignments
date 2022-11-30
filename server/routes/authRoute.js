"use strict";
const express = require("express");
const router = express.Router();
const {body} = require('express-validator');
const {login, logout, register, modifyUser} = require('../controllers/authController');

router.get('/logout', logout);
router.post("/login", login);
router.post('/register',
body('name').isLength({min: 3}).trim().escape(),
body('email').isEmail().normalizeEmail(),  
body('passwd').isLength({min: 8}).trim(), 
register);
router.put('/modifyUser',
body('name').isLength({min: 3}).trim().escape(),
body('email').isEmail().normalizeEmail(),  
body('passwd').isLength({min: 8}).trim(), 
modifyUser
);

module.exports = router;