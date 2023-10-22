import errorHandler from "../middleware/errorHandler.js";
import User from "../models/userModel.js";

// desc: Auth
// endpoint: POST /api/users/login
// Access: public
const authUser = errorHandler(async (req, res) => {
  res.send("User auth");
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
