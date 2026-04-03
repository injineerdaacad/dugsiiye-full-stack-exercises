import { verifyToken } from "../utility/jwt.js";
import User from "../models/user.model.js";

const requireAuth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    const error = new Error("Authorization token is required");
    error.statusCode = 401;
    throw error;
  }

  const decoded = verifyToken(token);

  const user = await User.findById(decoded.id);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 401;
    throw error;
  }

  req.user = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    profilePicture: user.profilePicture,
  };

  next();
};

export default requireAuth;
