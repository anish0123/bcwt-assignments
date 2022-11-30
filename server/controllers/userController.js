'use strict';
// userController
const userModel = require('../models/userModel');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

const users = userModel.users;

//For getting whole array of users
const getUsers = async (req, res) => {
    const users = await userModel.getAllUsers(res);
    users.map(user =>{
        delete user.password;
    })
    res.json(users);
    };

//For getting single user, if not available letting the user know.
const getUser = async (req, res) => {
    const user = await userModel.getUserById(res, req.params.userId);
    if(user) {
        delete user.password;
        res.json(user);
    }else {
        res.sendStatus(404);
    }
}


const user_create_post = async (req, res) => {
    //console.log(req.body);
    //const userInfo = `username: ${req.body.name}, email: ${req.body.email}`;
    //res.send('Adding new user ' + userInfo);
    const errors = validationResult(req);
    console.log('validation errors', errors);
    if(errors.isEmpty()){
        const addUser = await userModel.addUser(res, req);
        res.status(201).json({message: 'user created',
        userId: addUser});
        
    }else{
        res.status(404).json({message: 'user creation failed', 
        errors: errors.array()
    });
    }
    
    
};
const deleteUser = (req, res) => {};
const checkToken = (req, res) => {
    delete req.user.password;
    res.json({user: req.user})
};
const modifyUser = async (req, res) => {
    const errors = validationResult(req);
    console.log('validation errors', errors);
    // added password hash
    const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(req.body.passwd, salt);
  req.body.passwd = passwordHash;
        const updateUser = await userModel.modifyUser(res,req);
        if(updateUser){
            res.status(201).json({message: "User data updated"});
        } else {
            res.sendStatus(404);
        } 
    
};

module.exports = {
    getUsers,
    getUser,
    modifyUser,
    user_create_post,
    deleteUser,
    checkToken
};