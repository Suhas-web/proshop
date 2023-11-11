import errorHandler from "../middleware/errorHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateTokenUtil.js";

// desc: Auth
// endpoint: POST /api/users/login
// Access: public
const authUser = errorHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
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
  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({ name, email, password });
  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// desc: Logout user / clear cookie
// endpoint: POST /api/users/logout
// Access: private
const logoutUser = errorHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

// desc: GET user profile
// endpoint: GET /api/users/profile
// Access: private
const getUserProfile = errorHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("Not found user data");
  }
});

// desc: Update user profile
// endpoint: PUT /api/users/profile
// Access: private
const updateUserProfile = errorHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    if (updatedUser) {
      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("Not found user data");
    }
  }
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
