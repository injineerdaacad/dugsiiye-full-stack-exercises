import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";

export const getAdminOverview = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const activeUsers = await User.countDocuments({ isActive: true });
  const adminUsers = await User.countDocuments({ role: "admin" });
  const totalTransactions = await Transaction.countDocuments();

  const transactionTotals = await Transaction.aggregate([
    {
      $group: {
        _id: "$type",
        totalAmount: { $sum: "$amount" },
      },
    },
  ]);

  const totalIncome = transactionTotals.find((item) => item._id === "income")?.totalAmount || 0;
  const totalExpense = transactionTotals.find((item) => item._id === "expense")?.totalAmount || 0;

  const topSpendingCategories = await Transaction.aggregate([
    {
      $match: { type: "expense" },
    },
    {
      $group: {
        _id: "$category",
        totalAmount: { $sum: "$amount" },
        transactionCount: { $sum: 1 },
      },
    },
    {
      $sort: { totalAmount: -1 },
    },
    {
      $limit: 5,
    },
    {
      $project: {
        _id: 0,
        category: "$_id",
        totalAmount: 1,
        transactionCount: 1,
      },
    },
  ]);

  const netIncome = totalIncome - totalExpense;

  res.status(200).json({
    success: true,
    message: "Admin overview fetched successfully",
    overview: {
      totalUsers,
      activeUsers,
      adminUsers,
      totalTransactions,
      totalIncome,
      totalExpense,
      netIncome,
      profitOrLoss: netIncome > 0 ? "profit" : netIncome < 0 ? "loss" : "break-even",
      topSpendingCategories,
    },
  });
};
