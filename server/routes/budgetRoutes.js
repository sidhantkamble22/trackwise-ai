const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  setBudget,
  getBudget,
} = require("../controllers/budgetController");

// Set Budget
router.post("/set", authMiddleware, setBudget);

// Get Current Budget
router.get("/", authMiddleware, getBudget);

module.exports = router;