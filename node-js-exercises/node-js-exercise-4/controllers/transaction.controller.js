import mongoose from "mongoose";
import Transaction from "../models/transaction.model.js";

const validateTransactionAmount = (type, amount) => {
  if ((type === "income" || type === "expense") && amount <= 0) {
    const error = new Error(`${type === "income" ? "Income" : "Expense"} amount must be greater than zero`);
    error.statusCode = 422;
    throw error;
  }
};

const validateTransactionId = (transactionId) => {
  if (!mongoose.Types.ObjectId.isValid(transactionId)) {
    const error = new Error("Invalid transaction id");
    error.statusCode = 400;
    throw error;
  }
};

export const createTransaction = async (req, res) => {
  const { title, amount, type, category, date } = req.body;

  validateTransactionAmount(type, amount);

  const transaction = await Transaction.create({
    title,
    amount,
    type,
    category,
    date: new Date(date),
    createdBy: req.user.id,
    updatedBy: req.user.id,
  });

  res.status(201).json({
    success: true,
    message: "Transaction created successfully",
    transaction,
  });
};

export const getTransactions = async (req, res) => {
  const transactions = await Transaction.find({ createdBy: req.user.id }).sort({ date: -1, createdAt: -1 });

  res.status(200).json({
    success: true,
    count: transactions.length,
    transactions,
  });
};

export const getTransactionById = async (req, res) => {
  const { id } = req.params;

  validateTransactionId(id);

  const transaction = await Transaction.findOne({ _id: id, createdBy: req.user.id });

  if (!transaction) {
    const error = new Error("Transaction not found");
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({
    success: true,
    transaction,
  });
};

export const getMonthlySummary = async (req, res) => {
  const now = new Date();
  const month = Number(req.query.month) || now.getMonth() + 1;
  const year = Number(req.query.year) || now.getFullYear();

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 1);

  const summary = await Transaction.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.id),
        date: {
          $gte: startDate,
          $lt: endDate,
        },
      },
    },
    {
      $group: {
        _id: {
          category: "$category",
          type: "$type",
        },
        totalAmount: { $sum: "$amount" },
        transactionCount: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        category: "$_id.category",
        type: "$_id.type",
        totalAmount: 1,
        transactionCount: 1,
        typeOrder: {
          $cond: [{ $eq: ["$_id.type", "income"] }, 1, 2],
        },
      },
    },
    {
      $sort: { typeOrder: 1, category: 1 },
    },
    {
      $project: {
        category: 1,
        type: 1,
        totalAmount: 1,
        transactionCount: 1,
      },
    },
  ]);

  const totals = summary.reduce(
    (acc, item) => {
      if (item.type === "income") {
        acc.totalIncome += item.totalAmount;
      } else {
        acc.totalExpense += Math.abs(item.totalAmount);
      }

      return acc;
    },
    { totalIncome: 0, totalExpense: 0 }
  );

  const netIncome = totals.totalIncome - totals.totalExpense;

  res.status(200).json({
    success: true,
    month,
    year,
    summary,
    totals: {
      ...totals,
      netIncome,
      profitOrLoss: netIncome > 0 ? "profit" : netIncome < 0 ? "loss" : "break-even",
    },
  });
};

export const updateTransaction = async (req, res) => {
  const { id } = req.params;

  validateTransactionId(id);

  const transaction = await Transaction.findOne({ _id: id, createdBy: req.user.id });

  if (!transaction) {
    const error = new Error("Transaction not found");
    error.statusCode = 404;
    throw error;
  }

  transaction.title = req.body.title ?? transaction.title;
  transaction.amount = req.body.amount ?? transaction.amount;
  transaction.type = req.body.type ?? transaction.type;
  transaction.category = req.body.category ?? transaction.category;
  transaction.date = req.body.date ? new Date(req.body.date) : transaction.date;
  transaction.updatedBy = req.user.id;

  validateTransactionAmount(transaction.type, transaction.amount);

  await transaction.save();

  res.status(200).json({
    success: true,
    message: "Transaction updated successfully",
    transaction,
  });
};

export const deleteTransaction = async (req, res) => {
  const { id } = req.params;

  validateTransactionId(id);

  const transaction = await Transaction.findOne({ _id: id, createdBy: req.user.id });

  if (!transaction) {
    const error = new Error("Transaction not found");
    error.statusCode = 404;
    throw error;
  }

  await transaction.deleteOne();

  res.status(200).json({
    success: true,
    message: "Transaction deleted successfully",
  });
};
