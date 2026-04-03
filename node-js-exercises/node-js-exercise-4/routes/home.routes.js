import express from "express";

const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health check route
 *     tags: [General]
 *     responses:
 *       200:
 *         description: API is running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Welcome to Personal Finance Tracker API!
 */
router.get("/", (req, res) => {
  res.json({ message: "Welcome to Personal Finance Tracker API!" });
});

export default router;
