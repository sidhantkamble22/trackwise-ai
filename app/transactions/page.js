"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { FiSearch, FiDownload } from "react-icons/fi";
import { MdEdit, MdDelete } from "react-icons/md";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";



export default function TransactionsPage() {
 const router = useRouter();

const [transactions, setTransactions] = useState([]);
const [loading, setLoading] = useState(true);

const [sidebarOpen, setSidebarOpen] = useState(false);
const [darkMode, setDarkMode] = useState(false);

const [searchTerm, setSearchTerm] = useState("");
const [category, setCategory] = useState("All");

useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    router.push("/login");
    return;
  }

  fetchTransactions();
}, []);


const fetchTransactions = async () => {
  try {
    setLoading(true);

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
  } finally {
    setLoading(false);
  }
};

const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Delete this transaction?"
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
      toast.success("Transaction Deleted");
      fetchTransactions();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error("Delete Failed");
  }
};

const filteredTransactions = transactions.filter((item) => {
  const matchSearch =
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase());

  const matchCategory =
    category === "All" || item.category === category;

  return matchSearch && matchCategory;
});

const exportCSV = () => {
  if (!transactions.length) {
    toast.error("No Transactions");
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
    new Date(item.createdAt).toLocaleString("en-IN"),
  ]);

  const csv = [
    headers.join(","),
    ...rows.map((r) => r.join(",")),
  ].join("\n");

  const blob = new Blob([csv], {
    type: "text/csv",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "transactions.csv";

  link.click();
};



 return (
  <main
    className={`flex min-h-screen ${
      darkMode ? "bg-slate-900" : "bg-slate-100"
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

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          <div>
            <h1
              className={`text-3xl font-bold ${
                darkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Transactions
            </h1>

            <p
              className={`mt-2 ${
                darkMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              View and manage all your income and expense transactions.
            </p>
          </div>

          <button
            onClick={exportCSV}
            className="flex items-center gap-2 bg-green-900 hover:bg-green-700 text-white px-5 py-3 rounded-xl transition"
          >
            <FiDownload size={18} />
            Export CSV
          </button>

        </div>

        {/* Filters */}

        <div
          className={`mt-8 rounded-2xl border p-5 ${
            darkMode
              ? "bg-slate-800 border-slate-700"
              : "bg-white border-gray-200"
          }`}
        >

          <div className="flex flex-col md:flex-row gap-4">

            <div className="relative flex-1">

              <FiSearch
                className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                  darkMode
                    ? "text-slate-400"
                    : "text-slate-500"
                }`}
              />

              <input
                type="text"
                placeholder="Search transaction..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                className={`w-full rounded-xl border py-3 pl-12 pr-4 outline-none ${
                  darkMode
                    ? "bg-slate-700 border-slate-600 text-white"
                    : "bg-white border-gray-300 text-black"
                }`}
              />

            </div>

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className={`rounded-xl border px-5 ${
                darkMode
                  ? "bg-slate-700 border-slate-600 text-white"
                  : "bg-white border-gray-300 text-black"
              }`}
            >
              <option>All</option>
              <option>Food</option>
              <option>Shopping</option>
              <option>Bills</option>
              <option>Travel</option>
              <option>Entertainment</option>
              <option>Salary</option>
            </select>

          </div>

        </div>

        {/* Count */}

        <div className="mt-6">

          <h2
            className={`font-semibold ${
              darkMode ? "text-white" : "text-slate-800"
            }`}
          >
            Showing {filteredTransactions.length} Transactions
          </h2>

        </div>

        {/* Loading */}

        {loading ? (

          <div className="flex justify-center py-20">

            <div className="w-10 h-10 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>

          </div>

        ) : filteredTransactions.length === 0 ? (

          <div
            className={`mt-8 rounded-2xl border py-24 text-center ${
              darkMode
                ? "bg-slate-800 border-slate-700"
                : "bg-white border-gray-200"
            }`}
          >
            <h2
              className={`text-2xl font-bold ${
                darkMode ? "text-white" : "text-slate-900"
              }`}
            >
              No Transactions Found
            </h2>

            <p
              className={`mt-3 ${
                darkMode
                  ? "text-slate-400"
                  : "text-slate-500"
              }`}
            >
              Try changing your search or category.
            </p>

          </div>

        ) : (

          <div className="mt-8 space-y-4">

            {filteredTransactions.map((item) => (

              <div
                key={item._id}
                className={`rounded-2xl border p-5 flex flex-col md:flex-row md:items-center md:justify-between ${
                  darkMode
                    ? "bg-slate-800 border-slate-700"
                    : "bg-white border-gray-200"
                }`}
              >

                <div>

                  <h3
                    className={`font-semibold text-lg ${
                      darkMode
                        ? "text-white"
                        : "text-slate-900"
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p
                    className={`mt-1 ${
                      darkMode
                        ? "text-slate-400"
                        : "text-slate-500"
                    }`}
                  >
                    {item.category}
                  </p>

                  <p
                    className={`text-sm mt-2 ${
                      darkMode
                        ? "text-slate-500"
                        : "text-slate-400"
                    }`}
                  >
                    {new Date(
                      item.createdAt
                    ).toLocaleDateString("en-IN")}
                  </p>

                </div>

                <div className="flex items-center gap-5 mt-5 md:mt-0">

                  <span
                    className={`font-bold text-lg ${
                      item.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.type === "income"
                      ? "+"
                      : "-"}
                    ₹{item.amount}
                  </span>

                  <button
                    onClick={() =>
                      console.log(item)
                    }
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <MdEdit size={22} />
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(item._id)
                    }
                    className="text-red-600 hover:text-red-800"
                  >
                    <MdDelete size={22} />
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>

  </main>
);}