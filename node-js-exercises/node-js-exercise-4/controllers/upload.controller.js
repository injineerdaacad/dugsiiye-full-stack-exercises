import User from "../models/user.model.js";

export const uploadProfilePicture = async (req, res) => {
  if (!req.file) {
    const error = new Error("No file uploaded");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  user.profilePicture = req.file.path;
  await user.save();

  res.status(201).json({
    success: true,
    message: "Profile picture uploaded successfully",
    fileUrl: user.profilePicture,
  });
};
