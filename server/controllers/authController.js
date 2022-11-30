"use strict";
const jwt = require("jsonwebtoken");
const passport = require("passport");
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const userModel = require('../models/userModel');
require("dotenv").config();

const login = (req, res) => {
  // TODO: add passport authenticate
  passport.authenticate('local', {session: false}, (err, user, info) => {
    if (err || !user) {
        return res.status(400).json({
            message: 'Something is not right',
            user   : user
        });
    }
   req.login(user, {session: false}, (err) => {
       if (err) {
           res.send(err);
       }
       // generate a signed son web token with the contents of user object and return it in the response
       // don not include password in token/yser object when sending to client
       delete user.password;
       const token = jwt.sign(user, process.env.JWT_SECRET);
       return res.json({user, token});
    });
})(req, res);
};

const register = async (req, res) => {
  //console.log(req.body);
  //const userInfo = `username: ${req.body.name}, email: ${req.body.email}`;
  //res.send('Adding new user ' + userInfo);
  const errors = validationResult(req);
  console.log('validation errors', errors);
  if(errors.isEmpty()){
    // Hash the input password and replace the clear text password with the hashed one.
    // before adding to the db
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(req.body.passwd, salt);
      req.body.passwd = passwordHash;
      const addUser = await userModel.addUser(res, req);
      res.status(201).json({message: 'user created',
      userId: addUser});
      
  }else{
      res.status(404).json({message: 'user creation failed', 
      errors: errors.array()
  });
  }
};

// TODO work on adding hash value on the password while modifying the user
const modifyUser = async (req, res) => {
  const errors = validationResult(req);
  console.log('validation errors', errors);
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(req.body.passwd, salt);
  req.body.passwd = passwordHash;
  console.log(req.body.user_id);
      const updateUser = await userModel.modifyUser(res,req);
      if(updateUser){
          res.status(201).json({message: "User data updated"});
      } else {
          res.sendStatus(404).json({message: 'user creation failed', 
          errors: errors.array()
      });
      } 
  
};

const logout = (req, res) => {
  console.log('some user logged out');
  res.json({message: 'logged out'});
};

module.exports = {
  login,
  register,
  logout,
  modifyUser
};