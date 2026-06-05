import type { Request, Response } from "express";
import type { LoginBody } from "../types/auth.types.js";

export const loginUser = (req: Request<{}, {}, LoginBody>, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      code: 400,
      message: "Email and password are required",
    });
  }

  return res.status(200).json({
    code: 200,
    message: `Login successful for ${email}`,
  });
};