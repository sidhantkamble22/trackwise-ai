const Transaction = require("../models/Transaction");
const mongoose = require("mongoose");

// =======================
// Add Transaction
// =======================
const addTransaction = async (req, res) => {
  try {
    const { title, amount, category, type } = req.body;

    const user = req.user.userId;

    const transaction = await Transaction.create({
      title,
      amount,
      category,
      type,
      user,
    });

    res.status(201).json({
      success: true,
      message: "Transaction Added Successfully",
      transaction,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =======================
// Get Transactions
// =======================
const getTransactions = async (req, res) => {
  try {
    const user = req.user.userId;

    const transactions = await Transaction.find({ user }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      transactions,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =======================
// Update Transaction
// =======================
const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, amount, category, type } = req.body;

    const transaction = await Transaction.findByIdAndUpdate(
      id,
      {
        title,
        amount,
        category,
        type,
      },
      {
        new: true,
      }
    );

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Transaction Updated Successfully",
      transaction,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =======================
// Delete Transaction
// =======================
const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findByIdAndDelete(id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Transaction Deleted Successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =======================
// Dashboard Analytics
// =======================
const getAnalytics = async (req, res) => {
  try {
    const user = req.user.userId;

    const transactions = await Transaction.find({ user });

    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const totalExpense = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const balance = totalIncome - totalExpense;

    res.status(200).json({
      success: true,
      analytics: {
        totalIncome,
        totalExpense,
        balance,
        totalTransactions: transactions.length,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =======================
// Category Analytics
// =======================
const getCategoryAnalytics = async (req, res) => {
  try {
    const user = req.user.userId;

    const categories = await Transaction.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(user),
          type: "expense",
        },
      },
      {
        $group: {
          _id: "$category",
          total: {
            $sum: "$amount",
          },
        },
      },
      {
        $sort: {
          total: -1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  addTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
  getAnalytics,
  getCategoryAnalytics,
};