const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
 chatWithAI,
 dashboardInsights,
} = require("../controllers/aiController");


router.post(
"/chat",
authMiddleware,
chatWithAI
);

router.get(
  "/dashboard",
  authMiddleware,
  dashboardInsights
);


module.exports = router;