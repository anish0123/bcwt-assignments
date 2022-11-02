'use strict';
// userController
const userModel = require('../models/userModel');

const users = userModel.users;

//For getting whole array of users
const getUsers = (req, res) => {
    // remove the password property from all user items in the array
    users.map(user => {
        delete user.password;
        return user;
    });
    res.json(users);
}
//For getting single user, if not available letting the user know.
const getUser = (req, res) => {
    const user = users.filter(user => user.id == req.params.userId)[0];
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

const createUser = (req, res) => {
    //console.log(req.body);
    const userInfo = `username: ${req.body.name}, email: ${req.body.email}`;
    res.send('Adding new user ' + userInfo);
    
};
const deleteUser = (req, res) => {};

module.exports = {
    getUsers,
    getUser,
    modifyUser,
    createUser,
    deleteUser
};