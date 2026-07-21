# 🚀 TrackWise AI

> AI-Powered Personal Finance & Expense Tracker built using the MERN Stack and Google Gemini AI.

TrackWise AI helps users manage their personal finances by tracking income, expenses, monthly budgets, analytics, and AI-generated financial insights—all in one modern dashboard.

---

# 🌟 Features

## 🔐 Authentication
- User Registration & Login
- JWT Authentication
- Protected Routes
- Secure Password Encryption

## 💰 Expense Management
- Add Transactions
- Edit Transactions
- Delete Transactions
- Search Transactions
- Category Filter
- CSV Export

## 📊 Dashboard
- Total Balance
- Total Income
- Total Expense
- Savings
- Recent Transactions
- AI Insights

## 📈 Analytics
- Expense by Category
- Income vs Expense Charts
- Monthly Summary
- Saving Rate
- Top Expense Categories

## 💳 Budget Management
- Monthly Budget
- Budget Usage Progress
- Remaining Budget
- Budget Status

## 🤖 AI Assistant
- Google Gemini AI Integration
- Financial Advice
- Spending Analysis
- Budget Suggestions
- AI Chat Assistant

## 👤 User Profile
- Profile Information
- User Statistics
- Secure Logout

## 🎨 UI
- Modern Dashboard
- Responsive Design
- Mobile Friendly
- Dark Mode
- Premium User Interface

---

# 🛠 Tech Stack

### Frontend
- Next.js
- React.js
- JavaScript
- Tailwind CSS
- React Icons
- Recharts
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

### AI
- Google Gemini API

---

# 📂 Folder Structure

```
TrackWise-AI
│
├── client
│   ├── app
│   ├── components
│   ├── public
│   └── styles
│
├── server
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── config
│   └── server.js
│
└── README.md
```

---

# 📸 Screenshots

Add screenshots of the following pages.

- Dashboard
- Analytics
- AI Chat
- Budget
- Profile

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/sidhantkamble22/trackwise-ai.git
```

---

## Install Frontend

```bash
cd client

npm install

npm run dev
```

---

## Install Backend

```bash
cd server

npm install

npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file inside the **server** folder.

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_JWT_SECRET

GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

---

# 📡 API Endpoints

## Authentication

```
POST /api/auth/register

POST /api/auth/login
```

## Transactions

```
GET    /api/transactions

POST   /api/transactions/add

PUT    /api/transactions/update/:id

DELETE /api/transactions/delete/:id
```

## Budget

```
GET  /api/budget

POST /api/budget/set
```

## AI

```
GET  /api/ai/dashboard

POST /api/ai/chat
```

## User

```
GET /api/user/profile
```

---

# ✅ Features Completed

- Authentication
- Dashboard
- Expense Management
- Budget Management
- Analytics
- AI Dashboard Insights
- AI Chat
- CSV Export
- Charts
- Dark Mode
- Responsive UI
- Profile Page

---

# 🚀 Future Improvements

- PDF Report Export
- Email Reports
- Recurring Transactions
- Push Notifications
- Multi Currency Support
- OCR Bill Scanner
- Voice Expense Entry
- Progressive Web App (PWA)

---

# 👨‍💻 Developer

**Sidhant Kamble**

### GitHub

https://github.com/sidhantkamble22

### LinkedIn

https://www.linkedin.com/in/sidhant-kamble-8b5149307

---

# ⭐ Support

If you like this project, don't forget to **star ⭐ the repository**.

---

# 📄 License

This project is licensed under the MIT License.
