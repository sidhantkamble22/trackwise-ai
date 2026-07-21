"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#8B5CF6",
  "#06B6D4",
  "#22C55E",
  "#F97316",
  "#EF4444",
  "#FACC15",
];

export default function ExpenseChart({ categoryData }) {
 const expenseData = (categoryData || []).map((item) => ({
  name: item._id,
  value: Number(item.total),
}));

  const totalExpense = expenseData.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-lg p-6 hover:shadow-xl transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Expense Analytics
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Category-wise expense breakdown
          </p>
        </div>

        <div className="bg-red-100 text-red-600 px-4 py-2 rounded-full font-bold">
          ₹{totalExpense.toLocaleString()}
        </div>
      </div>

      {expenseData.length === 0 ? (
        <div className="h-80 flex items-center justify-center">
          <p className="text-gray-500">
            No expense data available.
          </p>
        </div>
      ) : (
        <>
          {/* Chart */}
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseData}
                  dataKey="value"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                >
                  {expenseData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value) => [
                    `₹${value}`,
                    "Expense",
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
            {expenseData.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-slate-50 rounded-xl p-4 hover:bg-slate-100 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{
                      backgroundColor:
                        COLORS[index % COLORS.length],
                    }}
                  />

                  <span className="font-medium text-slate-700">
                    {item.name}
                  </span>
                </div>

                <span className="font-bold text-slate-900">
                  ₹{item.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}