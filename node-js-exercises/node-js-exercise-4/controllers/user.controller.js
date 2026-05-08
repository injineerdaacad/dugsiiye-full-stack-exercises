import mongoose from "mongoose";

import User from "../models/user.model.js";

const validateUserId = (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    const error = new Error("Invalid user id");
    error.statusCode = 400;
    throw error;
  }
};

const getUserResponse = (user) => {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
    profilePicture: user.profilePicture,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export const getUsers = async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: users.length,
    users: users.map(getUserResponse),
  });
};

export const createUser = async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });

  if (existingUser) {
    const error = new Error("Email is already registered");
    error.statusCode = 409;
    throw error;
  }

  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role ?? "user",
    isActive: req.body.isActive ?? true,
    createdBy: req.user.id,
    updatedBy: req.user.id,
  });

  res.status(201).json({
    success: true,
    message: "User created successfully",
    user: getUserResponse(user),
  });
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  validateUserId(id);

  const user = await User.findById(id);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({
    success: true,
    user: getUserResponse(user),
  });
};

export const updateUser = async (req, res) => {
  const { id } = req.params;

  validateUserId(id);

  const user = await User.findById(id);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  if (req.body.email && req.body.email !== user.email) {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      const error = new Error("Email is already registered");
      error.statusCode = 409;
      throw error;
    }
  }

  user.name = req.body.name ?? user.name;
  user.email = req.body.email ?? user.email;
  user.role = req.body.role ?? user.role;
  user.isActive = req.body.isActive ?? user.isActive;
  user.profilePicture = req.body.profilePicture ?? user.profilePicture;
  user.updatedBy = req.user.id;

  await user.save();

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    user: getUserResponse(user),
  });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  validateUserId(id);

  const user = await User.findById(id);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
};
