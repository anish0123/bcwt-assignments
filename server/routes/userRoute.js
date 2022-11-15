'use strict';

const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');

const userController = require('../controllers/userController');


//FOR getting users
router.get('/', userController.getUsers)
.get('/:userId', userController.getUser)
.post('/', 
body('name').isLength({min: 3}), 
userController.user_create_post)
.put('/', userController.modifyUser);


module.exports = router;