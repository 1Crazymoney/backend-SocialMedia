import bcrypt from "bcrypt";
import User from "./users.model.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = bcrypt.hashSync(
      password,
      parseInt(process.env.SALT_ROUNDS)
    );

    const newUser = await User.create({
      email: email,
      password: hashedPassword,
    });

    res.status(200).json({
      success: true,
      message: "User registered successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: "Error registering user",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validaciones

    if (!email || !password) {
      return res.status(400).json({
        succes: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({
      email: email,
    });

    if (!User) {
      return res.status(404).json({
        success: false,
        message: "User or password invalid",
      });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(404).json({
        success: false,
        message: "User or password invalid",
      });
    }
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT,
      {
        expiresIn: "2h",
      }
    );

    console.log(user);
    res.status(200).json({
      success: true,
      message: "User logged successfully",
      data: token,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: "Error login user",
      error: error.message,
    });
  }
};