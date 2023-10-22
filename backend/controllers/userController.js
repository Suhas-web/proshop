import errorHandler from "../middleware/errorHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// desc: Auth
// endpoint: POST /api/users/login
// Access: public
const authUser = errorHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user && (await user.matchPassword(password))) {
    //Generate JWT token
    const token = jwt.sign(
      { userId: user._id }, //payload
      process.env.jwtSecret, //secret
      {
        expiresIn: "30d", //options: expires in 30day
      }
    );

    // Set JWT as HTTP-Only Cookie
    res.cookie(
      "jwt", // name
      token, // value
      {
        // options
        httpOnly: true, //prevent access from javascript DOM
        secure: process.env.NODE_ENV === "PROD", //only send with https sites
        sameSite: "strict", // client sends cookie for only same server site which had sent cookie in first place
        maxAge: 30 * 24 * 60 * 60, // expires in 30day
      }
    );

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or email not found");
  }
});

// desc: Create user
// endpoint: POST /api/users
// Access: public
const registerUser = errorHandler(async (req, res) => {
  res.send("User register");
});

// desc: Logout user / clear cookie
// endpoint: POST /api/users/logout
// Access: private
const logoutUser = errorHandler(async (req, res) => {
  res.send("User logout");
});

// desc: GET user profile
// endpoint: GET /api/users/profile
// Access: private
const getUserProfile = errorHandler(async (req, res) => {
  res.send("GET User profile");
});

// desc: Update user profile
// endpoint: PUT /api/users/profile
// Access: private
const updateUserProfile = errorHandler(async (req, res) => {
  res.send("Update User profile");
});

// desc: GET users
// endpoint: GET /api/users
// Access: private/admin
const getUsers = errorHandler(async (req, res) => {
  res.send("GET Users");
});

// desc: GET user by id
// endpoint: GET /api/users/:id
// Access: private/admin
const getUserById = errorHandler(async (req, res) => {
  res.send("GET User By ID");
});

// desc: PUT users
// endpoint: PUT /api/users/:id
// Access: private/admin
const updateUser = errorHandler(async (req, res) => {
  res.send("Update User");
});

// desc: DELETE users
// endpoint: DELETE /api/users/:id
// Access: private/admin
const deleteUserProfile = errorHandler(async (req, res) => {
  res.send("DELETE User");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUserProfile,
};
