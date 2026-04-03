import express from "express";

import { getCategories } from "../controllers/category.controller.js";
import requireAuth from "../middlewares/requireAuth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get predefined categories
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Categories fetched successfully
 */
router.get("/", requireAuth, getCategories);

export default router;
