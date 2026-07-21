const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  addTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
  getAnalytics,
  getCategoryAnalytics,
} = require("../controllers/transactionController");

router.post("/add", authMiddleware, addTransaction);

router.get("/", authMiddleware, getTransactions);

router.put("/update/:id", authMiddleware, updateTransaction);

router.delete("/delete/:id", authMiddleware, deleteTransaction);

router.get("/analytics", authMiddleware, getAnalytics);

router.get(
  "/category-analytics",
  authMiddleware,
  getCategoryAnalytics
);

module.exports = router;