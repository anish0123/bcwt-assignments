'use strict';

const express = require('express');
const router = express.Router();
const {body} = require('express-validator');

const userController = require('../controllers/userController');


//FOR getting users
router.get('/', userController.getUsers)
.get('/token', userController.checkToken)
.get('/:userId', userController.getUser)
.post('/', 
body('name').isLength({min: 3}).trim().escape(),
body('email').isEmail().normalizeEmail(),  
body('passwd').isLength({min: 8}).trim(), 
userController.user_create_post)
.put('/', userController.modifyUser); //TODO: add validators

module.exports = router;