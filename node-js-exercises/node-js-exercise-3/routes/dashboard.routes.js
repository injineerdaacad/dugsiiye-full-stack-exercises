import express from "express";

import requireAuth from "../middlewares/requireAuth.middleware.js";
import requireRole from "../middlewares/requireRole.middleware.js";

import { adminDashboard, userDashboard } from "../controllers/dashboard.controller.js";


const router = express.Router();

router.get("/admin", requireAuth, requireRole("admin"), adminDashboard);
router.get("/user", requireAuth, requireRole("user", "admin"), userDashboard);

export default router;
