"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

import StatCard from "../components/dashboard/StatCard";
import ExpenseChart from "../components/dashboard/ExpenseChart";
import IncomeExpenseChart from "../components/dashboard/IncomeExpenseChart";

export default function AnalyticsPage() {
  const router = useRouter();

  const [transactions, setTransactions] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const fetchCategoryAnalytics = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/transactions/category-analytics`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (data.success) {
      setCategoryData(data.categories);
    } else {
      setCategoryData([]);
    }
  } catch (error) {
    console.log(error);
    setCategoryData([]);
  }
};

 useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    router.push("/login");
    return;
  }

  fetchTransactions();
  fetchCategoryAnalytics();
}, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/transactions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setTransactions(data.transactions);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable to load analytics");
    } finally {
      setLoading(false);
    }
  };

  const totalIncome = useMemo(() => {
    return transactions
      .filter((item) => item.type === "income")
      .reduce((sum, item) => sum + Number(item.amount), 0);
  }, [transactions]);

  const totalExpense = useMemo(() => {
    return transactions
      .filter((item) => item.type === "expense")
      .reduce((sum, item) => sum + Number(item.amount), 0);
  }, [transactions]);

  const balance = totalIncome - totalExpense;

  const savingRate =
    totalIncome > 0
      ? ((balance / totalIncome) * 100).toFixed(1)
      : 0;

  const categorySummary = transactions
    .filter((item) => item.type === "expense")
    .reduce((acc, item) => {
      acc[item.category] =
        (acc[item.category] || 0) + Number(item.amount);

      return acc;
    }, {});

  const topCategories = Object.entries(categorySummary).sort(
    (a, b) => b[1] - a[1]
  );

  const latestTransaction =
    transactions.length > 0
      ? new Date(transactions[0].createdAt).toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }
        )
      : "--";

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-xl font-semibold">
        Loading Analytics...
      </div>
    );
  }

  return (
    <main
      className={`flex min-h-screen ${
        darkMode
          ? "bg-slate-900"
          : "bg-slate-100"
      }`}
    >
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        darkMode={darkMode}
      />

      <section className="flex-1">

        <Navbar
          onMenuClick={() => setSidebarOpen(true)}
          darkMode={darkMode}
        />

        <div className="max-w-7xl mx-auto p-6">

          <div className="flex justify-between items-center mb-8">

            <div>

              <h1
                className={`text-3xl font-bold ${
                  darkMode
                    ? "text-white"
                    : "text-slate-900"
                }`}
              >
                Analytics
              </h1>

              <p
                className={`mt-2 ${
                  darkMode
                    ? "text-slate-400"
                    : "text-slate-500"
                }`}
              >
                Financial Overview
              </p>

            </div>

            <button
              onClick={() =>
                setDarkMode(!darkMode)
              }
              className="px-5 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition"
            >
              {darkMode
                ? "Light Mode"
                : "Dark Mode"}
            </button>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

            <StatCard
              title="Balance"
              amount={balance}
              darkMode={darkMode}
            />

            <StatCard
              title="Income"
              amount={totalIncome}
              darkMode={darkMode}
            />

            <StatCard
              title="Expense"
              amount={totalExpense}
              darkMode={darkMode}
            />

            <StatCard
              title="Savings"
              amount={balance}
              darkMode={darkMode}
            />

          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">

           <ExpenseChart
    categoryData={categoryData}
/>

            <IncomeExpenseChart
              transactions={transactions}
            />

          </div>


                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">

            {/* Monthly Summary */}

            <div
              className={`rounded-2xl border p-6 ${
                darkMode
                  ? "bg-slate-800 border-slate-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <h2
                className={`text-xl font-bold mb-6 ${
                  darkMode
                    ? "text-white"
                    : "text-slate-900"
                }`}
              >
                Monthly Summary
              </h2>

              <div className="space-y-5">

                <div className="flex justify-between">
                  <span className={darkMode ? "text-slate-400" : "text-slate-500"}>
                    Total Income
                  </span>

                  <span className="font-bold text-green-600">
                    ₹{totalIncome.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className={darkMode ? "text-slate-400" : "text-slate-500"}>
                    Total Expense
                  </span>

                  <span className="font-bold text-red-600">
                    ₹{totalExpense.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className={darkMode ? "text-slate-400" : "text-slate-500"}>
                    Current Balance
                  </span>

                  <span className="font-bold text-indigo-600">
                    ₹{balance.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className={darkMode ? "text-slate-400" : "text-slate-500"}>
                    Saving Rate
                  </span>

                  <span className="font-bold text-emerald-600">
                    {savingRate}%
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className={darkMode ? "text-slate-400" : "text-slate-500"}>
                    Total Transactions
                  </span>

                  <span
                    className={`font-semibold ${
                      darkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {transactions.length}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className={darkMode ? "text-slate-400" : "text-slate-500"}>
                    Latest Transaction
                  </span>

                  <span
                    className={`font-semibold ${
                      darkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {latestTransaction}
                  </span>
                </div>

              </div>
            </div>

            {/* Top Categories */}

            <div
              className={`rounded-2xl border p-6 ${
                darkMode
                  ? "bg-slate-800 border-slate-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <h2
                className={`text-xl font-bold mb-6 ${
                  darkMode
                    ? "text-white"
                    : "text-slate-900"
                }`}
              >
                Expense Categories
              </h2>

              <div className="space-y-4">

                {topCategories.length > 0 ? (
                  topCategories.map(([name, amount]) => (
                    <div
                      key={name}
                      className="flex justify-between items-center border-b border-gray-200 pb-3"
                    >
                      <span
                        className={
                          darkMode
                            ? "text-slate-300"
                            : "text-slate-700"
                        }
                      >
                        {name}
                      </span>

                      <span className="font-semibold text-indigo-600">
                        ₹{Number(amount).toLocaleString()}
                      </span>
                    </div>
                  ))
                ) : (
                  <p
                    className={
                      darkMode
                        ? "text-slate-400"
                        : "text-slate-500"
                    }
                  >
                    No expense data available.
                  </p>
                )}

              </div>
            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

