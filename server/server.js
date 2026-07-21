require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const userRoutes = require("./routes/userRoutes");
const aiRoutes = require("./routes/aiRoutes");



const budgetRoutes = require("./routes/budgetRoutes");

const connectDB = require("./config/database");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());



// Routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/user", userRoutes);
app.use(
"/api/ai",
aiRoutes
);

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "TrackWise AI Backend Running !",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});