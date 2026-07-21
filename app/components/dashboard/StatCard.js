"use client";

import {
  FiDollarSign,
  FiTrendingUp,
  FiTrendingDown,
  FiActivity,
} from "react-icons/fi";

export default function StatCard({ title, amount, darkMode }) {
  const icons = {
    Balance: <FiDollarSign />,

    Income: <FiTrendingUp />,

    Expense: <FiTrendingDown />,

    Savings: <FiActivity />,
  };

  const descriptions = {
    Balance: "Available balance",

    Income: "Total earnings",

    Expense: "Money spent",

    Savings: "Saved amount",
  };

  return (
    <div
      className={`
      group
      rounded-3xl
      p-6
      border
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl

      ${
        darkMode ? "bg-slate-900 border-slate-700" : "bg-white border-slate-200"
      }

      `}
    >
      {/* Top Section */}

      <div className="flex items-center justify-between">
        <p
          className={`
          text-sm
          font-medium

          ${darkMode ? "text-slate-400" : "text-slate-500"}

          `}
        >
          {title}
        </p>

        <div
          className={`
          w-11
          h-11
          rounded-2xl
          flex
          items-center
          justify-center
          text-lg

          ${
            darkMode ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-900"
          }

          `}
        >
          {icons[title]}
        </div>
      </div>

      {/* Amount */}

      <h2
        className={`
        mt-6
        text-3xl
        font-bold
        tracking-tight

        ${darkMode ? "text-white" : "text-slate-900"}

        `}
      >
        ₹ {Number(amount || 0).toLocaleString("en-IN")}
      </h2>

      {/* Bottom */}

      <p
        className={`
        mt-3
        text-sm

        ${darkMode ? "text-slate-400" : "text-slate-500"}

        `}
      >
        {descriptions[title]}
      </p>

      {/* Line */}

      <div
        className={`
        mt-6
        h-px

        ${darkMode ? "bg-slate-800" : "bg-slate-100"}

        `}
      />

      <div className="flex items-center justify-between mt-4">
        <span
          className={`
          text-xs

          ${darkMode ? "text-slate-500" : "text-slate-400"}

          `}
        >
          TrackWise AI
        </span>

        <span
          className="
          text-xs
          font-medium
          text-green-500
          "
        >
          Active
        </span>
      </div>
    </div>
  );
}
