const User = require("../models/User");
const Transaction = require("../models/Transaction");


exports.getProfile = async (req, res) => {

  try {

    const userId = req.user.userId;


    const user = await User
      .findById(userId)
      .select("-password");


    const transactions = await Transaction.find({
      user: userId,
    });



    const totalIncome = transactions
      .filter((item) => item.type === "income")
      .reduce(
        (sum, item) => sum + Number(item.amount),
        0
      );



    const totalExpense = transactions
      .filter((item) => item.type === "expense")
      .reduce(
        (sum, item) => sum + Number(item.amount),
        0
      );



    res.status(200).json({

      success: true,

      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
      },

      stats: {

        totalTransactions: transactions.length,

        totalIncome,

        totalExpense,

        balance: totalIncome - totalExpense,

      },

    });


  } catch(error) {

    console.log(error);


    res.status(500).json({

      success:false,

      message:"Server Error",

    });

  }

};