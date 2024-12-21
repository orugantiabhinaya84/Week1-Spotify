const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");


// Post - Register
const RegisterUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;
    // console.log(req.body);
    if(!name || !email || !password){
        res.status(400);
        throw new Error("All fields are required!!");
    }
    const existingUser = await User.findOne({ email, password });
  if (existingUser) {
    res.status(400);
    throw new Error("User with this email already exists!");
  }

  const user = await User.create({name, email, password});
  res.status(201).json({message : "User created success!!", user : user});

})


// POST - Login
const LoginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are required!!");
    }
    const existingUser = await User.findOne({ email, password });
    if(!existingUser){
        res.status(400);
    throw new Error("User doesnot exists!!");
    }
    res.status(200).json({message : "User found", user : existingUser});
})

module.exports = {RegisterUser, LoginUser}
