import express from "express";

import { getAdminOverview } from "../controllers/admin.controller.js";
import requireAuth from "../middlewares/requireAuth.middleware.js";
import requireRole from "../middlewares/requireRole.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /admin/overview:
 *   get:
 *     summary: Get admin overview data
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin overview fetched successfully
 *       403:
 *         description: Access denied
 */
router.get("/overview", requireAuth, requireRole("admin"), getAdminOverview);

export default router;
