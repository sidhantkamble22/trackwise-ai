"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
  FiDollarSign,
  FiTrendingDown,
  FiCheckCircle,
  FiTarget,
} from "react-icons/fi";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

export default function BudgetPage() {
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(false);

  const [budget, setBudget] = useState(0);

  const [budgetInput, setBudgetInput] = useState("");

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");

      return;
    }

    fetchBudget();

    fetchTransactions();
  }, []);

  const fetchBudget = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/budget", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success && data.budget) {
        setBudget(data.budget.amount);

        setBudgetInput(data.budget.amount);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setTransactions(data.transactions);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveBudget = async () => {
    if (!budgetInput) {
      toast.error("Enter Budget");

      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/budget/set",

        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            amount: Number(budgetInput),
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);

        fetchBudget();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const totalExpense = transactions

    .filter((item) => item.type === "expense")

    .reduce((sum, item) => sum + Number(item.amount), 0);

  const remaining = budget - totalExpense;

  const progress =
    budget > 0 ? Math.min((totalExpense / budget) * 100, 100) : 0;

  return (
    <main
      className={`
flex
min-h-screen
w-full
overflow-x-hidden
${darkMode ? "bg-slate-900" : "bg-slate-100"}
`}
    >
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        darkMode={darkMode}
      />

      <section className="flex-1 min-w-0">
        <Navbar
          onMenuClick={() => setSidebarOpen(true)}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between gap-5 mb-8">
            <div>
              <h1
                className={`
text-4xl
font-bold
${darkMode ? "text-white" : "text-slate-900"}
`}
              >
                Budget Management
              </h1>

              <p className="text-slate-500 mt-2">
                Track and control your monthly spending
              </p>
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-5 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg">
              <div className="flex justify-between">
                <p className="text-slate-500">Monthly Budget</p>

                <FiTarget className="text-slate-900 text-xl" />
              </div>

              <h2 className="text-3xl font-bold text-slate-900 mt-4">
                ₹{budget.toLocaleString()}
              </h2>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg">
              <div className="flex justify-between">
                <p className="text-slate-500">Expense</p>

                <FiTrendingDown className="text-red-600 text-xl" />
              </div>

              <h2 className="text-3xl font-bold text-red-600 mt-4">
                ₹{totalExpense.toLocaleString()}
              </h2>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg">
              <div className="flex justify-between">
                <p className="text-slate-500">Remaining</p>

                <FiCheckCircle className="text-green-600 text-xl" />
              </div>

              <h2
                className={`
text-3xl
font-bold
mt-4
${remaining >= 0 ? "text-green-600" : "text-red-600"}
`}
              >
                ₹{remaining.toLocaleString()}
              </h2>
            </div>
          </div>
          {/* Budget Form */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 mt-8">
            <h2 className="text-xl font-bold text-slate-900 mb-5">
              Set Monthly Budget
            </h2>

            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="number"
                placeholder="Enter monthly budget"
                value={budgetInput}
                onChange={(e) => setBudgetInput(e.target.value)}
                className="
flex-1
rounded-xl
border
border-slate-300
px-5
py-4
outline-none
focus:ring-2
focus:ring-slate-900
"
              />

              <button
                onClick={saveBudget}
                className="
bg-slate-900
hover:bg-slate-800
text-white
px-8
py-4
rounded-xl
font-semibold
transition
"
              >
                Save Budget
              </button>
            </div>
          </div>
          // Budget Usage Section
          <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 mt-8">
            <div className="flex justify-between items-center mb-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Budget Usage
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Monitor your spending limit
                </p>
              </div>

              <span className="text-sm font-semibold text-slate-700">
                {progress.toFixed(1)}%
              </span>
            </div>

            {/* Progress Bar */}

            <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`
        h-full
        rounded-full
        transition-all
        duration-700
        ${progress >= 100 ? "bg-red-500" : "bg-slate-900"}
      `}
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            {/* Status Message */}

            <div className="mt-6">
              {remaining >= 0 ? (
                <div
                  className="
        bg-green-50
        border
        border-green-200
        rounded-2xl
        p-4
        "
                >
                  <p className="text-green-700 font-medium">
                     Great! You are within your monthly budget.
                  </p>

                  <p className="text-sm text-green-600 mt-1">
                    You can still spend ₹{remaining.toLocaleString()}
                    this month.
                  </p>
                </div>
              ) : (
                <div
                  className="
        bg-red-50
        border
        border-red-200
        rounded-2xl
        p-4
        "
                >
                  <p className="text-red-700 font-medium">⚠️ Budget exceeded</p>

                  <p className="text-sm text-red-600 mt-1">
                    You exceeded your budget by ₹
                    {Math.abs(remaining).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </div>
          {/* Quick Insight Card */}
          <div
            className="
mt-8
bg-slate-900
rounded-3xl
p-6
text-white
shadow-xl
"
          >
            <div className="flex items-center gap-3 mb-3">
              <FiDollarSign className="text-2xl" />

              <h2 className="text-xl font-bold">Budget Tip</h2>
            </div>

            <p className="text-slate-300 leading-7">
              Try to keep your expenses below your planned budget. Small savings
              every month can help you achieve your financial goals faster.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
