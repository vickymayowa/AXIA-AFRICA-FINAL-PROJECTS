const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const User = require("../models/userModel");

// Register User
const registerUser = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;

  // Check if all required fields are provided
  if (!email || !name || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // Check if user already exists based on username or email
  const userExists = await User.findOne({
    $or: [{ email }],
  });

  if (userExists) {
    res.status(400);
    throw new Error("Email or username already exists");
  }

  // Create new user
  const user = new User({
    name,
    password,
    email,
  });

  await user.save();

  if (user) {
    // Generate and set token
    generateToken(res, user._id);

    // Return user data (excluding sensitive information)
    const userData = {
      id: user._id,
      name: user.fullname,
      email: user.email,
    };
    res.status(201).json({ message: "Registered Successfully", userData });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    const userData = { user };
    console.log(user);
    res
      .status(200)
      .json({ message: "Logged In Successfully", status: true, userData });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

module.exports = { loginUser, registerUser };
