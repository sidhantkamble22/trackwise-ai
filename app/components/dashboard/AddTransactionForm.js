"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AddTransactionForm({
  onAddTransaction,
  editingTransaction,
  onUpdateTransaction,
  darkMode,
}) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [type, setType] = useState("expense");
  const router = useRouter();

  useEffect(() => {
    if (editingTransaction) {
      setTitle(editingTransaction.title);
      setAmount(editingTransaction.amount);
      setCategory(editingTransaction.category);
      setType(editingTransaction.type);
    } else {
      setTitle("");
      setAmount("");
      setCategory("Food");
      setType("expense");
    }
  }, [editingTransaction]);

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!title || !amount) {
    toast.error("Please fill all fields");
    return;
  }

  try {
    

   const token = localStorage.getItem("token");

const response = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/api/transactions/add`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      amount,
      category,
      type,
    }),
  }
);

    const data = await response.json();

    if (!data.success) {
      toast.error(data.message);
      return;
    }

    toast.success("Transaction Added Successfully");

    setTitle("");
    setAmount("");
    setCategory("Food");
    setType("expense");

    onAddTransaction();

  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
  }
};

  return (
    <div
      className={`mt-8 rounded-3xl border p-8 shadow-xl transition-all duration-300 ${
        darkMode
          ? "bg-slate-800 border-slate-700"
          : "bg-white border-gray-200"
      }`}
    >
      <h2
        className={`text-3xl font-bold mb-8 ${
          darkMode ? "text-white" : "text-black"
        }`}
      >
        {editingTransaction ? " Edit Transaction" : " Add Transaction"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label
            className={`block mb-2 font-semibold ${
              darkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Title
          </label>

          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full rounded-xl border p-4 transition-all duration-300 outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 ${
              darkMode
                ? "bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                : "bg-white border-gray-200 text-black"
            }`}
          />
        </div>

        {/* Amount */}
        <div>
          <label
            className={`block mb-2 font-semibold ${
              darkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Amount
          </label>

          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={`w-full rounded-xl border p-4 transition-all duration-300 outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 ${
              darkMode
                ? "bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                : "bg-white border-gray-200 text-black"
            }`}
          />
        </div>

        {/* Category */}
        <div>
          <label
            className={`block mb-2 font-semibold ${
              darkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Category
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`w-full rounded-xl border p-4 transition-all duration-300 outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 ${
              darkMode
                ? "bg-slate-700 border-slate-600 text-white"
                : "bg-white border-gray-200 text-black"
            }`}
          >
            <option>Food</option>
            <option>Shopping</option>
            <option>Travel</option>
            <option>Bills</option>
            <option>Salary</option>
            <option>Entertainment</option>
          </select>
        </div>

        {/* Type */}
        <div>
          <label
            className={`block mb-2 font-semibold ${
              darkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Type
          </label>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={`w-full rounded-xl border p-4 transition-all duration-300 outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 ${
              darkMode
                ? "bg-slate-700 border-slate-600 text-white"
                : "bg-white border-gray-200 text-black"
            }`}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full rounded-xl py-4 text-white font-semibold bg-slate-900 hover:scale-[1.02] shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
        >
          {editingTransaction
            ? " Update Transaction"
            : " Add Transaction"}
        </button>
      </form>
    </div>
  );
}