import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    const error = new Error("JWT_SECRET is not defined in environment variables");
    error.statusCode = 500;
    throw error;
  }

  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

export const verifyToken = (token) => {
  if (!process.env.JWT_SECRET) {
    const error = new Error("JWT_SECRET is not defined in environment variables");
    error.statusCode = 500;
    throw error;
  }

  return jwt.verify(token, process.env.JWT_SECRET);
};
