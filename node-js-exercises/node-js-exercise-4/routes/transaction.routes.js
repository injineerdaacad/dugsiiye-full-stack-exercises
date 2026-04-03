import express from "express";

import {
  createTransaction,
  deleteTransaction,
  getTransactionById,
  getMonthlySummary,
  getTransactions,
  updateTransaction,
} from "../controllers/transaction.controller.js";
import requireAuth from "../middlewares/requireAuth.middleware.js";
import validate from "../middlewares/validate.zod.middleware.js";
import {
  CreateTransactionSchema,
  UpdateTransactionSchema,
} from "../schemas/transaction.schema.js";

const router = express.Router();

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TransactionInput'
 *     description: Use a positive amount for both income and expense
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *       422:
 *         description: Validation failed
 */
router.post("/", requireAuth, validate(CreateTransactionSchema), createTransaction);

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Get all transactions for the current user
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Transaction list
 */
router.get("/", requireAuth, getTransactions);

/**
 * @swagger
 * /transactions/monthly-summary:
 *   get:
 *     summary: Get monthly transaction summary
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: month
 *         schema:
 *           type: integer
 *         description: Month number from 1 to 12
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         description: Full year like 2026
 *     responses:
 *       200:
 *         description: Monthly summary with income first, then expense, and profit or loss totals
 */
router.get("/monthly-summary", requireAuth, getMonthlySummary);

/**
 * @swagger
 * /transactions/{id}:
 *   get:
 *     summary: Get a transaction by id
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction fetched successfully
 *       404:
 *         description: Transaction not found
 */
router.get("/:id", requireAuth, getTransactionById);

/**
 * @swagger
 * /transactions/{id}:
 *   put:
 *     summary: Update a transaction by id
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTransactionInput'
 *     description: Use a positive amount for both income and expense
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 *       404:
 *         description: Transaction not found
 */
router.put("/:id", requireAuth, validate(UpdateTransactionSchema), updateTransaction);

/**
 * @swagger
 * /transactions/{id}:
 *   delete:
 *     summary: Delete a transaction by id
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
 *       404:
 *         description: Transaction not found
 */
router.delete("/:id", requireAuth, deleteTransaction);

export default router;
