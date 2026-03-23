import express from "express";

import requireAuth from "../middlewares/requireAuth.middleware.js";
import validate from "../middlewares/validate.zod.middleware.js";

import { CreateUserSchema } from "../schemas/user.schema.js";
import { signUp, loginUser, getProfile, logoutUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/sign-up", validate(CreateUserSchema), signUp);
router.post("/login", loginUser);
router.get("/profile", requireAuth, getProfile);
router.post("/logout", requireAuth, logoutUser);

export default router;
