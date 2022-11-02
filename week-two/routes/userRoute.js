'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


//FOR getting users
router.get('/', userController.getUsers);

//FOR getting single user
router.get('/:userId', userController.getUser);

router.post('/', userController.createUser);

router.put('/', userController.modifyUser);


module.exports = router;