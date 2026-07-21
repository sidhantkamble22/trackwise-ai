const generateAIResponse = require("../services/groqService");
const Transaction = require("../models/Transaction");


exports.chatWithAI = async (req,res)=>{

try{

const userId = req.user.userId;

const message = req.body?.message;
if (!message) {
  return res.status(400).json({
    success:false,
    message:"Message is required"
  });
}


// Get user transactions

const transactions = await Transaction.find({
    user:userId
});


// Prepare financial data

const expense = transactions
.filter(t=>t.type==="expense")
.reduce(
(sum,t)=>sum+Number(t.amount),
0
);


const income = transactions
.filter(t=>t.type==="income")
.reduce(
(sum,t)=>sum+Number(t.amount),
0
);


const categoryData = {};

transactions
.filter(t=>t.type==="expense")
.forEach(t=>{

categoryData[t.category] =
(categoryData[t.category] || 0)
+ Number(t.amount);

});


// AI Prompt

const prompt = `

You are ExpenseHub AI Financial Assistant.

Analyze user financial data and answer clearly.

User Transactions:

Total Income:
₹${income}

Total Expense:
₹${expense}

Category Expenses:
${JSON.stringify(categoryData)}


User Question:

${message}


Give short and helpful financial advice.

`;



const answer = await generateAIResponse(prompt);



res.status(200).json({

success:true,

answer

});


}catch(error){

console.log("AI ERROR DETAILS:");
console.log(error.message);

res.status(500).json({
success:false,
message:error.message
});

}

};

exports.dashboardInsights = async (req, res) => {

  try {

    const Transaction = require("../models/Transaction");
    const generateAIResponse = require("../services/groqService");

    const userId = req.user.userId;

    const transactions = await Transaction.find({ user: userId });

    const income = transactions
      .filter(item => item.type === "income")
      .reduce((sum, item) => sum + Number(item.amount), 0);

    const expense = transactions
      .filter(item => item.type === "expense")
      .reduce((sum, item) => sum + Number(item.amount), 0);

    const balance = income - expense;

    const categoryTotals = {};

    transactions.forEach(item => {

      if (item.type === "expense") {

        categoryTotals[item.category] =
          (categoryTotals[item.category] || 0) +
          Number(item.amount);

      }

    });

    const categories = Object.entries(categoryTotals)
      .map(([name, amount]) => `${name}: ₹${amount}`)
      .join(", ");

    const prompt = `
You are a professional financial advisor.

Analyze this financial data.

Income: ₹${income}

Expense: ₹${expense}

Balance: ₹${balance}

Expense Categories:

${categories}

Rules:

- Give only 4 short bullet points.
- Keep each point under 12 words.
- No introduction.
- No conclusion.
- Simple English.
`;

    const answer = await generateAIResponse(prompt);

    res.json({

      success: true,

      answer,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: "AI Dashboard Error",

    });

  }

};