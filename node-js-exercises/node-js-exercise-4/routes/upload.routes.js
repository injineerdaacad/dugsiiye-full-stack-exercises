import express from "express";

import { uploadProfilePicture } from "../controllers/upload.controller.js";
import requireAuth from "../middlewares/requireAuth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /upload/profile-picture:
 *   post:
 *     summary: Upload a profile picture
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Profile picture uploaded successfully
 *       400:
 *         description: No file uploaded or invalid file type
 *       401:
 *         description: Unauthorized
 */
router.post("/profile-picture", requireAuth, upload.single("file"), uploadProfilePicture);

export default router;
