const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 1. Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    res.status(201).json({ message: "User Registered Successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ message: "Login Successful", token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Get All Users Function (Intha line-la 's' correct-ah irukanu check pannunga)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "name email role status");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. Export Block
module.exports = {
  registerUser,
  loginUser,
  getAllUsers, // 👈 Export-layum 's' correct-ah iruku
};