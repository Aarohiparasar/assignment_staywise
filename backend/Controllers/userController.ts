import { Request, Response } from "express";
import Users from "../MODELS/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ================= SIGNUP =================
const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userName, emailId, password, mobileNumber, role } = req.body;

    if (!userName || !emailId || !password || !mobileNumber) {
      res.status(400).json({ status: "error", error: "All fields are required" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Users({
      userName,
      emailId,
      password: hashedPassword,
      mobileNumber,
      role,
    });

    await newUser.save();

    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      user: {
        id: newUser._id,
        userName: newUser.userName,
        emailId: newUser.emailId,
      },
    });
  } catch (err: any) {
    if (err.code === 11000) {
      res.status(400).json({
        status: "error",
        error: "Username or email already exists",
      });
    } else {
      res.status(500).json({
        status: "error",
        error: "Internal server error",
        details: err.message,
      });
    }
  }
};

// ================= LOGIN =================
const Login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const user = await Users.findOne({ userName: username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword) {
      return res.status(400).json({ message: "Please enter a correct password" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.userName, role: user.role },
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Logged in successfully",
      token,
      id: user._id,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Unable to login due to some error" });
  }
};

// ================= PROFILE =================
const Profile = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await Users.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      userName: user.userName,
      emailId: user.emailId,
      mobileNumber: user.mobileNumber,
    });
  } catch (error: any) {
    console.error("Error in profile controller:", error);
    return res.status(500).json({ message: "Error in getting user profile" });
  }
};

export { signUp, Login, Profile };
