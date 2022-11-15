'use strict';
// userController
const userModel = require('../models/userModel');

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

const modifyUser = (req, res) => {
    res.send("From this point you can edit some users");
};

const user_create_post = async (req, res) => {
    //console.log(req.body);
    //const userInfo = `username: ${req.body.name}, email: ${req.body.email}`;
    //res.send('Adding new user ' + userInfo);
    const addUser = await userModel.addUser(res, req);
    if(addUser) {
        res.json(addUser);
    }else {
        res.sendStatus(404);
    }
    
};
const deleteUser = (req, res) => {};

module.exports = {
    getUsers,
    getUser,
    modifyUser,
    user_create_post,
    deleteUser
};