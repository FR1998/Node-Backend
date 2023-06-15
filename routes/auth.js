const express = require("express");
const authRoutes = express.Router();
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const connect = require("./../database/db");
const User = require("../models/UserModel");

const saltRounds = 10;

authRoutes.post("/signup", async (req, res) => {
    const password = await bcrypt.hash(req.body.password, saltRounds);
    const data = {...req.body , password}
    const user = await User.create(data);
    res.json({user});
  });


  authRoutes.post("/login", async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if(!user){
        res.status(404).json({error: "User not found"});
        return;
    }
    if(! await bcrypt.compare(req.body.password,user.password)){
        res.status(404).json({error: "User not found"});
        return;
    }

const token = await jwt.sign({user},"fake-jwt-secret")

    res.json({user, access_token:token});
  });



  module.exports = authRoutes; 