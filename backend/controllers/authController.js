import User from "../models/userModel.js";
import generateToken from "../config/token.js";
import bcrypt from "bcryptjs";
export const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password, gender } = req.body;
    if (!firstName || !lastName || !email || !gender|| !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }
    const user = await User.findOne({ email });
    console.log(`user : ${user}`);
    
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      gender,
      password: hashedPassword,
    });
    console.log(newUser)
   await newUser.save();
    const token = await generateToken(newUser._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true only on HTTPS in production
      sameSite: "None", 
      maxAge: 24 * 60 * 60 * 1000, 
    });

 
    res
      .status(201)
      .json({ message: "User registered successfully", data: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = await generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None", 
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res
      .status(200)
      .json({
        message: `Welcome back! ${user.firstName} ${user.lastName}`,
        data: user,
      });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
export const logout = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

