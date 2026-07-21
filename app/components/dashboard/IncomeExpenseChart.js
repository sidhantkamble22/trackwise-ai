"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

export default function IncomeExpenseChart({ transactions }) {
  const totalIncome = transactions
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const totalExpense = transactions
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const balance = totalIncome - totalExpense;

  const data = [
    {
      name: "Income",
      amount: totalIncome,
      color: "#22C55E",
    },
    {
      name: "Expense",
      amount: totalExpense,
      color: "#EF4444",
    },
  ];

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-lg p-6 hover:shadow-xl transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Income vs Expense
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Financial comparison
          </p>
        </div>

        <div
          className={`px-4 py-2 rounded-full font-bold ${
            balance >= 0
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {balance >= 0 ? "+" : "-"}₹
          {Math.abs(balance).toLocaleString()}
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            barCategoryGap="35%"
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="name"
              tick={{ fill: "#64748B" }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: "#64748B" }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              formatter={(value) => [
                `₹${Number(value).toLocaleString()}`,
                "Amount",
              ]}
              cursor={{ fill: "#F8FAFC" }}
            />

            <Bar
              dataKey="amount"
              radius={[12, 12, 0, 0]}
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.color}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="rounded-2xl bg-green-50 border border-green-100 p-4">
          <p className="text-sm text-green-600">
            Total Income
          </p>

          <h3 className="text-2xl font-bold text-green-700 mt-1">
            ₹{totalIncome.toLocaleString()}
          </h3>
        </div>

        <div className="rounded-2xl bg-red-50 border border-red-100 p-4">
          <p className="text-sm text-red-600">
            Total Expense
          </p>

          <h3 className="text-2xl font-bold text-red-700 mt-1">
            ₹{totalExpense.toLocaleString()}
          </h3>
        </div>
      </div>
    </div>
  );
}