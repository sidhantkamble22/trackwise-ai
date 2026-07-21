const Budget = require("../models/Budget");

// ===============================
// Set Monthly Budget
// ===============================
exports.setBudget = async (req, res) => {
  try {
    const user = req.user.userId;

    const { amount } = req.body;

    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    let budget = await Budget.findOne({
      user,
      month,
      year,
    });

    if (budget) {
      budget.amount = amount;
      await budget.save();

      return res.status(200).json({
        success: true,
        message: "Budget Updated Successfully",
        budget,
      });
    }

    budget = await Budget.create({
      user,
      amount,
      month,
      year,
    });

    res.status(201).json({
      success: true,
      message: "Budget Created Successfully",
      budget,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===============================
// Get Current Month Budget
// ===============================
exports.getBudget = async (req, res) => {
  try {
    const user = req.user.userId;

    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    const budget = await Budget.findOne({
      user,
      month,
      year,
    });

    res.status(200).json({
      success: true,
      budget,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};