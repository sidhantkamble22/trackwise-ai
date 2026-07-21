"use client";

import { useState,useEffect  } from "react";
import { FiSearch } from "react-icons/fi";
import { FiDownload } from "react-icons/fi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

import StatCard from "../components/dashboard/StatCard";
import WelcomeCard from "../components/dashboard/WelcomeCard";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import AIInsights from "../components/dashboard/AIInsights";
import AddTransactionForm from "../components/dashboard/AddTransactionForm";
import ExpenseChart from "../components/dashboard/ExpenseChart";
import IncomeExpenseChart from "../components/dashboard/IncomeExpenseChart";




export default function Dashboard() {
  const router = useRouter();

  const [transactions, setTransactions] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [categoryData, setCategoryData] = useState([]);

  const [analytics, setAnalytics] = useState({
  totalIncome: 0,
  totalExpense: 0,
  balance: 0,
  totalTransactions: 0,
});


const fetchCategoryAnalytics = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:5000/api/transactions/category-analytics",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (data.success) {
      setCategoryData(data.categories);
    }

  } catch (error) {
    console.error(error);
  }
};


const fetchAnalytics = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:5000/api/transactions/analytics",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (data.success) {
      setAnalytics(data.analytics);
    }
  } catch (error) {
    console.error(error);
  }
};

  // Check Login
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetchTransactions();
    fetchAnalytics();
    fetchCategoryAnalytics();
  }, [router]);

  // Fetch Transactions
  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/transactions",
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
      toast.error("Failed to load transactions");
    }
  };

  // Add Transaction (Temporary)
  const handleAddTransaction = async (newTransaction) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:5000/api/transactions/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTransaction),
      }
    );
    fetchCategoryAnalytics();

    const data = await response.json();

    if (data.success) {
      toast.success("Transaction Added!");
      
    fetchAnalytics();
    fetchCategoryAnalytics();
      fetchTransactions();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error(error);
    toast.error("Failed to add transaction");
  }
};

  // Edit
  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
  };

  // Delete
const handleDeleteTransaction = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this transaction?"
  );

  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:5000/api/transactions/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (data.success) {
      toast.success("Transaction Deleted!");
      fetchTransactions();
      fetchAnalytics();
    fetchCategoryAnalytics();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error(error);
    toast.error("Delete Failed");
  }
};


  // Update
const handleUpdateTransaction = async (updatedTransaction) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:5000/api/transactions/update/${updatedTransaction._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: updatedTransaction.title,
          amount: updatedTransaction.amount,
          category: updatedTransaction.category,
          type: updatedTransaction.type,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      toast.success("Transaction Updated!");
      setEditingTransaction(null);
      fetchTransactions();
      fetchAnalytics();
    fetchCategoryAnalytics();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error(error);
    toast.error("Update Failed");
  }
};

  // Export CSV
  const handleExportCSV = () => {
    if (!transactions.length) {
      toast.error("No transactions available");
      return;
    }

    const headers = [
      "Title",
      "Category",
      "Amount",
      "Type",
      "Date",
    ];

    const rows = transactions.map((item) => [
      item.title,
      item.category,
      item.amount,
      item.type,
      new Date(
        item.createdAt || item.date
      ).toLocaleString("en-IN"),
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `transactions-${Date.now()}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("CSV Downloaded!");
  };

  // Stats
  const totalIncome = transactions
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const totalExpense = transactions
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const balance = totalIncome - totalExpense;

  // Search
  const filteredTransactions = transactions.filter((item) => {
    const matchesSearch =
      item.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      item.category
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });
  return (
   <main
  className={`flex min-h-screen transition-colors duration-300 ${
    darkMode ? "bg-slate-900" : "bg-gray-100"
  }`}
>
      {/* Sidebar */}
 <Sidebar
  isOpen={sidebarOpen}
  onClose={() => setSidebarOpen(false)}
  darkMode={darkMode}
/>

      {/* Main Content */}
      <section
  className={`flex-1 overflow-y-auto transition-colors duration-300 ${
    darkMode ? "bg-slate-900" : "bg-gray-100"
  }`}
>

       <Navbar
  onMenuClick={() => setSidebarOpen(true)}
  darkMode={darkMode}
/>

<div className="flex justify-end mt-4">
  <button
    onClick={() => setDarkMode(!darkMode)}
    className="px-5 py-2 cursor-pointer rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition"
  >
    {darkMode ? " Light Mode" : " Dark Mode"}
  </button>
</div>



        <div className="p-4 md:p-6 lg:p-8">

          {/* Welcome */}
          <WelcomeCard  darkMode={darkMode}/>

          <div className="flex flex-col md:flex-row gap-4 mt-6 mb-6">

  {/* Search */}
  <div className="relative flex-1">
    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-100 text-xl" />

    <input
      type="text"
      placeholder="Search transactions..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full bg-white border text-slate-500 border-gray-300 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-purple-200 outline-none"
    />
  </div>

  {/* Category Filter */}
  <select
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
    className="bg-white border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none text-black"
  >
    <option>All</option>
    <option>Food</option>
    <option>Entertainment</option>
    <option>Shopping</option>
    <option>Travel</option>
    <option>Bills</option>
    <option>Salary</option>
    <option>Income</option>
  </select>


  <button
  onClick={handleExportCSV}
  className="flex items-center justify-center gap-2 font-semibold bg-green-800 hover:bg-green-900 text-white px-5 py-3 rounded-xl transition"
>
  <FiDownload size={18} />
  Export CSV
</button>

</div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
            <StatCard title="Balance"  amount={analytics.balance} darkMode={darkMode} />
            <StatCard title="Income"    amount={analytics.totalIncome} darkMode={darkMode} />
            <StatCard title="Expense"  amount={analytics.totalExpense} darkMode={darkMode} />
            <StatCard title="Savings"  amount={analytics.balance} darkMode={darkMode}/>
          </div>

          {/* Transactions + AI */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

            <div className="lg:col-span-2">
             <RecentTransactions
  transactions={filteredTransactions}
  onDeleteTransaction={handleDeleteTransaction}
  onEditTransaction={handleEditTransaction}
/>
            </div>

            <div>
              <AIInsights />
            </div>

          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">

            <ExpenseChart
                categoryData={categoryData}
            />

            <IncomeExpenseChart
              transactions={transactions}
            />

          </div>

          {/* Add Transaction */}
          <div className="mt-8">
<AddTransactionForm
  onAddTransaction={fetchTransactions}
  editingTransaction={editingTransaction}
  onUpdateTransaction={handleUpdateTransaction}
  darkMode={darkMode}
/>
          </div>

        </div>
      </section>
    </main>
  );
}