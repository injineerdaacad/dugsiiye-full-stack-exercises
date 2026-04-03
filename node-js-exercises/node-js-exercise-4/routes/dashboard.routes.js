import express from "express";

import requireAuth from "../middlewares/requireAuth.middleware.js";
import requireRole from "../middlewares/requireRole.middleware.js";

import { adminDashboard, userDashboard } from "../controllers/dashboard.controller.js";


const router = express.Router();

/**
 * @swagger
 * /dashboard/admin:
 *   get:
 *     summary: Get admin dashboard
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin dashboard data
 *       403:
 *         description: Access denied
 */
router.get("/admin", requireAuth, requireRole("admin"), adminDashboard);


/**
 * @swagger
 * /dashboard/user:
 *   get:
 *     summary: Get user dashboard
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User dashboard data
 *       403:
 *         description: Access denied
 */
router.get("/user", requireAuth, requireRole("user", "admin"), userDashboard);

export default router;
