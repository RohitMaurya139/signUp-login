import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
export const getUser = async (req, res) => {
  try {
  
    const user = await User.find({ });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
   
 
    res.status(200).json({
      message: `All user`,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
